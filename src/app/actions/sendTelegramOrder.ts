"use server";

import { z } from "zod";

const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  size: z.string().min(1, "Board size is required"),
});

export type TelegramOrderState = {
  success?: boolean;
  error?: string;
};

export async function sendTelegramOrder(
  data: z.infer<typeof orderSchema>
): Promise<TelegramOrderState> {
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
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Missing Telegram configuration:", {
      hasBotToken: !!botToken,
      hasChatId: !!chatId,
    });
    return {
      error: "Telegram notification service is not configured",
    };
  }

  // Format the message
  const message = `🍫 *New Order Request!*

*Customer:* ${escapeMarkdown(name)}
*Phone:* ${escapeMarkdown(phone)}
*Email:* ${escapeMarkdown(email)}
*Board Size:* ${escapeMarkdown(size)}

Reply to confirm the order.`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Telegram API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      return {
        error: "Failed to send notification",
      };
    }

    const responseData = await response.json();
    console.log("Telegram message sent successfully:", responseData);

    return { success: true };
  } catch (error) {
    console.error("Telegram API request failed:", error);
    return {
      error: "Failed to send notification",
    };
  }
}

// Escape special Markdown characters
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}
