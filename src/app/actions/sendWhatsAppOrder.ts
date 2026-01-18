"use server";

import { z } from "zod";

const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  size: z.string().min(1, "Board size is required"),
});

export type WhatsAppOrderState = {
  success?: boolean;
  error?: string;
};

export async function sendWhatsAppOrder(
  data: z.infer<typeof orderSchema>
): Promise<WhatsAppOrderState> {
  // Validate input
  const result = orderSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation error:", result.error.flatten());
    return {
      error: "Invalid order data",
    };
  }

  const { name, phone, email, size } = result.data;

  // Check for required environment variables
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipientPhone = process.env.WHATSAPP_RECIPIENT_PHONE;

  if (!accessToken || !phoneNumberId || !recipientPhone) {
    console.error("Missing WhatsApp configuration:", {
      hasAccessToken: !!accessToken,
      hasPhoneNumberId: !!phoneNumberId,
      hasRecipientPhone: !!recipientPhone,
    });
    return {
      error: "WhatsApp notification service is not configured",
    };
  }

  // Format the message
  const message = `🍫 New Order Request!

Customer: ${name}
Phone: ${phone}
Email: ${email}
Board Size: ${size}

Reply to this message or call the customer to confirm.`;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: recipientPhone,
          type: "text",
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("WhatsApp API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      return {
        error: "Failed to send notification",
      };
    }

    const responseData = await response.json();
    console.log("WhatsApp message sent successfully:", responseData);

    return { success: true };
  } catch (error) {
    console.error("WhatsApp API request failed:", error);
    return {
      error: "Failed to send notification",
    };
  }
}
