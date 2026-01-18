# Architecture

**Analysis Date:** 2026-01-17

## Pattern Overview

**Overall:** Next.js 15 Full-Stack Landing Page with App Router

**Key Characteristics:**
- Hybrid rendering: Server Components (RSC) with Client Components for interactivity
- Component-driven UI architecture
- Content-separated data layer for configuration
- Edge-ready with Vercel deployment

## Layers

**Presentation Layer:**
- Purpose: UI rendering and user interaction
- Contains: React components, page layouts
- Location: `src/components/`, `src/app/*/page.tsx`
- Depends on: Content layer for data, UI components for primitives
- Used by: Entry points (pages)

**Server Layer:**
- Purpose: Backend logic, external integrations
- Contains: API routes, server actions
- Location: `src/app/api/`, `src/app/actions/`
- Depends on: External services (Dropbox, Instagram)
- Used by: Client components via fetch/actions

**Content Layer:**
- Purpose: Static configuration and content
- Contains: Site metadata, navigation, section definitions
- Location: `src/content/`
- Depends on: Nothing (pure data)
- Used by: All layers

**Utility Layer:**
- Purpose: Shared helpers and providers
- Contains: CSS utilities, analytics setup
- Location: `src/lib/`
- Depends on: External packages
- Used by: Components, pages

## Data Flow

**Page Rendering:**

1. User navigates to route
2. Next.js App Router matches `page.tsx`
3. Server Component loads content from `src/content/`
4. Page composes feature components
5. Client Components hydrate for interactivity
6. Analytics provider tracks page view

**Photo Gallery Flow:**

1. `PhotoGallery.tsx` mounts (client component)
2. `useEffect` triggers fetch to `/api/gallery`
3. `src/app/api/gallery/route.ts` handles request
4. Dropbox API called (with token refresh if needed)
5. Photo metadata with temp links returned
6. Component renders images with lightbox

**Contact Form Flow:**

1. User fills `ContactForm` component
2. React Hook Form validates with Zod schema
3. Form submits via server action `sendInquiry`
4. Server action validates, logs (email TODO)
5. Success/error state returned to form

**State Management:**
- No global state (React Server Components paradigm)
- Local component state via `useState`/`useEffect`
- Form state via React Hook Form
- Server state via fetch/revalidation

## Key Abstractions

**Feature Components:**
- Purpose: Self-contained UI sections
- Examples: `Hero`, `FeatureCards`, `PricingCards`, `Testimonials`, `LocationHours`
- Location: `src/components/*.tsx`
- Pattern: Named exports, composable in pages

**UI Components (shadcn/ui):**
- Purpose: Reusable primitive components
- Examples: `Button`, `Card`, `Dialog`, `Form`, `Input`
- Location: `src/components/ui/*.tsx`
- Pattern: CVA variants, Radix UI primitives

**Content Config:**
- Purpose: Centralized content and metadata
- Examples: `siteConfig`, `navigation`, `sections`
- Location: `src/content/*.ts`
- Pattern: Const exports with TypeScript types

**Server Actions:**
- Purpose: Type-safe server mutations
- Examples: `sendInquiry`
- Location: `src/app/actions/*.ts`
- Pattern: "use server" directive, FormData input

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page render
- Responsibilities: Metadata, fonts, analytics provider, toast container

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: Root URL navigation
- Responsibilities: Compose all landing page sections, JSON-LD structured data

**B2B Page:**
- Location: `src/app/b2b/page.tsx`
- Triggers: /b2b URL navigation
- Responsibilities: Corporate services content, inquiry form

**API Routes:**
- Location: `src/app/api/*/route.ts`
- Triggers: HTTP requests
- Responsibilities: External integrations, form processing

## Error Handling

**Strategy:** Try/catch at boundaries, graceful UI fallbacks

**Patterns:**
- API routes return appropriate HTTP status codes
- Components show loading/error states
- Server actions return typed state objects
- Gallery has error state UI
- Map has static image fallback

## Cross-Cutting Concerns

**Logging:**
- Console.log for development debugging
- No structured logging service

**Validation:**
- Zod schemas at form/API boundaries
- TypeScript for compile-time type safety
- React Hook Form for client validation

**Styling:**
- Tailwind CSS utility classes
- CSS custom properties for theming
- `cn()` utility for class composition (`src/lib/utils.ts`)

**SEO:**
- Next.js Metadata API in layout and pages
- JSON-LD structured data (`src/app/page.tsx`)
- Dynamic sitemap (`src/app/sitemap.ts`)
- Robots.txt (`public/robots.txt`)

---

*Architecture analysis: 2026-01-17*
*Update when major patterns change*
