"use client";

import { useState } from 'react';
import { skillsData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';

export default function SkillsSection() {
  const allSkills = [
    ...skillsData.languages,
    ...skillsData.frameworks,
    ...skillsData.tools,
  ].sort((a, b) => b.proficiency - a.proficiency);

  const [showAll, setShowAll] = useState(false);
  const initialSkillsCount = 12;

  const skillsToShow = showAll ? allSkills : allSkills.slice(0, initialSkillsCount);

  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Skills</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The technologies and tools I work with.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl py-12">
          <div className="flex flex-wrap justify-center gap-4">
            {skillsToShow.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-base font-medium px-4 py-2 rounded-lg shadow-sm">
                {skill.name}
              </Badge>
            ))}
          </div>
          {!showAll && allSkills.length > initialSkillsCount && (
            <div className="text-center mt-8">
              <Button onClick={() => setShowAll(true)}>Show More</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
