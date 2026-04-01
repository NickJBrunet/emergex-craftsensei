import {USER_CREATE_ENDPOINT} from "@/utils/api/config";
import {apiRequest} from "@/utils/api/apiRequestHandler";

// Account Prop must be in format { email: '', password: ''}
export default async function createUserAccount(accountProp) {

    // apiRequest will throw error if response status !2xx
    return await apiRequest(USER_CREATE_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(accountProp)
    });

    // do not handle error logic here, handle in UI components.

}