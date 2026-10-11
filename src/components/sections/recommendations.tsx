
"use client";

import { personalData, recommendationsData } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPagination, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import { Linkedin } from "@/components/icons";
import SectionShell from '../section-shell';
import { Reveal, RevealGroup, RevealItem } from '../reveal';

export default function RecommendationsSection() {
  return (
    <SectionShell
      id="recommendations"
      title="Recommendations"
      subtitle="What others have to say about my work and collaboration."
      revealBody={false}
    >
      <RevealGroup>
        <Carousel 
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {recommendationsData.map((rec, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <RevealItem className="p-1 h-full">
                  <Card data-slide-card className="flex flex-col h-full transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30">
                    <CardContent className="p-5 grow">
                      <blockquote className="border-l-2 border-primary pl-5 italic text-muted-foreground">
                        &ldquo;{rec.quote}&rdquo;
                      </blockquote>
                    </CardContent>
                    <CardHeader className="flex-row items-center justify-between gap-4 space-y-0 p-5 pt-0">
                      <div className="flex flex-col">
                        <p className="font-semibold">{rec.author}</p>
                        <p className="text-sm text-muted-foreground">{rec.title}</p>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={rec.profile} target="_blank" rel="noopener noreferrer">
                          <User className="mr-2 h-4 w-4" />
                          View Profile
                        </Link>
                      </Button>
                    </CardHeader>
                  </Card>
                </RevealItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <RevealItem className="flex min-h-8 justify-center items-center mt-5">
            <CarouselPrevious className="relative translate-x-[-75%] sm:translate-x-[-150%] translate-y-0" />
            <CarouselPagination />
            <CarouselNext className="relative translate-x-[75%] sm:translate-x-[150%] translate-y-0" />
          </RevealItem>
        </Carousel>
      </RevealGroup>
      <Reveal className="flex justify-center mt-5">
        <Button asChild>
          <Link href={personalData.linkedinRecommendationsUrl} target="_blank" rel="noopener noreferrer">
            <Linkedin className="mr-2 h-4 w-4" />
            View on LinkedIn
          </Link>
        </Button>
      </Reveal>
    </SectionShell>
  );
}
