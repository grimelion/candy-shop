import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/lib/analytics";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bold serif for headings - conveys craftsmanship and indulgence
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Cursive/hand-lettered for accent text - nostalgic feel
const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://googahlinis.com'),
  title: {
    default: "Googahlini's Candy Land | Classic & Artisanal Candies",
    template: "%s | Googahlini's Candy Land"
  },
  description: "Locally owned candy shop in Newtown Square, PA featuring classic favorites, rare candy flavors, custom charcuterie boards, and hard-to-find specialty treats. Woman-owned business serving the Philadelphia area.",
  keywords: ["Googahlini's Candy Land", "candy shop", "Newtown Square PA", "artisanal candy", "rare candy flavors", "Sour Patch Kids", "custom candy boards", "Philadelphia candy", "local candy store"],
  authors: [{ name: "Googahlini's Candy Land" }],
  creator: "Googahlini's Candy Land",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://googahlinis.com",
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${dancingScript.variable} antialiased`}
      >
        <AnalyticsProvider>
          {children}
          <Toaster />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
