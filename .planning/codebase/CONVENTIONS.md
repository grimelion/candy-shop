# Coding Conventions

**Analysis Date:** 2026-01-17

## Naming Patterns

**Files:**
- kebab-case for components: `site-header.tsx`, `contact-form.tsx`, `location-hours.tsx`
- Exception: `PhotoGallery.tsx` uses PascalCase (default export pattern)
- kebab-case for utilities: `utils.ts`, `analytics.tsx`
- kebab-case for content: `site.ts`, `nav.ts`, `sections.ts`

**Functions:**
- PascalCase for React components: `export function SiteHeader()`, `export function Hero()`
- camelCase for utilities: `getCurrentDayStatus()`, `fetchPhotos()`
- camelCase for handlers: `handleScroll()`, `handleClick()`

**Variables:**
- camelCase for variables: `scrolled`, `selectedPhoto`, `currentDay`
- UPPER_SNAKE_CASE for URL constants: `GOOGLE_MAPS_URL`
- camelCase for config exports: `siteConfig`, `navigation`, `sections`

**Types:**
- PascalCase for interfaces: `ContactFormProps`, `WavyDividerProps`, `Photo`
- PascalCase for type aliases: `InquiryFormState`, `PricingTier`
- Props suffix for component props: `interface XxxProps`

## Code Style

**Formatting:**
- 2-space indentation (inferred from source)
- Double quotes for strings and imports
- Semicolons used consistently
- No explicit Prettier config (relies on ESLint)

**Linting:**
- ESLint with flat config (`eslint.config.mjs`)
- Extends: `next/core-web-vitals`, `next/typescript`
- Ignores: `node_modules`, `.next`, `out`, `build`
- Run: `npm run lint`

## Import Organization

**Order:**
1. React/Next.js imports (`react`, `next/*`)
2. External packages (`lucide-react`, `@radix-ui/*`)
3. Internal modules (`@/components/*`, `@/content/*`, `@/lib/*`)
4. Type imports (`import type { Metadata }`)

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- All imports use alias: `import { Hero } from "@/components/hero"`

**Example:**
```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import type { Metadata } from "next";
```

## Error Handling

**Patterns:**
- Try/catch in async functions
- Error state in components: `const [error, setError] = useState<string | null>(null)`
- API routes return appropriate status codes
- Graceful fallbacks (map → static image)

**API Routes:**
```typescript
try {
  // operation
  return NextResponse.json({ data });
} catch (error) {
  console.error("Error:", error);
  return NextResponse.json({ error: "Message" }, { status: 500 });
}
```

**Components:**
```typescript
if (error) {
  return <div className="text-red-600">Error: {error}</div>;
}
```

## Logging

**Framework:**
- Console methods only (`console.log`, `console.error`)
- No structured logging library

**Patterns:**
- Debug logging in development
- Error logging with context
- Note: Some `console.log` statements remain in production code (see CONCERNS.md)

## Comments

**When to Comment:**
- Explain why, not what
- Document business logic in content files
- Section markers in JSX: `{/* Navigation Links - Desktop */}`

**JSDoc/TSDoc:**
- Not extensively used
- TypeScript interfaces are self-documenting
- No required JSDoc for functions

**TODO Comments:**
- Format: `// TODO: description`
- Found in: `src/app/api/contact/route.ts`, `src/app/actions/sendInquiry.ts`

## Function Design

**Size:**
- No strict limit enforced
- Largest file: `src/app/b2b/page.tsx` (257 lines)
- Components typically 50-150 lines

**Parameters:**
- Props destructured in function signature
- Options objects for multiple params

**Example:**
```typescript
export function ContactForm({ showTitle = true }: ContactFormProps) {
  // ...
}
```

**Return Values:**
- Components return JSX
- Server actions return typed state objects
- API routes return `NextResponse`

## Module Design

**Exports:**
- Named exports for components: `export function SiteHeader()`
- Default exports for pages: `export default function Home()`
- Const exports for config: `export const siteConfig = {}`

**Client/Server:**
- `"use client"` directive for interactive components
- `"use server"` directive for server actions
- Server Components by default (no directive)

## Styling Conventions

**Approach:**
- Tailwind CSS utility classes exclusively
- CSS custom properties for theme colors
- No CSS modules or styled-components

**Class Composition:**
- `cn()` utility for conditional classes (`src/lib/utils.ts`)
- Inline `className` with template literals for dynamic styles

**Example:**
```typescript
className={`sticky top-0 z-50 ${scrolled ? "bg-white" : "bg-transparent"}`}
```

**Theme Variables:**
- Defined in `src/app/globals.css`
- Custom colors: `--candy-pink`, `--deep-berry`, `--cream`
- Font families: `--font-script`, `--font-heading`, `--font-body`

**Usage:**
```typescript
style={{ fontFamily: "var(--font-script)" }}
className="text-deep-berry bg-candy-pink"
```

---

*Convention analysis: 2026-01-17*
*Update when patterns change*
