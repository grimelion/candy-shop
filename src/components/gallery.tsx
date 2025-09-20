import Image from "next/image"

const galleryImages = [
  {
    src: "https://placehold.co/400x300/8B4513/FFFFFF?text=Chocolate+Board",
    alt: "Artisanal chocolate charcuterie board with variety of chocolates",
    width: 400,
    height: 300
  },
  {
    src: "https://placehold.co/400x300/FF69B4/FFFFFF?text=Gift+Basket",
    alt: "Custom candy gift basket with colorful assorted candies",
    width: 400,
    height: 300
  },
  {
    src: "https://placehold.co/400x300/FF6347/FFFFFF?text=Event+Candy+Bar",
    alt: "Event candy bar setup with jars of penny candies",
    width: 400,
    height: 300
  },
  {
    src: "https://placehold.co/400x300/DDA0DD/FFFFFF?text=Shop+Interior",
    alt: "Warm and welcoming candy shop interior",
    width: 400,
    height: 300
  },
  {
    src: "https://placehold.co/400x300/FFB6C1/FFFFFF?text=Artisanal+Sweets",
    alt: "Local and international artisanal sweets display",
    width: 400,
    height: 300
  },
  {
    src: "https://placehold.co/400x300/98FB98/FFFFFF?text=Custom+Favors",
    alt: "Custom candy favors for special occasions",
    width: 400,
    height: 300
  }
]

export function Gallery() {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sweet Moments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From artisanal chocolates to custom event setups, every creation is crafted with care and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-muted/20 aspect-[4/3] hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}