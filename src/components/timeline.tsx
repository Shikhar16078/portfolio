"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimelineLogoProps {
  src: string;
  alt: string;
  highlight: boolean;
  className?: string;
}

const TimelineLogo = ({ src, alt, highlight, className }: TimelineLogoProps) => (
  <div
    className={cn(
      "items-center justify-center overflow-hidden rounded-full bg-white p-0.5 ring-2",
      highlight ? "ring-primary" : "ring-border",
      className
    )}
  >
    <Image src={src} alt={alt} width={40} height={40} className="h-full w-full rounded-full object-contain" />
  </div>
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
}: TimelineEntryProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  // Keep the last panel rendered while it animates closed.
  const lastShown = useRef<TimelinePanel | null>(null);
  const baseId = useId();
  const openPanel = panels.find((p) => p.id === openId) ?? null;
  if (openPanel) lastShown.current = openPanel;
  const shown = openPanel ?? lastShown.current;

  return (
    <li className="relative sm:pl-16 pb-6 last:pb-0">
      {/* Logo and rail offsets centre the logo on the title + subtitle block of the card header. */}
      {!isLast && (
        <span aria-hidden="true" className="absolute left-[22px] top-[69px] -bottom-[25px] hidden w-px bg-border sm:block" />
      )}
      <TimelineLogo {...logo} highlight={highlight} className="absolute left-0 top-[25px] hidden h-11 w-11 sm:flex" />

      <Card className="p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex items-center gap-3">
            <TimelineLogo {...logo} highlight={highlight} className="h-10 w-10 flex-shrink-0 sm:hidden" />
            <div>
              <h3 className="text-lg sm:text-xl font-semibold leading-tight">{title}</h3>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="flex flex-shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">{meta}</div>
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

        {panels.length > 0 && (
          <div
            id={`${baseId}-panel`}
            role="region"
            aria-label={shown?.label}
            aria-hidden={!openPanel}
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-in-out",
              openPanel ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="overflow-hidden">
              <div key={shown?.id} className="pt-3 animate-in fade-in-0 duration-300">
                {shown?.content}
              </div>
            </div>
          </div>
        )}
      </Card>
    </li>
  );
}
