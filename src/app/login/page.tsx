"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { signInWithGoogle } from "@/lib/google-signin";

export default function LoginClient() {
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { loginWithGoogle, isAuthenticated, user } = useAuthStore();

    // Get redirect path from URL params or cookie
    const getRedirectPath = () => {
        // First check URL params (for backward compatibility)
        const urlRedirect = searchParams.get("redirect");
        if (urlRedirect) return urlRedirect;

        // Then check document.cookie for redirect-path (client-side)
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split("=");
            if (name === "redirect-path") {
                return decodeURIComponent(value);
            }
        }

        return "/dashboard";
    };

    // Redirect if already authenticated (only for initial page load, not after login)
    useEffect(() => {
        if (isAuthenticated && !googleLoading) {
            const redirect = getRedirectPath();

            // Clear the redirect cookie
            document.cookie = "redirect-path=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // Use setTimeout to ensure state is fully updated
            setTimeout(() => {
                router.push(redirect);
            }, 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, router, searchParams, user, googleLoading]);

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);

        try {
            // Get Google ID token
            const credential = await signInWithGoogle({ text: "signin_with" });

            // Send to backend
            await loginWithGoogle(credential);

            // Add delay to ensure Zustand persist middleware syncs to cookies
            setTimeout(() => {
                const redirect = getRedirectPath();
                router.push(redirect);
            }, 500);

            // The useEffect will handle the redirect once isAuthenticated is true
        } catch (error: any) {
            console.error("Google Sign-In error:", error);

            // Clear any existing toasts before showing new one
            toast.dismiss();

            toast.error("Google Sign-In Gagal", {
                description: error.message || "Terjadi kesalahan saat masuk dengan Google",
                duration: 5000,
            });
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="to-primary-100 from-secondary-100 flex min-h-screen w-full items-center justify-center bg-linear-to-b px-5">
            <Card className="w-md gap-3 rounded-xl border bg-white shadow-xl">
                <CardHeader>
                    <div className="flex w-full items-center justify-center gap-3">
                        <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={50} height={50} />
                        <h1 className="text-primary-gradient text-xl font-bold">FTIP Unpad Alumni Club</h1>
                    </div>
                    <p className="text-center text-sm">Masuk menggunakan akun Google Anda</p>
                </CardHeader>

                <CardContent className="space-y-4 text-center">
                    <Button variant="outline" size="lg" onClick={handleGoogleSignIn} disabled={googleLoading}>
                        {googleLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            <>
                                <Image src="/logo/google.svg" alt="Google Logo" width={20} height={20} className="mr-2" />
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
