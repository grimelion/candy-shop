import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { siteConfig } from "@/content/site"

interface CtaBarProps {
  className?: string
}

export function CtaBar({ className }: CtaBarProps) {
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border p-4 ${className}`}>
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            Need help with your order?
          </p>
          <p className="text-xs text-muted-foreground">
            Call us or get a custom quote
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:flex"
          >
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </Button>

          <Button
            asChild
            size="sm"
            className="gradient-primary text-white"
          >
            <a href="#contact">
              Get Quote
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}