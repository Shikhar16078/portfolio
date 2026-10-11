"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

// Cross-fades between two texts while the container's height glides to fit the visible one.
function CrossfadeText({ showAlt, primary, alt }: { showAlt: boolean; primary: string; alt: string }) {
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
      "text-muted-foreground whitespace-pre-line transition-opacity duration-300 ease-out motion-reduce:transition-none",
      visible ? "opacity-100" : "pointer-events-none invisible absolute inset-x-0 top-0 opacity-0"
    );

  return (
    <div
      className="relative mt-3 overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none"
      style={{ height }}
    >
      <p ref={primaryRef} className={layer(!showAlt)} aria-hidden={showAlt}>{primary}</p>
      <p ref={altRef} className={layer(showAlt)} aria-hidden={!showAlt}>{alt}</p>
    </div>
  );
}

type Experience = (typeof experienceData)[number];

function ExperienceEntry({ item, isLast }: { item: Experience; isLast: boolean }) {
  const [showBackground, setShowBackground] = useState(false);
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
            onClick={() => setShowBackground(!showBackground)}
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
            <ul className="space-y-3 text-muted-foreground">
              {item.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CircleCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          ),
        },
      ]}
    >
      <CrossfadeText showAlt={showBackground} primary={item.summary} alt={item.description} />

      <div className={cn("mt-4 grid grid-cols-1 gap-2 sm:gap-3", highlightCols[item.highlights.length])}>
        {item.highlights.map((h) => (
          <div key={h.label} className="flex items-baseline gap-2 rounded-lg bg-muted/50 px-3 py-2 sm:block sm:p-3">
            <p className="whitespace-nowrap text-base sm:text-lg font-bold text-primary leading-tight">{h.value}</p>
            <p className="text-sm text-muted-foreground leading-snug sm:mt-1">{h.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <Badge key={tech} variant="secondary">{tech}</Badge>
        ))}
      </div>
    </TimelineEntry>
  );
}

export default function ExperienceSection() {
  return (
    <SectionShell id="experience" title="Experience" subtitle="My journey in software engineering.">
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
