import Link from 'next/link';
import { Home, Briefcase, GraduationCap, Wrench, Mail, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import ThemeToggle from '@/components/theme-toggle';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { personalData } from '@/lib/data';

export default function Header() {
  const navLinks = [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#experience', label: 'Experience', icon: Briefcase },
    { href: '#education', label: 'Education', icon: GraduationCap },
    { href: '#skills', label: 'Skills', icon: Wrench },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 max-w-7xl">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="font-bold">
              <User className="mr-2 h-5 w-5" />
              Summary
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{personalData.name}</DialogTitle>
              <DialogDescription>{personalData.title}</DialogDescription>
            </DialogHeader>
            <p className="text-muted-foreground">{personalData.bio}</p>
          </DialogContent>
        </Dialog>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Button key={link.href} asChild variant="ghost">
              <Link href={link.href} className="flex items-center gap-2" prefetch={false}>
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            </Button>
          ))}
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
            <SheetContent side="right">
              <nav className="grid gap-4 text-lg font-medium p-6">
                 <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="font-bold -ml-3 justify-start text-lg">
                      <User className="mr-3 h-5 w-5" />
                      Summary
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{personalData.name}</DialogTitle>
                      <DialogDescription>{personalData.title}</DialogDescription>
                    </DialogHeader>
                    <p className="text-muted-foreground">{personalData.bio}</p>
                  </DialogContent>
                </Dialog>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
