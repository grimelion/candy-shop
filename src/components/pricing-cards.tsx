"use client";

import { WavyDivider } from "@/components/wavy-divider";

interface PricingTier {
  name: string;
  description: string;
  price: string;
  priceDescription: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
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
      "Same-day pickup available",
    ],
    ctaText: "Order Small Board",
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
      "Gift wrapping included",
    ],
    popular: true,
    ctaText: "Order Medium Board",
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
      "Perfect for corporate events",
    ],
    ctaText: "Order Large Board",
  },
];

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
      "Ships nationwide",
    ],
    ctaText: "Order Gift Basket",
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
      "Perfect for client gifts",
    ],
    popular: true,
    ctaText: "Order Premium Basket",
  },
];

interface PricingCardProps {
  tier: PricingTier;
}

function PricingCard({ tier }: PricingCardProps) {
  return (
    <div className={`pricing-card ${tier.popular ? "featured" : ""}`}>
      <div className="text-center mb-6">
        <h3
          className="text-2xl font-bold mb-2 text-deep-berry"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {tier.name}
        </h3>
        <p className="text-sm text-soft-gray mb-4">{tier.description}</p>
        <div className="text-5xl font-bold text-deep-berry mb-2">
          {tier.price}
        </div>
        <p className="text-sm text-soft-gray">{tier.priceDescription}</p>
      </div>
      <ul className="space-y-3 mb-6">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <span className="text-candy-pink font-bold text-lg">✓</span>
            <span className="text-dark-chocolate">{feature}</span>
          </li>
        ))}
      </ul>
      {/* <a
        href="#contact"
        className={`btn-${
          tier.popular ? "primary" : "secondary"
        } w-full block text-center`}
      >
        {tier.ctaText}
      </a> */}
    </div>
  );
}

export function PricingCards() {
  return (
    <section
      className="relative bg-cream"
      id="pricing"
      style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      <WavyDivider position="top" color="var(--cream)" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center mb-12">
          <h2
            className="section-title text-deep-berry mb-4"
            style={{ fontSize: "var(--fs-h2)" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-soft-gray text-lg max-w-2xl mx-auto">
            Starting prices for our most popular offerings. All orders are
            custom-made, so final pricing depends on your specific requirements.
          </p>
        </div>
        {/* Chocolate Boards */}
        <div className="mb-16">
          <h3
            className="text-3xl font-semibold text-center mb-8 text-deep-berry"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Chocolate Charcuterie Boards
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={index} tier={tier} />
            ))}
          </div>
        </div>
        {/* Gift Baskets */}
        <div className="mb-12">
          <h3
            className="text-3xl font-semibold text-center mb-8 text-deep-berry"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Gift Baskets
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {giftBasketTiers.map((tier, index) => (
              <PricingCard key={index} tier={tier} />
            ))}
          </div>
        </div>
        {/* Custom Events */}
        {/* 
        <div className="text-center">
          <div className="pricing-card max-w-md mx-auto">
            <div className="text-center mb-6">
              <h3
                className="text-2xl font-bold mb-2 text-deep-berry"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Custom Events & Corporate Orders
              </h3>
              <p className="text-sm text-soft-gray mb-4">
                Wedding candy bars, corporate gifts, and large events
              </p>
              <div className="text-4xl font-bold text-deep-berry mb-2">
                Custom Quote
              </div>
            </div>
            <p className="text-sm text-dark-chocolate/80 mb-6">
              Every event is unique. Let&apos;s create something perfect for
              your occasion.
            </p>
            <a href="#contact" className="btn-primary w-full block text-center">
              Get Custom Quote
            </a>
          </div>
        </div>
*/}
        <div className="text-center mt-8">
          <p className="text-sm text-soft-gray">
            All prices include consultation and custom design. Additional
            charges may apply for rush orders, special dietary requirements, or
            premium packaging options.
          </p>
        </div>
      </div>

      <WavyDivider position="bottom" color="var(--cream)" />
    </section>
  );
}
