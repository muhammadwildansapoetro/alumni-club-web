"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InfoGrid } from "@/components/ui/info-grid";
import { InfoItem } from "@/components/ui/info-item";
import { useDialog } from "@/hooks/use-dialog";
import { TDegree, TDepartment, TEmploymentLevel, TEmploymentType, TFieldOfStudy, TIndustryField, User } from "@/types/user";
import { updateOwnProfile } from "@/services/profile.client";
import {
    BriefcaseBusinessIcon,
    ExternalLinkIcon,
    GraduationCapIcon,
    Loader2Icon,
    PlusIcon,
    SquarePenIcon,
    Trash2Icon,
    UserCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type DeleteTarget = { type: "work-experience" | "further-education"; index: number };

export default function ProfileClient({ user }: { user: User }) {
    const { onOpen } = useDialog();
    const router = useRouter();
    const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        try {
            if (deleteTarget.type === "work-experience") {
                const updated = (user?.profile?.workExperiences ?? []).filter((_, i) => i !== deleteTarget.index);
                await updateOwnProfile({ profile: { workExperiences: updated } });
                toast.success("Pengalaman kerja berhasil dihapus");
            } else {
                const updated = (user?.profile?.furtherEducations ?? []).filter((_, i) => i !== deleteTarget.index);
                await updateOwnProfile({ profile: { furtherEducations: updated.length > 0 ? updated : null } });
                toast.success("Pendidikan lanjutan berhasil dihapus");
            }
            router.refresh();
            setDeleteTarget(null);
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Terjadi kesalahan");
        } finally {
            setIsDeleting(false);
        }
    };

    const workExperiences = (user?.profile?.workExperiences ?? [])
        .map((exp, i) => ({ ...exp, _originalIndex: i }))
        .sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0));

    const furtherEducations = (user?.profile?.furtherEducations ?? [])
        .map((edu, i) => ({ ...edu, _originalIndex: i }))
        .sort((a, b) => (b.entryYear ?? 0) - (a.entryYear ?? 0));

    return (
        <div className="space-y-4">
            {/* Profile */}
            <Card className="border-primary border-t-8">
                <CardHeader className="border-primary/50 border-b">
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
                                            className={buttonVariants({ variant: "outline_linkedin", className: "mt-1" })}
                                        >
                                            <Image src="/logo/linkedin.svg" alt="LinkedIn Logo" width={15} height={15} />
                                            LinkedIn
                                            <ExternalLinkIcon className="h-3 w-3" />
                                        </Link>
                                    ) : undefined
                                }
                            />
                            <InfoItem
                                label="Profil Instagram"
                                value={
                                    user?.profile?.instagramUrl ? (
                                        <Link
                                            href={user?.profile?.instagramUrl}
                                            target="_blank"
                                            className={buttonVariants({ variant: "outline_instagram", className: "mt-1" })}
                                        >
                                            <Image src="/logo/instagram.svg" alt="Instagram Logo" width={15} height={15} />
                                            Instagram
                                            <ExternalLinkIcon className="h-3 w-3" />
                                        </Link>
                                    ) : undefined
                                }
                            />
                        </InfoGrid>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Work Experiences */}
                <Card className="border-primary border-t">
                    <CardHeader className="border-primary/50 border-b">
                        <CardTitle className="flex items-center gap-2">
                            <BriefcaseBusinessIcon className="h-5 w-5 shrink-0" /> Pengalaman Bekerja
                        </CardTitle>
                        <CardAction>
                            <Button variant="outline" onClick={() => onOpen("work-experience-management", { user })}>
                                <PlusIcon className="h-5 w-5 shrink-0" />
                                Tambah
                            </Button>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {workExperiences.length === 0 ? (
                            <p className="py-4 text-center text-sm">Belum ada pengalaman kerja</p>
                        ) : (
                            <ul className="divide-y">
                                {workExperiences.map((exp, index) => (
                                    <li key={index} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold">{exp.jobTitle}</p>
                                            <p className="text-sm font-medium">
                                                {exp.companyName} · {TEmploymentType[exp.employmentType] ?? exp.employmentType}
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                {exp.startYear} – {exp.endYear ?? "Sekarang"}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {TIndustryField[exp.industry] ?? exp.industry} · {TEmploymentLevel[exp.jobLevel] ?? exp.jobLevel}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onOpen("work-experience-management", { user, index: exp._originalIndex })}
                                            >
                                                <SquarePenIcon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline_destructive"
                                                size="sm"
                                                onClick={() => setDeleteTarget({ type: "work-experience", index: exp._originalIndex })}
                                            >
                                                <Trash2Icon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>

                {/* Further Education */}
                <Card className="border-primary border-t">
                    <CardHeader className="border-primary/50 border-b">
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCapIcon className="h-5 w-5 shrink-0" /> Pendidikan Lanjutan
                        </CardTitle>
                        <CardAction>
                            <Button variant="outline" onClick={() => onOpen("further-education-management", { user })}>
                                <PlusIcon className="h-5 w-5 shrink-0" />
                                Tambah
                            </Button>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        {furtherEducations.length === 0 ? (
                            <p className="py-4 text-center text-sm">Belum ada pendidikan lanjutan</p>
                        ) : (
                            <ul className="divide-y">
                                {furtherEducations.map((edu, index) => (
                                    <li key={index} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold">{edu.universityName}</p>
                                            <p className="text-sm">
                                                {TDegree[edu.degree] ?? edu.degree} ·{" "}
                                                {TFieldOfStudy[edu.fieldOfStudy as keyof typeof TFieldOfStudy] ?? edu.fieldOfStudy}
                                            </p>
                                            <p className="text-sm">
                                                {edu.entryYear} – {edu.graduationYear ?? "Sekarang"}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onOpen("further-education-management", { user, index: edu._originalIndex })}
                                            >
                                                <SquarePenIcon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline_destructive"
                                                size="sm"
                                                onClick={() => setDeleteTarget({ type: "further-education", index: edu._originalIndex })}
                                            >
                                                <Trash2Icon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent className="max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        <DialogDescription>
                            {deleteTarget?.type === "work-experience"
                                ? "Apakah Anda yakin ingin menghapus pengalaman kerja ini?"
                                : "Apakah Anda yakin ingin menghapus pendidikan lanjutan ini?"}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={isDeleting}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
                            {isDeleting ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <Trash2Icon className="h-4 w-4" />}
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
