"use client"

import { WavyDivider } from "@/components/wavy-divider"

const testimonials = [
  {
    id: "testimonial-1",
    name: "Sarah M.",
    initials: "SM",
    text: "The chocolate charcuterie board was absolutely stunning! Perfect for our anniversary celebration. The attention to detail and quality of chocolates was exceptional.",
    occasion: "Anniversary Celebration",
    rating: 5
  },
  {
    id: "testimonial-2",
    name: "Michael K.",
    initials: "MK",
    text: "Googahlini's created the most amazing candy bar for our wedding. Guests are still talking about it months later. Professional, creative, and delicious!",
    occasion: "Wedding Event",
    rating: 5
  },
  {
    id: "testimonial-3",
    name: "Jennifer L.",
    initials: "JL",
    text: "I order custom gift baskets for my clients and they never disappoint. Beautiful presentation and they always include a perfect mix of nostalgic and unique treats.",
    occasion: "Corporate Gifts",
    rating: 5
  },
  {
    id: "testimonial-4",
    name: "David R.",
    initials: "DR",
    text: "The shop has such a warm, welcoming atmosphere. The owner helped me create the perfect custom favor bags for my daughter's birthday party. Highly recommend!",
    occasion: "Birthday Party",
    rating: 5
  },
  {
    id: "testimonial-5",
    name: "Lisa T.",
    initials: "LT",
    text: "Their seasonal gift bundles are perfect for holidays. The Halloween collection was creative and beautifully packaged. Already planning my Christmas order!",
    occasion: "Holiday Gifts",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="relative bg-warm-white" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <WavyDivider position="top" color="var(--warm-white)" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-deep-berry mb-4" style={{ fontSize: "var(--fs-h2)" }}>
            What Our Customers Say
          </h2>
          <p className="text-lg text-soft-gray max-w-2xl mx-auto">
            Real stories from families, couples, and businesses who&apos;ve shared sweet moments with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-white rounded-[20px] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-l-4 border-candy-pink relative"
            >
              {/* Pink Quote Mark */}
              <div
                className="absolute top-[-10px] left-[20px] text-[4rem] text-candy-pink opacity-30 leading-none select-none"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                &ldquo;
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-candy-pink text-lg">★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[1.125rem] leading-relaxed text-dark-chocolate mb-6 italic relative z-10">
                {testimonial.text}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-[50px] h-[50px] rounded-full bg-candy-pink flex items-center justify-center text-white font-semibold text-lg shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-deep-berry mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-soft-gray">
                    {testimonial.occasion}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <WavyDivider position="bottom" color="var(--warm-white)" />
    </section>
  )
}
