"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll, useTransform, type Transition, type Variants } from "motion/react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DURATION, EASE_IN, EASE_OUT, exitTransition } from "@/lib/motion";
import { useScrollReveal } from "./reveal";
import CardRing from "./card-ring";
import BadgeRow from "./badge-row";

// Leaving reverses arriving: the logo goes first, then the card (afterChildren).
const entryVariants: Variants = {
  hidden: { opacity: 0, y: 24, transition: { ...exitTransition, when: "afterChildren" } },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE_OUT } },
};

// Panels open by easing to their natural height while the content fades in; they close by fading the
// content first and then folding shut. Inner items can cascade with the stagger-rise utility.
const panelOpen: Transition = {
  height: { duration: 0.45, ease: EASE_OUT },
  opacity: { duration: 0.3, delay: 0.05 },
};
const panelClose: Transition = {
  height: { duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.06 },
  opacity: { duration: 0.15, ease: EASE_IN },
};

// The rail logo pops in just after its card starts rising.
const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, transition: { duration: DURATION.fast, ease: EASE_IN } },
  show: { opacity: 1, scale: 1, transition: { duration: DURATION.base, ease: EASE_OUT, delay: 0.15 } },
};

interface TimelineLogoProps {
  src: string;
  alt: string;
  highlight: boolean;
  /** The rail's fill has reached this entry: the logo gives one glowing pulse (timeline-logo). */
  reached?: boolean;
  className?: string;
  variants?: Variants;
}

const TimelineLogo = ({ src, alt, highlight, reached, className, variants }: TimelineLogoProps) => (
  <m.div
    variants={variants}
    data-reached={reached ? "" : undefined}
    className={cn(
      "timeline-logo items-center justify-center overflow-hidden rounded-full bg-white p-0.5 ring-2",
      highlight ? "ring-primary" : "ring-border",
      className
    )}
  >
    <Image src={src} alt={alt} width={40} height={40} className="h-full w-full rounded-full object-contain" />
  </m.div>
);

export function Timeline({ children }: { children: ReactNode }) {
  return <ol className="mx-auto max-w-4xl">{children}</ol>;
}

interface TimelineEntryProps {
  logo: { src: string; alt: string };
  title: string;
  subtitle: ReactNode;
  /** Right side of the header on sm+ (dates, grades); wraps under the title on phones. */
  meta: ReactNode;
  /** Red logo ring for the current/most relevant entry. */
  highlight?: boolean;
  isLast: boolean;
  children?: ReactNode;
  /** Collapsible panels, each with its own toggle button; at most one is open at a time. */
  panels?: TimelinePanel[];
  /** Shown at the right end of the toggle row. */
  action?: ReactNode;
  /** id for the card, so it can be jumped to (e.g. from a skill's popover; see show-on-page.ts). */
  cardId?: string;
}

export interface TimelinePanel {
  id: string;
  label: string;
  content: ReactNode;
}

export function TimelineEntry({
  logo,
  title,
  subtitle,
  meta,
  highlight = false,
  isLast,
  children,
  panels = [],
  action,
  cardId,
}: TimelineEntryProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();
  const [ref, revealed] = useScrollReveal<HTMLLIElement>();
  // Rail fill follows the scroll: empty when this entry's top reaches 60% down the screen, full when its bottom does.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  // A glowing tip rides the fill's leading edge, visible only while the fill is under way.
  const tipTop = useTransform(scrollYProgress, (p) => `${p * 100}%`);
  const tipOpacity = useTransform(scrollYProgress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);
  // The previous entry's fill ends where this one's starts, so a fill under way means the line has
  // reached this entry's logo.
  const [reached, setReached] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (p) => setReached(p > 0));
  const openPanel = panels.find((p) => p.id === openId) ?? null;

  return (
    <m.li
      ref={ref}
      data-reveal=""
      className="relative sm:pl-16 pb-6 last:pb-0"
      initial="hidden"
      animate={revealed ? "show" : "hidden"}
      variants={entryVariants}
    >
      {/* Logo and rail offsets centre the logo on the title + subtitle block of the card header. */}
      {!isLast && (
        <span aria-hidden="true" className="absolute left-[22px] top-[69px] bottom-[-25px] hidden w-px bg-border sm:block">
          <m.span style={{ scaleY: scrollYProgress }} className="absolute inset-0 origin-top bg-primary" />
          <m.span style={{ top: tipTop, opacity: tipOpacity }} className="timeline-tip" />
        </span>
      )}
      <TimelineLogo
        {...logo}
        highlight={highlight}
        reached={reached}
        variants={logoVariants}
        className="absolute left-0 top-[25px] hidden h-11 w-11 sm:flex"
      />

      <Card id={cardId} tabIndex={cardId ? -1 : undefined} className="group/card relative p-5 outline-hidden">
        <CardRing />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex items-center gap-3">
            <TimelineLogo {...logo} highlight={highlight} reached={reached} className="h-10 w-10 shrink-0 sm:hidden" />
            <div>
              <h3 className="text-lg sm:text-xl font-semibold leading-tight sm:leading-7">{title}</h3>
              <p className="text-glint w-fit text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <BadgeRow delay={0.3} className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">{meta}</BadgeRow>
        </div>

        {children}

        {(panels.length > 0 || action) && (
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              {panels.map((panel) => {
                const isOpen = panel.id === openId;
                return (
                  <Button
                    key={panel.id}
                    variant="ghost"
                    size="sm"
                    className={cn("text-primary hover:text-primary", isOpen && "bg-primary/10 hover:bg-primary/15")}
                    onClick={() => setOpenId(isOpen ? null : panel.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${baseId}-panel`}
                  >
                    {panel.label}
                    <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
                  </Button>
                );
              })}
            </div>
            {action}
          </div>
        )}

        <AnimatePresence initial={false}>
          {openPanel && (
            <m.div
              key={openPanel.id}
              id={`${baseId}-panel`}
              role="region"
              aria-label={openPanel.label}
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1, transition: panelOpen }}
              exit={{ height: 0, opacity: 0, transition: panelClose }}
            >
              <div className="pt-3">{openPanel.content}</div>
            </m.div>
          )}
        </AnimatePresence>
      </Card>
    </m.li>
  );
}
