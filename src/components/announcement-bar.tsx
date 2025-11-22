"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AnnouncementBarProps {
  message: string
  ctaText?: string
  ctaHref?: string
  variant?: "default" | "seasonal" | "urgent"
  dismissible?: boolean
}

export function AnnouncementBar({
  message,
  ctaText,
  ctaHref,
  variant = "default",
  dismissible = true
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const variants = {
    default: "bg-primary text-primary-foreground",
    seasonal: "bg-accent text-accent-foreground",
    urgent: "bg-destructive text-destructive-foreground"
  }

  return (
    <div className={`relative ${variants[variant]} py-3 px-4`}>
      <div className="container mx-auto flex items-center justify-center gap-4 text-sm font-medium">
        <div className="flex items-center gap-2">
          <span>{message}</span>
          {ctaText && ctaHref && (
            <Button
              variant="secondary"
              size="sm"
              className="h-7 text-xs"
              asChild
            >
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          )}
        </div>

        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-black/10 transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// Preset configurations for common seasonal announcements
export const seasonalAnnouncements = {
  halloween: {
    message: "👻 Halloween Treats Available! Custom spooky candy boards and themed gift baskets.",
    ctaText: "Call Us",
    ctaHref: "tel:+12675889191",
    variant: "seasonal" as const
  },
  christmas: {
    message: "🎄 Holiday Season! Book your Christmas candy displays early.",
    ctaText: "Call Now",
    ctaHref: "tel:+12675889191",
    variant: "seasonal" as const
  },
  easter: {
    message: "🐰 Easter Specials! Custom chocolate boards perfect for spring celebrations.",
    ctaText: "Learn More",
    ctaHref: "#contact",
    variant: "seasonal" as const
  },
  valentines: {
    message: "💝 Valentine's Day Chocolate Boards - Show your love with artisanal sweets.",
    ctaText: "Call Us",
    ctaHref: "tel:+12675889191",
    variant: "seasonal" as const
  },
  shipping: {
    message: "📦 Free local delivery in the Philadelphia area!",
    ctaText: "Learn More",
    ctaHref: "#contact",
    variant: "default" as const
  }
}