import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { OrderFormSection } from "@/components/order-form-section";
import { getSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Order Chocolate Boards",
  description: "Order our handcrafted chocolate charcuterie boards. Pick your size and we'll have it ready for pickup or delivery.",
  keywords: ["order", "chocolate boards", "candy", "charcuterie", "candy boards", "Philadelphia"],
  openGraph: {
    title: "Order Chocolate Boards | Googahlini's Candy Land",
    description: "Order our handcrafted chocolate charcuterie boards. Pick your size and we'll have it ready for pickup or delivery.",
  }
};

export default async function OrderPage() {
  const config = await getSiteConfig();

  return (
    <>
      <SiteHeader storeName={config.storeName} phone={config.phone} />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6">Order Now</Badge>
              <h1
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Order a Chocolate Board
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Pick your board size and leave your details. We&apos;ll reach out
                to confirm your order and arrange pickup or delivery. Perfect for
                parties, gifts, or treating yourself!
              </p>
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <OrderFormSection boards={config.boards} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter
        storeName={config.storeName}
        tagline={config.tagline}
        phone={config.phone}
        address={config.address}
        hours={config.hours}
      />
    </>
  );
}
