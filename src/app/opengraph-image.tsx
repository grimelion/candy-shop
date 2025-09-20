import { ImageResponse } from 'next/og';
import { siteConfig } from '@/content/site';

export const runtime = 'edge';

export const alt = 'Candy Shop - Sweet Creations Made Perfect';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fef7ed',
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(139, 69, 19, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(139, 69, 19, 0.1) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '2px solid rgba(139, 69, 19, 0.1)',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #8b4513, #d2691e)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#6b7280',
              textAlign: 'center',
              marginBottom: '30px',
              maxWidth: '800px',
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#374151',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
            }}
          >
            <span>📍 {siteConfig.address}</span>
            <span>📞 {siteConfig.phone}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}