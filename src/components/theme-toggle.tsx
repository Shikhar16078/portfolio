'use client';

import { useAppTheme } from '@/context/theme-context';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { effectiveTheme, toggleTheme } = useAppTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="hover:bg-primary hover:text-primary-foreground"
    >
      {effectiveTheme === 'dark' ? (
        <Sun className="h-[1.5rem] w-[1.3rem]" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
