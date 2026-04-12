import datetime

from django.shortcuts import get_object_or_404
from ninja import Router
from ninja.errors import HttpError
from uuid import UUID

from accounts.auth import JWTAuth
from servers.auth import ServerAPIKeyAuth
from servers.models import MinecraftServer, ChatLog
from servers.schemas import (
    ServerCreateIn,
    ServerUpdateIn,
    ServerOut,
    ServerWithKeyOut, ChatIn,
)
from servers.services import generate_bot_response

router = Router()


@router.get("", response=list[ServerOut], auth=JWTAuth())
def list_servers(request):
    if not request.user.is_authenticated:  # ✅ FIX
        raise HttpError(401, "Unauthorized")

    return MinecraftServer.objects.filter(owner=request.user)  # ✅ FIX


@router.post("", response=ServerWithKeyOut, auth=JWTAuth())
def create_server(request, payload: ServerCreateIn):
    if not request.user.is_authenticated:  # ✅ FIX
        raise HttpError(401, "Unauthorized")

    return MinecraftServer.objects.create(
        owner=request.user,  # ✅ FIX
        name=payload.name,
        owner_ign=payload.owner_ign,
    )


@router.get("{server_id}", response=ServerOut, auth=JWTAuth())
def get_server(request, server_id: UUID):
    if not request.user.is_authenticated:  # ✅ FIX
        raise HttpError(401, "Unauthorized")

    server = get_object_or_404(
        MinecraftServer,
        id=server_id,
        owner=request.user  # ✅ FIX
    )
    return server


@router.patch("{server_id}", response=ServerOut, auth=JWTAuth())
def update_server(request, server_id: UUID, payload: ServerUpdateIn):
    if not request.user.is_authenticated:  # ✅ FIX
        raise HttpError(401, "Unauthorized")

    try:
        server = MinecraftServer.objects.get(
            id=server_id,
            owner=request.user  # ✅ FIX
        )
    except MinecraftServer.DoesNotExist:
        raise HttpError(404, "Server not found")

    if payload.name is not None:
        server.name = payload.name

    if payload.is_active is not None:
        server.is_active = payload.is_active

    server.save()
    return server


@router.post("{server_id}/rotate-key", response=ServerWithKeyOut, auth=JWTAuth())
def rotate_api_key(request, server_id: UUID):
    if not request.user.is_authenticated:  # ✅ FIX
        raise HttpError(401, "Unauthorized")

    try:
        server = MinecraftServer.objects.get(
            id=server_id,
            owner=request.user  # ✅ FIX
        )
    except MinecraftServer.DoesNotExist:
        raise HttpError(404, "Server not found")

    server.rotate_api_key()
    return server


@router.delete("{server_id}", auth=JWTAuth())
def delete_server(request, server_id: UUID):
    server = get_object_or_404(
        MinecraftServer,
        id=server_id,
        owner=request.user  # ✅ FIX
    )
    server.delete()
    return {"success": True}


@router.get("{server_id}/ping", auth=JWTAuth())
def ping_server(request, server_id: UUID):
    if not request.user.is_authenticated:  # ✅ FIX
        raise HttpError(401, "Unauthorized")

    try:
        server = MinecraftServer.objects.get(
            id=server_id,
            owner=request.user  # ✅ FIX
        )
    except MinecraftServer.DoesNotExist:
        raise HttpError(404, "Server not found")

    threshold = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(seconds=60)
    is_connected = server.is_active and server.updated_at >= threshold

    return {
        "connected": is_connected,
        "last_seen": server.updated_at,
        "is_active": server.is_active,
    }


@router.post("{server_id}/heartbeat", auth=ServerAPIKeyAuth())
def heartbeat(request, server_id: UUID):
    server = request.server

    if str(server.id) != str(server_id):
        raise HttpError(403, "Forbidden")

    server.last_seen = datetime.datetime.now(datetime.timezone.utc)
    server.is_active = True
    server.save(update_fields=["last_seen", "is_active", "updated_at"])

    return {"ok": True}


@router.post("{server_id}/chat", auth=ServerAPIKeyAuth())
def bot_chat(request, server_id: UUID, data: ChatIn):
    server = request.server
    owner = request.user  # (kept but not used)

    if str(server.id) != str(server_id):
        raise HttpError(403, "Forbidden")

    try:
        bot_reply = generate_bot_response(data.message)
        success = True
    except Exception:
        bot_reply = ""
        success = False

    ChatLog.objects.create(
        server=request.server,
        user=request.user,
        player_uuid=data.player_uuid,
        player_username=data.player_username,
        player_message=data.message,
        bot_message=bot_reply,
        success=success
    )

    return {"response": bot_reply}