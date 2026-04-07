import { SERVER_CREATE_ENDPOINT } from "@/utils/api/config";
import { apiRequest } from "@/utils/api/apiRequestHandler";

// payload: { name: "" }
export default async function createUserServer(payload) {
    return await apiRequest(SERVER_CREATE_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}