# Codebase Concerns

**Analysis Date:** 2026-01-17

## Tech Debt

**Email Service Not Implemented:**
- Issue: Contact form submissions are logged to console only, no emails sent
- Files: `src/app/api/contact/route.ts`, `src/app/actions/sendInquiry.ts`
- Why: MVP/prototype phase, email service not yet chosen
- Impact: Customers cannot actually submit inquiries; business receives no notifications
- Fix approach: Integrate Resend, SendGrid, or similar service

**Console Logging in Production:**
- Issue: Multiple console.log/error statements remain in production code
- Files:
  - `src/components/instagram-feed.tsx` (logs Instagram token!)
  - `src/components/PhotoGallery.tsx`
  - `src/app/api/gallery/route.ts`
  - `src/app/api/contact/route.ts`
  - `src/app/actions/sendInquiry.ts`
- Why: Debug code left in during development
- Impact: Cluttered console, potential info leak (Instagram token logged)
- Fix approach: Remove all console.log, use proper logging if needed

**Incomplete .env.example:**
- Issue: `.env.example` missing several required variables
- File: `.env.example`
- Missing: `DROPBOX_APP_KEY`, `DROPBOX_APP_SECRET`, `DROPBOX_REFRESH_TOKEN`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Why: Variables added incrementally without updating example
- Impact: New developers cannot properly configure the application
- Fix approach: Document all env vars in `.env.example`

## Known Bugs

**No critical bugs identified during analysis.**

Minor issues noted:

**Timezone-Unaware Store Hours:**
- Symptoms: Store hours display may be incorrect for users in different timezones
- Trigger: User visits site from different timezone than store
- File: `src/components/location-hours.tsx`
- Workaround: None
- Root cause: Time comparison uses local browser time without timezone consideration

## Security Considerations

**Exposed Secrets in Repository:**
- Risk: API tokens committed to `.env` file could be exposed if repo is public
- File: `.env`
- Current mitigation: None - tokens are in version control
- Recommendations:
  - Revoke and regenerate all exposed tokens immediately
  - Ensure `.env` is in `.gitignore`
  - Use Vercel environment variables for production

**dangerouslySetInnerHTML Usage:**
- Risk: XSS vulnerability if external API is compromised
- File: `src/components/instagram-feed.tsx` (Instagram oEmbed HTML)
- Current mitigation: Trusting Instagram oEmbed API
- Recommendations: Consider sanitizing HTML or using iframe approach

**Missing Origin Validation:**
- Risk: CORS/CSRF vulnerability in contact form API
- File: `src/app/api/contact/route.ts`
- Current mitigation: Partial - checks `NEXT_PUBLIC_SITE_URL` but not set in env
- Recommendations: Configure `NEXT_PUBLIC_SITE_URL` in production

## Performance Bottlenecks

**Unoptimized Dropbox Images:**
- Problem: Next.js image optimization disabled for Dropbox images
- File: `next.config.ts` (`unoptimized: true`)
- Measurement: Not measured (qualitative concern)
- Cause: Configuration to avoid optimization issues with temporary Dropbox URLs
- Improvement path: Consider downloading images to storage with optimization

**No API Response Caching:**
- Problem: Gallery and Instagram APIs called fresh on every request
- Files: `src/app/api/gallery/route.ts`, `src/app/api/instagram-embed/route.ts`
- Measurement: ~1-2s API response time (estimated)
- Cause: No cache headers set
- Improvement path: Add Cache-Control headers, consider edge caching

## Fragile Areas

**Dropbox Token Refresh:**
- File: `src/app/api/gallery/route.ts`
- Why fragile: Complex OAuth token refresh logic with silent fallback
- Common failures: If refresh fails, falls back to potentially expired token
- Safe modification: Add tests before changing, improve error reporting
- Test coverage: None

**Instagram Feed Initialization:**
- File: `src/components/instagram-feed.tsx`
- Why fragile: Complex async initialization with DOM manipulation
- Common failures: Race conditions if component unmounts during fetch
- Safe modification: Review cleanup logic in useEffect
- Test coverage: None

## Scaling Limits

**No significant scaling concerns for landing page.**

Current capacity is appropriate for:
- Static landing page with moderate traffic
- Vercel free/hobby tier limits

## Dependencies at Risk

**instafeed.js:**
- Risk: Low activity, may have React 19 compatibility issues
- Package: `instafeed.js 2.1.0`
- Impact: Instagram feed display
- Migration plan: Switch to direct Graph API calls if issues arise

**Dependency Updates Available:**
- Risk: Outdated packages may have security vulnerabilities
- Notable: Multiple @radix-ui updates, eslint updates, react-hook-form updates
- Impact: Missing bug fixes and features
- Migration plan: Run `npm outdated`, update incrementally

## Missing Critical Features

**No automated testing:**
- Problem: No test coverage for any code
- Current workaround: Manual testing only
- Blocks: Safe refactoring, confidence in deployments
- Implementation complexity: Low - straightforward to add Vitest

## Test Coverage Gaps

**All code untested:**
- What's not tested: Everything
- Risk: Regressions undetected, hard to refactor safely
- Priority: High
- Difficulty to test: Low - standard React/Next.js testing patterns apply

**Priority test targets:**
1. Server actions (form validation)
2. API routes (error handling)
3. Store hours logic (time calculations)
4. Form Zod schemas (validation rules)

---

*Concerns audit: 2026-01-17*
*Update as issues are fixed or new ones discovered*
