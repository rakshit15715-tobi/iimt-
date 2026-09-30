import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useReducedMotion } from "motion/react";

/**
 * Typewriter effect for the hero headline (SRS §2).
 *
 * typed.js owns the DOM node while it runs, so the instance must be destroyed in the effect's
 * cleanup - React 19 StrictMode mounts effects twice in development and a leaked instance would
 * keep typing into a detached node.
 *
 * Accessibility: the animated span is aria-hidden by the caller and the full sentence is
 * exposed once as visually hidden text, so screen readers never announce half-typed words.
 * With reduced motion enabled the hook does nothing and the caller renders the first string.
 */
export function useTyped(strings, options = {}) {
  const nodeRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { typeSpeed = 55, backSpeed = 25, backDelay = 2000, loop = true, cursorChar = "|" } = options;
  // Strings are compared by value so callers can pass an inline array without re-typing.
  const signature = strings.join("\u0000");

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || reduceMotion) return undefined;

    const typed = new Typed(node, {
      strings: signature.split("\u0000"),
      typeSpeed,
      backSpeed,
      backDelay,
      loop,
      smartBackspace: false,
      shuffle: false,
      showCursor: true,
      cursorChar,
      autoInsertCss: true,
      contentType: "html",
    });

    return () => typed.destroy();
  }, [signature, reduceMotion, typeSpeed, backSpeed, backDelay, loop, cursorChar]);

  return { nodeRef, reduceMotion, fallback: strings[0] ?? "" };
}
