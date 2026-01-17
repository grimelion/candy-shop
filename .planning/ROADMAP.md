# Roadmap: Googahlini's Candy Land - Order Page

## Overview

Add a chocolate charcuterie board ordering system to the existing candy shop landing page. Customers select a board size, fill out contact details, and the shop owner receives instant WhatsApp notifications.

## Domain Expertise

None

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Order Page Structure** - Create `/order` route with page layout
- [ ] **Phase 2: Board Size Selection** - Visual size picker with placeholder images
- [ ] **Phase 3: Order Form & Validation** - Form fields using existing patterns
- [ ] **Phase 4: WhatsApp Integration** - Connect to WhatsApp Cloud API for notifications

## Phase Details

### Phase 1: Order Page Structure
**Goal**: Create the `/order` route with page layout, hero section, and navigation integration
**Depends on**: Nothing (first phase)
**Research**: Unlikely (existing Next.js App Router patterns)
**Plans**: TBD

### Phase 2: Board Size Selection
**Goal**: Build visual board size selector with small/medium/large options and placeholder images
**Depends on**: Phase 1
**Research**: Unlikely (existing shadcn/ui component patterns)
**Plans**: TBD

### Phase 3: Order Form & Validation
**Goal**: Complete order form with name, phone, email fields using react-hook-form + zod
**Depends on**: Phase 2
**Research**: Unlikely (existing contact form as template)
**Plans**: TBD

### Phase 4: WhatsApp Integration
**Goal**: Set up WhatsApp Cloud API to notify shop owner on form submission
**Depends on**: Phase 3
**Research**: Likely (external API integration)
**Research topics**: WhatsApp Cloud API setup, message templates, Meta Business account, webhook configuration
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Order Page Structure | 0/TBD | Not started | - |
| 2. Board Size Selection | 0/TBD | Not started | - |
| 3. Order Form & Validation | 0/TBD | Not started | - |
| 4. WhatsApp Integration | 0/TBD | Not started | - |
