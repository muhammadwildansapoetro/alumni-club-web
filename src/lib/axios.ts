import axios from "axios";

export const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        const isAuthEndpoint =
            originalRequest?.url?.includes("/auth/login") ||
            originalRequest?.url?.includes("/auth/register") ||
            originalRequest?.url?.includes("/auth/verify-email");

        if (isAuthEndpoint) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("auth-storage");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    },
);
