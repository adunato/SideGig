[CmdletBinding()]
param(
    [string] $CredentialPath
)

$ErrorActionPreference = 'Stop'

if ([System.Environment]::OSVersion.Platform -ne [System.PlatformID]::Win32NT) {
    throw 'The SideGig local bootstrap credential initializer currently requires Windows because it uses DPAPI user-scoped encryption.'
}

if (-not $CredentialPath) {
    if (-not $env:LOCALAPPDATA) { throw 'LOCALAPPDATA is not available.' }
    $CredentialPath = Join-Path $env:LOCALAPPDATA 'SideGig\bootstrap\collector-dispatch-token.dpapi'
}

Write-Output '[bootstrap-credential] Enter the fine-grained GitHub token scoped to adunato/SideGig with Actions: write.'
Write-Output '[bootstrap-credential] The token is encrypted with Windows DPAPI for the current user and is never committed to a repository.'

$secureToken = Read-Host 'Token' -AsSecureString
if ($secureToken.Length -eq 0) { throw 'Token cannot be empty.' }

$folder = Split-Path -Parent $CredentialPath
New-Item -ItemType Directory -Path $folder -Force | Out-Null

$encrypted = ConvertFrom-SecureString -SecureString $secureToken
Set-Content -LiteralPath $CredentialPath -Value $encrypted -NoNewline -Encoding UTF8

Write-Output "[bootstrap-credential] Initialized local SideGig dispatch credential at $CredentialPath"
Write-Output '[bootstrap-credential] Future repository bootstraps can now provision the repository secret automatically.'
