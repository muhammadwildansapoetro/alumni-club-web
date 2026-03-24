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
import { User, EDegree } from "@/types/user";
import { toast } from "sonner";
import { updateOwnProfile } from "@/services/profile.client";
import { useRouter } from "next/navigation";
import { useDialog } from "@/hooks/use-dialog";
import { degreeOptions, entryYearFurtherEducationOptions, graduationYearFurtherEducationOptions } from "@/lib/option";

const gradYearWithCurrent = [{ value: null as number | null, label: "Belum lulus" }, ...graduationYearFurtherEducationOptions];

const addFurtherEducationSchema = z.object({
    universityName: z.string().min(1, "Nama universitas harus diisi").max(200),
    fieldOfStudy: z.string().min(1, "Bidang studi harus diisi").max(200),
    degree: z.string().min(1, "Gelar harus dipilih"),
    entryYear: z.number({ error: "Tahun masuk harus diisi" }),
    graduationYear: z.number().nullable().optional(),
});

type AddFurtherEducationFormValues = z.infer<typeof addFurtherEducationSchema>;

export type FurtherEducationManagementDialogData = { user: User; index?: number };

export default function FurtherEducationManagementDialog() {
    const { isOpen, data, onClose } = useDialog<FurtherEducationManagementDialogData>("further-education-management");

    const isEdit = data?.index !== undefined;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Pendidikan Lanjutan" : "Tambah Pendidikan Lanjutan"}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <FurtherEducationForm key={`${data?.index ?? "new"}`} data={data} onSuccess={onClose} />
            </DialogContent>
        </Dialog>
    );
}

function FurtherEducationForm({ data, onSuccess }: { data: FurtherEducationManagementDialogData | undefined; onSuccess: () => void }) {
    const router = useRouter();
    const user = data?.user;
    const editIndex = data?.index;
    const editItem = editIndex !== undefined ? user?.profile?.furtherEducations?.[editIndex] : undefined;

    const form = useForm<AddFurtherEducationFormValues>({
        resolver: zodResolver(addFurtherEducationSchema),
        defaultValues: {
            universityName: editItem?.universityName ?? "",
            fieldOfStudy: editItem?.fieldOfStudy ?? "",
            degree: editItem?.degree ?? undefined,
            entryYear: editItem?.entryYear ?? undefined,
            graduationYear: editItem?.graduationYear ?? null,
        },
    });

    const onSubmit = async (values: AddFurtherEducationFormValues) => {
        try {
            const existing = user?.profile?.furtherEducations ?? [];
            const newItem = {
                universityName: values.universityName,
                fieldOfStudy: values.fieldOfStudy,
                degree: values.degree as EDegree,
                entryYear: values.entryYear,
                graduationYear: values.graduationYear ?? null,
            };

            const updated =
                editIndex !== undefined
                    ? existing.map((item, i) => (i === editIndex ? newItem : item))
                    : [...existing, newItem];

            await updateOwnProfile({
                profile: { furtherEducations: updated },
            });

            toast.success(editIndex !== undefined ? "Pendidikan lanjutan berhasil diperbarui" : "Pendidikan lanjutan berhasil ditambahkan");
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
                        name="universityName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Universitas</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nama universitas" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fieldOfStudy"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bidang Studi</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan bidang studi" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <FormField
                        name="degree"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Gelar</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        options={degreeOptions}
                                        placeholder="Pilih gelar"
                                        instanceId="degree-select"
                                        value={degreeOptions.find((opt) => opt.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value ?? null)}
                                        fieldState={fieldState}
                                    />
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
                                        options={entryYearFurtherEducationOptions}
                                        placeholder="Pilih tahun masuk"
                                        instanceId="further-entry-year-select"
                                        value={entryYearFurtherEducationOptions.find((opt) => opt.value === field.value) ?? null}
                                        onChange={(opt: any) => field.onChange(opt?.value ?? null)}
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
                                        options={gradYearWithCurrent}
                                        placeholder="Pilih tahun lulus"
                                        instanceId="further-graduation-year-select"
                                        getOptionValue={(opt: any) => opt.value?.toString() ?? "current"}
                                        value={gradYearWithCurrent.find((opt) => opt.value === field.value) ?? gradYearWithCurrent[0]}
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
