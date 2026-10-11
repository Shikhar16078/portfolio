import { Fragment, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { personalData, socialLinks } from '@/lib/data';
import { BadgeCheck, Download, Mail } from 'lucide-react';
import HeroSpotlight from '@/components/hero-spotlight';

// Position in the hero's entrance sequence (see the hero-* utilities in globals.css).
const seq = (i: number) => ({ '--i': i }) as CSSProperties;

// Splits the bio around its highlight phrases, so they can be emphasised.
function BioText({ text, highlights }: { text: string; highlights: string[] }) {
  if (!highlights.length) return text;
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const parts = text.split(new RegExp(`(${escaped.join('|')})`));
  let n = 0;
  return parts.map((part, i) =>
    i % 2 ? (
      <strong key={i} className="hero-highlight" style={{ '--h': n++ } as CSSProperties}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function HomeSection() {
  return (
    <section id="home" className="relative isolate overflow-hidden w-full min-h-[calc(100dvh-3.5rem)] flex items-center justify-center bg-hero text-hero-foreground py-8 [@media(max-height:700px)]:py-4">
      <div aria-hidden="true" className="hero-backdrop">
        <div className="hero-glow -left-56 -top-64 animate-[glow-drift-a_22s_ease-in-out_infinite_alternate]" />
        <div className="hero-glow -right-56 -bottom-72 animate-[glow-drift-b_26s_ease-in-out_infinite_alternate]" />
        <HeroSpotlight />
      </div>
      <div className="relative container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-5 text-center [@media(max-height:700px)]:space-y-3">
            <div data-hero-fg="circle" className="profile-ring hero-pop hover:scale-105 hover:cursor-none">
              <div className="profile-ring-spinner" />
              <div className="profile-ring-inner">
                <Image
                  src="/assets/images/profile.jpeg"
                  alt="Profile Picture"
                  width={192}
                  height={192}
                  className="rounded-full object-cover aspect-square block [@media(max-height:700px)]:h-32 [@media(max-height:700px)]:w-32"
                  priority
                />
              </div>
            </div>
            <div className="space-y-2">
              <h1 data-hero-fg="text" className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                {personalData.name.split(' ').map((word, i, words) => (
                  <Fragment key={word}>
                    <span className="hero-word">
                      <span style={{ '--w': i } as CSSProperties}>{word}</span>
                    </span>
                    {i < words.length - 1 && ' '}
                  </Fragment>
                ))}
              </h1>
              <p data-hero-fg="text" className="hero-rise text-primary text-xl md:text-2xl font-semibold" style={seq(2)}>
                <span className="hero-underline">{personalData.title}</span>
              </p>
              <p data-hero-fg="text" className="hero-rise max-w-[860px] text-muted-foreground md:text-xl mx-auto text-pretty" style={seq(3)}>
                <BioText text={personalData.bio} highlights={personalData.bioHighlights} />
              </p>
            </div>
            {personalData.workAuthorization && (
              <Badge data-hero-fg="box" variant="outline" className="hero-in hero-sheen gap-2 rounded-xl sm:rounded-full border-primary/40 bg-primary/5 px-4 py-1.5 text-sm font-medium text-muted-foreground" style={seq(4)}>
                <BadgeCheck className="hero-check h-4 w-4 shrink-0 text-primary" />
                <span className="flex flex-col sm:flex-row sm:gap-1.5">
                  <span className="text-hero-foreground">{personalData.workAuthorization.status}</span>
                  <span className="hidden sm:inline" aria-hidden="true">·</span>
                  <span>{personalData.workAuthorization.note}</span>
                </span>
              </Badge>
            )}
            <div data-hero-fg="children" className="hero-in flex w-auto max-w-sm flex-col gap-2 min-[400px]:flex-row" style={seq(5)}>
              <Button asChild className="group w-auto">
                <Link href="#contact">
                  <Mail className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6" />
                  Contact Me
                </Link>
              </Button>
              <Button asChild variant="secondary" className="group w-auto">
                <a href={personalData.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="transition-transform duration-300 group-hover:translate-y-0.5" />
                  Resume
                </a>
              </Button>
            </div>
            <div data-hero-fg="children" className="hero-in flex items-center justify-center space-x-4 pt-2" style={seq(6)}>
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <link.icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
        </div>
      </div>
      {/* Scroll cue: only where there's room below the content (wide and tall screens). */}
      <a
        href="#experience"
        aria-label="Scroll to experience"
        className="hero-in absolute bottom-6 left-1/2 hidden -translate-x-1/2 [@media(min-width:768px)_and_(min-height:860px)]:flex"
        style={seq(8)}
      >
        <span className="flex h-9 w-[22px] justify-center rounded-full border-2 border-muted-foreground/40 pt-1.5 transition-colors hover:border-primary">
          <span className="hero-scroll-dot h-1.5 w-1 rounded-full bg-primary" />
        </span>
      </a>
    </section>
  );
}
