
import Link from 'next/link';
import { projectsData } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselPagination,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import AnimatedContent from '../animated-content';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full min-h-screen flex items-center py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <AnimatedContent>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Projects</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A selection of projects I've worked on, showcasing my skills and experience.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent>
          <Carousel 
            className="w-full max-w-5xl mx-auto mt-12"
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
                        <CardHeader className="gap-2">
                            <div className="flex items-center gap-4">
                                {project.icon && (
                                    <Image
                                        src={project.icon}
                                        alt={`${project.title} logo`}
                                        width={24}
                                        height={24}
                                        className="rounded-full object-contain"
                                    />
                                )}
                                <CardTitle>{project.title}</CardTitle>
                            </div>
                            <div className="flex justify-between gap-2">
                                <Badge variant="outline" className="flex-shrink-0">{project.date}</Badge>
                                <span className="text-sm text-muted-foreground">{project.type} Project</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow">
                          <ul className="space-y-2 text-muted-foreground mb-4 flex-grow text-justify">
                            {project.description.map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
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
            <div className="flex justify-center items-center mt-8">
              <CarouselPrevious className="relative translate-x-[-150%] -translate-y-0" />
              <CarouselPagination />
              <CarouselNext className="relative translate-x-[150%] -translate-y-0" />
            </div>
          </Carousel>
        </AnimatedContent>
      </div>
    </section>
  );
}
