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