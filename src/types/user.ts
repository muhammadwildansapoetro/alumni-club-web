export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    authProvider: string;
    profile: {
        id: string;
        fullName: string;
        npm: string;
        department: "TEP" | "TPN" | "TIN";
        classYear: number;
        graduationYear: number | null;
        employmentType: string | null;
        jobLevel: string | null;
        jobTitle: string | null;
        companyName: string | null;
        industry: string | null;
        incomeRange: string | null;
        cityId: string | null;
        cityName: string | null;
        provinceId: string | null;
        provinceName: string | null;
        countryId?: number | null;
        countryName: string | null;
        linkedInUrl: string | null;
        status: "WORKING" | "STUDYING" | "WORKING_STUDYING" | "ENTREPRENEUR" | "NOT_WORKING" | null;
        highestEducation: "MASTER" | "DOCTOR" | null;
    };
    createdAt: string;
}

export type UserRole = "USER" | "ADMIN";

export enum EDepartment {
    TEP = "TEP",
    TPN = "TPN",
    TIN = "TIN",
}

export const TDepartment = {
    [EDepartment.TEP]: "Teknik Pertanian",
    [EDepartment.TPN]: "Teknologi Pangan",
    [EDepartment.TIN]: "Teknologi Industri Pertanian",
};

export enum EIndustry {
    AGRICULTURE = "AGRICULTURE",
    HORTICULTURE = "HORTICULTURE",
    PLANTATION = "PLANTATION",
    LIVESTOCK = "LIVESTOCK",
    FISHERIES = "FISHERIES",
    FOOD_PROCESSING = "FOOD_PROCESSING",
    AGRI_CHEMICAL = "AGRI_CHEMICAL",
    AGRI_MACHINERY = "AGRI_MACHINERY",
    IRRIGATION = "IRRIGATION",
    MANUFACTURING = "MANUFACTURING",
    CONSTRUCTION = "CONSTRUCTION",
    MINING = "MINING",
    ENERGY = "ENERGY",
    TELECOMMUNICATION = "TELECOMMUNICATION",
    TRANSPORTATION = "TRANSPORTATION",
    LOGISTICS = "LOGISTICS",
    HEALTHCARE = "HEALTHCARE",
    HOSPITALITY = "HOSPITALITY",
    RETAIL = "RETAIL",
    REAL_ESTATE = "REAL_ESTATE",
    MEDIA = "MEDIA",
    ENTERTAINMENT = "ENTERTAINMENT",
    INFORMATION_TECHNOLOGY = "INFORMATION_TECHNOLOGY",
    E_COMMERCE = "E_COMMERCE",
    BANKING = "BANKING",
    INSURANCE = "INSURANCE",
    GOVERNMENT = "GOVERNMENT",
    EDUCATION = "EDUCATION",
    OTHER = "OTHER",
}

export const TIndustryField: Record<EIndustry, string> = {
    [EIndustry.AGRICULTURE]: "Agriculture (General)",
    [EIndustry.HORTICULTURE]: "Horticulture",
    [EIndustry.PLANTATION]: "Plantation",
    [EIndustry.LIVESTOCK]: "Livestock",
    [EIndustry.FISHERIES]: "Fisheries",
    [EIndustry.FOOD_PROCESSING]: "Food Processing",
    [EIndustry.AGRI_CHEMICAL]: "Agrochemical",
    [EIndustry.AGRI_MACHINERY]: "Agricultural Machinery",
    [EIndustry.IRRIGATION]: "Irrigation & Water Management",
    [EIndustry.MANUFACTURING]: "Manufacturing",
    [EIndustry.CONSTRUCTION]: "Construction",
    [EIndustry.MINING]: "Mining",
    [EIndustry.ENERGY]: "Energy",
    [EIndustry.TELECOMMUNICATION]: "Telecommunication",
    [EIndustry.TRANSPORTATION]: "Transportation",
    [EIndustry.LOGISTICS]: "Logistics & Supply Chain",
    [EIndustry.HEALTHCARE]: "Healthcare",
    [EIndustry.HOSPITALITY]: "Hospitality & Tourism",
    [EIndustry.RETAIL]: "Retail",
    [EIndustry.REAL_ESTATE]: "Real Estate",
    [EIndustry.MEDIA]: "Media",
    [EIndustry.ENTERTAINMENT]: "Entertainment",
    [EIndustry.INFORMATION_TECHNOLOGY]: "Information Technology (IT)",
    [EIndustry.E_COMMERCE]: "E-Commerce",
    [EIndustry.BANKING]: "Banking",
    [EIndustry.INSURANCE]: "Insurance",
    [EIndustry.GOVERNMENT]: "Government / Public Sector",
    [EIndustry.EDUCATION]: "Education",
    [EIndustry.OTHER]: "Other",
};

export enum EEmploymentType {
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    SELF_EMPLOYED = "SELF_EMPLOYED",
    FREELANCE = "FREELANCE",
    CONTRACT = "CONTRACT",
    INTERNSHIP = "INTERNSHIP",
    SEASONAL = "SEASONAL",
    APPRENTICESHIP = "APPRENTICESHIP",
}

export const TEmploymentType = {
    [EEmploymentType.FULL_TIME]: "Full Time",
    [EEmploymentType.PART_TIME]: "Part Time",
    [EEmploymentType.SELF_EMPLOYED]: "Self Employed",
    [EEmploymentType.FREELANCE]: "Freelance",
    [EEmploymentType.CONTRACT]: "Contract",
    [EEmploymentType.INTERNSHIP]: "Internship",
    [EEmploymentType.SEASONAL]: "Seasonal",
    [EEmploymentType.APPRENTICESHIP]: "Apprenticeship",
};

export enum EmploymentLevel {
    INTERN = "INTERN",
    STAFF = "STAFF",
    SUPERVISOR = "SUPERVISOR",
    MANAGER = "MANAGER",
    SENIOR_MANAGER = "SENIOR_MANAGER",
    DIRECTOR = "DIRECTOR",
    VP = "VP",
    C_LEVEL = "C_LEVEL",
    FOUNDER = "FOUNDER",
    OTHER = "OTHER",
}

export const TEmploymentLevel: Record<EmploymentLevel, string> = {
    [EmploymentLevel.INTERN]: "Intern / Trainee",
    [EmploymentLevel.STAFF]: "Staff / Associate",
    [EmploymentLevel.SUPERVISOR]: "Supervisor",
    [EmploymentLevel.MANAGER]: "Manager",
    [EmploymentLevel.SENIOR_MANAGER]: "Senior Manager",
    [EmploymentLevel.DIRECTOR]: "Director",
    [EmploymentLevel.VP]: "Vice President (VP)",
    [EmploymentLevel.C_LEVEL]: "C-Level",
    [EmploymentLevel.FOUNDER]: "Founder / Co-Founder",
    [EmploymentLevel.OTHER]: "Other",
};

export enum EAlumniStatus {
    WORKING = "WORKING",
    STUDYING = "STUDYING",
    WORKING_STUDYING = "WORKING_STUDYING",
    ENTREPRENEUR = "ENTREPRENEUR",
    NOT_WORKING = "NOT_WORKING",
}

export const TAlumniStatus = {
    [EAlumniStatus.WORKING]: "Bekerja",
    [EAlumniStatus.STUDYING]: "Melanjutkan Studi",
    [EAlumniStatus.WORKING_STUDYING]: "Bekerja & Melanjutkan Studi",
    [EAlumniStatus.ENTREPRENEUR]: "Wirausaha",
    [EAlumniStatus.NOT_WORKING]: "Belum Bekerja",
};
