[CmdletBinding()]
param(
    [string] $Destination,
    [string] $Manifest
)

$ErrorActionPreference = 'Stop'
if (-not $Manifest) { $Manifest = Join-Path $PSScriptRoot 'manifest.yaml' }

function Test-ExpectedSha256([string] $Path, [string] $Expected) {
    $text = [System.IO.File]::ReadAllText($Path)
    $normalized = $text -replace "`r`n", "`n"
    $normalized = $normalized -replace "`r", "`n"
    $variants = @(
        $normalized,
        ($normalized -replace "`n", "`r`n")
    )
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        foreach ($variant in $variants) {
            $bytes = [System.Text.UTF8Encoding]::new($false).GetBytes($variant)
            $actual = -join ($sha.ComputeHash($bytes) | ForEach-Object { $_.ToString('x2') })
            if ($actual.ToUpperInvariant() -eq $Expected.ToUpperInvariant()) {
                return $true
            }
            $sha.Initialize()
        }
        return $false
    }
    finally {
        $sha.Dispose()
    }
}

function Add-CurrentItem([string] $Section, $Current, [ref] $Templates, [ref] $Tools, [ref] $Skills) {
    if ($null -eq $Current) { return }
    if ($Section -eq 'templates') { $Templates.Value += [pscustomobject]$Current }
    elseif ($Section -eq 'tools') { $Tools.Value += [pscustomobject]$Current }
    elseif ($Section -eq 'skills') { $Skills.Value += [pscustomobject]$Current }
}

function Read-Manifest([string] $Path) {
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) { throw "Manifest not found: $Path" }
    $text = Get-Content -LiteralPath $Path -Raw
    if ($text -match 'REPLACE_[A-Z0-9_]+') { throw 'Manifest contains placeholder values.' }

    $skillRootMatch = [regex]::Match($text, '(?m)^skillDestinationRoot:\s*(\S+)\s*$')
    $templateRootMatch = [regex]::Match($text, '(?m)^templateDestinationRoot:\s*(\S+)\s*$')
    $toolRootMatch = [regex]::Match($text, '(?m)^toolDestinationRoot:\s*(\S+)\s*$')
    if (-not $skillRootMatch.Success -or -not $templateRootMatch.Success -or -not $toolRootMatch.Success) {
        throw 'Manifest is missing destination roots.'
    }

    $templates = @()
    $tools = @()
    $skills = @()
    $section = $null
    $current = $null

    foreach ($line in ($text -split "\r?\n")) {
        if ($line -match '^templates:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $section = 'templates'; $current = $null; continue
        }
        if ($line -match '^tools:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $section = 'tools'; $current = $null; continue
        }
        if ($line -match '^skills:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $section = 'skills'; $current = $null; continue
        }
        if ($line -match '^\s*- name:\s*(\S+)') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $current = [ordered]@{ name = $Matches[1] }
            continue
        }
        if ($null -eq $current) { continue }

        if ($line -match '^\s+source:\s*(\S+)') { $current.source = $Matches[1]; continue }
        if ($line -match '^\s+destination:\s*(\S+)') { $current.destination = $Matches[1]; continue }
        if ($line -match '^\s+stage:\s*(\S+)') { $current.stage = $Matches[1]; continue }
        if ($line -match '^\s+order:\s*(\d+)') { $current.order = [int]$Matches[1]; continue }
        if ($line -match '^\s+dependencies:\s*\[(.*?)\]') {
            $current.dependencies = @($Matches[1] -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ })
            continue
        }
        if ($line -match '^\s+sha256:\s*(\S+)') { $current.sha256 = $Matches[1]; continue }
    }
    Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)

    return [pscustomobject]@{
        SkillDestinationRoot = $skillRootMatch.Groups[1].Value
        TemplateDestinationRoot = $templateRootMatch.Groups[1].Value
        ToolDestinationRoot = $toolRootMatch.Groups[1].Value
        Skills = $skills
        Templates = $templates
        Tools = $tools
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '../..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }
if ($manifestData.Tools.Count -eq 0) { throw 'Manifest contains no tools.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

$toolNames = @($manifestData.Tools.name)
if (($toolNames | Select-Object -Unique).Count -ne $toolNames.Count) { throw 'Tool names are not unique.' }

$orders = @($manifestData.Skills.order)
if ($orders -contains $null) { throw 'Every skill must declare an order.' }
if ((@($orders | Sort-Object) -join ',') -ne ($orders -join ',')) { throw 'Skill order is not ascending.' }
if (($orders | Select-Object -Unique).Count -ne $orders.Count) { throw 'Skill order values must be unique.' }

foreach ($template in $manifestData.Templates) {
    if (-not $template.source -or -not $template.destination -or -not $template.sha256) {
        throw "Incomplete template declaration: $($template.name)"
    }
    $source = Join-Path $root $template.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing template source: $($template.source)" }
    if (-not (Test-ExpectedSha256 $source $template.sha256)) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($tool in $manifestData.Tools) {
    if (-not $tool.source -or -not $tool.destination -or -not $tool.sha256) {
        throw "Incomplete tool declaration: $($tool.name)"
    }
    $source = Join-Path $root $tool.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing tool source: $($tool.source)" }
    if (-not (Test-ExpectedSha256 $source $tool.sha256)) { throw "Tool checksum mismatch: $($tool.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    if (-not (Test-ExpectedSha256 $source $skill.sha256)) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        if (-not (Test-ExpectedSha256 $target $template.sha256)) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($tool in $manifestData.Tools) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.ToolDestinationRoot) $tool.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing tool: $target" }
        if (-not (Test-ExpectedSha256 $target $tool.sha256)) { throw "Destination tool checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        if (-not (Test-ExpectedSha256 $target $skill.sha256)) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills, $($manifestData.Templates.Count) templates, and $($manifestData.Tools.Count) tools, source checksums, skill order/dependencies, and destination package copies where supplied."
