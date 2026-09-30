import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import { useBodyScrollLock } from "../../hooks/useBodyScrollLock.js";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * Accessible dialog used by the admission enquiry form.
 *
 * Behaviour: Escape closes, clicking the backdrop closes, the page behind cannot scroll, Tab
 * cycles inside the panel instead of escaping to the page, and focus returns to whatever opened
 * the dialog. Motion handles only the enter/exit transition (the content itself is static), which
 * keeps it clear of AOS - see the integration note in hooks/useAos.js.
 */
export function Modal({ open, onClose, title, description = null, size = "lg", children }) {
  const panelRef = useRef(null);
  const openerRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useBodyScrollLock(open);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(panelRef.current.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (node) => node.offsetParent !== null,
      );
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return undefined;
    openerRef.current = document.activeElement;
    document.addEventListener("keydown", handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      const firstField = panelRef.current?.querySelector(FOCUSABLE_SELECTOR);
      (firstField ?? panelRef.current)?.focus();
    }, 60);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
    };
  }, [open, handleKeyDown]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            tabIndex={-1}
            onClick={onClose}
            className="fixed inset-0 cursor-default bg-canvas/80 backdrop-blur-sm"
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            className={`relative z-10 my-auto w-full rounded-card border border-white/10 bg-surface/95 p-5 shadow-soft outline-none backdrop-blur-xl sm:p-6 ${
              size === "lg" ? "max-w-3xl" : "max-w-xl"
            }`}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 id={titleId} className="font-display text-lg font-bold tracking-tight text-content sm:text-xl">
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className="mt-1 text-xs text-muted sm:text-sm">
                    {description}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition hover:border-white/25 hover:text-content"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </header>
            <div className="pt-5">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
