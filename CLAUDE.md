# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on http://localhost:9002
npm run build     # Production build
npm run lint      # ESLint (flat config in eslint.config.mjs)
npm run typecheck # TypeScript type check (tsc --noEmit)
```

There are no tests in this project.

## Architecture

This is a Next.js 16 (React 19) App Router single-page portfolio. Next 16 has breaking changes from older versions; the docs matching the installed version are in `node_modules/next/dist/docs/`. The key architectural pattern is **data-driven rendering**: all portfolio content lives exclusively in `src/lib/data.ts` and is imported by section components. Updating content means editing only that file — never the components.

### Data layer (`src/lib/data.ts`)

Exports typed objects/arrays for each section: `personalData`, `summaryData`, `socialLinks`, `projectsData`, `experienceData`, `educationData`, `skillsData`, `awardsData`, `recommendationsData`. This is the single source of truth for all displayed content.

### Page composition (`src/app/page.tsx`)

A client component that mounts all section components in order and manages `activeSection` state via an `IntersectionObserver` (with `rootMargin: '-50% 0px -50% 0px'`). The active section ID is passed to `<Header>` for nav highlighting.

### Section components (`src/components/sections/`)

Each section (`home`, `experience`, `projects`, `education`, `skills`, `awards`, `recommendations`, `contact`) is a standalone component that imports its data directly from `data.ts` and renders it. Sections use `id` attributes matching their name for scroll-spy targeting.

### UI primitives (`src/components/ui/`)

Radix UI-based shadcn/ui components. Extend or add here when a new primitive is needed.

### Theme

`next-themes` with a `ThemeProvider` in `src/app/layout.tsx`. The toggle lives in `src/components/theme-toggle.tsx`. Tailwind v4 is configured in CSS (no tailwind.config): theme tokens live in the `@theme` block of `src/app/globals.css`, and the `dark` variant follows the `.dark` class.

### Animation

- **Motion** (`motion/react`) is loaded through `src/components/motion-provider.tsx`: `LazyMotion` in strict mode, so use `m.*` components, not `motion.*`. `MotionConfig reducedMotion="user"` turns transforms off for users who prefer reduced motion.
- Shared easing, durations and variants live in `src/lib/motion.ts`. In this version, stagger with `delayChildren: stagger(...)`; `staggerChildren` is deprecated.
- Scroll reveals use `Reveal`, `RevealGroup` and `RevealItem` from `src/components/reveal.tsx`, built on `useScrollReveal`. They are reversible: content reveals once it rises above a trigger line near the bottom of the screen, and undoes (in reverse order) when it drops back below it, i.e. when scrolling up. Content already scrolled past stays revealed. The state depends only on position, so fast flings can't skip an element. Their `data-reveal` attribute lets the `<noscript>` rule in `layout.tsx` show them without JS. `SectionShell` reveals its heading, and also its body unless `revealBody={false}` is passed. Content at the very end of the page (the footer) passes `margin={REVEAL_MARGIN_PAGE_END}`, because it can never scroll above the default line.
- The hero entrance is pure CSS (`hero-rise`, `hero-in` and `hero-pop` in `globals.css`), so it plays before JS loads. Large hero elements must never start at opacity 0, because that delays Largest Contentful Paint.
- Animate only `transform` and `opacity`. In Tailwind v4, `scale-*`, `rotate-*` and `translate-*` set the individual CSS properties (`scale`, `rotate`, `translate`), so a custom transition has to list those properties. The one exception is `hero-highlight` (the bio's key phrases, listed in `personalData.bioHighlights`): a one-off color fade on a few words.
- If JS hasn't started within 4s, a CSS failsafe in `globals.css` shows all `data-reveal` content, so a failed script can't leave the page blank. `MotionProvider` sets `data-motion-ready` on `<html>` to switch the failsafe off.
- `RevealGroup` staggers its `RevealItem`s in on-screen order (top to bottom, left to right), not DOM order, because looping carousels reorder their slides. Mark a clipping container with `data-reveal-clip` (the carousel viewport does) so items scrolled out of it are skipped.
- Use Motion's shorthand transforms (`x`, `y`, `scale`), not `transform` strings: `reducedMotion="user"` only suppresses the shorthands.
- In the hero, anything marked `data-hero-fg` cuts a hole in the cursor spotlight's dot layer (`hero-spotlight.tsx`), so new foreground elements need that attribute.
- `DialogContent` and `SheetContent` return focus to their trigger without scrolling (`src/lib/return-focus.ts`). Plain Radix focus return made the page jump, because the triggers sit in the sticky header.
- To test on a phone over Wi-Fi, the Mac's address must be listed in `allowedDevOrigins` in `next.config.js`. Otherwise Next blocks the dev client and the page never hydrates.

