import {BACKEND_BASE_URL} from "@/utils/api/config";

export async function apiRequest(endpoint, options = {}) {
  const url = `${BACKEND_BASE_URL}${endpoint}`;

  function getCSRFToken() {
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : null;
  }

  const defaultOptions = {
    credentials: "include", // Allows Next.js to remember cookie and save automatically.
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };

  const res = await fetch(url, config);

  // handle non-2xx responses
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  // auto parse json
  return res.json();
}