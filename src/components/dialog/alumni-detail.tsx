"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { AlumniUser, TDepartment, TIndustryField, TEmploymentLevel, TEmploymentType, TDegree } from "@/types/user";
import { useDialog } from "@/hooks/use-dialog";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export type AlumniDetailDialogData = { alumni: AlumniUser };

export default function AlumniDetailDialog() {
    const { isOpen, data, onClose } = useDialog<AlumniDetailDialogData>("alumni-detail");
    const alumni = data?.alumni;

    if (!alumni) return null;

    const { profile } = alumni;

    const domisili = () => {
        if (!profile) return "-";
        if (profile.countryId === 77) {
            return [profile.cityName, profile.provinceName, profile.countryName].filter(Boolean).join(", ");
        }
        return profile.countryName || "-";
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{profile?.fullName ?? alumni.name}</DialogTitle>
                    <DialogDescription>{alumni.email}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-sm">
                    {profile?.department && (
                        <Badge variant={profile.department as any} size="xs">
                            {TDepartment[profile.department as keyof typeof TDepartment]} - {profile.entryYear}
                        </Badge>
                    )}

                    <div className="space-y-3">
                        {profile?.graduationYear && (
                            <div>
                                <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">Tahun Lulus</p>
                                <p>{profile.graduationYear}</p>
                            </div>
                        )}

                        <div>
                            <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">Domisili</p>
                            <p>{domisili()}</p>
                        </div>

                        {profile?.linkedInUrl && (
                            <div>
                                <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">LinkedIn</p>
                                <Link
                                    href={profile.linkedInUrl}
                                    target="_blank"
                                    className={buttonVariants({ variant: "outline_linkedin", size: "sm" })}
                                >
                                    <Image src="/logo/linkedin.svg" alt="LinkedIn Logo" width={15} height={15} />
                                    LinkedIn
                                    <ExternalLinkIcon className="h-3 w-3" />
                                </Link>
                            </div>
                        )}

                        {profile?.instagramUrl && (
                            <div>
                                <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">Instagram</p>
                                <Link
                                    href={profile.instagramUrl}
                                    target="_blank"
                                    className={buttonVariants({ variant: "outline_instagram", size: "sm" })}
                                >
                                    <Image src="/logo/instagram.svg" alt="Instagram Logo" width={15} height={15} />
                                    Instagram
                                    <ExternalLinkIcon className="h-3 w-3" />
                                </Link>
                            </div>
                        )}

                        {profile?.workExperiences && profile.workExperiences.length > 0 && (
                            <div>
                                <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">Pengalaman Kerja</p>
                                <div className="space-y-2">
                                    {profile.workExperiences.map((exp, i) => (
                                        <div key={i} className="space-y-0.5 rounded-md border px-3 py-2">
                                            <p className="font-medium">{exp.jobTitle}</p>
                                            <p className="text-muted-foreground text-xs">{exp.companyName}</p>
                                            <div className="mt-1 flex flex-wrap gap-1">
                                                <Badge variant="outline" size="xs">
                                                    {TIndustryField[exp.industry]}
                                                </Badge>
                                                <Badge variant="outline" size="xs">
                                                    {TEmploymentLevel[exp.jobLevel]}
                                                </Badge>
                                                <Badge variant="outline" size="xs">
                                                    {TEmploymentType[exp.employmentType]}
                                                </Badge>
                                            </div>
                                            <p className="text-muted-foreground text-xs">
                                                {exp.startYear} – {exp.endYear ?? "Sekarang"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {profile?.furtherEducations && profile.furtherEducations.length > 0 && (
                            <div>
                                <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">Pendidikan Lanjut</p>
                                <div className="space-y-2">
                                    {profile.furtherEducations.map((edu, i) => (
                                        <div key={i} className="space-y-0.5 rounded-md border px-3 py-2">
                                            <p className="font-medium">{edu.universityName}</p>
                                            <p className="text-muted-foreground text-xs">{edu.fieldOfStudy}</p>
                                            <Badge variant="outline" size="xs">
                                                {TDegree[edu.degree]}
                                            </Badge>
                                            <p className="text-muted-foreground text-xs">
                                                {edu.entryYear} – {edu.graduationYear ?? "Sekarang"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
