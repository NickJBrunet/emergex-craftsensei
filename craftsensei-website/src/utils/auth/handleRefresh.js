import { USER_REFRESH_ENDPOINT } from "@/utils/api/config";
import { BACKEND_BASE_URL } from "@/utils/api/config";

export default async function handleRefresh() {
    const res = await fetch(`${BACKEND_BASE_URL}${USER_REFRESH_ENDPOINT}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        throw new Error("Refresh failed");
    }

    return res.json();
}