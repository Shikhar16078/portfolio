'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/utils';

// Where the circle's soft edge begins, as a fraction of its radius; matches the gradient in globals.css.
const FEATHER_START = 0.75;

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // False during server render and hydration, true afterwards; the theme is only known on the client.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // The new theme spreads from the button as a soft-edged circle (View Transitions API). Browsers
  // without it, and users who prefer reduced motion, get the plain switch.
  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(next);
      return;
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    // The mask's edge fades over its outer quarter (globals.css), so grow it until that soft edge has
    // passed the farthest corner.
    const size = (radius / FEATHER_START) * 2;

    const root = document.documentElement;
    // The page's colour transitions would leave the "after" snapshot half-faded; pause them.
    const pause = document.createElement('style');
    pause.textContent = '*,*::before,*::after{transition:none!important}';

    const transition = document.startViewTransition(() => {
      document.head.appendChild(pause);
      // next-themes sets the class in an effect after rendering; set it now so the snapshot has it.
      root.classList.remove('light', 'dark');
      root.classList.add(next);
      root.style.colorScheme = next;
      flushSync(() => setTheme(next));
    });
    transition.ready
      .then(() => {
        root.animate(
          {
            maskSize: ['0px 0px', `${size}px ${size}px`],
            maskPosition: [`${x}px ${y}px`, `${x - size / 2}px ${y - size / 2}px`],
          },
          // fill: hold the full size until the transition ends, or the mask snaps back to 0 (its value in
          // globals.css) for a frame and the old theme flashes.
          {
            duration: 900,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            fill: 'forwards',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {}); // skipped, e.g. by a quick second click: the theme still switches, just without the circle
    transition.finished.finally(() => pause.remove()).catch(() => {});
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
          className={cn("h-6 w-[1.3rem] animate-icon-in")}
        />
      ) : (
        <Moon
          key="moon"
          className={cn("h-5 w-5 animate-icon-in")}
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
