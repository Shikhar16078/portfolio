"use client";

import type { CSSProperties } from "react";
import { useScrollReveal } from "./reveal";

// Section title with the hero name's signature: the words rise one after another from behind a mask,
// then a short red accent line draws out beneath them. Reversible like the other scroll reveals
// (data-shown toggles the CSS in globals.css). The hidden state only applies once JS is running
// (html[data-motion-ready]), so without JS the heading is simply visible.
export default function SectionHeading({ title }: { title: string }) {
  const [ref, shown] = useScrollReveal<HTMLHeadingElement>();
  const words = title.split(" ");

  return (
    <div className="flex flex-col items-center">
      <h2
        ref={ref}
        data-heading=""
        data-shown={shown ? "" : undefined}
        className="text-3xl font-bold tracking-tighter md:text-4xl font-headline"
      >
        {words.map((word, i) => (
          <span key={i}>
            <span className="heading-word">
              <span style={{ "--w": i } as CSSProperties}>{word}</span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </h2>
      <span
        aria-hidden="true"
        className="heading-accent"
        data-shown={shown ? "" : undefined}
        style={{ "--words": words.length } as CSSProperties}
      />
    </div>
  );
}
