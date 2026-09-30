import { prefersReducedMotion } from "./motion.js";

export { prefersReducedMotion };

/** IIMT crimson, white, neon cyan and amber - the celebration matches the design tokens. */
export const CONFETTI_COLORS = ["#e11d2e", "#ff3b52", "#ffffff", "#00f2fe", "#ff9900"];


/** Cached dynamic import - see loadConfetti(). */
let loader = null;

/**
 * Lazily pulls canvas-confetti into the page the first time somebody submits the enquiry form,
 * so the ~6 kB library is not part of the initial critical bundle. Vite code-splits it into its
 * own chunk (visible in the build output).
 */
export function loadConfetti() {
  loader ??= import("canvas-confetti").then((mod) => mod.default ?? mod);
  return loader;
}

/**
 * Three-stage celebration: two side cannons and a centre burst, in brand colours.
 * Returns false (and does nothing) when the visitor prefers reduced motion.
 */
export async function fireCelebration() {
  if (prefersReducedMotion()) return false;

  const confetti = await loadConfetti();
  const shared = {
    colors: CONFETTI_COLORS,
    disableForReducedMotion: true,
    zIndex: 90,
  };

  confetti({ ...shared, particleCount: 90, spread: 65, startVelocity: 58, angle: 60, origin: { x: 0.15, y: 0.75 } });
  confetti({ ...shared, particleCount: 90, spread: 65, startVelocity: 58, angle: 120, origin: { x: 0.85, y: 0.75 } });

  window.setTimeout(() => {
    confetti({ ...shared, particleCount: 150, spread: 110, scalar: 1.1, origin: { x: 0.5, y: 0.35 } });
  }, 180);

  return true;
}
