import datetime

from ninja import Router
from ninja.errors import HttpError
from uuid import UUID

from accounts.auth import JWTAuth
from servers.auth import ServerAPIKeyAuth
from servers.models import MinecraftServer
from servers.schemas import (
    ServerCreateIn,
    ServerUpdateIn,
    ServerOut,
    ServerWithKeyOut,
)

router = Router()


@router.post("", response=ServerWithKeyOut, auth=JWTAuth())
def create_server(request, payload: ServerCreateIn):
    """
    Create a new Minecraft server and generate API key.
    """
    if not request.auth:
        raise HttpError(401, "Unauthorized")

    server = MinecraftServer.objects.create(
        owner=request.auth,
        name=payload.name,
        owner_ign=payload.owner_ign,
        minecraft_version=payload.minecraft_version,
    )
    return server


@router.get("", response=list[ServerWithKeyOut], auth=JWTAuth())
def list_servers(request):
    """
    List all servers owned by authenticated user.
    """
    if not request.auth:
        raise HttpError(401, "Unauthorized")

    return MinecraftServer.objects.filter(owner=request.auth)  # ✅ fixed


@router.get("{server_id}", response=ServerWithKeyOut, auth=JWTAuth())
def get_server(request, server_id: UUID):
    """
    Retrieve a single server owned by the user.
    """
    if not request.auth:
        raise HttpError(401, "Unauthorized")

    try:
        return MinecraftServer.objects.get(
            id=server_id,
            owner=request.auth
        )
    except MinecraftServer.DoesNotExist:
        raise HttpError(404, "Server not found")


@router.patch("{server_id}", response=ServerOut, auth=JWTAuth())
def update_server(request, server_id: UUID, payload: ServerUpdateIn):
    """
    Update server metadata (name, active state).
    """
    if not request.auth:
        raise HttpError(401, "Unauthorized")

    try:
        server = MinecraftServer.objects.get(
            id=server_id,
            owner=request.auth
        )
    except MinecraftServer.DoesNotExist:
        raise HttpError(404, "Server not found")

    if payload.name is not None:
        server.name = payload.name

    if payload.is_active is not None:
        server.is_active = payload.is_active

    if payload.minecraft_version is not None:   # ✅ added
        server.minecraft_version = payload.minecraft_version

    if payload.owner_ign is not None:           # ✅ added
        server.owner_ign = payload.owner_ign

    server.save()
    return server


@router.post("{server_id}/rotate-key", response=ServerWithKeyOut, auth=JWTAuth())
def rotate_api_key(request, server_id: UUID):
    """
    Rotate the API key (for compromised plugin keys).
    """
    if not request.auth:
        raise HttpError(401, "Unauthorized")

    try:
        server = MinecraftServer.objects.get(
            id=server_id,
            owner=request.auth
        )
    except MinecraftServer.DoesNotExist:
        raise HttpError(404, "Server not found")

    server.rotate_api_key()
    return server


@router.delete("{server_id}", auth=JWTAuth())
def delete_server(request, server_id: UUID):
    """
    Hard delete a server (irreversible).
    """
    if not request.auth:
        raise HttpError(401, "Unauthorized")

    deleted, _ = MinecraftServer.objects.filter(
        id=server_id,
        owner=request.auth
    ).delete()

    if not deleted:
        raise HttpError(404, "Server not found")

    return {"success": True}

@router.get("{server_id}/ping", auth=JWTAuth())
def ping_server(request, server_id: UUID):
    """
    Returns whether the server is actively connected.
    A server is considered live if it's active and has communicated within the last 60 seconds.
    """
    if not request.auth:
        raise HttpError(401, "Unauthorized")

    try:
        server = MinecraftServer.objects.get(
            id=server_id,
            owner=request.auth
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

import datetime

@router.post("{server_id}/heartbeat", auth=ServerAPIKeyAuth())
def heartbeat(request, server_id: UUID):
    """
    Called periodically by the plugin to signal it's alive.
    Uses X-API-Key auth, same as the chat endpoint.
    """
    server = request.server  # attached by ServerAPIKeyAuth

    if str(server.id) != str(server_id):
        raise HttpError(403, "Forbidden")

    server.last_seen = datetime.datetime.now(datetime.timezone.utc)
    server.is_active = True
    server.save(update_fields=["last_seen", "is_active", "updated_at"])

    return {"ok": True}