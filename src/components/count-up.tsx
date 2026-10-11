"use client";

import { useEffect, useMemo, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";
import { EASE_IN, EASE_OUT } from "@/lib/motion";
import { useScrollReveal } from "./reveal";

// Counts the first number in a value like "10K/sec", "~99%", "Up to 125 MB" or "GPA: 3.95/4.00" up from
// 0 as it scrolls into view, and back down as it leaves through the bottom (scrolling up). Decimals
// keep their places. Values with an arrow ("2 days → 1 hr") are shown as they are. The server renders
// the final value; digits are written to the DOM directly to avoid re-rendering on every frame.
export default function CountUp({ value }: { value: string }) {
  const match = useMemo(() => (value.includes("→") ? null : /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value)), [value]);
  const [ref, shown] = useScrollReveal<HTMLSpanElement>();
  const reduceMotion = useReducedMotion();
  // The number currently on screen; null until the counter is parked at 0 after hydration.
  const current = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!match || reduceMotion || !el) return;
    const [, prefix, digits, suffix] = match;
    const decimals = digits.split(".")[1]?.length ?? 0;
    const write = (v: number) => {
      current.current = v;
      el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
    };
    // Park at 0 before the first reveal. The badge or card is still hidden then, so the swap is never seen.
    if (current.current === null) write(0);
    const target = shown ? Number(digits) : 0;
    if (current.current === target) return;
    // Starts from whatever is on screen, so reversing mid-count is seamless.
    const controls = animate(current.current ?? 0, target, {
      duration: shown ? 1.2 : 0.5,
      ease: shown ? EASE_OUT : EASE_IN,
      onUpdate: write,
      onComplete: () => {
        if (shown) el.textContent = value;
      },
    });
    return () => controls.stop();
  }, [shown, match, reduceMotion, value, ref]);

  return (
    // The invisible copy reserves the final width so neighbouring text never shifts while counting.
    <span className="inline-grid">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">{value}</span>
      <span ref={ref} aria-hidden="true" className="col-start-1 row-start-1">{value}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
