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

interface BoardSizeSelectorProps {
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
}

export function BoardSizeSelector({
  selectedSize,
  onSizeSelect,
}: BoardSizeSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {boardSizes.map((size) => {
        const isSelected = selectedSize === size.id;

        return (
          <button
            key={size.id}
            type="button"
            onClick={() => onSizeSelect(size.id)}
            className={`
              relative p-6 rounded-lg border-2 text-left transition-all
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
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-candy-pink text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            {/* Selection indicator */}
            <div
              className={`
                absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${
                  isSelected
                    ? "bg-candy-pink border-candy-pink"
                    : "border-muted-foreground/30"
                }
              `}
            >
              {isSelected && <Check className="w-4 h-4 text-white" />}
            </div>

            {/* Content */}
            <div className="pr-8">
              <h3
                className="text-xl font-bold text-deep-berry mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {size.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {size.description}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-deep-berry">
                  {size.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  · {size.serves}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
