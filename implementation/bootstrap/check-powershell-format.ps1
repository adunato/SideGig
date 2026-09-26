[CmdletBinding()]
param(
    [ValidateSet('check', 'write')]
    [string] $Mode = 'check',
    [Parameter(Mandatory = $true)]
    [string] $RequiredVersion,
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]] $Paths
)

$ErrorActionPreference = 'Stop'
$expectedVersion = [version]$RequiredVersion
$analyzer = Get-Module -ListAvailable -Name PSScriptAnalyzer |
    Where-Object { $_.Version -eq $expectedVersion } |
    Select-Object -First 1

if (-not $analyzer) {
    throw "PSScriptAnalyzer $RequiredVersion is required. Install it with: Install-Module -Name PSScriptAnalyzer -RequiredVersion $RequiredVersion -Scope CurrentUser"
}

Import-Module PSScriptAnalyzer -RequiredVersion $expectedVersion -ErrorAction Stop

if (-not $Paths -or $Paths.Count -eq 0) { throw 'No PowerShell bootstrap sources were supplied.' }

foreach ($relativePath in $Paths) {
    $sourcePath = Join-Path (Get-Location).Path $relativePath
    if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf)) {
        throw "PowerShell bootstrap source is missing: $relativePath"
    }

    $original = [System.IO.File]::ReadAllText($sourcePath)
    $canonical = $original.Replace("`r`n", "`n").Replace("`r", "`n")
    $formatted = Invoke-Formatter -ScriptDefinition $canonical
    $formatted = $formatted.Replace("`r`n", "`n").Replace("`r", "`n")
    if ($Mode -eq 'write') {
        if ($original -cne $formatted) {
            [System.IO.File]::WriteAllText($sourcePath, $formatted, [System.Text.UTF8Encoding]::new($false))
        }
    }
    elseif ($original -cne $formatted) {
        throw "PowerShell formatting check failed: $relativePath. Run npm run format:bootstrap:write to correct it."
    }
}

Write-Output "PSScriptAnalyzer $RequiredVersion formatting check passed for $($Paths.Count) PowerShell source(s)."
