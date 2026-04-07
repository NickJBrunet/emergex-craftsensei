import { BACKEND_BASE_URL, USER_VALIDATE_ENDPOINT } from "@/utils/api/config";
import { apiRequest } from "@/utils/api/apiRequestHandler";

export default async function handleValidation() {
  return await apiRequest(USER_VALIDATE_ENDPOINT, {
    method: "GET",
  });
}