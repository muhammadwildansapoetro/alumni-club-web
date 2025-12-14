import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "@/types/auth";
import { googleAuthService } from "@/services/google-auth.service";
import { toast } from "sonner";

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // GOOGLE LOGIN
            loginWithGoogle: async (token: string) => {
                set({ isLoading: true, error: null });

                try {
                    const data = await googleAuthService.signInWithGoogle({ token });
                    console.log("Login successful:", { user: data.user?.email });
                    console.log("Token received:", {
                        hasToken: !!data.token,
                        tokenLength: data.token?.length,
                        tokenStart: data.token ? data.token.substring(0, 20) + "..." : "None",
                        tokenFormat: data.token ? (data.token.split(".").length === 3 ? "JWT" : "Other") : "None"
                    });

                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });

                    // Set auth cookie for server-side middleware
                    if (typeof window !== 'undefined') {
                        document.cookie = `auth-token=${data.token}; path=/; max-age=3600; same-site=lax`;
                    }

                    toast.success("Login Berhasil!", {
                        description: "Selamat datang kembali",
                        duration: 3000,
                    });
                } catch (err: unknown) {
                    let errorMessage = "Google login gagal";

                    // Enhanced error handling to extract detailed API errors
                    if (err && typeof err === 'object' && 'message' in err) {
                        errorMessage = (err as any).message;
                    } else if (err instanceof Error) {
                        errorMessage = err.message;
                    }

                    set({
                        error: errorMessage,
                        isLoading: false,
                    });

                    // Handle specific error cases based on API documentation
                    if (errorMessage.includes("belum terdaftar")) {
                        toast.error("Akun Belum Terdaftar", {
                            description: "Email Anda belum terdaftar. Silakan daftar terlebih dahulu.",
                            duration: 5000,
                        });
                        // Redirect to register page
                        window.location.href = "/register";
                    } else if (errorMessage.includes("metode login biasa")) {
                        toast.error("Metode Login Tidak Sesuai", {
                            description: "Email sudah terdaftar dengan metode login biasa. Silakan login dengan password.",
                            duration: 5000,
                        });
                    } else if (errorMessage.includes("The column") && errorMessage.includes("does not exist")) {
                        // Handle database/Prisma errors with user-friendly message
                        toast.error("Kesalahan Database", {
                            description: "Terjadi kesalahan pada sistem database. Silakan coba lagi nanti atau hubungi administrator.",
                            duration: 5000,
                        });
                    } else {
                        toast.error("Login Google Gagal", {
                            description: errorMessage,
                            duration: 5000,
                        });
                    }
                    throw err;
                }
            },

            // GOOGLE REGISTER
            registerWithGoogle: async (token: string, department: string, classYear: number) => {
                set({ isLoading: true, error: null });

                try {
                    const data = await googleAuthService.registerWithGoogle({ token, department, classYear });
                    console.log("Registration successful:", { user: data.data?.user?.email });

                    // For registration, the response structure is different
                    // The user data is nested in data.data, and token is in data.data.token
                  set({
                        user: {
                            ...data.data.user,
                            profile: {
                                id: data.data.alumniProfile.id,
                                fullName: data.data.alumniProfile.fullName,
                                department: data.data.alumniProfile.department,
                                classYear: data.data.alumniProfile.classYear,
                                city: null,
                                industry: null,
                                employmentLevel: null,
                                jobTitle: null,
                                companyName: null
                            }
                        },
                        token: data.data.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });

                    // Set auth cookie for server-side middleware
                    if (typeof window !== 'undefined') {
                        document.cookie = `auth-token=${data.data.token}; path=/; max-age=3600; same-site=lax`;
                    }

                    toast.success("Registrasi Berhasil!", {
                        description: data.message,
                        duration: 3000,
                    });
                } catch (err: unknown) {
                    let errorMessage = "Registrasi Google gagal";

                    // Enhanced error handling to extract detailed API errors
                    if (err && typeof err === 'object' && 'message' in err) {
                        errorMessage = (err as any).message;
                    } else if (err instanceof Error) {
                        errorMessage = err.message;
                    }

                    set({
                        error: errorMessage,
                        isLoading: false,
                    });

                    // Handle specific error cases based on API documentation
                    if (errorMessage.includes("sudah terdaftar dengan metode login biasa")) {
                        toast.error("Email Sudah Terdaftar", {
                            description: "Email sudah terdaftar dengan metode login biasa. Silakan login dengan password.",
                            duration: 5000,
                        });
                    } else if (errorMessage.includes("Akun Google sudah terdaftar")) {
                        toast.error("Akun Google Sudah Terdaftar", {
                            description: "Akun Google sudah terdaftar. Silakan login.",
                            duration: 5000,
                        });
                        // Redirect to login page
                        window.location.href = "/login";
                    } else if (errorMessage.includes("The column") && errorMessage.includes("does not exist")) {
                        // Handle database/Prisma errors with user-friendly message
                        toast.error("Kesalahan Database", {
                            description: "Terjadi kesalahan pada sistem database. Silakan coba lagi nanti atau hubungi administrator.",
                            duration: 5000,
                        });
                    } else {
                        // Show the actual error message for other cases
                        toast.error("Registrasi Google Gagal", {
                            description: errorMessage,
                            duration: 5000,
                        });
                    }
                    throw err;
                }
            },

            // LOGOUT
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });

                // Clear auth cookie
                if (typeof window !== 'undefined') {
                    document.cookie = 'auth-token=; path=/; max-age=0; same-site=lax';
                }
            },

            // CHECK AUTH ON REFRESH
            checkAuth: async () => {
                const token = get().token;
                if (!token) {
                    set({ isAuthenticated: false, user: null });
                    return;
                }

                try {
                    // Optionally call backend /me endpoint
                    set({ isAuthenticated: true });
                } catch {
                    set({ user: null, token: null, isAuthenticated: false });
                }
            },

            // REFRESH TOKEN (optional)
            refreshToken: async () => {
                // CALL /auth/refresh IF YOU IMPLEMENT IT
            },

            // GET TOKEN (for API calls)
            getToken: () => {
                return get().token;
            },

            clearError: () => set({ error: null }),
        }),
      {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
);
