"use client";

import { useState, useEffect } from "react";
import {
  BoardSizeSelector,
  BoardImages,
} from "@/components/board-size-selector";
import { OrderForm } from "@/components/order-form";

interface GalleryPhoto {
  id: string;
  name: string;
  thumbnailLink: string;
  link: string;
}

export function OrderFormSection() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [boardImages, setBoardImages] = useState<BoardImages>({});
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        const response = await fetch("/api/gallery");
        if (!response.ok) throw new Error("Failed to fetch gallery");
        const data = await response.json();
        const photos: GalleryPhoto[] = data.photos || [];

        if (photos.length >= 3) {
          setBoardImages({
            small: photos[0]?.link,
            medium: photos[1]?.link,
            large: photos[2]?.link,
          });
        } else if (photos.length > 0) {
          setBoardImages({
            small: photos[0]?.link,
            medium: photos[Math.min(1, photos.length - 1)]?.link,
            large: photos[Math.min(2, photos.length - 1)]?.link,
          });
        }
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      } finally {
        setImagesLoading(false);
      }
    }

    fetchGalleryImages();
  }, []);

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
          images={boardImages}
          imagesLoading={imagesLoading}
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
