"use client";

import { Check } from "lucide-react";

interface BoardSize {
  id: "small" | "medium" | "large";
  name: string;
  price: string;
  serves: string;
  description: string;
  popular?: boolean;
}

const boardSizes: BoardSize[] = [
  {
    id: "small",
    name: "Sweet Treats",
    price: "$45",
    serves: "2-4 people",
    description: "Perfect for small gatherings or personal gifts",
  },
  {
    id: "medium",
    name: "Celebration Board",
    price: "$85",
    serves: "6-10 people",
    description: "Ideal for parties and special occasions",
    popular: true,
  },
  {
    id: "large",
    name: "Grand Feast",
    price: "$150",
    serves: "12+ people",
    description: "Show-stopping centerpiece for large events",
  },
];

const boardImages: Record<string, string> = {
  small: "/images/chocolate-board-1.jpg",
  medium: "/images/hero-chocolate-board.jpg",
  large: "/images/event-candy-bar.jpg",
};

interface BoardSizeSelectorProps {
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
}

export function BoardSizeSelector({
  selectedSize,
  onSizeSelect,
}: BoardSizeSelectorProps) {
  const currentImage = selectedSize ? boardImages[selectedSize] : null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Preview Image */}
      <div className="order-1 md:order-2">
        <div className="sticky top-4 rounded-xl overflow-hidden bg-muted/30 aspect-square">
          {currentImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={currentImage}
              alt="Selected board preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <span className="text-6xl mb-4">🍫</span>
              <p className="text-sm">Select a size to preview</p>
            </div>
          )}
        </div>
      </div>

      {/* Size Cards */}
      <div className="order-2 md:order-1 space-y-3">
        {boardSizes.map((size) => {
          const isSelected = selectedSize === size.id;

          return (
            <button
              key={size.id}
              type="button"
              onClick={() => onSizeSelect(size.id)}
              className={`
                relative w-full p-4 rounded-lg border-2 text-left transition-all
                cursor-pointer hover:border-candy-pink/50 hover:shadow-md
                ${
                  isSelected
                    ? "border-candy-pink ring-2 ring-candy-pink/20 bg-candy-pink/5"
                    : "border-muted-foreground/20 bg-white"
                }
              `}
            >
              {/* Popular badge */}
              {size.popular && (
                <span className="absolute -top-2 left-4 bg-candy-pink text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  Most Popular
                </span>
              )}

              {/* Selection indicator */}
              <div
                className={`
                  absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${
                    isSelected
                      ? "bg-candy-pink border-candy-pink"
                      : "border-muted-foreground/30"
                  }
                `}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>

              {/* Content */}
              <div className="pr-8">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3
                    className="text-lg font-bold text-deep-berry"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {size.name}
                  </h3>
                  <span className="text-2xl font-bold text-deep-berry">
                    {size.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {size.description} · {size.serves}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
