import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { sections } from "@/content/sections"

export function FeatureCards() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            {sections.featured.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our range of premium candy creations, perfect for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.featured.items.map((item, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader className="space-y-4">
                {/* Placeholder Image */}
                <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gradient-to-br from-accent/20 to-secondary/30">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="text-center space-y-2">
                      <div className="text-4xl">
                        {index === 0 ? "🍫" : index === 1 ? "🎁" : "🍭"}
                      </div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs">4:3 Aspect Ratio</p>
                    </div>
                  </div>
                </div>

                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  {item.description}
                </CardDescription>

                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}