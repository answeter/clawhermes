
# ClawHermes 前端启动脚本
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ClawHermes 前端界面启动" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "正在启动简单 HTTP 服务器..." -ForegroundColor Yellow
Write-Host ""
Write-Host "前端地址: http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "请确保 Gateway 服务已启动 (http://127.0.0.1:18789)" -ForegroundColor Cyan
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Gray
Write-Host ""

python -m http.server 8000

