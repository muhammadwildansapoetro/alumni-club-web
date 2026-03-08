"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { InfoGrid } from "@/components/ui/info-grid";
import { InfoItem } from "@/components/ui/info-item";
import { useDialog } from "@/hooks/use-dialog";
import { cn } from "@/lib/utils";
import {
    departmentBorderMap,
    FurtherEducation,
    TDegree,
    TDepartment,
    TEmploymentLevel,
    TEmploymentType,
    TIncomeRange,
    TIndustryField,
    User,
    WorkExperience,
} from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { BriefcaseBusinessIcon, GraduationCapIcon, PlusIcon, SquarePenIcon, UserCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const workExperienceColumns: ColumnDef<WorkExperience>[] = [
    {
        accessorKey: "jobTitle",
        header: "Jabatan / Perusahaan",
        cell: ({ row }) => (
            <div>
                <p className="font-medium">{row.original.jobTitle}</p>
                <p className="text-muted-foreground text-xs">{row.original.companyName}</p>
            </div>
        ),
    },
    {
        accessorKey: "industry",
        header: "Industri",
        cell: ({ row }) => TIndustryField[row.original.industry] ?? row.original.industry,
    },
    {
        accessorKey: "jobLevel",
        header: "Level",
        cell: ({ row }) => TEmploymentLevel[row.original.jobLevel] ?? row.original.jobLevel,
    },
    {
        accessorKey: "employmentType",
        header: "Tipe",
        cell: ({ row }) => TEmploymentType[row.original.employmentType] ?? row.original.employmentType,
    },
    {
        accessorKey: "incomeRange",
        header: "Pendapatan",
        cell: ({ row }) => (row.original.incomeRange ? TIncomeRange[row.original.incomeRange] : "-"),
    },
    {
        id: "period",
        header: "Periode",
        cell: ({ row }) => `${row.original.startYear} – ${row.original.endYear ?? "Sekarang"}`,
    },
];

const furtherEducationColumns: ColumnDef<FurtherEducation>[] = [
    {
        accessorKey: "degree",
        header: "Gelar",
        cell: ({ row }) => TDegree[row.original.degree] ?? row.original.degree,
    },
    {
        accessorKey: "universityName",
        header: "Universitas",
    },
    {
        accessorKey: "fieldOfStudy",
        header: "Bidang Studi",
    },
    {
        id: "period",
        header: "Periode",
        cell: ({ row }) => `${row.original.entryYear} – ${row.original.graduationYear ?? "Sekarang"}`,
    },
];

export default function ProfileClient({ user }: { user: User }) {
    const { onOpen } = useDialog();
    const deptStyle = departmentBorderMap[user?.profile?.department as keyof typeof departmentBorderMap];

    return (
        <div className="space-y-4">
            {/* Profile */}
            <Card className={deptStyle?.firstCard}>
                <CardHeader className={cn(deptStyle?.header)}>
                    <CardTitle className="flex items-center gap-2">
                        <UserCircleIcon className="h-5 w-5 shrink-0" /> {user?.profile?.fullName}
                    </CardTitle>

                    <CardAction>
                        <Button className={buttonVariants({ variant: "outline" })} onClick={() => onOpen("edit-profile", user)}>
                            <SquarePenIcon className="h-5 w-5 shrink-0" />
                            Ubah
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent className="text-sm">
                    <div className="space-y-3">
                        <InfoGrid>
                            <InfoItem label="Nomor Pokok Mahasiswa" value={user?.profile?.npm} />
                            <InfoItem label="Program Studi" value={TDepartment[user?.profile?.department as keyof typeof TDepartment]} />
                            <InfoItem label="Tahun Angkatan" value={user?.profile?.entryYear} />
                            <InfoItem label="Tahun Kelulusan" value={user?.profile?.graduationYear} />
                            <InfoItem label="Negara" value={user?.profile?.countryName} />
                            <InfoItem label="Provinsi" value={user?.profile?.provinceName} />
                            <InfoItem label="Kota/Kabupaten" value={user?.profile?.cityName} />
                            <InfoItem
                                label="Profil LinkedIn"
                                value={
                                    user?.profile?.linkedInUrl ? (
                                        <Link
                                            href={user?.profile?.linkedInUrl}
                                            target="_blank"
                                            className={buttonVariants({ variant: "outline_linkedin" })}
                                        >
                                            <Image src="/logo/linkedin.svg" alt="LinkedIn Logo" width={15} height={15} />
                                            LinkedIn
                                        </Link>
                                    ) : undefined
                                }
                            />
                        </InfoGrid>
                    </div>
                </CardContent>
            </Card>

            {/* Work Experiences */}
            <Card className={deptStyle?.card}>
                <CardHeader className={deptStyle?.header}>
                    <CardTitle className="flex items-center gap-2">
                        <BriefcaseBusinessIcon className="h-5 w-5 shrink-0" /> Pengalaman Bekerja
                    </CardTitle>
                    <CardAction>
                        <Button variant="outline" onClick={() => onOpen("work-experience-management", user)}>
                            <PlusIcon className="h-5 w-5 shrink-0" />
                            Tambah
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <DataTable columns={workExperienceColumns} data={user?.profile?.workExperiences ?? []} />
                </CardContent>
            </Card>

            {/* Further Education */}
            <Card className={deptStyle?.card}>
                <CardHeader className={deptStyle?.header}>
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCapIcon className="h-5 w-5 shrink-0" /> Pendidikan Lanjutan
                    </CardTitle>
                    <CardAction>
                        <Button variant="outline" onClick={() => onOpen("further-education-management", user)}>
                            <PlusIcon className="h-5 w-5 shrink-0" />
                            Tambah
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <DataTable columns={furtherEducationColumns} data={user?.profile?.furtherEducations ?? []} />
                </CardContent>
            </Card>
        </div>
    );
}
