"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, m, type Transition } from "motion/react";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { DURATION, EASE_OUT } from "@/lib/motion";

// The hero's work authorization, which only matters to employers: a compact "Work authorization"
// chip that expands into the full badge when clicked, and collapses again on a second click.
// A link with ?for=recruiters (e.g. on a resume or in an application) opens the page expanded.
const RECRUITER_PARAM = { name: "for", value: "recruiters" };

const resize: Transition = { duration: DURATION.base, ease: EASE_OUT };
const swap: Transition = { duration: DURATION.fast };

// True when the page was opened from a recruiter link. Read on the client only, so the page stays
// prerendered; the server snapshot is false and the badge expands right after hydration.
function useRecruiterLink() {
  return useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get(RECRUITER_PARAM.name) === RECRUITER_PARAM.value,
    () => false
  );
}

export default function WorkAuthBadge({ status, note }: { status: string; note?: string }) {
  const fromRecruiterLink = useRecruiterLink();
  const [toggled, setToggled] = useState<boolean | null>(null);
  const open = toggled ?? fromRecruiterLink;

  return (
    <m.button
      type="button"
      layout
      transition={resize}
      aria-expanded={open}
      onClick={() => setToggled(!open)}
      // borderRadius as a style so Motion keeps the corners round while the size animates.
      style={{ borderRadius: 18 }}
      className="hero-sheen inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/70 hover:bg-primary/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
    >
      <m.span layout="position" transition={resize} className="flex shrink-0">
        <BadgeCheck aria-hidden="true" className="hero-check h-4 w-4 text-primary" />
      </m.span>
      <AnimatePresence mode="popLayout" initial={false}>
        {open ? (
          <m.span
            key="details"
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ...swap, delay: DURATION.fast } }}
            exit={{ opacity: 0, transition: swap }}
            className="flex flex-col text-left sm:flex-row sm:gap-1.5"
          >
            <span className="text-hero-foreground">{status}</span>
            {note && (
              <>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>{note}</span>
              </>
            )}
          </m.span>
        ) : (
          <m.span
            key="label"
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ...swap, delay: DURATION.fast } }}
            exit={{ opacity: 0, transition: swap }}
            className="flex items-center gap-1 text-hero-foreground"
          >
            Work authorization
            <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
          </m.span>
        )}
      </AnimatePresence>
    </m.button>
  );
}
