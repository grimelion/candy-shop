import Link from "next/link"
import { Phone, MapPin } from "lucide-react"
import { siteConfig } from "@/content/site"

export function SiteFooter() {
  return (
    <footer className="bg-deep-berry" style={{ backgroundColor: 'var(--deep-berry)' }}>
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-script)", color: 'var(--candy-pink)' }}>
              {siteConfig.name}
            </h3>
            <p className="text-sm" style={{ color: 'rgba(255, 248, 240, 0.9)' }}>{siteConfig.tagline}</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold" style={{ fontFamily: "var(--font-heading)", color: 'var(--cream)' }}>Contact</h4>
            <div className="space-y-2 text-sm" style={{ color: 'rgba(255, 248, 240, 0.85)' }}>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" style={{ color: 'var(--candy-pink)' }} />
                <Link href={`tel:${siteConfig.phone}`} className="hover:text-candy-pink transition-colors" style={{ color: 'inherit' }}>
                  {siteConfig.phone}
                </Link>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" style={{ color: 'var(--candy-pink)' }} />
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold" style={{ fontFamily: "var(--font-heading)", color: 'var(--cream)' }}>Hours</h4>
            <div className="space-y-1 text-sm" style={{ color: 'rgba(255, 248, 240, 0.85)' }}>
              {Object.entries(siteConfig.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize font-medium">{day}:</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 text-center text-sm" style={{ borderTop: '1px solid rgba(255, 248, 240, 0.2)', color: 'rgba(255, 248, 240, 0.6)' }}>
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}