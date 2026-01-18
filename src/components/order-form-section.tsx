"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BoardSizeSelector } from "@/components/board-size-selector";
import { OrderForm } from "@/components/order-form";

interface GalleryPhoto {
  id: string;
  name: string;
  link: string;
}

export function OrderFormSection() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [boardImages, setBoardImages] = useState<Record<string, string>>({
    small: "/images/artisanal-sweets.jpg",
    medium: "/images/chocolate-board-1.jpg",
    large: "/images/hero-chocolate-board.jpg",
  });

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/gallery");
        if (!response.ok) return;

        const data = await response.json();
        const photos: GalleryPhoto[] = data.photos || [];

        if (photos.length >= 3) {
          // Shuffle and pick 3 random images
          const shuffled = [...photos].sort(() => Math.random() - 0.5);
          setBoardImages({
            small: shuffled[0].link,
            medium: shuffled[1].link,
            large: shuffled[2].link,
          });
        }
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
        // Keep fallback images
      }
    }

    fetchImages();
  }, []);

  const currentImage = selectedSize
    ? boardImages[selectedSize]
    : boardImages.medium;

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
          {/* Size Options */}
          <BoardSizeSelector
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />

          {/* Preview Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-100">
            <Image
              src={currentImage}
              alt="Board preview"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              unoptimized
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

      {/* What's Included Section */}
      <div className="bg-muted/30 rounded-lg p-6 border border-muted-foreground/10">
        <h2
          className="text-xl font-bold text-deep-berry mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          What&apos;s Included
        </h2>
        <p className="text-muted-foreground mb-4 text-sm">
          All boards feature our signature selection
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ingredients.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 text-sm text-deep-berry/80"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ingredients = [
  { name: "Assorted premium chocolates", icon: "🍫" },
  { name: "Artisan truffles", icon: "🟤" },
  { name: "Chocolate-covered strawberries", icon: "🍓" },
  { name: "Caramel clusters", icon: "🍬" },
  { name: "Chocolate-dipped pretzels", icon: "🥨" },
  { name: "Roasted nuts", icon: "🥜" },
];
