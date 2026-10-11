# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on http://localhost:9002
npm run build     # Production build
npm run lint      # ESLint via Next.js
npm run typecheck # TypeScript type check (tsc --noEmit)
```

There are no tests in this project.

## Architecture

This is a Next.js 14 App Router single-page portfolio. The key architectural pattern is **data-driven rendering**: all portfolio content lives exclusively in `src/lib/data.ts` and is imported by section components. Updating content means editing only that file — never the components.

### Data layer (`src/lib/data.ts`)

Exports typed objects/arrays for each section: `personalData`, `summaryData`, `socialLinks`, `projectsData`, `experienceData`, `educationData`, `skillsData`, `awardsData`, `recommendationsData`. This is the single source of truth for all displayed content.

### Page composition (`src/app/page.tsx`)

A client component that mounts all section components in order and manages `activeSection` state via an `IntersectionObserver` (with `rootMargin: '-50% 0px -50% 0px'`). The active section ID is passed to `<Header>` for nav highlighting.

### Section components (`src/components/sections/`)

Each section (`home`, `experience`, `projects`, `education`, `skills`, `awards`, `recommendations`, `contact`) is a standalone component that imports its data directly from `data.ts` and renders it. Sections use `id` attributes matching their name for scroll-spy targeting.

### UI primitives (`src/components/ui/`)

Radix UI-based shadcn/ui components. Extend or add here when a new primitive is needed.

### Theme

`next-themes` with a `ThemeProvider` in `src/app/layout.tsx`. The toggle lives in `src/components/theme-toggle.tsx`. Tailwind dark mode uses the `class` strategy.
