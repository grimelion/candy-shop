"use client";

import { useState } from "react";
import { BoardSizeSelector } from "@/components/board-size-selector";
import { OrderForm } from "@/components/order-form";

export function OrderFormSection() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="space-y-8">
      {/* Step 1: Size Selection */}
      <div>
        <h2
          className="text-2xl font-bold text-deep-berry mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          1. Choose Your Board Size
        </h2>
        <p className="text-muted-foreground mb-6">
          Select the perfect size for your occasion
        </p>
        <BoardSizeSelector
          selectedSize={selectedSize}
          onSizeSelect={setSelectedSize}
        />
      </div>

      {/* Step 2: Contact Form - Placeholder for Phase 3 */}
      <div
        className={`transition-opacity duration-300 ${
          selectedSize ? "opacity-100" : "opacity-50"
        }`}
      >
        <h2
          className="text-2xl font-bold text-deep-berry mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          2. Your Details
        </h2>
        <p className="text-muted-foreground mb-6">
          {selectedSize
            ? "Fill in your contact information to complete your order"
            : "Select a board size above to continue"}
        </p>
        {isSubmitted ? (
          <div className="p-8 bg-green-50 rounded-lg border-2 border-green-200 text-center">
            <p className="text-green-800 font-medium text-lg mb-2">
              Thank you for your order request!
            </p>
            <p className="text-green-700">
              We&apos;ll contact you soon to confirm the details.
            </p>
          </div>
        ) : (
          <OrderForm
            selectedSize={selectedSize}
            onSubmitSuccess={() => setIsSubmitted(true)}
          />
        )}
      </div>
    </div>
  );
}
