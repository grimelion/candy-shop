"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-[rgba(255,251,247,0.98)] shadow-[0_2px_20px_rgba(255,107,157,0.1)]"
            : "bg-[rgba(255,255,255,0.95)] shadow-[0_2px_20px_rgba(0,0,0,0.05)]"
        } backdrop-blur-[10px]`}
      >
        <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-[1.25rem] sm:text-[1.5rem] md:text-[1.75rem] text-deep-berry" style={{ fontFamily: "var(--font-script)" }}>
              {siteConfig.name}
            </span>
          </Link>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="btn-secondary px-4 py-2 sm:px-6 sm:py-3 text-base flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Call Us</span>
            </a>
            <Link
              href="/order"
              className="btn-primary px-4 py-2 sm:px-6 sm:py-3 text-base"
            >
              Order
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
