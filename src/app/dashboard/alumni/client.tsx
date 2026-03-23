"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FilterIcon, RefreshCcwIcon } from "lucide-react";
import SearchInput from "@/components/input/search-input";
import { Card, CardContent } from "@/components/ui/card";
import ReactSelect from "@/components/ui/react-select";
import { departmentOptions, entryYearOptions } from "@/lib/option";
import { AlumniUser, TDepartment } from "@/types/user";

const columns: ColumnDef<AlumniUser>[] = [
    {
        accessorKey: "profile.fullName",
        header: "Nama",
        cell: ({ row }) => (
            <div>
                <p className="text-sm font-medium">{row.original.profile?.fullName || row.original.name}</p>
                <p className="text-muted-foreground text-xs">{row.original.email}</p>
            </div>
        ),
    },
    {
        accessorKey: "profile.department",
        header: "Program Studi",
        cell: ({ row }) =>
            row.original.profile?.department ? (
                <Badge variant={row.original.profile?.department} size={"xs"} className="text-xs font-normal">
                    {TDepartment[row.original.profile.department as keyof typeof TDepartment]}
                </Badge>
            ) : (
                "-"
            ),
    },
    {
        accessorKey: "profile.entryYear",
        header: "Angkatan",
        cell: ({ row }) => <span className="text-sm">{row.original.profile?.entryYear || "-"}</span>,
    },
    {
        accessorKey: "profile.cityName",
        header: "Domisili",
        cell: ({ row }) => <span className="text-sm">{row.original.profile?.cityName || "-"}</span>,
    },
];

export default function AlumniClient({ initialData, error }: { initialData: any; error: string | null }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [debouncedSearch] = useDebounce(search, 500);

    const department = searchParams.get("department") || "";
    const entryYear = searchParams.get("entryYear") || "";

    const [filterDepartment, setFilterDepartment] = useState(department);
    const [filterEntryYear, setFilterEntryYear] = useState(entryYear);

    const [popoverOpen, setPopoverOpen] = useState(false);

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

    return (
        <Card className="border shadow-none">
            <CardContent className="space-y-4 p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <SearchInput
                        variant="dashboard"
                        containerClassName="sm:max-w-xs"
                        placeholder="Cari nama alumni"
                        value={search}
                        onChange={(value) => setSearch(value)}
                    />

                    <div className="flex justify-end gap-2">
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

                <div className="rounded-md border-0 sm:border">
                    <DataTable columns={columns} data={initialData?.items || []} loading={isPending} error={error} />
                </div>

                {initialData?.pagination && initialData.pagination.totalPages > 0 && (
                    <div className="pt-2">
                        <Pagination
                            currentPage={Number(initialData.pagination.page)}
                            totalPages={Number(initialData.pagination.totalPages)}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
