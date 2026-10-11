"use client";

import { Children, Fragment, isValidElement, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "./reveal";

// Tech badges inside cards: on hover (hover-capable devices only) they lift and take a red tint. Set
// as classes on the Badge so they replace its variant's transition-colors and translucent hover.
export const techBadgeClass =
  "transition-[translate,background-color,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/50 hover:bg-[color-mix(in_srgb,hsl(var(--primary))_15%,hsl(var(--secondary)))] motion-reduce:hover:translate-y-0";

// Children, with fragments unpacked, so <>{a}{b}</> cascades as two badges.
function flatten(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap((child) =>
    isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment ? flatten(child.props.children) : [child]
  );
}

// A row of badges that cascade in one after another (badge-cascade in globals.css) once the row is on
// screen, and rewind when it leaves. "On screen" respects clipping, so badges in a carousel slide
// cascade in each time the slide comes into view. Each badge is wrapped so it can carry its place in
// the cascade (--i). The hidden state only applies once JS runs (html[data-motion-ready]).
export default function BadgeRow({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds before the first badge, e.g. to follow the card's own entrance. */
  delay?: number;
}) {
  const [ref, shown] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-shown={shown ? "" : undefined}
      className={cn("badge-cascade", className)}
      style={{ "--delay": `${delay}s` } as CSSProperties}
    >
      {flatten(children).map((child, i) => (
        <span key={i} className="inline-flex" style={{ "--i": i } as CSSProperties}>
          {child}
        </span>
      ))}
    </div>
  );
}
