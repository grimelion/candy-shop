"use server";

import { z } from "zod";

const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  size: z.string().min(1, "Board size is required"),
});

export type SMSOrderState = {
  success?: boolean;
  error?: string;
};

export async function sendSMSOrder(
  data: z.infer<typeof orderSchema>,
): Promise<SMSOrderState> {
  // Validate input
  const result = orderSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation error:", result.error.flatten());
    return {
      error: "Invalid order data",
    };
  }

  const { name, phone, email, size } = result.data;

  // Check for required Twilio environment variables
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // e.g., +14155238886
  const recipientPhone = process.env.SMS_RECIPIENT_PHONE; // e.g., +1234567890

  if (!accountSid || !authToken || !twilioPhoneNumber || !recipientPhone) {
    console.error("Missing Twilio configuration:", {
      hasAccountSid: !!accountSid,
      hasAuthToken: !!authToken,
      hasTwilioPhoneNumber: !!twilioPhoneNumber,
      hasRecipientPhone: !!recipientPhone,
    });
    return {
      error: "SMS notification service is not configured",
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
    // Twilio uses URLSearchParams for form data
    const payload = new URLSearchParams({
      From: twilioPhoneNumber,
      To: recipientPhone,
      Body: message,
    });

    console.log("Sending SMS message via Twilio:", {
      from: twilioPhoneNumber,
      to: recipientPhone,
      messageLength: message.length,
    });

    // Twilio requires Basic Auth with Account SID and Auth Token
    const authHeader = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Twilio API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      console.error("Full error response:", JSON.stringify(errorData, null, 2));
      return {
        error: "Failed to send notification",
      };
    }

    const responseData = await response.json();
    console.log("SMS message sent successfully via Twilio:", {
      sid: responseData.sid,
      status: responseData.status,
    });

    return { success: true };
  } catch (error) {
    console.error("Twilio API request failed:", error);
    return {
      error: "Failed to send notification",
    };
  }
}
