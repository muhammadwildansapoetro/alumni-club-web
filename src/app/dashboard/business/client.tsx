"use client";

import React, { useState, useEffect, useTransition, useMemo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Loader2Icon, PlusIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import SearchInput from "@/components/input/search-input";
import { Business } from "@/types/business";
import { deleteBusiness } from "@/services/business.client";
import { useDialog } from "@/hooks/use-dialog";
import { toast } from "sonner";

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
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [debouncedSearch] = useDebounce(search, 500);
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
                cell: ({ row }) => (
                    <div>
                        <p className="font-medium">{row.original.businessName}</p>
                        {row.original.category && (
                            <p className="text-muted-foreground text-xs">{row.original.category}</p>
                        )}
                    </div>
                ),
            },
            {
                accessorKey: "location",
                header: "Lokasi",
                cell: ({ row }) => row.original.location || "-",
            },
            {
                accessorKey: "website",
                header: "Website",
                cell: ({ row }) =>
                    row.original.website ? (
                        <a
                            href={row.original.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                        >
                            {row.original.website}
                        </a>
                    ) : (
                        "-"
                    ),
            },
            {
                id: "postedBy",
                header: "Pemilik",
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
                            <Button variant="outline" size="sm" onClick={() => onOpen("business-management", { business: row.original })}>
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
                <h1 className="text-2xl font-bold tracking-tight">Direktori Bisnis</h1>

                <div className="flex w-xl items-center gap-4">
                    <SearchInput variant="dashboard" placeholder="Cari bisnis" value={search} onChange={(value) => setSearch(value)} />

                    <div className="flex justify-end gap-2">
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
                    <Pagination
                        currentPage={Number(businesses.page)}
                        totalPages={Number(businesses.totalPages)}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}
