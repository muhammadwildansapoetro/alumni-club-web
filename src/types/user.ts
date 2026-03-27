export interface AlumniProfile {
    id: string;
    fullName: string | null;
    department: "TEP" | "TPN" | "TIN";
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
    instagramUrl: string | null;
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
    instagramUrl: string | null;
    status: EAlumniStatus | null;
    createdAt: Date;
    updatedAt: Date;
}

export type UserRole = "USER" | "ADMIN";

export enum EDepartment {
    TEP = "TEP",
    TPN = "TPN",
    TIN = "TIN",
    TEKNOTAN = "TEKNOTAN",
}

export const TDepartment = {
    [EDepartment.TEP]: "Teknik Pertanian",
    [EDepartment.TPN]: "Teknologi Pangan",
    [EDepartment.TIN]: "Teknologi Industri Pertanian",
    [EDepartment.TEKNOTAN]: "Teknologi Pertanian",
};

export enum EIndustry {
    AGRICULTURE = "AGRICULTURE",
    FOOD_TECH = "FOOD_TECH",
    BIOTECH = "BIOTECH",
    RESEARCH = "RESEARCH",
    EDUCATION = "EDUCATION",
    ENGINEERING = "ENGINEERING",
    BUSINESS = "BUSINESS",
    MARKETING = "MARKETING",
    FINANCE = "FINANCE",
    GOVERNMENT = "GOVERNMENT",
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
    CONSULTING = "CONSULTING",
    LEGAL = "LEGAL",
    MEDIA = "MEDIA",
    ENTERTAINMENT = "ENTERTAINMENT",
    INFORMATION_TECHNOLOGY = "INFORMATION_TECHNOLOGY",
    E_COMMERCE = "E_COMMERCE",
    BANKING = "BANKING",
    INSURANCE = "INSURANCE",
    OTHER = "OTHER",
}

