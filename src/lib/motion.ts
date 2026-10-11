import { stagger, type Transition, type Variants } from "motion/react";

// Shared motion language: one easing curve, a few durations, short travel distances.
// Only transform and opacity animate, so it stays smooth on phones.
// Reveals are reversible: content rises in when it scrolls into view, and sinks back out (faster,
// in reverse order) when it leaves through the bottom of the screen, i.e. when scrolling back up.

/** Fast start, long gentle settle: for things arriving. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** Slow start, quick finish: for things leaving. */
export const EASE_IN = [0.4, 0, 1, 1] as const;

export const DURATION = {
  fast: 0.2,
  exit: 0.3,
  base: 0.45,
  slow: 0.7,
} as const;

/** Vertical travel for reveals, in px. */
export const RISE = 16;

/** Reveal trigger: this share of the element must be above the trigger line... */
export const REVEAL_AMOUNT = 0.1;
/** ...which sits 12% up from the bottom of the screen, so undoing is visible, not off screen.
 *  The area reaches far above the screen so anything already scrolled past counts as revealed. */
export const REVEAL_MARGIN = "100000px 0px -12% 0px";
/** Trigger line at the very bottom of the screen, for content at the end of the page. */
export const REVEAL_MARGIN_PAGE_END = "100000px 0px 0px 0px";

export const springSnappy: Transition = { type: "spring", stiffness: 500, damping: 40, mass: 1 };

export const exitTransition: Transition = { duration: DURATION.exit, ease: EASE_IN };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: RISE, transition: exitTransition },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

/** Slides in from the right; used for the mobile menu, which opens from the right edge. */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: RISE },
  show: { opacity: 1, x: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

/** Parent variants that stagger children in, and back out in reverse order at half the interval. */
export function staggerChildren(interval = 0.06, startDelay = 0): Variants {
  return {
    hidden: { transition: { delayChildren: stagger(interval / 2, { from: "last" }) } },
    show: { transition: { delayChildren: stagger(interval, { startDelay }) } },
  };
}

/** Spreads `count` items over at most `total` seconds, so long lists don't drag on. */
export function cappedInterval(count: number, total = 0.35, max = 0.05) {
  return Math.min(max, total / Math.max(count, 1));
}
