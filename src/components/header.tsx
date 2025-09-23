import Link from 'next/link';
import { Home, Briefcase, GraduationCap, Wrench, Mail, Menu, User, Download, FolderGit2, Award, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ThemeToggle from '@/components/theme-toggle';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { personalData } from '@/lib/data';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

export default function Header({ activeSection }: { activeSection: string }) {
  const navLinks = [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#experience', label: 'Experience', icon: Briefcase },
    { href: '#projects', label: 'Projects', icon: FolderGit2 },
    { href: '#education', label: 'Education', icon: GraduationCap },
    { href: '#skills', label: 'Skills', icon: Wrench },
    { href: '#awards', label: 'Awards', icon: Award },
    { href: '#recommendations', label: 'Recommendations', icon: Star },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  const SummaryContent = () => (
    <>
      <DialogHeader>
        <DialogTitle>{personalData.name} - Software Engineer</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[60vh] sm:h-auto">
        <div className="space-y-4 text-sm text-muted-foreground pr-6">
          <p>
            I am a Computer Science master's student at UC Riverside, actively seeking software engineering and machine learning roles.
          </p>
          <Separator />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Work</h3>
            <p>
              With a background in software engineering, I previously worked as a Software Engineer at Nagarro, contributing to a large-scale automobile project. My work involved building real-time data publishers, automating infrastructure, and developing monitoring solutions using technologies like .NET Core, AWS, Terraform, Splunk, and New Relic.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Skills</h3>
            <p>
              My skill set includes C#, Java, Python, database systems such as Oracle Database and MySQL, and cloud technologies such as AWS, Splunk, and New Relic.
            </p>
          </div>
          <Separator />
          <p>
            I am passionate about applying my Computer Science knowledge to solve real-world problems and create efficient, scalable solutions.
          </p>
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
          <a href="https://drive.google.com/file/d/1501D5LMF1nKlSaEdqiZAyJysep-V2r31/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            <Download className="mr-2" />
            Resume
          </a>
        </Button>
      </DialogFooter>
    </>
  );

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-chrome/80 backdrop-blur-sm border-b border-chrome-foreground/10 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 max-w-7xl text-chrome-foreground">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="font-bold hover:bg-primary hover:text-primary-foreground">
              <User className="mr-2 h-5 w-5" />
              Summary
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] mx-auto sm:max-w-xl rounded-lg">
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
                    className={cn('hover:bg-primary hover:text-primary-foreground', {
                      'bg-primary text-primary-foreground': (link.href === `#${activeSection}`),
                    })}
                  >
                    <Link href={link.href} prefetch={false}>
                      <link.icon className="h-5 w-5" />
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-chrome">
               <SheetHeader>
                 <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
               </SheetHeader>
               <nav className="grid gap-4 text-lg font-medium p-6">
                 <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="font-bold -ml-3 justify-start text-lg hover:bg-primary hover:text-primary-foreground">
                      <User className="mr-3 h-5 w-5" />
                      Summary
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] mx-auto sm:max-w-xl rounded-lg">
                    <SummaryContent />
                  </DialogContent>
                </Dialog>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      { 'text-primary bg-primary/10': (link.href === `#${activeSection}`) }
                    )}
                    prefetch={false}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
