import { LoginRequest, LoginResponse, RegisterRequest } from "@/types/auth";
import { ApiError } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function request<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    const data = await res.json();

    if (!res.ok) {
        const err: ApiError = {
            message: data.error || data.message || "Unknown error",
            status: res.status,
        };
        throw err;
    }

    return data;
}

export const authService = {
    async login(payload: LoginRequest): Promise<LoginResponse["data"]> {
        const res = await request<LoginResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        console.log("res", res);
        return res.data; // { user, token, expiresIn }
    },

    async register(payload: RegisterRequest): Promise<any> {
        return request("/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },
};
