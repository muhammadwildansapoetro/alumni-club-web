"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

const formSchema = z.object({
    email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
});

type FormType = z.infer<typeof formSchema>;

export default function LoginClient() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore();

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const redirect = searchParams.get("redirect") || "/dashboard";
            router.push(redirect);
        }
    }, [isAuthenticated, router, searchParams]);

    // Show error toast when error occurs
    useEffect(() => {
        if (error) {
            toast.error("Login Gagal", {
                description: error,
                duration: 5000,
            });
        }
    }, [error]);

    const handleLogin = async (values: FormType) => {
        clearError();

        try {
            await login(values.email, values.password);
            toast.success("Login Berhasil!", {
                description: "Selamat datang kembali",
                duration: 3000,
            });
        } catch {
            // Error is handled by the store and displayed via toast
        }
    };

    return (
        <div className="relative min-h-screen w-full">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/image/ftip-unpad.jpg')" }} />
            <div className="absolute inset-0 backdrop-blur-xs" />
            <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
                <Card className="w-md gap-3 rounded-xl border bg-white shadow-xl">
                    <CardHeader>
                        <div className="flex w-full items-center justify-center gap-3">
                            <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={50} height={50} />
                            <h1 className="text-xl font-bold">FTIP Unpad Alumni Club</h1>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit((values) => handleLogin(values))} className="space-y-3">
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

                                <Button type="submit" disabled={isLoading || form.formState.isSubmitting} className="mt-3 w-full">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Memproses...
                                        </>
                                    ) : (
                                        "Masuk"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <p className="text-center text-xs font-medium">
                            Belum memiliki akun? Silakan{" "}
                            <Link href="/register" className="text-primary font-bold hover:underline">
                                Daftar
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
