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
    email: z.email("Alamat email tidak valid"),
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
            email: "",
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
        <div className="min-h-screen w-full bg-linear-to-br from-green-50 via-white to-red-50">
            <div className="flex min-h-screen w-full items-center justify-center">
                <Card className="w-md">
                    <CardHeader>
                        <div className="flex w-full items-center justify-between gap-3">
                            <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={50} height={50} />
                            <h1 className="text-xl font-bold">FTIP Unpad Alumni Club</h1>
                            <Image src="/logo/logo-ftip-unpad.png" alt="Logo" width={45} height={45} />
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
                                                <Input {...field} placeholder="Masukkan email" />
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
                        <p className="text-center text-xs">
                            Belum memiliki akun?{" "}
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
