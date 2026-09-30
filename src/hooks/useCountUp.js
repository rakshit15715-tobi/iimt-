import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "../utils/motion.js";

/**
 * Counts a number up from 0 the first time its element scrolls into view.
 *
 * Driven by requestAnimationFrame with a cubic ease-out, so the animation runs at the browser's
 * paint cadence instead of on a fixed timer. Under reduced motion - or if IntersectionObserver
 * is unavailable - the final value is set immediately.
 *
 * Returns `{ ref, value }`; the ref must be attached to the element whose visibility gates the
 * animation (the wrapping card, not the number itself).
 */
export function useCountUp(target, options = {}) {
  const { duration = 1600, decimals = 0, threshold = 0.4 } = options;
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || finished.current) return undefined;

    const settle = () => {
      finished.current = true;
      setValue(target);
    };

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      settle();
      return undefined;
    }

    let frame = 0;
    const animate = () => {
      const startedAt = performance.now();
      const step = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setValue(target * eased);
        if (progress < 1) frame = requestAnimationFrame(step);
        else settle();
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        animate();
      },
      { threshold },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration, threshold]);

  return { ref, value: decimals > 0 ? Number(value.toFixed(decimals)) : Math.round(value) };
}
