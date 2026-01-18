# Googahlini's Candy Land - Order Page

## What This Is

A chocolate charcuterie board ordering system for Googahlini's Candy Land. Customers select a board size (small, medium, large), fill out contact details, and the shop owner receives instant WhatsApp notifications to handle orders manually.

## Core Value

Simple ordering flow that reliably notifies the owner via WhatsApp — everything else (payments, delivery) happens over the phone.

## Requirements

### Validated

- ✓ Landing page with hero, features, pricing, testimonials — existing
- ✓ Photo gallery with Dropbox integration — existing
- ✓ Google Maps store location — existing
- ✓ Instagram feed integration — existing
- ✓ Contact and B2B inquiry forms — existing
- ✓ SEO setup (sitemap, OG images, JSON-LD) — existing
- ✓ Vercel Analytics — existing

### Active

- [ ] Order page at `/order` route
- [ ] Order form: full name, phone, email, size dropdown (small/medium/large)
- [ ] 3 board images showing size options (placeholders acceptable)
- [ ] WhatsApp API integration to notify shop owner on submission
- [ ] Form validation with user-friendly error messages

### Out of Scope

- Online payments (Stripe, PayPal, etc.) — owner handles payment manually via phone
- Order tracking or status updates — not needed for this workflow
- Delivery scheduling / date picker — owner coordinates delivery details via phone
- Email notifications — WhatsApp is the sole notification channel
- Order history / customer accounts — single transaction, no persistence needed

## Context

This is a brownfield project extending an existing Next.js 15 candy shop landing page. The codebase already has:

- Form patterns using react-hook-form + zod (`src/components/contact-form.tsx`)
- Server actions for form handling (`src/app/actions/sendInquiry.ts`)
- API routes pattern (`src/app/api/`)
- shadcn/ui components for consistent styling
- Tailwind CSS v4 with custom candy shop theme

The existing contact form implementation provides a template for the order form. The main new capability is WhatsApp API integration.

**Known tech debt to avoid:**
- Email service was never integrated (forms log to console) — this order form uses WhatsApp instead
- Some console.log statements in production code — keep new code clean

## Constraints

- **Cost**: Keep WhatsApp integration costs minimal — prefer free tiers (WhatsApp Cloud API free for 1000 conversations/month, or similar)
- **Tech stack**: Must use existing Next.js 15 + TypeScript + Tailwind patterns
- **Deployment**: Vercel (existing hosting)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| WhatsApp API over email | Owner prefers WhatsApp for instant mobile notifications | — Pending |
| No payment integration | Owner handles payments manually, reduces complexity | — Pending |
| Placeholder images OK | Real product photos can be added later | — Pending |

---
*Last updated: 2026-01-17 after initialization*
