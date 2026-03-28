"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BuildingIcon, CalendarIcon, ExternalLinkIcon, Loader2Icon, MapPinIcon, PlusIcon, SquarePenIcon, Trash2Icon, WalletIcon } from "lucide-react";
import SearchInput from "@/components/input/search-input";
import { JobPosting, JOB_TYPE_LABELS, SALARY_RANGE_LABELS, INDUSTRY_LABELS } from "@/types/job";
import { TDepartment } from "@/types/user";
import { deleteJob } from "@/services/jobs.client";
import { useDialog } from "@/hooks/use-dialog";
import { toast } from "sonner";

interface ProfileJobsClientProps {
    jobs: {
        items: JobPosting[];
        pagination: { page: number; limit: number; total: number; totalPages: number };
    } | null;
    error: string | null;
}

function JobDetail({
    job,
    onEdit,
    onDelete,
    confirmDeleteId,
    setConfirmDeleteId,
    deletingId,
}: {
    job: JobPosting;
    onEdit: (job: JobPosting) => void;
    onDelete: (id: string) => void;
    confirmDeleteId: string | null;
    setConfirmDeleteId: (id: string | null) => void;
    deletingId: string | null;
}) {
    const { profile, name, email } = job.user;

    const location = (() => {
        if (!job.countryName && !job.provinceName && !job.cityName) return null;
        if (job.countryId === 77) return [job.cityName, job.provinceName, job.countryName].filter(Boolean).join(", ");
        return job.countryName ?? null;
    })();

    return (
        <div className="space-y-5 p-5 text-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                    <h2 className="text-xl leading-tight font-bold">{job.title}</h2>
                    {job.company && (
                        <p className="flex items-center gap-1.5">
                            <BuildingIcon className="h-3.5 w-3.5 shrink-0" />
                            {job.company}
                        </p>
                    )}
                    {location && (
                        <p className="flex items-center gap-1.5">
                            <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
                            {location}
                        </p>
                    )}
                    <p className="flex items-center gap-1.5">
                        <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
                        {new Date(job.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                </div>

                <div className="flex shrink-0 gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(job)}>
                        <SquarePenIcon className="h-4 w-4" />
                        Edit
                    </Button>
                    {confirmDeleteId === job.id ? (
                        <>
                            <Button variant="destructive" size="sm" disabled={deletingId === job.id} onClick={() => onDelete(job.id)}>
                                {deletingId === job.id ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "Yakin?"}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setConfirmDeleteId(null)}>
                                Batal
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline_destructive" size="sm" onClick={() => setConfirmDeleteId(job.id)}>
                            <Trash2Icon className="h-4 w-4" />
                            Hapus
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
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
                {job.industry && (
                    <Badge variant="outline" size="xs">
                        {INDUSTRY_LABELS[job.industry]}
                    </Badge>
                )}
            </div>

            <div className="border-t pt-4">
                <h3 className="mb-2 font-semibold">Deskripsi Pekerjaan</h3>
                <p className="leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>

            {job.salaryRange && (
                <div className="flex items-center gap-2">
                    <WalletIcon className="h-4 w-4 shrink-0" />
                    <div>
                        <p className="text-xs">Rentang Gaji</p>
                        <p className="font-medium">{SALARY_RANGE_LABELS[job.salaryRange] ?? "-"}</p>
                    </div>
                </div>
            )}

            {job.externalUrl && (
                <div>
                    <p className="mb-1 text-xs font-medium">Situs Web</p>
                    <a
                        href={job.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary inline-flex items-center gap-1 break-all hover:underline"
                    >
                        {job.externalUrl}
                        <ExternalLinkIcon className="h-3 w-3 shrink-0" />
                    </a>
                </div>
            )}

            <div className="border-t pt-4">
                <p className="mb-1 text-xs font-medium">Diposting Oleh</p>
                <p className="font-medium">{profile?.fullName ?? name ?? email}</p>
                {profile?.department && (
                    <Badge variant={profile.department as any} size="xs" className="mt-1">
                        {TDepartment[profile.department as keyof typeof TDepartment]} - {profile.entryYear}
                    </Badge>
                )}
            </div>
        </div>
    );
}

function JobCard({ job, selected, onClick }: { job: JobPosting; selected: boolean; onClick: () => void }) {
    const location = (() => {
        if (!job.countryName && !job.provinceName && !job.cityName) return null;
        if (job.countryId === 77) return [job.cityName, job.provinceName, job.countryName].filter(Boolean).join(", ");
        return job.countryName ?? null;
    })();

    return (
        <button
            onClick={onClick}
            className={`w-full cursor-pointer rounded-lg border p-4 text-left transition-colors ${
                selected ? "border-primary bg-primary/5" : "bg-card hover:bg-muted/50"
            }`}
        >
            <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                    <p className={`leading-tight font-semibold ${selected ? "text-primary" : ""}`}>{job.title}</p>
                    {job.isActive ? (
                        <Badge variant="default" size="xs" className="shrink-0">
                            Aktif
                        </Badge>
                    ) : (
                        <Badge variant="destructive" size="xs" className="shrink-0">
                            Nonaktif
                        </Badge>
                    )}
                </div>
                {job.company && <p className="text-xs">{job.company}</p>}
                {location && (
                    <p className="flex items-center gap-1 text-xs">
                        <MapPinIcon className="h-3 w-3 shrink-0" />
                        {location}
                    </p>
                )}
                {job.salaryRange && (
                    <p className="flex items-center gap-1 text-xs">
                        <WalletIcon className="h-3 w-3 shrink-0" />
                        {SALARY_RANGE_LABELS[job.salaryRange] ?? "-"}
                    </p>
                )}
                <div className="flex flex-wrap gap-1 pt-1">
                    {job.jobType && (
                        <Badge variant="outline" size="xs">
                            {JOB_TYPE_LABELS[job.jobType]}
                        </Badge>
                    )}
                    {job.industry && (
                        <Badge variant="outline" size="xs">
                            {INDUSTRY_LABELS[job.industry]}
                        </Badge>
                    )}
                </div>
                <p className="text-xs">{new Date(job.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</p>
            </div>
        </button>
    );
}

export default function ProfileJobsClient({ jobs, error }: ProfileJobsClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { onOpen } = useDialog();
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [debouncedSearch] = useDebounce(search, 500);
    const [selectedJob, setSelectedJob] = useState<JobPosting | null>(jobs?.items?.[0] ?? null);
    const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (jobs?.items?.length) {
            setSelectedJob((prev) => {
                const stillExists = jobs.items.find((j) => j.id === prev?.id);
                return stillExists ?? jobs.items[0];
            });
        } else {
            setSelectedJob(null);
        }
    }, [jobs]);

    const handleDelete = useCallback(
        async (id: string) => {
            setDeletingId(id);
            try {
                await deleteJob(id);
                toast.success("Lowongan berhasil dihapus");
                router.refresh();
            } catch (err: any) {
                toast.error(err?.response?.data?.message ?? "Gagal menghapus lowongan");
            } finally {
                setDeletingId(null);
                setConfirmDeleteId(null);
            }
        },
        [router],
    );

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(newPage));

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const currentSearch = params.get("search") || "";

        if (debouncedSearch !== currentSearch) {
            if (debouncedSearch) {
                params.set("search", debouncedSearch);
            } else {
                params.delete("search");
            }
            params.set("page", "1");

            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`);
            });
        }
    }, [debouncedSearch, pathname, router, searchParams]);

    return (
        <div className="flex h-full flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold">Lowongan Saya</h2>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <SearchInput variant="dashboard" placeholder="Cari lowongan pekerjaan" value={search} onChange={(value) => setSearch(value)} />

                    <Button variant="default" onClick={() => onOpen("job-management", {})}>
                        <PlusIcon className="h-4 w-4" />
                        Tambah
                    </Button>
                </div>
            </div>

            {/* Two-panel layout */}
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-[2fr_3fr]" style={{ height: "calc(100vh - 220px)" }}>
                {/* Left panel — job list */}
                <div className="flex flex-col gap-2 overflow-y-auto rounded-lg border p-2">
                    {isPending ? (
                        <div className="flex flex-1 items-center justify-center py-16">
                            <Loader2Icon className="h-6 w-6 animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="text-destructive py-16 text-center text-sm">{error}</div>
                    ) : !jobs?.items?.length ? (
                        <div className="py-16 text-center text-sm">Belum ada lowongan yang ditambahkan</div>
                    ) : (
                        <>
                            {jobs.items.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    selected={selectedJob?.id === job.id}
                                    onClick={() => {
                                        setSelectedJob(job);
                                        setMobileDetailOpen(true);
                                    }}
                                />
                            ))}
                            {jobs.pagination && jobs.pagination.totalPages > 1 && (
                                <div className="border-t pt-2">
                                    <Pagination
                                        currentPage={Number(jobs.pagination.page)}
                                        totalPages={Number(jobs.pagination.totalPages)}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Right panel — job detail (desktop only) */}
                <div className="hidden overflow-y-auto rounded-lg border md:block">
                    {selectedJob ? (
                        <JobDetail
                            job={selectedJob}
                            onEdit={(job) => onOpen("job-management", { job })}
                            onDelete={handleDelete}
                            confirmDeleteId={confirmDeleteId}
                            setConfirmDeleteId={setConfirmDeleteId}
                            deletingId={deletingId}
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm">Pilih lowongan untuk melihat detail</div>
                    )}
                </div>
            </div>

            {/* Mobile detail dialog */}
            <Dialog open={mobileDetailOpen} onOpenChange={setMobileDetailOpen}>
                <DialogContent className="max-h-[85vh] w-full overflow-y-auto sm:max-w-4xl" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle className="sr-only">{selectedJob?.title}</DialogTitle>
                    </DialogHeader>
                    {selectedJob && (
                        <JobDetail
                            job={selectedJob}
                            onEdit={(job) => {
                                setMobileDetailOpen(false);
                                onOpen("job-management", { job });
                            }}
                            onDelete={async (id) => {
                                await handleDelete(id);
                                setMobileDetailOpen(false);
                            }}
                            confirmDeleteId={confirmDeleteId}
                            setConfirmDeleteId={setConfirmDeleteId}
                            deletingId={deletingId}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
