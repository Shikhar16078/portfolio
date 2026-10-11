import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { personalData, socialLinks } from '@/lib/data';
import { BadgeCheck, Download, Mail } from 'lucide-react';

export default function HomeSection() {
  return (
    <section id="home" className="w-full min-h-[calc(100dvh-3.5rem)] flex items-center justify-center bg-hero text-hero-foreground py-8 [@media(max-height:700px)]:py-4">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-5 text-center [@media(max-height:700px)]:space-y-3">
            <div className="profile-ring hover:scale-105 hover:cursor-none">
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                {personalData.name}
              </h1>
              <p className="text-primary text-xl md:text-2xl font-semibold">
                {personalData.title}
              </p>
              <p className="max-w-[860px] text-muted-foreground md:text-xl mx-auto text-balance">
                {personalData.bio}
              </p>
              <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto">
                {personalData.degree}
              </p>
            </div>
            {personalData.workAuthorization && (
              <Badge variant="outline" className="gap-2 rounded-xl sm:rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground">
                <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
                <span className="flex flex-col sm:flex-row sm:gap-1.5">
                  <span>{personalData.workAuthorization.status}</span>
                  <span className="hidden sm:inline" aria-hidden="true">·</span>
                  <span>{personalData.workAuthorization.note}</span>
                </span>
              </Badge>
            )}
            <div className="flex w-auto max-w-sm flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="w-auto">
                <Link href="#contact">
                  <Mail />
                  Contact Me
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-auto">
                <a href={personalData.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Download />
                  Resume
                </a>
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-2">
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
    </section>
  );
}
