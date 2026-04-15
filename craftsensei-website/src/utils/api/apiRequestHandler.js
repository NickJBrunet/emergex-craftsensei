import { BACKEND_BASE_URL } from "@/utils/api/config";
import handleRefresh from "@/utils/auth/handleRefresh";

export async function apiRequest(endpoint, options = {}, retry = true) {
  const url = `${BACKEND_BASE_URL}${endpoint}`;

  const defaultOptions = {
    credentials: "include",
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...(options.body && { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  };

  const res = await fetch(url, config);

  // On 401, attempt one token refresh then retry the original request
  if (res.status === 401 && retry) {
    try {
      await handleRefresh();                                // get new access_token cookie
      return apiRequest(endpoint, options, false);    // retry once, no further retries
    } catch {
      throw new Error("Session expired. Please log in again.");
    }
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  return res.json();
}