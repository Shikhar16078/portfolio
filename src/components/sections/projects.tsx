import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/lib/data';
import placeholderData from '@/lib/placeholder-images.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectsSection() {
  const { placeholderImages } = placeholderData;

  return (
    <section id="projects" className="w-full min-h-screen flex flex-col justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">My Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of projects I've worked on, showcasing my skills and experience.
            </p>
          </div>
        </div>
        <Carousel className="w-full max-w-5xl mx-auto mt-12"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {projectsData.map((project, index) => {
              const projectImage = placeholderImages.find(p => p.id === project.image);
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardHeader>
                        {projectImage && (
                          <Image
                            src={projectImage.imageUrl}
                            alt={project.title}
                            width={600}
                            height={400}
                            data-ai-hint={projectImage.imageHint}
                            className="aspect-video w-full overflow-hidden rounded-t-lg object-cover"
                          />
                        )}
                        <CardTitle className="pt-4">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col h-full justify-between">
                        <div>
                          <p className="text-muted-foreground mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                        <Button asChild variant="outline" className="mt-auto w-fit">
                          <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
