import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const hours = [
  { day: "Monday", time: "10:00 AM - 7:00 PM" },
  { day: "Tuesday", time: "10:00 AM - 7:00 PM" },
  { day: "Wednesday", time: "10:00 AM - 7:00 PM" },
  { day: "Thursday", time: "10:00 AM - 8:00 PM" },
  { day: "Friday", time: "10:00 AM - 8:00 PM" },
  { day: "Saturday", time: "9:00 AM - 8:00 PM" },
  { day: "Sunday", time: "11:00 AM - 6:00 PM" }
]

function getCurrentDayStatus() {
  const now = new Date()
  const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const currentTime = now.getHours() * 100 + now.getMinutes()

  const todaysHours = hours[currentDay === 0 ? 6 : currentDay - 1] // Adjust for Sunday being index 6 in our array

  if (todaysHours.day === "Sunday") {
    return currentTime >= 1100 && currentTime < 1800 ? "open" : "closed"
  } else if (todaysHours.day === "Saturday") {
    return currentTime >= 900 && currentTime < 2000 ? "open" : "closed"
  } else if (todaysHours.day === "Thursday" || todaysHours.day === "Friday") {
    return currentTime >= 1000 && currentTime < 2000 ? "open" : "closed"
  } else {
    return currentTime >= 1000 && currentTime < 1900 ? "open" : "closed"
  }
}

export function LocationHours() {
  const status = getCurrentDayStatus()

  return (
    <section className="bg-warm-white" id="location" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="container mx-auto px-8">
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
                <h4 className="font-semibold text-dark-chocolate mb-2">Follow Us</h4>
                <a
                  href="https://instagram.com/googahlinis_candy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-candy-pink hover:text-deep-berry transition-colors font-medium"
                >
                  @googahlinis_candy
                </a>
              </div>

              <div className="mt-6">
                <div className="aspect-video bg-cream rounded-2xl flex items-center justify-center border border-[rgba(255,107,157,0.1)]">
                  <p className="text-soft-gray text-sm">
                    Map integration coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}