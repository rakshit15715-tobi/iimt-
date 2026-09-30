import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, PhoneCall } from "lucide-react";

import { INSTITUTE, NAV_LINKS } from "../../constants/site.js";
import { useEnquiry } from "../../context/EnquiryContext.jsx";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";
import { telHref } from "../../utils/format.js";
import { Button } from "../ui/Button.jsx";
import { IimtLogo } from "./IimtLogo.jsx";
import MobileDrawer from "./MobileDrawer.jsx";

/**
 * Sticky glass navbar (SRS §2).
 *
 * Sits below the utility strip in the flow and sticks to the top once that strip scrolls away.
 * `scrolled` deepens the glass and adds a hairline bottom border; `activeId` comes from the
 * IntersectionObserver scroll-spy so the current section is always highlighted.
 */
export default function Navbar({ scrolled = false, activeId = null }) {
  const { openEnquiry } = useEnquiry();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Never leave the drawer mounted behind the desktop layout after a resize.
  useEffect(() => {
    if (isDesktop) setDrawerOpen(false);
  }, [isDesktop]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "border-white/10 bg-canvas/80 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.95)] backdrop-blur-xl"
            : "border-transparent bg-canvas/45 backdrop-blur-md"
        }`}
      >
        <div className="section-shell flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <a href="#home" className="shrink-0" aria-label={`${INSTITUTE.name} home`}>
            <IimtLogo size="md" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-pill px-3 py-2 text-[0.82rem] font-semibold transition ${
                    isActive ? "text-content" : "text-muted hover:text-content"
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-brand-bright"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={telHref(INSTITUTE.admissionDesk[0])}
              className="hidden items-center gap-2 rounded-pill border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-body transition hover:border-white/25 hover:text-content xl:inline-flex"
            >
              <PhoneCall size={14} aria-hidden="true" />
              {INSTITUTE.admissionDesk[0]}
            </a>

            <Button
              size="sm"
              Icon={ArrowRight}
              className="hidden sm:inline-flex"
              onClick={() => openEnquiry("apply")}
            >
              Apply Online
            </Button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-body transition hover:border-white/25 hover:text-content lg:hidden"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen ? (
          <MobileDrawer key="drawer" open={drawerOpen} activeId={activeId} onClose={() => setDrawerOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
