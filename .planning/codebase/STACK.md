# Technology Stack

**Analysis Date:** 2026-01-17

## Languages

**Primary:**
- TypeScript 5.x - All application code (`package.json`, `tsconfig.json`)

**Secondary:**
- JavaScript (ES2017/ESNext) - Build config files (`eslint.config.mjs`, `postcss.config.mjs`)
- CSS - Tailwind CSS v4 with CSS custom properties (`src/app/globals.css`)

## Runtime

**Environment:**
- Node.js (implicit from Next.js 15 requirements)
- No explicit version pinned (.nvmrc not present)

**Package Manager:**
- npm 10.x
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 15.5.3 - Full-stack React framework with App Router (`package.json`)
- React 19.1.0 - UI library (`package.json`)
- React DOM 19.1.0 - React rendering (`package.json`)

**Styling:**
- Tailwind CSS v4 - Utility-first CSS framework (`package.json`, `postcss.config.mjs`)
- PostCSS with @tailwindcss/postcss - CSS processing (`postcss.config.mjs`)

**Testing:**
- None configured

**Build/Dev:**
- TypeScript compiler (via Next.js)
- ESLint 9.x - Code linting (`eslint.config.mjs`)

## Key Dependencies

**Form & Validation:**
- react-hook-form 7.63.0 - Form state management (`src/components/contact-form.tsx`)
- zod 4.1.11 - Schema validation (`src/app/api/contact/route.ts`, `src/app/actions/sendInquiry.ts`)
- @hookform/resolvers 5.2.2 - Schema validators bridge

**UI Component Libraries:**
- @radix-ui/* collection (v1-2) - Unstyled, accessible component primitives
  - dialog, label, navigation-menu, select, separator, slot, tabs, accordion
- lucide-react 0.544.0 - Icon library (`src/components/contact-form.tsx`)
- sonner 2.0.7 - Toast notifications (`src/components/ui/sonner.tsx`)

**Styling Utilities:**
- class-variance-authority 0.7.1 - Component variant library (`src/components/ui/button.tsx`)
- clsx 2.1.1 - Utility for constructing classNames
- tailwind-merge 3.3.1 - Merges Tailwind CSS classes
- tw-animate-css 1.3.8 - Animation utilities (`src/app/globals.css`)

**External Integrations:**
- dropbox 10.34.0 - Dropbox API client (`src/app/api/gallery/route.ts`)
- @react-google-maps/api 2.20.7 - Google Maps integration (`src/components/google-map.tsx`)
- instafeed.js 2.1.0 - Instagram feed display (`src/components/instagram-feed.tsx`)
- @vercel/analytics 1.5.0 - Web analytics (`src/lib/analytics.tsx`)
- @vercel/speed-insights 1.2.0 - Performance monitoring (`src/lib/analytics.tsx`)

## Configuration

**Environment:**
- `.env` files for secrets and API keys
- `.env.example` template available (incomplete)
- Key variables: `DROPBOX_*`, `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

**Build:**
- `tsconfig.json` - TypeScript config (strict mode, path alias `@/*` → `./src/*`)
- `next.config.ts` - Next.js config (Dropbox image remote patterns)
- `postcss.config.mjs` - PostCSS with Tailwind CSS plugin
- `eslint.config.mjs` - ESLint flat config (extends next/core-web-vitals, next/typescript)

## Platform Requirements

**Development:**
- Any platform with Node.js
- No external dependencies (no Docker, no local DB)

**Production:**
- Vercel - Optimized Next.js hosting
- Automatic deployment on main branch push
- Environment variables configured in Vercel dashboard

---

*Stack analysis: 2026-01-17*
*Update after major dependency changes*
