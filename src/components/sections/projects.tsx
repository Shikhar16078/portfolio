
import Link from 'next/link';
import { projectsData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselPagination,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Github } from '@/components/icons';
import SectionShell from '../section-shell';

export default function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      title="Projects"
      subtitle="A selection of projects I've worked on."
    >
      <Carousel 
        className="w-full max-w-5xl mx-auto"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {projectsData.map((project, index) => {
            return (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-1 h-full">
                  <Card className="flex flex-col h-full">
                    <CardHeader className="gap-2 p-5 pb-3">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {project.icon && (
                                    <Image
                                        src={project.icon}
                                        alt={`${project.title} logo`}
                                        width={24}
                                        height={24}
                                        className="rounded-full object-contain"
                                    />
                                )}
                                <CardTitle className="text-xl">{project.title}</CardTitle>
                            </div>
                            {project.github && (
                                <Button asChild variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                    <Link href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}>
                                        <Github className="h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                        </div>
                        <div className="flex justify-between gap-2">
                            <Badge variant="outline" className="shrink-0">{project.date}</Badge>
                            <Badge variant="outline" className="shrink-0">{project.type} Project</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col grow p-5 pt-0">
                      <ul className="space-y-2 text-muted-foreground mb-4 grow">
                        {project.description.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex justify-center items-center mt-5">
          <CarouselPrevious className="relative translate-x-[-75%] sm:translate-x-[-150%] translate-y-0" />
          <CarouselPagination />
          <CarouselNext className="relative translate-x-[75%] sm:translate-x-[150%] translate-y-0" />
        </div>
      </Carousel>
    </SectionShell>
  );
}