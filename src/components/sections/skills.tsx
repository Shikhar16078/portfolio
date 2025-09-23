
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

export default function SkillsSection() {
  const allSkills = [
    ...skillsData.languages,
    ...skillsData.frameworks,
    ...skillsData.tools,
  ];

  const skillCategories: SkillCategory[] = [
    { title: 'All', skills: allSkills },
    { title: 'Languages', skills: skillsData.languages },
    { title: 'Frameworks', skills: skillsData.frameworks },
    { title: 'Tools', skills: skillsData.tools },
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
              <TabsList className="grid w-full grid-cols-4">
                {skillCategories.map((category) => (
                  <TabsTrigger key={category.title} value={category.title}>
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
                    <div className="flex flex-wrap justify-center gap-4 py-8">
                      {category.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-base font-medium px-4 py-2 rounded-lg shadow-md hover:bg-primary/80 transition-colors"
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
