"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterIcon, SearchIcon, RefreshCcwIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface AlumniProfile {
    id: number;
    fullName: string | null;
    department: "TEP" | "TPN" | "TIN";
    entryYear: number;
    cityName: string | null;
}

export interface AlumniUser {
    id: string;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
    authMethod: string;
    profile: AlumniProfile | null;
    createdAt: string;
    updatedAt: string;
}

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
                    {row.original.profile.department}
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

    const [localDept, setLocalDept] = useState(department);
    const [localYear, setLocalYear] = useState(entryYear);

    const [popoverOpen, setPopoverOpen] = useState(false);

    // Sync state from URL changes
    useEffect(() => {
        setLocalDept(searchParams.get("department") || "");
        setLocalYear(searchParams.get("entryYear") || "");
        setSearch(searchParams.get("search") || "");
    }, [searchParams]);

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
                    <div className="relative w-full sm:max-w-xs">
                        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            placeholder="Cari nama alumni"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-background w-full pl-9"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="flex w-full gap-2 sm:w-auto">
                                    <FilterIcon className="h-4 w-4" />
                                    Filter
                                    {(department || entryYear) && (
                                        <Badge
                                            variant={department as "TEP" | "TPN" | "TIN"}
                                            className="ml-1 flex h-5 items-center justify-center rounded-full px-1.5 text-[10px]"
                                        >
                                            {(department ? 1 : 0) + (entryYear ? 1 : 0)}
                                        </Badge>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4" align="end">
                                <div className="grid gap-4">
                                    <div className="space-y-1">
                                        <h4 className="text-sm leading-none font-semibold">Filter Data</h4>
                                        <p className="text-muted-foreground text-xs">Sesuaikan pencarian alumni.</p>
                                    </div>
                                    <div className="grid gap-3 py-2">
                                        <div className="grid gap-2">
                                            <span className="text-xs font-medium">Program Studi</span>
                                            <Select value={localDept} onValueChange={setLocalDept}>
                                                <SelectTrigger className="h-9">
                                                    <SelectValue placeholder="Pilih Program Studi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ALL">Semua Program Studi</SelectItem>
                                                    <SelectItem value="TEP">TEP (Teknik Pertanian)</SelectItem>
                                                    <SelectItem value="TPN">TPN (Teknologi Pangan)</SelectItem>
                                                    <SelectItem value="TIN">TIN (Teknologi Industri Pertanian)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <span className="text-xs font-medium">Tahun Angkatan</span>
                                            <Input
                                                type="number"
                                                placeholder="Misal: 2018"
                                                className="h-9"
                                                value={localYear}
                                                onChange={(e) => setLocalYear(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setLocalDept("");
                                                setLocalYear("");
                                                applyFilters("", "");
                                            }}
                                        >
                                            Hapus Filter
                                        </Button>
                                        <Button size="sm" onClick={() => applyFilters(localDept, localYear)}>
                                            Terapkan
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
