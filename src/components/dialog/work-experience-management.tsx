"use client";

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import ReactSelect from "../ui/react-select";
import { Button } from "../ui/button";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { User, EIndustry, EmploymentLevel, EEmploymentType, EIncomeRange } from "@/types/user";
import { toast } from "sonner";
import { updateOwnProfile } from "@/services/profile.client";
import { useRouter } from "next/navigation";
import { useDialog } from "@/hooks/use-dialog";
import { industryOptions, jobLevelOptions, employmentTypeOptions, incomeRangeOptions, currentYear } from "@/lib/option";

const workStartYearOptions = Array.from({ length: currentYear - 1956 + 1 }, (_, i) => {
    const year = currentYear - i;
    return { value: year, label: year.toString() };
});

const endYearOptions = [{ value: null as number | null, label: "Sampai sekarang" }, ...workStartYearOptions];

const addWorkExperienceSchema = z.object({
    jobTitle: z.string().min(1, "Judul pekerjaan harus diisi").max(100),
    companyName: z.string().min(1, "Nama perusahaan harus diisi").max(100),
    industry: z.string().min(1, "Industri harus dipilih"),
    jobLevel: z.string().min(1, "Level jabatan harus dipilih"),
    employmentType: z.string().min(1, "Tipe pekerjaan harus dipilih"),
    incomeRange: z.string().nullable().optional(),
    startYear: z.number({ error: "Tahun mulai harus diisi" }),
    endYear: z.number().nullable().optional(),
});

type AddWorkExperienceFormValues = z.infer<typeof addWorkExperienceSchema>;

export default function WorkExperienceManagementDialog() {
    const { isOpen, data: user, onClose } = useDialog<User>("work-experience-management");

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Tambah Pengalaman Bekerja</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <AddWorkExperienceForm user={user} onSuccess={onClose} />
            </DialogContent>
        </Dialog>
    );
}

function AddWorkExperienceForm({ user, onSuccess }: { user: User | undefined; onSuccess: () => void }) {
    const router = useRouter();

    const form = useForm<AddWorkExperienceFormValues>({
        resolver: zodResolver(addWorkExperienceSchema),
        defaultValues: {
            jobTitle: "",
            companyName: "",
            industry: undefined,
            jobLevel: undefined,
            employmentType: undefined,
            incomeRange: null,
            startYear: undefined,
            endYear: null,
        },
    });

    const onSubmit = async (values: AddWorkExperienceFormValues) => {
        try {
            const existing = user?.profile?.workExperiences ?? [];
            await updateOwnProfile({
                profile: {
                    workExperiences: [
                        ...existing,
                        {
                            jobTitle: values.jobTitle,
                            companyName: values.companyName,
                            industry: values.industry as EIndustry,
                            jobLevel: values.jobLevel as EmploymentLevel,
                            employmentType: values.employmentType as EEmploymentType,
                            incomeRange: (values.incomeRange as EIncomeRange) ?? null,
                            startYear: values.startYear,
                            endYear: values.endYear ?? null,
                        },
                    ],
                },
            });

            toast.success("Pengalaman kerja berhasil ditambahkan");
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
                <div className="grid grid-cols-2 items-start gap-4">
                    <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jabatan / Posisi</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan jabatan" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Perusahaan</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nama perusahaan" {...field} />
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
                                <FormLabel>Industri</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        options={industryOptions}
                                        placeholder="Pilih industri"
                                        instanceId="industry-select"
                                        value={industryOptions.find((opt) => opt.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value ?? null)}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="employmentType"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Tipe Pekerjaan</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        options={employmentTypeOptions}
                                        placeholder="Pilih tipe pekerjaan"
                                        instanceId="employment-type-select"
                                        value={employmentTypeOptions.find((opt) => opt.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value ?? null)}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="jobLevel"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Level Jabatan</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        options={jobLevelOptions}
                                        placeholder="Pilih level jabatan"
                                        instanceId="job-level-select"
                                        value={jobLevelOptions.find((opt) => opt.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value ?? null)}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="incomeRange"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Rentang Pendapatan</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        isClearable
                                        options={incomeRangeOptions}
                                        placeholder="Pilih rentang pendapatan (opsional)"
                                        instanceId="income-range-select"
                                        value={incomeRangeOptions.find((opt) => opt.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value ?? null)}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startYear"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Tahun Mulai</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        options={workStartYearOptions}
                                        placeholder="Pilih tahun mulai"
                                        instanceId="start-year-select"
                                        value={workStartYearOptions.find((opt) => opt.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value ?? null)}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endYear"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Tahun Selesai</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        options={endYearOptions}
                                        placeholder="Pilih tahun selesai"
                                        instanceId="end-year-select"
                                        getOptionValue={(opt: any) => opt.value?.toString() ?? "current"}
                                        value={endYearOptions.find((opt) => opt.value === field.value) ?? endYearOptions[0]}
                                        onChange={(opt: any) => field.onChange(opt?.value ?? null)}
                                        fieldState={fieldState}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
