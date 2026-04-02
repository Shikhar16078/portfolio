
"use client";

import { skillsData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import AnimatedContent from '../animated-content';
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
    <section id="skills" className="w-full min-h-screen flex items-center py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <AnimatedContent>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Skills</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The technologies and tools I work with.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent>
          <div className="mx-auto max-w-4xl py-12">
            <Tabs defaultValue="All" className="w-full">
              <TabsList
                className="grid h-auto w-full grid-cols-3 gap-2 rounded-md bg-muted/70 p-1.5 md:flex md:flex-wrap md:justify-center"
              >
                {skillCategories.map((category) => (
                  <TabsTrigger
                    key={category.title}
                    value={category.title}
                    className="w-full px-2 py-2.5 text-xs sm:px-4 sm:text-sm md:min-w-[112px] md:flex-1 md:px-4 md:text-base last:col-start-2 md:last:col-start-auto"
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {skillCategories.map((category) => (
                <TabsContent 
                  key={category.title} 
                  value={category.title}
                  className="data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95"
                >
                  <AnimatedContent>
                      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 py-8">
                      {category.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                            className="text-sm sm:text-base font-medium px-3 sm:px-4 py-2 rounded-lg shadow-md hover:bg-primary/80 transition-colors"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </AnimatedContent>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
