"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { getSiteConfig, saveSiteConfig } from "@/lib/site-config"

const storeInfoSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  hours: z.object({
    sunday: z.string(),
    monday: z.string(),
    tuesday: z.string(),
    wednesday: z.string(),
    thursday: z.string(),
    friday: z.string(),
    saturday: z.string(),
  }),
  social: z.object({
    instagram: z.string(),
    yelp: z.string(),
    facebook: z.string(),
  }),
})

type StoreInfoInput = z.infer<typeof storeInfoSchema>

export async function saveStoreInfoAction(
  formData: FormData
): Promise<{ success: true } | { error: string }> {
  try {
    const raw: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        raw[key] = value
      }
    }

    const input: StoreInfoInput = {
      storeName: raw["storeName"] ?? "",
      tagline: raw["tagline"] ?? "",
      phone: raw["phone"] ?? "",
      address: raw["address"] ?? "",
      hours: {
        sunday: raw["hours.sunday"] ?? "",
        monday: raw["hours.monday"] ?? "",
        tuesday: raw["hours.tuesday"] ?? "",
        wednesday: raw["hours.wednesday"] ?? "",
        thursday: raw["hours.thursday"] ?? "",
        friday: raw["hours.friday"] ?? "",
        saturday: raw["hours.saturday"] ?? "",
      },
      social: {
        instagram: raw["social.instagram"] ?? "",
        yelp: raw["social.yelp"] ?? "",
        facebook: raw["social.facebook"] ?? "",
      },
    }

    const parsed = storeInfoSchema.safeParse(input)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]
      return { error: firstError?.message ?? "Validation failed" }
    }

    const current = await getSiteConfig()
    const updated = { ...current, ...parsed.data }
    await saveSiteConfig(updated)

    revalidatePath("/admin/site-info")
    revalidatePath("/")

    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return { error: message }
  }
}
