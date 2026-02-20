import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { FeatureCards } from "@/components/feature-cards";
import PhotoGallery from "@/components/PhotoGallery";
import { PricingCards } from "@/components/pricing-cards";
import { B2bStrip } from "@/components/b2b-strip";
import { Testimonials } from "@/components/testimonials";
import { LocationHours } from "@/components/location-hours";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { WavyDivider } from "@/components/wavy-divider";
import { StickyOrderBar } from "@/components/sticky-order-bar";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getSiteConfig } from "@/lib/site-config";

export default async function Home() {
  const config = await getSiteConfig();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Store", "LocalBusiness"],
    "@id": "https://www.googahliniscandy.com/#organization",
    name: config.storeName,
    alternateName: "Googahlini's Candy Land",
    description: config.tagline,
    url: "https://www.googahliniscandy.com",
    telephone: config.phone,
    email: "contact@googahlinis.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3605 Chapel Rd",
      addressLocality: "Newtown Square",
      addressRegion: "PA",
      postalCode: "19073",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "39.9526",
      longitude: "-75.3902",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$",
    image: "https://www.googahliniscandy.com/og-image.jpg",
    logo: "https://www.googahliniscandy.com/og-image.jpg",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    servesCuisine: "Candy & Confectionery",
    hasMap: "https://www.google.com/maps/search/?api=1&query=Googahlini's+Candy+Land+Newtown+Square+PA",
    sameAs: [
      "https://www.facebook.com/share/1N4rW7vem6/?mibextid=wwXIfr",
      "https://www.instagram.com/googahlinis_candy?igsh=MXRncXZ0MHQ3amM3dQ==",
      "https://m.yelp.com/biz/googahlinis-candy-land-newtown-square",
      "https://www.tiktok.com/@googahliniscandyland?_r=1&_t=ZM-91N25TETML5",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "50",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.googahliniscandy.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader storeName={config.storeName} phone={config.phone} />
      <main className="overflow-hidden">
        <Hero phone={config.phone} />

        <ScrollReveal>
          <FeatureCards featured={config.featured} />
        </ScrollReveal>

        <ScrollReveal>
          <section className="relative py-16 bg-gradient-to-b from-white to-gray-50">
            <WavyDivider position="top" color="white" />

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Our Sweet Gallery
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore our collection of handcrafted candy boards, custom gift
                  arrangements, and special event treats
                </p>
              </div>
              <PhotoGallery />
            </div>

            <WavyDivider position="bottom" color="rgb(249, 250, 251)" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PricingCards />
        </ScrollReveal>

        <ScrollReveal>
          <B2bStrip />
        </ScrollReveal>

        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>

        <ScrollReveal>
          <LocationHours />
        </ScrollReveal>

        <ScrollReveal>
          <ContactForm />
        </ScrollReveal>
      </main>
      <SiteFooter
        storeName={config.storeName}
        tagline={config.tagline}
        phone={config.phone}
        address={config.address}
        hours={config.hours}
      />
      <StickyOrderBar phone={config.phone} />
    </>
  );
}
