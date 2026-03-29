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
    EFieldOfStudy,
    TFieldOfStudy,
} from "@/types/user";
import { INDUSTRY_LABELS, IndustryField, JOB_TYPE_LABELS, JobType } from "@/types/job";

export const departmentOptions = [
    { value: "TEP", label: "S1 Teknik Pertanian (TEP)" },
    { value: "TPN", label: "S1 Teknologi Pangan (TPN)" },
    { value: "TIN", label: "S1 Teknologi Industri Pertanian (TIN)" },
    { value: "TEKNOTAN", label: "S1 Teknologi Pertanian (Teknotan)" },
    { value: "MTA", label: "S2 Teknologi Agroindustri (MTA)" },
    { value: "MTIN", label: "S2 Teknologi Industri Pertanian (MTIN)" },
    { value: "DTA", label: "S3 Teknologi Agroindustri (DTA)" },
];

export const currentYear = new Date().getFullYear();
const maxYear = currentYear - 3;
const minYear = 1983;

export const entryYearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
    const year = maxYear - i;
    return { value: year, label: year.toString() };
});

export const entryYearFurtherEducationOptions = Array.from({ length: currentYear - 1983 }, (_, i) => {
    const year = currentYear - i;
    return { value: year, label: year.toString() };
});

export const graduationYearFurtherEducationOptions = Array.from({ length: currentYear - 1983 }, (_, i) => {
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

export const jobTypeOptions = (Object.keys(JOB_TYPE_LABELS) as JobType[]).map((key) => ({
    value: key,
    label: JOB_TYPE_LABELS[key],
}));

export const jobIndustryOptions = (Object.keys(INDUSTRY_LABELS) as IndustryField[]).map((key) => ({
    value: key,
    label: INDUSTRY_LABELS[key],
}));

export const fieldOfStudyOptions = Object.entries(TFieldOfStudy).map(([key, label]) => ({
    value: key as EFieldOfStudy,
    label,
}));
