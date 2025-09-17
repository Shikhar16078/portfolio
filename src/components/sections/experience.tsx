import { experienceData } from "@/lib/data"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Professional Experience</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My journey in software engineering.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 py-12">
          {experienceData.map((item, index) => (
            <div key={index} className="relative pl-8 sm:pl-12">
              <div className="absolute left-3 sm:left-5 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <div className="h-3 w-3 rounded-full bg-primary-foreground" />
              </div>
              <div className="absolute left-[17px] sm:left-[29px] h-full w-px bg-border" />
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{item.role}</CardTitle>
                    <Badge variant="outline">{item.period}</Badge>
                  </div>
                  <CardDescription>{item.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
