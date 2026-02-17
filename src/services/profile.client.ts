import { api } from "@/lib/axios";

export type UpdateProfilePayload = {
    profile: {
        fullName?: string;
        npm?: string;
        department?: string;
        classYear?: number;
        graduationYear?: number;
        highestEducation?: string | null;
        status?: string;
        linkedInUrl?: string;
        countryId?: string | null;
    };
};

export const updateOwnProfile = async (payload: UpdateProfilePayload) => {
    const res = await api.patch("/users/profile", payload);
    return res.data;
};
