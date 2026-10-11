// Brings a card into view and flashes it, e.g. from a skill's "Where I used it" popover.
//
// Cards inside a carousel are revealed by the carousel itself: a `carousel:reveal` event bubbles up
// to it and it scrolls that slide into place (carousel.tsx). Only the window is scrolled here,
// never with scrollIntoView, which would also scroll the carousel's clipped viewport sideways and
// break its layout. The card then takes focus (it needs tabIndex={-1}) and plays the `data-flash`
// highlight (globals.css).
const FLASH_MS = 1800;

export function showOnPage(id: string) {
  const card = document.getElementById(id);
  if (!card) return;

  card.dispatchEvent(new CustomEvent('carousel:reveal', { bubbles: true }));

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const r = card.getBoundingClientRect();
  // Centre the card vertically, or align its top just below the sticky header if it's taller.
  const header = 56;
  const free = window.innerHeight - header;
  const top = window.scrollY + r.top - header - Math.max(16, (free - r.height) / 2);
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });

  card.focus({ preventScroll: true });
  card.removeAttribute('data-flash');
  void card.offsetWidth; // restart the animation if it was already playing
  card.setAttribute('data-flash', '');
  window.setTimeout(() => card.removeAttribute('data-flash'), FLASH_MS);
}
