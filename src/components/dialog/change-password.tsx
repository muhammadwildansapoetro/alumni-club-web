"use client";

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { changePassword } from "@/services/auth.client";
import { useDialog } from "@/hooks/use-dialog";

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Password saat ini harus diisi"),
        newPassword: z
            .string()
            .min(8, "Password minimal 8 karakter")
            .regex(/[A-Z]/, "Harus mengandung huruf kapital")
            .regex(/[a-z]/, "Harus mengandung huruf kecil")
            .regex(/[0-9]/, "Harus mengandung angka"),
        confirmPassword: z.string().min(1, "Konfirmasi password harus diisi"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Konfirmasi password tidak cocok",
        path: ["confirmPassword"],
    });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordDialog() {
    const { isOpen, onClose } = useDialog<void>("change-password");

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <DialogContent className="max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Ubah Password</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <ChangePasswordForm onSuccess={onClose} />
            </DialogContent>
        </Dialog>
    );
}

function ChangePasswordForm({ onSuccess }: { onSuccess: () => void }) {
    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: ChangePasswordFormValues) => {
        try {
            const { data } = await changePassword(values.currentPassword, values.newPassword);

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message ?? "Password berhasil diubah");
            form.reset();
            onSuccess();
        } catch (error: any) {
            const message = error?.response?.data?.message ?? "Terjadi kesalahan";
            toast.error(message);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password Saat Ini</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Masukkan password saat ini" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password Baru</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Masukkan password baru" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Konfirmasi Password Baru</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Ulangi password baru" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <p className="text-muted-foreground text-xs">Password harus minimal 8 karakter, mengandung huruf kapital, huruf kecil, dan angka.</p>

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
