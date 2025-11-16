import { Badge } from "@/components/ui/badge"
import { WavyDivider } from "@/components/wavy-divider"
import { StoreMap } from "@/components/google-map"
import { Facebook, Instagram, Star, Music } from "lucide-react"

const hours = [
  { day: "Sunday", time: "11:00 AM - 4:00 PM" },
  { day: "Monday", time: "10:00 AM - 7:30 PM" },
  { day: "Tuesday", time: "10:00 AM - 7:30 PM" },
  { day: "Wednesday", time: "10:00 AM - 7:30 PM" },
  { day: "Thursday", time: "10:00 AM - 7:30 PM" },
  { day: "Friday", time: "10:00 AM - 7:30 PM" },
  { day: "Saturday", time: "10:00 AM - 5:00 PM" }
]

function getCurrentDayStatus() {
  const now = new Date()
  const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const currentTime = now.getHours() * 100 + now.getMinutes()

  const todaysHours = hours[currentDay] // Sunday is now index 0

  if (todaysHours.day === "Sunday") {
    return currentTime >= 1100 && currentTime < 1600 ? "open" : "closed"
  } else if (todaysHours.day === "Saturday") {
    return currentTime >= 1000 && currentTime < 1700 ? "open" : "closed"
  } else {
    // Monday-Friday: 10:00 AM - 7:30 PM
    return currentTime >= 1000 && currentTime < 1930 ? "open" : "closed"
  }
}

export function LocationHours() {
  const status = getCurrentDayStatus()

  return (
    <section className="relative bg-warm-white" id="location" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-candy-pink mb-4" style={{ fontSize: "var(--fs-h2)" }}>
            Visit Our Shop
          </h2>
          <p className="text-lg text-soft-gray max-w-2xl mx-auto">
            Located in the heart of Newtown Square, we&apos;re here to make your sweet dreams come true.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="card">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-deep-berry mb-2 flex items-center gap-3" style={{ fontFamily: "var(--font-heading)" }}>
                Store Hours
                <Badge variant={status === "open" ? "default" : "secondary"}>
                  {status === "open" ? "Open Now" : "Closed"}
                </Badge>
              </h3>
            </div>
            <div className="space-y-4">
              {hours.map((schedule) => (
                <div key={schedule.day} className="flex justify-between items-center py-3 border-b border-[rgba(255,107,157,0.1)] last:border-b-0">
                  <span className="font-semibold text-dark-chocolate">{schedule.day}</span>
                  <span className="text-soft-gray">{schedule.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-cream rounded-xl">
              <p className="text-sm text-dark-chocolate/80">
                <strong>Holiday Hours:</strong> Hours may vary during holidays. Call ahead to confirm or check our Instagram for updates.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-deep-berry" style={{ fontFamily: "var(--font-heading)" }}>
                Location & Contact
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-dark-chocolate mb-2">Address</h4>
                <p className="text-soft-gray">
                  3605 Chapel Rd<br />
                  Newtown Square, PA 19073
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-dark-chocolate mb-2">Phone</h4>
                <a
                  href="tel:+12675889191"
                  className="text-candy-pink hover:text-deep-berry transition-colors font-medium"
                >
                  (267) 588-9191
                </a>
              </div>

              <div>
                <h4 className="font-semibold text-dark-chocolate mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/share/1N4rW7vem6/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-candy-pink/10 hover:bg-deep-berry flex items-center justify-center text-candy-pink hover:text-cream transition-all"
                    aria-label="Visit us on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/googahlinis_candy?igsh=MXRncXZ0MHQ3amM3dQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-candy-pink/10 hover:bg-deep-berry flex items-center justify-center text-candy-pink hover:text-cream transition-all"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://m.yelp.com/biz/googahlinis-candy-land-newtown-square"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-candy-pink/10 hover:bg-deep-berry flex items-center justify-center text-candy-pink hover:text-cream transition-all"
                    aria-label="Review us on Yelp"
                  >
                    <Star className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@googahliniscandyland?_r=1&_t=ZM-91N25TETML5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-candy-pink/10 hover:bg-deep-berry flex items-center justify-center text-candy-pink hover:text-cream transition-all"
                    aria-label="Follow us on TikTok"
                  >
                    <Music className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <StoreMap />
              </div>
            </div>
          </div>
        </div>
      </div>

      <WavyDivider position="bottom" color="var(--warm-white)" />
    </section>
  )
}