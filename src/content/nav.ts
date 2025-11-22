export const navigation = {
  main: [
    { name: "Home", href: "/", description: "Welcome to our candy shop" },
    { name: "Gifts", href: "#gifts", description: "Custom candy gifts and baskets" },
    { name: "Candy Boards", href: "#boards", description: "Chocolate charcuterie boards" },
    { name: "Events", href: "#events", description: "Event candy bars and setups" },
    { name: "Contact", href: "#contact", description: "Get in touch with us" }
  ],
  cta: [
    { name: "Contact Us", href: "#contact", variant: "outline" as const, description: "Get in touch with us" },
    { name: "Call Now", href: "tel:+12675889191", variant: "default" as const, description: "Call us directly" }
  ]
} as const;