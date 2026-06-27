# Render 部署指南

## 快速部署

### 1. 先提交 render.yaml 到 GitHub

```bash
git add render.yaml
git commit -m "Add Render deployment config"
git push
```

### 2. 在 Render 上部署

#### 部署后端 (Gateway)

1. 访问 https://dashboard.render.com
2. 点击 "New +" > "Web Service"
3. 连接你的 GitHub 仓库
4. 配置如下：

**Settings:**
- Name: `clawhermes-gateway`
- Runtime: `Python 3`
- Region: 选择离你近的
- Branch: `main`
- Root Directory: (留空)
- Build Command: 
  ```
  pip install uv && uv sync --frozen
  ```
- Start Command:
  ```
  uv run clawhermes gateway start
  ```

**Environment Variables:**
点击 "Add Environment Variable"，添加：

| Key | Value |
|-----|-------|
| `CH_DATA_DIR` | `/opt/render/project/src/data` |
| `DEEPSEEK_API_KEY` | (你的 API Key，点击 "Add Secret" 来保存) |

**Disk (可选但推荐):**
- Name: `data`
- Mount Path: `/opt/render/project/src/data`
- Size: `1 GB`

点击 "Create Web Service"

#### 部署前端 (Web Interface)

1. 点击 "New +" > "Static Site"
2. 连接同一个 GitHub 仓库
3. 配置如下：

**Settings:**
- Name: `clawhermes-web`
- Branch: `main`
- Root Directory: `web`
- Publish Directory: `./web`
- Build Command: (留空或填 `echo "No build needed"`)

点击 "Create Static Site"

### 3. 更新前端配置

部署成功后，你需要更新前端的 API 地址：

1. 在 Render 找到后端服务的 URL（类似：`https://clawhermes-gateway.onrender.com`）
2. 修改 `web/index.html` 中的 `apiBaseUrl`
3. 或者在前端页面的设置中手动配置

## 使用 render.yaml 一键部署（推荐）

如果你想一次性部署两个服务：

1. 确保 `render.yaml` 已提交到 GitHub
2. 在 Render 点击 "Blueprints" > "New Blueprint Instance"
3. 选择你的仓库和 `main` 分支
4. 配置环境变量（特别是 `DEEPSEEK_API_KEY`）
5. 点击 "Apply"

## 注意事项

1. **免费计划限制**: Render 免费计划有一定的使用限制
2. **冷启动**: 免费服务在闲置 15 分钟后会进入休眠
3. **数据持久化**: 使用 Disk 来保存数据
4. **API Key 安全**: 永远使用 Secrets 来保存敏感信息

## 访问你的应用

部署成功后：

- 前端: `https://clawhermes-web.onrender.com`
- 后端 API: `https://clawhermes-gateway.onrender.com`

## 故障排查

### 如果后端无法启动
检查 Render 的 logs，确保：
- Python 版本正确
- 依赖安装成功
- 环境变量配置正确

### 如果前端无法连接后端
- 确保后端已经完全启动
- 在浏览器控制台检查网络请求
- 确认没有 CORS 问题（我们的代码已配置）
