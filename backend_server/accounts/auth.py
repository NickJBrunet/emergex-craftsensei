from ninja.security import APIKeyCookie
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()

class JWTAuth(APIKeyCookie):
    param_name = "access_token"

    def authenticate(self, request, key):
        if not key:
            print("No access_token cookie")
            return None
            
        try:
            validated = AccessToken(key)
            print(f"Token payload: {validated.payload}")  # DEBUG: See what's in token
            
            # Try multiple possible ID fields
            user_id = validated.get("user_id") or validated.get("id")
            if not user_id:
                print("No user_id or id in token payload")
                return None
                
            user = User.objects.get(id=user_id)
            return user
            
        except KeyError as e:
            print(f"JWT missing field: {e}")
            return None
        except User.DoesNotExist:
            print(f"User ID {user_id} not found")
            return None
        except Exception as e:
            print(f"JWT ERROR: {e}")
            return None
        

        