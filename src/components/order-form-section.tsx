"use client";

import { useState } from "react";
import Image from "next/image";
import { BoardSizeSelector } from "@/components/board-size-selector";
import { OrderForm } from "@/components/order-form";
import type { BoardSize } from "@/types/site-config";

interface OrderFormSectionProps {
  boards: BoardSize[];
}

export function OrderFormSection({ boards }: OrderFormSectionProps) {
  const defaultId = boards.find((b) => b.popular)?.id ?? boards[0]?.id ?? null;
  const [selectedSize, setSelectedSize] = useState<string | null>(defaultId);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const boardImages = Object.fromEntries(boards.map((b) => [b.id, b.imageUrl]));

  const currentImage = selectedSize
    ? boardImages[selectedSize]
    : boardImages[defaultId ?? ""] ?? "";

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
          All boards are handcrafted with our signature chocolate selection
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BoardSizeSelector
            boards={boards}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />

          <div className="lg:flex lg:items-center">
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={currentImage}
                alt="Board preview"
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {!selectedSize && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <p className="text-white text-lg font-medium bg-black/50 px-4 py-2 rounded-lg">
                    Select a size to preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Contact Form */}
      <div className={selectedSize ? "opacity-100" : "opacity-50"}>
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
              Thank you for your order!
            </p>
            <p className="text-green-700">
              We&apos;ll reach out shortly to confirm pickup or delivery details.
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
