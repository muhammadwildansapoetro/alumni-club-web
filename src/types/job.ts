export type JobType = "remote" | "hybrid" | "onsite" | "full-time" | "part-time" | "contract" | "internship";

export const JOB_TYPE_LABELS: Record<JobType, string> = {
    remote: "Remote",
    hybrid: "Hybrid",
    onsite: "On-site",
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Kontrak",
    internship: "Magang",
};

export interface JobPoster {
    id: string;
    name: string;
    email: string;
    profile: {
        fullName: string;
        department: "TEP" | "TPN" | "TIN";
        entryYear: number;
    } | null;
}

export interface JobPosting {
    id: string;
    title: string;
    description: string;
    company: string | null;
    location: string | null;
    jobType: JobType | null;
    salaryRange: string | null;
    externalUrl: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    user: JobPoster;
}

export interface PaginatedJobsResponse {
    success: true;
    message: string;
    data: {
        items: JobPosting[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
}

export interface JobResponse {
    success: true;
    message: string;
    data: JobPosting;
}
