import { API } from "@/lib/axios";
import { FurtherEducation, WorkExperience } from "@/types/user";

export type UpdateProfilePayload = {
    profile: {
        fullName?: string;
        cityId?: number | null;
        cityName?: string | null;
        provinceId?: number | null;
        provinceName?: string | null;
        countryId?: number | null;
        countryName?: string;
        linkedInUrl?: string | null;
        instagramUrl?: string | null;
        graduationYear?: number;
        status?: string | null;
        furtherEducations?: FurtherEducation[] | null;
        workExperiences?: WorkExperience[] | null;
    };
};

export const updateOwnProfile = async (payload: UpdateProfilePayload) => {
    const res = await API.patch("/users/profile", payload);
    return res.data;
};
