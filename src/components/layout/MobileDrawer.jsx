import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, PhoneCall, X } from "lucide-react";

import { INSTITUTE, NAV_LINKS } from "../../constants/site.js";
import { useEnquiry } from "../../context/EnquiryContext.jsx";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock.js";
import { telHref } from "../../utils/format.js";
import { Button } from "../ui/Button.jsx";
import { IimtLogo } from "./IimtLogo.jsx";

/**
 * Slide-in navigation for phones and tablets. Escape closes it, the backdrop closes it, focus
 * moves to the first link on open and returns to the hamburger on close, and the page behind is
 * locked so the glass navbar does not scroll underneath the panel.
 */
export default function MobileDrawer({ open, onClose, activeId = null }) {
  const { openEnquiry } = useEnquiry();
  const panelRef = useRef(null);
  const openerRef = useRef(null);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    openerRef.current = document.activeElement;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(() => panelRef.current?.focus(), 40);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  const startEnquiry = (intent) => {
    onClose();
    openEnquiry(intent);
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] lg:hidden">
      <motion.button
        type="button"
        aria-label="Close navigation"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-canvas/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      />

      <motion.aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="glass-strong absolute inset-y-0 right-0 flex w-[min(20rem,88vw)] flex-col overflow-y-auto rounded-l-card border-l border-white/10 p-5 outline-none"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
      >
        <div className="flex items-center justify-between gap-3">
          <IimtLogo size="sm" showWordmark={false} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition hover:text-content"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-6 flex flex-col">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={onClose}
              aria-current={activeId === link.id ? "true" : undefined}
              className={`flex items-center justify-between border-b border-white/5 py-3 text-sm font-semibold transition ${
                activeId === link.id ? "text-brand-ink" : "text-body hover:text-content"
              }`}
            >
              {link.label}
              <ArrowRight size={14} aria-hidden="true" className="text-muted" />
            </a>
          ))}
        </nav>

        <div className="mt-6 flex flex-col gap-3">
          <Button size="md" Icon={ArrowRight} onClick={() => startEnquiry("apply")}>
            Apply Online
          </Button>
          <Button size="md" variant="secondary" Icon={CalendarDays} onClick={() => startEnquiry("visit")}>
            Book Campus Visit
          </Button>
          <a
            href={telHref(INSTITUTE.admissionDesk[1])}
            className="inline-flex items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-body transition hover:text-content"
          >
            <PhoneCall size={14} aria-hidden="true" />
            Admission desk {INSTITUTE.admissionDesk[1]}
          </a>
        </div>

        <p className="mt-auto pt-8 text-[0.7rem] leading-relaxed text-muted">
          {INSTITUTE.address.line1}
          <br />
          {INSTITUTE.address.city} - {INSTITUTE.address.pin}, {INSTITUTE.address.state}
        </p>
      </motion.aside>
    </div>,
    document.body,
  );
}
