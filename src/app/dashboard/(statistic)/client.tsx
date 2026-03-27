"use client";

import { AlumniStatistics } from "@/types/statistic";
import StatisticCard from "@/components/card/statistic-card";
import IndustryChart from "@/components/chart/industry-chart";
import SalaryRangeChart from "@/components/chart/salary-range-chart";
import JobLevelChart from "@/components/chart/job-level-chart";
import EmploymentTypeChart from "@/components/chart/employment-type-chart";
import ProvinceList from "@/components/statistics/province-list";
import FurtherEducationCard from "@/components/statistics/further-education-card";
import { AlertCircleIcon } from "lucide-react";

interface StatisticClientProps {
    statistics: AlumniStatistics | null;
    error: string | null;
}

export default function StatisticClient({ statistics, error }: StatisticClientProps) {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Statistik Alumni</h1>

            {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircleIcon className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {statistics && (
                <>
                    {/* Department + total summary cards */}
                    <StatisticCard data={statistics} />

                    {/* Further education */}
                    <FurtherEducationCard data={statistics.byFurtherEducation} />

                    {/* Industry + Salary charts */}
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <IndustryChart data={statistics.byIndustry} />
                        <SalaryRangeChart data={statistics.bySalary} />
                    </div>

                    {/* Job level + Employment type charts */}
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <JobLevelChart data={statistics.byJobLevel} />
                        <EmploymentTypeChart data={statistics.byEmploymentType} />
                    </div>

                    {/* Province distribution */}
                    <ProvinceList data={statistics.byProvince} totalAlumni={statistics.totalAlumni} />
                </>
            )}
        </div>
    );
}
