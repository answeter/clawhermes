
"""测试 DeepSeek API 是否配置正确"""
import os
from dotenv import load_dotenv

# 加载项目根目录的 .env 文件
load_dotenv()

print("正在加载环境变量...")
api_key = os.getenv("DEEPSEEK_API_KEY")

if not api_key:
    print("❌ 未找到 DEEPSEEK_API_KEY")
else:
    print(f"✅ 找到 API Key: {api_key[:10]}...")

    try:
        from clawhermes.llm.provider import LLMProvider
        
        print("\n正在初始化 LLMProvider...")
        provider = LLMProvider(
            model="deepseek/deepseek-chat",
            api_key=api_key
        )
        
        print("✅ LLMProvider 初始化成功")
        print("\n正在发送测试消息...")
        messages = [{"role": "user", "content": "你好，请简短介绍一下自己"}]
        response = provider.chat(messages)
        print(f"\n✅ 响应: {response.content}")
        
    except Exception as e:
        print(f"❌ 错误: {e}")
        import traceback
        traceback.print_exc()

