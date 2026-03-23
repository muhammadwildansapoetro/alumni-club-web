import { API } from "@/lib/axios";

export const logout = async () => {
    return API.post("/auth/logout");
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
    return API.post("/auth/change-password", { currentPassword, newPassword });
};

export const forgotPassword = async (email: string) => {
    return API.post("/auth/forgot-password", { email });
};

export const resetPassword = async (token: string, password: string) => {
    return API.post("/auth/reset-password", { token, password });
};
