export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || null;

// auth
const auth_endpoint = "/api/auth"
export const USER_LOGIN_ENDPOINT = `${auth_endpoint}/login`
export const USER_LOGOUT_ENDPOINT = `${auth_endpoint}/logout`
export const USER_CREATE_ENDPOINT = `${auth_endpoint}/register`
export const USER_VALIDATE_ENDPOINT = `${auth_endpoint}/validate`

// servers
const servers_endpoint = "/api/servers"
export const SERVER_CREATE_ENDPOINT = `${servers_endpoint}/`
export const SERVER_LIST_ENDPOINT = `${servers_endpoint}/`

export const SERVER_GET_ENDPOINT = (id) => `${servers_endpoint}/${id}/`
export const SERVER_UPDATE_ENDPOINT = (id) => `${servers_endpoint}/${id}/`
export const SERVER_DELETE_ENDPOINT = (id) => `${servers_endpoint}/${id}/`

export const SERVER_ROTATE_KEY_ENDPOINT = (id) => `${servers_endpoint}/${id}/rotate-key/`
