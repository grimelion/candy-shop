---
phase: 05-admin-panel-cms
plan: 02
subsystem: data
tags: [vercel-blob, typescript, config]

requires:
  - phase: 05-admin-panel-cms plan 01
    provides: Admin auth

provides:
  - SiteConfig TypeScript types
  - getSiteConfig() — reads from Vercel Blob with DEFAULT_CONFIG fallback
  - saveSiteConfig() — writes JSON config to Vercel Blob
  - uploadBoardImage() — uploads board image to Vercel Blob
affects: [05-admin-panel-cms]

tech-stack:
  added: [@vercel/blob]
  patterns:
    - Vercel Blob for persistent config JSON and image storage
    - Merge-with-defaults pattern for forward-compatible config reads

key-files:
  created:
    - src/types/site-config.ts
    - src/lib/site-config.ts
  modified: []

key-decisions:
  - "list({ prefix: 'site-config.json' }) to find blob — no need to store URL separately"
  - "addRandomSuffix: false for deterministic blob paths"
  - "Merge DEFAULT_CONFIG + stored config so new fields always have fallback values"
  - "BLOB_READ_WRITE_TOKEN absence returns DEFAULT_CONFIG silently — site works locally without blob configured"

patterns-established:
  - "getSiteConfig() is the single source of truth for all editable site content"

issues-created: []

duration: 3min
completed: 2026-02-20
---

# Phase 5 Plan 2: Config Data Layer Summary

**SiteConfig type + Vercel Blob read/write helpers with DEFAULT_CONFIG fallback matching all current hardcoded content**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-20T18:13:31Z
- **Completed:** 2026-02-20T18:16:13Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Defined `SiteConfig` TypeScript interface covering store info, all section content, and board sizes
- Created `DEFAULT_CONFIG` matching exact current values from `site.ts`, `sections.ts`, and `board-size-selector.tsx`
- `getSiteConfig()` reads from Vercel Blob with graceful fallback when token absent or blob missing
- `saveSiteConfig()` writes JSON to deterministic `site-config.json` blob path
- `uploadBoardImage()` uploads board images to `boards/{id}.{ext}` in Vercel Blob
- `@vercel/blob` installed; `BLOB_READ_WRITE_TOKEN=` added to `.env` (blank for local dev)

## Task Commits

1. **Task 1: Install @vercel/blob and define SiteConfig types** - `089f6e6` (feat)
2. **Task 2: Create getSiteConfig and saveSiteConfig helpers** - `3cc657b` (feat)

**Plan metadata:** (docs: complete plan — pending)

## Files Created/Modified

- `src/types/site-config.ts` — BoardSize, Testimonial, FeaturedItem, SiteConfig interfaces
- `src/lib/site-config.ts` — DEFAULT_CONFIG, getSiteConfig, saveSiteConfig, uploadBoardImage

## Decisions Made

- Used `list({ prefix: 'site-config.json' })` to locate blob — avoids storing blob URL separately
- `addRandomSuffix: false` for deterministic paths so saveSiteConfig always overwrites the same blob
- Merge `{ ...DEFAULT_CONFIG, ...config }` on reads so adding new fields never breaks existing stored configs
- `BLOB_READ_WRITE_TOKEN` absence silently returns `DEFAULT_CONFIG` — site works locally without Blob configured

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- Data layer complete; `getSiteConfig()` and `saveSiteConfig()` ready for admin UI to call
- `uploadBoardImage()` ready for image upload UI in plan 05-05
- `BLOB_READ_WRITE_TOKEN` must be set in Vercel dashboard environment variables before admin save works in production
- Ready for 05-03-PLAN.md

---
*Phase: 05-admin-panel-cms*
*Completed: 2026-02-20*
