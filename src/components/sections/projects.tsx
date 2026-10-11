
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
import { ChevronRight, GraduationCap, Sparkles } from 'lucide-react';
import { Github } from '@/components/icons';
import SectionShell from '../section-shell';
import CardRing from '../card-ring';
import BadgeRow, { techBadgeClass } from '../badge-row';
import { projectCardId } from '@/lib/skill-usage';
import { RevealGroup, RevealItem } from '../reveal';

export default function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      title="Projects"
      subtitle="A selection of projects I've worked on."
      revealBody={false}
    >
      <RevealGroup>
        <Carousel autoplay={6000} 
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
                  <RevealItem className="p-1 h-full">
                    <Card id={projectCardId(project)} tabIndex={-1} data-slide-card className="group/card relative flex flex-col h-full outline-hidden transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30">
                      <CardRing />
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
                          <BadgeRow className="flex justify-between gap-2">
                              <Badge variant="outline" className="date-badge shrink-0">{project.date}</Badge>
                              <Badge variant="outline" className="shrink-0 gap-1.5">
                                  {/* Nudges when the card is hovered (type-icon). */}
                                  {project.type === 'Academic' ? (
                                      <GraduationCap aria-hidden="true" className="type-icon h-3.5 w-3.5 text-primary" />
                                  ) : (
                                      <Sparkles aria-hidden="true" className="type-icon h-3.5 w-3.5 text-primary" />
                                  )}
                                  {project.type} Project
                              </Badge>
                          </BadgeRow>
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
                        <BadgeRow delay={0.15} className="flex flex-wrap gap-2 justify-center">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className={techBadgeClass}>{tech}</Badge>
                          ))}
                        </BadgeRow>
                      </CardContent>
                    </Card>
                  </RevealItem>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <RevealItem className="flex min-h-8 justify-center items-center mt-5">
            <CarouselPrevious className="relative translate-x-[-75%] sm:translate-x-[-150%] translate-y-0" />
            <CarouselPagination />
            <CarouselNext className="relative translate-x-[75%] sm:translate-x-[150%] translate-y-0" />
          </RevealItem>
        </Carousel>
      </RevealGroup>
    </SectionShell>
  );
}