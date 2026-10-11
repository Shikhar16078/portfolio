
"use client";

import { educationData } from "@/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import SectionShell from "../section-shell";
import Image from "next/image";

const PANEL =
  "col-start-1 row-start-1 mt-2 data-[state=inactive]:invisible data-[state=active]:animate-in data-[state=active]:fade-in-0";

const EducationCard = ({ item }: { item: (typeof educationData)[0] }) => {
  return (
    <Card className="h-full">
      <Tabs defaultValue="courses" className="flex h-full flex-col">
        <CardHeader className="gap-2 p-5 pb-2">
          <CardTitle className="text-xl">{item.degree}</CardTitle>
          <div className="flex items-center gap-3">
            {item.icon && (
              <Image
                src={item.icon}
                alt={`${item.institution} logo`}
                width={24}
                height={24}
                className="flex-shrink-0 rounded-sm"
              />
            )}
            <CardDescription className="flex-1">{item.institution}</CardDescription>
            <Button asChild variant="ghost" size="sm" className="h-8 flex-shrink-0 gap-1 px-2 text-primary hover:text-primary">
              <Link href={item.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${item.institution} website`}>
                Visit
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="secondary" className="w-fit whitespace-nowrap">
              {item.period}
            </Badge>
            <Badge variant="default" className="w-fit whitespace-nowrap">
              {item.gpa}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-grow p-5 pt-1">
          <TabsList className="h-8 p-0.5">
            <TabsTrigger value="courses" className="px-2.5 py-1 text-xs">Top Courses</TabsTrigger>
            <TabsTrigger value="background" className="px-2.5 py-1 text-xs">Background</TabsTrigger>
          </TabsList>
          {/* Both views share one grid cell, so the card always reserves the taller one's height
              and switching never resizes this card or its neighbour. */}
          <div className="grid">
            <TabsContent forceMount value="courses" className={PANEL}>
              <ul className="space-y-1.5 text-sm text-muted-foreground bg-muted/50 rounded-md p-4">
                {item.courses.map((course) => (
                  <li key={course} className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent forceMount value="background" className={PANEL}>
              <p className="text-sm text-muted-foreground bg-muted/50 rounded-md p-4">{item.description}</p>
            </TabsContent>
          </div>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default function EducationSection() {
  return (
    <SectionShell id="education" title="Education" subtitle="My academic background and qualifications.">
      <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-6">
        {educationData.map((item) => (
          <EducationCard key={`${item.institution}-${item.degree}`} item={item} />
        ))}
      </div>
    </SectionShell>
  );
}
