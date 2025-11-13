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
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(255,251,247,0.98)] shadow-[0_2px_20px_rgba(255,107,157,0.1)]"
            : "bg-[rgba(255,255,255,0.95)] shadow-[0_2px_20px_rgba(0,0,0,0.05)]"
        } backdrop-blur-[10px]`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-[1.75rem] text-deep-berry" style={{ fontFamily: "var(--font-script)" }}>
              {siteConfig.name}
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#products"
              className="relative text-dark-chocolate font-medium transition-all duration-200 hover:text-candy-pink group"
            >
              Products
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-candy-pink transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#pricing"
              className="relative text-dark-chocolate font-medium transition-all duration-200 hover:text-candy-pink group"
            >
              Pricing
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-candy-pink transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#location"
              className="relative text-dark-chocolate font-medium transition-all duration-200 hover:text-candy-pink group"
            >
              Visit Us
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-candy-pink transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Call button */}
          <div className="flex items-center">
            <a
              href={`tel:${siteConfig.phone}`}
              className="btn-primary px-6 py-3 text-base flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Call Us</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
