import { useEffect } from "react";

/**
 * Freezes background scrolling while a dialog or the mobile drawer is open.
 *
 * The padding compensation matters: hiding the scrollbar would otherwise shift the whole layout
 * sideways by its width, which is very visible on the wide glass hero.
 */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked || typeof document === "undefined") return undefined;
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
