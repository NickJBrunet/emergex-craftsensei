import { SERVER_PING_ENDPOINT } from "@/utils/api/config";
import { apiRequest } from "@/utils/api/apiRequestHandler";

export default async function pingServer(serverId) {
    return await apiRequest(SERVER_PING_ENDPOINT(serverId), {
        method: "GET"
    });
}