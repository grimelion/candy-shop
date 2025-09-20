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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Visit Our Shop
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Located in the heart of Newtown Square, we&apos;re here to make your sweet dreams come true.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Store Hours
                <Badge variant={status === "open" ? "default" : "secondary"}>
                  {status === "open" ? "Open Now" : "Closed"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hours.map((schedule) => (
                  <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                    <span className="font-medium text-foreground">{schedule.day}</span>
                    <span className="text-muted-foreground">{schedule.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Holiday Hours:</strong> Hours may vary during holidays. Call ahead to confirm or check our Instagram for updates.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location & Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Address</h4>
                <p className="text-muted-foreground">
                  3605 Chapel Rd<br />
                  Newtown Square, PA 19073
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Phone</h4>
                <a
                  href="tel:+12675889191"
                  className="text-primary hover:underline"
                >
                  (267) 588-9191
                </a>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Follow Us</h4>
                <a
                  href="https://instagram.com/googahlinis_candy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @googahlinis_candy
                </a>
              </div>

              <div className="mt-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    Map integration coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}