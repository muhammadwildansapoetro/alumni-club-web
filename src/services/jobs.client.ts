import { API } from "@/lib/axios";
import { JobType, SalaryRange } from "@/types/job";

export type CreateJobPayload = {
    title: string;
    description: string;
    company?: string | null;
    jobType?: JobType | null;
    salaryRange?: SalaryRange | null;
    externalUrl?: string | null;
    cityId?: number | null;
    cityName?: string | null;
    provinceId?: number | null;
    provinceName?: string | null;
    countryId?: number | null;
    countryName?: string | null;
};

export type UpdateJobPayload = Partial<CreateJobPayload> & { isActive?: boolean };

export const createJob = async (payload: CreateJobPayload) => {
    const res = await API.post("/jobs", payload);
    return res.data;
};

export const updateJob = async (id: string, payload: UpdateJobPayload) => {
    const res = await API.patch(`/jobs/${id}`, payload);
    return res.data;
};

export const deleteJob = async (id: string) => {
    const res = await API.delete(`/jobs/${id}`);
    return res.data;
};
