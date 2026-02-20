"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { getSiteConfig, saveSiteConfig } from "@/lib/site-config"

const contentSchema = z.object({
  hero: z.object({
    headline: z.string().min(1, "Headline is required"),
    subhead: z.string().min(1, "Subhead is required"),
    primaryCTA: z.string().min(1, "Primary CTA is required"),
  }),
  featured: z.object({
    title: z.string().min(1, "Featured title is required"),
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
      })
    ),
  }),
  gallery: z.object({
    title: z.string().min(1, "Gallery title is required"),
    description: z.string().min(1, "Gallery description is required"),
  }),
  b2b: z.object({
    title: z.string().min(1, "B2B title is required"),
    description: z.string().min(1, "B2B description is required"),
    services: z.array(z.string()),
  }),
  testimonials: z.object({
    title: z.string().min(1, "Testimonials title is required"),
    items: z.array(
      z.object({
        name: z.string(),
        review: z.string(),
        rating: z.coerce.number().min(1).max(5),
      })
    ),
  }),
  location: z.object({
    title: z.string().min(1, "Location title is required"),
    description: z.string().min(1, "Location description is required"),
  }),
})

export async function saveContentAction(
  formData: FormData
): Promise<{ success: true } | { error: string }> {
  try {
    const raw = Object.fromEntries(formData.entries()) as Record<string, string>

    const input = {
      hero: {
        headline: raw["hero.headline"] ?? "",
        subhead: raw["hero.subhead"] ?? "",
        primaryCTA: raw["hero.primaryCTA"] ?? "",
      },
      featured: {
        title: raw["featured.title"] ?? "",
        items: [0, 1, 2].map((i) => ({
          title: raw[`featured.items.${i}.title`] ?? "",
          description: raw[`featured.items.${i}.description`] ?? "",
          image: raw[`featured.items.${i}.image`] ?? "",
        })),
      },
      gallery: {
        title: raw["gallery.title"] ?? "",
        description: raw["gallery.description"] ?? "",
      },
      b2b: {
        title: raw["b2b.title"] ?? "",
        description: raw["b2b.description"] ?? "",
        services: [0, 1, 2, 3].map((i) => raw[`b2b.services.${i}`] ?? ""),
      },
      testimonials: {
        title: raw["testimonials.title"] ?? "",
        items: [0, 1, 2].map((i) => ({
          name: raw[`testimonials.items.${i}.name`] ?? "",
          review: raw[`testimonials.items.${i}.review`] ?? "",
          rating: raw[`testimonials.items.${i}.rating`] ?? "5",
        })),
      },
      location: {
        title: raw["location.title"] ?? "",
        description: raw["location.description"] ?? "",
      },
    }

    const parsed = contentSchema.safeParse(input)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]
      return { error: firstError?.message ?? "Validation failed" }
    }

    const current = await getSiteConfig()
    const updated = {
      ...current,
      hero: parsed.data.hero,
      featured: parsed.data.featured,
      gallery: parsed.data.gallery,
      b2b: parsed.data.b2b,
      testimonials: parsed.data.testimonials,
      location: parsed.data.location,
    }
    await saveSiteConfig(updated)

    revalidatePath("/admin/content")
    revalidatePath("/")

    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return { error: message }
  }
}
