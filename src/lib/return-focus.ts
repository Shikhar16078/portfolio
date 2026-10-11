import { useRef } from "react";

type AutoFocusHandler = (event: Event) => void;

/**
 * Radix dialogs hand focus back to the button that opened them, but without `preventScroll`. For a
 * button in the sticky header, the browser then scrolls the page to "reveal" it (scroll-padding-top
 * counts the header as covering it), so closing a dialog jumped the page up. This keeps the focus
 * return for keyboard and screen-reader users but stops the scroll. A handler passed by the caller
 * still runs first, and can take over by calling `event.preventDefault()`.
 */
export function useReturnFocusWithoutScroll(onOpenAutoFocus?: AutoFocusHandler, onCloseAutoFocus?: AutoFocusHandler) {
  const opener = useRef<HTMLElement | null>(null);
  return {
    onOpenAutoFocus: (event: Event) => {
      // Radix fires this before moving focus in, so the active element is still the opener.
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      onOpenAutoFocus?.(event);
    },
    onCloseAutoFocus: (event: Event) => {
      onCloseAutoFocus?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      opener.current?.focus({ preventScroll: true });
    },
  };
}
