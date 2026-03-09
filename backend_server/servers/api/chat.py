import time

from ninja import Router

from servers.auth import ServerAPIKeyAuth
from servers.models import ChatLog
from servers.schemas import ChatIn
from servers.services import generate_bot_response

from django.views.decorators.csrf import csrf_exempt


router = Router()

@router.post("/chat", auth=ServerAPIKeyAuth(), csrf=False)
@csrf_exempt
def bot_chat(request, data: ChatIn):
    """
    Core endpoint for Crafty AI bot interaction.
    Can be used by:
    - Minecraft plugin
    - Dashboard
    - External tools

    POST localhost:8000/api/chat/chat
    """

    server = request.server      # the minecraft server
    owner = request.user         # dashboard user (owner)

    if not owner.is_authenticated:
        return {"error": "Authentication required"}

    start_time = time.time()

    try:
        bot_reply = generate_bot_response(data.message)
        success = True
        error_message = None
    except Exception as e:
        bot_reply = ""
        success = False
        error_message = str(e)

    response_time_ms = int((time.time() - start_time) * 1000)

    ChatLog.objects.create(
        user=request.user,
        player_uuid=data.player_uuid,
        player_username=data.player_username,
        player_message=data.message,
        bot_message=bot_reply,
        success=success,
        error_message=error_message,
        response_time_ms=response_time_ms,
    )
    return {
        "reply": bot_reply
    }