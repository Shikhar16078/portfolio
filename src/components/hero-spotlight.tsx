"use client";

import { useEffect, useRef } from "react";

// Reveals a dot grid around the cursor while the mouse moves over the hero, fading it out once the
// mouse rests (the hero-spotlight utility in globals.css reads --mx/--my/--spot).
// The dots stay behind the content: every element marked data-hero-fg cuts a hole in the dot layer's
// mask, so dots show in the space around the photo, text and buttons but never over them.
//   data-hero-fg="circle"   the element's box as a circle (the photo)
//   data-hero-fg="text"     each line of its text, so short lines don't hide dots beside them
//   data-hero-fg="box"      the element's box
//   data-hero-fg="children" each child's box, keeping the gaps between buttons/icons
// Mouse and trackpad only, never with reduced motion; at most one update per frame.
const IDLE_MS = 700;
const PAD = 6; // px of clearance around each hole

const SPOT = "radial-gradient(200px circle at var(--mx, -999px) var(--my, -999px), #000, transparent 75%)";
const RECT = "linear-gradient(#000, #000)";
const CIRCLE = "radial-gradient(closest-side, #000 calc(100% - 1px), transparent)";

function holeRects(el: HTMLElement): DOMRect[] {
  const kind = el.dataset.heroFg;
  if (kind === "text") {
    const range = document.createRange();
    range.selectNodeContents(el);
    return [...range.getClientRects()];
  }
  if (kind === "children") return [...el.children].map((c) => c.getBoundingClientRect());
  return [el.getBoundingClientRect()];
}

export default function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const area = layer?.parentElement?.parentElement; // the hero section
    if (!layer || !area) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Builds the mask: the spotlight minus a hole for each foreground shape. Only the cursor position
    // changes while the mouse moves, so this runs when movement starts and when the layout changes.
    const carve = () => {
      const origin = area.getBoundingClientRect();
      const images = [SPOT];
      const sizes = ["100% 100%"];
      const positions = ["0 0"];
      area.querySelectorAll<HTMLElement>("[data-hero-fg]").forEach((el) => {
        const circle = el.dataset.heroFg === "circle";
        for (const r of holeRects(el)) {
          if (!r.width || !r.height) continue;
          images.push(circle ? CIRCLE : RECT);
          sizes.push(`${r.width + PAD * 2}px ${r.height + PAD * 2}px`);
          positions.push(`${r.left - origin.left - PAD}px ${r.top - origin.top - PAD}px`);
        }
      });
      // The spotlight (top layer) is subtracted by the union of the holes beneath it.
      const composite = ["subtract", ...Array(images.length - 1).fill("add")];
      layer.style.setProperty("mask-image", images.join(", "));
      layer.style.setProperty("mask-size", sizes.join(", "));
      layer.style.setProperty("mask-position", positions.join(", "));
      layer.style.setProperty("mask-repeat", "no-repeat");
      layer.style.setProperty("mask-composite", composite.join(", "));
    };

    let frame = 0;
    let idle = 0;
    let active = false;
    const hide = () => {
      active = false;
      layer.setAttribute("data-idle", "");
      layer.style.setProperty("--spot", "0");
    };
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!active) {
          carve(); // positions may have moved (entrance animation, resize) since the last time
          active = true;
        }
        const r = area.getBoundingClientRect();
        layer.removeAttribute("data-idle");
        layer.style.setProperty("--mx", `${e.clientX - r.left}px`);
        layer.style.setProperty("--my", `${e.clientY - r.top}px`);
        layer.style.setProperty("--spot", "1");
      });
      clearTimeout(idle);
      idle = window.setTimeout(hide, IDLE_MS);
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      clearTimeout(idle);
      hide();
    };

    const resize = new ResizeObserver(() => active && carve());
    resize.observe(area);
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(idle);
      resize.disconnect();
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} className="hero-spotlight" />;
}
