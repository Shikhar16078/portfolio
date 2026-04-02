
"use client";

import { useState } from "react";
import { experienceData } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRightLeft } from "lucide-react";
import AnimatedContent from "../animated-content";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ExperienceCard = ({ item }: { item: (typeof experienceData)[0] }) => {
  const [showResponsibilities, setShowResponsibilities] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowResponsibilities(!showResponsibilities);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="gap-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-1">
          <CardTitle>{item.role}</CardTitle>
          <Badge variant="outline" className="flex-shrink-0">{item.period}</Badge>
        </div>
        <div className="flex items-center gap-3">
          {item.icon && (
            <Image
              src={item.icon}
              alt={`${item.company} logo`}
              width={24}
              height={24}
              className="rounded-sm object-contain"
            />
          )}
          <CardDescription>{item.company}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col">
        <div 
          className={cn(
            "transition-all duration-300 ease-in-out",
            isAnimating ? "opacity-0 transform -translate-y-2" : "opacity-100 transform translate-y-0"
          )}
        >
          {showResponsibilities ? (
            <ul className="space-y-3 text-muted-foreground">
              {item.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-justify whitespace-pre-line">{item.description}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-4 mt-auto">
        <Button variant="outline" className="w-full" onClick={handleToggle}>
          {showResponsibilities ? 'Background' : 'Responsibilities'} <ArrowRightLeft className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};


export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full flex items-center py-12 md:py-16 lg:py-20">
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
