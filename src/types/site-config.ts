export interface BoardSize {
  id: string;
  name: string;
  price: string;
  weight: string;
  serves: string;
  description: string;
  imageUrl: string; // URL (Vercel Blob or /public path)
  popular: boolean;
}

export interface Testimonial {
  name: string;
  review: string;
  rating: number;
}

export interface FeaturedItem {
  title: string;
  description: string;
  image: string;
}

export interface SiteConfig {
  // Store info (from site.ts)
  storeName: string;
  tagline: string;
  phone: string;
  address: string;
  hours: {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
  };
  social: {
    instagram: string;
    yelp: string;
    facebook: string;
  };

  // Section content (from sections.ts)
  hero: {
    headline: string;
    subhead: string;
    primaryCTA: string;
  };
  featured: {
    title: string;
    items: FeaturedItem[];
  };
  gallery: {
    title: string;
    description: string;
  };
  b2b: {
    title: string;
    description: string;
    services: string[];
  };
  testimonials: {
    title: string;
    items: Testimonial[];
  };
  location: {
    title: string;
    description: string;
  };

  // Board config (from board-size-selector.tsx)
  boards: BoardSize[];
}
