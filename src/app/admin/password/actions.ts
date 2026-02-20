"use server"

import { z } from "zod"
import { verifyPassword, savePasswordHash } from "@/lib/admin-auth"

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export async function changePasswordAction(
  formData: FormData
): Promise<{ success: true } | { error: string }> {
  const parsed = schema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const valid = await verifyPassword(parsed.data.currentPassword)
  if (!valid) {
    return { error: "Current password is incorrect" }
  }

  try {
    await savePasswordHash(parsed.data.newPassword)
    return { success: true }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save password" }
  }
}
