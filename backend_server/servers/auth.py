from ninja.security import APIKeyHeader
from .models import MinecraftServer


class ServerAPIKeyAuth(APIKeyHeader):
    param_name = "X-API-Key"  # header name the plugin will send

    def authenticate(self, request, key):
        try:
            server = MinecraftServer.objects.get(
                api_key=key
            )

            # Attach useful context
            request.server = server
            request.user = server.owner  # maps plugin → owner account

            return server
        except MinecraftServer.DoesNotExist:
            return None