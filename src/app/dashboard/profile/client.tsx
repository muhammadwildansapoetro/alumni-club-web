"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { InfoGrid } from "@/components/ui/info-grid";
import { InfoItem } from "@/components/ui/info-item";
import { useDialog } from "@/hooks/use-dialog";
import {
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
import { updateOwnProfile } from "@/services/profile.client";
import { ColumnDef } from "@tanstack/react-table";
import { BriefcaseBusinessIcon, GraduationCapIcon, PlusIcon, SquarePenIcon, Trash2Icon, UserCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfileClient({ user }: { user: User }) {
    const { onOpen } = useDialog();
    const router = useRouter();

    const handleDeleteWorkExperience = async (index: number) => {
        try {
            const updated = (user?.profile?.workExperiences ?? []).filter((_, i) => i !== index);
            await updateOwnProfile({ profile: { workExperiences: updated } });
            toast.success("Pengalaman kerja berhasil dihapus");
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Terjadi kesalahan");
        }
    };

    const handleDeleteFurtherEducation = async (index: number) => {
        try {
            const updated = (user?.profile?.furtherEducations ?? []).filter((_, i) => i !== index);
            await updateOwnProfile({ profile: { furtherEducations: updated } });
            toast.success("Pendidikan lanjutan berhasil dihapus");
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Terjadi kesalahan");
        }
    };

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
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onOpen("work-experience-management", { user, index: row.index })}>
                        <SquarePenIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteWorkExperience(row.index)}>
                        <Trash2Icon className="h-4 w-4" />
                    </Button>
                </div>
            ),
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
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onOpen("further-education-management", { user, index: row.index })}>
                        <SquarePenIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteFurtherEducation(row.index)}>
                        <Trash2Icon className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-4">
            {/* Profile */}
            <Card className="border-primary border-t-8">
                <CardHeader className="border-primary/50 border-b">
                    <CardTitle className="flex items-center gap-2">
                        <UserCircleIcon className="h-5 w-5 shrink-0" /> {user?.profile?.fullName}
                    </CardTitle>

                    <CardAction>
                        <Button className={buttonVariants({ variant: "default" })} onClick={() => onOpen("edit-profile", user)}>
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
            <Card className="border-primary border-t">
                <CardHeader className="border-primary/50 border-b">
                    <CardTitle className="flex items-center gap-2">
                        <BriefcaseBusinessIcon className="h-5 w-5 shrink-0" /> Pengalaman Bekerja
                    </CardTitle>
                    <CardAction>
                        <Button variant="default" onClick={() => onOpen("work-experience-management", { user })}>
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
            <Card className="border-primary border-t">
                <CardHeader className="border-primary/50 border-b">
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCapIcon className="h-5 w-5 shrink-0" /> Pendidikan Lanjutan
                    </CardTitle>
                    <CardAction>
                        <Button variant="default" onClick={() => onOpen("further-education-management", { user })}>
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
