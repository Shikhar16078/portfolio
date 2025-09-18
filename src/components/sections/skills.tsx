"use client";

import { useState } from 'react';
import { skillsData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import AnimatedContent from '../animated-content';

export default function SkillsSection() {
  const allSkills = [
    ...skillsData.languages,
    ...skillsData.frameworks,
    ...skillsData.tools,
  ].sort((a, b) => b.proficiency - a.proficiency);

  const [isOpen, setIsOpen] = useState(false);
  const initialSkillsCount = 12;

  const topSkills = allSkills.slice(0, initialSkillsCount);
  const additionalSkills = allSkills.slice(initialSkillsCount);

  return (
    <section id="skills" className="w-full min-h-screen flex flex-col justify-center py-12 md:py-24 lg:py-32">
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
          <div className="mx-auto max-w-6xl py-12">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <div className="flex flex-wrap justify-center gap-4">
                {topSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-base font-medium px-4 py-2 rounded-lg shadow-md hover:bg-card transition-colors">
                    {skill.name}
                  </Badge>
                ))}
              </div>
              <CollapsibleContent>
                <div className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="flex flex-wrap justify-center gap-4 mt-4 pb-2">
                    {additionalSkills.map((skill, index) => (
                      <Badge key={index + initialSkillsCount} variant="secondary" className="text-base font-medium px-4 py-2 rounded-lg shadow-md hover:bg-card transition-colors">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
              {allSkills.length > initialSkillsCount && (
                <div className="text-center mt-8">
                  <CollapsibleTrigger asChild>
                    <Button>
                      {isOpen ? 'Show Less' : 'Show More'}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              )}
            </Collapsible>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
