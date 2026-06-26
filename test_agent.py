
"""测试 Agent 功能"""
import os
from dotenv import load_dotenv

# 加载项目根目录的 .env 文件
load_dotenv()

print("正在初始化 Agent...")

try:
    from clawhermes.agent.loop import Agent, AgentConfig, ToolRegistry
    from clawhermes.agent.memory import JSONMemoryProvider, MemoryManager
    from clawhermes.llm.provider import LLMProvider
    from clawhermes.tools.builtin import register_builtin_tools

    # 初始化 LLM Provider
    provider = LLMProvider(
        model="deepseek/deepseek-chat",
        api_key=os.getenv("DEEPSEEK_API_KEY")
    )

    # 初始化工具注册表
    registry = ToolRegistry()
    register_builtin_tools(registry, profile="standard")
    print(f"✅ 已加载 {len(registry.list())} 个工具")

    # 初始化记忆管理器
    data_dir = os.path.expanduser("~/.clawhermes")
    os.makedirs(data_dir, exist_ok=True)
    memory = MemoryManager()
    memory.add_provider(JSONMemoryProvider(data_dir))

    # 初始化 Agent
    agent = Agent(
        llm_provider=provider,
        tool_registry=registry,
        config=AgentConfig(max_iterations=10),
        memory_manager=memory
    )

    print("✅ Agent 初始化成功")
    print(f"   模型: {agent.llm.model}")
    print(f"   工具数: {len(agent.tools.list())}")

    # 测试简单对话
    print("\n" + "="*50)
    print("测试对话: '你好，请介绍一下自己'")
    print("="*50)
    
    response = agent.chat("你好，请介绍一下自己")
    print(f"\nAgent 回复:\n{response}")

except Exception as e:
    print(f"❌ 错误: {e}")
    import traceback
    traceback.print_exc()

