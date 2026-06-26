# GitHub 部署指南

本文档介绍如何将 ClawHermes 项目部署到 GitHub。

## 1. 创建 GitHub 仓库

1. 访问 https://github.com
2. 点击右上角的 "New" 按钮创建新仓库
3. 输入仓库名称（例如：clawhermes）
4. 选择 Public 或 Private
5. **不要**勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

## 2. 将本地仓库推送到 GitHub

在项目目录中执行以下命令：

```bash
# 添加远程仓库（将下面的 URL 替换为你的实际仓库 URL）
git remote add origin https://github.com/你的用户名/clawhermes.git

# 推送到 GitHub
git push -u origin master
```

## 3. 配置环境变量（安全建议）

**重要**：永远不要将 `.env` 文件提交到 GitHub！

项目已经包含了 `.env.example`，你可以：

1. 在本地复制 `.env.example` 为 `.env`
2. 在 GitHub 仓库的 Settings > Secrets 中配置必要的环境变量
3. 或者使用 GitHub Actions 的 Secrets 功能

## 4. 使用 GitHub Actions 自动化部署

项目已经包含了 GitHub Actions 工作流：

- `.github/workflows/ci.yml` - 持续集成
- `.github/workflows/deploy-pages.yml` - 部署文档到 GitHub Pages

你可以在 `.github/workflows/` 目录中修改这些配置。

## 5. 创建发布版本

要创建新的发布版本：

```bash
# 创建标签
git tag -a v0.1.0 -m "First release"

# 推送标签
git push origin v0.1.0
```

然后在 GitHub 仓库中创建 Release。

## 6. 使用 Docker 部署

项目已经包含了 Dockerfile 和 docker-compose.yml：

```bash
# 构建镜像
docker build -t clawhermes .

# 使用 docker-compose 运行
docker-compose up -d
```

## 7. 常见问题

### Q: 如何在其他机器上部署？
A: 
1. 克隆仓库
2. 复制 `.env.example` 为 `.env` 并配置
3. 安装依赖：`uv sync`
4. 运行项目

### Q: 如何保护 API Key？
A: 
- 永远不要提交 `.env` 到 GitHub
- 使用 GitHub Secrets 或环境变量管理敏感信息
- 在生产环境中使用密钥管理服务

### Q: 如何启用 GitHub Pages？
A: 
1. 进入仓库的 Settings > Pages
2. Source 选择 "Deploy from a branch"
3. 选择 "gh-pages" 分支
4. 点击 Save

## 8. 下一步

- 阅读 `README.md` 了解项目功能
- 查看 `docs/` 目录获取详细文档
- 参考 `快速启动.md` 快速上手
