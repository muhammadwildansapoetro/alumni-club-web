"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Loader2, LogInIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const photoCards = ["/photo/login/green.jpg", "/photo/login/red.jpg", "/photo/login/orange.jpg"];

const loginSchema = z.object({
    email: z.email({ message: "Email tidak valid" }),
    password: z.string().min(1, "Password harus diisi"),
});

type loginFormValues = z.infer<typeof loginSchema>;

export default function LoginClient() {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isTransitioning, setIsTransitioning] = useState(false);

    const form = useForm<loginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const login = async (values: loginFormValues) => {
        try {
            console.log("Login log:", values);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentPhotoIndex((prevIndex) => (prevIndex === photoCards.length - 1 ? 0 : prevIndex + 1));
                setIsTransitioning(false);
            }, 150);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Login Form */}
            <div className="flex w-full flex-col items-center justify-center p-5 lg:w-1/2 lg:p-10">
                <div className="flex w-full flex-col items-start justify-center gap-5 sm:w-fit">
                    {/* Heading */}
                    <div className="w-full">
                        <h1 className="text-xl font-semibold lg:text-3xl">Login Dashboard</h1>
                        <h1 className="text-primary-gradient text-2xl font-bold lg:text-4xl">FTIP Unpad Alumni Club</h1>
                        <p className="text-muted-foreground pt-2 text-sm">
                            Belum memiliki akun? Silakan{" "}
                            <Link href="/register" className="text-primary font-bold hover:underline">
                                Daftar
                            </Link>
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(login)} className="space-y-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Masukkan email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Masukkan password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" variant={"default"} className="w-full">
                                    <LogInIcon /> Login
                                </Button>
                            </form>
                        </Form>
                    </div>

                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-background text-muted-foreground px-2">Atau</span>
                        </div>
                    </div>

                    {/* Google Login */}
                    <div className="w-full">
                        <Button variant="outline" onClick={() => {}} className="w-full">
                            {false ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <Image src="/logo/google.svg" alt="Google Logo" width={15} height={15} className="mr-2" />
                                    Masuk dengan Google
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Side - Auto-Sliding Photo Carousel */}
            <div className="hidden w-1/2 items-center justify-center bg-white p-5 lg:flex">
                <div className="relative h-full w-full overflow-hidden rounded-xl shadow-2xl">
                    <div className="relative h-full w-full">
                        {photoCards.map((photo, index) => (
                            <div
                                key={photo}
                                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                                    index === currentPhotoIndex ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <Image
                                    src={photo}
                                    alt={`FTIP Unpad Campus - Photo ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                    {/* Optional: Dot indicators for manual navigation */}
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
                        {photoCards.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                    index === currentPhotoIndex ? "w-8 bg-white" : "bg-white/50"
                                }`}
                                onClick={() => {
                                    setIsTransitioning(true);
                                    setTimeout(() => {
                                        setCurrentPhotoIndex(index);
                                        setIsTransitioning(false);
                                    }, 150);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
