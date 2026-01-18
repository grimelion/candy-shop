import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Googahlini's Candy Land",
    short_name: "Googahlini's",
    description: "Locally owned candy shop in Newtown Square, PA featuring classic favorites, rare candy flavors, and custom candy creations",
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF8F0',
    theme_color: '#2D1B2E',
    icons: [
      {
        src: '/og-image.jpg',
        sizes: 'any',
        type: 'image/jpeg',
      },
    ],
  }
}
