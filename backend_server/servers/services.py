import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

# Build exact path to backend_server/.env
BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"

# Force-load .env and override any existing wrong env var
load_dotenv(dotenv_path=ENV_PATH, override=True)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None


def generate_bot_response(message: str) -> str:
    """
    Core AI response logic for Crafty bot.
    """

    message_lower = message.lower()

    if "ping" in message_lower:
        return "Pong!"

    if not OPENAI_API_KEY or not client:
        return "AI service is not configured."

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "system",
                    "content": """
                                You are Crafty, a helpful Minecraft server assistant.
                                Only respond to questions related to Minecraft such as gameplay,
                                commands, server management, mods, and plugins.

                                If a message is unrelated to Minecraft, politely say that you can
                                only assist with Minecraft-related questions.

                                Responses should be concise and informative, ideally 2-3 sentences.
                                """
                },
                {
                    "role": "user",
                    "content": message
                }
            ],
            max_tokens=150
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("AI error:", e)
        return "Sorry, the AI is currently unavailable."