"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Left side - Empty space for balance */}
          <div className="hidden md:flex items-center">
          </div>

          {/* Center - Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary font-cursive">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Right side - Call button (desktop only) */}
          <div className="hidden md:flex items-center">
            <Button variant="default" size="sm" asChild>
              <Link href={`tel:${siteConfig.phone}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </Link>
            </Button>
          </div>

          {/* Mobile - Call button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`tel:${siteConfig.phone}`}>
                <Phone className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
