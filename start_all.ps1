
# ClawHermes 完整启动脚本
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ClawHermes 完整启动" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 设置编码
$env:PYTHONIOENCODING="utf-8"

Write-Host "Gateway: http://127.0.0.1:18789" -ForegroundColor Yellow
Write-Host "前端:   http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "请在两个不同的终端中分别运行以下命令：" -ForegroundColor Cyan
Write-Host ""
Write-Host "终端 1 (启动 Gateway):" -ForegroundColor White
Write-Host "  uv run clawhermes gateway start" -ForegroundColor Green
Write-Host ""
Write-Host "终端 2 (启动前端):" -ForegroundColor White
Write-Host "  cd web" -ForegroundColor Green
Write-Host "  python -m http.server 8000" -ForegroundColor Green
Write-Host ""
Write-Host "然后在浏览器中打开: http://localhost:8000" -ForegroundColor Cyan
Write-Host ""

