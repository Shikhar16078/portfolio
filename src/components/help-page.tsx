"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Check,
  Copy,
  FileText,
  FolderGit2,
  GraduationCap,
  House,
  Mail,
  Star,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import BadgeRow, { techBadgeClass } from "@/components/badge-row";
import CardRing from "@/components/card-ring";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Github, Linkedin } from "@/components/icons";
import { RevealGroup, RevealItem } from "@/components/reveal";
import SectionShell from "@/components/section-shell";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { personalData } from "@/lib/data";
import { springSnappy } from "@/lib/motion";
import { profileLinks, sectionLinks } from "@/lib/short-links";
import type { SiteConfig } from "@/lib/site-config";
import { getSocialLinks } from "@/lib/social-links";
import { cn } from "@/lib/utils";

const host = new URL(personalData.siteUrl).host;
const COPIED_MS = 1500;

// Each link's icon, by its first name. The section links use the same icons as the header's nav.
const icons: Record<string, LucideIcon> = {
  resume: FileText,
  linkedin: Linkedin,
  github: Github,
  recommendations: Star,
  about: House,
  experience: Briefcase,
  projects: FolderGit2,
  education: GraduationCap,
  skills: Wrench,
  awards: Award,
  contact: Mail,
};

function CopyButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${personalData.siteUrl}/${name}`);
    } catch {
      return; // The browser refused; the address is still on screen.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy ${host}/${name}`}
      className="relative z-10 h-8 w-8 shrink-0 text-muted-foreground hover:bg-primary/10 hover:text-primary"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={copied ? "copied" : "copy"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.1 } }}
          transition={springSnappy}
          className="flex"
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </m.span>
      </AnimatePresence>
    </Button>
  );
}

// One destination: the whole card links to it, and its other names are badges that link there too.
function LinkCard({ label, names, external }: { label: string; names: string[]; external?: boolean }) {
  const [main, ...others] = names;
  const Icon = icons[main];
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const target = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Card className="group/card relative flex h-full flex-col gap-4 p-5 transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30">
      <CardRing />
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon aria-hidden="true" className="type-icon h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <a
            href={`/${main}`}
            {...target}
            className="font-semibold after:absolute after:inset-0 after:rounded-lg focus-visible:outline-hidden focus-visible:after:ring-2 focus-visible:after:ring-ring"
          >
            {label}
            <Arrow
              aria-hidden="true"
              className="ml-1 inline h-4 w-4 align-[-0.125em] text-primary transition-[translate] duration-200 ease-out group-hover/card:translate-x-0.5 motion-reduce:group-hover/card:translate-x-0"
            />
          </a>
          {/* Wraps at the slash on narrow phones rather than mid-word. */}
          <p className="text-glint w-fit max-w-full text-sm [overflow-wrap:anywhere]">
            {host}
            <wbr />/{main}
          </p>
        </div>
        <CopyButton name={main} />
      </div>
      {others.length > 0 && (
        <BadgeRow delay={0.15} className="relative z-10 mt-auto flex flex-wrap gap-2">
          {others.map((name) => (
            <a
              key={name}
              href={`/${name}`}
              {...target}
              aria-label={`${label}: ${host}/${name}`}
              className={cn(badgeVariants({ variant: "secondary" }), techBadgeClass)}
            >
              /{name}
            </a>
          ))}
        </BadgeRow>
      )}
    </Card>
  );
}

// The /help page: every short link, in the same look as the portfolio. The lists come from
// src/lib/short-links.js, which also creates the links.
export default function HelpPage({ config }: { config: SiteConfig }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header activeSection="" resume={config.resume} linkPrefix="/" />
      <main className="flex-1">
        <SectionShell
          id="profiles"
          title="Short Links"
          subtitle="Easy-to-remember addresses for my resume and profiles. Capitals don't matter, and every name below works."
          revealBody={false}
        >
          <RevealGroup className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {profileLinks.map((link) => (
              <RevealItem key={link.label} className="h-full min-w-0">
                <LinkCard {...link} external />
              </RevealItem>
            ))}
          </RevealGroup>
        </SectionShell>
        <SectionShell
          id="portfolio-sections"
          title="Portfolio Sections"
          subtitle="Jump straight to any part of my portfolio."
          revealBody={false}
        >
          <RevealGroup className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4">
            {sectionLinks.map((link) => (
              <RevealItem key={link.label} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]">
                <LinkCard label={link.label} names={link.names} />
              </RevealItem>
            ))}
          </RevealGroup>
        </SectionShell>
      </main>
      <Footer social={getSocialLinks(config)} />
    </div>
  );
}
