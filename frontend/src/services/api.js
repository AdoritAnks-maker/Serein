import axios from "axios";

export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
export const SOCKET_URL = (import.meta.env.VITE_SOCKET_URL || API_URL.replace(/\/api$/, "")).replace(/\/$/, "");

const api = axios.create({ baseURL: API_URL });

export default api;
