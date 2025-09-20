import { Button } from "@/components/ui/button"
import { sections } from "@/content/sections"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-primary">
                {sections.hero.headline}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {sections.hero.subhead}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                {sections.hero.primaryCTA}
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                {sections.hero.secondaryCTA}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <span className="text-primary font-semibold">★★★★★</span>
                <span>5.0 Rating</span>
              </div>
              <div>Custom Orders Welcome</div>
              <div>Local Delivery Available</div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-secondary/30">
              <Image
                src="https://placehold.co/600x600/8B4513/FFFFFF?text=Premium+Chocolate+Board"
                alt="Beautiful artisanal chocolate charcuterie board with variety of premium chocolates, nuts, and treats"
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
                unoptimized
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/40 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}