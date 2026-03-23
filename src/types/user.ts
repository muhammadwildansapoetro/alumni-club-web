export interface AlumniProfile {
    id: number;
    fullName: string | null;
    department: "TEP" | "TPN" | "TIN";
    entryYear: number;
    cityName: string | null;
}

export interface AlumniUser {
    id: string;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
    authMethod: string;
    profile: AlumniProfile | null;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    authMethod: "EMAIL" | "GOOGLE" | "BOTH";
    id: string;
    email: string;
    name: string;
    role: string;
    profile: ProfileClass;
    createdAt: Date;
    updatedAt: Date;
}

export interface FurtherEducation {
    degree: "MAGISTER" | "DOCTOR";
    entryYear: number;
    graduationYear?: number | null;
    universityName: string;
    fieldOfStudy: string;
}

export interface WorkExperience {
    industry: EIndustry;
    jobLevel: EmploymentLevel;
    employmentType: EEmploymentType;
    incomeRange?: EIncomeRange | null;
    jobTitle: string;
    companyName: string;
    startYear: number;
    endYear?: number | null;
}

export interface ProfileClass {
    id: string;
    fullName: string;
    npm: string;
    department: string;
    entryYear: number;
    graduationYear: number | null;
    furtherEducations: FurtherEducation[] | null;
    cityId: number | null;
    cityName: string | null;
    provinceId: number | null;
    provinceName: string | null;
    countryId: number | null;
    countryName: string | null;
    workExperiences: WorkExperience[] | null;
    linkedInUrl: string | null;
    status: EAlumniStatus | null;
    createdAt: Date;
    updatedAt: Date;
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

export enum EDegree {
    MAGISTER = "MAGISTER",
    DOCTOR = "DOCTOR",
}

export const TDegree = {
    [EDegree.MAGISTER]: "Magister (S2)",
    [EDegree.DOCTOR]: "Doktor (S3)",
};

export enum EIncomeRange {
    BELOW_5M = "BELOW_5M",
    RANGE_5_10M = "RANGE_5_10M",
    RANGE_10_15M = "RANGE_10_15M",
    ABOVE_15M = "ABOVE_15M",
    UNKNOWN = "UNKNOWN",
}

export const TIncomeRange = {
    [EIncomeRange.BELOW_5M]: "Di bawah Rp 5 juta",
    [EIncomeRange.RANGE_5_10M]: "Rp 5–10 juta",
    [EIncomeRange.RANGE_10_15M]: "Rp 10–15 juta",
    [EIncomeRange.ABOVE_15M]: "Di atas Rp 15 juta",
    [EIncomeRange.UNKNOWN]: "Tidak ingin menyebutkan",
};

export const departmentBorderMap = {
    TEP: {
        firstCard: "border-primary border-t-8",
        card: "border-primary border-t",
        header: "border-primary/50 border-b",
    },
    TPN: {
        firstCard: "border-primary border-t-8",
        card: "border-red-500 border-t",
        header: "border-red-500/50 border-b",
    },
    TIN: {
        firstCard: "border-primary border-t-8",
        card: "border-orange-500 border-t",
        header: "border-orange-500/50 border-b",
    },
} as const;
