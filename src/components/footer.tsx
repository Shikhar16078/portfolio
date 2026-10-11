import Link from "next/link";
import { personalData, socialLinks } from "@/lib/data";
import { Reveal } from "./reveal";
import { REVEAL_MARGIN_PAGE_END } from "@/lib/motion";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-chrome text-chrome-foreground">
      <Reveal margin={REVEAL_MARGIN_PAGE_END} className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center max-w-7xl">
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
        Designed and Developed by {personalData.name} ©{new Date().getFullYear()}.{" "}
          {/* Its own line on phones, inline from sm up. */}
          <span className="block sm:inline">All Rights Reserved.</span>
        </p>
      </Reveal>
    </footer>
  );
}
