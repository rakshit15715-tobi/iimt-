/**
 * Motion-related environment helpers. React-free, so `node --test` can import this module
 * (window.matchMedia is simply absent there).
 */

/** True when the visitor asked the OS for reduced motion. */
export function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
