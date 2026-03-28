"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { GlobeIcon, Loader2Icon, MapPinIcon, PlusIcon, SquarePenIcon, TagIcon, Trash2Icon } from "lucide-react";
import { Business } from "@/types/business";
import { INDUSTRY_LABELS } from "@/types/job";
import { deleteBusiness } from "@/services/business.client";
import { useDialog } from "@/hooks/use-dialog";
import { toast } from "sonner";

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
    confirmDeleteId,
    deletingId,
    onView,
    onEdit,
    onDeleteConfirm,
    onDeleteCancel,
    onDelete,
}: {
    business: Business;
    confirmDeleteId: string | null;
    deletingId: string | null;
    onView: () => void;
    onEdit: () => void;
    onDeleteConfirm: () => void;
    onDeleteCancel: () => void;
    onDelete: () => void;
}) {
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
                    <div className="flex shrink-0 items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {confirmDeleteId === business.id ? (
                            <>
                                <Button variant="destructive" size="sm" disabled={deletingId === business.id} onClick={onDelete}>
                                    {deletingId === business.id ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "Yakin?"}
                                </Button>
                                <Button variant="outline" size="sm" onClick={onDeleteCancel}>
                                    Batal
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={onEdit}>
                                    <SquarePenIcon className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="destructive" size="icon" className="h-7 w-7" onClick={onDeleteConfirm}>
                                    <Trash2Icon className="h-3.5 w-3.5" />
                                </Button>
                            </>
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

                {business.website && (
                    <div className="flex items-center gap-1.5 text-xs">
                        <GlobeIcon className="h-3.5 w-3.5 shrink-0" />
                        <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary line-clamp-1 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {business.website}
                        </a>
                    </div>
                )}

                {business.instagramUrl && (
                    <div className="flex items-center gap-1.5 text-xs">
                        <Image src="/logo/instagram.svg" alt="Instagram Logo" width={14} height={14} className="shrink-0" />
                        <a
                            href={business.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary line-clamp-1 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {business.instagramUrl}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ProfileBusinessClient({ businesses, error }: ProfileBusinessClientProps) {
    const router = useRouter();
    const { onOpen } = useDialog();
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(businesses?.page ?? 1);

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
        setCurrentPage(newPage);
        router.push(`?page=${newPage}`);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Bisnis Saya</h2>
                <Button variant="default" onClick={() => onOpen("business-management", {})}>
                    <PlusIcon className="h-4 w-4" />
                    Tambah
                </Button>
            </div>

            {error && <div className="border-destructive/50 bg-destructive/10 text-destructive rounded-lg border p-4 text-sm">{error}</div>}

            {businesses?.data && businesses.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {businesses.data.map((business) => (
                        <BusinessCard
                            key={business.id}
                            business={business}
                            confirmDeleteId={confirmDeleteId}
                            deletingId={deletingId}
                            onView={() => onOpen("business-detail", { business })}
                            onEdit={() => onOpen("business-management", { business })}
                            onDeleteConfirm={() => setConfirmDeleteId(business.id)}
                            onDeleteCancel={() => setConfirmDeleteId(null)}
                            onDelete={() => handleDelete(business.id)}
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
                    <Pagination currentPage={currentPage} totalPages={businesses.totalPages} onPageChange={handlePageChange} />
                </div>
            )}
        </div>
    );
}
