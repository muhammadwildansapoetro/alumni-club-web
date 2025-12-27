"use client";

import { useForm } from "react-hook-form";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import ReactSelect from "../ui/react-select";
import { classYearOptions, departmentOptions } from "@/app/register/page";
import { Button } from "../ui/button";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { User } from "@/types/user";
import { useEffect } from "react";
import { toast } from "sonner";
import { updateOwnProfile } from "@/services/profile.client";
import { mutate } from "swr";

const profilFormSchema = z.object({
    fullname: z.string().min(1, "Nama lengkap harus diisi"),
    npm: z.string().min(1, "NPM harus diisi"),
    department: z.enum(["TEP", "TPN", "TIN"], "Program Studi harus dipilih"),
    classYear: z.number().min(1959, "Tahun angkatan tidak valid").max(new Date().getFullYear(), "Tahun angkatan tidak valid"),
    graduationYear: z.number().min(1959, "Tahun lulus tidak valid").max(new Date().getFullYear(), "Tahun lulus tidak valid"),
    highestEducation: z.enum(["MASTER", "DOCTOR"]).nullable().optional(),
    status: z.enum(["WORKING", "STUDYING", "WORKING_STUDYING", "ENTREPRENEUR", "NOT_WORKING"], "Status harus dipilih"),
    linkedInUrl: z.url("URL LinkedIn tidak valid").optional(),
});

type ProfileFormValues = z.infer<typeof profilFormSchema>;

export default function EditProfileDialog({ user, onSuccess }: { user: User | null; onSuccess: () => void }) {
    const currentYear = new Date().getFullYear();

    const graduationYearOptions = Array.from({ length: currentYear - 1959 + 1 }, (_, i) => {
        const year = 1959 + i;
        return {
            label: year.toString(),
            value: year,
        };
    }).reverse();

    const highestEducationOptions = [
        { label: "Magister (S2)", value: "MASTER" },
        { label: "Doktor (S3)", value: "DOCTOR" },
    ];

    const alumniStatusOptions = [
        { label: "Bekerja", value: "WORKING" },
        { label: "Melanjutkan Studi", value: "STUDYING" },
        { label: "Bekerja & Studi", value: "WORKING_STUDYING" },
        { label: "Wirausaha", value: "ENTREPRENEUR" },
        { label: "Belum Bekerja", value: "NOT_WORKING" },
    ];

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profilFormSchema),
        defaultValues: {
            fullname: "",
            npm: "",
            department: undefined,
            classYear: undefined,
            graduationYear: undefined,
            highestEducation: undefined,
            status: undefined,
            linkedInUrl: "",
        },
    });

    const updateProfil = async (values: ProfileFormValues) => {
        try {
            const payload = {
                profile: {
                    fullName: values.fullname,
                    npm: values.npm,
                    department: values.department,
                    classYear: values.classYear,
                    graduationYear: values.graduationYear,
                    highestEducation: values.highestEducation ?? null,
                    status: values.status,
                    linkedInUrl: values.linkedInUrl || undefined,
                },
            };

            await updateOwnProfile(payload);
            await mutate("/users/me");

            toast.success("Berhasil memperbarui profil");
            onSuccess();
        } catch (error: any) {
            const message = error?.response?.data?.error || error?.message || "Gagal memperbarui profil";

            toast.error(message);
        }
    };
    useEffect(() => {
        if (!user) return;

        form.reset({
            fullname: user.profile?.fullName ?? "",
            npm: user.profile?.npm ?? "",
            department: user.profile?.department ?? undefined,
            classYear: user.profile?.classYear ?? undefined,
            graduationYear: user.profile?.graduationYear ?? undefined,
            highestEducation: user.profile?.highestEducation ?? undefined,
            status: user.profile?.status ?? undefined,
            linkedInUrl: user.profile?.linkedInUrl ?? "",
        });
    }, [user, form]);

    return (
        <DialogContent className="max-h-[90vh] max-w-3xl" onOpenAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader>
                <DialogTitle>Ubah Profil</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(updateProfil)}>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Lengkap</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan nama lengkap" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="npm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>NPM</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Masukkan NPM" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="department"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Program Studi</FormLabel>
                                    <FormControl>
                                        <ReactSelect
                                            {...field}
                                            options={departmentOptions}
                                            placeholder="Pilih program studi"
                                            instanceId="department-select"
                                            isSearchable={false}
                                            fieldState={fieldState}
                                            value={departmentOptions.find((opt) => opt.value === field.value) ?? null}
                                            onChange={(opt: any) => {
                                                field.onChange(opt?.value);
                                                form.setValue("classYear", null as any);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="classYear"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Tahun Angkatan</FormLabel>
                                        <FormControl>
                                            <ReactSelect
                                                {...field}
                                                options={classYearOptions}
                                                placeholder="Pilih tahun angkatan"
                                                instanceId="classyear-select"
                                                value={classYearOptions.find((opt) => opt.value === field.value) ?? null}
                                                onChange={(opt: any) => field.onChange(opt?.value)}
                                                fieldState={fieldState}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            name="graduationYear"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Tahun Kelulusan</FormLabel>
                                        <FormControl>
                                            <ReactSelect
                                                {...field}
                                                options={graduationYearOptions}
                                                placeholder="Pilih tahun kelulusan"
                                                instanceId="graduation-year-select"
                                                value={graduationYearOptions.find((opt) => opt.value === field.value) ?? null}
                                                onChange={(opt: any) => field.onChange(opt?.value)}
                                                fieldState={fieldState}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            name="highestEducation"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Pendidikan Tertinggi</FormLabel>
                                        <FormControl>
                                            <ReactSelect
                                                {...field}
                                                options={highestEducationOptions}
                                                placeholder="Magister (S2) atau Doktor (S3)"
                                                instanceId="highest-education-select"
                                                value={highestEducationOptions.find((opt) => opt.value === field.value) ?? null}
                                                onChange={(opt: any) => field.onChange(opt?.value)}
                                                fieldState={fieldState}
                                                isClearable
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            name="status"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Status Alumni</FormLabel>
                                    <FormControl>
                                        <ReactSelect
                                            {...field}
                                            options={alumniStatusOptions}
                                            placeholder="Pilih status"
                                            instanceId="status-select"
                                            isSearchable={false}
                                            fieldState={fieldState}
                                            value={alumniStatusOptions.find((opt) => opt.value === field.value) ?? null}
                                            onChange={(opt: any) => field.onChange(opt?.value)}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="linkedInUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profil LinkedIn</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://www.linkedin.com/in/username" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
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
        </DialogContent>
    );
}
