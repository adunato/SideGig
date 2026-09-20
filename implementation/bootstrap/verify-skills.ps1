[CmdletBinding()]
param(
    [string] $Destination,
    [string] $Manifest
)

$ErrorActionPreference = 'Stop'
if (-not $Manifest) { $Manifest = Join-Path $PSScriptRoot 'manifest.yaml' }
$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$text = Get-Content -LiteralPath $Manifest -Raw
if ($text -match 'REPLACE_[A-Z_]+') { throw 'Manifest contains placeholder checksums.' }

$templatePaths = @([regex]::Matches($text, '^\s+- path:\s*(\S+)', 'Multiline') | ForEach-Object { $_.Groups[1].Value })
$skills = @()
$current = $null
foreach ($line in ($text -split "`r?`n")) {
    if ($line -match '^\s*- name:\s*(\S+)') {
        if ($null -ne $current) { $skills += [pscustomobject]$current }
        $current = [ordered]@{ name = $Matches[1] }
        continue
    }
    if ($null -ne $current -and $line -match '^\s+stage:\s*(\S+)') { $current.stage = $Matches[1]; continue }
    if ($null -ne $current -and $line -match '^\s+order:\s*(\d+)') { $current.order = [int]$Matches[1]; continue }
    if ($null -ne $current -and $line -match '^\s+source:\s*(\S+)') { $current.source = $Matches[1]; continue }
    if ($null -ne $current -and $line -match '^\s+dependencies:\s*\[(.*?)\]') { $current.dependencies = @($Matches[1] -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ }); continue }
    if ($null -ne $current -and $line -match '^\s+sha256:\s*(\S+)') { $current.sha256 = $Matches[1]; continue }
}
if ($null -ne $current) { $skills += [pscustomobject]$current }
if ($skills.Count -ne 7) { throw "Expected 7 declared skills, found $($skills.Count)." }
if ((@($skills.order | Sort-Object) -join ',') -ne (@($skills.order) -join ',')) { throw 'Lifecycle order is not ascending.' }
$names = @($skills.name)
foreach ($skill in $skills) {
    if (-not (Test-Path -LiteralPath (Join-Path $root $skill.source) -PathType Leaf)) { throw "Missing declared source: $($skill.source)" }
    $actual = (Get-FileHash -LiteralPath (Join-Path $root $skill.source) -Algorithm SHA256).Hash
    if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Checksum mismatch: $($skill.name)" }
    foreach ($dependency in $skill.dependencies) { if ($names -notcontains $dependency) { throw "Unknown dependency '$dependency' for $($skill.name)." } }
}
foreach ($template in $templatePaths) { if (-not (Test-Path -LiteralPath (Join-Path $root $template) -PathType Leaf)) { throw "Missing reference template: $template" } }
if ($Destination) {
    $targetRoot = Join-Path (Resolve-Path -LiteralPath $Destination).Path '.codex/skills'
    foreach ($skill in $skills) {
        $target = Join-Path $targetRoot $skill.name 'SKILL.md'
        if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { throw "Destination is missing: $target" }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        if ($actual -ne $skill.sha256.ToUpperInvariant()) { throw "Destination checksum mismatch: $target" }
    }
}
Write-Output "Verified $($skills.Count) skills, $($templatePaths.Count) templates, lifecycle order, dependencies, and checksums."
