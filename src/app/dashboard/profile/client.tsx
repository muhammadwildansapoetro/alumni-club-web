"use client";

import EditProfileDialog from "@/components/dialog/edit-profile";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useProfile } from "@/hooks/use-profile";
import { TAlumniStatus, TDepartment } from "@/types/user";
import { BriefcaseBusinessIcon, BriefcaseIcon, HandshakeIcon, PlusIcon, SquarePenIcon, UserCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const departmentBorderMap = {
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

export default function ProfileClient({ initialProfile }: any) {
    const [openEdit, setOpenEdit] = useState(false);
    const { data: user } = useProfile(initialProfile);

    const deptStyle = departmentBorderMap[user?.profile?.department as keyof typeof departmentBorderMap];

    return (
        <div className="space-y-3">
            {/* Profile */}
            <Card className={deptStyle?.firstCard}>
                <CardHeader className={deptStyle?.header}>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <UserCircleIcon /> {user?.profile?.fullName}
                    </CardTitle>

                    <CardAction className="space-x-3">
                        {user?.profile?.linkedInUrl ? (
                            <Link
                                href={user?.profile?.linkedInUrl}
                                target="_blank"
                                className={buttonVariants({ variant: "outline_linkedin", className: "mt-1 text-blue-500!" })}
                            >
                                <Image src="/logo/linkedin.svg" alt="LinkedIn Logo" width={15} height={15} />
                                LinkedIn
                            </Link>
                        ) : (
                            "-"
                        )}
                        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                            <DialogTrigger className={buttonVariants({ variant: "outline" })}>
                                <SquarePenIcon />
                                Ubah
                            </DialogTrigger>

                            <EditProfileDialog
                                onSuccess={() => {
                                    setOpenEdit(false);
                                }}
                                user={user}
                            />
                        </Dialog>
                    </CardAction>
                </CardHeader>

                <CardContent className="text-sm">
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <p className="text-xs text-gray-500">Nomor Pokok Mahasiswa</p>
                                <p className="font-medium">{user?.profile?.npm}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Program Studi</p>
                                <p className="font-medium">{TDepartment[user?.profile?.department as keyof typeof TDepartment]}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Tahun Angkatan</p>
                                <p className="font-medium">{user?.profile?.classYear}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Tahun Kelulusan</p>
                                <p className="font-medium">{user?.profile?.graduationYear ?? "-"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Pendidikan Lanjutan</p>
                                <p className="font-medium">{user?.profile?.highestEducation ?? "Belum Melanjutkan"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Status Alumni</p>
                                <p className="font-medium">{TAlumniStatus[user?.profile?.status as keyof typeof TAlumniStatus] ?? "-"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Negara</p>
                                <p className="font-medium">{user?.profile?.countryName ?? "-"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Provinsi</p>
                                <p className="font-medium">{user?.profile?.provinceName ?? "-"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Kota/Kabupaten</p>
                                <p className="font-medium">{user?.profile?.cityName ?? "-"}</p>
                            </div>
                            {user?.profile?.linkedInUrl ? null : (
                                <div>
                                    <p className="text-xs">Profile LinkedIn</p>
                                    <p className="font-medium">-</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Work */}
            <Card className={deptStyle?.card}>
                <CardHeader className={deptStyle?.header}>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <BriefcaseBusinessIcon /> Pekerjaan Terkini
                    </CardTitle>
                    <CardAction className={buttonVariants({ variant: "outline" })}>
                        <SquarePenIcon />
                        Ubah
                    </CardAction>
                </CardHeader>

                <CardContent className="text-sm">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <p className="text-xs">Jenis Pekerjaan</p>
                            <p className="font-medium">{user?.profile?.employmentType ?? "-"}</p>
                        </div>
                        <div>
                            <p className="text-xs">Level Jabatan</p>
                            <p className="font-medium">{user?.profile?.jobLevel ?? "-"}</p>
                        </div>
                        <div>
                            <p className="text-xs">Judul Pekerjaan</p>
                            <p className="font-medium">{user?.profile?.jobTitle ?? "-"}</p>
                        </div>
                        <div>
                            <p className="text-xs">Nama Perusahaan</p>
                            <p className="font-medium">{user?.profile?.companyName ?? "-"}</p>
                        </div>
                        <div>
                            <p className="text-xs">Industri</p>
                            <p className="font-medium">{user?.profile?.industry ?? "-"}</p>
                        </div>
                        <div>
                            <p className="text-xs">Rentang Pendapatan per Bulan</p>
                            <p className="font-medium">{user?.profile?.incomeRange ?? "-"}</p>
                            <p className="text-xs">(Data bersifat rahasia, hanya untuk statistik)</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Business */}
            <Card className={deptStyle?.card}>
                <CardHeader className={deptStyle?.header}>
                    <CardTitle className="flex items-center gap-1 text-lg sm:text-xl">
                        <HandshakeIcon /> Posting Bisnis
                    </CardTitle>
                    <CardAction className={buttonVariants({ variant: "outline" })}>
                        <PlusIcon />
                        Tambah
                    </CardAction>
                </CardHeader>
                <CardContent>List posting bisnis</CardContent>
            </Card>

            {/* Jobs */}
            <Card className={deptStyle?.card}>
                <CardHeader className={deptStyle?.header}>
                    <CardTitle className="flex items-center gap-1 text-lg sm:text-xl">
                        <BriefcaseIcon /> Posting Pekerjaan
                    </CardTitle>
                    <CardAction className={buttonVariants({ variant: "outline" })}>
                        <PlusIcon />
                        Tambah
                    </CardAction>
                </CardHeader>
                <CardContent>List posting pekerjaan</CardContent>
            </Card>
        </div>
    );
}
