'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    // Return a placeholder or null to avoid hydration mismatch
    return (
      <Button variant="ghost" size="icon" disabled className="hover:bg-primary hover:text-primary-foreground relative overflow-hidden">
        <Sun className="h-[1.5rem] w-[1.3rem]" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="hover:bg-primary hover:text-primary-foreground relative overflow-hidden"
    >
      {resolvedTheme === 'dark' ? (
        <Sun
          key="sun"
          className={cn("h-[1.5rem] w-[1.3rem] animate-scale-in animate-rotate-in")}
        />
      ) : (
        <Moon
          key="moon"
          className={cn("h-5 w-5 animate-scale-in animate-rotate-in")}
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
