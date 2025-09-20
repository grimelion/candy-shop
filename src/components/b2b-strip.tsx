import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function B2bStrip() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Sweeten Your Business
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Elevate your corporate events, client meetings, and office celebrations with our custom candy solutions.
                </p>
                <ul className="space-y-2 text-muted-foreground mb-8">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Office candy bars and break room setups
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Corporate gift baskets and client appreciation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Event catering with chocolate charcuterie boards
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Branded packaging and custom favors
                  </li>
                </ul>
              </div>

              <div className="text-center md:text-right">
                <div className="bg-background/50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Volume Discounts Available
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Perfect for regular office deliveries, large events, and ongoing partnerships.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full md:w-auto">
                    Get B2B Quote
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    <p>📞 (267) 588-9191</p>
                    <p>Quick response guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}