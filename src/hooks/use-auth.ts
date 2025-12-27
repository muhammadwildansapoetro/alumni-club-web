import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { LoginRequest } from "@/types/auth";
import { api } from "@/lib/axios";

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
    const { user, isLoading, setUser, setLoading } = useAuthStore();

    const login = useCallback(
        async (data: LoginRequest) => {
            setLoading(true);

            try {
                const response = await api.post("/auth/login", data);

                toast.success("Log in Berhasil", {
                    description: "Selamat datang kembali!",
                    duration: 3000,
                });

                setUser(response.data.user);
                router.push("/dashboard");

                return { success: true };
            } catch (error: any) {
                toast.error("Log in Gagal", {
                    description: error.response?.data?.message || "Terjadi kesalahan koneksi, silakan coba lagi",
                    duration: 5000,
                });

                return { success: false };
            } finally {
                setLoading(false);
            }
        },
        [setUser, setLoading, router],
    );

    const logout = useCallback(async () => {
        try {
            await api.post("/auth/logout");

            toast.success("Log out Berhasil", {
                description: "Anda telah keluar dari akun.",
                duration: 3000,
            });
        } catch (error: any) {
            toast.error("Terjadi Kesalahan", {
                description: error.response?.data?.message || "Log out gagal, silakan coba lagi.",
                duration: 5000,
            });
        } finally {
            router.push("/login");
        }
    }, [router]);

    const verifyEmail = useCallback(
        async (token: string) => {
            setLoading(true);

            try {
                const response = await api.get(`/auth/verify-email/${token}`);

                toast.success("Email Berhasil Diverifikasi", {
                    description: response.data.message || "Anda sudah bisa log in.",
                    duration: 3000,
                });

                setTimeout(() => router.push("/login"), 1000);

                return { success: true };
            } catch (error: any) {
                toast.error("Terjadi Kesalahan", {
                    description: error.response?.data?.message || "Silakan coba lagi.",
                    duration: 5000,
                });

                return { success: false };
            } finally {
                setLoading(false);
            }
        },
        [setLoading, router],
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

            try {
                const payload = {
                    email: data.email,
                    npm: data.npm,
                    name: data.name,
                    department: data.department,
                    classYear: data.classYear,
                    password: data.password,
                };

                await api.post("/auth/register", payload);

                toast.success("Registrasi Berhasil", {
                    description: "Silakan cek email Anda untuk verifikasi akun.",
                    duration: 5000,
                });

                router.push("/login");

                return { success: true };
            } catch (error: any) {
                toast.error("Terjadi Kesalahan", {
                    description: error.response?.data?.message || "Registrasi gagal",
                });

                return { success: false };
            } finally {
                setLoading(false);
            }
        },
        [setLoading, router],
    );

    return {
        user,
        isLoading,
        login,
        logout,
        verifyEmail,
        register,
    };
};
