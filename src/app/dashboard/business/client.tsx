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
import { EyeIcon, FilterIcon, Loader2Icon, PlusIcon, RefreshCcwIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import SearchInput from "@/components/input/search-input";
import ReactSelect from "@/components/ui/react-select";
import { Input } from "@/components/ui/input";
import { Business } from "@/types/business";
import { TDepartment } from "@/types/user";
import { deleteBusiness } from "@/services/business.client";
import { useDialog } from "@/hooks/use-dialog";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

const isActiveOptions = [
    { value: "true", label: "Aktif" },
    { value: "false", label: "Nonaktif" },
];

interface BusinessClientProps {
    businesses: {
        data: Business[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    } | null;
    error: string | null;
}

export default function BusinessClient({ businesses, error }: BusinessClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { onOpen } = useDialog();
    const currentUser = useAuthStore((s) => s.user);
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [debouncedSearch] = useDebounce(search, 500);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState(searchParams.get("category") || "");
    const [filterIsActive, setFilterIsActive] = useState(searchParams.get("isActive") || "");
    const activeCategory = searchParams.get("category") || "";
    const activeIsActive = searchParams.get("isActive") || "";
    const activeFilterCount = [activeCategory, activeIsActive].filter(Boolean).length;
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = useCallback(
        async (id: string) => {
            setDeletingId(id);
            try {
                await deleteBusiness(id);
                toast.success("Bisnis berhasil dihapus");
                router.refresh();
            } catch (err: any) {
                toast.error(err?.response?.data?.message ?? "Gagal menghapus bisnis");
            } finally {
                setDeletingId(null);
                setConfirmDeleteId(null);
            }
        },
        [router],
    );

    const applyFilters = (category: string, isActive: string) => {
        const params = new URLSearchParams(searchParams);

        if (category) params.set("category", category);
        else params.delete("category");

        if (isActive) params.set("isActive", isActive);
        else params.delete("isActive");

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

    const columns = useMemo<ColumnDef<Business>[]>(
        () => [
            {
                accessorKey: "businessName",
                header: "Nama Bisnis",
                cell: ({ row }) => <p className="font-medium">{row.original.businessName}</p>,
            },
            {
                accessorKey: "category",
                header: "Kategori",
                cell: ({ row }) => row.original.category || "-",
            },
            {
                accessorKey: "location",
                header: "Lokasi",
                cell: ({ row }) => {
                    const { countryName, provinceName, cityName } = row.original;
                    if (!countryName) return row.original.location || "-";
                    const isIndonesia = countryName.toLowerCase() === "indonesia";
                    if (isIndonesia && (cityName || provinceName)) {
                        return (
                            <div>
                                {cityName && <p className="font-medium">{cityName}</p>}
                                <p className="text-muted-foreground text-xs">{[provinceName, countryName].filter(Boolean).join(", ")}</p>
                            </div>
                        );
                    }
                    return countryName;
                },
            },
            {
                accessorKey: "website",
                header: "Website",
                cell: ({ row }) =>
                    row.original.website ? (
                        <a href={row.original.website} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
                            {row.original.website}
                        </a>
                    ) : (
                        "-"
                    ),
            },
            {
                id: "postedBy",
                header: "Pemilik",
                cell: ({ row }) => {
                    const { profile, name, email } = row.original.user;
                    return (
                        <div>
                            <p className="font-medium">{profile?.fullName ?? name ?? email}</p>
                            {profile?.department && (
                                <Badge variant={profile.department as any} size="xs" className="mt-1">
                                    {TDepartment[profile.department as keyof typeof TDepartment]} - {profile.entryYear}
                                </Badge>
                            )}
                        </div>
                    );
                },
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
                    const isOwner = currentUser?.id === row.original.user.id;
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
                            <Button variant="outline" size="sm" onClick={() => onOpen("business-detail", { business: row.original })}>
                                <EyeIcon className="h-4 w-4" />
                            </Button>
                            {isOwner && (
                                <>
                                    <Button variant="outline" size="sm" onClick={() => onOpen("business-management", { business: row.original })}>
                                        <SquarePenIcon className="h-4 w-4" />
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => setConfirmDeleteId(id)}>
                                        <Trash2Icon className="h-4 w-4" />
                                    </Button>
                                </>
                            )}
                        </div>
                    );
                },
            },
        ],
        [confirmDeleteId, deletingId, onOpen, handleDelete, currentUser?.id],
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Direktori Bisnis</h1>

                <div className="flex w-md items-center gap-4">
                    <SearchInput variant="dashboard" placeholder="Cari bisnis" value={search} onChange={(value) => setSearch(value)} />

                    <div className="flex justify-end gap-2">
                        <Popover
                            open={popoverOpen}
                            onOpenChange={(open) => {
                                if (open) {
                                    setFilterCategory(activeCategory);
                                    setFilterIsActive(activeIsActive);
                                }
                                setPopoverOpen(open);
                            }}
                        >
                            <PopoverTrigger asChild>
                                <Button variant={activeFilterCount > 0 ? "default" : "outline"} className="flex w-full gap-2 sm:w-auto">
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
                                        <h4 className="text-sm leading-none font-semibold">Filter Bisnis</h4>
                                    </div>
                                    <div className="grid gap-3 py-2">
                                        <div className="grid gap-2">
                                            <span className="text-xs font-medium">Kategori</span>
                                            <Input
                                                placeholder="mis. Kuliner, Teknologi"
                                                value={filterCategory}
                                                onChange={(e) => setFilterCategory(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <span className="text-xs font-medium">Status</span>
                                            <ReactSelect
                                                name="isActive"
                                                instanceId="filter-is-active"
                                                options={isActiveOptions}
                                                placeholder="Pilih status"
                                                isClearable
                                                value={isActiveOptions.find((opt) => opt.value === filterIsActive) ?? null}
                                                onChange={(opt: any) => setFilterIsActive(opt?.value ?? "")}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setFilterCategory("");
                                                setFilterIsActive("");
                                                applyFilters("", "");
                                            }}
                                        >
                                            <RefreshCcwIcon /> Reset
                                        </Button>
                                        <Button size="sm" onClick={() => applyFilters(filterCategory, filterIsActive)}>
                                            <FilterIcon /> Terapkan
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button variant="default" onClick={() => onOpen("business-management", {})}>
                            <PlusIcon className="h-4 w-4" />
                            Tambah
                        </Button>
                    </div>
                </div>
            </div>

            <DataTable columns={columns} data={businesses?.data || []} loading={isPending} error={error} />

            {businesses && businesses.totalPages > 0 && (
                <div className="pt-2">
                    <Pagination currentPage={Number(businesses.page)} totalPages={Number(businesses.totalPages)} onPageChange={handlePageChange} />
                </div>
            )}
        </div>
    );
}
