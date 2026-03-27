export interface AlumniStatisticsProvince {
    provinceId: number;
    provinceName: string;
    count: number;
}

export interface AlumniStatisticsCountry {
    countryId: number;
    countryName: string;
    count: number;
}

export interface AlumniStatistics {
    totalAlumni: number;
    byDepartment: Record<string, number>;
    byFurtherEducation: Record<string, number>;
    byIndustry: Record<string, number>;
    byJobLevel: Record<string, number>;
    byEmploymentType: Record<string, number>;
    bySalary: Record<string, number>;
    byProvince: AlumniStatisticsProvince[];
    byCountry: AlumniStatisticsCountry[];
    lastUpdated: string;
}

export interface StatisticsResponse {
    success: true;
    message: string;
    data: AlumniStatistics;
}
