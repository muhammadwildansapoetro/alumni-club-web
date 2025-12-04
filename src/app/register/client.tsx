"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import ReactSelect from "@/components/ui/react-select";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
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

const currentYear = new Date().getFullYear();
const maxYear = currentYear - 3;
const classYearOptions = Array.from({ length: maxYear - 1957 + 1 }, (_, i) => {
    const year = 1957 + i;
    return { value: year, label: year.toString() };
});

const formSchema = z.object({
    email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    name: z.string().min(1, "Nama harus diisi"),
    department: z.enum(["TEP", "TPN", "TIN"], {
        message: "Jurusan harus salah satu dari: TEP, TPN, atau TIN",
    }),
    classYear: z
        .number()
        .int("Tahun angkatan harus berupa angka bulat")
        .min(1957, "Tahun angkatan tidak valid")
        .max(maxYear, `Tahun angkatan tidak boleh melebihi ${maxYear}`),
});

type FormType = z.infer<typeof formSchema>;

export default function RegisterClient() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { isLoading, error, clearError } = useAuthStore();

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            name: "",
            department: undefined,
            classYear: undefined,
        },
    });

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
        <>
            <div className="relative min-h-screen w-full">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/image/ftip-unpad.jpg')" }} />
                <div className="absolute inset-0 backdrop-blur-xs" />
                <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
                    <Card className="w-md gap-3 rounded-xl border bg-white shadow-xl">
                        <CardHeader>
                            <div className="flex w-full items-center gap-3">
                                <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={50} height={50} />
                                <h1 className="text-xl font-bold">FTIP Unpad Alumni Club</h1>
                            </div>
                            <h1 className="text-xl font-bold">Daftar Akun</h1>
                        </CardHeader>

                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit((values) => handleRegister(values))} className="space-y-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nama Lengkap</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="text" placeholder="Masukkan nama lengkap" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="email" placeholder="Masukkan email" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                {...field}
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="Masukkan password"
                                                                className="pr-10"
                                                            />

                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:cursor-pointer hover:text-gray-700"
                                                            >
                                                                {showPassword ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />

                                    <Controller
                                        name="department"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <ReactSelect
                                                {...field}
                                                name="department"
                                                label="Jurusan"
                                                options={departmentOptions}
                                                placeholder="Pilih jurusan"
                                                isSearchable={false}
                                                instanceId="department-select"
                                                value={departmentOptions.find((option) => option.value === field.value)}
                                                onChange={(selectedOption: any) => field.onChange(selectedOption?.value)}
                                                fieldState={fieldState}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="classYear"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <ReactSelect
                                                {...field}
                                                name="classYear"
                                                label="Tahun Angkatan"
                                                options={classYearOptions}
                                                placeholder="Pilih tahun angkatan"
                                                isSearchable={true}
                                                instanceId="classyear-select"
                                                value={classYearOptions.find((option) => option.value === field.value)}
                                                onChange={(selectedOption: any) => field.onChange(selectedOption?.value)}
                                                fieldState={fieldState}
                                            />
                                        )}
                                    />

                                    <Button type="submit" disabled={isLoading || form.formState.isSubmitting} className="mt-3 w-full">
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
                        </CardContent>

                        <CardFooter className="flex flex-col gap-3">
                            <p className="text-center text-xs font-medium">
                                Sudah memiliki akun? Silakan{" "}
                                <Link href="/login" className="text-primary font-bold hover:underline">
                                    Masuk
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}
