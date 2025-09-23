
"use client";

import { recommendationsData } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPagination, CarouselPrevious } from "@/components/ui/carousel";
import AnimatedContent from "../animated-content";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function RecommendationsSection() {
  return (
    <section id="recommendations" className="w-full flex items-center py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <AnimatedContent>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Recommendations</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                What others have to say about my work and collaboration.
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
              {recommendationsData.map((rec, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-1 h-full">
                    <Card className="flex flex-col h-full">
                      <CardContent className="p-6 flex-grow">
                        <blockquote className="border-l-2 border-primary pl-6 italic text-muted-foreground">
                          "{rec.quote}"
                        </blockquote>
                      </CardContent>
                      <CardHeader className="flex-row items-center gap-4 pt-0">
                        <Image
                          src={rec.image}
                          alt={rec.author}
                          width={48}
                          height={48}
                          className="rounded-full"
                          data-ai-hint="person"
                        />
                        <div className="flex flex-col">
                          <p className="font-semibold">{rec.author}</p>
                          <p className="text-sm text-muted-foreground">{rec.title}</p>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center items-center mt-8">
              <CarouselPrevious className="relative translate-x-[-150%] -translate-y-0" />
              <CarouselPagination />
              <CarouselNext className="relative translate-x-[150%] -translate-y-0" />
            </div>
          </Carousel>
        </AnimatedContent>
        <AnimatedContent>
          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="https://www.linkedin.com/in/shikhar1999/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                View on LinkedIn
              </Link>
            </Button>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
