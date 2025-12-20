"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import ReactSelect from "@/components/ui/react-select";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { BarChart2Icon, BriefcaseIcon, HeartHandshakeIcon, Loader2, StoreIcon, UserCheckIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import { z } from "zod";
import { Input } from "@/components/ui/input";

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
    email: z.email("Email tidak valid"),
    name: z.string().min(1, "Nama harus diisi"),
    password: z.string().min(1, "Password harus diisi"),
    department: z.string().min(1, "Jurusan harus dipilih"),
    classYear: z.number().min(1, "Tahun angkatan harus dipilih"),
});

type FormType = z.infer<typeof formSchema>;

export default function RegisterClient() {
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            name: "",
            password: "",
            department: "",
            classYear: 0,
        },
    });

    return (
        <div className="flex min-h-screen w-full">
            {/* LEFT SIDE — Welcoming Message */}
            <div className="hidden w-2/5 items-center justify-center p-5 lg:flex">
                <div className="bg-primary-gradient relative h-full w-full overflow-hidden rounded-xl text-white shadow-2xl lg:p-5 xl:p-10">
                    <div className="flex h-full flex-col justify-center gap-5">
                        <div className="-space-y-1">
                            <h1 className="text-3xl leading-snug font-bold">Mulai Akses Manfaat Eksklusif</h1>
                            <h1 className="text-accent-gradient text-3xl font-bold">
                                <span className="text-white">di</span> FTIP Unpad Alumni Club
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
            </div>

            {/* RIGHT SIDE — Registration Form */}
            <div className="flex w-full flex-col items-center justify-center p-5 lg:w-3/5 lg:p-10 xl:p-20">
                <div className="flex w-full flex-col items-start justify-center gap-5">
                    {/* Heading */}
                    <div className="w-full">
                        <h1 className="text-xl font-semibold lg:text-3xl">Daftar Akun</h1>
                        <h1 className="text-primary-gradient text-2xl font-bold lg:text-4xl">FTIP Unpad Alumni Club</h1>
                        <p className="text-muted-foreground pt-2 text-sm">
                            Sudah memiliki akun? Silakan{" "}
                            <Link href="/login" className="text-primary font-bold hover:underline">
                                Masuk
                            </Link>
                        </p>
                    </div>

                    <div className="w-full">
                        {/* Google Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(() => {})} className="w-full space-y-3">
                                <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Masukkan email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nama Lengkap</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Masukkan nama lengkap" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-2">
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

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Konfirmasi Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Masukkan konfirmasi password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-2">
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
                                                <FormMessage />
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
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
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
                                    <Button type="submit" size="lg" disabled={form.formState.isSubmitting || !agreedToPolicy} className="w-full">
                                        {false ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Memproses...
                                            </>
                                        ) : (
                                            <p className="flex items-center gap-2 text-sm">
                                                <UserPlusIcon className="h-4.5! w-4.5!" /> Daftar
                                            </p>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>

                    <div className="flex w-full flex-col items-center justify-center gap-3">
                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-background text-muted-foreground px-2">Atau</span>
                            </div>
                        </div>

                        <Button variant="outline" type="button" size="lg" onClick={() => {}} className="w-full">
                            {false ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <Image src="/logo/google.svg" alt="Google Logo" width={20} height={20} className="mr-2" />
                                    Daftar dengan Akun Google
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
