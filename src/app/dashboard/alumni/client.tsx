"use client";

import React, { useState, useEffect, useTransition, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ExternalLinkIcon, EyeIcon, FilterIcon, RefreshCcwIcon } from "lucide-react";
import SearchInput from "@/components/input/search-input";
import ReactSelect from "@/components/ui/react-select";
import { departmentOptions, entryYearOptions } from "@/lib/option";
import { AlumniUser, TDepartment } from "@/types/user";
import { useDialog } from "@/hooks/use-dialog";
import AlumniDetailDialog from "@/components/dialog/alumni-detail";
import Link from "next/link";
import Image from "next/image";

export default function AlumniClient({ alumni, error }: { alumni: any; error: string | null }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { onOpen } = useDialog();
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [debouncedSearch] = useDebounce(search, 500);
    const department = searchParams.get("department") || "";
    const entryYear = searchParams.get("entryYear") || "";
    const [filterDepartment, setFilterDepartment] = useState(department);
    const [filterEntryYear, setFilterEntryYear] = useState(entryYear);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const columns = useMemo<ColumnDef<AlumniUser>[]>(
        () => [
            {
                accessorKey: "profile.fullName",
                header: "Nama & Email",
                cell: ({ row }) => (
                    <div>
                        <p className="font-medium">{row.original.profile?.fullName || row.original.name}</p>
                        <p className="text-xs text-gray-700">{row.original.email}</p>
                    </div>
                ),
            },
            {
                accessorKey: "profile.department",
                header: "Program Studi - Angkatan",
                cell: ({ row }) =>
                    row.original.profile?.department ? (
                        <Badge variant={row.original.profile?.department} size={"xs"}>
                            {TDepartment[row.original.profile.department as keyof typeof TDepartment]} - {row.original.profile?.entryYear}
                        </Badge>
                    ) : (
                        "-"
                    ),
            },
            {
                accessorKey: "profile.cityName",
                header: "Domisili",
                cell: ({ row }) => (
                    <div className="flex flex-col">
                        {row.original.profile?.countryId == 77 ? (
                            <>
                                <span>{row.original.profile?.cityName || ""}</span>
                                <span className="text-xs">
                                    {row.original.profile?.provinceName || ""}, {row.original.profile?.countryName || ""}
                                </span>
                            </>
                        ) : (
                            <>
                                <span>{row.original.profile?.countryName || "-"}</span>
                            </>
                        )}
                    </div>
                ),
            },
            {
                accessorKey: "profile.linkedInUrl",
                header: "LinkedIn",
                cell: ({ row }) =>
                    row.original.profile?.linkedInUrl ? (
                        <Link
                            href={row.original?.profile?.linkedInUrl}
                            target="_blank"
                            className={buttonVariants({ variant: "outline_linkedin", size: "sm" })}
                        >
                            <Image src="/logo/linkedin.svg" alt="LinkedIn Logo" width={15} height={15} />
                            LinkedIn
                            <ExternalLinkIcon className="h-3 w-3" />
                        </Link>
                    ) : (
                        "-"
                    ),
            },
            {
                accessorKey: "profile.instagramUrl",
                header: "Instagram",
                cell: ({ row }) =>
                    row.original.profile?.instagramUrl ? (
                        <Link
                            href={row.original?.profile?.instagramUrl}
                            target="_blank"
                            className={buttonVariants({ variant: "outline_instagram", size: "sm" })}
                        >
                            <Image src="/logo/instagram.svg" alt="Instagram Logo" width={15} height={15} />
                            Instagram
                            <ExternalLinkIcon className="h-3 w-3" />
                        </Link>
                    ) : (
                        "-"
                    ),
            },
            {
                id: "actions",
                header: "Aksi",
                cell: ({ row }) => (
                    <Button variant="outline" size="sm" onClick={() => onOpen("alumni-detail", { alumni: row.original })}>
                        <EyeIcon className="h-4 w-4" />
                    </Button>
                ),
            },
        ],
        [onOpen],
    );

    const applyFilters = (newDepartment: string, newEntryYear: string) => {
        const params = new URLSearchParams(searchParams);

        if (newDepartment && newDepartment !== "ALL") {
            params.set("department", newDepartment);
        } else {
            params.delete("department");
        }

        if (newEntryYear) {
            params.set("entryYear", newEntryYear);
        } else {
            params.delete("entryYear");
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

    // Handle debounce search execution
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const currentSearch = params.get("search") || "";

        if (debouncedSearch !== currentSearch) {
            if (debouncedSearch) {
                params.set("search", debouncedSearch);
            } else {
                params.delete("search");
            }
            params.set("page", "1"); // Reset page on new search

            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`);
            });
        }
    }, [debouncedSearch, pathname, router, searchParams]);

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:justify-between md:flex-row">
                <h1 className="text-2xl font-bold tracking-tight">Daftar Alumni</h1>

                <div className="flex flex-col gap-4 sm:w-lg sm:flex-row sm:justify-end">
                    <SearchInput variant="dashboard" placeholder="Cari nama alumni" value={search} onChange={(value) => setSearch(value)} />

                    <Popover
                        open={popoverOpen}
                        onOpenChange={(open) => {
                            if (open) {
                                setFilterDepartment(searchParams.get("department") || "");
                                setFilterEntryYear(searchParams.get("entryYear") || "");
                            }
                            setPopoverOpen(open);
                        }}
                    >
                        <PopoverTrigger asChild>
                            <Button variant={department || entryYear ? "default" : "outline"} className="flex w-full gap-2 sm:w-auto">
                                <FilterIcon className="h-4 w-4" />
                                Filter
                                {(department || entryYear) && (
                                    <Badge
                                        variant={department as "TEP" | "TPN" | "TIN"}
                                        className="flex h-4 items-center justify-center rounded-full border-white px-1 text-xs font-medium text-white"
                                    >
                                        {(department ? 1 : 0) + (entryYear ? 1 : 0)}
                                    </Badge>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-4" align="end">
                            <div className="grid gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-sm leading-none font-semibold">Filter Alumni</h4>
                                </div>
                                <div className="grid gap-3 py-2">
                                    <div className="grid gap-2">
                                        <span className="text-xs font-medium">Program Studi</span>
                                        <ReactSelect
                                            name="department"
                                            instanceId="filter-department"
                                            options={[{ value: "ALL", label: "Semua Program Studi" }, ...departmentOptions]}
                                            placeholder="Pilih Program Studi"
                                            isClearable
                                            value={
                                                [{ value: "ALL", label: "Semua Program Studi" }, ...departmentOptions].find(
                                                    (opt) => opt.value === filterDepartment,
                                                ) ?? null
                                            }
                                            onChange={(opt: any) => setFilterDepartment(opt?.value ?? "")}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <span className="text-xs font-medium">Tahun Angkatan</span>
                                        <ReactSelect
                                            name="entryYear"
                                            instanceId="filter-entry-year"
                                            options={entryYearOptions}
                                            placeholder="Pilih Tahun Angkatan"
                                            isClearable
                                            value={entryYearOptions.find((opt) => String(opt.value) === filterEntryYear) ?? null}
                                            onChange={(opt: any) => setFilterEntryYear(opt ? String(opt.value) : "")}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setFilterDepartment("");
                                            setFilterEntryYear("");
                                            applyFilters("", "");
                                        }}
                                    >
                                        <RefreshCcwIcon /> Reset
                                    </Button>
                                    <Button size="sm" onClick={() => applyFilters(filterDepartment, filterEntryYear)}>
                                        <FilterIcon /> Terapkan
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <DataTable columns={columns} data={alumni?.items || []} loading={isPending} error={error} />

            {alumni?.pagination && alumni.pagination.totalPages > 0 && (
                <div className="pt-2">
                    <Pagination
                        currentPage={Number(alumni.pagination.page)}
                        totalPages={Number(alumni.pagination.totalPages)}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            <AlumniDetailDialog />
        </div>
    );
}
