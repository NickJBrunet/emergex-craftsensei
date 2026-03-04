def generate_bot_response(message: str) -> str:
    """
    Core AI response logic for Crafty bot.
    Replace this later with OpenAI / local model / rules engine.
    """

    # Placeholder logic (safe starter)
    message_lower = message.lower()

    if "hello" in message_lower:
        return "Hello! I'm Crafty, your server assistant."
    elif "help" in message_lower:
        return "I can help with commands, server info, and moderation."
    elif "ping" in message_lower:
        return "Pong!"
    else:
        return "I'm still learning! Ask me something else."