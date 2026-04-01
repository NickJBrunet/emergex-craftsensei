import {USER_LOGOUT_ENDPOINT} from "@/utils/api/config";
import {apiRequest} from "@/utils/api/apiRequestHandler";

export default async function handleLogout() {

    // apiRequest will throw error if response status !2xx
    return await apiRequest(USER_LOGOUT_ENDPOINT, {
        method: "POST"
    });

    // do not handle error logic here, handle in UI components.

}