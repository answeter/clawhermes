
// ClawHermes 前端应用
class ClawHermesApp {
    constructor() {
        this.apiBaseUrl = localStorage.getItem('apiUrl') || 'http://127.0.0.1:18789';
        this.currentSessionId = null;
        this.sessions = [];
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSessions();
        this.checkConnection();
    }

    bindEvents() {
        // 新对话按钮
        document.getElementById('newChatBtn').addEventListener('click', () =&gt; this.newChat());
        
        // 发送消息
        document.getElementById('sendBtn').addEventListener('click', () =&gt; this.sendMessage());
        document.getElementById('messageInput').addEventListener('keydown', (e) =&gt; {
            if (e.key === 'Enter' &amp;&amp; !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 快捷操作
        document.querySelectorAll('.quick-action').forEach(btn =&gt; {
            btn.addEventListener('click', () =&gt; {
                const prompt = btn.dataset.prompt;
                this.newChat();
                this.sendMessage(prompt);
            });
        });

        // 工具弹窗
        document.getElementById('toolsBtn').addEventListener('click', () =&gt; this.showToolsModal());
        document.getElementById('closeToolsModal').addEventListener('click', () =&gt; this.hideModal('toolsModal'));
        
        // 设置弹窗
        document.getElementById('settingsBtn').addEventListener('click', () =&gt; this.showSettingsModal());
        document.getElementById('closeSettingsModal').addEventListener('click', () =&gt; this.hideModal('settingsModal'));
        document.getElementById('saveSettingsBtn').addEventListener('click', () =&gt; this.saveSettings());

        // 点击背景关闭弹窗
        document.querySelectorAll('.modal-overlay').forEach(overlay =&gt; {
            overlay.addEventListener('click', (e) =&gt; {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                }
            });
        });

        // 自动调整输入框高度
        const textarea = document.getElementById('messageInput');
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        });
    }

