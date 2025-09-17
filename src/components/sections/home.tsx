import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { personalData, socialLinks } from '@/lib/data';
import placeholderData from '@/lib/placeholder-images.json';
import { Download } from 'lucide-react';

export default function HomeSection() {
  const profileImage = placeholderData.placeholderImages.find(p => p.id === 'profile-picture');

  return (
    <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container flex flex-col items-center justify-center space-y-6 text-center px-4 md:px-6 mx-auto">
        {profileImage && (
          <Image
            src={profileImage.imageUrl}
            alt={profileImage.description}
            width={160}
            height={160}
            data-ai-hint={profileImage.imageHint}
            className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
            priority
          />
        )}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
            Hi, I'm {personalData.name}
          </h1>
          <p className="text-primary text-xl md:text-2xl font-semibold">
            {personalData.title}
          </p>
          <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
            {personalData.bio}
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button asChild size="lg">
            <Link href="#contact">
              Contact Me
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="/resume.pdf" download>
              <Download className="mr-2" />
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
    </section>
  );
}
