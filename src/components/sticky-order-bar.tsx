"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/content/site";

export function StickyOrderBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling past the hero section (approximately 90vh)
      const heroHeight = window.innerHeight * 0.9;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-gradient-to-r from-candy-pink to-deep-berry shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left side - Message */}
            <div className="flex items-center gap-2 text-white">
              <ShoppingBag className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium hidden sm:block">
                Ready to order your chocolate board?
              </span>
              <span className="text-sm font-medium sm:hidden">
                Order Now
              </span>
            </div>

            {/* Right side - Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="bg-white text-deep-berry hover:bg-cream transition-all duration-300 rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Call</span>
              </a>
              <Link
                href="/order"
                className="bg-white text-candy-pink hover:bg-cream transition-all duration-300 rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
