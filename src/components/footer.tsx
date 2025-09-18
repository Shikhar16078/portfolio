import Link from "next/link";
import { personalData, socialLinks } from "@/lib/data";
import { Badge } from "./ui/badge";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-chrome text-chrome-foreground">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center max-w-7xl">
        <div className="flex items-center space-x-4">
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
        <p className="text-sm text-muted-foreground">
          ©{new Date().getFullYear()} {personalData.name}. All Rights Reserved.
        </p>
        <Badge variant="secondary">Developed with Firebase Studio</Badge>
      </div>
    </footer>
  );
}
