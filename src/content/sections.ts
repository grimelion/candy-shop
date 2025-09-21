export const sections = {
  hero: {
    headline: "Handcrafted Confections That Wow",
    subhead: "Premium chocolate boards, custom candy gifts, and unforgettable event setups. Made fresh. Delivered perfect.",
    primaryCTA: "Order Your Creation"
  },
  featured: {
    title: "What We Create",
    items: [
      {
        title: "Chocolate Charcuterie",
        description: "Instagram-worthy boards that taste even better than they look. Perfect for date nights, parties, or treating yourself.",
        image: "/images/chocolate-boards.jpg"
      },
      {
        title: "Gift Baskets That Impress",
        description: "Curated collections of premium treats. Skip the generic - give something they'll actually remember.",
        image: "/images/candy-baskets.jpg"
      },
      {
        title: "Event Candy Stations",
        description: "Turn your celebration into an experience. Custom setups that get guests talking.",
        image: "/images/event-candy-bars.jpg"
      }
    ]
  },
  gallery: {
    title: "See The Magic",
    description: "Real creations. Real reactions. Browse our latest masterpieces."
  },
  b2b: {
    title: "Make Work Sweeter",
    description: "Boost morale, impress clients, and create memorable moments. We handle the details.",
    services: [
      "Monthly office treats that actually get eaten",
      "Event setups that wow your guests",
      "Custom packaging with your branding",
      "Volume pricing that makes sense"
    ]
  },
  testimonials: {
    title: "Happy Customers",
    items: [
      {
        name: "Sarah M.",
        review: "Ordered for our anniversary - it was perfect! Beautiful presentation and everything tasted incredible.",
        rating: 5
      },
      {
        name: "Mike R.",
        review: "Game changer for our office events. Our clients still talk about the candy station months later.",
        rating: 5
      },
      {
        name: "Jessica L.",
        review: "Best gift basket I've ever given. My sister was blown away. Worth every penny.",
        rating: 5
      }
    ]
  },
  location: {
    title: "Find Us",
    description: "Come taste, browse, and see what makes us different. Right here in Newtown Square."
  }
} as const;