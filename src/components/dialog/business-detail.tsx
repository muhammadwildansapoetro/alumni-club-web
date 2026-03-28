"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Business } from "@/types/business";
import { INDUSTRY_LABELS } from "@/types/job";
import { TDepartment } from "@/types/user";
import { useDialog } from "@/hooks/use-dialog";
import { buttonVariants } from "../ui/button";
import { ExternalLinkIcon, GlobeIcon } from "lucide-react";
import Image from "next/image";

export type BusinessDetailDialogData = { business: Business };

export default function BusinessDetailDialog() {
    const { isOpen, data, onClose } = useDialog<BusinessDetailDialogData>("business-detail");
    const business = data?.business;

    if (!business) return null;

    const { profile, name, email } = business.user;

    const locationParts = () => {
        const { countryName, provinceName, cityName } = business;
        if (!countryName) return "-";
        const isIndonesia = countryName.toLowerCase() === "indonesia";
        if (isIndonesia) return [cityName, provinceName, countryName].filter(Boolean).join(", ");
        return countryName;
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{business.businessName}</DialogTitle>
                    <DialogDescription>{business.industry ? INDUSTRY_LABELS[business.industry] : ""}</DialogDescription>
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
                            <p className="d mb-1 text-xs font-medium tracking-wide">Deskripsi</p>
                            <p className="leading-relaxed">{business.description}</p>
                        </div>

                        {locationParts() !== "-" && (
                            <div>
                                <p className="d mb-1 text-xs font-medium tracking-wide">Lokasi</p>
                                <p>{locationParts()}</p>
                            </div>
                        )}

                        {business.website && (
                            <div>
                                <p className="d mb-1 text-xs font-medium tracking-wide">Website</p>
                                <a
                                    href={business.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={buttonVariants({ variant: "outline", size: "sm" })}
                                >
                                    <GlobeIcon className="h-3 w-3" />
                                    Website
                                    <ExternalLinkIcon className="h-3 w-3" />
                                </a>
                            </div>
                        )}

                        {business.instagramUrl && (
                            <div>
                                <p className="d mb-1 text-xs font-medium tracking-wide">Instagram</p>
                                <a
                                    href={business.instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={buttonVariants({ variant: "outline_instagram", size: "sm" })}
                                >
                                    <Image src="/logo/instagram.svg" alt="Instagram Logo" width={15} height={15} />
                                    Instagram
                                    <ExternalLinkIcon className="h-3 w-3" />
                                </a>
                            </div>
                        )}

                        {business.contactInfo && (
                            <div>
                                <p className="d mb-1 text-xs font-medium tracking-wide">Kontak</p>
                                <p className="whitespace-pre-line">{business.contactInfo}</p>
                            </div>
                        )}

                        <div>
                            <p className="d mb-1 text-xs font-medium tracking-wide">Pemilik</p>
                            <p className="font-medium">{profile?.fullName ?? name ?? email}</p>
                            {profile?.department && (
                                <Badge variant={profile.department as any} size="xs" className="mt-1">
                                    {TDepartment[profile.department as keyof typeof TDepartment]} - {profile.entryYear}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
