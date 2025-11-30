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
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(1, "Username harus diisi"),
    password: z.string().min(1, "Password harus diisi"),
});

type FormType = z.infer<typeof formSchema>;

export default function LoginClient() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const handleLogin = (values: FormType) => {
        try {
            console.log(values);
            router.push("/dashboard/statistic");
        } catch (error) {
            console.error(error);
            toast.error("Gagal Masuk", {
                duration: 5000,
                description: "error",
            });
        }
    };

    return (
        <div className="relative min-h-screen w-full">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/image/ftip-unpad.jpg')" }} />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-xs" />
            <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
                <Card className="w-md gap-3 rounded-xl border border-white/70 bg-white/70 shadow-xl backdrop-blur-md">
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
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nomor Telepon / Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Masukkan Nomor Telepon / Email" />
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

                                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                                    Masuk
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
