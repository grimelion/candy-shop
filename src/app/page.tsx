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
    image: "https://googahlinis.com/og-image.jpg",
    sameAs: [
      "https://www.instagram.com/googahlinis_candy/",
      "https://www.yelp.com/biz/googahlinis-candy-land-newtown-square",
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
      <main className="overflow-hidden">
        <Hero />
        <FeatureCards />
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
        <PricingCards />
        <B2bStrip />
        <Testimonials />
        <LocationHours />
        {/* <ContactForm /> */}
      </main>
      <SiteFooter />
    </>
  );
}
