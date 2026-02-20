---
phase: 05-admin-panel-cms
plan: 01
subsystem: auth
tags: [next.js, middleware, jose, jwt, admin]

requires: []
provides:
  - Admin middleware protecting /admin/* routes via JWT cookie verification
  - Login page with password form (react-hook-form + zod)
  - JWT cookie session (24h, httpOnly, sameSite strict)
  - Logout server action
affects: [05-admin-panel-cms]

tech-stack:
  added: [jose]
  patterns:
    - Middleware JWT verification with jose (jwtVerify / SignJWT)
    - httpOnly cookie session for admin (admin_session, 24h)

key-files:
  created:
    - src/middleware.ts
    - src/app/admin/login/page.tsx
    - src/app/admin/login/actions.ts
    - src/app/admin/actions.ts

key-decisions:
  - "jose for JWT in middleware (not jsonwebtoken — Edge runtime incompatibility)"
  - "ADMIN_PASSWORD env var plain string comparison — no bcrypt needed for single-owner"

patterns-established:
  - Admin server actions live in src/app/admin/actions.ts or src/app/admin/*/actions.ts

issues-created: []

duration: 6min
completed: 2026-02-20
---

# Phase 5 Plan 1: Admin Auth Summary

**Middleware JWT cookie auth protecting /admin/* with jose, login form via react-hook-form + zod, httpOnly 24h session**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-20T18:05:35Z
- **Completed:** 2026-02-20T18:11:54Z
- **Tasks:** 2
- **Files modified:** 4 created + package.json

## Accomplishments

- Admin middleware protects all `/admin/*` routes — unauthenticated visitors redirect to `/admin/login`
- Login page renders centered Card with password field using existing react-hook-form + zod pattern
- `loginAction` creates signed JWT (HS256, 24h) and sets httpOnly cookie on correct password
- `logoutAction` deletes cookie and redirects to login — ready for use in future admin layout

## Task Commits

Each task was committed atomically:

1. **Task 1: Install jose and create admin middleware** - `df19ab6` (feat)
2. **Task 2: Create admin login page and server action** - `24112dc` (feat)

## Files Created/Modified

- `src/middleware.ts` — JWT verification middleware, matcher: /admin/:path*, allows /admin/login through
- `src/app/admin/login/actions.ts` — loginAction: password check → SignJWT → httpOnly cookie → redirect
- `src/app/admin/actions.ts` — logoutAction: delete cookie → redirect to /admin/login
- `src/app/admin/login/page.tsx` — Client Component, full-screen centered Card, react-hook-form + zod
- `.env` — ADMIN_PASSWORD and ADMIN_SECRET vars added (not committed, gitignored)

## Decisions Made

- Used `jose` instead of `jsonwebtoken` — jose is ESM-native and Edge-compatible (jsonwebtoken has CommonJS issues in Next.js middleware/Edge runtime)
- Plain string comparison for ADMIN_PASSWORD — bcrypt unnecessary for single-owner app with no brute-force surface (middleware already blocks unauthenticated access)

## Deviations from Plan

None — plan executed exactly as written. Env vars added to `.env` (confirmed existing file) rather than `.env.local` as the plan correctly specified.

## Issues Encountered

None.

## Next Phase Readiness

- Auth foundation complete — all /admin/* routes are protected
- `logoutAction` is exported and ready for the admin layout (05-02 or later)
- Ready for 05-02-PLAN.md

---
*Phase: 05-admin-panel-cms*
*Completed: 2026-02-20*
