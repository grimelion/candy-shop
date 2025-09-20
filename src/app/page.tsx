import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { FeatureCards } from "@/components/feature-cards";
import { InstagramFeed } from "@/components/instagram-feed";
import { PricingCards } from "@/components/pricing-cards";
import { B2bStrip } from "@/components/b2b-strip";
import { Testimonials } from "@/components/testimonials";
import { LocationHours } from "@/components/location-hours";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/content/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: "https://googahlinis.com",
    telephone: siteConfig.phone,
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$",
    image: "https://googahlinis.com/og-image.jpg",
    sameAs: [
      "https://www.instagram.com/googahlinis_candy/",
      "https://www.yelp.com/biz/googahlinis-candy-land-newtown-square"
    ],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://googahlinis.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <FeatureCards />
        {/* <InstagramFeed /> */}
        <PricingCards />
        <B2bStrip />
        <Testimonials />
        <LocationHours />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
