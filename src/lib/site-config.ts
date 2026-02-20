import { list, put } from "@vercel/blob";
import type { BoardSize, FeaturedItem, SiteConfig, Testimonial } from "@/types/site-config";

export type { BoardSize, FeaturedItem, SiteConfig, Testimonial };

const DEFAULT_CONFIG: SiteConfig = {
  // Store info (from src/content/site.ts)
  storeName: "Googahlini's Candy Land",
  tagline: "Locally owned candy shop with classic favorites and artisanal treats",
  phone: "+1-267-588-9191",
  address: "3605 Chapel Rd, Newtown Square, PA 19073",
  hours: {
    sunday: "11:00 AM - 4:00 PM",
    monday: "10:00 AM - 7:30 PM",
    tuesday: "10:00 AM - 7:30 PM",
    wednesday: "10:00 AM - 7:30 PM",
    thursday: "10:00 AM - 7:30 PM",
    friday: "10:00 AM - 7:30 PM",
    saturday: "10:00 AM - 5:00 PM",
  },
  social: {
    facebook: "",
    instagram: "https://www.instagram.com/googahlinis_candy/",
    yelp: "https://www.yelp.com/biz/googahlinis-candy-land-newtown-square",
  },

  // Section content (from src/content/sections.ts)
  hero: {
    headline: "Handcrafted Confections That Wow",
    subhead:
      "Premium chocolate boards, custom candy gifts, and unforgettable event setups. Made fresh. Delivered perfect.",
    primaryCTA: "Call Us",
  },
  featured: {
    title: "What We Create",
    items: [
      {
        title: "Chocolate Charcuterie",
        description:
          "Instagram-worthy boards that taste even better than they look. Perfect for date nights, parties, or treating yourself.",
        image: "/images/chocolate-boards.jpg",
      },
      {
        title: "Gift Baskets That Impress",
        description:
          "Curated collections of premium treats. Skip the generic - give something they'll actually remember.",
        image: "/images/candy-baskets.jpg",
      },
      {
        title: "Event Candy Stations",
        description:
          "Turn your celebration into an experience. Custom setups that get guests talking.",
        image: "/images/event-candy-bars.jpg",
      },
    ],
  },
  gallery: {
    title: "See The Magic",
    description:
      "Real creations. Real reactions. Browse our latest masterpieces.",
  },
  b2b: {
    title: "Make Work Sweeter",
    description:
      "Boost morale, impress clients, and create memorable moments. We handle the details.",
    services: [
      "Monthly office treats that actually get eaten",
      "Event setups that wow your guests",
      "Custom packaging with your branding",
      "Volume pricing that makes sense",
    ],
  },
  testimonials: {
    title: "Happy Customers",
    items: [
      {
        name: "Sarah M.",
        review:
          "Ordered for our anniversary - it was perfect! Beautiful presentation and everything tasted incredible.",
        rating: 5,
      },
      {
        name: "Mike R.",
        review:
          "Game changer for our office events. Our clients still talk about the candy station months later.",
        rating: 5,
      },
      {
        name: "Jessica L.",
        review:
          "Best gift basket I've ever given. My sister was blown away. Worth every penny.",
        rating: 5,
      },
    ],
  },
  location: {
    title: "Find Us",
    description:
      "Come taste, browse, and see what makes us different. Right here in Newtown Square.",
  },

  // Board config (from src/components/board-size-selector.tsx)
  boards: [
    {
      id: "small",
      name: "Small Chocolate Board",
      price: "Starting at $45",
      weight: "1lb",
      serves: "1-3 people",
      description:
        "A thoughtful curated selection of mixed chocolates including milk, dark & seasonal",
      imageUrl: "/images/boards/small.jpeg",
      popular: false,
    },
    {
      id: "medium",
      name: "Medium Chocolate Board",
      price: "Starting at $85",
      weight: "3lbs",
      serves: "6-10 people",
      description:
        "A generous assortment of mixed chocolates with a balance of classic and gourmet. Salted caramels, chocolate pretzels, mix of chocolate nuts & specialty confections",
      imageUrl: "/images/boards/medium.jpeg",
      popular: true,
    },
    {
      id: "large",
      name: "Large Chocolate Board",
      price: "Starting at $160",
      weight: "6lbs",
      serves: "12-15 people",
      description:
        "A show stopping centerpiece offering an abundant display of milk & dark chocolates, small batch caramels & truffles perfect for every chocolate lover",
      imageUrl: "/images/boards/large.jpeg",
      popular: false,
    },
  ],
};

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return DEFAULT_CONFIG;

    const { blobs } = await list({ prefix: "site-config.json", token });
    if (!blobs.length) return DEFAULT_CONFIG;

    const res = await fetch(blobs[0].url, { next: { revalidate: 60 } });
    if (!res.ok) return DEFAULT_CONFIG;

    const config = await res.json();
    return { ...DEFAULT_CONFIG, ...config }; // merge so new fields always have defaults
  } catch {
    return DEFAULT_CONFIG;
  }
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN not set");

  await put("site-config.json", JSON.stringify(config, null, 2), {
    access: "public",
    addRandomSuffix: false,
    token,
    contentType: "application/json",
  });
}

export async function uploadBoardImage(
  boardId: string,
  file: File
): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN not set");

  const ext = file.name.split(".").pop() ?? "jpg";
  const blob = await put(`boards/${boardId}.${ext}`, file, {
    access: "public",
    addRandomSuffix: false,
    token,
  });
  return blob.url;
}
