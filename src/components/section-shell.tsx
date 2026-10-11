import type { ReactNode } from "react";
import AnimatedContent from "./animated-content";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: string;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
}

// Every section fills at least one screen below the sticky header (h-14), so jumping to it
// from the nav never shows the neighbouring section. Content is centered within that screen.
export default function SectionShell({ id, title, subtitle, children, className }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("flex w-full min-h-[calc(100dvh-3.5rem)] items-center py-8 md:py-10", className)}
    >
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <AnimatedContent>
          <div className="mx-auto max-w-3xl space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-headline">{title}</h2>
            {subtitle && <p className="text-muted-foreground md:text-lg">{subtitle}</p>}
          </div>
        </AnimatedContent>
        <AnimatedContent className="mt-8">{children}</AnimatedContent>
      </div>
    </section>
  );
}
