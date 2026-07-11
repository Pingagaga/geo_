$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $root

$firebase = Join-Path $root "node_modules\.bin\firebase.CMD"
if (-not (Test-Path -LiteralPath $firebase)) {
  throw "Firebase CLI is missing. Run pnpm install first."
}
$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$python = if (Test-Path -LiteralPath $bundledPython) { $bundledPython } else { (Get-Command python.exe -ErrorAction Stop).Source }

$env:GOOGLE_CLOUD_PROJECT = "demo-aero"
$env:AERO_STORAGE = "firestore"
$env:AERO_ADMIN_TOKEN = "test-admin-token"
$command = "`"$python`" -m unittest discover -s tests -v"
& $firebase emulators:exec --only firestore --project demo-aero $command
if ($LASTEXITCODE -ne 0) {
  throw "AERO automated tests failed with exit code $LASTEXITCODE"
}
