import { awardsData } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPagination, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "../ui/badge";
import Image from "next/image";
import SectionShell from '../section-shell';

export default function AwardsSection() {
  return (
    <SectionShell
      id="awards"
      title="Achievements & Awards"
      subtitle="A selection of my recognitions and accomplishments."
    >
      <Carousel className="w-full max-w-5xl mx-auto" opts={{ loop: true, align: "start" }}>
        <CarouselContent>
          {awardsData.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2">
              <div className="p-1 h-full">
                <Card className="h-full flex flex-col">
                  <CardHeader className="gap-2 p-5 pb-3">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <Image
                          src={item.icon}
                          alt={`${item.issuer} logo`}
                          width={24}
                          height={24}
                          className="rounded-sm"
                        />
                      )}
                      <CardDescription>{item.issuer}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="w-fit">{item.date}</Badge>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
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
    </SectionShell>
  );
}
