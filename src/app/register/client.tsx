"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ReactSelect from "@/components/ui/react-select";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { BarChart2Icon, BriefcaseIcon, EyeIcon, EyeOffIcon, HeartHandshakeIcon, Loader2, StoreIcon, UserCheckIcon, UsersIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { z } from "zod";
import { api, handleApiError, isRateLimitError } from "@/lib/api-wrapper";

const departmentOptions = [
    { value: "TEP", label: "Teknik Pertanian (TEP)" },
    { value: "TPN", label: "Teknologi Pangan (TPN)" },
    { value: "TIN", label: "Teknologi Industri Pertanian (TIN)" },
];

// Department-specific max year mapping
const departmentMaxYears = {
    TEP: 1983,
    TPN: 1996,
    TIN: 2013,
};

const currentYear = new Date().getFullYear();
const overallMaxYear = currentYear - 3;

const formSchema = z.object({
    email: z.email("Email tidak valid").min(1, "Email harus diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    name: z.string().min(1, "Nama harus diisi"),
    department: z.enum(["TEP", "TPN", "TIN"], {
        message: "Jurusan harus salah satu dari: TEP, TPN, atau TIN",
    }),
    classYear: z
        .number("Tahun angkatan harus berupa angka")
        .int("Tahun angkatan harus berupa angka bulat")
        .min(1983, "Tahun angkatan tidak valid")
        .max(overallMaxYear, `Tahun angkatan tidak boleh melebihi ${overallMaxYear}`),
});

type FormType = z.infer<typeof formSchema>;

// Function to generate class year options based on department
const generateClassYearOptions = (department: string | undefined) => {
    if (!department) return [];

    const minYear = departmentMaxYears[department as keyof typeof departmentMaxYears];
    const effectiveMaxYear = overallMaxYear;

    return Array.from({ length: effectiveMaxYear - minYear + 1 }, (_, i) => {
        const year = minYear + i;
        return { value: year, label: year.toString() };
    });
};

export default function RegisterClient() {
    const [showPassword, setShowPassword] = useState(false);
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const router = useRouter();
    const { isLoading, error, clearError } = useAuthStore();

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            name: "",
            department: undefined,
            classYear: undefined,
        },
    });

    const selectedDepartment = useWatch({ control: form.control, name: "department" });

    // Show error toast when error occurs
    useEffect(() => {
        if (error) {
            toast.error("Registrasi Gagal", {
                description: error,
                duration: 5000,
            });
        }
    }, [error]);

    const handleRegister = async (values: FormType) => {
        clearError();

        // Prepare registration data
        const requestData = {
            email: values.email,
            password: values.password,
            name: values.name,
            department: values.department,
            classYear: values.classYear,
        };

        try {
            await api.auth.register(requestData);

            toast.success("Registrasi Berhasil!", {
                description: "Selamat bergabung dengan FTIP Unpad Alumni Club.",
                duration: 3000,
            });

            // Redirect to login page after successful registration
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error: any) {
            const errorMessage = handleApiError(error);

            if (isRateLimitError(error)) {
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
        }
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

                    {/* FORM Without Card */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((values) => handleRegister(values))} className="space-y-4">
                            {/* NAME */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Lengkap</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Masukkan nama lengkap" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* EMAIL */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Masukkan email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* PASSWORD */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Masukkan password"
                                                    className="pr-10"
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* SELECT JURUSAN */}
                            <Controller
                                name="department"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <ReactSelect
                                        {...field}
                                        label="Jurusan"
                                        options={departmentOptions}
                                        placeholder="Pilih jurusan"
                                        instanceId="department-select"
                                        isSearchable={false}
                                        value={departmentOptions.find((opt) => opt.value === field.value)}
                                        onChange={(opt: any) => {
                                            field.onChange(opt?.value);
                                            form.setValue("classYear", null as any);
                                        }}
                                        fieldState={fieldState}
                                    />
                                )}
                            />

                            {/* SELECT ANGKATAN */}
                            <Controller
                                name="classYear"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    const classYearOptions = generateClassYearOptions(selectedDepartment);
                                    const disabled = !selectedDepartment;

                                    return (
                                        <ReactSelect
                                            {...field}
                                            label="Tahun Angkatan"
                                            options={classYearOptions}
                                            placeholder={disabled ? "Pilih jurusan terlebih dahulu" : "Pilih tahun angkatan"}
                                            instanceId="classyear-select"
                                            isDisabled={disabled}
                                            value={classYearOptions.find((opt) => opt.value === field.value)}
                                            onChange={(opt: any) => field.onChange(opt?.value)}
                                            fieldState={fieldState}
                                        />
                                    );
                                }}
                            />

                            {/* PRIVACY POLICY CHECKBOX */}
                            <div className="flex items-start space-x-2 pt-3">
                                <Checkbox
                                    id="privacy-policy"
                                    checked={agreedToPolicy}
                                    onCheckedChange={setAgreedToPolicy}
                                    className="hover:cursor-pointer"
                                />
                                <label
                                    htmlFor="privacy-policy"
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
                            <Button type="submit" disabled={isLoading || form.formState.isSubmitting || !agreedToPolicy} className="w-full">
                                {isLoading ? (
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

                <p className="text-muted-foreground absolute bottom-2 text-xs">Dikelola oleh Pengurus IKA FTIP Unpad 2025-2029</p>
            </div>
        </div>
    );
}
