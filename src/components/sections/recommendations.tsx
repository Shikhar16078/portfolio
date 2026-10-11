
"use client";

import { personalData, recommendationsData } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPagination, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import { Linkedin } from "@/components/icons";
import SectionShell from '../section-shell';

export default function RecommendationsSection() {
  return (
    <SectionShell
      id="recommendations"
      title="Recommendations"
      subtitle="What others have to say about my work and collaboration."
    >
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
              <div className="p-1 h-full">
                <Card className="flex flex-col h-full">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex min-h-8 justify-center items-center mt-5">
          <CarouselPrevious className="relative translate-x-[-75%] sm:translate-x-[-150%] translate-y-0" />
          <CarouselPagination />
          <CarouselNext className="relative translate-x-[75%] sm:translate-x-[150%] translate-y-0" />
        </div>
      </Carousel>
      <div className="flex justify-center mt-5">
        <Button asChild>
          <Link href={personalData.linkedinRecommendationsUrl} target="_blank" rel="noopener noreferrer">
            <Linkedin className="mr-2 h-4 w-4" />
            View on LinkedIn
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
