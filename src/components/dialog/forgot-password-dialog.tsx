"use client";

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2Icon, SendIcon } from "lucide-react";
import { toast } from "sonner";
import { forgotPassword } from "@/services/auth.client";
import { useDialog } from "@/hooks/use-dialog";

const forgotPasswordSchema = z.object({
    email: z.email({ message: "Email tidak valid" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordDialog() {
    const { isOpen, onClose } = useDialog<void>("forgot-password");

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <DialogContent className="max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Lupa Kata Sandi</DialogTitle>
                    <DialogDescription>Masukkan email Anda untuk menerima link reset kata sandi.</DialogDescription>
                </DialogHeader>

                <ForgotPasswordForm onSuccess={onClose} />
            </DialogContent>
        </Dialog>
    );
}

function ForgotPasswordForm({ onSuccess }: { onSuccess: () => void }) {
    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: ForgotPasswordFormValues) => {
        try {
            await forgotPassword(values.email);

            // Always show the same success message to prevent email enumeration
            toast.success("Jika email terdaftar, Anda akan menerima link reset password.");
            form.reset();
            onSuccess();
        } catch (error: any) {
            // Display unexpected errors
            const message = error?.response?.data?.message ?? "Terjadi kesalahan. Silakan coba lagi.";
            toast.error(message);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Masukkan email Anda" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-2">
                    <Button disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2Icon className="h-4 w-4 animate-spin" />
                                Mengirim...
                            </>
                        ) : (
                            <>
                                <SendIcon className="h-4 w-4" /> Kirim Link Reset
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
