"use client";

import { useId, useState } from "react";
import { experienceData } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown } from "lucide-react";
import AnimatedContent from "../animated-content";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Experience = (typeof experienceData)[number];

const CompanyLogo = ({ item, isCurrent, className }: { item: Experience; isCurrent: boolean; className?: string }) => (
  <div
    className={cn(
      "items-center justify-center overflow-hidden rounded-full bg-white p-0.5 ring-2",
      isCurrent ? "ring-primary" : "ring-border",
      className
    )}
  >
    <Image src={item.icon} alt={`${item.company} logo`} width={40} height={40} className="h-full w-full rounded-full object-contain" />
  </div>
);

const TimelineItem = ({ item, isLast }: { item: Experience; isLast: boolean }) => {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const isCurrent = item.period.includes("Present");

  return (
    <li className="relative sm:pl-16 pb-6 sm:pb-8 last:pb-0">
      {!isLast && (
        <span aria-hidden="true" className="absolute left-[22px] top-[73px] -bottom-[29px] hidden w-px bg-border sm:block" />
      )}
      <CompanyLogo item={item} isCurrent={isCurrent} className="absolute left-0 top-[29px] hidden h-11 w-11 sm:flex" />

      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex items-center gap-3">
            <CompanyLogo item={item} isCurrent={isCurrent} className="h-10 w-10 flex-shrink-0 sm:hidden" />
            <div>
              <h3 className="text-lg sm:text-xl font-semibold leading-tight">{item.role}</h3>
              <p className="text-muted-foreground">{item.company}</p>
            </div>
          </div>
          <Badge variant={isCurrent ? "default" : "outline"} className="w-fit flex-shrink-0">
            {item.period}
          </Badge>
        </div>

        <p className="mt-3 text-muted-foreground">{item.summary}</p>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          {item.highlights.map((h) => (
            <div key={h.label} className="flex items-baseline gap-2 rounded-lg bg-muted/50 px-3 py-2 sm:block sm:p-3">
              <p className="whitespace-nowrap text-base sm:text-lg font-bold text-primary leading-tight">{h.value}</p>
              <p className="text-sm text-muted-foreground leading-snug sm:mt-1">{h.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="mt-3 -ml-3 text-primary hover:text-primary"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={detailsId}
        >
          {open ? "Hide details" : "Show details"}
          <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform duration-300", open && "rotate-180")} />
        </Button>

        <div
          id={detailsId}
          aria-hidden={!open}
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-in-out",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="space-y-4 pt-3">
              <p className="text-muted-foreground whitespace-pre-line">{item.description}</p>
              <ul className="space-y-3 text-muted-foreground">
                {item.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <AnimatedContent>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Experience</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                My journey in software engineering.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent>
          <ol className="mx-auto max-w-4xl py-12">
            {experienceData.map((item, index) => (
              <TimelineItem key={`${item.company}-${item.period}`} item={item} isLast={index === experienceData.length - 1} />
            ))}
          </ol>
        </AnimatedContent>
      </div>
    </section>
  );
}
