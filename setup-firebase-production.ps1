[CmdletBinding(SupportsShouldProcess, ConfirmImpact = "High")]
param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[a-z][a-z0-9-]{4,28}[a-z0-9]$')]
  [string]$ProjectId,
  [string]$DisplayName = "AERO Research Production",
  [ValidateSet("asia-east1")]
  [string]$Location = "asia-east1",
  [switch]$Resume
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $root
$firebaseJs = Join-Path $root "node_modules\firebase-tools\lib\bin\firebase.js"
if (-not (Test-Path -LiteralPath $firebaseJs)) { throw "Firebase CLI is missing. Run pnpm install first." }
$bundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$node = if (Test-Path -LiteralPath $bundledNode) { $bundledNode } else { (Get-Command node.exe -ErrorAction Stop).Source }
if ($ProjectId.StartsWith("demo-")) { throw "Production ProjectId must not start with demo-." }

& $node $firebaseJs login:list
if ($LASTEXITCODE -ne 0) { throw "Firebase authentication check failed." }

$action = if ($Resume) { "Resume setup: create protected Firestore database in $Location and deploy rules/indexes" } else { "Create Firebase project, create protected Firestore database in $Location, and deploy rules/indexes" }
if (-not $PSCmdlet.ShouldProcess($ProjectId, $action)) {
  return
}

if (-not $Resume) {
  & $node $firebaseJs projects:create $ProjectId --display-name $DisplayName
  if ($LASTEXITCODE -ne 0) { throw "Firebase project creation failed." }
}

& $node $firebaseJs firestore:databases:create "(default)" --project $ProjectId --location $Location --edition standard --delete-protection ENABLED
if ($LASTEXITCODE -ne 0) { throw "Firestore database creation failed." }

& $node $firebaseJs deploy --only firestore --project $ProjectId
if ($LASTEXITCODE -ne 0) { throw "Firestore rules/index deployment failed." }

Write-Host "Firebase production project is ready: $ProjectId" -ForegroundColor Green
Write-Host "Next: create a dedicated Render service account with datastore.user access." -ForegroundColor Cyan
