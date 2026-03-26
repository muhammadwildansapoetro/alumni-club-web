import { API } from "@/lib/axios";
import { JobType } from "@/types/job";

export type CreateJobPayload = {
    title: string;
    description: string;
    company?: string | null;
    location?: string | null;
    jobType?: JobType | null;
    salaryRange?: string | null;
    externalUrl?: string | null;
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
