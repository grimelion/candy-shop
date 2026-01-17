# External Integrations

**Analysis Date:** 2026-01-17

## APIs & External Services

**Photo Gallery - Dropbox:**
- Service: Dropbox API v2
- SDK/Client: `dropbox` npm package v10.34.0
- Implementation: `src/app/api/gallery/route.ts`
- Auth: OAuth with token refresh mechanism
- Environment Variables:
  - `DROPBOX_ACCESS_TOKEN` - Direct access token
  - `DROPBOX_REFRESH_TOKEN` - OAuth refresh token (recommended)
  - `DROPBOX_APP_KEY` - Application key
  - `DROPBOX_APP_SECRET` - Application secret
  - `DROPBOX_FOLDER_PATH` - Path to gallery folder (default: root)
- Features:
  - Lists image files from Dropbox folder
  - Generates temporary download links
  - Supports: JPG, JPEG, PNG, GIF, WebP
  - Token refresh with 3.5 hour cache

**Maps - Google Maps:**
- Service: Google Maps JavaScript API
- SDK/Client: `@react-google-maps/api` v2.20.7
- Implementation: `src/components/google-map.tsx`
- Auth: API key in `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Features:
  - Interactive map with marker at store location (39.9929, -75.3999)
  - Fallback to static image when API unavailable
  - Direct link to Google Maps business page

**Social Media - Instagram:**
- Service: Instagram Graph API (oEmbed endpoint)
- SDK/Client: `instafeed.js` v2.1.0
- Implementation:
  - `src/components/instagram-feed.tsx` - Client-side feed display
  - `src/app/api/instagram-embed/route.ts` - Backend oEmbed proxy
- Auth: `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN`
- Features:
  - Fetches last 6 Instagram posts
  - Converts to oEmbed via Facebook Graph API v17.0
  - Instagram account: `@googahlinis_candy`

**Email/SMS:**
- **NOT YET IMPLEMENTED**
- TODOs in code:
  - `src/app/api/contact/route.ts` (line ~39)
  - `src/app/actions/sendInquiry.ts` (line ~53)
- Suggested services: Resend, SendGrid

## Data Storage

**Databases:**
- None - Static landing page without database

**File Storage:**
- Dropbox - Cloud storage for photo gallery
- Local `public/images/` - Static hero and feature images

**Caching:**
- In-memory token cache for Dropbox (3.5 hour TTL)
- No Redis or external cache

## Authentication & Identity

**Auth Provider:**
- None - Public landing page with no user authentication

**API Authentication:**
- Dropbox: OAuth2 with token refresh
- Instagram: Long-lived access token
- Google Maps: API key (public client-side)

## Monitoring & Observability

**Analytics:**
- Vercel Analytics - Web analytics collection
- SDK: `@vercel/analytics` v1.5.0
- Implementation: `src/lib/analytics.tsx`

**Performance Monitoring:**
- Vercel Speed Insights - Core Web Vitals
- SDK: `@vercel/speed-insights` v1.2.0
- Implementation: `src/lib/analytics.tsx`

**Error Tracking:**
- None configured (no Sentry, etc.)

**Logs:**
- Console logging only (stdout/stderr)
- Vercel logs in production

## CI/CD & Deployment

**Hosting:**
- Vercel - Next.js optimized hosting
- Deployment: Automatic on main branch push
- Environment vars: Configured in Vercel dashboard

**CI Pipeline:**
- Not explicitly configured
- Vercel's built-in preview deployments

## Environment Configuration

**Development:**
- Required env vars: `DROPBOX_ACCESS_TOKEN`, `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN`
- Optional: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_SITE_URL`
- Secrets location: `.env.local` (gitignored)

**Staging:**
- Not separately configured (uses Vercel preview deployments)

**Production:**
- Secrets management: Vercel environment variables
- Image optimization for Dropbox URLs configured in `next.config.ts`

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Image Optimization

**Next.js Image Configuration:**
- Remote patterns configured for Dropbox in `next.config.ts`
- Domains: `*.dropboxusercontent.com`
- Note: `unoptimized: true` disables optimization for these images

---

*Integration audit: 2026-01-17*
*Update when adding/removing external services*
