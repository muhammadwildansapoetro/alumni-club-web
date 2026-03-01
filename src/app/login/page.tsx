"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, EyeOffIcon, Loader2, LogInIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const photoCards = [
    {
        src: "/photo/green.jpg",
        tagline: "Build Connections",
    },
    {
        src: "/photo/red.jpg",
        tagline: "Collaborate to Grow",
    },
    {
        src: "/photo/orange.jpg",
        tagline: "Build Impact",
    },
];

const loginSchema = z.object({
    email: z.email({ message: "Email tidak valid" }),
    password: z.string().min(1, "Password harus diisi"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginClient() {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_isTransitioning, setIsTransitioning] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { user, login, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace("/dashboard");
        }
    }, [user, router]);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
        defaultValues: {
            email: "",
            password: "",
        },
    });

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
                        <h1 className="text-2xl font-semibold lg:text-3xl">Login Dashboard</h1>
                        <h1 className="text-primary-gradient text-3xl font-bold lg:text-4xl">FTIP Unpad Alumni Club</h1>
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
                            <form onSubmit={form.handleSubmit((data) => login(data, form.setError))} className="space-y-3">
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
                                                <div className="relative">
                                                    <FormControl>
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Masukkan password"
                                                            {...field}
                                                            className="pr-10"
                                                        />
                                                    </FormControl>

                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword((v) => !v)}
                                                        className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
                                                        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                                                    >
                                                        {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" variant={"default"} className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <LogInIcon className="h-4 w-4" />
                                            Log in
                                        </>
                                    )}
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
                                    <Loader2 className="h-4 w-4 animate-spin" />
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
                        {photoCards.map((item, index) => (
                            <div
                                key={item.src}
                                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                                    index === currentPhotoIndex ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                {/* Image */}
                                <Image
                                    src={item.src}
                                    alt={item.tagline}
                                    fill
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    className="object-cover"
                                    priority={index === 0}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                                {/* Centered Text */}
                                <div className="absolute inset-0 flex justify-center">
                                    <h2 className="absolute bottom-1/10 -translate-y-1/2 text-center text-3xl font-bold tracking-wide text-white drop-shadow-lg lg:text-4xl">
                                        {item.tagline}
                                    </h2>
                                </div>
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
