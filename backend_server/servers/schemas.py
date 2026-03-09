import datetime
import uuid

from ninja import Schema

# Server Linking Schemas
class ServerCreateIn(Schema):
    name: str


class ServerUpdateIn(Schema):
    name: str | None = None
    is_active: bool | None = None


class ServerOut(Schema):
    id: uuid.UUID
    name: str
    is_active: bool
    created_at: datetime.datetime

    class Config:
        from_attributes = True


class ServerWithKeyOut(ServerOut):
    api_key: str  # only returned on create/rotate


# Chat Log
class ChatIn(Schema):
    message: str
    player_uuid: uuid.UUID
    player_username: str