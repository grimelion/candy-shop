"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendWhatsAppOrder } from "@/app/actions/sendWhatsAppOrder";

const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;

const orderFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(phoneRegex, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
  selectedSize: string | null;
  onSubmitSuccess: () => void;
}

export function OrderForm({ selectedSize, onSubmitSuccess }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: OrderFormValues) => {
    // Validate selectedSize is not null
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    setSubmitError(null);
    setIsSubmitting(true);

    // Log order data to console for debugging
    console.log("Order submitted:", { ...data, size: selectedSize });

    // Send WhatsApp notification
    const result = await sendWhatsAppOrder({
      name: data.name,
      phone: data.phone,
      email: data.email,
      size: selectedSize,
    });

    if (result.error) {
      console.error("WhatsApp notification failed:", result.error);
      setSubmitError("Something went wrong. Please try again or call us directly.");
      setIsSubmitting(false);
      return;
    }

    // Call success callback
    onSubmitSuccess();
  };

  const isDisabled = !selectedSize;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {sizeError && (
          <p className="text-destructive text-sm">
            Please select a board size above before submitting
          </p>
        )}

        {submitError && (
          <p className="text-destructive text-sm">{submitError}</p>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-deep-berry">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  disabled={isDisabled || isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-deep-berry">Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  disabled={isDisabled || isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-deep-berry">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  disabled={isDisabled || isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-candy-pink hover:bg-candy-pink/90 text-white"
          size="lg"
          disabled={isDisabled || isSubmitting}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </Button>
      </form>
    </Form>
  );
}
