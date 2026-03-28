"use client";

import { useState, useCallback, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { FilterIcon, GlobeIcon, Loader2Icon, MapPinIcon, PlusIcon, RefreshCcwIcon, SquarePenIcon, TagIcon, Trash2Icon } from "lucide-react";
import SearchInput from "@/components/input/search-input";
import ReactSelect from "@/components/ui/react-select";
import { Input } from "@/components/ui/input";
import { Business } from "@/types/business";
import { INDUSTRY_LABELS } from "@/types/job";
import { deleteBusiness } from "@/services/business.client";
import { useDialog } from "@/hooks/use-dialog";
import { toast } from "sonner";

const isActiveOptions = [
    { value: "true", label: "Aktif" },
    { value: "false", label: "Nonaktif" },
];

interface ProfileBusinessClientProps {
    businesses: {
        data: Business[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    } | null;
    error: string | null;
}

function BusinessCard({
    business,
    deletingId,
    onView,
    onEdit,
    onDelete,
}: {
    business: Business;
    deletingId: string | null;
    onView: () => void;
    onEdit: () => void;
    onDelete: (id: string) => void;
}) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const locationLabel = (() => {
        const { countryName, provinceName, cityName } = business;
        if (!countryName) return null;
        const isIndonesia = countryName.toLowerCase() === "indonesia";
        if (isIndonesia && (cityName || provinceName)) {
            return [cityName, provinceName].filter(Boolean).join(", ");
        }
        return countryName;
    })();

    return (
        <>
            <div className="bg-card flex cursor-pointer flex-col space-y-3 rounded-lg border p-5 transition-shadow hover:shadow-md" onClick={onView}>
                <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 space-y-1">
                            <h3 className="line-clamp-2 text-base leading-snug font-semibold">{business.businessName}</h3>
                            {business.isActive ? (
                                <Badge variant="default" size="xs">
                                    Aktif
                                </Badge>
                            ) : (
                                <Badge variant="destructive" size="xs">
                                    Nonaktif
                                </Badge>
                            )}
                        </div>
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

                <div className="flex items-center justify-end gap-2 border-t pt-2" onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline" size="sm" onClick={onEdit}>
                        <SquarePenIcon className="h-4 w-4" /> Ubah
                    </Button>
                    <Button variant="outline_destructive" size="sm" onClick={() => setConfirmOpen(true)}>
                        <Trash2Icon className="h-4 w-4" /> Hapus
                    </Button>
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

export default function ProfileBusinessClient({ businesses, error }: ProfileBusinessClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { onOpen } = useDialog();
    const [, startTransition] = useTransition();
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold">Bisnis Saya</h2>

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
                                                instanceId="profile-filter-is-active"
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

            {businesses?.data && businesses.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {businesses.data.map((business) => (
                        <BusinessCard
                            key={business.id}
                            business={business}
                            deletingId={deletingId}
                            onView={() => onOpen("business-detail", { business })}
                            onEdit={() => onOpen("business-management", { business })}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
                    <p className="text-sm">Belum ada bisnis yang ditambahkan</p>
                </div>
            )}

            {businesses && businesses.totalPages > 1 && (
                <div className="pt-2">
                    <Pagination currentPage={Number(businesses.page)} totalPages={Number(businesses.totalPages)} onPageChange={handlePageChange} />
                </div>
            )}
        </div>
    );
}
