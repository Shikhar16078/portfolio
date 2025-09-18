"use client";

import { useState, useRef, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { awardsData } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AnimatedContent from "../animated-content";
import { Award, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";

export default function AwardsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [api, setApi] = useState<CarouselApi>()
  const autoplayPlugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true, stopOnMouseEnter: true }));

  useEffect(() => {
    if (!api) {
      return;
    }
    // Stop autoplay when expanded, and restart when collapsed
    if (isExpanded) {
      autoplayPlugin.current.stop();
    } else {
      autoplayPlugin.current.play(api);
    }
  }, [api, isExpanded]);

  return (
    <section id="awards" className="w-full min-h-screen flex items-center py-12 md:py-16 lg:py-20">
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
                  setApi={setApi}
                  plugins={[autoplayPlugin.current]}
                  className="w-full"
                  opts={{ loop: true, align: "start" }}
                >
                  <CarouselContent>
                    {awardsData.map((item, index) => (
                      <CarouselItem key={index} className="md:basis-1/2">
                        <div className="p-1 h-full">
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
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2">
                {awardsData.map((item, index) => (
                  <Card key={index} className="h-full">
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
