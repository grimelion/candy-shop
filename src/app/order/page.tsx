import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { OrderFormSection } from "@/components/order-form-section";

export const metadata: Metadata = {
  title: "Order Chocolate Boards",
  description: "Order custom chocolate charcuterie boards for any occasion. Choose your size and we'll create a beautiful, delicious board just for you.",
  keywords: ["order", "chocolate boards", "custom candy", "charcuterie", "candy boards", "Philadelphia"],
  openGraph: {
    title: "Order Chocolate Boards | Googahlini's Candy Land",
    description: "Order custom chocolate charcuterie boards for any occasion. Choose your size and we'll create a beautiful, delicious board just for you.",
  }
};

export default function OrderPage() {
  return (
    <>
      <SiteHeader />
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
                Create Your Perfect Chocolate Board
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Choose your board size, fill in your details, and we&apos;ll craft a
                stunning chocolate charcuterie board just for you. Perfect for
                parties, gifts, or treating yourself!
              </p>
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <OrderFormSection />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
