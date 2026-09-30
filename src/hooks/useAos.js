import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { prefersReducedMotion } from "../utils/motion.js";

/**
 * One shared AOS configuration for the whole portal (SRS §4: scroll animations).
 *
 * `once: true` is deliberate: re-animating on every scroll-up feels cheap and costs paint time.
 * `disable` hands the decision to the visitor's OS preference - when reduced motion is on, AOS
 * stops attaching its observers and every [data-aos] element simply stays visible.
 *
 * Integration rule for this project: AOS and VanillaTilt both write inline `transform`, so a
 * tilting card is never the same node as a `data-aos` element - see components/motion/*.
 */
export const AOS_OPTIONS = {
  duration: 700,
  easing: "ease-out-cubic",
  delay: 0,
  offset: 90,
  once: true,
  mirror: false,
  anchorPlacement: "top-bottom",
  disable: () => prefersReducedMotion(),
};

let started = false;

/** Initialises AOS exactly once, after React has mounted the sections. */
export function initAos() {
  if (started || typeof window === "undefined") return;
  started = true;
  AOS.init(AOS_OPTIONS);
  // Flips the CSS guard in index.css off: before this point [data-aos] elements are forced
  // visible, so a JS failure can never leave the page blank.
  document.documentElement.classList.add("aos-ready");
}

/** Re-scans the DOM for new [data-aos] nodes - required after filtering the programme grid. */
export function refreshAos() {
  if (started) AOS.refreshHard();
}

/**
 * React entry point: boots AOS from an effect so the [data-aos] nodes rendered by the sections
 * are already in the DOM. `initAos()` is guarded, so StrictMode's double effect is harmless.
 */
export function useAosBootstrap() {
  useEffect(() => {
    initAos();
  }, []);
}
