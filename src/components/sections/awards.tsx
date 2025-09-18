"use client";

import { useState } from "react";
import { awardsData } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AnimatedContent from "../animated-content";
import { Award, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { cn } from "@/lib/utils";

export default function AwardsSection() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <div className={cn("transition-opacity duration-300", isOpen ? "opacity-0 h-0" : "opacity-100")}>
                {!isOpen && (
                  <Carousel
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
                )}
              </div>
              
              <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
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
              </CollapsibleContent>

              <div className="flex justify-center mt-8">
                <CollapsibleTrigger asChild>
                  <Button variant="outline">
                    {isOpen ? "Show Less" : "Show All"}
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>
            </Collapsible>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
