import { API } from "@/lib/axios";

export type CreateBusinessPayload = {
    businessName: string;
    description: string;
    category?: string | null;
    location?: string | null;
    website?: string | null;
    contactInfo?: string | null;
};

export type UpdateBusinessPayload = Partial<CreateBusinessPayload> & { isActive?: boolean };

export const createBusiness = async (payload: CreateBusinessPayload) => {
    const res = await API.post("/businesses", payload);
    return res.data;
};

export const updateBusiness = async (id: string, payload: UpdateBusinessPayload) => {
    const res = await API.patch(`/businesses/${id}`, payload);
    return res.data;
};

export const deleteBusiness = async (id: string) => {
    const res = await API.delete(`/businesses/${id}`);
    return res.data;
};
