import datetime
import uuid
from typing import Optional
from ninja import Schema


class ServerCreateIn(Schema):
    name: str
    owner_ign: str


class ServerUpdateIn(Schema):
    name: Optional[str] = None
    is_active: Optional[bool] = None
    owner_ign: Optional[str] = None


class ServerOut(Schema):
    id: uuid.UUID
    name: str
    owner_ign: str
    is_active: bool
    created_at: datetime.datetime
    last_seen: Optional[datetime.datetime] = None   # 🔥 FIX

    class Config:
        from_attributes = True


class ServerWithKeyOut(ServerOut):
    api_key: str


class ChatIn(Schema):
    message: str
    player_uuid: uuid.UUID
    player_username: str