import { useEffect, useState } from "react";

/**
 * Tracks two things the sticky chrome needs:
 *  - `scrolled`  : the page has left the top, so the navbar can deepen its glass and add a line
 *  - `activeId`  : which section currently sits under the viewport's middle band (scroll-spy)
 *
 * The scroll listener is passive and only writes state when the boolean actually flips, and the
 * IntersectionObserver replaces what would otherwise be a getBoundingClientRect() call on every
 * scroll frame - the classic layout-thrash source the SRS §6 asks us to avoid.
 */
export function useScrollState(sectionIds = [], offset = 28) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || sectionIds.length === 0) return undefined;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element) => element !== null);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return { scrolled, activeId };
}
