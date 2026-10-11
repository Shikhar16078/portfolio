"use client";

import { useEffect, useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { useScrollReveal } from "./reveal";

// Background of every section below the hero, carrying on the hero's look (styles in globals.css):
//   - a soft red glow that drifts slowly; sections alternate sides down the page, and it moves a
//     little against the scroll for depth
//   - a faint static dot grid fading out from behind the heading
//   - a divider line at the section's top edge that draws out from the centre when it scrolls into
//     view, with a glint passing along it now and then
// With reduced motion the glow neither drifts nor moves with the scroll, and the line has no glint.
// On touch screens the glow doesn't move with the scroll either: JS-driven movement lags behind
// native scrolling there and jitters.
const PARALLAX = 160; // px the glow travels while the section crosses the screen

export default function SectionBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useRef(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, (p) => (still.current ? 0 : (0.5 - p) * PARALLAX));
  const [lineRef, lineShown] = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    still.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="section-backdrop">
      <m.div className="section-glow" style={{ y }}>
        <div />
      </m.div>
      <div className="section-dots" />
      <div ref={lineRef} className="section-divider" data-shown={lineShown ? "" : undefined} />
    </div>
  );
}
