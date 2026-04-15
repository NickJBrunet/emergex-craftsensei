import { USER_LOGOUT_ENDPOINT } from "@/utils/api/config";
import { apiRequest } from "@/utils/api/apiRequestHandler";

export default async function handleLogout() {

    await apiRequest(USER_LOGOUT_ENDPOINT, {
        method: "POST"
    });
}