import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080/8B4513/FFFFFF?text=Chocolate+Charcuterie+Board"
          alt="Beautiful artisanal chocolate charcuterie board"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-8 py-16 relative z-10">
        <div className="max-w-[700px]">
          <h1 className="hero-title text-white mb-6">
            Handcrafted Confections That Wow
          </h1>
          <p className="text-white text-xl mb-8 leading-relaxed opacity-95">
            From custom chocolate boards to rare candy flavors, we create Instagram-worthy treats that taste as amazing as they look.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              Order Your Creation
            </a>
            <a href="#products" className="btn-secondary">
              View Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}