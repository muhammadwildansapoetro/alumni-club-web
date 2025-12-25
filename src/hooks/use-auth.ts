import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { LoginRequest } from "@/types/auth";
import { CONFIG } from "@/config";

// Cookie utilities for consistent cookie management
const setAuthCookie = (token: string) => {
    const isProduction = process.env.NODE_ENV === "production";
    document.cookie = `auth-token=${token}; path=/; secure=${isProduction}; samesite=strict`;
};

const clearAuthCookie = () => {
    const isProduction = process.env.NODE_ENV === "production";
    document.cookie = `auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure=${isProduction}; samesite=strict`;
};

// Type for register form values
type RegisterFormValues = {
    email: string;
    npm: string;
    name: string;
    password: string;
    passwordConfirmation: string;
    department: string;
    classYear: number;
};

export const useAuth = () => {
    const router = useRouter();
    const { user, token, isAuthenticated, isLoading, error, setUser, setLoading, setError, clearAuth } = useAuthStore();

    const login = useCallback(
        async (data: LoginRequest) => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(CONFIG.API.baseURL.auth + `/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                const response = await res.json();

                if (response.success) {
                    // Show success toast
                    toast.success("Login Berhasil", {
                        description: "Selamat datang kembali!",
                        duration: 3000,
                    });

                    // Set cookie for middleware route protection (session-based, no expiration)
                    // Security: Non-httpOnly cookie set from client-side for SSR middleware access
                    // Token is validated against backend on each app load
                    setAuthCookie(response.token);

                    // Set store state
                    setUser(response.user, response.token);

                    router.push("/dashboard");
                    return { success: true };
                } else {
                    // Show error toast
                    toast.error("Login Gagal", {
                        description: response.message || "Login gagal, periksa kembali email dan password Anda",
                        duration: 5000,
                    });
                    return { success: false, error: response.message };
                }
            } catch (error: any) {
                // Show error toast for connection issues
                toast.error("Login Gagal", {
                    description: error.message || "Terjadi kesalahan koneksi, silakan coba lagi",
                    duration: 5000,
                });
                return { success: false, error: "Login failed" };
            } finally {
                setLoading(false);
            }
        },
        [setUser, setLoading, setError, router],
    );

    const logout = useCallback(() => {
        // Clear cookie
        clearAuthCookie();

        // Clear store
        clearAuth();

        router.push("/login");
    }, [clearAuth, router]);

    const verifyEmail = useCallback(
        async (token: string) => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(CONFIG.API.baseURL.auth + `/verify-email/${token}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    const result = await response.json();
                    toast.success("Email Berhasil Diverifikasi", {
                        description: result.message || "Anda sudah bisa login.",
                        duration: 3000,
                    });

                    // Redirect to login page after successful verification with 2-second delay
                    setTimeout(() => {
                        router.push("/login");
                    }, 2000);

                    return { success: true };
                } else {
                    const error = await response.json();
                    toast.error("Verifikasi Gagal", {
                        description: error.message || "Token tidak valid atau telah kadaluarsa.",
                        duration: 5000,
                    });
                    return { success: false, error: error.message };
                }
            } catch (error: any) {
                toast.error("Terjadi Kesalahan", {
                    description: error.message || "Silakan coba lagi.",
                    duration: 5000,
                });
                return { success: false, error: "Verification failed" };
            } finally {
                setLoading(false);
            }
        },
        [setLoading, setError, router],
    );

    const register = useCallback(
        async (data: RegisterFormValues, agreedToPolicy: boolean) => {
            if (!agreedToPolicy) {
                toast.error("Persyaratan Diperlukan", {
                    description: "Anda harus menyetujui Kebijakan Privasi untuk melanjutkan.",
                    duration: 3000,
                });
                return { success: false };
            }

            setLoading(true);
            setError(null);

            try {
                const payload = {
                    email: data.email,
                    npm: data.npm,
                    name: data.name,
                    department: data.department,
                    classYear: data.classYear,
                    password: data.password,
                };

                const res = await fetch(CONFIG.API.baseURL.auth + `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result?.message || "Registrasi gagal");
                }

                toast.success("Registrasi Berhasil", {
                    description: "Silakan cek email Anda untuk verifikasi akun.",
                    duration: 5000,
                });

                // Navigate to login page after successful registration
                router.push("/login");

                return { success: true };
            } catch (error: any) {
                console.log("error:", error);
                toast.error("Terjadi Kesalahan", {
                    description: error.message,
                });
                return { success: false, error: error.message };
            } finally {
                setLoading(false);
            }
        },
        [setLoading, setError, router],
    );

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        verifyEmail,
        register,
        clearError: () => setError(null),
    };
};
