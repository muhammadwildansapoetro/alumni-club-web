"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { JobPosting, JOB_TYPE_LABELS, SALARY_RANGE_LABELS } from "@/types/job";
import { TDepartment } from "@/types/user";
import { useDialog } from "@/hooks/use-dialog";
import { ExternalLinkIcon } from "lucide-react";

export type JobDetailDialogData = { job: JobPosting };

export default function JobDetailDialog() {
    const { isOpen, data, onClose } = useDialog<JobDetailDialogData>("job-detail");
    const job = data?.job;

    if (!job) return null;

    const { profile, name, email } = job.user;

    const location = (() => {
        if (!job.countryName && !job.provinceName && !job.cityName) return null;
        if (job.countryId === 77) return [job.cityName, job.provinceName, job.countryName].filter(Boolean).join(", ");
        return job.countryName ?? null;
    })();

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="w-full sm:max-w-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{job.title}</DialogTitle>
                    <DialogDescription>{job.company || ""}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                        {job.isActive ? (
                            <Badge variant="default" size="xs">
                                Aktif
                            </Badge>
                        ) : (
                            <Badge variant="destructive" size="xs">
                                Nonaktif
                            </Badge>
                        )}
                        {job.jobType && (
                            <Badge variant="outline" size="xs">
                                {JOB_TYPE_LABELS[job.jobType]}
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-3">
                        <div>
                            <p className="mb-1 text-xs font-medium tracking-wide">Deskripsi</p>
                            <p className="leading-relaxed whitespace-pre-line">{job.description}</p>
                        </div>

                        {location && (
                            <div>
                                <p className="mb-1 text-xs font-medium tracking-wide">Lokasi</p>
                                <p>{location}</p>
                            </div>
                        )}

                        {job.salaryRange && (
                            <div>
                                <p className="mb-1 text-xs font-medium tracking-wide">Gaji</p>
                                <p>{SALARY_RANGE_LABELS[job.salaryRange]}</p>
                            </div>
                        )}

                        {job.externalUrl && (
                            <div>
                                <p className="mb-1 text-xs font-medium tracking-wide">Situs Web</p>
                                <a
                                    href={job.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary inline-flex items-center gap-1 hover:underline"
                                >
                                    {job.externalUrl}
                                    <ExternalLinkIcon className="h-3 w-3" />
                                </a>
                            </div>
                        )}

                        <div>
                            <p className="mb-1 text-xs font-medium tracking-wide">Diposting Oleh</p>
                            <p className="font-medium">{profile?.fullName ?? name ?? email}</p>
                            {profile?.department && (
                                <Badge variant={profile.department as any} size="xs" className="mt-1">
                                    {TDepartment[profile.department as keyof typeof TDepartment]} - {profile.entryYear}
                                </Badge>
                            )}
                        </div>

                        <div>
                            <p className="mb-1 text-xs font-medium tracking-wide">Ditambahkan</p>
                            <p>
                                {new Date(job.createdAt).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
