export const navigation = {
  main: [
    { name: "Home", href: "/", description: "Welcome to our candy shop" },
    { name: "Gifts", href: "#gifts", description: "Custom candy gifts and baskets" },
    { name: "Candy Boards", href: "#boards", description: "Chocolate charcuterie boards" },
    { name: "Events", href: "#events", description: "Event candy bars and setups" },
    { name: "Contact", href: "#contact", description: "Get in touch with us" }
  ],
  cta: [
    { name: "Order Gifts", href: "#contact", variant: "outline" as const, description: "Place an order for custom gifts" },
    { name: "Book Candy Bar", href: "#contact", variant: "default" as const, description: "Book an event candy bar setup" }
  ]
} as const;