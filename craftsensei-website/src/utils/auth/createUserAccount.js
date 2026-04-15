import { USER_CREATE_ENDPOINT } from "@/utils/api/config";
import { apiRequest } from "@/utils/api/apiRequestHandler";

// Account Prop must be in format { email: '', password: ''}
export default async function createUserAccount(accountProp) {

    const data = await apiRequest(USER_CREATE_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(accountProp),
        credentials: "include",
    });

    localStorage.setItem("access", data.access);

    return data;
}