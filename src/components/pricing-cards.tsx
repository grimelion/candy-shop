"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckIcon } from "lucide-react"

interface PricingTier {
  name: string
  description: string
  price: string
  priceDescription: string
  features: string[]
  popular?: boolean
  ctaText: string
}

const pricingTiers: PricingTier[] = [
  {
    name: "Sweet Treats",
    description: "Perfect for small gatherings or personal gifts",
    price: "$45",
    priceDescription: "starting price",
    features: [
      "Small chocolate charcuterie board",
      "Serves 2-4 people",
      "Premium chocolate selection",
      "Beautiful presentation",
      "Same-day pickup available"
    ],
    ctaText: "Order Small Board"
  },
  {
    name: "Celebration Board",
    description: "Ideal for parties and special occasions",
    price: "$85",
    priceDescription: "starting price",
    features: [
      "Medium chocolate charcuterie board",
      "Serves 6-10 people",
      "Gourmet chocolate & candy mix",
      "Custom arrangement",
      "Free local delivery",
      "Gift wrapping included"
    ],
    popular: true,
    ctaText: "Order Medium Board"
  },
  {
    name: "Grand Feast",
    description: "Show-stopping centerpiece for large events",
    price: "$150",
    priceDescription: "starting price",
    features: [
      "Large chocolate charcuterie board",
      "Serves 12+ people",
      "Premium artisan selection",
      "Custom design consultation",
      "White-glove delivery",
      "Setup service available",
      "Perfect for corporate events"
    ],
    ctaText: "Order Large Board"
  }
]

const giftBasketTiers: PricingTier[] = [
  {
    name: "Sweet Surprise",
    description: "Thoughtful gift for any candy lover",
    price: "$35",
    priceDescription: "starting price",
    features: [
      "Curated candy selection",
      "Beautiful gift packaging",
      "Personal note included",
      "Perfect for birthdays",
      "Ships nationwide"
    ],
    ctaText: "Order Gift Basket"
  },
  {
    name: "Ultimate Indulgence",
    description: "Premium collection for special occasions",
    price: "$75",
    priceDescription: "starting price",
    features: [
      "Gourmet candy & chocolate mix",
      "Luxury presentation box",
      "Customizable contents",
      "Corporate branding available",
      "Express shipping options",
      "Perfect for client gifts"
    ],
    popular: true,
    ctaText: "Order Premium Basket"
  }
]

interface PricingCardProps {
  tier: PricingTier
}

function PricingCard({ tier }: PricingCardProps) {
  return (
    <Card className={`relative ${tier.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}>
      {tier.popular && (
        <Badge
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground"
        >
          Most Popular
        </Badge>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{tier.name}</CardTitle>
        <CardDescription className="text-sm">{tier.description}</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold">{tier.price}</span>
          <span className="text-muted-foreground ml-2">{tier.priceDescription}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckIcon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full"
          variant={tier.popular ? "default" : "outline"}
        >
          {tier.ctaText}
        </Button>
      </CardContent>
    </Card>
  )
}

export function PricingCards() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Starting prices for our most popular offerings. All orders are custom-made, so final pricing depends on your specific requirements.
          </p>
        </div>

        {/* Chocolate Boards */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Chocolate Charcuterie Boards</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={index} tier={tier} />
            ))}
          </div>
        </div>

        {/* Gift Baskets */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8">Gift Baskets</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {giftBasketTiers.map((tier, index) => (
              <PricingCard key={index} tier={tier} />
            ))}
          </div>
        </div>

        {/* Custom Events */}
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Custom Events & Corporate Orders</CardTitle>
              <CardDescription>
                Wedding candy bars, corporate gifts, and large events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-2xl font-bold">Custom Quote</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Every event is unique. Let&apos;s create something perfect for your occasion.
              </p>
              <Button className="w-full">Get Custom Quote</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            All prices include consultation and custom design. Additional charges may apply for rush orders, special dietary requirements, or premium packaging options.
          </p>
        </div>
      </div>
    </section>
  )
}