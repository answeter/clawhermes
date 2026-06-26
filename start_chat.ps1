
# ClawHermes 快速启动脚本
Write-Host "正在启动 ClawHermes..." -ForegroundColor Green

# 设置编码
$env:PYTHONIOENCODING="utf-8"

# 使用 uv 直接运行
uv run clawhermes chat

