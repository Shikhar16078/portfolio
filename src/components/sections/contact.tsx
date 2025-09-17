import { personalData, socialLinks } from "@/lib/data";
import { Button } from "../ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Get in Touch</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
            </p>
          </div>
          <div className="space-y-4">
             <Button asChild size="lg">
              <a href={`mailto:${personalData.email}`}>
                <Mail className="mr-2 h-5 w-5" /> Email Me
              </a>
            </Button>
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
                  <link.icon className="h-8 w-8" />
                </Link>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-8">
            © {new Date().getFullYear()} {personalData.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
