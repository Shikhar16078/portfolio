
"use client";

import { useMemo, useState } from "react";
import { m, type Variants } from "motion/react";
import { skillsData } from "@/lib/data";
import { cappedInterval, DURATION, EASE_IN, EASE_OUT, exitTransition, springSnappy, staggerChildren } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { Reveal, useScrollReveal } from "../reveal";
import SectionShell from '../section-shell';
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
      className="flex flex-wrap justify-center gap-2 sm:gap-2.5 pt-6"
      initial="hidden"
      animate={!active ? "away" : shown ? "show" : "hidden"}
      variants={listVariants}
    >
      {skills.map((skill) => (
        <m.div key={skill.name} data-reveal="" variants={badgeVariants}>
          <Badge
            variant="secondary"
            className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg shadow-xs hover:bg-primary/80 transition-colors"
          >
            {skill.name}
          </Badge>
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
                  {/* One pill shared by all tabs; it slides to whichever is active. */}
                  {activeTab === category.title && (
                    <m.span layoutId="skills-tab" transition={springSnappy} className="absolute inset-0 rounded-sm bg-background shadow-xs" />
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
