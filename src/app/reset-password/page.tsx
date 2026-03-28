"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EyeIcon, EyeOffIcon, Loader2Icon, KeyRoundIcon } from "lucide-react";
import { toast } from "sonner";
import { resetPassword } from "@/services/auth.client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";

const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Kata sandi minimal 8 karakter")
            .regex(/[A-Z]/, "Wajib mengandung huruf kapital")
            .regex(/[a-z]/, "Wajib mengandung huruf kecil")
            .regex(/[0-9]/, "Wajib mengandung angka"),
        confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Konfirmasi kata sandi tidak cocok",
        path: ["confirmPassword"],
    });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: ResetPasswordFormValues) => {
        if (!token) {
            toast.error("Token tidak valid. Silakan minta link reset kata sandi baru.");
            return;
        }

        try {
            await resetPassword(token, values.password);
            toast.success("Password berhasil direset. Silakan login dengan password baru Anda.", { duration: 5000 });
            form.reset();
            setTimeout(() => {
                router.push("/signin");
            }, 2000);
        } catch (error: any) {
            const message = error?.response?.data?.message ?? "Terjadi kesalahan. Silakan coba lagi.";
            toast.error(message);
        }
    };

    if (!token) {
        return (
            <div className="flex w-full flex-col items-center justify-center p-5 lg:p-10">
                <div className="flex w-full flex-col items-center justify-center gap-4 text-center sm:w-fit">
                    <h1 className="text-xl font-semibold text-red-600 lg:text-2xl">Link Tidak Valid</h1>
                    <p className="text-muted-foreground">Token reset password tidak ditemukan. Silakan minta link baru melalui halaman login.</p>
                    <Button asChild className="mt-4 rounded-full">
                        <Link href="/signin">Kembali ke Halaman Login</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col items-center justify-center p-5 lg:p-10">
            <div className="flex w-full flex-col items-start justify-center gap-4 sm:w-fit">
                {/* Heading */}
                <div className="w-full">
                    <h1 className="text-xl font-semibold lg:text-2xl">Reset Kata Sandi</h1>
                    <h1 className="text-primary-gradient text-2xl font-bold lg:text-3xl">Dasbor IKA FTIP Unpad</h1>
                    <p className="text-muted-foreground mt-2 text-sm">Masukkan kata sandi baru yang akan Anda gunakan.</p>
                </div>

                {/* Form */}
                <div className="mt-4 w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kata Sandi Baru</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Masukkan kata sandi baru"
                                                    {...field}
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
                                                >
                                                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Ulangi kata sandi baru"
                                                    {...field}
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
                                                >
                                                    {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-xs">
                                <li>Minimal 8 karakter</li>
                                <li>Terdapat huruf kapital</li>
                                <li>Terdapat huruf kecil</li>
                                <li>Terdapat angka</li>
                            </ul>

                            <Button disabled={form.formState.isSubmitting} className="mt-4 w-full rounded-full">
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2Icon className="h-4 w-4 animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    <>
                                        <KeyRoundIcon className="h-4 w-4" /> Reset Kata Sandi
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <Suspense
                fallback={
                    <div className="flex w-full flex-col items-center justify-center p-5">
                        <Loader2Icon className="text-primary h-8 w-8 animate-spin" />
                    </div>
                }
            >
                <ResetPasswordFormContent />
            </Suspense>
        </div>
    );
}
