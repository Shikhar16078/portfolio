import { useRef, useState } from 'react';
import Link from 'next/link';
import { m, useScroll, useSpring } from 'motion/react';
import { House, Briefcase, GraduationCap, Wrench, Mail, Menu, User, Download, FolderGit2, Award, Star, X, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ThemeToggle from '@/components/theme-toggle';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { personalData, summaryData } from '@/lib/data';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';
import { slideInRight, springSnappy, staggerChildren } from '@/lib/motion';

function SummaryContent() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{personalData.name} - {personalData.title}</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[60vh] sm:h-auto">
        <div className="stagger-in space-y-4 text-sm text-muted-foreground pr-6">
          <p>{summaryData.intro}</p>
          {personalData.workAuthorization && (
            <p className="flex items-start gap-2 text-foreground">
              <BadgeCheck className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
              <span>
                {personalData.workAuthorization.status} · {personalData.workAuthorization.note}
              </span>
            </p>
          )}
          <Separator />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Work</h3>
            <p>{summaryData.work}</p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Skills</h3>
            <p>{summaryData.skills}</p>
          </div>
          <Separator />
          <p>{summaryData.closing}</p>
        </div>
      </ScrollArea>
      <DialogFooter className="grid grid-cols-2 gap-2 pt-4">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            <X className="mr-2" />
            Close
          </Button>
        </DialogClose>
        <Button asChild>
          <a href={personalData.resumeUrl} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2" />
            Resume
          </a>
        </Button>
      </DialogFooter>
    </>
  );
}

// Mobile menu links slide in one after another each time the menu opens.
const mobileNavStagger = staggerChildren(0.035, 0.08);

// Thin bar along the bottom of the header that fills as the page scrolls.
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-primary"
    />
  );
}

export default function Header({ activeSection }: { activeSection: string }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // The sheet's scroll lock cancels in-flight scrolling, so scroll only after it has closed.
  const pendingTarget = useRef<string | null>(null);
  const navLinks = [
    { href: '#home', label: 'Home', icon: House },
    { href: '#experience', label: 'Experience', icon: Briefcase },
    { href: '#projects', label: 'Projects', icon: FolderGit2 },
    { href: '#education', label: 'Education', icon: GraduationCap },
    { href: '#skills', label: 'Skills', icon: Wrench },
    { href: '#awards', label: 'Awards', icon: Award },
    { href: '#recommendations', label: 'Recommendations', icon: Star },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-chrome/80 backdrop-blur-xs border-b border-chrome-foreground/10 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 max-w-7xl text-chrome-foreground">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="font-bold hover:bg-primary hover:text-primary-foreground">
              <User className="mr-2 h-5 w-5" />
              Summary
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] mx-auto sm:max-w-xl rounded-lg" aria-describedby={undefined}>
            <SummaryContent />
          </DialogContent>
        </Dialog>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <TooltipProvider delayDuration={0}>
            {navLinks.map((link) => (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant='ghost'
                    size="icon"
                    className={cn('relative hover:bg-primary hover:text-primary-foreground', {
                      'text-primary-foreground': (link.href === `#${activeSection}`),
                    })}
                  >
                    <Link href={link.href} prefetch={false}>
                      {link.href === `#${activeSection}` && (
                        <m.span layoutId="nav-active" transition={springSnappy} className="absolute inset-0 rounded-md bg-primary" />
                      )}
                      <link.icon className="relative h-5 w-5" />
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Mobile Navigation */}
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-chrome"
              aria-describedby={undefined}
              onCloseAutoFocus={(e) => {
                const target = pendingTarget.current;
                if (!target) return;
                e.preventDefault();
                pendingTarget.current = null;
                document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
                history.replaceState(null, '', target);
              }}
            >
               <SheetHeader>
                 <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
               </SheetHeader>
              <m.nav className="grid gap-4 text-lg font-medium p-6" initial="hidden" animate="show" variants={mobileNavStagger}>
                <m.div variants={slideInRight}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="font-bold -ml-3 justify-start text-lg hover:bg-primary hover:text-primary-foreground">
                        <User className="mr-3 h-5 w-5" />
                        Summary
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] mx-auto sm:max-w-xl rounded-lg" aria-describedby={undefined}>
                      <SummaryContent />
                    </DialogContent>
                  </Dialog>
                </m.div>
                {navLinks.map((link) => (
                  <m.div key={link.href} variants={slideInRight}>
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        pendingTarget.current = link.href;
                        setMobileNavOpen(false);
                      }}
                      className={cn(
                        'relative flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-primary',
                        { 'text-primary': (link.href === `#${activeSection}`) }
                      )}
                      prefetch={false}
                    >
                      {link.href === `#${activeSection}` && (
                        <m.span layoutId="mobile-nav-active" transition={springSnappy} className="absolute inset-0 rounded-lg bg-primary/10" />
                      )}
                      <link.icon className="relative h-5 w-5" />
                      <span className="relative">{link.label}</span>
                    </Link>
                  </m.div>
                ))}
              </m.nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
