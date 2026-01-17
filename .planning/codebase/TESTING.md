# Testing Patterns

**Analysis Date:** 2026-01-17

## Test Framework

**Runner:**
- **NOT CONFIGURED** - No testing framework installed

**Assertion Library:**
- Not applicable

**Run Commands:**
```bash
# No test commands available
# package.json scripts: dev, build, start, lint only
```

## Test File Organization

**Location:**
- No test files exist in the codebase
- No `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or `*.spec.tsx` files found
- No `__tests__/` directories

**Naming:**
- Not established

**Structure:**
```
# Current state - no tests
src/
  components/
    hero.tsx           # No hero.test.tsx
  app/
    api/
      contact/
        route.ts       # No route.test.ts
```

## Test Structure

**Suite Organization:**
- Not applicable - no tests exist

**Patterns:**
- Not established

## Mocking

**Framework:**
- Not applicable

**Patterns:**
- Not established

**What Would Need Mocking:**
- Dropbox API (`src/app/api/gallery/route.ts`)
- Instagram Graph API (`src/components/instagram-feed.tsx`)
- Fetch calls in components
- Environment variables

## Fixtures and Factories

**Test Data:**
- Not applicable

**Location:**
- Not established

## Coverage

**Requirements:**
- No coverage targets
- No coverage tooling configured

**Configuration:**
- Not applicable

**View Coverage:**
```bash
# Not available
```

## Test Types

**Unit Tests:**
- Not implemented
- Would benefit: `getCurrentDayStatus()` in `src/components/location-hours.tsx`
- Would benefit: Zod schemas in `src/app/api/contact/route.ts`
- Would benefit: `cn()` utility in `src/lib/utils.ts`

**Integration Tests:**
- Not implemented
- Would benefit: Contact form submission flow
- Would benefit: Gallery API with mocked Dropbox

**E2E Tests:**
- Not implemented
- Would benefit: Full page rendering
- Would benefit: Form submission success/error paths

## Common Patterns

**Async Testing:**
- Not established

**Error Testing:**
- Not established

**Snapshot Testing:**
- Not used

## Recommendations

**Suggested Framework:**
- Vitest (fast, ESM-native, good Next.js support)
- Alternative: Jest with SWC

**Suggested Setup:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Priority Test Targets:**

1. **Server Actions** (`src/app/actions/sendInquiry.ts`)
   - Zod validation
   - Form data handling
   - Error states

2. **API Routes** (`src/app/api/contact/route.ts`, `src/app/api/gallery/route.ts`)
   - Request validation
   - Error handling
   - Response format

3. **Business Logic** (`src/components/location-hours.tsx`)
   - `getCurrentDayStatus()` time calculations
   - Store hours display logic

4. **Form Validation**
   - Contact form Zod schema
   - Honeypot anti-spam field

**Sample Test Structure:**
```typescript
// src/app/actions/sendInquiry.test.ts
import { describe, it, expect } from 'vitest';
import { sendInquiry } from './sendInquiry';

describe('sendInquiry', () => {
  it('should validate required fields', async () => {
    const formData = new FormData();
    const result = await sendInquiry(null, formData);
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it('should reject honeypot submissions', async () => {
    const formData = new FormData();
    formData.set('website', 'spam'); // honeypot field
    const result = await sendInquiry(null, formData);
    expect(result.success).toBe(false);
  });
});
```

---

*Testing analysis: 2026-01-17*
*Update when test patterns change*
