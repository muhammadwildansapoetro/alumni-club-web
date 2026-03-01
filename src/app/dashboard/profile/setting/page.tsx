"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { KeyIcon, MailIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { toast } from "sonner";

const departmentBorderMap = {
    TEP: {
        firstCard: "border-primary border-t-8",
        card: "border-primary border-t",
        header: "border-primary/50 border-b",
    },
    TPN: {
        firstCard: "border-primary border-t-8",
        card: "border-red-500 border-t",
        header: "border-red-500/50 border-b",
    },
    TIN: {
        firstCard: "border-primary border-t-8",
        card: "border-orange-500 border-t",
        header: "border-orange-500/50 border-b",
    },
} as const;

export default function ProfileSettingPage() {
    const { user, linkGoogle } = useAuth();
    const deptStyle = departmentBorderMap[user?.profile?.department as keyof typeof departmentBorderMap];
    const isGoogleLinked = user?.authMethod === "GOOGLE" || user?.authMethod === "BOTH";

    return (
        <div className="space-y-3">
            {/* Profile */}
            <Card className={deptStyle?.firstCard}>
                <CardHeader className={deptStyle?.header}>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <SettingsIcon /> Pengaturan
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <p className="text-xs">Ubah Email: {user?.email}</p>
                                <Button variant="outline" size="sm" className="mt-1 w-full sm:w-fit">
                                    <MailIcon />
                                    Ubah Email
                                </Button>
                            </div>
                            <div>
                                <p className="text-xs">Log in dengan Google</p>
                                {isGoogleLinked ? (
                                    <Button variant="outline" size="sm" className="mt-1 w-full sm:w-fit" disabled>
                                        <Image src="/logo/google.svg" alt="Google Logo" width={15} height={15} />
                                        Sudah Terhubung
                                    </Button>
                                ) : (
                                    <div className="mt-1">
                                        <GoogleLogin
                                            onSuccess={(response: CredentialResponse) => {
                                                if (response.credential) {
                                                    linkGoogle(response.credential);
                                                }
                                            }}
                                            onError={() => {
                                                toast.error("Gagal Menghubungkan Akun", {
                                                    description: "Terjadi kesalahan saat menghubungkan akun Google.",
                                                    duration: 5000,
                                                });
                                            }}
                                            text="signin_with"
                                            size="medium"
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-xs">Ubah Password</p>
                                <Button variant="outline" size="sm" className="mt-1 w-full sm:w-fit">
                                    <KeyIcon />
                                    Ubah Password
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
