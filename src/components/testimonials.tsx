"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const testimonials = [
  {
    id: "testimonial-1",
    name: "Sarah M.",
    text: "The chocolate charcuterie board was absolutely stunning! Perfect for our anniversary celebration. The attention to detail and quality of chocolates was exceptional.",
    occasion: "Anniversary Celebration"
  },
  {
    id: "testimonial-2",
    name: "Michael K.",
    text: "Googahlini's created the most amazing candy bar for our wedding. Guests are still talking about it months later. Professional, creative, and delicious!",
    occasion: "Wedding Event"
  },
  {
    id: "testimonial-3",
    name: "Jennifer L.",
    text: "I order custom gift baskets for my clients and they never disappoint. Beautiful presentation and they always include a perfect mix of nostalgic and unique treats.",
    occasion: "Corporate Gifts"
  },
  {
    id: "testimonial-4",
    name: "David R.",
    text: "The shop has such a warm, welcoming atmosphere. The owner helped me create the perfect custom favor bags for my daughter's birthday party. Highly recommend!",
    occasion: "Birthday Party"
  },
  {
    id: "testimonial-5",
    name: "Lisa T.",
    text: "Their seasonal gift bundles are perfect for holidays. The Halloween collection was creative and beautifully packaged. Already planning my Christmas order!",
    occasion: "Holiday Gifts"
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from families, couples, and businesses who&apos;ve shared sweet moments with us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {testimonials.map((testimonial) => (
              <AccordionItem key={testimonial.id} value={testimonial.id}>
                <AccordionTrigger className="text-left">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-foreground">{testimonial.name}</span>
                    <span className="text-sm text-muted-foreground">{testimonial.occasion}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}