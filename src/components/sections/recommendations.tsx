
"use client";

import { useState } from "react";
import type { Recommendation } from "@/lib/site-config";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPagination, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import { Linkedin } from "@/components/icons";
import SectionShell from '../section-shell';
import CardRing from '../card-ring';
import { Reveal, RevealGroup, RevealItem } from '../reveal';

// A recommender's photo, from an outside link that can stop working (LinkedIn's photo links expire).
// If it fails to load it's removed, leaving the name. The ref catches a failure from before hydration,
// which onError would miss. A plain img because the host can change without a deploy, and next/image
// only accepts hosts listed in next.config.js. The name sits beside it, so the alt text is empty.
function RecommenderPhoto({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={(img) => {
        if (img?.complete && img.naturalWidth === 0) setFailed(true);
      }}
      src={src}
      alt=""
      width={40}
      height={40}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-border"
    />
  );
}

// `recommendations` and `linkedin` (the profile link) come from the Global Config store, the list
// already in order (see src/lib/site-config.ts). With no recommendations, the section stays, because
// the header links to it.
export default function RecommendationsSection({ recommendations = [], linkedin }: { recommendations?: Recommendation[]; linkedin?: string }) {
  return (
    <SectionShell
      id="recommendations"
      title="Recommendations"
      subtitle="What others have to say about my work and collaboration."
      revealBody={false}
    >
      {recommendations.length > 0 && (
        <RevealGroup>
          <Carousel autoplay={6000}
            className="w-full max-w-5xl mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {recommendations.map((rec) => (
                <CarouselItem key={rec.author} className="md:basis-1/2">
                  <RevealItem className="p-1 h-full">
                    <Card data-slide-card className="relative flex flex-col h-full transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30">
                      <CardRing />
                      <CardContent className="p-5 grow">
                        <blockquote className="border-l-2 border-primary pl-5 italic text-muted-foreground">
                          &ldquo;{rec.quote}&rdquo;
                        </blockquote>
                      </CardContent>
                      <CardHeader className="items-start gap-3 space-y-0 p-5 pt-0 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          {rec.photo && <RecommenderPhoto src={rec.photo} />}
                          <div className="flex min-w-0 flex-col">
                            <p className="font-semibold">{rec.author}</p>
                            {rec.title && <p className="text-sm text-muted-foreground">{rec.title}</p>}
                          </div>
                        </div>
                        {rec.profile && (
                          <Button asChild variant="outline" size="sm">
                            <Link href={rec.profile} target="_blank" rel="noopener noreferrer">
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </Link>
                          </Button>
                        )}
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
      )}
      {linkedin && (
        <Reveal className="flex justify-center mt-5">
          <Button asChild>
            <Link href={`${linkedin.replace(/\/$/, "")}/details/recommendations/?detailScreenTabIndex=0`} target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" />
              View on LinkedIn
            </Link>
          </Button>
        </Reveal>
      )}
    </SectionShell>
  );
}
