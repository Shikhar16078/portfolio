
"use client";

import { useState } from "react";
import { educationData } from "@/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowUpRight, ArrowRightLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import AnimatedContent from "../animated-content";
import Image from "next/image";
import { cn } from "@/lib/utils";

const EducationCard = ({ item }: { item: (typeof educationData)[0] }) => {
  const [showCourses, setShowCourses] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowCourses(!showCourses);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="gap-2">
        <CardTitle>{item.degree}</CardTitle>
        <div className="flex items-center gap-3">
          {item.icon && (
            <Image
              src={item.icon}
              alt={`${item.institution} logo`}
              width={24}
              height={24}
              className="rounded-sm"
            />
          )}
          <CardDescription>{item.institution}</CardDescription>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="w-fit">
            {item.period}
          </Badge>
          <Badge variant="default" className="w-fit">
            {item.gpa}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col">
        <div 
          className={cn(
            "transition-all duration-300 ease-in-out",
            isAnimating ? "opacity-0 transform -translate-y-2" : "opacity-100 transform translate-y-0"
          )}
        >
          {showCourses ? (
            <ul className="space-y-2 text-muted-foreground bg-muted/50 rounded-md p-4">
              {item.courses.map((course) => (
                <li key={course} className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <span>{course}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-justify">{item.description}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-4 mt-auto">
        <Button variant="outline" className="w-full" onClick={handleToggle}>
          {showCourses ? 'Background' : 'Top Courses'} <ArrowRightLeft className="ml-2 h-4 w-4" />
        </Button>
        <Button asChild className="w-full">
          <Link href={item.website} target="_blank" rel="noopener noreferrer">
            Visit Website <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function EducationSection() {
  return (
    <section
      id="education"
      className="w-full min-h-screen flex items-center py-12 md:py-16 lg:py-20"
    >
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <AnimatedContent>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Education
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                My academic background and qualifications.
              </p>
            </div>
          </div>
        </AnimatedContent>

        <AnimatedContent>
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 py-12">
            {educationData.map((item) => (
              <EducationCard
                key={`${item.institution}-${item.degree}`}
                item={item}
              />
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
