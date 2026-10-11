
"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { m, type Variants } from "motion/react";
import { skillsData } from "@/lib/data";
import { cappedInterval, DURATION, EASE_IN, EASE_OUT, exitTransition, springSnappy, staggerChildren } from "@/lib/motion";
import { ArrowRight, Briefcase, FolderGit2 } from "lucide-react";
import { Badge, badgeVariants as badgeStyles } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { skillUses } from "@/lib/skill-usage";
import { showOnPage } from "@/lib/show-on-page";
import { cn } from "@/lib/utils";
import { Reveal, useScrollReveal } from "../reveal";
import SectionShell from '../section-shell';
import CardRing from '../card-ring';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Skill {
  name: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const categoryLabels: Record<string, string> = {
  languages: 'Languages',
  backend: 'Backend',
  ai: 'AI/ML',
  frontend: 'Frontend',
  cloud: 'Cloud',
  databases: 'Databases',
  tools: 'Tools',
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.96, transition: exitTransition },
  // Switched away from this tab: a quick fade, all at once, so it clears before the next list lands.
  away: { opacity: 0, transition: { duration: 0.15, ease: EASE_IN } },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

const badgeClass =
  "skill-badge text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg shadow-xs transition-[scale,translate,box-shadow,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_srgb,hsl(var(--primary))_18%,hsl(var(--secondary)))]";

// Hover timing for the "Where I used it" popover: a short delay before opening, so sweeping the mouse
// across the list doesn't flash a popover per badge, and before closing, so the pointer can cross the
// gap from the badge into the popover.
const OPEN_DELAY_MS = 220;
const CLOSE_DELAY_MS = 160;
// Rows shown before the list scrolls, and each row's height (py-2 plus a text-sm and a text-xs line).
const MAX_VISIBLE_USES = 5;
const USE_ROW_REM = 3.25;

// A skill badge. If the skill appears in an experience entry or a project (skillUses), it opens
// "Where I used it": a list of those, each jumping to its card on the page (showOnPage). With a mouse it
// opens on hover (without taking focus) and stays open while the pointer is over the badge or the
// popover; a tap or Enter opens it too. Otherwise it is a plain badge.
function SkillBadge({ name }: { name: string }) {
  const uses = useMemo(() => skillUses(name), [name]);
  const [open, setOpen] = useState(false);
  const openedByHover = useRef(false);
  // Set when an entry is chosen: focus then goes to that card instead of back to this badge.
  const jumping = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (!uses.length) {
    return (
      <Badge variant="secondary" className={badgeClass}>
        {name}
      </Badge>
    );
  }

  const later = (fn: () => void, ms: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, ms);
  };
  const pointerEnter = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (!open)
      later(() => {
        openedByHover.current = true;
        jumping.current = false;
        setOpen(true);
      }, OPEN_DELAY_MS);
    else window.clearTimeout(timer.current);
  };
  const pointerLeave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    later(() => setOpen(false), CLOSE_DELAY_MS);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        window.clearTimeout(timer.current);
        if (next) {
          openedByHover.current = false;
          jumping.current = false;
        }
        setOpen(next);
      }}
    >
      <PopoverTrigger
        onPointerEnter={pointerEnter}
        onPointerLeave={pointerLeave}
        // Clicking a badge whose popover hover already opened keeps it open (instead of toggling it
        // shut); preventDefault skips Radix's toggle. Escape and outside clicks still close it.
        onClick={(e) => open && openedByHover.current && e.preventDefault()}
        className={cn(badgeStyles({ variant: "secondary" }), badgeClass, "focus-visible:ring-2 focus-visible:ring-ring")}
      >
        {name}
      </PopoverTrigger>
      <PopoverContent
        className="w-72 p-1.5"
        onPointerEnter={pointerEnter}
        onPointerLeave={pointerLeave}
        // Opened by hover: leave focus where it is.
        onOpenAutoFocus={(event) => openedByHover.current && event.preventDefault()}
        onCloseAutoFocus={(event) => (jumping.current || openedByHover.current) && event.preventDefault()}
      >
        <p className="px-2.5 pb-1.5 pt-1 text-xs font-medium text-muted-foreground">
          Where I used {name}
          {uses.length > MAX_VISIBLE_USES && <span className="text-muted-foreground/70"> · {uses.length}</span>}
        </p>
        {/* At most MAX_VISIBLE_USES rows show; longer lists scroll here without scrolling the page. */}
        <ul
          className="overflow-y-auto overscroll-contain [scrollbar-width:thin]"
          style={{ maxHeight: `${MAX_VISIBLE_USES * USE_ROW_REM}rem` }}
        >
          {uses.map((use) => {
            const Icon = use.kind === "experience" ? Briefcase : FolderGit2;
            return (
              <li key={use.id}>
                <button
                  type="button"
                  className="group flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-hidden"
                  onClick={() => {
                    jumping.current = true;
                    window.clearTimeout(timer.current);
                    setOpen(false);
                    showOnPage(use.id);
                  }}
                >
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{use.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">{use.detail}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

// Every tab's list stays mounted, stacked in one grid cell (see SkillsSection), so the block is always
// as tall as the longest list and the tab bar never moves. The active list cascades in; the others fade out.
// Lists also hide in reverse order when the section is scrolled back down out of view.
function SkillBadges({ skills, active }: { skills: Skill[]; active: boolean }) {
  const [ref, shown] = useScrollReveal<HTMLDivElement>();
  const listVariants = useMemo(
    () => ({ ...staggerChildren(cappedInterval(skills.length), 0.1), away: {} }),
    [skills.length]
  );
  return (
    <m.div
      ref={ref}
      className="skill-list flex flex-wrap justify-center gap-2 sm:gap-2.5 pt-6"
      initial="hidden"
      animate={!active ? "away" : shown ? "show" : "hidden"}
      variants={listVariants}
    >
      {skills.map((skill) => (
        <m.div key={skill.name} data-reveal="" variants={badgeVariants}>
          <SkillBadge name={skill.name} />
        </m.div>
      ))}
    </m.div>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const skillCategories: SkillCategory[] = [
    {
      title: 'All',
      skills: Object.values(skillsData).flat(),
    },
    ...Object.entries(skillsData).map(([key, skills]) => ({
      title: categoryLabels[key] ?? key,
      skills,
    })),
  ];

  return (
    <SectionShell id="skills" title="Skills" subtitle="The technologies and tools I work with." revealBody={false}>
      <div className="mx-auto max-w-5xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Reveal>
            <TabsList className="grid h-auto w-full grid-cols-4 lg:grid-cols-8 gap-2 rounded-md bg-muted/70 p-1.5">
              {skillCategories.map((category) => (
                <TabsTrigger
                  key={category.title}
                  value={category.title}
                  className="relative w-full px-2 py-2 text-xs sm:text-sm lg:px-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {/* One pill shared by all tabs; it slides to whichever is active, with a red border, a soft
                      glow and the cards' travelling arc of light. */}
                  {activeTab === category.title && (
                    <m.span
                      layoutId="skills-tab"
                      transition={springSnappy}
                      className="absolute inset-0 rounded-sm border border-primary/40 bg-background shadow-[0_0_14px_-4px_hsl(var(--primary)/0.6)]"
                    >
                      <CardRing />
                    </m.span>
                  )}
                  <span className="relative">{category.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Reveal>
          <div className="grid">
            {skillCategories.map((category) => {
              const active = activeTab === category.title;
              return (
                <TabsContent
                  key={category.title}
                  value={category.title}
                  forceMount
                  inert={!active}
                  className="mt-0 [grid-area:1/1]"
                >
                  <SkillBadges skills={category.skills} active={active} />
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </SectionShell>
  );
}
