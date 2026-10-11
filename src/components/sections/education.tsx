import Link from "next/link";
import { educationData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import SectionShell from "../section-shell";
import { Timeline, TimelineEntry } from "../timeline";

export default function EducationSection() {
  return (
    <SectionShell id="education" title="Education" subtitle="My academic background and qualifications." revealBody={false}>
      <Timeline>
        {educationData.map((item, index) => (
          <TimelineEntry
            key={`${item.institution}-${item.degree}`}
            logo={{ src: item.icon, alt: `${item.institution} logo` }}
            title={item.degree}
            subtitle={item.institution}
            meta={
              <>
                <Badge variant="outline" className="w-fit whitespace-nowrap">{item.period}</Badge>
                <Badge variant="default" className="w-fit whitespace-nowrap">{item.gpa}</Badge>
              </>
            }
            isLast={index === educationData.length - 1}
            panels={[{ id: "background", label: "Background", content: <p className="text-muted-foreground">{item.description}</p> }]}
            action={
              <Button asChild variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary">
                <Link href={item.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${item.institution} website`}>
                  Visit
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          >
            <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-muted-foreground sm:grid-cols-2">
              {item.courses.map((course) => (
                <li key={course} className="flex items-start gap-2">
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{course}</span>
                </li>
              ))}
            </ul>
          </TimelineEntry>
        ))}
      </Timeline>
    </SectionShell>
  );
}
