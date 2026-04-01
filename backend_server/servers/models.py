import secrets

from django.db import models
from django.conf import settings
import uuid



class MinecraftServer(models.Model):
    """
    Represents a registered Minecraft server instance linked to a user.
    Used for API key authentication from plugins.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="servers"
    )

    name = models.CharField(max_length=100)

    owner_ign = models.CharField(max_length=20)

    minecraft_version = models.CharField(max_length=20, default="1.20")

    server_ip = models.CharField(max_length=50)

    api_key = models.CharField(
        max_length=64,
        unique=True,
        db_index=True,
        editable=False
    )

    is_active = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def rotate_api_key(self):
        self.api_key = secrets.token_hex(32)
        self.save(update_fields=["api_key", "updated_at"])

    def save(self, *args, **kwargs):
        if not self.api_key:
            self.api_key = secrets.token_hex(32)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.owner_id})"


class ChatLog(models.Model):
    id = models.BigAutoField(primary_key=True)

    server = models.ForeignKey(
        "MinecraftServer",
        on_delete=models.CASCADE,
        related_name="chat_logs"
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    player_uuid = models.UUIDField(db_index=True)
    player_username = models.CharField(max_length=50)

    player_message = models.TextField()
    bot_message = models.TextField(blank=True)

    success = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)