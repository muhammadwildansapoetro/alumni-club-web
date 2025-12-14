"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import ReactSelect from "@/components/ui/react-select";
import { signInWithGoogle, decodeGoogleToken } from "@/lib/google-signin";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { BarChart2Icon, BriefcaseIcon, HeartHandshakeIcon, Loader2, StoreIcon, UserCheckIcon, UsersIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";

const departmentOptions = [
    { value: "TEP", label: "Teknik Pertanian (TEP)" },
    { value: "TPN", label: "Teknologi Pangan (TPN)" },
    { value: "TIN", label: "Teknologi Industri Pertanian (TIN)" },
];

const currentYear = new Date().getFullYear();
const maxYear = currentYear - 3;
const minYear = 1959;

// Generate class year options
const classYearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
    const year = maxYear - i;
    return { value: year, label: year.toString() };
});

const formSchema = z.object({
    email: z.string().min(1, "Email harus diisi").email("Email tidak valid"),
    name: z.string().min(1, "Nama harus diisi"),
    department: z.enum(["TEP", "TPN", "TIN"], {
        message: "Jurusan harus salah satu dari: TEP, TPN, atau TIN",
    }),
    classYear: z
        .number("Tahun angkatan harus berupa angka")
        .int("Tahun angkatan harus berupa angka bulat")
        .min(minYear, `Tahun angkatan tidak boleh kurang dari ${minYear}`)
        .max(maxYear, `Tahun angkatan tidak boleh melebihi ${maxYear}`),
});

type FormType = z.infer<typeof formSchema>;

