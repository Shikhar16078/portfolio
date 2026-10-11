"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

// A short arc of red light travelling slowly around a card's border, like the glints on the section
// dividers and the hero title's underline (card-ring in globals.css). Place it inside a `relative`
// card. Each card starts the arc at a different point, so cards on screen together don't move in
// step. The spinning layer only exists while the card is on screen (carousel slides outside the
// viewport count as off screen), so a page full of cards stays cheap, including on phones.
const LAP_SECONDS = 9;

// A stable 0–1 value per card from its useId, the same on the server and the client.
function phase(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return (hash % 1000) / 1000;
}

export default function CardRing() {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const delay = -phase(useId()) * LAP_SECONDS;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} aria-hidden="true" className="card-ring">
      {visible && <span style={{ animationDelay: `${delay}s`, animationDuration: `${LAP_SECONDS}s` } as CSSProperties} />}
    </span>
  );
}