export const TIndustryField: Record<EIndustry, string> = {
    [EIndustry.AGRICULTURE]: "Pertanian",
    [EIndustry.FOOD_TECH]: "Teknologi Pangan",
    [EIndustry.BIOTECH]: "Bioteknologi",
    [EIndustry.RESEARCH]: "Penelitian",
    [EIndustry.EDUCATION]: "Pendidikan",
    [EIndustry.ENGINEERING]: "Teknik",
    [EIndustry.BUSINESS]: "Bisnis",
    [EIndustry.MARKETING]: "Pemasaran",
    [EIndustry.FINANCE]: "Keuangan",
    [EIndustry.GOVERNMENT]: "Pemerintahan",
    [EIndustry.HORTICULTURE]: "Hortikultura",
    [EIndustry.PLANTATION]: "Perkebunan",
    [EIndustry.LIVESTOCK]: "Peternakan",
    [EIndustry.FISHERIES]: "Perikanan",
    [EIndustry.FOOD_PROCESSING]: "Pengolahan Pangan",
    [EIndustry.AGRI_CHEMICAL]: "Agrokimia",
    [EIndustry.AGRI_MACHINERY]: "Alat & Mesin Pertanian",
    [EIndustry.IRRIGATION]: "Irigasi",
    [EIndustry.MANUFACTURING]: "Manufaktur",
    [EIndustry.CONSTRUCTION]: "Konstruksi",
    [EIndustry.MINING]: "Pertambangan",
    [EIndustry.ENERGY]: "Energi",
    [EIndustry.TELECOMMUNICATION]: "Telekomunikasi",
    [EIndustry.TRANSPORTATION]: "Transportasi",
    [EIndustry.LOGISTICS]: "Logistik",
    [EIndustry.HEALTHCARE]: "Kesehatan",
    [EIndustry.HOSPITALITY]: "Perhotelan",
    [EIndustry.RETAIL]: "Ritel",
    [EIndustry.REAL_ESTATE]: "Properti",
    [EIndustry.CONSULTING]: "Konsultan",
    [EIndustry.LEGAL]: "Hukum",
    [EIndustry.MEDIA]: "Media",
    [EIndustry.ENTERTAINMENT]: "Hiburan",
    [EIndustry.INFORMATION_TECHNOLOGY]: "Teknologi Informasi",
    [EIndustry.E_COMMERCE]: "E-Commerce",
    [EIndustry.BANKING]: "Perbankan",
    [EIndustry.INSURANCE]: "Asuransi",
    [EIndustry.OTHER]: "Lainnya",
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

export enum EFieldOfStudy {
    // Agricultural Technology
    AGRICULTURAL_ENGINEERING = "AGRICULTURAL_ENGINEERING",
    AGRICULTURAL_INDUSTRIAL_TECHNOLOGY = "AGRICULTURAL_INDUSTRIAL_TECHNOLOGY",
    AGRICULTURAL_PRODUCT_TECHNOLOGY = "AGRICULTURAL_PRODUCT_TECHNOLOGY",
    POST_HARVEST_TECHNOLOGY = "POST_HARVEST_TECHNOLOGY",
    FOOD_TECHNOLOGY = "FOOD_TECHNOLOGY",
    BIOSYSTEMS_ENGINEERING = "BIOSYSTEMS_ENGINEERING",
    ENVIRONMENTAL_ENGINEERING_AGRI = "ENVIRONMENTAL_ENGINEERING_AGRI",
    AGRIBUSINESS = "AGRIBUSINESS",
    AGRONOMY = "AGRONOMY",
    HORTICULTURE = "HORTICULTURE",
    PLANTATION = "PLANTATION",
    SOIL_SCIENCE = "SOIL_SCIENCE",
    PLANT_PROTECTION = "PLANT_PROTECTION",
    ANIMAL_HUSBANDRY = "ANIMAL_HUSBANDRY",
    AQUACULTURE = "AQUACULTURE",
    FISHERIES = "FISHERIES",
    FORESTRY = "FORESTRY",
    RURAL_DEVELOPMENT = "RURAL_DEVELOPMENT",
    // Natural & Applied Sciences
    BIOLOGY = "BIOLOGY",
    CHEMISTRY = "CHEMISTRY",
    PHYSICS = "PHYSICS",
    MATHEMATICS = "MATHEMATICS",
    STATISTICS = "STATISTICS",
    ENVIRONMENTAL_SCIENCE = "ENVIRONMENTAL_SCIENCE",
    BIOTECHNOLOGY = "BIOTECHNOLOGY",
    MICROBIOLOGY = "MICROBIOLOGY",
    BIOCHEMISTRY = "BIOCHEMISTRY",
    NUTRITION_SCIENCE = "NUTRITION_SCIENCE",
    PHARMACY = "PHARMACY",
    MEDICINE = "MEDICINE",
    NURSING = "NURSING",
    PUBLIC_HEALTH = "PUBLIC_HEALTH",
    VETERINARY = "VETERINARY",
    // Engineering & Technology
    CIVIL_ENGINEERING = "CIVIL_ENGINEERING",
    MECHANICAL_ENGINEERING = "MECHANICAL_ENGINEERING",
    ELECTRICAL_ENGINEERING = "ELECTRICAL_ENGINEERING",
    INDUSTRIAL_ENGINEERING = "INDUSTRIAL_ENGINEERING",
    CHEMICAL_ENGINEERING = "CHEMICAL_ENGINEERING",
    COMPUTER_SCIENCE = "COMPUTER_SCIENCE",
    INFORMATION_TECHNOLOGY = "INFORMATION_TECHNOLOGY",
    INFORMATION_SYSTEMS = "INFORMATION_SYSTEMS",
    ELECTRONICS_ENGINEERING = "ELECTRONICS_ENGINEERING",
    TELECOMMUNICATIONS = "TELECOMMUNICATIONS",
    MATERIAL_ENGINEERING = "MATERIAL_ENGINEERING",
    PETROLEUM_ENGINEERING = "PETROLEUM_ENGINEERING",
    MINING_ENGINEERING = "MINING_ENGINEERING",
    ARCHITECTURE = "ARCHITECTURE",
    // Business & Social Sciences
    MANAGEMENT = "MANAGEMENT",
    ACCOUNTING = "ACCOUNTING",
    ECONOMICS = "ECONOMICS",
    FINANCE = "FINANCE",
    BUSINESS_ADMINISTRATION = "BUSINESS_ADMINISTRATION",
    MARKETING = "MARKETING",
    INTERNATIONAL_RELATIONS = "INTERNATIONAL_RELATIONS",
    LAW = "LAW",
    POLITICAL_SCIENCE = "POLITICAL_SCIENCE",
    SOCIOLOGY = "SOCIOLOGY",
    PSYCHOLOGY = "PSYCHOLOGY",
    COMMUNICATION = "COMMUNICATION",
    PUBLIC_ADMINISTRATION = "PUBLIC_ADMINISTRATION",
    // Education & Humanities
    EDUCATION = "EDUCATION",
    LITERATURE = "LITERATURE",
    LINGUISTICS = "LINGUISTICS",
    HISTORY = "HISTORY",
    PHILOSOPHY = "PHILOSOPHY",
    GEOGRAPHY = "GEOGRAPHY",
    ARTS = "ARTS",
    // Other
    OTHER = "OTHER",
}

export const TFieldOfStudy: Record<EFieldOfStudy, string> = {
    [EFieldOfStudy.AGRICULTURAL_ENGINEERING]: "Teknik Pertanian",
    [EFieldOfStudy.AGRICULTURAL_INDUSTRIAL_TECHNOLOGY]: "Teknologi Industri Pertanian",
    [EFieldOfStudy.AGRICULTURAL_PRODUCT_TECHNOLOGY]: "Teknologi Hasil Pertanian",
    [EFieldOfStudy.POST_HARVEST_TECHNOLOGY]: "Teknologi Pascapanen",
    [EFieldOfStudy.FOOD_TECHNOLOGY]: "Teknologi Pangan",
    [EFieldOfStudy.BIOSYSTEMS_ENGINEERING]: "Teknik Biosistem",
    [EFieldOfStudy.ENVIRONMENTAL_ENGINEERING_AGRI]: "Teknik Lingkungan Pertanian",
    [EFieldOfStudy.AGRIBUSINESS]: "Agribisnis",
    [EFieldOfStudy.AGRONOMY]: "Agronomi",
    [EFieldOfStudy.HORTICULTURE]: "Hortikultura",
    [EFieldOfStudy.PLANTATION]: "Perkebunan",
    [EFieldOfStudy.SOIL_SCIENCE]: "Ilmu Tanah",
    [EFieldOfStudy.PLANT_PROTECTION]: "Proteksi Tanaman",
    [EFieldOfStudy.ANIMAL_HUSBANDRY]: "Peternakan",
    [EFieldOfStudy.AQUACULTURE]: "Budidaya Perairan",
    [EFieldOfStudy.FISHERIES]: "Perikanan",
    [EFieldOfStudy.FORESTRY]: "Kehutanan",
    [EFieldOfStudy.RURAL_DEVELOPMENT]: "Pembangunan Wilayah Pedesaan",
    [EFieldOfStudy.BIOLOGY]: "Biologi",
    [EFieldOfStudy.CHEMISTRY]: "Kimia",
    [EFieldOfStudy.PHYSICS]: "Fisika",
    [EFieldOfStudy.MATHEMATICS]: "Matematika",
    [EFieldOfStudy.STATISTICS]: "Statistika",
    [EFieldOfStudy.ENVIRONMENTAL_SCIENCE]: "Ilmu Lingkungan",
    [EFieldOfStudy.BIOTECHNOLOGY]: "Bioteknologi",
    [EFieldOfStudy.MICROBIOLOGY]: "Mikrobiologi",
    [EFieldOfStudy.BIOCHEMISTRY]: "Biokimia",
    [EFieldOfStudy.NUTRITION_SCIENCE]: "Ilmu Gizi",
    [EFieldOfStudy.PHARMACY]: "Farmasi",
    [EFieldOfStudy.MEDICINE]: "Kedokteran",
    [EFieldOfStudy.NURSING]: "Keperawatan",
    [EFieldOfStudy.PUBLIC_HEALTH]: "Kesehatan Masyarakat",
    [EFieldOfStudy.VETERINARY]: "Kedokteran Hewan",
    [EFieldOfStudy.CIVIL_ENGINEERING]: "Teknik Sipil",
    [EFieldOfStudy.MECHANICAL_ENGINEERING]: "Teknik Mesin",
    [EFieldOfStudy.ELECTRICAL_ENGINEERING]: "Teknik Elektro",
    [EFieldOfStudy.INDUSTRIAL_ENGINEERING]: "Teknik Industri",
    [EFieldOfStudy.CHEMICAL_ENGINEERING]: "Teknik Kimia",
    [EFieldOfStudy.COMPUTER_SCIENCE]: "Ilmu Komputer",
    [EFieldOfStudy.INFORMATION_TECHNOLOGY]: "Teknologi Informasi",
    [EFieldOfStudy.INFORMATION_SYSTEMS]: "Sistem Informasi",
    [EFieldOfStudy.ELECTRONICS_ENGINEERING]: "Teknik Elektronika",
    [EFieldOfStudy.TELECOMMUNICATIONS]: "Telekomunikasi",
    [EFieldOfStudy.MATERIAL_ENGINEERING]: "Teknik Material",
    [EFieldOfStudy.PETROLEUM_ENGINEERING]: "Teknik Perminyakan",
    [EFieldOfStudy.MINING_ENGINEERING]: "Teknik Pertambangan",
    [EFieldOfStudy.ARCHITECTURE]: "Arsitektur",
    [EFieldOfStudy.MANAGEMENT]: "Manajemen",
    [EFieldOfStudy.ACCOUNTING]: "Akuntansi",
    [EFieldOfStudy.ECONOMICS]: "Ekonomi",
    [EFieldOfStudy.FINANCE]: "Keuangan",
    [EFieldOfStudy.BUSINESS_ADMINISTRATION]: "Administrasi Bisnis",
    [EFieldOfStudy.MARKETING]: "Pemasaran",
    [EFieldOfStudy.INTERNATIONAL_RELATIONS]: "Hubungan Internasional",
    [EFieldOfStudy.LAW]: "Hukum",
    [EFieldOfStudy.POLITICAL_SCIENCE]: "Ilmu Politik",
    [EFieldOfStudy.SOCIOLOGY]: "Sosiologi",
    [EFieldOfStudy.PSYCHOLOGY]: "Psikologi",
    [EFieldOfStudy.COMMUNICATION]: "Komunikasi",
    [EFieldOfStudy.PUBLIC_ADMINISTRATION]: "Administrasi Publik",
    [EFieldOfStudy.EDUCATION]: "Pendidikan",
    [EFieldOfStudy.LITERATURE]: "Sastra",
    [EFieldOfStudy.LINGUISTICS]: "Linguistik",
    [EFieldOfStudy.HISTORY]: "Sejarah",
    [EFieldOfStudy.PHILOSOPHY]: "Filsafat",
    [EFieldOfStudy.GEOGRAPHY]: "Geografi",
    [EFieldOfStudy.ARTS]: "Seni",
    [EFieldOfStudy.OTHER]: "Lainnya",
};

export const departmentBorderMap = {
    TEP: {
        firstCard: "border-primary border-t-8",
        card: "border-primary border-t",
        header: "border-primary/50 border-b",
    },
    TPN: {
        firstCard: "border-red-500 border-t-8",
        card: "border-red-500 border-t",
        header: "border-red-500/50 border-b",
    },
    TIN: {
        firstCard: "border-orange-500 border-t-8",
        card: "border-orange-500 border-t",
        header: "border-orange-500/50 border-b",
    },
    TEKNOTAN: {
        firstCard: "border-blue-500 border-t-8",
        card: "border-blue-500 border-t",
        header: "border-blue-500/50 border-b",
    },
} as const;
