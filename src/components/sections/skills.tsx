
"use client";

import { skillsData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
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

export default function SkillsSection() {
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
    <SectionShell id="skills" title="Skills" subtitle="The technologies and tools I work with.">
      <div className="mx-auto max-w-5xl">
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-4 lg:grid-cols-8 gap-2 rounded-md bg-muted/70 p-1.5">
            {skillCategories.map((category) => (
              <TabsTrigger
                key={category.title}
                value={category.title}
                className="w-full px-2 py-2 text-xs sm:text-sm lg:px-3"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {skillCategories.map((category) => (
            <TabsContent
              key={category.title}
              value={category.title}
              className="mt-0 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95"
            >
              <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 pt-6">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm hover:bg-primary/80 transition-colors"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </SectionShell>
  );
}
