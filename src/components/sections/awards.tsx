import { awardsData } from "@/lib/data"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import AnimatedContent from "../animated-content";
import { Award } from "lucide-react";

export default function AwardsSection() {
  return (
    <section id="awards" className="w-full min-h-screen flex flex-col justify-center py-12 md:py-24 lg:py-32">
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
          <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2">
            {awardsData.map((item, index) => (
              <Card key={index} className="flex">
                <div className="p-6 pr-0">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Award className="h-6 w-6" />
                    </div>
                </div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.issuer} - {item.date}</CardDescription>
                  <CardContent className="p-0 pt-2">
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
