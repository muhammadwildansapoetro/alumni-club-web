import { useAuthStore } from "@/stores/auth.store";

export async function apiClient(path: string, options: RequestInit = {}) {
    const token = useAuthStore.getState().token;

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
            ...(options.headers || {}),
        },
    });
}
