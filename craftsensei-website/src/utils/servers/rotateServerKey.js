import { SERVER_ROTATE_KEY_ENDPOINT } from "@/utils/api/config";
import { apiRequest } from "@/utils/api/apiRequestHandler";

export default async function rotateServerKey(serverId) {
    return await apiRequest(SERVER_ROTATE_KEY_ENDPOINT(serverId), {
        method: "POST"
    });
}