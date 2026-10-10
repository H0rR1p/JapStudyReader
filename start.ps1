$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Test-Path ".venv64\Scripts\python.exe")) {
    Write-Host "首次运行：正在创建 Python 环境并安装依赖..."
    python -m venv .venv64
    if ($LASTEXITCODE -ne 0) { throw "Python 环境创建失败" }
    .\.venv64\Scripts\python -m pip install -r backend\requirements.txt
    if ($LASTEXITCODE -ne 0) { throw "Python 依赖安装失败" }
}

if (-not (Test-Path "node_modules")) {
    Write-Host "首次运行：正在安装前端依赖..."
    npm install
    if ($LASTEXITCODE -ne 0) { throw "前端依赖安装失败" }
}

Write-Host "启动 JSR 桌面客户端..."
npm run desktop:dev
if ($LASTEXITCODE -ne 0) { throw "JSR 桌面客户端启动失败" }
