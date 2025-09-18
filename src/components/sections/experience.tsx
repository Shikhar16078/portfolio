"use client";

import { useState } from "react";
import { experienceData } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle2, ChevronsUpDown, Briefcase } from "lucide-react";
import AnimatedContent from "../animated-content";

const ExperienceCard = ({ item }: { item: (typeof experienceData)[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const responsibilitiesToShow = 3;
  const hasMoreResponsibilities = item.responsibilities.length > responsibilitiesToShow;

  const initialResponsibilities = hasMoreResponsibilities
    ? item.responsibilities.slice(0, responsibilitiesToShow)
    : item.responsibilities;

  const additionalResponsibilities = hasMoreResponsibilities
    ? item.responsibilities.slice(responsibilitiesToShow)
    : [];

  return (
    <div className="relative pl-8 sm:pl-12">
      <div className="absolute left-3 sm:left-5 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Briefcase className="h-4 w-4" />
      </div>
      <div className="absolute left-[17px] sm:left-[29px] top-7 h-[calc(100%-1.75rem)] w-px bg-border" />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{item.role}</CardTitle>
              <Badge variant="outline">{item.period}</Badge>
            </div>
            <CardDescription>{item.company}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              {initialResponsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
            <CollapsibleContent>
              <ul className="space-y-3 text-muted-foreground mt-3">
                {additionalResponsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </CardContent>
          {hasMoreResponsibilities && (
            <CardFooter>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full">
                  {isOpen ? "Show Less" : "Show Details"}
                  <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
            </CardFooter>
          )}
        </Card>
      </Collapsible>
    </div>
  );
};


export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full min-h-screen flex items-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <AnimatedContent>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Work Experience</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                My journey in software engineering.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent>
          <div className="mx-auto grid max-w-5xl gap-8 py-12">
            {experienceData.map((item, index) => (
              <ExperienceCard key={index} item={item} />
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
