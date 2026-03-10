from openai import OpenAI

# TEMPORARY: hardcoded key for local testing only
client = OpenAI(api_key="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")


def generate_bot_response(message: str) -> str:
    """
    Core AI response logic for Crafty bot.
    """

    message_lower = message.lower()

    # quick responses (optional)
    if "ping" in message_lower:
        return "Pong!"

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "system",
                    "content": """
                        You are Crafty, a helpful Minecraft server assistant. 
                        Only respond to questions related to Minecraft such as gameplay, commands, server management, mods, and plugins. 
                        If a message is unrelated to Minecraft, politely say that you can only assist with Minecraft-related questions.w
                        Response should be concise and informative, ideally 2-3 sentences.
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