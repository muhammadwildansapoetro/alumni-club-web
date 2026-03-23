# Frontend Implementation Guide: Change Password

This guide covers the necessary steps to implement the change password feature on the frontend using our newly provided API endpoint.

## 1. API Endpoint Overview

- **Endpoint:** `POST /api/auth/change-password` (Adjust prefix like `/api/auth` based on your setup)
- **Authentication:** Requires active session (cookies are automatically managed based on session from login, assuming `authMiddleware` is used)
- **Payload Schema:**
  ```typescript
  interface ChangePasswordInput {
    currentPassword: string; // Required
    newPassword: string;     // Required, Min 8 chars, Needs Upper, Lower, Number
  }
  ```

## 2. Validation Rules (Zod / React Hook Form)

Keep your frontend validation identical to the backend rules.

```typescript
import { z } from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
  newPassword: z
    .string()
    .min(8, "Password baru minimal 8 karakter")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password baru harus mengandung huruf besar, huruf kecil, dan angka"
    ),
  confirmPassword: z.string() // Optional: Good UX practice for Frontend
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirmPassword"],
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
```

## 3. Implementation Example

Use `async/await` for handling the request to comply with coding standards.

```tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// adjust your import paths
import { changePasswordSchema, type ChangePasswordFormValues } from "./schema";

export const ChangePasswordForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema)
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        })
      });

      const result = await response.json();

      if (!response.ok) {
        // Catch server-returned errors (e.g., Google Auth User attempting to change password)
        setErrorMessage(result.message || "Gagal mengubah password.");
        return;
      }

      setSuccessMessage("Password berhasil diubah. Silakan login kembali dengan password baru.");
      
      // Optional: Log out the user or trigger a redirect
      // await handleLogout();
    } catch (error) {
       setErrorMessage("Terjadi kesalahan pada sistem. Silakan coba lagi.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

      <div>
        <label>Password Saat Ini</label>
        <input type="password" {...register("currentPassword")} />
        {errors.currentPassword && <span className="text-red-500 text-xs">{errors.currentPassword.message}</span>}
      </div>

      <div>
        <label>Password Baru</label>
        <input type="password" {...register("newPassword")} />
        {errors.newPassword && <span className="text-red-500 text-xs">{errors.newPassword.message}</span>}
      </div>

      <div>
        <label>Konfirmasi Password Baru</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Menyimpan..." : "Ubah Password"}
      </button>
    </form>
  );
};
```

## 4. Notable Edge Cases Explained

*   **Google OAuth Users:** If a user registered purely via Google (no initial password setup), hitting this endpoint will return a \`400\` with the message: `"Akun ini menggunakan Google OAuth. Tidak dapat mengubah password."` Your frontend might want to check the user's `authMethod` (if exposed in profile) before even rendering the Change Password fields.
*   **Logout Requirement:** Depending on the session setup, the backend sends a success message advising them to re-login. Make sure to gracefully redirect them or clear their session data on the frontend after a successful change.
*   **Session Requirement:** Because [changePasswordController](file:///Users/muhammadwildansapoetro/Projects/IKA%20FTIP/alumni-club-api/src/controllers/auth.controller.ts#164-189) sits behind `authMiddleware`, unauthenticated calls will automatically receive `401 Unauthorized` responses before reaching the controller.
