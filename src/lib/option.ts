import {
    EIndustry,
    TIndustryField,
    EmploymentLevel,
    TEmploymentLevel,
    EEmploymentType,
    TEmploymentType,
    EDegree,
    TDegree,
    EIncomeRange,
    TIncomeRange,
} from "@/types/user";

export const departmentOptions = [
    { value: "TEP", label: "Teknik Pertanian (TEP)" },
    { value: "TPN", label: "Teknologi Pangan (TPN)" },
    { value: "TIN", label: "Teknologi Industri Pertanian (TIN)" },
];

export const currentYear = new Date().getFullYear();
const maxYear = currentYear - 3;
const minYear = 1959;

export const entryYearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
    const year = maxYear - i;
    return { value: year, label: year.toString() };
});

export const entryYearFurtherEducationOptions = Array.from({ length: currentYear - minYear + 1 }, (_, i) => {
    const year = currentYear - i;
    return { value: year, label: year.toString() };
});

export const graduationYearOptions = Array.from({ length: currentYear - 1956 + 1 }, (_, i) => {
    const year = currentYear - i;
    return { value: year, label: year.toString() };
});

export const degreeOptions = [
    { label: TDegree[EDegree.MAGISTER], value: EDegree.MAGISTER },
    { label: TDegree[EDegree.DOCTOR], value: EDegree.DOCTOR },
];

export const alumniStatusOptions = [
    { label: "Bekerja", value: "WORKING" },
    { label: "Melanjutkan Studi", value: "STUDYING" },
    { label: "Bekerja & Studi", value: "WORKING_STUDYING" },
    { label: "Wirausaha", value: "ENTREPRENEUR" },
    { label: "Belum Bekerja", value: "NOT_WORKING" },
];

export const industryOptions = Object.entries(TIndustryField).map(([key, label]) => ({
    value: key as EIndustry,
    label,
}));

export const jobLevelOptions = Object.entries(TEmploymentLevel).map(([key, label]) => ({
    value: key as EmploymentLevel,
    label,
}));

export const employmentTypeOptions = Object.entries(TEmploymentType).map(([key, label]) => ({
    value: key as EEmploymentType,
    label,
}));

export const incomeRangeOptions = Object.entries(TIncomeRange).map(([key, label]) => ({
    value: key as EIncomeRange,
    label,
}));
