"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
    BuildingIcon,
    CalendarIcon,
    ExternalLinkIcon,
    FilterIcon,
    Loader2Icon,
    MapPinIcon,
    PlusIcon,
    RefreshCcwIcon,
    SquarePenIcon,
    Trash2Icon,
    WalletIcon,
} from "lucide-react";
import SearchInput from "@/components/input/search-input";
import ReactSelect from "@/components/ui/react-select";
import AsyncReactSelect from "@/components/ui/async-select";
import { jobIndustryOptions, jobTypeOptions } from "@/lib/option";
import { JobPosting, JOB_TYPE_LABELS, SALARY_RANGE_LABELS, INDUSTRY_LABELS } from "@/types/job";
import { TDepartment } from "@/types/user";
import { deleteJob } from "@/services/jobs.client";
import { fetchCountries, fetchProvinces, fetchCities } from "@/services/country.client";
import { useDialog } from "@/hooks/use-dialog";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

interface JobsClientProps {
    jobs: {
        items: JobPosting[];
        pagination: { page: number; limit: number; total: number; totalPages: number };
    } | null;
    error: string | null;
}

function JobDetail({
    job,
    currentUserId,
    onEdit,
    onDelete,
    deletingId,
}: {
    job: JobPosting;
    currentUserId?: string;
    onEdit: (job: JobPosting) => void;
    onDelete: (id: string) => void;
    deletingId: string | null;
}) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { profile, name, email } = job.user;
    const isOwner = currentUserId === job.user.id;

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

                {isOwner && (
                    <div className="flex shrink-0 gap-2">
                        <Button variant="outline" size="sm" onClick={() => onEdit(job)}>
                            <SquarePenIcon className="h-4 w-4" />
                            Edit
                        </Button>
                        <Button variant="outline_destructive" size="sm" onClick={() => setConfirmOpen(true)}>
                            <Trash2Icon className="h-4 w-4" />
                            Hapus
                        </Button>
                    </div>
                )}
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

            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Hapus Lowongan</DialogTitle>
                        <DialogDescription>
                            Apakah kamu yakin ingin menghapus lowongan <span className="font-medium">&ldquo;{job.title}&rdquo;</span>? Tindakan ini
                            tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={deletingId === job.id}
                            onClick={() => {
                                onDelete(job.id);
                                setConfirmOpen(false);
                            }}
                        >
                            {deletingId === job.id ? (
                                <Loader2Icon className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    <Trash2Icon className="h-4 w-4" /> Hapus
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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

export default function JobsClient({ jobs, error }: JobsClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { onOpen } = useDialog();
    const currentUser = useAuthStore((s) => s.user);
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [debouncedSearch] = useDebounce(search, 500);
    const jobType = searchParams.get("jobType") || "";
    const industry = searchParams.get("industry") || "";
    const isActive = searchParams.get("isActive") || "";
    const countryId = searchParams.get("countryId") || "";
    const provinceId = searchParams.get("provinceId") || "";
    const cityId = searchParams.get("cityId") || "";

    const [filterJobType, setFilterJobType] = useState(jobType);
    const [filterIndustry, setFilterIndustry] = useState(industry);
    const [filterIsActive, setFilterIsActive] = useState(isActive);
    const [filterCountry, setFilterCountry] = useState<{ value: string; label: string } | null>(null);
    const [filterProvince, setFilterProvince] = useState<{ value: string; label: string } | null>(null);
    const [filterCity, setFilterCity] = useState<{ value: string; label: string } | null>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [selectedJob, setSelectedJob] = useState<JobPosting | null>(jobs?.items?.[0] ?? null);
    const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

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
            }
        },
        [router],
    );

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams);

        if (filterJobType) params.set("jobType", filterJobType);
        else params.delete("jobType");
        if (filterIndustry) params.set("industry", filterIndustry);
        else params.delete("industry");
        if (filterIsActive) params.set("isActive", filterIsActive);
        else params.delete("isActive");
        if (filterCountry) params.set("countryId", filterCountry.value);
        else params.delete("countryId");
        if (filterProvince) params.set("provinceId", filterProvince.value);
        else params.delete("provinceId");
        if (filterCity) params.set("cityId", filterCity.value);
        else params.delete("cityId");

        params.set("page", "1");

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
            setPopoverOpen(false);
        });
    };

    const resetFilters = () => {
        setFilterJobType("");
        setFilterIndustry("");
        setFilterIsActive("");
        setFilterCountry(null);
        setFilterProvince(null);
        setFilterCity(null);

        const params = new URLSearchParams(searchParams);
        params.delete("jobType");
        params.delete("industry");
        params.delete("isActive");
        params.delete("countryId");
        params.delete("provinceId");
        params.delete("cityId");
        params.set("page", "1");

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
            setPopoverOpen(false);
        });
    };

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

    const activeFilterCount = [jobType, industry, isActive, countryId, provinceId, cityId].filter(Boolean).length;

    return (
        <div className="flex h-full flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Lowongan Kerja</h1>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <SearchInput variant="dashboard" placeholder="Cari lowongan pekerjaan" value={search} onChange={(value) => setSearch(value)} />

                    <div className="grid grid-cols-2 gap-4 sm:flex">
                        <Popover
                            open={popoverOpen}
                            onOpenChange={(open) => {
                                if (open) {
                                    setFilterJobType(searchParams.get("jobType") || "");
                                    setFilterIndustry(searchParams.get("industry") || "");
                                    setFilterIsActive(searchParams.get("isActive") || "");
                                }
                                setPopoverOpen(open);
                            }}
                        >
                            <PopoverTrigger asChild>
                                <Button variant={activeFilterCount > 0 ? "default" : "outline"} className="flex gap-2">
                                    <FilterIcon className="h-4 w-4" />
                                    Filter
                                    {activeFilterCount > 0 && (
                                        <Badge className="flex h-4 items-center justify-center rounded-full border-white px-1 text-xs font-medium text-white">
                                            {activeFilterCount}
                                        </Badge>
                                    )}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-72 p-4" align="end">
                                <div className="grid gap-4">
                                    <div className="space-y-1">
                                        <h4 className="text-sm leading-none font-semibold">Filter Lowongan</h4>
                                    </div>
                                    <div className="grid gap-3 py-2">
                                        <div className="grid gap-2">
                                            <span className="text-xs font-medium">Tipe Pekerjaan</span>
                                            <ReactSelect
                                                name="jobType"
                                                instanceId="filter-job-type"
                                                options={jobTypeOptions}
                                                placeholder="Pilih tipe pekerjaan"
                                                isClearable
                                                value={jobTypeOptions.find((opt) => opt.value === filterJobType) ?? null}
                                                onChange={(opt: any) => setFilterJobType(opt?.value ?? "")}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <span className="text-xs font-medium">Industri</span>
                                            <ReactSelect
                                                name="industry"
                                                instanceId="filter-industry"
                                                options={jobIndustryOptions}
                                                placeholder="Pilih industri"
                                                isClearable
                                                value={jobIndustryOptions.find((opt) => opt.value === filterIndustry) ?? null}
                                                onChange={(opt: any) => setFilterIndustry(opt?.value ?? "")}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <span className="text-xs font-medium">Status</span>
                                            <ReactSelect
                                                name="isActive"
                                                instanceId="filter-is-active"
                                                options={[
                                                    { value: "true", label: "Aktif" },
                                                    { value: "false", label: "Nonaktif" },
                                                ]}
                                                placeholder="Pilih status"
                                                isClearable
                                                value={
                                                    filterIsActive
                                                        ? { value: filterIsActive, label: filterIsActive === "true" ? "Aktif" : "Nonaktif" }
                                                        : null
                                                }
                                                onChange={(opt: any) => setFilterIsActive(opt?.value ?? "")}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <span className="text-xs font-medium">Negara</span>
                                            <AsyncReactSelect
                                                name="countryId"
                                                instanceId="filter-country"
                                                placeholder="Pilih negara"
                                                isClearable
                                                defaultOptions
                                                value={filterCountry}
                                                loadOptions={(inputValue) => fetchCountries(inputValue).then((opts) => opts)}
                                                onChange={(opt: any) => {
                                                    setFilterCountry(opt ?? null);
                                                    setFilterProvince(null);
                                                    setFilterCity(null);
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <span className="text-xs font-medium">Provinsi</span>
                                            <AsyncReactSelect
                                                key={filterCountry?.value ?? "no-country"}
                                                name="provinceId"
                                                instanceId="filter-province"
                                                placeholder="Pilih provinsi"
                                                isClearable
                                                defaultOptions
                                                value={filterProvince}
                                                loadOptions={(inputValue) => fetchProvinces(inputValue).then((r) => r.options)}
                                                onChange={(opt: any) => {
                                                    setFilterProvince(opt ?? null);
                                                    setFilterCity(null);
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <span className="text-xs font-medium">Kota</span>
                                            <AsyncReactSelect
                                                key={filterProvince?.value ?? "no-province"}
                                                name="cityId"
                                                instanceId="filter-city"
                                                placeholder="Pilih kota"
                                                isClearable
                                                defaultOptions
                                                value={filterCity}
                                                loadOptions={(inputValue) =>
                                                    fetchCities(inputValue, filterProvince ? Number(filterProvince.value) : undefined).then(
                                                        (r) => r.options,
                                                    )
                                                }
                                                onChange={(opt: any) => setFilterCity(opt ?? null)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm" onClick={resetFilters}>
                                            <RefreshCcwIcon /> Reset
                                        </Button>
                                        <Button size="sm" onClick={applyFilters}>
                                            <FilterIcon /> Terapkan
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <Button variant="default" onClick={() => onOpen("job-management", {})}>
                            <PlusIcon className="h-4 w-4" />
                            Tambah
                        </Button>
                    </div>
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
                        <div className="py-16 text-center text-sm">Tidak ada lowongan ditemukan</div>
                    ) : (
                        <>
                            {jobs.items.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    selected={selectedJob?.id === job.id}
                                    onClick={() => {
                                        setSelectedJob(job);
                                        if (window.innerWidth < 768) setMobileDetailOpen(true);
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
                            currentUserId={currentUser?.id}
                            onEdit={(job) => onOpen("job-management", { job })}
                            onDelete={handleDelete}
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
                            currentUserId={currentUser?.id}
                            onEdit={(job) => {
                                setMobileDetailOpen(false);
                                onOpen("job-management", { job });
                            }}
                            onDelete={async (id) => {
                                await handleDelete(id);
                                setMobileDetailOpen(false);
                            }}
                            deletingId={deletingId}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
