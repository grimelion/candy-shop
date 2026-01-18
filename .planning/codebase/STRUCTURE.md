# Codebase Structure

**Analysis Date:** 2026-01-17

## Directory Layout

```
candy-shop/
├── public/                     # Static assets
│   ├── images/                # Hero, feature, product images
│   ├── og-image.jpg           # Open Graph social image
│   └── robots.txt             # Search engine crawler rules
│
├── src/                       # Application source code
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # Backend API routes
│   │   ├── actions/          # Server actions
│   │   ├── b2b/              # B2B page
│   │   ├── privacy/          # Privacy policy
│   │   ├── terms/            # Terms of service
│   │   └── thanks/           # Thank you page
│   │
│   ├── components/           # React components
│   │   └── ui/              # shadcn/ui primitives
│   │
│   ├── content/             # Static configuration
│   └── lib/                 # Utilities & providers
│
├── types/                    # TypeScript type definitions
├── .planning/               # Project planning docs
├── package.json             # Dependencies & scripts
└── next.config.ts           # Next.js configuration
```

## Directory Purposes

**public/**
- Purpose: Static assets served at root URL
- Contains: Images, favicon, robots.txt
- Key files: `og-image.jpg` (social sharing), `images/` (hero, features)
- Subdirectories: `images/` (organized by section)

**src/app/**
- Purpose: Next.js App Router pages and server logic
- Contains: Pages, layouts, API routes, server actions
- Key files: `layout.tsx`, `page.tsx`, `globals.css`
- Subdirectories: `api/`, `actions/`, route folders

**src/app/api/**
- Purpose: Backend API routes
- Contains: Route handlers for external integrations
- Key files:
  - `contact/route.ts` - Form submission endpoint
  - `gallery/route.ts` - Dropbox photo gallery
  - `instagram-embed/route.ts` - Instagram oEmbed proxy

**src/app/actions/**
- Purpose: Server actions for form handling
- Contains: `sendInquiry.ts` - B2B inquiry form action

**src/components/**
- Purpose: React components (feature and UI)
- Contains: 15+ feature components, shadcn/ui components
- Key files:
  - `site-header.tsx` - Sticky navigation
  - `site-footer.tsx` - Footer with links
  - `hero.tsx` - Hero banner
  - `contact-form.tsx` - Inquiry form
  - `PhotoGallery.tsx` - Dropbox gallery (dynamic)
  - `google-map.tsx` - Embedded map
- Subdirectories: `ui/` (shadcn/ui primitives)

**src/components/ui/**
- Purpose: Reusable shadcn/ui component primitives
- Contains: Button, Card, Dialog, Form, Input, etc.
- Key files: `button.tsx`, `card.tsx`, `form.tsx`, `dialog.tsx`

**src/content/**
- Purpose: Static configuration and content data
- Contains: Site metadata, navigation, section copy
- Key files:
  - `site.ts` - Business info (name, phone, hours, address)
  - `nav.ts` - Navigation menu structure
  - `sections.ts` - Page section content

**src/lib/**
- Purpose: Utilities and providers
- Contains: Helper functions, analytics setup
- Key files:
  - `utils.ts` - CSS class merge utility (`cn()`)
  - `analytics.tsx` - Vercel Analytics & Speed Insights provider

**types/**
- Purpose: TypeScript type definitions
- Contains: Third-party type declarations
- Key files: `instafeed.d.ts` - Instagram Embed API types

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx` - Root layout with metadata, fonts, providers
- `src/app/page.tsx` - Home page (main landing)
- `src/app/b2b/page.tsx` - Corporate services page

**Configuration:**
- `tsconfig.json` - TypeScript config (strict, path aliases)
- `next.config.ts` - Next.js config (image domains)
- `postcss.config.mjs` - PostCSS/Tailwind config
- `eslint.config.mjs` - ESLint rules

**Core Logic:**
- `src/app/api/gallery/route.ts` - Dropbox integration with token refresh
- `src/app/api/contact/route.ts` - Contact form processing
- `src/app/actions/sendInquiry.ts` - B2B form server action
- `src/components/location-hours.tsx` - Store hours logic

**Testing:**
- None configured

**Documentation:**
- `CLAUDE.md` - AI assistant instructions
- `.planning/` - Project planning documents

## Naming Conventions

**Files:**
- kebab-case for components: `site-header.tsx`, `contact-form.tsx`
- Exception: `PhotoGallery.tsx` uses PascalCase (default export)
- `route.ts` for API routes (Next.js convention)
- `page.tsx` for pages (Next.js convention)

**Directories:**
- kebab-case for all directories
- Plural for collections: `components`, `actions`
- Singular for features: `api`, `content`

**Special Patterns:**
- `ui/` subdirectory for shadcn/ui components
- `*.d.ts` for type declarations
- `*.tsx` for React components, `*.ts` for logic

## Where to Add New Code

**New Page:**
- Create: `src/app/{route}/page.tsx`
- With metadata: Export `metadata` object
- With layout: Create `layout.tsx` in same folder

**New Component:**
- Feature component: `src/components/{name}.tsx`
- UI primitive: `src/components/ui/{name}.tsx`
- Pattern: Named export with PascalCase function

**New API Route:**
- Create: `src/app/api/{resource}/route.ts`
- Export: `GET`, `POST`, etc. handler functions
- Pattern: Return `NextResponse.json()`

**New Server Action:**
- Add to: `src/app/actions/` or `src/app/{route}/actions.ts`
- Pattern: "use server" directive, async function

**New Content:**
- Add to existing: `src/content/site.ts` or `src/content/sections.ts`
- New config: `src/content/{name}.ts` with const export

**Utilities:**
- Add to: `src/lib/utils.ts` for small helpers
- New file: `src/lib/{name}.ts` for larger utilities

## Special Directories

**.planning/**
- Purpose: Project planning and codebase documentation
- Source: Generated by GSD workflows
- Committed: Yes

**public/images/**
- Purpose: Static images for hero, features, products
- Source: Manually added
- Committed: Yes

**node_modules/**
- Purpose: npm dependencies
- Source: Auto-generated by npm install
- Committed: No (in .gitignore)

**.next/**
- Purpose: Next.js build output
- Source: Auto-generated by next build
- Committed: No (in .gitignore)

---

*Structure analysis: 2026-01-17*
*Update when directory structure changes*
