---
phase: 05-admin-panel-cms
plan: 03
subsystem: data
tags: [server-components, props, refactor]

requires:
  - phase: 05-admin-panel-cms plan 02
    provides: getSiteConfig() helper
provides:
  - Home page reads all section content from getSiteConfig()
  - Order page reads board config from getSiteConfig()
  - All section components accept content as props
affects: [05-admin-panel-cms]

tech-stack:
  added: []
  patterns:
    - Async Server Component pages with getSiteConfig() at top
    - Content passed as props from Server to Client components

key-files:
  modified:
    - src/app/page.tsx
    - src/app/order/page.tsx
    - src/app/privacy/page.tsx
    - src/app/terms/page.tsx
    - src/components/hero.tsx
    - src/components/feature-cards.tsx
    - src/components/site-header.tsx
    - src/components/site-footer.tsx
    - src/components/sticky-order-bar.tsx
    - src/components/board-size-selector.tsx
    - src/components/order-form-section.tsx

key-decisions:
  - "src/content/*.ts kept as-is — not deleted, remains as default value reference"
  - "opengraph-image.tsx keeps direct siteConfig import — edge runtime cannot await getSiteConfig()"
  - "b2b/page.tsx and thanks/page.tsx keep direct content imports — out of task scope, deferred"
  - "hours-badge.tsx and cta-bar.tsx keep direct imports — components are unused anywhere; deferred"
  - "privacy/page.tsx and terms/page.tsx updated as collateral — required to satisfy SiteHeader/SiteFooter new prop requirements"
  - "OrderFormSection.defaultId derived from boards.find(b => b.popular) instead of hardcoded 'medium'"

patterns-established:
  - All editable content flows from getSiteConfig() through async page → component props
  - boardImages map built dynamically: Object.fromEntries(boards.map(b => [b.id, b.imageUrl]))

issues-created: []
---

# Phase 5 Plan 3: Update Site to Use Config Summary

Wired getSiteConfig() into the home page and order page so all editable content — store name, phone, hours, featured section, and board sizes — flows from the config data layer rather than hardcoded TypeScript imports.

## Accomplishments

- Made `src/app/page.tsx` an async Server Component that calls `getSiteConfig()` at the top
- Removed `siteConfig` import from page.tsx; JSON-LD now uses `config.storeName`, `config.phone`, `config.tagline`
- Updated `Hero`, `FeatureCards`, `SiteHeader`, `SiteFooter`, `StickyOrderBar` to accept data as props instead of importing directly from `@/content/site` or `@/content/sections`
- Made `src/app/order/page.tsx` async; passes `config.boards` to `OrderFormSection`
- Refactored `BoardSizeSelector` to accept `boards: BoardSize[]` prop (removed hardcoded `boardSizes` const and `boardImages` export)
- Refactored `OrderFormSection` to accept `boards: BoardSize[]` prop and build `boardImages` map dynamically from it
- Updated `privacy/page.tsx` and `terms/page.tsx` as collateral — they use `SiteHeader`/`SiteFooter` which now require props
- Build passes with no TypeScript errors; all pre-existing lint warnings unchanged

## Files Created/Modified

**Modified:**
- `src/app/page.tsx` — async, getSiteConfig(), passes props to all section components
- `src/app/order/page.tsx` — async, getSiteConfig(), passes boards prop to OrderFormSection
- `src/app/privacy/page.tsx` — async, getSiteConfig(), passes storeName/phone props to header/footer
- `src/app/terms/page.tsx` — async, getSiteConfig(), passes storeName/phone props to header/footer
- `src/components/hero.tsx` — removed siteConfig import, added phone prop
- `src/components/feature-cards.tsx` — removed sections import, added featured prop
- `src/components/site-header.tsx` — removed siteConfig import, added storeName/phone props
- `src/components/site-footer.tsx` — removed siteConfig import, added storeName/tagline/phone/address/hours props
- `src/components/sticky-order-bar.tsx` — removed siteConfig import, added phone prop
- `src/components/board-size-selector.tsx` — removed hardcoded boardSizes and boardImages, added boards prop
- `src/components/order-form-section.tsx` — removed boardImages import, added boards prop, derives boardImages dynamically

## Decisions Made

- **opengraph-image.tsx deferred**: Edge runtime (`export const runtime = 'edge'`) prevents using `getSiteConfig()` which calls `@vercel/blob`. Kept direct `siteConfig` import from `@/content/site`.
- **b2b/page.tsx and thanks/page.tsx deferred**: These pages use `siteConfig` and `sections` directly but are outside the plan's task scope. They will be updated in a future plan.
- **Privacy/terms pages were collateral**: Not in the original task scope but required to satisfy TypeScript once SiteHeader/SiteFooter required props.
- **defaultId logic improved**: `OrderFormSection` now derives the default selected board via `boards.find(b => b.popular)` instead of hardcoded `"medium"`, so the popular flag in config drives the default selection.

## Issues Encountered

None. Build and lint passed cleanly on first attempt after addressing the collateral page changes.

## Next Step

Ready for 05-04-PLAN.md
