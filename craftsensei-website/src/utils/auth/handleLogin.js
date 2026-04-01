import {USER_LOGIN_ENDPOINT} from "@/utils/api/config";
import {apiRequest} from "@/utils/api/apiRequestHandler";

// Account Prop must be in format { email: '', password: ''}
export default async function handleLogin(accountProp) {

    console.log(accountProp)

    // apiRequest will throw error if response status !2xx
    return await apiRequest(USER_LOGIN_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(accountProp)
    });

    // do not handle error logic here, handle in UI components.

}