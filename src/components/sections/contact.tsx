"use client";

import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { Linkedin } from "../icons";
import { Separator } from "../ui/separator";
import SectionShell from "../section-shell";

// `email` and `linkedin` come from the Global Config store (see src/lib/site-config.ts). A missing
// one has no button, and with neither there is no card.
export default function ContactSection({ email, linkedin }: { email?: string; linkedin?: string }) {
  return (
    <SectionShell
      id="contact"
      title="Let's Connect"
      subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Whether you have a question or just want to say hi, I'll do my best to get back to you!"
    >
      {(email || linkedin) && (
        // contact-ring: the hero photo's spinning red ring, as this card's border.
        <div className="contact-ring w-full max-w-sm sm:max-w-lg mx-auto shadow-xs">
          <div className="rounded-[calc(var(--radius)-1px)] bg-card text-card-foreground">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center p-6 sm:p-8 gap-6 sm:gap-8">
              {email && (
                <Button asChild size="lg" className="group sm:w-44">
                  <a href={`mailto:${email}`}>
                    <Mail className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6" /> Email Me
                  </a>
                </Button>
              )}

              {email && linkedin && (
                <>
                  <Separator orientation="vertical" className="hidden sm:block h-10" />
                  <Separator orientation="horizontal" className="block sm:hidden w-1/2 self-center" />
                </>
              )}

              {linkedin && (
                <Button asChild size="lg" className="group sm:w-44">
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Message me on LinkedIn">
                    <Linkedin className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" /> Message Me
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  );
}
