import Link from "next/link"
import { Phone, MapPin } from "lucide-react"
import { siteConfig } from "@/content/site"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">{siteConfig.tagline}</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <Link href={`tel:${siteConfig.phone}`} className="hover:text-primary transition-colors">
                  {siteConfig.phone}
                </Link>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold">Hours</h4>
            <div className="space-y-1 text-sm">
              {Object.entries(siteConfig.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize">{day}:</span>
                  <span className="text-muted-foreground">{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}