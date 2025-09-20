# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 project for a candy shop landing page called "Candy Shop". It uses TypeScript, Tailwind CSS v4, and the new App Router architecture with a src directory structure.

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/app/layout.tsx` - Root layout with Geist fonts and global styles
- `src/app/page.tsx` - Home page component
- `src/app/globals.css` - Global styles with Tailwind CSS v4 and CSS variables
- `public/` - Static assets

### Key Technologies
- **Next.js 15** with App Router
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with inline theme configuration
- **React 19**
- **ESLint** with Next.js TypeScript configuration

### Configuration
- TypeScript path mapping: `@/*` resolves to `./src/*`
- Tailwind CSS v4 uses inline `@theme` blocks in CSS
- PostCSS configured with `@tailwindcss/postcss`
- ESLint extends `next/core-web-vitals` and `next/typescript`

### Fonts
Uses Google Fonts via `next/font`:
- Geist Sans (`--font-geist-sans`)
- Geist Mono (`--font-geist-mono`)

### Styling System
- CSS custom properties for theme colors (`--background`, `--foreground`)
- Dark mode support via `prefers-color-scheme`
- Tailwind CSS v4 theme integration through CSS variables

## Project Plan Context

This project is intended to be a modern candy shop landing page with:
- Hero section with product imagery
- Featured products (chocolate boards, candy gifts, event candy bars)
- Gallery, testimonials, and location information
- B2B inquiry functionality
- Contact forms and business information

Refer to `PROJECT_PLAN.md` for the complete development roadmap including shadcn/ui integration, SEO optimization, and deployment steps.