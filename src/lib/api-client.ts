import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------- REQUEST INTERCEPTOR ----------
// Automatically attach JWT

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

// ---------- RESPONSE INTERCEPTOR ----------
// Handle global API errors

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error?.response?.status;

    // Unauthorized → logout user
    if (status === 401) {
      useAuthStore.getState().logout();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    // Rate limit exceeded
    if (status === 429) {
      console.warn("Rate limit exceeded");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
