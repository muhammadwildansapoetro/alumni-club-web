"use client";

import { useForm, useWatch } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import ReactSelect from "../ui/react-select";
import { Button } from "../ui/button";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateOwnProfile } from "@/services/profile.client";
import { useRouter } from "next/navigation";
import { fetchCountries } from "@/services/country.client";
import AsyncReactSelect from "../ui/async-select";
import { useDialog } from "@/hooks/use-dialog";
import { fetchProvinces, fetchCities } from "@/services/country.client";
import { currentYear, entryYearOptions, graduationYearOptions } from "@/lib/option";

const profilFormSchema = z.object({
    fullname: z.string().min(1, "Nama lengkap harus diisi").max(100, "Nama terlalu panjang"),
    npm: z.string().min(1, "NPM harus diisi").max(12, "NPM maksimal 12 digit").regex(/^\d+$/, "NPM hanya boleh berisi angka"),
    entryYear: z
        .number()
        .min(1959, "Tahun lulus tidak valid")
        .max(currentYear - 3, "Tahun lulus tidak valid"),
    graduationYear: z.number().min(1962, "Tahun lulus tidak valid").max(currentYear, "Tahun lulus tidak valid"),
    linkedInUrl: z.string().url("URL LinkedIn tidak valid").or(z.literal("")).optional(),
    countryId: z.number().nullable().optional(),
    countryName: z.string().optional(),
    provinceId: z.number().nullable().optional(),
    provinceName: z.string().optional().nullable(),
    cityId: z.number().nullable().optional(),
    cityName: z.string().optional().nullable(),
    furtherEducations: z
        .array(
            z.object({
                degree: z.enum(["MAGISTER", "DOCTOR"]),
                entryYear: z
                    .number()
                    .min(1959)
                    .max(currentYear + 5),
                graduationYear: z
                    .number()
                    .min(1959)
                    .max(currentYear + 10)
                    .nullable()
                    .optional(),
                universityName: z.string().min(1, "Nama universitas harus diisi").max(200),
                fieldOfStudy: z.string().min(1, "Bidang studi harus diisi").max(200),
            }),
        )
        .nullable()
        .optional(),
    workExperiences: z
        .array(
            z.object({
                industry: z.string().min(1, "Industri harus dipilih"),
                jobLevel: z.string().min(1, "Level jabatan harus dipilih"),
                employmentType: z.string().min(1, "Tipe pekerjaan harus dipilih"),
                incomeRange: z.string().optional().nullable(),
                jobTitle: z.string().min(1, "Judul pekerjaan harus diisi").max(100),
                companyName: z.string().min(1, "Nama perusahaan harus diisi").max(100),
                startYear: z
                    .number()
                    .min(1959)
                    .max(currentYear + 5),
                endYear: z
                    .number()
                    .min(1959)
                    .max(currentYear + 5)
                    .nullable()
                    .optional(),
            }),
        )
        .nullable()
        .optional(),
});

type ProfileFormValues = z.infer<typeof profilFormSchema>;

export default function EditProfileDialog() {
    const { isOpen, data: user, onClose } = useDialog<User>("edit-profile");

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-visible" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Ubah Profil</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <EditProfileForm user={user} onSuccess={onClose} />
            </DialogContent>
        </Dialog>
    );
}

