"use client";

import { personalData } from "@/lib/data";
import { Button } from "../ui/button";
import { Mail, Phone } from "lucide-react";
import { Separator } from "../ui/separator";
import SectionShell from "../section-shell";

export default function ContactSection() {
  const phoneLink = `tel:${personalData.phone.replace(/[^\d+]/g, "")}`;

  return (
    <SectionShell
      id="contact"
      title="Let's Connect"
      subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Whether you have a question or just want to say hi, I'll do my best to get back to you!"
      // Last section: leave room for the footer so it fits on the same screen.
      className="min-h-[calc(100dvh-3.5rem-8rem)] sm:min-h-[calc(100dvh-3.5rem-6.75rem)]"
    >
      <div className="rounded-lg border bg-card text-card-foreground shadow-xs w-fit sm:w-full max-w-lg mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center p-6 sm:p-8 gap-6 sm:gap-8">
          <Button asChild size="lg" className="group">
            <a href={`mailto:${personalData.email}`}>
              <Mail className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6" /> Say Hello
            </a>
          </Button>

          <Separator orientation="vertical" className="hidden sm:block h-10" />
          <Separator orientation="horizontal" className="block sm:hidden w-1/2" />

          <Button asChild size="lg" className="group">
            <a href={phoneLink}>
              <Phone className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" /> Let&apos;s talk
            </a>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
