"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { getSiteConfig, saveSiteConfig, uploadBoardImage } from "@/lib/site-config"

const BOARD_IDS = ["small", "medium", "large"] as const

const boardSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  weight: z.string().min(1, "Weight is required"),
  serves: z.string().min(1, "Serves is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string(),
  popular: z.boolean(),
})

const boardsSchema = z.array(boardSchema)

export async function saveBoardsAction(
  formData: FormData
): Promise<{ success: true } | { error: string }> {
  try {
    const current = await getSiteConfig()

    const boards = await Promise.all(
      BOARD_IDS.map(async (boardId) => {
        const existingBoard = current.boards.find((b) => b.id === boardId)

        // Handle image upload
        let imageUrl = existingBoard?.imageUrl ?? ""
        const imageFile = formData.get(`image_${boardId}`) as File | null
        if (imageFile && imageFile.size > 0) {
          imageUrl = await uploadBoardImage(boardId, imageFile)
        }

        return {
          id: boardId,
          name: (formData.get(`${boardId}.name`) as string) ?? "",
          price: (formData.get(`${boardId}.price`) as string) ?? "",
          weight: (formData.get(`${boardId}.weight`) as string) ?? "",
          serves: (formData.get(`${boardId}.serves`) as string) ?? "",
          description:
            (formData.get(`${boardId}.description`) as string) ?? "",
          imageUrl,
          popular: formData.get(`${boardId}.popular`) === "on",
        }
      })
    )

    const parsed = boardsSchema.safeParse(boards)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]
      return { error: firstError?.message ?? "Validation failed" }
    }

    const updated = { ...current, boards: parsed.data }
    await saveSiteConfig(updated)

    revalidatePath("/admin/boards")
    revalidatePath("/order")

    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return { error: message }
  }
}
