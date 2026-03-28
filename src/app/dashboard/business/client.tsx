"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FilterIcon, GlobeIcon, Loader2Icon, MapPinIcon, PlusIcon, RefreshCcwIcon, SquarePenIcon, TagIcon, Trash2Icon } from "lucide-react";
import SearchInput from "@/components/input/search-input";
import ReactSelect from "@/components/ui/react-select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Business } from "@/types/business";
import { INDUSTRY_LABELS } from "@/types/job";
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

function BusinessCardSkeleton() {
    return (
        <div className="bg-card space-y-3 rounded-lg border p-5">
            <div className="flex items-start justify-between gap-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <Skeleton className="h-4 w-1/3" />
            <div className="flex gap-2 pt-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center justify-between border-t pt-2">
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
            </div>
        </div>
    );
}

function BusinessCard({
    business,
    currentUserId,
    deletingId,
    onView,
    onEdit,
    onDelete,
}: {
    business: Business;
    currentUserId: string | undefined;
    deletingId: string | null;
    onView: () => void;
    onEdit: () => void;
    onDelete: (id: string) => void;
}) {
    const isOwner = currentUserId === business.user.id;
    const { profile, name, email } = business.user;
    const ownerName = profile?.fullName ?? name ?? email;

    const locationLabel = (() => {
        const { countryName, provinceName, cityName } = business;
        if (!countryName) return null;
        const isIndonesia = countryName.toLowerCase() === "indonesia";
        if (isIndonesia && (cityName || provinceName)) {
            return [cityName, provinceName].filter(Boolean).join(", ");
        }
        return countryName;
    })();

    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
        <>
            <div className="bg-card flex cursor-pointer flex-col space-y-3 rounded-lg border p-5 transition-shadow hover:shadow-md" onClick={onView}>
                <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-2 text-base leading-snug font-semibold">{business.businessName}</h3>
                        {business.isActive ? (
                            <Badge variant="default" size="xs" className="shrink-0">
                                Aktif
                            </Badge>
                        ) : (
                            <Badge variant="destructive" size="xs" className="shrink-0">
                                Nonaktif
                            </Badge>
                        )}
                    </div>

                    {business.industry && (
                        <div className="flex items-center gap-1.5 text-xs">
                            <TagIcon className="h-3.5 w-3.5 shrink-0" />
                            <span>{INDUSTRY_LABELS[business.industry]}</span>
                        </div>
                    )}

                    {locationLabel && (
                        <div className="flex items-center gap-1.5 text-xs">
                            <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
                            <span className="line-clamp-1">{locationLabel}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-1.5 text-xs">
                        <GlobeIcon className="h-3.5 w-3.5 shrink-0" />
                        {business.website ? (
                            <a
                                href={business.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary line-clamp-1 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {business.website}
                            </a>
                        ) : (
                            <span className="text-muted-foreground">-</span>
                        )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs">
                        <Image src="/logo/instagram.svg" alt="Instagram Logo" width={14} height={14} className="shrink-0" />
                        {business.instagramUrl ? (
                            <a
                                href={business.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary line-clamp-1 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {business.instagramUrl}
                            </a>
                        ) : (
                            <span className="text-muted-foreground">-</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 border-t pt-2" onClick={(e) => e.stopPropagation()}>
                    <div className="min-w-0">
                        <p className="truncate text-xs font-medium">{ownerName}</p>
                        {profile?.department && (
                            <Badge variant={profile.department as any} size="xs" className="mt-0.5">
                                {TDepartment[profile.department as keyof typeof TDepartment]} - {profile.entryYear}
                            </Badge>
                        )}
                    </div>

                    {isOwner && (
                        <div className="flex shrink-0 gap-2">
                            <Button variant="outline" size="sm" onClick={onEdit}>
                                <SquarePenIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="outline_destructive" size="sm" onClick={() => setConfirmOpen(true)}>
                                <Trash2Icon className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Hapus Bisnis</DialogTitle>
                        <DialogDescription>
                            Apakah kamu yakin ingin menghapus bisnis <span className="font-medium">&ldquo;{business.businessName}&rdquo;</span>?
                            Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={deletingId === business.id}
                            onClick={() => {
                                onDelete(business.id);
                                setConfirmOpen(false);
                            }}
                        >
                            {deletingId === business.id ? (
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
        </>
    );
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

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:justify-between md:flex-row">
                <h1 className="text-2xl font-bold tracking-tight">Direktori Bisnis</h1>

                <div className="flex flex-col gap-4 sm:w-lg sm:flex-row">
                    <SearchInput variant="dashboard" placeholder="Cari bisnis" value={search} onChange={(value) => setSearch(value)} />

                    <div className="grid w-full grid-cols-2 gap-4">
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

            {error && <div className="border-destructive/50 bg-destructive/10 text-destructive rounded-lg border p-4 text-sm">{error}</div>}

            {isPending ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <BusinessCardSkeleton key={i} />
                    ))}
                </div>
            ) : businesses?.data && businesses.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {businesses.data.map((business) => (
                        <BusinessCard
                            key={business.id}
                            business={business}
                            currentUserId={currentUser?.id}
                            deletingId={deletingId}
                            onView={() => onOpen("business-detail", { business })}
                            onEdit={() => onOpen("business-management", { business })}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
                    <p className="text-sm">Tidak ada bisnis ditemukan</p>
                </div>
            )}

            {businesses && businesses.totalPages > 0 && (
                <div className="pt-2">
                    <Pagination currentPage={Number(businesses.page)} totalPages={Number(businesses.totalPages)} onPageChange={handlePageChange} />
                </div>
            )}
        </div>
    );
}
