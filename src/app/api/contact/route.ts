import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
  service: z.enum(["gifts", "chocolate-boards", "events", "b2b", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Spam detected")
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const origin = request.headers.get("origin")
    const expectedOrigin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    if (origin !== expectedOrigin) {
      return NextResponse.json(
        { error: "Unauthorized origin" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const result = inquirySchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // In a real implementation, you would send the email here
    console.log("Inquiry submitted:", result.data)

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // await emailService.send({
    //   to: "info@googahlinis.com",
    //   subject: `New Inquiry: ${result.data.service}`,
    //   template: "inquiry",
    //   data: result.data
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to send inquiry:", error)
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again or call us directly." },
      { status: 500 }
    )
  }
}