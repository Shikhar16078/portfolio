"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { EASE_IN, EASE_OUT } from "@/lib/motion";
import { useScrollReveal } from "../reveal";
import { experienceData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheck, ChevronDown } from "lucide-react";
import SectionShell from "../section-shell";
import { Timeline, TimelineEntry } from "../timeline";
import { cn } from "@/lib/utils";

// Full class names so Tailwind keeps them; four tiles go 2x2 on tablets, one row on desktop.
const highlightCols: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

// useLayoutEffect warns during server rendering; it is only needed in the browser.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Swaps between two texts with a fade-through: the outgoing one fades out, then the incoming one fades
// in (swap-in/swap-out in globals.css), while the container's height glides to fit it. Both texts
// stay in the page. `animated` is false until the first toggle, so nothing plays on page load.
function SwapText({ showAlt, animated, primary, alt }: { showAlt: boolean; animated: boolean; primary: string; alt: string }) {
  const primaryRef = useRef<HTMLParagraphElement>(null);
  const altRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState<number>();

  useIsomorphicLayoutEffect(() => {
    const el = showAlt ? altRef.current : primaryRef.current;
    if (!el) return;
    const sync = () => setHeight(el.offsetHeight);
    sync();
    const observer = new ResizeObserver(sync); // keep in step when the card width changes
    observer.observe(el);
    return () => observer.disconnect();
  }, [showAlt]);

  const layer = (visible: boolean) =>
    cn(
      "text-muted-foreground whitespace-pre-line",
      // The outgoing text is taken out of the flow so the height follows the incoming one.
      !visible && "pointer-events-none absolute inset-x-0 top-0",
      animated ? (visible ? "swap-in" : "swap-out") : !visible && "invisible opacity-0"
    );

  return (
    <div
      className="relative mt-3 overflow-hidden transition-[height] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      style={{ height }}
    >
      <p ref={primaryRef} className={layer(!showAlt)} aria-hidden={showAlt}>{primary}</p>
      <p ref={altRef} className={layer(showAlt)} aria-hidden={!showAlt}>{alt}</p>
    </div>
  );
}

// Counts the number in a value like "10K/sec", "~99%" or "Up to 125 MB" up from 0 as its card scrolls
// into view, and back down as the card leaves through the bottom (scrolling up). Values with an arrow
// or several numbers ("2 days → 1 hr") are shown as they are. The server renders the final value;
// digits are written to the DOM directly to avoid re-rendering on every frame.
function CountUp({ value }: { value: string }) {
  const match = useMemo(() => (value.includes("→") ? null : /^(\D*)(\d+)(\D*)$/.exec(value)), [value]);
  const [ref, shown] = useScrollReveal<HTMLSpanElement>();
  const reduceMotion = useReducedMotion();
  // The number currently on screen; null until the counter is parked at 0 after hydration.
  const current = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!match || reduceMotion || !el) return;
    const [, prefix, digits, suffix] = match;
    const write = (v: number) => {
      current.current = v;
      el.textContent = `${prefix}${Math.round(v)}${suffix}`;
    };
    // Park at 0 before the first reveal. The card is still hidden then, so the swap is never seen.
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

type Experience = (typeof experienceData)[number];

function ExperienceEntry({ item, isLast }: { item: Experience; isLast: boolean }) {
  const [showBackground, setShowBackground] = useState(false);
  const [toggled, setToggled] = useState(false);
  const isCurrent = item.period.includes("Present");

  return (
    <TimelineEntry
      logo={{ src: item.icon, alt: `${item.company} logo` }}
      title={item.role}
      subtitle={item.company}
      meta={
        <>
          <Badge variant={isCurrent ? "default" : "outline"} className="w-fit">
            {item.period}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-7 px-2.5 text-primary hover:text-primary", showBackground && "bg-primary/10 hover:bg-primary/15")}
            onClick={() => {
              setShowBackground(!showBackground);
              setToggled(true);
            }}
            aria-pressed={showBackground}
          >
            Background
            <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform duration-300", showBackground && "rotate-180")} />
          </Button>
        </>
      }
      highlight={isCurrent}
      isLast={isLast}
      panels={[
        {
          id: "responsibilities",
          label: "Responsibilities",
          content: (
            <ul className="stagger-rise space-y-3 text-muted-foreground">
              {item.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CircleCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          ),
        },
      ]}
    >
      <SwapText showAlt={showBackground} animated={toggled} primary={item.summary} alt={item.description} />

      <div className={cn("mt-4 grid grid-cols-1 gap-2 sm:gap-3", highlightCols[item.highlights.length])}>
        {item.highlights.map((h) => (
          <div key={h.label} className="rounded-lg bg-muted/50 p-3">
            <p className="whitespace-nowrap text-lg font-bold text-primary leading-7"><CountUp value={h.value} /></p>
            <p className="mt-1 text-sm text-muted-foreground leading-snug">{h.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {item.stack.map((tech) => (
          <Badge key={tech} variant="secondary">{tech}</Badge>
        ))}
      </div>
    </TimelineEntry>
  );
}

export default function ExperienceSection() {
  return (
    <SectionShell id="experience" title="Experience" subtitle="My journey in software engineering." revealBody={false}>
      <Timeline>
        {experienceData.map((item, index) => (
          <ExperienceEntry
            key={`${item.company}-${item.period}`}
            item={item}
            isLast={index === experienceData.length - 1}
          />
        ))}
      </Timeline>
    </SectionShell>
  );
}
