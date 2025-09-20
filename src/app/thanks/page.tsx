import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon, HeartIcon, PhoneIcon, MailIcon } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "@/content/site"

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for your inquiry! We'll be in touch soon to discuss your sweet creation.",
  robots: {
    index: false,
    follow: false
  }
}

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-green-700 mb-2">
                Thank You!
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                Your inquiry has been received and we&apos;re excited to help create something amazing for you.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <HeartIcon className="h-5 w-5" />
                  <span className="font-medium">We&apos;ll be in touch within 24 hours</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our team is reviewing your request and will reach out with personalized recommendations and pricing.
                </p>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4 text-center">What happens next?</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">We review your request</h4>
                      <p className="text-sm text-muted-foreground">
                        Our team considers your needs, preferences, and any special requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Personal consultation</h4>
                      <p className="text-sm text-muted-foreground">
                        We&apos;ll call or email with custom recommendations and transparent pricing.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Create your perfect order</h4>
                      <p className="text-sm text-muted-foreground">
                        Once approved, we&apos;ll handcraft your creation with care and attention to detail.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold text-center">Need immediate assistance?</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`tel:${siteConfig.phone}`}>
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      Call Us
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="mailto:hello@candyshop.com">
                      <MailIcon className="h-4 w-4 mr-2" />
                      Email Us
                    </Link>
                  </Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  <p>Office Hours: Monday-Friday {siteConfig.hours.monday}</p>
                  <p>Saturday: {siteConfig.hours.saturday} • Sunday: {siteConfig.hours.sunday}</p>
                </div>
              </div>

              <div className="border-t pt-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Want to see more of our work while you wait?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/">View Our Gallery</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/#testimonials">Read Reviews</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}