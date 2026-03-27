"use client";

import { useForm, useWatch } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, inputVariant } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { Business, CreateBusinessInput, UpdateBusinessInput } from "@/types/business";
import { toast } from "sonner";
import { createBusiness, updateBusiness } from "@/services/business.client";
import { useRouter } from "next/navigation";
import { useDialog } from "@/hooks/use-dialog";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { fetchCountries, fetchProvinces, fetchCities } from "@/services/country.client";
import AsyncReactSelect from "../ui/async-select";

const INDONESIA_ID = 77;

const businessSchema = z.object({
    businessName: z.string().min(1, "Nama bisnis harus diisi").max(100, "Nama bisnis maksimal 100 karakter"),
    description: z.string().min(20, "Deskripsi minimal 20 karakter").max(2000, "Deskripsi maksimal 2000 karakter"),
    category: z.string().max(50, "Kategori maksimal 50 karakter").optional(),
    countryId: z.number().nullable().optional(),
    countryName: z.string().nullable().optional(),
    provinceId: z.number().nullable().optional(),
    provinceName: z.string().nullable().optional(),
    cityId: z.number().nullable().optional(),
    cityName: z.string().nullable().optional(),
    website: z.union([z.url({ error: "URL tidak valid" }), z.literal(""), z.null()]).optional(),
    contactInfo: z.string().max(500, "Info kontak maksimal 500 karakter").optional(),
    isActive: z.boolean().optional(),
});

type BusinessFormValues = z.infer<typeof businessSchema>;

export type BusinessManagementDialogData = { business?: Business };

export default function BusinessManagementDialog() {
    const { isOpen, data, onClose } = useDialog<BusinessManagementDialogData>("business-management");
    const isEdit = data?.business !== undefined;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-visible" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Bisnis" : "Tambah Bisnis"}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <BusinessManagementForm key={data?.business?.id ?? "new"} data={data} onSuccess={onClose} />
            </DialogContent>
        </Dialog>
    );
}

