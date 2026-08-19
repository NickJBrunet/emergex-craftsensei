import { SERVER_UPDATE_ENDPOINT } from "@/utils/api/config";
import { apiRequest } from "@/utils/api/apiRequestHandler";

// payload: { name?: "", is_active?: boolean }
export default async function updateUserServer(serverId, payload) {
    return await apiRequest(SERVER_UPDATE_ENDPOINT(serverId), {
        method: "PATCH",
        body: JSON.stringify(payload)
    });
}