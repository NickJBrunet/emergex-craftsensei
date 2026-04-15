import { SERVER_LIST_ENDPOINT } from "@/utils/api/config";
import { apiRequest } from "@/utils/api/apiRequestHandler";

export default async function getUserServers() {
    return await apiRequest(SERVER_LIST_ENDPOINT, {
        method: "GET"
    });
}