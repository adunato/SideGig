[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string] $Destination,
    [string] $Manifest
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
if (-not $Manifest) { $Manifest = Join-Path $PSScriptRoot 'manifest.yaml' }

function Write-Phase([string] $Name) {
    Write-Output "[bootstrap] $Name"
}

function Add-CurrentItem([string] $Section, $Current, [ref] $Templates, [ref] $Skills) {
    if ($null -eq $Current) { return }
    if ($Section -eq 'templates') { $Templates.Value += [pscustomobject]$Current }
    elseif ($Section -eq 'skills') { $Skills.Value += [pscustomobject]$Current }
}

function Read-Manifest([string] $Path) {
    Write-Phase "manifest: reading $Path"
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) { throw "Manifest not found: $Path" }

    $text = Get-Content -LiteralPath $Path -Raw
    if ($text -match 'REPLACE_[A-Z0-9_]+') { throw 'Manifest contains placeholder values.' }

    $skillRootMatch = [regex]::Match($text, '(?m)^skillDestinationRoot:\s*(\S+)\s*$')
    $templateRootMatch = [regex]::Match($text, '(?m)^templateDestinationRoot:\s*(\S+)\s*$')
    if (-not $skillRootMatch.Success -or -not $templateRootMatch.Success) { throw 'Manifest is missing destination roots.' }

    $templates = @()
    $skills = @()
    $section = $null
    $current = $null

    foreach ($line in ($text -split "\r?\n")) {
        if ($line -match '^templates:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$skills)
            $section = 'templates'; $current = $null; continue
        }
        if ($line -match '^skills:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$skills)
            $section = 'skills'; $current = $null; continue
        }
        if ($line -match '^\s*- name:\s*(\S+)') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$skills)
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
    Add-CurrentItem $section $current ([ref]$templates) ([ref]$skills)

    if ($skills.Count -eq 0) { throw 'Manifest contains no skills.' }
    if ($templates.Count -eq 0) { throw 'Manifest contains no templates.' }

    return [pscustomobject]@{
        SkillDestinationRoot = $skillRootMatch.Groups[1].Value
        TemplateDestinationRoot = $templateRootMatch.Groups[1].Value
        Skills = $skills
        Templates = $templates
    }
}

Write-Phase 'paths: resolving repository and destination'
$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$destinationRoot = (Resolve-Path -LiteralPath $Destination).Path
$manifestData = Read-Manifest $Manifest

$files = @()

foreach ($template in $manifestData.Templates) {
    if (-not $template.source -or -not $template.destination -or -not $template.sha256) {
        throw "Incomplete template declaration: $($template.name)"
    }
    $files += [pscustomobject]@{
        Kind = 'template'
        Name = $template.name
        Source = Join-Path $root $template.source
        Target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        Sha256 = $template.sha256
    }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $files += [pscustomobject]@{
        Kind = 'skill'
        Name = $skill.name
        Source = Join-Path $root $skill.source
        Target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        Sha256 = $skill.sha256
    }
}

Write-Phase "sources: resolved $($files.Count) package files"

foreach ($file in $files) {
    if (-not (Test-Path -LiteralPath $file.Source -PathType Leaf)) { throw "Declared source does not exist: $($file.Source)" }
}

$conflicts = @($files | Where-Object { Test-Path -LiteralPath $_.Target -PathType Leaf })
if ($conflicts.Count -gt 0) { throw "Refusing to overwrite installed package files: $($conflicts.Target -join ', ')" }
Write-Phase 'conflicts: none found'

foreach ($file in $files) {
    Write-Phase "hash: checking $($file.Kind) $($file.Name)"
    $hash = (Get-FileHash -LiteralPath $file.Source -Algorithm SHA256).Hash
    if ($hash -ne $file.Sha256.ToUpperInvariant()) {
        throw "Checksum mismatch for $($file.Kind) '$($file.Name)': expected $($file.Sha256), got $hash"
    }
}
Write-Phase 'hash: all checks passed'

foreach ($file in $files) {
    $folder = Split-Path -Parent $file.Target
    if ($PSCmdlet.ShouldProcess($file.Target, "Install SideGig $($file.Kind)")) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Copy-Item -LiteralPath $file.Source -Destination $file.Target -Force:$false
        Write-Phase "copy: installed $($file.Kind) $($file.Name)"
    }
}

Write-Phase 'complete'
Write-Output "Installed $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates."
