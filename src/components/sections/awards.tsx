import { awardsData } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPagination, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "../ui/badge";
import Image from "next/image";
import SectionShell from '../section-shell';
import CardRing from '../card-ring';
import BadgeRow from '../badge-row';
import { RevealGroup, RevealItem } from '../reveal';

export default function AwardsSection() {
  return (
    <SectionShell
      id="awards"
      title="Achievements & Awards"
      subtitle="A selection of my recognitions and accomplishments."
      revealBody={false}
    >
      <RevealGroup>
        <Carousel autoplay={6000} className="w-full max-w-5xl mx-auto" opts={{ loop: true, align: "start" }}>
          <CarouselContent>
            {awardsData.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <RevealItem className="p-1 h-full">
                  <Card data-slide-card className="group/card relative h-full flex flex-col transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30">
                    <CardRing />
                    <CardHeader className="gap-2 p-5 pb-3">
                      {/* Title on the left, date pinned to the right edge of the same row. */}
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <BadgeRow className="mt-0.5 shrink-0">
                          <Badge variant="secondary" className="date-badge whitespace-nowrap">{item.date}</Badge>
                        </BadgeRow>
                      </div>
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
                        <CardDescription className="text-glint w-fit">{item.issuer}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
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
    </SectionShell>
  );
}
