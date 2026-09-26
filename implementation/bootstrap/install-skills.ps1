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

function Assert-Utf8Gitignore([string] $Path) {
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) { return }

    $bytes = [System.IO.File]::ReadAllBytes($Path)
    $offset = 0
    if ($bytes.Length -ge 4 -and (($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE -and $bytes[2] -eq 0x00 -and $bytes[3] -eq 0x00) -or ($bytes[0] -eq 0x00 -and $bytes[1] -eq 0x00 -and $bytes[2] -eq 0xFE -and $bytes[3] -eq 0xFF))) {
        throw "Unsupported .gitignore encoding at '$Path'. Expected UTF-8 (with or without BOM); no package files or .gitignore entries were changed."
    }
    if ($bytes.Length -ge 2 -and (($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE) -or ($bytes[0] -eq 0xFE -and $bytes[1] -eq 0xFF))) {
        throw "Unsupported .gitignore encoding at '$Path'. Expected UTF-8 (with or without BOM); no package files or .gitignore entries were changed."
    }
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        $offset = 3
    }
    if ($bytes -contains 0) {
        throw "Unsupported .gitignore encoding at '$Path'. Expected UTF-8 (with or without BOM); no package files or .gitignore entries were changed."
    }

    $utf8 = [System.Text.UTF8Encoding]::new($false, $true)
    try {
        $null = $utf8.GetString($bytes, $offset, $bytes.Length - $offset)
    }
    catch [System.Text.DecoderFallbackException] {
        throw "Unsupported .gitignore encoding at '$Path'. Expected UTF-8 (with or without BOM); no package files or .gitignore entries were changed."
    }
}

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
    Write-Phase "manifest: reading $Path"
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

    if ($skills.Count -eq 0) { throw 'Manifest contains no skills.' }
    if ($templates.Count -eq 0) { throw 'Manifest contains no templates.' }
    if ($tools.Count -eq 0) { throw 'Manifest contains no tools.' }

    return [pscustomobject]@{
        SkillDestinationRoot    = $skillRootMatch.Groups[1].Value
        TemplateDestinationRoot = $templateRootMatch.Groups[1].Value
        ToolDestinationRoot     = $toolRootMatch.Groups[1].Value
        Skills                  = $skills
        Templates               = $templates
        Tools                   = $tools
    }
}

Write-Phase 'paths: resolving repository and destination'
$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '../..')).Path
$destinationRoot = (Resolve-Path -LiteralPath $Destination).Path
Assert-Utf8Gitignore (Join-Path $destinationRoot '.gitignore')
$manifestData = Read-Manifest $Manifest

$files = @()

foreach ($template in $manifestData.Templates) {
    if (-not $template.source -or -not $template.destination -or -not $template.sha256) {
        throw "Incomplete template declaration: $($template.name)"
    }
    $files += [pscustomobject]@{
        Kind   = 'template'
        Name   = $template.name
        Source = Join-Path $root $template.source
        Target = Join-Path (Join-Path $destinationRoot $manifestData.TemplateDestinationRoot) $template.destination
        Sha256 = $template.sha256
    }
}

foreach ($tool in $manifestData.Tools) {
    if (-not $tool.source -or -not $tool.destination -or -not $tool.sha256) {
        throw "Incomplete tool declaration: $($tool.name)"
    }
    $files += [pscustomobject]@{
        Kind   = 'tool'
        Name   = $tool.name
        Source = Join-Path $root $tool.source
        Target = Join-Path (Join-Path $destinationRoot $manifestData.ToolDestinationRoot) $tool.destination
        Sha256 = $tool.sha256
    }
}

foreach ($skill in $manifestData.Skills) {
    if (-not $skill.source -or -not $skill.sha256) { throw "Incomplete skill declaration: $($skill.name)" }
    $files += [pscustomobject]@{
        Kind   = 'skill'
        Name   = $skill.name
        Source = Join-Path $root $skill.source
        Target = Join-Path (Join-Path (Join-Path $destinationRoot $manifestData.SkillDestinationRoot) $skill.name) 'SKILL.md'
        Sha256 = $skill.sha256
    }
}

Write-Phase "sources: resolved $($files.Count) package files"