export default function RegisterClient() {
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);
    const [googleToken, setGoogleToken] = useState<string | null>(null);
    const router = useRouter();
    const { registerWithGoogle, error, clearError } = useAuthStore();

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            name: "",
            department: undefined,
            classYear: undefined,
        },
    });

    // Show error toast when error occurs from auth store (avoid duplicate toasts)
    useEffect(() => {
        if (error && !googleLoading) {
            // Only show toast if it's not a database error (already handled in auth store)
            if (!error.includes("The column") && !error.includes("does not exist")) {
                toast.error("Registrasi Gagal", {
                    description: error,
                    duration: 5000,
                });
            }
        }
    }, [error, googleLoading]);

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        clearError();

        try {
            // Get Google ID token
            const credential = await signInWithGoogle({ text: "signup_with" });

            // Decode token to get user data
            const decodedToken = decodeGoogleToken(credential);

            // Set form values with Google user data
            form.setValue("email", decodedToken.email);
            form.setValue("name", decodedToken.name);

            // Store token for registration
            setGoogleToken(credential);

            // Mark as authenticated
            setIsGoogleAuthenticated(true);

            toast.success("Google berhasil terhubung!", {
                description: "Silakan pilih jurusan dan tahun angkatan Anda.",
                duration: 3000,
            });
        } catch (error: any) {
            console.error("Google Sign-In error:", error);
            // Clear any existing toasts before showing new one
            toast.dismiss();

            // Show single, clear error message
            let errorMessage = "Terjadi kesalahan saat menghubungkan akun Google";

            // Check for specific error types
            if (error.message?.includes("google-auth")) {
                errorMessage = "Format token Google tidak valid. Silakan coba lagi.";
            } else if (error.message?.includes("timeout")) {
                errorMessage = "Google Sign-In timeout. Silakan coba lagi.";
            } else if (error.message?.includes("cancelled")) {
                errorMessage = "Google Sign-In dibatalkan. Silakan coba lagi.";
            } else if (error.message) {
                errorMessage = error.message;
            }

            toast.error("Google Sign-In Gagal", {
                description: errorMessage,
                duration: 5000,
            });
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleRegister = async (values: any) => {
        if (!isGoogleAuthenticated || !googleToken) return;

        setGoogleLoading(true);
        clearError();

        try {
            // Register with form values and Google token
            await registerWithGoogle(googleToken, values.department, values.classYear);

            toast.success("Registrasi Berhasil!", {
                description: `Selamat bergabung, ${values.name}!`,
                duration: 3000,
            });

            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (error: any) {
            console.error("Registration error:", error);
            // Don't show toast here - let the auth store handle it
            // This prevents duplicate error toasts
        } finally {
            setGoogleLoading(false);
        }
    };

    const resetGoogleAuth = () => {
        setIsGoogleAuthenticated(false);
        setGoogleToken(null);
        form.reset();
    };

    return (
        <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
            {/* LEFT SIDE — Welcoming Message */}
            <div className="to-primary-100 from-secondary-100 relative hidden items-center justify-center bg-linear-to-b p-10 lg:flex">
                {/* Text Content with Glass Effect */}
                <div className="max-w-md space-y-5">
                    <div className="-space-y-1">
                        <h1 className="text-3xl leading-snug font-bold">Mulai Akses Manfaat Eksklusif</h1>
                        <h1 className="text-primary-gradient text-3xl font-bold">
                            <span className="text-black">di</span> FTIP Unpad Alumni Club
                        </h1>
                    </div>

                    <p className="text-sm md:text-base">
                        Dapatkan berbagai manfaat eksklusif dan jadilah bagian dari komunitas alumni FTIP Unpad yang saling mendukung.
                    </p>

                    <ul className="space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                                <UserCheckIcon className="h-5 w-5 stroke-[1.75]" />
                            </span>
                            <span>
                                Buat <strong>profil alumni profesional</strong>.
                            </span>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                                <BriefcaseIcon className="h-5 w-5 stroke-[1.75]" />
                            </span>
                            <span>
                                <strong>Akses & bagikan lowongan kerja</strong> alumni.
                            </span>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                                <StoreIcon className="h-5 w-5 stroke-[1.75]" />
                            </span>
                            <span>
                                <strong>Promosikan bisnis</strong> alumni.
                            </span>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                                <UsersIcon className="h-5 w-5 stroke-[1.75]" />
                            </span>
                            <span>
                                <strong>Perluas jejaring</strong> lintas jurusan & industri.
                            </span>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                                <BarChart2Icon className="h-5 w-5 stroke-[1.75]" />
                            </span>
                            <span>
                                Lihat <strong>statistik karier alumni</strong>.
                            </span>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                                <HeartHandshakeIcon className="h-5 w-5 stroke-[1.75]" />
                            </span>
                            <span>
                                <strong>Berkontribusi</strong> membangun komunitas alumni.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* RIGHT SIDE — Registration Form */}
            <div className="from-secondary-100 to-primary-100 relative flex items-center justify-center bg-linear-to-b lg:bg-white lg:bg-none">
                <Card className="w-full max-w-md space-y-3 border bg-white px-5 py-6 shadow-md lg:border-none lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none">
                    <CardContent className="space-y-3 p-0">
                        {/* Logo + Heading */}
                        <div className="flex flex-col items-center gap-2">
                            <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={70} height={70} />
                            <div className="text-center lg:text-left">
                                <h1 className="text-xl font-bold lg:text-3xl">Daftar Akun</h1>
                                <h1 className="text-primary-gradient text-xl font-bold lg:hidden">FTIP Unpad Alumni Club</h1>
                            </div>
                        </div>

                        {/* Google Section - Show when Google user is authenticated */}
                        {isGoogleAuthenticated ? (
                            <div className="space-y-3">
                                {/* Google User Info */}
                                <div className="bg-secondary-50 border-secondary-300 rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Image src="/logo/google.svg" alt="Google Logo" width={25} height={25} />

                                            <div>
                                                <p className="font-medium text-gray-900">{form.watch("name") || "Google User"}</p>
                                                <p className="text-sm text-gray-600">{form.watch("email") || "user@gmail.com"}</p>
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={resetGoogleAuth}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            Ganti akun
                                        </Button>
                                    </div>
                                </div>

                                {/* Google Form */}
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-3">
                                        <p className="text-sm text-gray-600">Lengkapi data berikut untuk menyelesaikan registrasi:</p>

                                        {/* SELECT JURUSAN */}
                                        <FormField
                                            name="department"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-semibold">Jurusan</FormLabel>
                                                    <FormControl>
                                                        <ReactSelect
                                                            {...field}
                                                            options={departmentOptions}
                                                            placeholder="Pilih jurusan"
                                                            instanceId="google-department-select"
                                                            isSearchable={false}
                                                            value={departmentOptions.find((opt) => opt.value === field.value)}
                                                            onChange={(opt: any) => {
                                                                field.onChange(opt?.value);
                                                                form.setValue("classYear", null as any);
                                                            }}
                                                            fieldState={fieldState}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* SELECT ANGKATAN */}
                                        <FormField
                                            name="classYear"
                                            control={form.control}
                                            render={({ field, fieldState }) => {
                                                const selectedDepartment = form.watch("department");
                                                const disabled = !selectedDepartment;

                                                return (
                                                    <FormItem>
                                                        <FormLabel>Tahun Angkatan</FormLabel>
                                                        <FormControl>
                                                            <ReactSelect
                                                                {...field}
                                                                options={classYearOptions}
                                                                placeholder={disabled ? "Pilih jurusan terlebih dahulu" : "Pilih tahun angkatan"}
                                                                instanceId="google-classyear-select"
                                                                isDisabled={disabled}
                                                                value={classYearOptions.find((opt) => opt.value === field.value)}
                                                                onChange={(opt: any) => field.onChange(opt?.value)}
                                                                fieldState={fieldState}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                );
                                            }}
                                        />

                                        {/* PRIVACY POLICY CHECKBOX */}
                                        <div className="flex items-start space-x-2 pt-3">
                                            <Checkbox
                                                id="google-privacy-policy"
                                                checked={agreedToPolicy}
                                                onCheckedChange={setAgreedToPolicy}
                                                className="hover:cursor-pointer"
                                            />
                                            <label
                                                htmlFor="google-privacy-policy"
                                                className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Saya telah membaca dan menyetujui{" "}
                                                <Link
                                                    href="/privacy-policy?from=register"
                                                    className="text-primary/80 hover:text-primary underline underline-offset-4"
                                                    target="_blank"
                                                >
                                                    Kebijakan Privasi
                                                </Link>
                                            </label>
                                        </div>

                                        {/* SUBMIT BUTTON */}
                                        <Button
                                            type="submit"
                                            disabled={googleLoading || form.formState.isSubmitting || !agreedToPolicy}
                                            className="w-full"
                                        >
                                            {googleLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Memproses...
                                                </>
                                            ) : (
                                                "Daftar"
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        ) : (
                            <div className="text-center">
                                {/* Google Sign In Button */}
                                <Button variant="outline" size="lg" onClick={handleGoogleSignIn} disabled={googleLoading}>
                                    {googleLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <Image src="/logo/google.svg" alt="Google Logo" width={20} height={20} className="mr-2" />
                                            Daftar dengan Google
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}

                        <p className="text-muted-foreground text-center text-xs">
                            Sudah memiliki akun?
                            <Link href="/login" className="text-primary/90 hover:text-primary ml-1 font-semibold underline hover:underline-offset-2">
                                Masuk
                            </Link>
                        </p>
                    </CardContent>
                </Card>

                <p className="text-muted-foreground absolute bottom-2 text-xs">Dikelola oleh Pengurus IKA FTIP Unpad 2025-2029</p>
            </div>
        </div>
    );
}
