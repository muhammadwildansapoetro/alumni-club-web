"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { googleAuthService } from "@/services/google-auth.service";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

export default function LoginClient() {
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { loginWithGoogle, isAuthenticated } = useAuthStore();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const redirect = searchParams.get("redirect") || "/dashboard";
            router.push(redirect);
        }
    }, [isAuthenticated, router, searchParams]);

    // Initialize Google auth on mount
    useEffect(() => {
        const initGoogleAuth = async () => {
            try {
                await googleAuthService.initGoogleAuth();
            } catch (error) {
                console.error("Failed to initialize Google auth:", error);
                toast.error("Google auth tidak tersedia", {
                    description: "Tidak dapat memuat Google Sign-In",
                    duration: 5000,
                });
            }
        };

        initGoogleAuth();
    }, []);

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);

        try {
            const token = await googleAuthService.signInWithPopup();
            await loginWithGoogle(token);
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="from-primary/10 to-primary/5 flex min-h-screen w-full items-center justify-center bg-linear-to-br px-5">
            <Card className="w-md gap-3 rounded-xl border bg-white shadow-xl">
                <CardHeader>
                    <div className="flex w-full items-center justify-center gap-3">
                        <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={50} height={50} />
                        <h1 className="text-xl font-bold">FTIP Unpad Alumni Club</h1>
                    </div>
                    <p className="text-center text-sm">Masuk menggunakan akun Google Anda</p>
                </CardHeader>

                <CardContent className="space-y-4 text-center">
                    <Button type="button" variant={"outline"} onClick={handleGoogleLogin} disabled={googleLoading}>
                        {googleLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            <>
                                <FaGoogle className="h-4 w-4" />
                                Masuk dengan Google
                            </>
                        )}
                    </Button>
                </CardContent>

                <CardFooter>
                    <p className="w-full text-center text-xs font-medium">
                        Belum memiliki akun? Silakan{" "}
                        <Link href="/register" className="text-primary font-bold hover:underline">
                            Daftar
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
