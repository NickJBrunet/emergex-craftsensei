from ninja import Router
from ninja.errors import HttpError
from uuid import UUID

from accounts.auth import JWTAuth
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