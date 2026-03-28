"use client";

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2Icon, SaveIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { changePassword } from "@/services/auth.client";
import { useDialog } from "@/hooks/use-dialog";
import { forwardRef, useState } from "react";

const PasswordInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative">
            <Input type={showPassword ? "text" : "password"} className="pr-10" ref={ref} {...props} />
            <button
                type="button"
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
            >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
        </div>
    );
});
PasswordInput.displayName = "PasswordInput";

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Kata sandi saat ini wajib diisi"),
        newPassword: z
            .string()
            .min(8, "Kata sandi minimal 8 karakter")
            .regex(/[A-Z]/, "Wajib mengandung huruf kapital")
            .regex(/[a-z]/, "Wajib mengandung huruf kecil")
            .regex(/[0-9]/, "Wajib mengandung angka"),
        confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Konfirmasi kata sandi tidak cocok",
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
                    <DialogTitle>Ubah Kata Sandi</DialogTitle>
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

            toast.success(data.message ?? "Kata sandi berhasil diubah. Silakan masuk kembali dengan kata sandi baru.");
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
                            <FormLabel>Kata Sandi Saat Ini</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Masukkan kata sandi saat ini" {...field} />
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
                            <FormLabel>Kata Sandi Baru</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Masukkan kata sandi baru" {...field} />
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
                            <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Ulangi password baru" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <p className="text-muted-foreground text-xs">
                    Kata sandi harus minimal 8 karakter, mengandung huruf kapital, huruf kecil, dan angka.
                </p>

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
