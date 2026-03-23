import {USER_LOGIN_ENDPOINT} from "@/utils/api/config";
import {apiRequest} from "@/utils/api/apiRequestHandler";
import {log} from "next/dist/server/typescript/utils";

// Login prop must be in format { email: '', password: ''}
export default async function handleLogin(loginProp) {

    // apiRequest will throw error if response status !2xx
    return await apiRequest(USER_LOGIN_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(loginProp)
    });

    // do not handle error logic here, handle in UI components.

}