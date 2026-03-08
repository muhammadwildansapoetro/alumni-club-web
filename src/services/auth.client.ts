import { API } from "@/lib/axios";

export const logout = async () => {
    return API.post("/auth/logout");
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
    return API.post("/auth/change-password", { currentPassword, newPassword });
};
