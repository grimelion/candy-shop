"use server"

import { z } from "zod"

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
  service: z.enum(["gifts", "chocolate-boards", "events", "b2b", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Spam detected") // Anti-spam honeypot
})

export type InquiryFormState = {
  success?: boolean
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    service?: string[]
    message?: string[]
    honeypot?: string[]
    general?: string[]
  }
}

export async function sendInquiry(
  prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    service: formData.get("service") as string,
    message: formData.get("message") as string,
    honeypot: formData.get("honeypot") as string
  }

  const result = inquirySchema.safeParse(rawData)

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  try {
    // In a real implementation, you would send the email here
    // For now, we'll just simulate a successful submission
    console.log("Inquiry submitted:", result.data)

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // await emailService.send({
    //   to: "info@googahlinis.com",
    //   subject: `New Inquiry: ${result.data.service}`,
    //   template: "inquiry",
    //   data: result.data
    // })

    // Return success state (could also redirect to thanks page)
    return { success: true }
  } catch (error) {
    console.error("Failed to send inquiry:", error)
    return {
      errors: {
        general: ["Failed to send inquiry. Please try again or call us directly."]
      }
    }
  }
}