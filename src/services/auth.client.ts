import { API } from "@/lib/axios";

export const logout = async () => {
    return API.post("/auth/logout");
};
