import { WavyDivider } from "@/components/wavy-divider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone } from "lucide-react"

interface ContactFormProps {
  showTitle?: boolean
}

export function ContactForm({ showTitle = true }: ContactFormProps) {
  return (
    <section className={showTitle ? "relative bg-cream" : ""} id="contact" style={showTitle ? { paddingTop: '6rem', paddingBottom: '6rem' } : {}}>
      {showTitle && <WavyDivider position="top" color="var(--cream)" />}

      <div className={showTitle ? "container mx-auto px-8 relative z-10" : ""}>
        {showTitle && (
          <div className="text-center mb-16">
            <h2 className="section-title text-deep-berry mb-4" style={{ fontSize: "var(--fs-h2)" }}>
              Get In Touch
            </h2>
            <p className="text-lg text-soft-gray max-w-2xl mx-auto">
              Ready to create something sweet? Give us a call to discuss your needs.
            </p>
          </div>
        )}

        <Card className={showTitle ? "max-w-2xl mx-auto card" : "card"}>
          <CardHeader className="text-center">
            <CardTitle className="text-deep-berry text-3xl" style={{ fontFamily: "var(--font-heading)" }}>Call Us</CardTitle>
            <CardDescription className="text-soft-gray">
              Speak directly with our team to discuss your custom confection needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="flex flex-col items-center gap-6">
              <div className="bg-candy-pink/10 p-4 rounded-full">
                <Phone className="w-12 h-12 text-candy-pink" />
              </div>
              <a
                href="tel:+12675889191"
                className="btn-primary text-2xl px-8 py-6 flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                (267) 588-9191
              </a>
            </div>
            <p className="text-soft-gray">
              Our team is ready to help you create the perfect custom chocolate boards, gift baskets, and event candy displays.
            </p>
          </CardContent>
        </Card>
      </div>

      {showTitle && <WavyDivider position="bottom" color="var(--cream)" />}
    </section>
  )
}