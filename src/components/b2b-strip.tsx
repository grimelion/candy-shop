import { WavyDivider } from "@/components/wavy-divider"

export function B2bStrip() {
  return (
    <section className="relative bg-mint-green" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <WavyDivider position="top" color="var(--mint-green)" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-deep-berry mb-4" style={{ fontSize: "var(--fs-h2)" }}>
                Sweeten Your Business
              </h2>
              <p className="text-lg text-dark-chocolate mb-8 leading-relaxed">
                Elevate your corporate events, client meetings, and office celebrations with our custom candy solutions.
              </p>
              <ul className="space-y-3 text-dark-chocolate mb-8">
                <li className="flex items-center">
                  <span className="text-candy-pink font-bold text-xl mr-3">✓</span>
                  Office candy bars and break room setups
                </li>
                <li className="flex items-center">
                  <span className="text-candy-pink font-bold text-xl mr-3">✓</span>
                  Corporate gift baskets and client appreciation
                </li>
                <li className="flex items-center">
                  <span className="text-candy-pink font-bold text-xl mr-3">✓</span>
                  Event catering with chocolate charcuterie boards
                </li>
                <li className="flex items-center">
                  <span className="text-candy-pink font-bold text-xl mr-3">✓</span>
                  Branded packaging and custom favors
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <div className="bg-white/80 rounded-2xl p-8 mb-6 shadow-lg">
                <h3 className="text-2xl font-semibold text-deep-berry mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Volume Discounts Available
                </h3>
                <p className="text-dark-chocolate/80">
                  Perfect for regular office deliveries, large events, and ongoing partnerships.
                </p>
              </div>

              <div className="space-y-4">
                <a href="#contact" className="btn-primary inline-block px-10 py-4 text-lg">
                  Get B2B Quote
                </a>
                <div className="text-sm text-dark-chocolate">
                  <p className="font-semibold">📞 (267) 588-9191</p>
                  <p>Quick response guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WavyDivider position="bottom" color="var(--mint-green)" />
    </section>
  )
}