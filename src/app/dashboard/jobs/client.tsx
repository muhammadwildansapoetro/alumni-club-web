"use client";

import React, { useState, useEffect, useTransition, useMemo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FilterIcon, Loader2Icon, PlusIcon, RefreshCcwIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import SearchInput from "@/components/input/search-input";
import ReactSelect from "@/components/ui/react-select";
import { jobTypeOptions } from "@/lib/option";
import { JobPosting, JOB_TYPE_LABELS, SALARY_RANGE_LABELS } from "@/types/job";
import { deleteJob } from "@/services/jobs.client";
import { useDialog } from "@/hooks/use-dialog";
import { toast } from "sonner";

interface JobsClientProps {
    jobs: {
        items: JobPosting[];
        pagination: { page: number; limit: number; total: number; totalPages: number };
    } | null;
    error: string | null;
}

export default function JobsClient({ jobs, error }: JobsClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { onOpen } = useDialog();
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [debouncedSearch] = useDebounce(search, 500);
    const jobType = searchParams.get("jobType") || "";
    const [filterJobType, setFilterJobType] = useState(jobType);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

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

    const applyFilters = (newJobType: string) => {
        const params = new URLSearchParams(searchParams);

        if (newJobType) {
            params.set("jobType", newJobType);
        } else {
            params.delete("jobType");
        }

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

    const columns = useMemo<ColumnDef<JobPosting>[]>(
        () => [
            {
                accessorKey: "title",
                header: "Lowongan / Perusahaan",
                cell: ({ row }) => (
                    <div>
                        <p className="font-medium">{row.original.title}</p>
                        <p className="text-muted-foreground text-xs">{row.original.company || "-"}</p>
                    </div>
                ),
            },
            {
                accessorKey: "jobType",
                header: "Tipe",
                cell: ({ row }) =>
                    row.original.jobType ? (
                        <Badge variant="outline" size="xs">
                            {JOB_TYPE_LABELS[row.original.jobType]}
                        </Badge>
                    ) : (
                        "-"
                    ),
            },
            {
                id: "location",
                header: "Lokasi",
                cell: ({ row }) => {
                    const { cityName, provinceName, countryName } = row.original;
                    return cityName ?? provinceName ?? countryName ?? "-";
                },
            },
            {
                accessorKey: "salaryRange",
                header: "Gaji",
                cell: ({ row }) => (row.original.salaryRange ? SALARY_RANGE_LABELS[row.original.salaryRange] : "-"),
            },
            {
                id: "postedBy",
                header: "Diposting Oleh",
                cell: ({ row }) => (
                    <div>
                        <p className="font-medium">{row.original.user.profile?.fullName ?? row.original.user.name ?? row.original.user.email}</p>
                        <p className="text-muted-foreground text-xs">
                            {new Date(row.original.createdAt).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                ),
            },
            {
                accessorKey: "isActive",
                header: "Status",
                cell: ({ row }) =>
                    row.original.isActive ? (
                        <Badge variant="default" size="xs">
                            Aktif
                        </Badge>
                    ) : (
                        <Badge variant="destructive" size="xs">
                            Nonaktif
                        </Badge>
                    ),
            },
            {
                id: "actions",
                header: "Aksi",
                cell: ({ row }) => {
                    const id = row.original.id;
                    if (confirmDeleteId === id) {
                        return (
                            <div className="flex gap-2">
                                <Button variant="destructive" size="sm" disabled={deletingId === id} onClick={() => handleDelete(id)}>
                                    {deletingId === id ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "Yakin?"}
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setConfirmDeleteId(null)}>
                                    Batal
                                </Button>
                            </div>
                        );
                    }
                    return (
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => onOpen("job-management", { job: row.original })}>
                                <SquarePenIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => setConfirmDeleteId(id)}>
                                <Trash2Icon className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                },
            },
        ],
        [confirmDeleteId, deletingId, onOpen, handleDelete],
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Lowongan Kerja</h1>

                <div className="flex w-xl items-center gap-4">
                    <SearchInput variant="dashboard" placeholder="Cari lowongan pekerjaan" value={search} onChange={(value) => setSearch(value)} />

                    <div className="flex justify-end gap-2">
                        <Popover
                            open={popoverOpen}
                            onOpenChange={(open) => {
                                if (open) {
                                    setFilterJobType(searchParams.get("jobType") || "");
                                }
                                setPopoverOpen(open);
                            }}
                        >
                            <PopoverTrigger asChild>
                                <Button variant={jobType ? "default" : "outline"} className="flex w-full gap-2 sm:w-auto">
                                    <FilterIcon className="h-4 w-4" />
                                    Filter
                                    {jobType && (
                                        <Badge className="flex h-4 items-center justify-center rounded-full border-white px-1 text-xs font-medium text-white">
                                            1
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
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setFilterJobType("");
                                                applyFilters("");
                                            }}
                                        >
                                            <RefreshCcwIcon /> Reset
                                        </Button>
                                        <Button size="sm" onClick={() => applyFilters(filterJobType)}>
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

            <DataTable columns={columns} data={jobs?.items || []} loading={isPending} error={error} />

            {jobs?.pagination && jobs.pagination.totalPages > 0 && (
                <div className="pt-2">
                    <Pagination
                        currentPage={Number(jobs.pagination.page)}
                        totalPages={Number(jobs.pagination.totalPages)}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}
