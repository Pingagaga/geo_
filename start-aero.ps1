param(
  [string]$HostAddress = "127.0.0.1",
  [int]$Port = 8000
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ServerFile = Join-Path $ProjectRoot "server.py"

$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$pythonPath = if (Test-Path -LiteralPath $bundledPython) { $bundledPython } else { $null }

if (-not $pythonPath) {
  $pythonCommand = Get-Command python.exe -CommandType Application -ErrorAction SilentlyContinue |
    Where-Object { $_.Source -and (Test-Path -LiteralPath $_.Source) } |
    Select-Object -First 1
  $pythonPath = if ($pythonCommand) { $pythonCommand.Source } else { $null }
}

if (-not $pythonPath) {
  throw "Python 3 was not found. Install Python and enable Add Python to PATH."
}

Write-Host ""
Write-Host "Participant: http://${HostAddress}:$Port/AERO.html" -ForegroundColor Green
Write-Host "Researcher:  http://${HostAddress}:$Port/research-admin.html" -ForegroundColor Cyan
Write-Host "Keep this window open. Press Ctrl+C to stop the server." -ForegroundColor Yellow
Write-Host ""

Set-Location -LiteralPath $ProjectRoot
& $pythonPath $ServerFile --host $HostAddress --port $Port

if ($LASTEXITCODE -ne 0) {
  throw "AERO server failed with exit code $LASTEXITCODE"
}
