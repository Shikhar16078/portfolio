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
- Section titles use `SectionHeading` (via `SectionShell`): words rise from behind a mask and an accent line draws in, then breathes, toggled by `data-shown`. The hidden state applies only under `html[data-motion-ready]`, so headings show without JS.
- Cards carry `<CardRing />` (inside a `relative` card): a short arc of red light travelling around the border. Its spinning layer only exists while the card is on screen.
- On desktop, the skill badge under the cursor grows and lifts under a hand cursor (`skill-badge` and `skill-list` in `globals.css`); touch screens get plain badges.
- A skill that appears in an experience `stack` or a project's `technologies` (by name or `skillAliases` in `data.ts`), or in an entry's `alsoUsed` (skills used there that its card doesn't show as badges), opens "Where I used it" on hover (or tap, or Enter) (`src/lib/skill-usage.ts`). Choosing an entry jumps to that card with `showOnPage` (`src/lib/show-on-page.ts`): cards inside a carousel are brought forward through a `carousel:reveal` event, the window is scrolled (never `scrollIntoView`, which would scroll the carousel's clipped viewport), and the card flashes (`data-flash`). Jump targets need an `id` (`experienceCardId` / `projectCardId`) and `tabIndex={-1}`.
- `<Carousel autoplay={ms}>` advances on its own. The active pagination dot is the timer (its `carousel-progress` fill animation ends, then the carousel advances), paused through `data-autoplay-paused` on hover, focus, drag or when off screen; off for reduced motion.
- Company, university and issuer names in cards carry `text-glint` (a glint through the letters every 3.5s; use with `w-fit`), and Experience impact tiles `impact-tile` / `impact-value` (a sheen wave across the tiles with the value glowing as it passes).
- Badges inside cards: wrap a row in `BadgeRow` (`badge-row.tsx`) so the badges cascade in when the row comes on screen (carousel slides included); tech badges take `techBadgeClass` for their hover lift. Date badges get `date-badge` (a glint every 3.5s, in time with the work authorization badge), the current role a `live-dot`, project types a `type-icon`, and numbers like GPAs `CountUp` (`count-up.tsx`).
- Timeline entries add a glowing tip on the rail's fill (mouse/trackpad only) and pulse their logo when the fill reaches them.
- In the hero, anything marked `data-hero-fg` cuts a hole in the cursor spotlight's dot layer (`hero-spotlight.tsx`), so new foreground elements need that attribute.
- The hero's work authorization is a collapsed "Work authorization" chip that expands into the full badge on click (`work-auth-badge.tsx`); a link with `?for=recruiters` opens the page with it expanded. It reads the query on the client, so the page stays prerendered.
- The hero photo lives in `hero-photo.tsx`: hovering it eases the ring's spin up through the Web Animations API (`updatePlaybackRate`), and the `status` live value (see Live config) adds the "Open to work" dot. `hero-scroll-away.tsx` drifts and fades the hero content as the page scrolls; with reduced motion or on a touch screen it only fades.
- `DialogContent` and `SheetContent` return focus to their trigger without scrolling (`src/lib/return-focus.ts`). Plain Radix focus return made the page jump, because the triggers sit in the sticky header.
- Size full-screen sections with `svh`, never `dvh`: `dvh` changes each time a phone's address bar shows or hides, which resizes every section mid-scroll and makes scrolling jitter. For the same reason, scroll-linked movement driven by JS (`useScroll` transforms) is mouse/trackpad only; on touch screens it lags behind native scrolling.
- To test on a phone over Wi-Fi, the Mac's address must be listed in `allowedDevOrigins` in `next.config.js`. Otherwise Next blocks the dev client and the page never hydrates.

