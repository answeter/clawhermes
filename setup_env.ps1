
# ClawHermes Environment Setup
$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ClawHermes Environment Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create ~/.clawhermes directory
$clawhermesDir = Join-Path $env:USERPROFILE ".clawhermes"
if (-not (Test-Path $clawhermesDir)) {
    Write-Host "Creating directory: $clawhermesDir" -ForegroundColor Green
    New-Item -ItemType Directory -Path $clawhermesDir -Force | Out-Null
}

# Copy .env file
$sourceEnv = ".env"
$destEnv = Join-Path $clawhermesDir ".env"

if (Test-Path $sourceEnv) {
    Write-Host "Copying config to: $destEnv" -ForegroundColor Green
    Copy-Item $sourceEnv $destEnv -Force
    Write-Host "Environment setup complete!" -ForegroundColor Green
} else {
    Write-Host "ERROR: .env file not found in project root" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Now you can run: uv run clawhermes gateway start" -ForegroundColor Cyan
Write-Host ""

