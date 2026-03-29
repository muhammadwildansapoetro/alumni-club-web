import { IndustryField } from "./job";

export interface BusinessOwnerBrief {
    id: string;
    name: string;
    email: string;
    profile: {
        fullName: string;
        department: "TEP" | "TPN" | "TIN" | "TEKNOTAN" | "MTA" | "MTIN" | "DTA";
        entryYear: number;
    } | null;
}

export interface WorkExperience {
    company: string;
    position: string;
    startYear: number;
    endYear: number | null;
    isCurrent: boolean;
}

export interface BusinessOwnerDetail extends BusinessOwnerBrief {
    profile: {
        fullName: string;
        department: "TEP" | "TPN" | "TIN" | "TEKNOTAN" | "MTA" | "MTIN" | "DTA";
        entryYear: number;
        cityId: number | null;
        cityName: string | null;
        provinceId: number | null;
        provinceName: string | null;
        workExperiences: WorkExperience[];
    } | null;
}

export interface Business {
    id: string;
    userId: string;
    businessName: string;
    description: string;
    industry: IndustryField | null;
    instagramUrl: string | null;
    countryId: number | null;
    countryName: string | null;
    provinceId: number | null;
    provinceName: string | null;
    cityId: number | null;
    cityName: string | null;
    website: string | null;
    contactInfo: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    user: BusinessOwnerBrief;
}

export interface BusinessDetail extends Business {
    user: BusinessOwnerDetail;
}

export interface BusinessFilters {
    page?: number;
    limit?: number;
    search?: string;
    industry?: IndustryField;
    isActive?: boolean;
}

export interface PaginatedBusinessResponse {
    success: boolean;
    message: string;
    data: Business[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface BusinessResponse {
    success: boolean;
    message: string;
    data: Business;
}

export interface CreateBusinessInput {
    businessName: string;
    description: string;
    industry?: IndustryField;
    instagramUrl?: string | null;
    countryId?: number | null;
    countryName?: string | null;
    provinceId?: number | null;
    provinceName?: string | null;
    cityId?: number | null;
    cityName?: string | null;
    website?: string;
    contactInfo?: string;
}

export type UpdateBusinessInput = Partial<CreateBusinessInput> & {
    isActive?: boolean;
};
