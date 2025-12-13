"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import ReactSelect from "@/components/ui/react-select";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { BarChart2Icon, BriefcaseIcon, HeartHandshakeIcon, Loader2, Mail, StoreIcon, UserCheckIcon, UsersIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { googleAuthService } from "@/services/google-auth.service";
import { z } from "zod";

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
    const [googleUser, setGoogleUser] = useState<any>(null);
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

    // Show error toast when error occurs
    useEffect(() => {
        if (error) {
            toast.error("Registrasi Gagal", {
                description: error,
                duration: 5000,
            });
        }
    }, [error]);

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        clearError();

        try {
            const token = await googleAuthService.signInWithPopup();
            const decodedToken = googleAuthService.decodeGoogleToken(token);

            setGoogleUser({
                email: decodedToken.email,
                name: decodedToken.name,
                firstName: decodedToken.given_name,
                lastName: decodedToken.family_name,
            });

            // Set form values with Google user data
            form.setValue("email", decodedToken.email);
            form.setValue("name", decodedToken.name);

            toast.success("Google berhasil terhubung!", {
                description: "Silakan lengkapi data jurusan dan tahun angkatan Anda.",
                duration: 3000,
            });
        } catch (error: any) {
            console.error("Google sign-in error:", error);
            toast.error("Google Sign-In Gagal", {
                description: error.message || "Terjadi kesalahan saat menghubungkan akun Google",
                duration: 5000,
            });
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleGoogleRegister = async (values: any) => {
        if (!googleUser) return;

        setGoogleLoading(true);
        clearError();

        try {
            // Get fresh Google token
            const token = await googleAuthService.signInWithPopup();

            // Register with additional profile data
            await registerWithGoogle(token, values.department, values.classYear);

            toast.success("Registrasi Berhasil!", {
                description: `Selamat bergabung, ${googleUser.name}!`,
                duration: 3000,
            });

            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (error: any) {
            console.error("Google registration error:", error);

            let errorMessage = "Registrasi dengan Google gagal. Silakan coba lagi.";
            if (error.message.includes("not configured")) {
                errorMessage = "Google Client ID tidak dikonfigurasi. Silakan hubungi administrator.";
            } else if (error.message.includes("cancelled or not displayed")) {
                errorMessage = "Google Sign-In dibatalkan atau tidak dapat ditampilkan. Silakan coba lagi atau gunakan browser lain.";
            } else if (error.message.includes("not available")) {
                errorMessage = "Google Identity Services tidak tersedia. Periksa koneksi internet Anda.";
            } else if (error.message) {
                errorMessage = error.message;
            }

            if (error.status === 429) {
                toast.error("Terlalu Banyak Percobaan", {
                    description: errorMessage,
                    duration: 10000,
                });
            } else {
                toast.error("Registrasi Gagal", {
                    description: errorMessage,
                    duration: 5000,
                });
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    const resetGoogleAuth = () => {
        setGoogleUser(null);
        form.reset();
    };

    return (
        <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
            {/* LEFT SIDE — Welcoming Message */}
            <div className="bg-primary/10 relative hidden items-center justify-center p-10 lg:flex">
                {/* Text Content with Glass Effect */}
                <div className="max-w-md space-y-5">
                    <div className="-space-y-1">
                        <h1 className="text-3xl leading-snug font-bold">Mulai Akses Manfaat Eksklusif</h1>
                        <h1 className="from-primary bg-linear-to-r to-emerald-500 bg-clip-text text-3xl leading-snug font-bold text-transparent">
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
            <div className="relative flex items-center justify-center">
                <div className="w-full max-w-md space-y-5 px-5">
                    {/* Logo + Heading */}
                    <div className="flex flex-col gap-2">
                        <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={70} height={70} />
                        <h1 className="text-3xl font-bold">Daftar Akun</h1>
                        <p className="text-muted-foreground w-full text-xs">
                            Sudah memiliki akun?
                            <Link href="/login" className="text-primary/90 hover:text-primary ml-1 font-semibold underline hover:underline-offset-2">
                                Masuk
                            </Link>
                        </p>
                    </div>

                    {/* Google Section - Show when Google user is authenticated */}
                    {googleUser ? (
                        <div className="space-y-4">
                            {/* Google User Info */}
                            <div className="rounded-lg border bg-blue-50 p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                            <Mail className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{googleUser.name}</p>
                                            <p className="text-sm text-gray-600">{googleUser.email}</p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
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
                                <form onSubmit={form.handleSubmit(handleGoogleRegister)} className="space-y-4">
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
                                                        label="Jurusan"
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
                                                            label="Tahun Angkatan"
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
                                            "Daftar dengan Google"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    ) : (
                        <>
                            {/* Google Sign In Button */}
                            <Button type="button" variant="outline" onClick={handleGoogleSignIn} disabled={googleLoading} className="w-full">
                                {googleLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Daftar dengan Google
                                    </>
                                )}
                            </Button>

                            <p className="text-muted-foreground mt-4 text-center text-sm">Gunakan akun Google/Gmail untuk mendaftar</p>
                        </>
                    )}
                </div>

                <p className="text-muted-foreground absolute bottom-2 text-xs">Dikelola oleh Pengurus IKA FTIP Unpad 2025-2029</p>
            </div>
        </div>
    );
}
