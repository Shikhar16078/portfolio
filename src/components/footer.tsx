import Link from "next/link";
import { personalData, socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-navbar text-navbar-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 max-w-7xl">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personalData.name}. All Rights Reserved.
        </p>
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
      </div>
    </footer>
  );
}
