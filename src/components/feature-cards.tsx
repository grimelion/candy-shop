import type { FeaturedItem } from "@/types/site-config"

interface FeatureCardsProps {
  featured: {
    title: string;
    items: FeaturedItem[];
  };
}

export function FeatureCards({ featured }: FeatureCardsProps) {
  const icons = ["🍫", "🎁", "🍭"];

  return (
    <section className="relative bg-candy-pink" id="products" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Wavy divider top */}
      <div className="absolute top-0 left-0 right-0 h-20 -translate-y-1/2">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
            fill="var(--candy-pink)"
          />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="section-title text-white" style={{ fontSize: "var(--fs-h2)" }}>
              {featured.title}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover our range of premium candy creations, perfect for every occasion
            </p>
          </div>
        </div>

        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="md:hidden overflow-x-auto scrollbar-hide px-4">
          <div className="flex gap-4 pb-4" style={{ scrollSnapType: 'x mandatory' }}>
            {featured.items.map((item, index) => (
              <div
                key={index}
                className="category-card flex-shrink-0 w-[280px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="icon text-6xl mb-4">
                  {icons[index]}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-deep-berry" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-dark-chocolate/80 mb-6">
                  {item.description}
                </p>
                <a href="#contact" className="btn-secondary inline-block px-8 py-3">
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:block container mx-auto px-8">
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featured.items.map((item, index) => (
              <div key={index} className="category-card">
                <div className="icon text-6xl mb-4">
                  {icons[index]}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-deep-berry" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-dark-chocolate/80 mb-6">
                  {item.description}
                </p>
                <a href="#contact" className="btn-secondary inline-block px-8 py-3">
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wavy divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 translate-y-1/2 rotate-180">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
            fill="var(--candy-pink)"
          />
        </svg>
      </div>
    </section>
  )
}