import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { useReducedMotion } from "motion/react";

/**
 * 3D tilt + specular glare for the glass cards (SRS §4: Vanilla-tilt.js).
 *
 * VanillaTilt is imperative: `init()` injects a `.js-tilt-glare` child and writes inline
 * transforms. `destroy()` resets `element.vanillaTilt` to null, which is what makes the
 * StrictMode double-mount safe - without the cleanup you would stack a second glare layer and
 * see a doubled highlight on hover.
 *
 * Only primitives are accepted (no options object) so the effect cannot re-initialise on every
 * render just because a caller passed an inline object literal.
 */
export function useTilt(options = {}) {
  const { max = 7, speed = 600, glare = true, maxGlare = 0.16, scale = 1.02, gyroscope = false } = options;
  const nodeRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || reduceMotion || typeof window === "undefined") return undefined;

    VanillaTilt.init(node, {
      max,
      speed,
      glare,
      "max-glare": maxGlare,
      scale,
      gyroscope,
      reverse: false,
      perspective: 1200,
      easing: "cubic-bezier(.22,1,.36,1)",
    });

    return () => {
      node.vanillaTilt?.destroy();
    };
  }, [max, speed, glare, maxGlare, scale, gyroscope, reduceMotion]);

  return { nodeRef, tiltEnabled: !reduceMotion };
}
