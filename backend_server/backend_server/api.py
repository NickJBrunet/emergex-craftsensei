from ninja import NinjaAPI
from accounts.api import router as accounts_router
from servers.api.chat import router as chat_router
from servers.api.server import router as servers_router

api = NinjaAPI()

api.add_router("/auth/", accounts_router)
api.add_router("/chat/", chat_router)
api.add_router("/servers/", servers_router)