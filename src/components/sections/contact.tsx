"use client";

import { personalData, socialLinks } from "@/lib/data";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { Linkedin } from "../icons";
import { Separator } from "../ui/separator";
import SectionShell from "../section-shell";

export default function ContactSection() {
  const linkedin = socialLinks.find((link) => link.name === "LinkedIn");

  return (
    <SectionShell
      id="contact"
      title="Let's Connect"
      subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Whether you have a question or just want to say hi, I'll do my best to get back to you!"
    >
      <div className="rounded-lg border bg-card text-card-foreground shadow-xs w-full max-w-sm sm:max-w-lg mx-auto">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center p-6 sm:p-8 gap-6 sm:gap-8">
          <Button asChild size="lg" className="group sm:w-44">
            <a href={`mailto:${personalData.email}`}>
              <Mail className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6" /> Email Me
            </a>
          </Button>

          {linkedin && (
            <>
              <Separator orientation="vertical" className="hidden sm:block h-10" />
              <Separator orientation="horizontal" className="block sm:hidden w-1/2 self-center" />

              <Button asChild size="lg" className="group sm:w-44">
                <a href={linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="Message me on LinkedIn">
                  <Linkedin className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" /> Message Me
                </a>
              </Button>
            </>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