    async checkConnection() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/health`);
            const data = await response.json();
            this.isInitialized = data.initialized;
            if (!this.isInitialized) {
                await this.initializeAgent();
            }
        } catch (error) {
            console.log('Gateway 未启动，请先运行: uv run clawhermes gateway start');
        }
    }

    async initializeAgent() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/init`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: localStorage.getItem('model') || 'deepseek/deepseek-chat',
                    profile: localStorage.getItem('profile') || 'standard'
                })
            });
            const data = await response.json();
            if (data.status === 'ok') {
                this.isInitialized = true;
            }
        } catch (error) {
            console.error('初始化失败:', error);
        }
    }

    newChat() {
        this.currentSessionId = null;
        this.clearMessages();
        this.showWelcomeScreen();
        this.updateSessionsList();
    }

    clearMessages() {
        document.getElementById('messagesContainer').innerHTML = '';
    }

    showWelcomeScreen() {
        document.getElementById('welcomeScreen').style.display = 'flex';
        document.getElementById('messagesContainer').classList.remove('active');
    }

    hideWelcomeScreen() {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('messagesContainer').classList.add('active');
    }

    async sendMessage(messageText = null) {
        const textarea = document.getElementById('messageInput');
        const message = messageText || textarea.value.trim();
        
        if (!message) return;
        if (!this.isInitialized) {
            await this.initializeAgent();
        }

        this.hideWelcomeScreen();
        
        // 添加用户消息
        this.addMessage(message, 'user');
        
        // 清空输入框
        textarea.value = '';
        textarea.style.height = 'auto';
        
        // 显示输入中动画
        const typingIndicator = this.showTypingIndicator();
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    session_id: this.currentSessionId
                })
            });
            
            const data = await response.json();
            
            // 移除输入中动画
            this.removeTypingIndicator(typingIndicator);
            
            // 添加助手回复
            this.addMessage(data.response, 'assistant');
            
            // 更新当前会话 ID
            if (!this.currentSessionId) {
                this.currentSessionId = data.session_id;
                this.saveSession(message);
            }
            
        } catch (error) {
            this.removeTypingIndicator(typingIndicator);
            this.addMessage('抱歉，发生了错误：' + error.message, 'assistant');
        }
    }

    addMessage(content, role) {
        const container = document.getElementById('messagesContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = role === 'user' ? '&lt;i class="fas fa-user"&gt;&lt;/i&gt;' : '&lt;i class="fas fa-robot"&gt;&lt;/i&gt;';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = this.renderMarkdown(content);
        
        contentDiv.appendChild(bubble);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
        
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    renderMarkdown(text) {
        return text.replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const container = document.getElementById('messagesContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant typing-message';
        messageDiv.innerHTML = `
            &lt;div class="message-avatar"&gt;&lt;i class="fas fa-robot"&gt;&lt;/i&gt;&lt;/div&gt;
            &lt;div class="message-content"&gt;
                &lt;div class="message-bubble"&gt;
                    &lt;div class="typing-indicator"&gt;
                        &lt;div class="typing-dot"&gt;&lt;/div&gt;
                        &lt;div class="typing-dot"&gt;&lt;/div&gt;
                        &lt;div class="typing-dot"&gt;&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        `;
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
        return messageDiv;
    }

    removeTypingIndicator(element) {
        if (element &amp;&amp; element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    saveSession(firstMessage) {
        const session = {
            id: this.currentSessionId,
            title: firstMessage.substring(0, 30) + (firstMessage.length &gt; 30 ? '...' : ''),
            timestamp: Date.now()
        };
        
        this.sessions.unshift(session);
        localStorage.setItem('clawhermes_sessions', JSON.stringify(this.sessions));
        this.updateSessionsList();
    }

    loadSessions() {
        const saved = localStorage.getItem('clawhermes_sessions');
        if (saved) {
            this.sessions = JSON.parse(saved);
            this.updateSessionsList();
        }
    }

    updateSessionsList() {
        const container = document.getElementById('sessionsList');
        container.innerHTML = '';
        
        this.sessions.forEach(session =&gt; {
            const item = document.createElement('div');
            item.className = 'session-item' + (session.id === this.currentSessionId ? ' active' : '');
            item.innerHTML = `
                &lt;i class="fas fa-comment"&gt;&lt;/i&gt;
                &lt;span&gt;${session.title}&lt;/span&gt;
            `;
            item.addEventListener('click', () =&gt; this.loadSession(session.id));
            container.appendChild(item);
        });
    }

    async loadSession(sessionId) {
        this.currentSessionId = sessionId;
        this.updateSessionsList();
        this.hideWelcomeScreen();
        this.clearMessages();
        // 这里可以加载历史消息
    }

    async showToolsModal() {
        const modal = document.getElementById('toolsModal');
        const toolsList = document.getElementById('toolsList');
        
        if (this.isInitialized) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/tools`);
                const data = await response.json();
                toolsList.innerHTML = data.tools.map(tool =&gt; `
                    &lt;div class="tool-item"&gt;
                        &lt;h4&gt;${tool.name}&lt;/h4&gt;
                        &lt;p&gt;${tool.description || '暂无描述'}&lt;/p&gt;
                    &lt;/div&gt;
                `).join('');
            } catch (error) {
                toolsList.innerHTML = '&lt;p&gt;无法加载工具列表&lt;/p&gt;';
            }
        } else {
            toolsList.innerHTML = `
                &lt;div class="tool-item"&gt;
                    &lt;h4&gt;get_time&lt;/h4&gt;
                    &lt;p&gt;获取当前日期和时间&lt;/p&gt;
                &lt;/div&gt;
                &lt;div class="tool-item"&gt;
                    &lt;h4&gt;read_file&lt;/h4&gt;
                    &lt;p&gt;读取文件内容&lt;/p&gt;
                &lt;/div&gt;
                &lt;div class="tool-item"&gt;
                    &lt;h4&gt;write_file&lt;/h4&gt;
                    &lt;p&gt;写入文件内容&lt;/p&gt;
                &lt;/div&gt;
                &lt;div class="tool-item"&gt;
                    &lt;h4&gt;exec&lt;/h4&gt;
                    &lt;p&gt;执行 shell 命令&lt;/p&gt;
                &lt;/div&gt;
            `;
        }
        
        modal.classList.add('active');
    }

    showSettingsModal() {
        const modal = document.getElementById('settingsModal');
        
        // 加载当前设置
        document.getElementById('modelSelect').value = localStorage.getItem('model') || 'deepseek/deepseek-chat';
        document.getElementById('profileSelect').value = localStorage.getItem('profile') || 'standard';
        document.getElementById('apiUrl').value = localStorage.getItem('apiUrl') || 'http://127.0.0.1:18789';
        
        modal.classList.add('active');
    }

    saveSettings() {
        localStorage.setItem('model', document.getElementById('modelSelect').value);
        localStorage.setItem('profile', document.getElementById('profileSelect').value);
        localStorage.setItem('apiUrl', document.getElementById('apiUrl').value);
        
        this.apiBaseUrl = localStorage.getItem('apiUrl');
        this.hideModal('settingsModal');
        alert('设置已保存！');
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }
}

// 当 DOM 加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () =&gt; {
    new ClawHermesApp();
});

