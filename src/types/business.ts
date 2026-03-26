export interface BusinessOwnerBrief {
    id: string;
    name: string;
    email: string;
    profile: {
        fullName: string;
        department: "TEP" | "TPN" | "TIN" | "Teknotan";
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
        department: "TEP" | "TPN" | "TIN" | "Teknotan";
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
    category: string | null;
    location: string | null;
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

export interface PaginatedBusinessResponse {
    success: true;
    message: string;
    data: Business[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface BusinessResponse {
    success: true;
    message: string;
    data: Business;
}
