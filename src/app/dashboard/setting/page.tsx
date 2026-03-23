"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useDialog } from "@/hooks/use-dialog";
import { SettingsIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { toast } from "sonner";
import { departmentBorderMap } from "@/types/user";

export default function ProfileSettingPage() {
    const { user, linkGoogle } = useAuth();
    const { onOpen } = useDialog();
    const deptStyle = departmentBorderMap[user?.profile?.department as keyof typeof departmentBorderMap];
    const isGoogleLinked = user?.authMethod === "GOOGLE" || user?.authMethod === "BOTH";
    const isGoogleOnly = user?.authMethod === "GOOGLE";

    return (
        <div className="space-y-3">
            {/* Profile */}
            <Card className={deptStyle?.firstCard}>
                <CardHeader className={deptStyle?.header}>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <SettingsIcon /> Pengaturan
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* google */}
                        <div>
                            <p className="text-xs">Hubungkan dengan Google</p>
                            {isGoogleLinked ? (
                                <Button variant="outline" size="sm" className="mt-1 w-full sm:w-fit" disabled>
                                    <Image src="/logo/google.svg" alt="Google Logo" width={15} height={15} />
                                    Sudah Terhubung
                                </Button>
                            ) : (
                                <div className="mt-1 w-full sm:w-fit">
                                    <GoogleLogin
                                        onSuccess={(response: CredentialResponse) => {
                                            if (response.credential) {
                                                linkGoogle(response.credential);
                                            }
                                        }}
                                        onError={() => {
                                            toast.error("Gagal Menghubungkan Akun", {
                                                description: "Terjadi kesalahan saat menghubungkan akun Google.",
                                                duration: 10000,
                                            });
                                        }}
                                        text="signin_with"
                                        size="medium"
                                        shape="square"
                                        theme="filled_blue"
                                    />
                                </div>
                            )}
                        </div>

                        {/* change password */}
                        <div>
                            <p className="text-xs">Ubah Kata Sandi</p>
                            <Button variant="outline" size="sm" className="mt-1 w-full sm:w-fit" onClick={() => onOpen("change-password")}>
                                <SquarePenIcon />
                                Ubah
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
