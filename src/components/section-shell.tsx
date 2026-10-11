import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import SectionBackdrop from "./section-backdrop";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: string;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Fade the body in as one block. Off for sections that choreograph their own children. */
  revealBody?: boolean;
}

// Every section fills at least one screen below the sticky header (h-14), so jumping to it
// from the nav never shows the neighbouring section. Content is centered within that screen.
export default function SectionShell({ id, title, subtitle, children, className, revealBody = true }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("relative isolate flex w-full min-h-[calc(100dvh-3.5rem)] items-center py-8 md:py-10", className)}
    >
      <SectionBackdrop />
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <Reveal className="mx-auto max-w-3xl space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-headline">{title}</h2>
          {subtitle && <p className="text-muted-foreground md:text-lg">{subtitle}</p>}
        </Reveal>
        <div className="mt-8">{revealBody ? <Reveal>{children}</Reveal> : children}</div>
      </div>
    </section>
  );
}
