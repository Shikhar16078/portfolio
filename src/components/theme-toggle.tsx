'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // False during server render and hydration, true afterwards; the theme is only known on the client.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    // Return a placeholder or null to avoid hydration mismatch
    return (
      <Button variant="ghost" size="icon" disabled className="hover:bg-primary hover:text-primary-foreground relative overflow-hidden">
        <Sun className="h-6 w-[1.3rem]" />
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
          className={cn("h-6 w-[1.3rem] animate-scale-in animate-rotate-in")}
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
