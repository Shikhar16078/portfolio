"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { m, useScroll, useTransform } from "motion/react";

// As the page scrolls, the hero content drifts down a little against the scroll and fades, so the
// next section appears to slide over it. With reduced motion it only fades.
const DRIFT = 0.25; // px of drift per px scrolled
const FADE_END = 600; // px scrolled by the time it has faded to its lowest

export default function HeroScrollAway({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useRef(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => (reduced.current ? 0 : Math.min(v, 1000) * DRIFT));
  const opacity = useTransform(scrollY, [0, FADE_END], [1, 0.25]);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <m.div className={className} style={{ y, opacity }}>
      {children}
    </m.div>
  );
}
