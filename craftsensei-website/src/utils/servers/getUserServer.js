import { SERVER_GET_ENDPOINT } from "@/utils/api/config";
import { apiRequest } from "@/utils/api/apiRequestHandler";

export default async function getUserServer(serverId) {
    return await apiRequest(SERVER_GET_ENDPOINT(serverId), {
        method: "GET"
    });
}