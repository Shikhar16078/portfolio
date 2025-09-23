import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { personalData, socialLinks } from '@/lib/data';
import { Download, Mail } from 'lucide-react';

export default function HomeSection() {
  return (
    <section id="home" className="w-full min-h-screen flex items-center justify-center bg-hero text-hero-foreground py-12 md:py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-6 text-center">
            <Image
              src="/assets/images/profile.jpeg"
              alt="Profile Picture"
              width={192}
              height={192}
              className="mx-auto aspect-square overflow-hidden rounded-full object-cover ring-2 ring-primary ring-offset-4 ring-offset-hero transition-transform duration-300 ease-in-out hover:scale-105"
              priority
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                {personalData.name}
              </h1>
              <p className="text-primary text-xl md:text-2xl font-semibold">
                {personalData.title}
              </p>
              <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto">
                {personalData.bio}
              </p>
            </div>
            <div className="flex w-auto max-w-sm flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="w-auto">
                <Link href="#contact">
                  <Mail />
                  Contact Me
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-auto">
                <a href="https://drive.google.com/file/d/1501D5LMF1nKlSaEdqiZAyJysep-V2r31/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download />
                  Resume
                </a>
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-4">
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
