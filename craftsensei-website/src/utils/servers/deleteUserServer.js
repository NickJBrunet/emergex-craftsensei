import { SERVER_DELETE_ENDPOINT } from "@/utils/api/config";
import { apiRequest } from "@/utils/api/apiRequestHandler";

export default async function deleteUserServer(serverId) {
    return await apiRequest(SERVER_DELETE_ENDPOINT(serverId), {
        method: "DELETE"
    });
}