function BusinessManagementForm({ data, onSuccess }: { data: BusinessManagementDialogData | undefined; onSuccess: () => void }) {
    const router = useRouter();
    const editBusiness = data?.business;
    const isEdit = editBusiness !== undefined;

    const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);
    const [extraProvinceOptions, setExtraProvinceOptions] = useState<{ value: string; label: string }[]>([]);
    const [extraCityOptions, setExtraCityOptions] = useState<{ value: string; label: string }[]>([]);

    const form = useForm<BusinessFormValues>({
        resolver: zodResolver(businessSchema),
        defaultValues: {
            businessName: editBusiness?.businessName ?? "",
            description: editBusiness?.description ?? "",
            category: editBusiness?.category ?? "",
            countryId: null,
            countryName: null,
            provinceId: null,
            provinceName: null,
            cityId: null,
            cityName: null,
            website: editBusiness?.website ?? "",
            contactInfo: editBusiness?.contactInfo ?? "",
            isActive: editBusiness?.isActive ?? true,
        },
    });

    const watchedCountryId = useWatch({ control: form.control, name: "countryId" });
    const watchedProvinceId = useWatch({ control: form.control, name: "provinceId" });
    const isIndonesia = watchedCountryId === INDONESIA_ID;

    const provinceOptions = useMemo(() => {
        const merged = [...extraProvinceOptions];
        const seen = new Set<string>();
        return merged.filter((o) => (seen.has(o.value) ? false : seen.add(o.value) && true));
    }, [extraProvinceOptions]);

    const cityOptions = useMemo(() => {
        const merged = [...extraCityOptions];
        const seen = new Set<string>();
        return merged.filter((o) => (seen.has(o.value) ? false : seen.add(o.value) && true));
    }, [extraCityOptions]);

    const loadCountryOptions = async (inputValue: string) => {
        const options = await fetchCountries(inputValue);
        setCountryOptions(options);
        return options;
    };

    const loadProvinceOptions = async (inputValue: string) => {
        const { options } = await fetchProvinces(inputValue);
        setExtraProvinceOptions(options);
        return options;
    };

    const loadCityOptions = async (inputValue: string) => {
        const { options } = await fetchCities(inputValue, watchedProvinceId ?? undefined);
        setExtraCityOptions(options);
        return options;
    };

    const buildLocation = (values: BusinessFormValues): string | undefined => {
        if (values.cityName) return values.cityName;
        if (values.provinceName) return values.provinceName;
        if (values.countryName) return values.countryName;
        return undefined;
    };

    const onSubmit = async (values: BusinessFormValues) => {
        try {
            const location = buildLocation(values);

            const locationFields = {
                countryId: values.countryId ?? null,
                countryName: values.countryName ?? null,
                provinceId: values.provinceId ?? null,
                provinceName: values.provinceName ?? null,
                cityId: values.cityId ?? null,
                cityName: values.cityName ?? null,
            };

            if (isEdit && editBusiness) {
                const payload: UpdateBusinessInput = {
                    businessName: values.businessName,
                    description: values.description,
                    ...(values.category ? { category: values.category } : {}),
                    ...(location ? { location } : {}),
                    ...locationFields,
                    website: values.website || "",
                    ...(values.contactInfo ? { contactInfo: values.contactInfo } : {}),
                    isActive: values.isActive,
                };
                await updateBusiness(editBusiness.id, payload);
                toast.success("Bisnis berhasil diperbarui");
            } else {
                const payload: CreateBusinessInput = {
                    businessName: values.businessName,
                    description: values.description,
                    ...(values.category ? { category: values.category } : {}),
                    ...(location ? { location } : {}),
                    ...locationFields,
                    ...(values.website ? { website: values.website } : {}),
                    ...(values.contactInfo ? { contactInfo: values.contactInfo } : {}),
                };
                await createBusiness(payload);
                toast.success("Bisnis berhasil ditambahkan");
            }

            form.reset();
            router.refresh();
            onSuccess();
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? "Terjadi kesalahan");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid items-start gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                                <FormLabel aria-required>Nama Bisnis</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nama bisnis" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                                <FormLabel aria-required>Deskripsi</FormLabel>
                                <FormControl>
                                    <textarea
                                        {...field}
                                        value={field.value ?? ""}
                                        className={cn(inputVariant, "h-32 resize-none py-2")}
                                        placeholder="Masukkan deskripsi bisnis (minimal 20 karakter)"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori</FormLabel>
                                <FormControl>
                                    <Input placeholder="mis. Kuliner, Teknologi, Konsultan" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="countryId"
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
                                        instanceId="business-country-select"
                                        isClearable
                                        fieldState={fieldState}
                                        value={countryOptions.find((opt) => Number(opt.value) === field.value) ?? null}
                                        onChange={(opt: any) => {
                                            const newId = opt ? Number(opt.value) : null;
                                            field.onChange(newId);
                                            form.setValue("countryName", opt?.label ?? null);
                                            if (newId !== INDONESIA_ID) {
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
                    {isIndonesia && (
                        <>
                            <FormField
                                control={form.control}
                                name="provinceId"
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
                                                instanceId="business-province-select"
                                                isClearable
                                                fieldState={fieldState}
                                                value={provinceOptions.find((opt) => Number(opt.value) === field.value) ?? null}
                                                onChange={(opt: any) => {
                                                    field.onChange(opt ? Number(opt.value) : null);
                                                    form.setValue("provinceName", opt?.label ?? null);
                                                    form.setValue("cityId", null);
                                                    form.setValue("cityName", null);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cityId"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Kota/Kabupaten</FormLabel>
                                        <FormControl>
                                            <AsyncReactSelect
                                                key={`city-${watchedProvinceId ?? "no-province"}`}
                                                name="cityId"
                                                cacheOptions
                                                defaultOptions
                                                loadOptions={loadCityOptions}
                                                placeholder="Ketik untuk mencari kota"
                                                instanceId="business-city-select"
                                                isClearable
                                                fieldState={fieldState}
                                                value={cityOptions.find((opt) => Number(opt.value) === field.value) ?? null}
                                                onChange={(opt: any) => {
                                                    field.onChange(opt ? Number(opt.value) : null);
                                                    form.setValue("cityName", opt?.label ?? null);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactInfo"
                        render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                                <FormLabel>Info Kontak</FormLabel>
                                <FormControl>
                                    <textarea
                                        {...field}
                                        value={field.value ?? ""}
                                        className={cn(inputVariant, "resize-none py-2")}
                                        placeholder="Nomor HP, email bisnis, dll."
                                        rows={2}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {isEdit && (
                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                    <FormLabel>Status</FormLabel>
                                    <div className="flex items-center gap-2">
                                        <FormControl>
                                            <Switch
                                                id="isActive"
                                                checked={field.value ?? true}
                                                onCheckedChange={field.onChange}
                                                className="cursor-pointer"
                                            />
                                        </FormControl>
                                        <FormLabel htmlFor="isActive" className="cursor-pointer font-normal">
                                            {field.value ? "Aktif" : "Nonaktif"}
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>

                <div className="flex justify-end pt-2">
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
