from ninja import NinjaAPI
from accounts.api import router as accounts_router
from servers.api import router as servers_router

api = NinjaAPI(csrf=False)  # type: ignore

api.add_router("/auth/", accounts_router)
api.add_router("/servers/", servers_router)