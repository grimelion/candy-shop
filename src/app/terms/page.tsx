import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getSiteConfig } from "@/lib/site-config"

export default async function TermsPage() {
  const config = await getSiteConfig()

  return (
    <>
      <SiteHeader storeName={config.storeName} phone={config.phone} />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: October 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By visiting Googahlini&apos;s Candy Land, making a purchase, or using our services,
                you agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Products and Services</h2>
              <p className="text-muted-foreground mb-4">
                Googahlini&apos;s Candy Land offers:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Retail candy sales</li>
                <li>Custom candy gift baskets and arrangements</li>
                <li>Chocolate charcuterie boards</li>
                <li>Event candy bars and catering services</li>
                <li>Corporate and B2B candy services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Orders and Payment</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All orders are subject to availability and confirmation</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment is required at the time of order unless other arrangements are made</li>
                <li>Custom orders may require a deposit</li>
                <li>We reserve the right to refuse any order</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cancellation and Refunds</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Custom orders cancelled within 24 hours may receive a full refund</li>
                <li>Orders cancelled after production has begun may be subject to fees</li>
                <li>Perishable items cannot be returned unless defective</li>
                <li>Event orders require 48-72 hours notice for cancellation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Food Safety and Allergies</h2>
              <p className="text-muted-foreground mb-4">
                <strong>Important:</strong> Our products may contain or come into contact with common allergens including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Nuts (tree nuts, peanuts)</li>
                <li>Dairy products</li>
                <li>Gluten</li>
                <li>Soy</li>
                <li>Eggs</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Please inform us of any allergies when placing your order. While we take precautions,
                we cannot guarantee that our products are free from allergens.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Googahlini&apos;s Candy Land shall not be liable for any indirect, incidental, special,
                or consequential damages arising from the use of our products or services.
                Our liability is limited to the purchase price of the products.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective
                immediately upon posting on our website. Continued use of our services constitutes
                acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these terms or our services, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                <p className="text-foreground font-semibold">Googahlini&apos;s Candy Land</p>
                <p className="text-muted-foreground">3605 Chapel Rd, Newtown Square, PA 19073</p>
                <p className="text-muted-foreground">Phone: (267) 588-9191</p>
                <p className="text-muted-foreground">Instagram: @googahlinis_candy</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter
        storeName={config.storeName}
        tagline={config.tagline}
        phone={config.phone}
        address={config.address}
        hours={config.hours}
      />
    </>
  )
}