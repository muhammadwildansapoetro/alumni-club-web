import { API } from "@/lib/axios";
import type { CreateBusinessInput, UpdateBusinessInput } from "@/types/business";

export const createBusiness = async (payload: CreateBusinessInput) => {
    const res = await API.post("/businesses", payload);
    return res.data;
};

export const updateBusiness = async (id: string, payload: UpdateBusinessInput) => {
    const res = await API.patch(`/businesses/${id}`, payload);
    return res.data;
};

export const deleteBusiness = async (id: string) => {
    const res = await API.delete(`/businesses/${id}`);
    return res.data;
};
