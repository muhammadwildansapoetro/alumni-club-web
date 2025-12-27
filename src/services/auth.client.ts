import { api } from "@/lib/axios";

export const refreshSession = async () => {
    return api.post("/auth/refresh");
};

export const logout = async () => {
    return api.post("/auth/logout");
};
