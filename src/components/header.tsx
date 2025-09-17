import Link from 'next/link';
import { Home, Briefcase, GraduationCap, Wrench, Mail, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import ThemeToggle from '@/components/theme-toggle';

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
        <Link href="/" className="flex items-center justify-center font-bold" prefetch={false}>
          RedShift Portfolio
        </Link>

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
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4" prefetch={false}>
                  RedShift Portfolio
                </Link>
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
