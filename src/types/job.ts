export type JobType = "remote" | "hybrid" | "onsite" | "full-time" | "part-time" | "contract" | "internship";

export type SalaryRange = "BELOW_5M" | "RANGE_5_10M" | "RANGE_10_15M" | "ABOVE_15M" | "UNKNOWN";

export const JOB_TYPE_LABELS: Record<JobType, string> = {
    remote: "Remote",
    hybrid: "Hybrid",
    onsite: "On-site",
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Kontrak",
    internship: "Magang",
};

export const SALARY_RANGE_LABELS: Record<SalaryRange, string> = {
    BELOW_5M: "Di bawah 5 juta",
    RANGE_5_10M: "5 – 10 juta",
    RANGE_10_15M: "10 – 15 juta",
    ABOVE_15M: "Di atas 15 juta",
    UNKNOWN: "Tidak disebutkan",
};

export interface JobPoster {
    id: string;
    name: string | null;
    email: string;
    profile: {
        fullName: string;
        department: "TEP" | "TPN" | "TIN" | "TEKNOTAN";
        entryYear: number;
    } | null;
}

export interface JobPosterDetailed {
    id: string;
    name: string | null;
    email: string;
    profile: {
        fullName: string;
        department: "TEP" | "TPN" | "TIN" | "TEKNOTAN";
        entryYear: number;
        cityId: number | null;
        cityName: string | null;
        provinceId: number | null;
        provinceName: string | null;
        workExperiences: unknown;
    } | null;
}

export interface JobPosting {
    id: string;
    title: string;
    description: string;
    company: string | null;
    jobType: JobType | null;
    salaryRange: SalaryRange | null;
    externalUrl: string | null;
    isActive: boolean;
    cityId: number | null;
    cityName: string | null;
    provinceId: number | null;
    provinceName: string | null;
    countryId: number | null;
    countryName: string | null;
    createdAt: string;
    updatedAt: string;
    user: JobPoster;
}

export interface JobPostingDetailed extends Omit<JobPosting, "user"> {
    user: JobPosterDetailed;
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
    data: JobPostingDetailed;
}