function EditProfileForm({ user, onSuccess }: { user: User | undefined; onSuccess: () => void }) {
    const router = useRouter();
    const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);
    const [provinceOptions, setProvinceOptions] = useState<{ value: string; label: string }[]>(() =>
        user?.profile?.provinceId && user?.profile?.provinceName
            ? [{ value: user.profile.provinceId.toString(), label: user.profile.provinceName }]
            : [],
    );
    const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>(() =>
        user?.profile?.cityId && user?.profile?.cityName ? [{ value: user.profile.cityId.toString(), label: user.profile.cityName }] : [],
    );

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profilFormSchema),
        defaultValues: {
            fullname: "",
            npm: "",
            entryYear: undefined,
            graduationYear: undefined,
            linkedInUrl: "",
            countryId: undefined,
            countryName: undefined,
            cityId: undefined,
            cityName: undefined,
            provinceId: undefined,
            provinceName: undefined,
        },
    });

    const watchedProvinceId = useWatch({ control: form.control, name: "provinceId" });
    const watchedCountryId = useWatch({ control: form.control, name: "countryId" });
    const isIndonesia = watchedCountryId === 77;

    const loadCountryOptions = async (inputValue: string) => {
        const options = await fetchCountries(inputValue);
        setCountryOptions(options);
        return options;
    };

    const loadProvinceOptions = async (inputValue: string) => {
        const { options } = await fetchProvinces(inputValue);
        setProvinceOptions(options);
        return options;
    };

    const loadCityOptions = async (inputValue: string) => {
        const { options } = await fetchCities(inputValue, watchedProvinceId ?? undefined);
        setCityOptions(options);
        return options;
    };

    const updateProfil = async (values: ProfileFormValues) => {
        try {
            const payload = {
                profile: {
                    fullName: values.fullname,
                    entryYear: values.entryYear,
                    graduationYear: values.graduationYear,
                    linkedInUrl: values.linkedInUrl,
                    countryId: values.countryId,
                    countryName: values.countryName,
                    provinceId: values.provinceId,
                    provinceName: values.provinceName,
                    cityId: values.cityId,
                    cityName: values.cityName,
                },
            };

            await updateOwnProfile(payload);
            router.refresh();

            toast.success("Berhasil memperbarui profil");
            onSuccess();
        } catch (error: any) {
            const message = error?.response?.data?.message;
            toast.error(message);
        }
    };

    useEffect(() => {
        if (!user) return;

        form.reset({
            fullname: user.profile?.fullName ?? "",
            npm: user.profile?.npm ?? "",
            entryYear: user.profile?.entryYear ?? undefined,
            graduationYear: user.profile?.graduationYear ?? undefined,
            linkedInUrl: user.profile?.linkedInUrl ?? "",
            countryId: user.profile?.countryId ?? null,
            countryName: user.profile?.countryName ?? undefined,
            provinceId: user.profile?.provinceId ?? null,
            provinceName: user.profile?.provinceName ?? undefined,
            cityId: user.profile?.cityId ?? null,
            cityName: user.profile?.cityName ?? undefined,
        });
    }, [user, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(updateProfil)} className="space-y-4">
                <div className="grid items-start gap-4 sm:grid-cols-2">
                    <FormField
                        name="fullname"
                        control={form.control}
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
                    <FormField
                        name="npm"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nomor Pokok Mahasiswa (NPM)</FormLabel>
                                <FormControl>
                                    <Input type="text" inputMode="numeric" maxLength={12} placeholder="Masukkan NPM" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="entryYear"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Tahun Masuk</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        options={entryYearOptions}
                                        placeholder="Pilih tahun masuk"
                                        instanceId="graduation-year-select"
                                        value={entryYearOptions.find((opt) => opt.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value)}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="graduationYear"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Tahun Lulus</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        options={graduationYearOptions}
                                        placeholder="Pilih tahun kelulusan"
                                        instanceId="graduation-year-select"
                                        value={graduationYearOptions.find((option) => option.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value)}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="linkedInUrl"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link Profil LinkedIn</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://www.linkedin.com/in/username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="countryId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Negara</FormLabel>
                                <FormControl>
                                    <AsyncReactSelect
                                        name="countryId"
                                        cacheOptions
                                        defaultOptions
                                        loadOptions={loadCountryOptions}
                                        placeholder="Pilih negara"
                                        instanceId="country-select"
                                        isClearable={true}
                                        fieldState={fieldState}
                                        value={countryOptions.find((opt) => Number(opt.value) === field.value) ?? null}
                                        onChange={(opt: any) => {
                                            const newId = opt ? Number(opt.value) : null;
                                            field.onChange(newId);
                                            form.setValue("countryName", opt?.label || undefined);
                                            if (newId !== 77) {
                                                form.setValue("provinceId", null);
                                                form.setValue("provinceName", null);
                                                form.setValue("cityId", null);
                                                form.setValue("cityName", null);
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="provinceId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Provinsi</FormLabel>
                                <FormControl>
                                    <AsyncReactSelect
                                        name="provinceId"
                                        cacheOptions
                                        defaultOptions
                                        loadOptions={loadProvinceOptions}
                                        placeholder="Ketik untuk mencari provinsi"
                                        instanceId="province-select"
                                        isClearable={true}
                                        isDisabled={!isIndonesia}
                                        fieldState={fieldState}
                                        value={provinceOptions.find((opt) => Number(opt.value) === field.value) ?? null}
                                        onChange={(opt: any) => {
                                            field.onChange(opt ? Number(opt.value) : null);
                                            form.setValue("provinceName", opt?.label || undefined);
                                            // Clear city when province changes
                                            form.setValue("cityId", null);
                                            form.setValue("cityName", undefined);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="cityId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Kota/Kabupaten</FormLabel>
                                <FormControl>
                                    <AsyncReactSelect
                                        key={`${watchedCountryId}-${watchedProvinceId ?? "no-province"}`}
                                        name="cityId"
                                        cacheOptions
                                        defaultOptions
                                        loadOptions={loadCityOptions}
                                        placeholder="Ketik untuk mencari kota"
                                        instanceId="city-select"
                                        isClearable={true}
                                        isDisabled={!isIndonesia}
                                        fieldState={fieldState}
                                        value={cityOptions.find((opt) => Number(opt.value) === field.value) ?? null}
                                        onChange={(opt: any) => {
                                            field.onChange(opt ? Number(opt.value) : null);
                                            form.setValue("cityName", opt?.label || undefined);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end pt-3">
                    <Button>
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <SaveIcon /> Simpan
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
