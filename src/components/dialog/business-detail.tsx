"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Business } from "@/types/business";
import { TDepartment } from "@/types/user";
import { useDialog } from "@/hooks/use-dialog";
import { ExternalLinkIcon } from "lucide-react";

export type BusinessDetailDialogData = { business: Business };

export default function BusinessDetailDialog() {
    const { isOpen, data, onClose } = useDialog<BusinessDetailDialogData>("business-detail");
    const business = data?.business;

    if (!business) return null;

    const { profile, name, email } = business.user;

    const locationParts = () => {
        const { countryName, provinceName, cityName } = business;
        if (!countryName) return business.location || "-";
        const isIndonesia = countryName.toLowerCase() === "indonesia";
        if (isIndonesia) return [cityName, provinceName, countryName].filter(Boolean).join(", ");
        return countryName;
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{business.businessName}</DialogTitle>
                    <DialogDescription>{business.category || ""}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-2">
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

                    <div className="space-y-3">
                        <div>
                            <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">Deskripsi</p>
                            <p className="leading-relaxed">{business.description}</p>
                        </div>

                        {locationParts() !== "-" && (
                            <div>
                                <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">Lokasi</p>
                                <p>{locationParts()}</p>
                            </div>
                        )}

                        {business.website && (
                            <div>
                                <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">Website</p>
                                <a
                                    href={business.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary inline-flex items-center gap-1 hover:underline"
                                >
                                    {business.website}
                                    <ExternalLinkIcon className="h-3 w-3" />
                                </a>
                            </div>
                        )}

                        {business.contactInfo && (
                            <div>
                                <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">Info Kontak</p>
                                <p className="whitespace-pre-line">{business.contactInfo}</p>
                            </div>
                        )}

                        <div>
                            <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">Pemilik</p>
                            <p className="font-medium">{profile?.fullName ?? name ?? email}</p>
                            {profile?.department && (
                                <Badge variant={profile.department as any} size="xs" className="mt-1">
                                    {TDepartment[profile.department as keyof typeof TDepartment]} - {profile.entryYear}
                                </Badge>
                            )}
                        </div>

                        <div>
                            <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide">Ditambahkan</p>
                            <p>
                                {new Date(business.createdAt).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
