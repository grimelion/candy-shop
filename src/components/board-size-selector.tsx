"use client";

import { Check } from "lucide-react";
import type { BoardSize } from "@/types/site-config";

interface BoardSizeSelectorProps {
  boards: BoardSize[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
}

export function BoardSizeSelector({
  boards,
  selectedSize,
  onSizeSelect,
}: BoardSizeSelectorProps) {
  return (
    <fieldset className="space-y-3">
      {boards.map((size) => {
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
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg font-bold text-deep-berry">
                    {size.name}
                  </span>
                </div>
                <span className="inline-block text-2xl font-bold text-candy-pink mb-2">
                  {size.price}
                </span>
                <p className="text-sm text-gray-600 mb-2">
                  Weight: {size.weight} · Serves {size.serves}
                </p>
                <p className="text-sm text-gray-700">
                  {size.description}
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
