$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $root

$firebase = Join-Path $root "node_modules\.bin\firebase.CMD"
if (-not (Test-Path -LiteralPath $firebase)) {
  throw "Firebase CLI is missing. Run pnpm install first."
}

Write-Host "Firestore Emulator: 127.0.0.1:8080" -ForegroundColor Green
Write-Host "Emulator UI:        http://127.0.0.1:4000" -ForegroundColor Cyan
Write-Host "Keep this window open. Press Ctrl+C to stop." -ForegroundColor Yellow
& $firebase emulators:start --only firestore --project demo-aero
