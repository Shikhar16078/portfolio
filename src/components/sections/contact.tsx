import { personalData } from "@/lib/data";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full min-h-screen flex items-center py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid items-center justify-center gap-4 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline pb-3">Let's Connect</h2>
            <p className="mx-auto max-w-[1000px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pb-3">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Whether you have a question or just want to say hi, I'll do my best to get back to you!
            </p>
          </div>
          <div className="flex justify-center">
            <Button asChild size="lg">
              <a href={`mailto:${personalData.email}`}>
                <Mail className="mr-2 h-5 w-5" /> Say Hello
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
