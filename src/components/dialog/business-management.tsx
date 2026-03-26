"use client";

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, inputVariant } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { Business } from "@/types/business";
import { toast } from "sonner";
import { createBusiness, updateBusiness } from "@/services/business.client";
import { useRouter } from "next/navigation";
import { useDialog } from "@/hooks/use-dialog";
import { cn } from "@/lib/utils";

const businessSchema = z.object({
    businessName: z.string().min(1, "Nama bisnis harus diisi").max(100, "Nama bisnis maksimal 100 karakter"),
    description: z.string().min(20, "Deskripsi minimal 20 karakter").max(2000, "Deskripsi maksimal 2000 karakter"),
    category: z.string().max(50, "Kategori maksimal 50 karakter").optional(),
    location: z.string().max(100, "Lokasi maksimal 100 karakter").optional(),
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
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
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

    const form = useForm<BusinessFormValues>({
        resolver: zodResolver(businessSchema),
        defaultValues: {
            businessName: editBusiness?.businessName ?? "",
            description: editBusiness?.description ?? "",
            category: editBusiness?.category ?? "",
            location: editBusiness?.location ?? "",
            website: editBusiness?.website ?? "",
            contactInfo: editBusiness?.contactInfo ?? "",
            isActive: editBusiness?.isActive ?? true,
        },
    });

    const onSubmit = async (values: BusinessFormValues) => {
        try {
            const payload = {
                businessName: values.businessName,
                description: values.description,
                category: values.category || null,
                location: values.location || null,
                website: values.website || null,
                contactInfo: values.contactInfo || null,
                ...(isEdit && { isActive: values.isActive }),
            };

            if (isEdit && editBusiness) {
                await updateBusiness(editBusiness.id, payload);
                toast.success("Bisnis berhasil diperbarui");
            } else {
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
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lokasi</FormLabel>
                                <FormControl>
                                    <Input placeholder="mis. Bandung, Jakarta" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
