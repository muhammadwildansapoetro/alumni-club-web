"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import ReactSelect from "@/components/ui/react-select";
import Image from "next/image";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon, InfoIcon, Loader2, UserPlusIcon } from "lucide-react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";

const photoCards = [
    {
        src: "/photo/green.jpg",
        tagline: "Expand Network",
    },
    {
        src: "/photo/red.jpg",
        tagline: "Job Opportunities",
    },
    {
        src: "/photo/orange.jpg",
        tagline: "Career Growth",
    },
];

const registerSchema = z
    .object({
        email: z.string().email("Email tidak valid"),
        npm: z.string().min(1, "NPM harus diisi"),
        name: z.string().min(1, "Nama harus diisi"),
        password: z
            .string()
            .min(8, "Password minimal 8 karakter")
            .regex(/[A-Z]/, "Password harus mengandung huruf besar")
            .regex(/[a-z]/, "Password harus mengandung huruf kecil")
            .regex(/[0-9]/, "Password harus mengandung angka"),
        passwordConfirmation: z.string().min(1, "Konfirmasi Password harus diisi"),
        department: z.string().min(1, "Jurusan harus dipilih"),
        classYear: z.number().min(1959, "Tahun angkatan tidak valid").max(new Date().getFullYear(), "Tahun angkatan tidak valid"),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Password tidak cocok",
        path: ["passwordConfirmation"],
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterClient() {
    const { register, isLoading } = useAuth();
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isTransitioning, setIsTransitioning] = useState(false);

    const departmentOptions = [
        { value: "TEP", label: "Teknik Pertanian (TEP)" },
        { value: "TPN", label: "Teknologi Pangan (TPN)" },
        { value: "TIN", label: "Teknologi Industri Pertanian (TIN)" },
    ];

    const currentYear = new Date().getFullYear();
    const maxYear = currentYear - 3;
    const minYear = 1959;

    const classYearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
        const year = maxYear - i;
        return { value: year, label: year.toString() };
    });

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            npm: "",
            name: "",
            department: "",
            classYear: 0,
            password: "",
            passwordConfirmation: "",
        },
    });

    const password = useWatch({ control: form.control, name: "password" });
    const passwordConfirmation = useWatch({
        control: form.control,
        name: "passwordConfirmation",
    });

    const passwordMismatchError = password && passwordConfirmation && password !== passwordConfirmation ? "Password tidak cocok" : "";

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
            {/* LEFT SIDE — Welcoming Message */}
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
                                <Image src={item.src} alt={item.tagline} fill className="object-cover" priority={index === 0} />

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

            {/* RIGHT SIDE — Registration Form */}
            <div className="flex w-full flex-col items-center justify-center p-5 lg:w-1/2">
                <div className="flex w-full flex-col justify-center gap-5 md:max-w-md lg:max-w-md xl:max-w-lg">
                    {/* Heading */}
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold lg:text-3xl">Daftar Akun</h1>
                        <h1 className="text-primary-gradient text-3xl font-bold lg:text-4xl">FTIP Unpad Alumni Club</h1>
                        <p className="text-muted-foreground pt-2 text-sm">
                            Sudah memiliki akun? Silakan{" "}
                            <Link href="/login" className="text-primary font-bold hover:underline">
                                Masuk
                            </Link>
                        </p>
                    </div>

                    <div className="w-full">
                        {/* Registration Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit((data) => register(data, agreedToPolicy))} className="w-full space-y-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Lengkap</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Masukkan nama lengkap" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
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
                                                <Input type="email" placeholder="Masukkan email" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="npm"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>NPM</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Masukkan NPM" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
                                    <FormField
                                        name="department"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <FormLabel>Jurusan</FormLabel>
                                                <FormControl>
                                                    <ReactSelect
                                                        {...field}
                                                        options={departmentOptions}
                                                        placeholder="Pilih jurusan"
                                                        instanceId="google-department-select"
                                                        isSearchable={false}
                                                        value={departmentOptions.find((opt) => opt.value === field.value) ?? ""}
                                                        onChange={(opt: any) => {
                                                            field.onChange(opt?.value);
                                                            form.setValue("classYear", null as any);
                                                        }}
                                                        fieldState={fieldState}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="classYear"
                                        control={form.control}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel>Tahun Angkatan</FormLabel>
                                                    <FormControl>
                                                        <ReactSelect
                                                            {...field}
                                                            options={classYearOptions}
                                                            placeholder="Pilih tahun angkatan"
                                                            instanceId="google-classyear-select"
                                                            value={classYearOptions.find((opt) => opt.value === field.value) ?? 0}
                                                            onChange={(opt: any) => field.onChange(opt?.value)}
                                                            fieldState={fieldState}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div>

                                <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    Password
                                                    <TooltipProvider delayDuration={150}>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <button
                                                                    type="button"
                                                                    className="text-muted-foreground hover:text-foreground"
                                                                    aria-label="Password requirements"
                                                                >
                                                                    <InfoIcon className="h-4 w-4" />
                                                                </button>
                                                            </TooltipTrigger>

                                                            <TooltipContent side="right" className="max-w-xs border bg-white">
                                                                <div className="space-y-1 text-sm">
                                                                    <ul className="text-muted-foreground list-disc pl-4">
                                                                        <li>Minimal 8 karakter</li>
                                                                        <li>Mengandung huruf besar (A–Z)</li>
                                                                        <li>Mengandung huruf kecil (a–z)</li>
                                                                        <li>Mengandung angka (0–9)</li>
                                                                    </ul>
                                                                </div>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </FormLabel>
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
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="passwordConfirmation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Konfirmasi Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Masukkan konfirmasi password" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                                {passwordMismatchError && <FormMessage className="text-xs">{passwordMismatchError}</FormMessage>}
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Privacy Policy & Submit */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center space-x-2 pt-3">
                                        <Checkbox
                                            id="google-privacy-policy"
                                            checked={agreedToPolicy}
                                            onCheckedChange={setAgreedToPolicy}
                                            className="hover:cursor-pointer"
                                        />
                                        <label
                                            htmlFor="privacy-policy"
                                            className="text-muted-foreground text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Saya telah membaca dan menyetujui{" "}
                                            <Link
                                                href="/privacy-policy?from=register"
                                                className="text-primary font-bold hover:underline"
                                                target="_blank"
                                            >
                                                Kebijakan Privasi
                                            </Link>
                                        </label>
                                    </div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={isLoading || !agreedToPolicy || !!passwordMismatchError}
                                        className="w-full"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                <UserPlusIcon className="h-4 w-4" /> Daftar
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
