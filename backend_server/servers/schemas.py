import datetime
import uuid
from ninja import Schema


class ServerCreateIn(Schema):
    name: str
    owner_ign: str
    minecraft_version: str
    server_ip: str


class ServerUpdateIn(Schema):
    name: str | None = None
    is_active: bool | None = None
    minecraft_version: str | None = None
    owner_ign: str | None = None


class ServerOut(Schema):
    id: uuid.UUID
    name: str
    owner_ign: str
    minecraft_version: str
    server_ip: str
    is_active: bool
    created_at: datetime.datetime

    class Config:
        from_attributes = True


class ServerWithKeyOut(ServerOut):
    api_key: str


class ChatIn(Schema):
    message: str
    player_uuid: uuid.UUID
    player_username: str