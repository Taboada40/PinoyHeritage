<#
Starts Backend and Frontend in separate PowerShell windows for local development.

Usage:
  Right-click and "Run with PowerShell", or from a PowerShell prompt in the repo root:
    .\start-dev.ps1

This script opens two new PowerShell windows:
- Backend: runs `./mvnw.cmd spring-boot:run` inside `./Backend`
- Frontend: runs `npm run dev` inside `./Frontend`

Adjust paths or commands if your setup differs.
#>

try {
    $repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
    $backendPath = Join-Path $repoRoot 'Backend'
    $frontendPath = Join-Path $repoRoot 'Frontend'
    Write-Host "Starting Backend in new window: $backendPath"
    $backendCmd = '-NoExit -Command "Set-Location -LiteralPath ''' + $backendPath + '''; .\\mvnw.cmd spring-boot:run"'
    Start-Process -FilePath powershell -ArgumentList $backendCmd -WindowStyle Normal

    Start-Sleep -Milliseconds 500

    Write-Host "Starting Frontend in new window: $frontendPath"
    $frontendCmd = '-NoExit -Command "Set-Location -LiteralPath ''' + $frontendPath + '''; npm run dev"'
    Start-Process -FilePath powershell -ArgumentList $frontendCmd -WindowStyle Normal

    Write-Host "Both processes started. Check the new PowerShell windows for output." -ForegroundColor Green
} catch {
    Write-Error "Failed to start dev servers: $_"
    exit 1
}
