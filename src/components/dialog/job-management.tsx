"use client";

import { useForm, useWatch } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, inputVariant } from "../ui/input";
import ReactSelect from "../ui/react-select";
import AsyncReactSelect from "../ui/async-select";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { JobPosting, JobType, SalaryRange, SALARY_RANGE_LABELS, IndustryField } from "@/types/job";
import { jobTypeOptions, industryOptions } from "@/lib/option";
import { toast } from "sonner";
import { createJob, updateJob } from "@/services/jobs.client";
import { useRouter } from "next/navigation";
import { useDialog } from "@/hooks/use-dialog";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { fetchCountries, fetchProvinces, fetchCities } from "@/services/country.client";
import { ProvinceOption, CityOption, CountryOption } from "@/types/country";

const salaryRangeOptions = (Object.keys(SALARY_RANGE_LABELS) as SalaryRange[]).map((key) => ({
    value: key,
    label: SALARY_RANGE_LABELS[key],
}));

const jobSchema = z.object({
    title: z.string().min(1, "Judul lowongan wajib diisi").max(200, "Judul maksimal 200 karakter"),
    description: z.string().min(20, "Deskripsi minimal 20 karakter").max(2000, "Deskripsi maksimal 2000 karakter"),
    company: z.string().min(1, "Nama perusahaan wajib diisi").max(100, "Nama perusahaan maksimal 100 karakter"),
    industry: z.string().min(1, "Industri wajib diisi"),
    jobType: z.string().min(1, "Tipe pekerjaan wajib diisi"),
    salaryRange: z.string().optional(),
    externalUrl: z.union([z.url({ error: "URL tidak valid" }), z.literal(""), z.null()]).optional(),
    isActive: z.boolean().optional(),
    countryId: z
        .number({ error: "Negara wajib diisi" })
        .nullable()
        .refine((v) => v !== null, { message: "Negara wajib diisi" }),
    countryName: z.string().nullable().optional(),
    provinceId: z.number().nullable().optional(),
    provinceName: z.string().nullable().optional(),
    cityId: z.number().nullable().optional(),
    cityName: z.string().nullable().optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

export type JobManagementDialogData = { job?: JobPosting };

export default function JobManagementDialog() {
    const { isOpen, data, onClose } = useDialog<JobManagementDialogData>("job-management");
    const isEdit = data?.job !== undefined;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Lowongan Kerja" : "Tambah Lowongan Kerja"}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <JobManagementForm key={data?.job?.id ?? "new"} data={data} onSuccess={onClose} />
            </DialogContent>
        </Dialog>
    );
}

function JobManagementForm({ data, onSuccess }: { data: JobManagementDialogData | undefined; onSuccess: () => void }) {
    const router = useRouter();
    const editJob = data?.job;
    const isEdit = editJob !== undefined;

    const [extraCountryOptions, setExtraCountryOptions] = useState<CountryOption[]>([]);
    const [extraProvinceOptions, setExtraProvinceOptions] = useState<ProvinceOption[]>([]);
    const [extraCityOptions, setExtraCityOptions] = useState<CityOption[]>([]);

    const countryOptions = useMemo(() => {
        const seed = editJob?.countryId && editJob?.countryName ? [{ value: String(editJob.countryId), label: editJob.countryName }] : [];
        const merged = [...seed, ...extraCountryOptions];
        const seen = new Set<string>();
        return merged.filter((o) => (seen.has(o.value) ? false : seen.add(o.value) && true));
    }, [editJob, extraCountryOptions]);

    const provinceOptions = useMemo(() => {
        const seed = editJob?.provinceId && editJob?.provinceName ? [{ value: String(editJob.provinceId), label: editJob.provinceName }] : [];
        const merged = [...seed, ...extraProvinceOptions];
        const seen = new Set<string>();
        return merged.filter((o) => (seen.has(o.value) ? false : seen.add(o.value) && true));
    }, [editJob, extraProvinceOptions]);

    const cityOptions = useMemo(() => {
        const seed = editJob?.cityId && editJob?.cityName ? [{ value: String(editJob.cityId), label: editJob.cityName }] : [];
        const merged = [...seed, ...extraCityOptions];
        const seen = new Set<string>();
        return merged.filter((o) => (seen.has(o.value) ? false : seen.add(o.value) && true));
    }, [editJob, extraCityOptions]);

    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            title: editJob?.title ?? "",
            description: editJob?.description ?? "",
            company: editJob?.company ?? "",
            industry: editJob?.industry ?? "",
            jobType: editJob?.jobType ?? "",
            salaryRange: editJob?.salaryRange ?? "",
            externalUrl: editJob?.externalUrl ?? "",
            isActive: editJob?.isActive ?? true,
            countryId: editJob?.countryId ?? null,
            countryName: editJob?.countryName ?? null,
            provinceId: editJob?.provinceId ?? null,
            provinceName: editJob?.provinceName ?? null,
            cityId: editJob?.cityId ?? null,
            cityName: editJob?.cityName ?? null,
        },
    });

    const watchedCountryId = useWatch({ control: form.control, name: "countryId" });
    const watchedProvinceId = useWatch({ control: form.control, name: "provinceId" });
    const isIndonesia = watchedCountryId === 77;

    const loadCountryOptions = async (inputValue: string) => {
        const options = await fetchCountries(inputValue);
        setExtraCountryOptions(options);
        return options;
    };

    const loadProvinceOptions = async (inputValue: string) => {
        const { options } = await fetchProvinces(inputValue, 1, 50);
        setExtraProvinceOptions(options);
        return options;
    };

    const loadCityOptions = async (inputValue: string) => {
        const { options } = await fetchCities(inputValue, watchedProvinceId ?? undefined, 1, 50);
        setExtraCityOptions(options);
        return options;
    };

    const onSubmit = async (values: JobFormValues) => {
        try {
            const payload = {
                title: values.title,
                description: values.description,
                company: values.company || null,
                industry: (values.industry as IndustryField) || null,
                jobType: (values.jobType as JobType) || null,
                salaryRange: (values.salaryRange as SalaryRange) || null,
                externalUrl: values.externalUrl || null,
                countryId: values.countryId ?? null,
                countryName: values.countryName ?? null,
                provinceId: values.provinceId ?? null,
                provinceName: values.provinceName ?? null,
                cityId: values.cityId ?? null,
                cityName: values.cityName ?? null,
                ...(isEdit && { isActive: values.isActive }),
            };

            if (isEdit && editJob) {
                await updateJob(editJob.id, payload);
                toast.success("Lowongan kerja berhasil diperbarui");
            } else {
                await createJob(payload);
                toast.success("Lowongan kerja berhasil ditambahkan");
            }

            form.reset();
            router.refresh();
            onSuccess();
        } catch (error: any) {
            console.log("error", error);
            toast.error(error?.response?.data?.message ?? "Terjadi kesalahan");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid items-start gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                                <FormLabel aria-required>Judul Lowongan</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan judul lowongan" {...field} />
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
                                        placeholder="Masukkan deskripsi lowongan (minimal 20 karakter)"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>Nama Perusahaan</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nama perusahaan" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="industry"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel aria-required>Industri</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        isClearable
                                        options={industryOptions}
                                        placeholder="Pilih industri"
                                        instanceId="industry-select"
                                        value={industryOptions.find((opt) => opt.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value ?? "")}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="jobType"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel aria-required>Tipe Pekerjaan</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        isClearable
                                        options={jobTypeOptions}
                                        placeholder="Pilih tipe pekerjaan"
                                        instanceId="job-type-select"
                                        value={jobTypeOptions.find((opt) => opt.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value ?? "")}
                                        fieldState={fieldState}
                                    />
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
                                <FormLabel aria-required>Negara</FormLabel>
                                <FormControl>
                                    <AsyncReactSelect
                                        name="countryId"
                                        instanceId="country-select"
                                        isClearable
                                        defaultOptions={true}
                                        placeholder="Pilih negara"
                                        loadOptions={loadCountryOptions}
                                        value={countryOptions.find((opt) => Number(opt.value) === field.value) ?? null}
                                        onChange={(opt: any) => {
                                            const newId = opt ? Number(opt.value) : null;
                                            field.onChange(newId);
                                            form.setValue("countryName", opt?.label ?? null);
                                            if (newId !== 77) {
                                                form.setValue("provinceId", null);
                                                form.setValue("provinceName", null);
                                                form.setValue("cityId", null);
                                                form.setValue("cityName", null);
                                            }
                                        }}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="provinceId"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Provinsi</FormLabel>
                                <FormControl>
                                    <AsyncReactSelect
                                        name="provinceId"
                                        instanceId="province-select"
                                        isClearable
                                        defaultOptions={true}
                                        isDisabled={!isIndonesia}
                                        placeholder="Pilih provinsi"
                                        loadOptions={loadProvinceOptions}
                                        value={provinceOptions.find((opt) => opt.value === String(field.value ?? "")) ?? null}
                                        onChange={(opt: any) => {
                                            field.onChange(opt ? Number(opt.value) : null);
                                            form.setValue("provinceName", opt?.label ?? null);
                                            form.setValue("cityId", null);
                                            form.setValue("cityName", null);
                                        }}
                                        fieldState={fieldState}
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
                                <FormLabel>Kota</FormLabel>
                                <FormControl>
                                    <AsyncReactSelect
                                        key={`${watchedCountryId}-${watchedProvinceId ?? "no-province"}`}
                                        name="cityId"
                                        instanceId="city-select"
                                        isClearable
                                        defaultOptions={true}
                                        isDisabled={!isIndonesia || !watchedProvinceId}
                                        placeholder="Pilih kota"
                                        loadOptions={loadCityOptions}
                                        value={cityOptions.find((opt) => opt.value === String(field.value ?? "")) ?? null}
                                        onChange={(opt: any) => {
                                            field.onChange(opt ? Number(opt.value) : null);
                                            form.setValue("cityName", opt?.label ?? null);
                                        }}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="salaryRange"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Rentang Gaji</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        isClearable
                                        options={salaryRangeOptions}
                                        placeholder="Pilih rentang gaji"
                                        instanceId="salary-range-select"
                                        value={salaryRangeOptions.find((opt) => opt.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value ?? "")}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="externalUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Situs Web</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} value={field.value ?? ""} />
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
