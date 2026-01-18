import type { Metadata } from "next";
import { Pacifico, Playfair_Display, Poppins, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/lib/analytics";
import { Toaster } from "@/components/ui/sonner";

// Script font for hero headlines - playful and premium
const pacifico = Pacifico({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

// Display serif for section headers - elegant and sophisticated
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

// Sans-serif for subheadings - modern and clean
const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Sans-serif for body text - highly readable
const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Handwritten for special callouts - personal touch
const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF8F0' },
    { media: '(prefers-color-scheme: dark)', color: '#2D1B2E' }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.googahliniscandy.com'),
  title: {
    default: "Googahlini's Candy Land | Classic & Artisanal Candies",
    template: "%s | Googahlini's Candy Land"
  },
  description: "Locally owned candy shop in Newtown Square, PA featuring classic favorites, rare candy flavors, custom charcuterie boards, and hard-to-find specialty treats. Woman-owned business serving the Philadelphia area.",
  keywords: ["Googahlini's Candy Land", "candy shop", "Newtown Square PA", "artisanal candy", "rare candy flavors", "Sour Patch Kids", "custom candy boards", "Philadelphia candy", "local candy store"],
  authors: [{ name: "Googahlini's Candy Land" }],
  creator: "Googahlini's Candy Land",
  publisher: "Googahlini's Candy Land",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.googahliniscandy.com',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.googahliniscandy.com",
    title: "Googahlini's Candy Land | Classic & Artisanal Candies",
    description: "Locally owned candy shop in Newtown Square, PA featuring classic favorites, rare candy flavors, and custom candy creations",
    siteName: "Googahlini's Candy Land",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Googahlini's Candy Land - Classic and artisanal candy shop in Newtown Square, PA"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Googahlini's Candy Land | Classic & Artisanal Candies",
    description: "Locally owned candy shop in Newtown Square, PA featuring classic favorites, rare candy flavors, and custom candy creations",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  category: 'food & beverage',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pacifico.variable} ${playfairDisplay.variable} ${poppins.variable} ${dmSans.variable} ${caveat.variable} antialiased`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <AnalyticsProvider>
          {children}
          <Toaster />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
