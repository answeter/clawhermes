
# ClawHermes 前端界面

一个现代化、美观的 ClawHermes Web 界面，提供聊天、会话管理、工具查看等功能。

## 功能特性

- 🎨 **现代化界面** - 深色主题，流畅的动画效果
- 💬 **智能聊天** - 与 AI Agent 进行自然对话
- 📝 **Markdown 支持** - 美观的代码块和格式化文本
- 📚 **会话管理** - 保存和切换历史对话
- 🛠️ **工具展示** - 查看可用的 Agent 工具
- ⚙️ **灵活设置** - 配置模型、工具集、API 地址

## 快速开始

### 前置条件

1. 确保 ClawHermes 项目已正确配置
2. 已设置 DeepSeek API Key（在项目根目录的 `.env` 文件中）

### 启动步骤

#### 1. 启动 Gateway 服务

在项目根目录（`ClawHermes-main`）打开终端：

```powershell
# 进入项目目录
cd ClawHermes-main

# 启动 Gateway 服务
uv run clawhermes gateway start
```

Gateway 服务将在 `http://127.0.0.1:18789` 启动。

#### 2. 启动前端界面

在新的终端窗口中：

```powershell
# 进入 web 目录
cd web

# 运行启动脚本
.\start_frontend.ps1

# 或者直接使用 Python 启动 HTTP 服务器
python -m http.server 8000
```

然后在浏览器中访问：`http://localhost:8000`

## 项目结构

```
web/
├── index.html              # 主页面
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── app.js             # 应用逻辑
│   └── marked.min.js      # Markdown 解析库
├── start_frontend.ps1     # 前端启动脚本
└── README.md              # 本说明文件
```

## 使用说明

### 开始对话

1. 打开前端页面后，点击"新对话"或直接在输入框输入消息
2. 输入你的问题或指令
3. 按 Enter 发送，Shift + Enter 换行

### 快捷操作

页面提供了三个快捷按钮：
- 📝 **写代码** - 快速询问代码相关问题
- 📚 **推荐** - 让 AI 推荐内容
- 💡 **分析** - 请求 AI 分析问题

### 会话管理

- 左侧侧边栏显示历史会话
- 点击会话可以切换
- 点击"新对话"开始新的对话

### 工具和设置

- 点击底部"工具"按钮查看可用的 Agent 工具
- 点击"设置"按钮配置：
  - 模型选择（DeepSeek、GPT-4、Claude）
  - 工具集（Minimal/Standard/Full）
  - API 地址

## API 集成

前端与 ClawHermes Gateway API 集成：

- `POST /init` - 初始化 Agent
- `POST /chat` - 发送消息
- `GET /health` - 健康检查
- `GET /tools` - 获取工具列表
- `GET /sessions` - 获取会话列表

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **Vanilla JavaScript** - 应用逻辑
- **Marked.js** - Markdown 解析
- **Font Awesome** - 图标库

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 故障排除

### Gateway 连接失败

如果看到连接错误：
1. 确认 Gateway 服务已启动
2. 检查 API 地址设置是否正确（默认 `http://127.0.0.1:18789`）
3. 查看浏览器控制台的错误信息

### API Key 问题

确保项目根目录的 `.env` 文件中已正确设置：
```
DEEPSEEK_API_KEY=your-api-key-here
```

## 开发说明

### 修改样式

编辑 `css/style.css` 文件来自定义界面样式。

### 修改逻辑

编辑 `js/app.js` 文件来调整应用功能。

### 添加新功能

参考 `app.js` 中的 `ClawHermesApp` 类结构进行扩展。

## 许可证

与 ClawHermes 主项目使用相同的许可证。

