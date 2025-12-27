import { refreshSession } from "@/services/auth.client";
import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let queue: (() => void)[] = [];

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 1️⃣ Exclude auth endpoints
        const isAuthEndpoint =
            originalRequest?.url?.includes("/auth/login") ||
            originalRequest?.url?.includes("/auth/register") ||
            originalRequest?.url?.includes("/auth/verify-email") ||
            originalRequest?.url?.includes("/auth/refresh");

        if (isAuthEndpoint) {
            return Promise.reject(error);
        }

        // 2️⃣ Handle expired access token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // If refresh already running → wait
            if (isRefreshing) {
                await new Promise<void>((resolve) => queue.push(resolve));
                return api(originalRequest);
            }

            isRefreshing = true;

            try {
                await refreshSession();

                // Release queued requests
                queue.forEach((cb) => cb());
                queue = [];

                return api(originalRequest);
            } catch (err) {
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);