foreach ($file in $files) {
    if (-not (Test-Path -LiteralPath $file.Source -PathType Leaf)) {
        throw "Declared source does not exist: $($file.Source)"
    }
}

$conflicts = @($files | Where-Object { Test-Path -LiteralPath $_.Target -PathType Leaf })
if ($conflicts.Count -gt 0) {
    throw "Refusing to overwrite installed package files: $($conflicts.Target -join ', ')"
}
Write-Phase 'conflicts: none found'

foreach ($file in $files) {
    Write-Phase "hash: checking $($file.Kind) $($file.Name)"
    if (-not (Test-ExpectedSha256 $file.Source $file.Sha256)) {
        throw "Checksum mismatch for $($file.Kind) '$($file.Name)' after LF/CRLF normalization: expected $($file.Sha256)"
    }
}
Write-Phase 'hash: all checks passed'

$productGitAttributesSource = Join-Path $root 'development/templates/product.gitattributes'
$productGitAttributesPath = Join-Path $destinationRoot '.gitattributes'
$productGitAttributesRule = '* text=auto eol=lf'
if ($PSCmdlet.ShouldProcess($productGitAttributesPath, 'Ensure the canonical product line-ending policy')) {
    if (Test-Path -LiteralPath $productGitAttributesPath -PathType Leaf) {
        $productGitAttributesText = [System.IO.File]::ReadAllText($productGitAttributesPath)
        $normalizedProductGitAttributes = $productGitAttributesText -replace "`r`n", "`n"
        $normalizedProductGitAttributes = $normalizedProductGitAttributes -replace "`r", "`n"
        $productGitAttributesLines = $normalizedProductGitAttributes -split "`n"
        if ($productGitAttributesLines -cnotcontains $productGitAttributesRule) {
            throw "Existing .gitattributes does not contain the canonical SideGig line-ending rule '$productGitAttributesRule'. Refusing to overwrite product-specific attributes; reconcile the file explicitly before bootstrap."
        }
        Write-Phase 'gitattributes: canonical LF rule already present'
    }
    else {
        Copy-Item -LiteralPath $productGitAttributesSource -Destination $productGitAttributesPath -Force:$false
        Write-Phase 'gitattributes: installed canonical LF policy'
    }
}

foreach ($file in $files) {
    $folder = Split-Path -Parent $file.Target
    if ($PSCmdlet.ShouldProcess($file.Target, "Install SideGig $($file.Kind)")) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Copy-Item -LiteralPath $file.Source -Destination $file.Target -Force:$false
        Write-Phase "copy: installed $($file.Kind) $($file.Name)"
    }
}

$gitignorePath = Join-Path $destinationRoot '.gitignore'
$worktreeIgnoreRule = '/.worktrees/'
if ($PSCmdlet.ShouldProcess($gitignorePath, 'Ensure the repository-local worktree directory is ignored')) {
    if (Test-Path -LiteralPath $gitignorePath -PathType Leaf) {
        $gitignoreText = [System.IO.File]::ReadAllText($gitignorePath)
        $gitignoreLines = $gitignoreText -split "\r?\n"
        if ($gitignoreLines -cnotcontains $worktreeIgnoreRule) {
            $newline = if ($gitignoreText.Contains("`r`n")) { "`r`n" } else { "`n" }
            $separator = if ($gitignoreText.Length -gt 0 -and -not $gitignoreText.EndsWith("`n")) { $newline } else { '' }
            [System.IO.File]::AppendAllText($gitignorePath, "$separator$worktreeIgnoreRule$newline", [System.Text.UTF8Encoding]::new($false))
            Write-Phase 'gitignore: added root .worktrees exclusion'
        }
        else {
            Write-Phase 'gitignore: root .worktrees exclusion already present'
        }
    }
    else {
        [System.IO.File]::WriteAllText($gitignorePath, "$worktreeIgnoreRule`n", [System.Text.UTF8Encoding]::new($false))
        Write-Phase 'gitignore: created root .gitignore with .worktrees exclusion'
    }
}

Write-Phase 'complete'
Write-Output "Installed $($manifestData.Skills.Count) skills, $($manifestData.Templates.Count) templates, and $($manifestData.Tools.Count) tools."
