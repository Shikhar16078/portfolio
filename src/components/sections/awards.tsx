import { awardsData } from "@/lib/data"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselPagination,
} from '@/components/ui/carousel';
import AnimatedContent from "../animated-content";
import { Award } from "lucide-react";

export default function AwardsSection() {
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
           <Carousel 
            className="w-full max-w-lg mx-auto mt-12"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {awardsData.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-1 h-full">
                    <Card className="flex h-full">
                      <div className="p-6 pr-0 flex items-center">
                          <div className="p-3 rounded-full bg-primary/10 text-primary">
                              <Award className="h-6 w-6" />
                          </div>
                      </div>
                      <CardHeader className="flex-grow">
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.issuer} - {item.date}</CardDescription>
                        <CardContent className="p-0 pt-2">
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
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
      </div>
    </section>
  );
}
