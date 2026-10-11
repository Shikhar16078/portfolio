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

This is a Next.js 16 (React 19) App Router single-page portfolio. Next 16 has breaking changes from older versions; the docs matching the installed version are in `node_modules/next/dist/docs/`. The key architectural pattern is **data-driven rendering**: all portfolio content lives exclusively in `src/lib/data.ts` and is imported by section components. Updating content means editing only that file (or the Global Config store, for the live values) — never the components.

### Data layer (`src/lib/data.ts`)

Exports typed objects/arrays for each section: `personalData`, `summaryData`, `socialLinks`, `projectsData`, `experienceData`, `educationData`, `skillsData`, `awardsData`, `recommendationsData`.

This is the single source of truth for all displayed content, except the few live values in the Global Config store below.

### Live config (`src/lib/site-config.ts`)

A few values live only in the Vercel Global Config store (formerly Edge Config) connected to the project, so they can change without a deploy: `status` (the hero photo's "Open to work" dot), `location` (the pin line under the hero title) and `resume` (the Resume buttons in the hero and the Summary dialog; https links only). `getSiteConfig()` reads them on the server through the `GLOBAL_CONFIG` connection string. There is deliberately no fallback in `data.ts`: if a key is missing or empty, or the store can't be reached, whatever it feeds is not rendered. For local development, `npx vercel env pull .env.local` provides `GLOBAL_CONFIG`. To add a live value, add it to `SiteConfig` and `KEYS` there and pass it down from the `config` prop.

### Page composition (`src/app/page.tsx`, `src/components/portfolio.tsx`)

`page.tsx` is a server component: it reads the live config and renders `Portfolio`. It sets `revalidate = 60`, so the page stays prerendered and is rebuilt in the background at most once a minute. `Portfolio` is a client component that mounts all section components in order and manages `activeSection` state via an `IntersectionObserver` (with `rootMargin: '-50% 0px -50% 0px'`). The active section ID is passed to `<Header>` for nav highlighting.

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
- `SectionShell` gives every section below the hero a background (`section-backdrop.tsx`): a drifting red glow that alternates sides by section order (`section:nth-of-type` in `globals.css`) and moves against the scroll, a faint dot grid behind the heading, and a divider line along the top edge that draws in on reveal.
- In the hero, anything marked `data-hero-fg` cuts a hole in the cursor spotlight's dot layer (`hero-spotlight.tsx`), so new foreground elements need that attribute.
- The hero photo lives in `hero-photo.tsx`: hovering it eases the ring's spin up through the Web Animations API (`updatePlaybackRate`), and `personalData.status` adds the "Open to work" dot. `hero-scroll-away.tsx` drifts and fades the hero content as the page scrolls; with reduced motion it only fades.
- `DialogContent` and `SheetContent` return focus to their trigger without scrolling (`src/lib/return-focus.ts`). Plain Radix focus return made the page jump, because the triggers sit in the sticky header.
- To test on a phone over Wi-Fi, the Mac's address must be listed in `allowedDevOrigins` in `next.config.js`. Otherwise Next blocks the dev client and the page never hydrates.

