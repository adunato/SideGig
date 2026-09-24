[CmdletBinding()]
param(
    [string] $Destination,
    [string] $Manifest
)

$ErrorActionPreference = 'Stop'
if (-not $Manifest) { $Manifest = Join-Path $PSScriptRoot 'manifest.yaml' }

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

    $skillRootMatch = [regex]::Match($text, '(?m)^skillDestinationRoot:\s*(\S+)\s*
    $section = $null
    $current = $null

    foreach ($line in ($text -split "\r?\n")) {
        if ($line -match '^templates:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $section = 'templates'; $current = $null; continue
        }
        if ($line -match '^tools:\s*
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

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }
if ($manifestData.Tools.Count -eq 0) { throw 'Manifest contains no tools.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($tool in $manifestData.Tools) {
    if (-not $tool.source -or -not $tool.destination -or -not $tool.sha256) {
        throw "Incomplete tool declaration: $($tool.name)"
    }
    $source = Join-Path $root $tool.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing tool source: $($tool.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $tool.sha256.ToUpperInvariant()) { throw "Tool checksum mismatch: $($tool.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($tool in $manifestData.Tools) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.ToolDestinationRoot) $tool.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing tool: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $tool.sha256.ToUpperInvariant()) { throw "Destination tool checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills, $($manifestData.Templates.Count) templates, and $($manifestData.Tools.Count) tools, source checksums, skill order/dependencies, and destination package copies where supplied."
)
    $templateRootMatch = [regex]::Match($text, '(?m)^templateDestinationRoot:\s*(\S+)\s*
    $section = $null
    $current = $null

    foreach ($line in ($text -split "\r?\n")) {
        if ($line -match '^templates:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $section = 'templates'; $current = $null; continue
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
        Skills = $skills
        Templates = $templates
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates, source checksums, skill order/dependencies, and destination package copies where supplied."
)
    $toolRootMatch = [regex]::Match($text, '(?m)^toolDestinationRoot:\s*(\S+)\s*
    $section = $null
    $current = $null

    foreach ($line in ($text -split "\r?\n")) {
        if ($line -match '^templates:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $section = 'templates'; $current = $null; continue
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
        Skills = $skills
        Templates = $templates
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates, source checksums, skill order/dependencies, and destination package copies where supplied."
)
    if (-not $skillRootMatch.Success -or -not $templateRootMatch.Success -or -not $toolRootMatch.Success) { throw 'Manifest is missing destination roots.' }

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
        Skills = $skills
        Templates = $templates
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates, source checksums, skill order/dependencies, and destination package copies where supplied."
) {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $section = 'tools'; $current = $null; continue
        }
        if ($line -match '^skills:\s*
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
        Skills = $skills
        Templates = $templates
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates, source checksums, skill order/dependencies, and destination package copies where supplied."
)
    $templateRootMatch = [regex]::Match($text, '(?m)^templateDestinationRoot:\s*(\S+)\s*
    $section = $null
    $current = $null

    foreach ($line in ($text -split "\r?\n")) {
        if ($line -match '^templates:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $section = 'templates'; $current = $null; continue
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
        Skills = $skills
        Templates = $templates
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates, source checksums, skill order/dependencies, and destination package copies where supplied."
)
    $toolRootMatch = [regex]::Match($text, '(?m)^toolDestinationRoot:\s*(\S+)\s*
    $section = $null
    $current = $null

    foreach ($line in ($text -split "\r?\n")) {
        if ($line -match '^templates:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $section = 'templates'; $current = $null; continue
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
        Skills = $skills
        Templates = $templates
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates, source checksums, skill order/dependencies, and destination package copies where supplied."
)
    if (-not $skillRootMatch.Success -or -not $templateRootMatch.Success -or -not $toolRootMatch.Success) { throw 'Manifest is missing destination roots.' }

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
        Skills = $skills
        Templates = $templates
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates, source checksums, skill order/dependencies, and destination package copies where supplied."
) {
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
        Skills = $skills
        Templates = $templates
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates, source checksums, skill order/dependencies, and destination package copies where supplied."
)
    $templateRootMatch = [regex]::Match($text, '(?m)^templateDestinationRoot:\s*(\S+)\s*
    $section = $null
    $current = $null

    foreach ($line in ($text -split "\r?\n")) {
        if ($line -match '^templates:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $section = 'templates'; $current = $null; continue
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
        Skills = $skills
        Templates = $templates
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates, source checksums, skill order/dependencies, and destination package copies where supplied."
)
    $toolRootMatch = [regex]::Match($text, '(?m)^toolDestinationRoot:\s*(\S+)\s*
    $section = $null
    $current = $null

    foreach ($line in ($text -split "\r?\n")) {
        if ($line -match '^templates:\s*$') {
            Add-CurrentItem $section $current ([ref]$templates) ([ref]$tools) ([ref]$skills)
            $section = 'templates'; $current = $null; continue
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
        Skills = $skills
        Templates = $templates
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates, source checksums, skill order/dependencies, and destination package copies where supplied."
)
    if (-not $skillRootMatch.Success -or -not $templateRootMatch.Success -or -not $toolRootMatch.Success) { throw 'Manifest is missing destination roots.' }

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
        Skills = $skills
        Templates = $templates
    }
}

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest

if ($manifestData.Skills.Count -eq 0) { throw 'Manifest contains no skills.' }
if ($manifestData.Templates.Count -eq 0) { throw 'Manifest contains no templates.' }

$skillNames = @($manifestData.Skills.name)
if (($skillNames | Select-Object -Unique).Count -ne $skillNames.Count) { throw 'Skill names are not unique.' }

$templateNames = @($manifestData.Templates.name)
if (($templateNames | Select-Object -Unique).Count -ne $templateNames.Count) { throw 'Template names are not unique.' }

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
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Template checksum mismatch: $($template.name)" }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing skill source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Skill checksum mismatch: $($skill.name)" }
    foreach ($dependency in @($skill.dependencies)) {
        if ($skillNames -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." }
    }
}

if ($Destination) {
    $destinationRoot = (Resolve-Path -LiteralPath $Destination).Path

    foreach ($template in $manifestData.Templates) {
        $target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing template: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $template.sha256.ToUpperInvariant()) { throw "Destination template checksum mismatch: $target" }
    }

    foreach ($skill in $manifestData.Skills) {
        $target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing skill: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination skill checksum mismatch: $target" }
    }
}

Write-Output "Verified $($manifestData.Skills.Count) skills and $($manifestData.Templates.Count) templates, source checksums, skill order/dependencies, and destination package copies where supplied."
