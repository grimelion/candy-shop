"use client";

import { Check } from "lucide-react";

const boardSizes = [
  {
    id: "small",
    name: "Sweet Treats",
    price: "$45",
    serves: "2-4 people",
    description: "Perfect for small gatherings or personal gifts",
    popular: false,
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
    popular: false,
  },
] as const;

interface BoardSizeSelectorProps {
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
}

export function BoardSizeSelector({
  selectedSize,
  onSizeSelect,
}: BoardSizeSelectorProps) {
  return (
    <fieldset className="space-y-3">
      {boardSizes.map((size) => {
        const isSelected = selectedSize === size.id;

        return (
          <label
            key={size.id}
            className={`
              relative block p-4 rounded-lg border-2 cursor-pointer
              ${
                isSelected
                  ? "border-candy-pink bg-candy-pink/5"
                  : "border-gray-200 bg-white hover:border-candy-pink/50"
              }
            `}
          >
            <input
              type="radio"
              name="board-size"
              value={size.id}
              checked={isSelected}
              onChange={() => onSizeSelect(size.id)}
              className="sr-only"
            />

            {size.popular && (
              <span className="absolute -top-2 left-4 bg-candy-pink text-white text-xs px-2 py-0.5 rounded-full">
                Most Popular
              </span>
            )}

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-deep-berry">
                    {size.name}
                  </span>
                  <span className="text-xl font-bold text-deep-berry">
                    {size.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {size.description} · {size.serves}
                </p>
              </div>

              <div
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${
                    isSelected
                      ? "bg-candy-pink border-candy-pink"
                      : "border-gray-300"
                  }
                `}
              >
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
            </div>
          </label>
        );
      })}
    </fieldset>
  );
}
