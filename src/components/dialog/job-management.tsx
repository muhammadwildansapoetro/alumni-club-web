"use client";

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, inputVariant } from "../ui/input";
import ReactSelect from "../ui/react-select";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { JobPosting } from "@/types/job";
import { jobTypeOptions } from "@/lib/option";
import { toast } from "sonner";
import { createJob, updateJob } from "@/services/jobs.client";
import { useRouter } from "next/navigation";
import { useDialog } from "@/hooks/use-dialog";
import { cn } from "@/lib/utils";

const jobSchema = z.object({
    title: z.string().min(1, "Judul lowongan harus diisi").max(200, "Judul maksimal 200 karakter"),
    description: z.string().min(20, "Deskripsi minimal 20 karakter").max(2000, "Deskripsi maksimal 2000 karakter"),
    company: z.string().min(1, "Nama perusahaan harus diisi").max(100, "Nama perusahaan maksimal 100 karakter"),
    location: z.string().min(1, "Lokasi harus diisi").max(100, "Lokasi maksimal 100 karakter"),
    jobType: z.string().min(1, "Tipe pekerjaan harus dipilih"),
    salaryRange: z.string().min(1, "Rentang gaji harus diisi").max(50, "Rentang gaji maksimal 50 karakter"),
    externalUrl: z.union([z.url({ error: "URL tidak valid" }), z.literal(""), z.null()]).optional(),
    isActive: z.boolean().optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

export type JobManagementDialogData = { job?: JobPosting };

export default function JobManagementDialog() {
    const { isOpen, data, onClose } = useDialog<JobManagementDialogData>("job-management");
    const isEdit = data?.job !== undefined;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
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

    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            title: editJob?.title ?? "",
            description: editJob?.description ?? "",
            company: editJob?.company ?? "",
            location: editJob?.location ?? "",
            jobType: editJob?.jobType ?? "",
            salaryRange: editJob?.salaryRange ?? "",
            externalUrl: editJob?.externalUrl ?? "",
            isActive: editJob?.isActive ?? true,
        },
    });

    const onSubmit = async (values: JobFormValues) => {
        try {
            const payload = {
                title: values.title,
                description: values.description,
                company: values.company,
                location: values.location,
                jobType: values.jobType as JobPosting["jobType"],
                salaryRange: values.salaryRange,
                externalUrl: values.externalUrl || null,
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
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>Lokasi</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan lokasi pekerjaan" {...field} value={field.value ?? ""} />
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
                        name="salaryRange"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>Rentang Gaji</FormLabel>
                                <FormControl>
                                    <Input placeholder="Contoh: 8-12 juta" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="externalUrl"
                        render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                                <FormLabel>URL Lamaran (opsional)</FormLabel>
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
