param([int]$Port = 8000)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $root

if (-not $env:AERO_STORAGE) { $env:AERO_STORAGE = "firestore" }
if (-not $env:FIRESTORE_EMULATOR_HOST) { $env:FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080" }
if (-not $env:GOOGLE_CLOUD_PROJECT) { $env:GOOGLE_CLOUD_PROJECT = "demo-aero" }
if (-not $env:AERO_ADMIN_TOKEN) { $env:AERO_ADMIN_TOKEN = "local-researcher-only" }
if (-not $env:AERO_ALLOWED_ORIGINS) { $env:AERO_ALLOWED_ORIGINS = "http://localhost:$Port,http://127.0.0.1:$Port" }

Write-Host "AERO API: http://127.0.0.1:$Port" -ForegroundColor Green
Write-Host "Docs:     http://127.0.0.1:$Port/docs" -ForegroundColor Cyan
$emulatorParts = $env:FIRESTORE_EMULATOR_HOST.Split(':')
$client = [System.Net.Sockets.TcpClient]::new()
try {
  $client.Connect($emulatorParts[0], [int]$emulatorParts[1])
} catch {
  throw "Firestore Emulator is not running. Start .\start-emulator.ps1 in another window first."
} finally {
  $client.Dispose()
}

$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$python = if (Test-Path -LiteralPath $bundledPython) { $bundledPython } else { (Get-Command python.exe -ErrorAction Stop).Source }
& $python -m uvicorn backend.app:app --host 127.0.0.1 --port $Port --reload
