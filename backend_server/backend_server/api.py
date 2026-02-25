from ninja import NinjaAPI
from accounts.api import router as accounts_router

api = NinjaAPI()
api.add_router("/auth/", accounts_router)