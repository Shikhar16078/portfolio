import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { personalData } from '@/lib/data';
import placeholderData from '@/lib/placeholder-images.json';
import { MoveRight } from 'lucide-react';

export default function HomeSection() {
  const profileImage = placeholderData.placeholderImages.find(p => p.id === 'profile-picture');

  return (
    <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Hi, I'm {personalData.name}
              </h1>
              <p className="text-primary text-xl md:text-2xl font-semibold">
                {personalData.title}
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {personalData.bio}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="#contact">
                  Contact Me
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#experience">
                  View My Work <MoveRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          {profileImage && (
            <Image
              src={profileImage.imageUrl}
              alt={profileImage.description}
              width={400}
              height={400}
              data-ai-hint={profileImage.imageHint}
              className="mx-auto aspect-square overflow-hidden rounded-full object-cover sm:w-full lg:order-last"
            />
          )}
        </div>
      </div>
    </section>
  );
}
