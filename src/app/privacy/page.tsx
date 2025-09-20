import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: October 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                When you visit Googahlini&apos;s Candy Land or use our services, we may collect:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Contact information (name, email, phone number)</li>
                <li>Order details and preferences</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Website usage data through cookies and analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and our services</li>
                <li>Improve our website and customer experience</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Service providers who help us operate our business</li>
                <li>Payment processors for transaction processing</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or our data practices, please contact us:
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
      <SiteFooter />
    </>
  )
}