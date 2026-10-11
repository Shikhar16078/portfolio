"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Image from "next/image";

// The hero's profile photo. With a mouse or trackpad, the spinning ring speeds up while hovered.
// An optional status dot sits on the ring; its label shows once after the entrance and on hover.
const SPIN_HOVER = 3; // ring speed while hovered, relative to normal
const SPIN_EASE_MS = 500;

export default function HeroPhoto({ status }: { status?: string }) {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);
  const spinFrame = useRef(0);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => cancelAnimationFrame(spinFrame.current);
  }, []);

  // Eases the ring's spin to a new speed; changing the CSS duration instead would make it jump.
  const setSpin = (target: number) => {
    const spin = spinnerRef.current?.getAnimations()[0];
    if (!spin) return;
    cancelAnimationFrame(spinFrame.current);
    const from = spin.playbackRate;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / SPIN_EASE_MS);
      spin.updatePlaybackRate(from + (target - from) * (1 - (1 - t) ** 3));
      if (t < 1) spinFrame.current = requestAnimationFrame(step);
    };
    spinFrame.current = requestAnimationFrame(step);
  };

  const enter = (e: PointerEvent) => e.pointerType !== "touch" && !reduced.current && setSpin(SPIN_HOVER);
  const leave = () => setSpin(1);

  return (
    <div className="group/photo relative" onPointerEnter={enter} onPointerLeave={leave}>
      <div data-hero-fg="circle" className="profile-ring profile-ring-boost hero-pop hover:scale-105 hover:cursor-none">
        <div ref={spinnerRef} className="profile-ring-spinner" />
        <div className="profile-ring-inner">
          <Image
            src="/assets/images/profile.jpeg"
            alt="Profile Picture"
            width={192}
            height={192}
            className="rounded-full object-cover aspect-square block [@media(max-height:700px)]:h-32 [@media(max-height:700px)]:w-32"
            priority
          />
        </div>
      </div>
      {status && (
        // Centred on the ring at its lower-right (45°), i.e. 14.6% in from each edge.
        <span className="hero-status" style={{ right: "calc(14.6% - 10px)", bottom: "calc(14.6% - 10px)" }}>
          <span className="hero-status-dot" />
          <span className="hero-status-label">{status}</span>
        </span>
      )}
    </div>
  );
}
