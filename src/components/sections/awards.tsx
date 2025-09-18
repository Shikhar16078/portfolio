"use client";

import { useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { awardsData } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AnimatedContent from "../animated-content";
import { Award, ChevronsUpDown, Pause, Play } from "lucide-react";
import { Button } from "../ui/button";

export default function AwardsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoplayPlugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: false, stopOnMouseEnter: true }));

  const handleTogglePlay = () => {
    const autoplay = autoplayPlugin.current;
    if (!autoplay) return;

    if (isPlaying) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  return (
    <section id="awards" className="w-full flex flex-col justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <AnimatedContent>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Awards & Achievements</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A selection of my recognitions and accomplishments.
              </p>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent>
          <div className="mx-auto max-w-5xl py-12">
            {!isExpanded ? (
              <div className="relative">
                <Carousel
                  plugins={[autoplayPlugin.current]}
                  className="w-full"
                  opts={{ loop: true, align: "start" }}
                >
                  <CarouselContent>
                    {awardsData.map((item, index) => (
                      <CarouselItem key={index} className="md:basis-1/2">
                        <div className="p-1">
                          <Card className="h-full">
                            <CardHeader className="flex-row items-center gap-4">
                              <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Award className="h-6 w-6" />
                              </div>
                              <div className="flex-grow">
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.issuer} - {item.date}</CardDescription>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="absolute top-4 right-4 z-10">
                  <Button variant="ghost" size="icon" onClick={handleTogglePlay} className="rounded-full">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2">
                {awardsData.map((item, index) => (
                  <Card key={index}>
                    <CardHeader className="flex-row items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Award className="h-6 w-6" />
                      </div>
                      <div className="flex-grow">
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.issuer} - {item.date}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            <div className="flex justify-center mt-8">
              <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Show Less" : "Show All"}
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
