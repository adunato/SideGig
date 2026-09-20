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

function Read-Manifest([string] $Path) {
    Write-Phase "manifest: reading $Path"
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) { throw "Manifest not found: $Path" }
    $text = Get-Content -LiteralPath $Path -Raw
    if ($text -match 'REPLACE_[A-Z_]+') { throw 'Manifest contains placeholder checksums. Run the verifier after publishing real checksums.' }
    $skills = @{}
    $current = $null
    foreach ($line in ($text -split "`r?`n")) {
        if ($line -match '^\s*- name:\s*(\S+)') { $current = [ordered]@{ name = $Matches[1] }; $skills[$Matches[1]] = $current; continue }
        if ($null -ne $current -and $line -match '^\s+source:\s*(\S+)') { $current.source = $Matches[1]; continue }
        if ($null -ne $current -and $line -match '^\s+sha256:\s*(\S+)') { $current.sha256 = $Matches[1]; continue }
    }
    if ($skills.Count -eq 0) { throw 'Manifest contains no skills.' }
    Write-Phase "manifest: parsed $($skills.Count) skills"
    return [pscustomobject]@{ DestinationRoot = '.codex/skills'; Skills = $skills.Values }
}

Write-Phase 'paths: resolving repository and destination'
$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')).Path
$manifestData = Read-Manifest $Manifest
$targetRoot = Join-Path (Resolve-Path -LiteralPath $Destination).Path $manifestData.DestinationRoot
Write-Phase "paths: target root $targetRoot"
$files = foreach ($skill in $manifestData.Skills) {
    $source = Join-Path $root $skill.source
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Declared source does not exist: $($skill.source)" }
    $target = Join-Path $targetRoot $skill.name 'SKILL.md'
    [pscustomobject]@{ Source = $source; Target = $target; Skill = $skill.name }
}
Write-Phase "sources: resolved $($files.Count) files"

$conflicts = @($files | Where-Object { Test-Path -LiteralPath $_.Target -PathType Leaf })
if ($conflicts.Count -gt 0) { throw "Refusing to overwrite existing skill files: $($conflicts.Target -join ', ')" }
Write-Phase 'conflicts: none found'
foreach ($file in $files) {
    Write-Phase "hash: checking $($file.Skill.name)"
    $hash = (Get-FileHash -LiteralPath $file.Source -Algorithm SHA256).Hash
    if ($hash -ne $file.Skill.sha256.ToUpperInvariant()) { throw "Checksum mismatch for $($file.Skill): expected $($file.Skill.sha256), got $hash" }
}
Write-Phase 'hash: all checks passed'
foreach ($file in $files) {
    $folder = Split-Path -Parent $file.Target
    Write-Phase "copy: preparing $($file.Skill.name)"
    if ($PSCmdlet.ShouldProcess($file.Target, 'Create project skill')) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Copy-Item -LiteralPath $file.Source -Destination $file.Target -Force:$false
        Write-Phase "copy: completed $($file.Skill.name)"
    }
}
Write-Phase 'complete'
Write-Output "Installed $($files.Count) project skills under $targetRoot"
