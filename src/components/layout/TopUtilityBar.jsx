import { ExternalLink, Sparkles } from "lucide-react";

import { INSTITUTE, UTILITY_LINKS } from "../../constants/site.js";
import { useEnquiry } from "../../context/EnquiryContext.jsx";

const LINK_CLASS =
  "whitespace-nowrap rounded-pill px-2.5 py-1 transition hover:bg-white/5 hover:text-content";

/** Thin utility strip above the navbar: quick actions that are not part of the main story. */
export default function TopUtilityBar() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="relative z-40 border-b border-white/5 bg-canvas/90 backdrop-blur-sm">
      <div className="section-shell flex h-10 items-center justify-between gap-4 text-[0.7rem] font-medium text-muted">
        <p className="hidden items-center gap-2 sm:flex">
          <Sparkles size={12} className="text-brand-bright" aria-hidden="true" />
          Admissions open for {INSTITUTE.admissionYear} &middot; {INSTITUTE.accreditation}
        </p>

        <nav aria-label="Quick links" className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {UTILITY_LINKS.map((link) =>
            link.action ? (
              <button key={link.id} type="button" onClick={() => openEnquiry(link.action)} className={LINK_CLASS}>
                {link.label}
              </button>
            ) : (
              <a
                key={link.id}
                href={link.href}
                className={`inline-flex items-center gap-1 ${LINK_CLASS}`}
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
                {link.href.startsWith("http") ? <ExternalLink size={10} aria-hidden="true" /> : null}
              </a>
            ),
          )}

          <button
            type="button"
            onClick={() => openEnquiry("enquiry")}
            className="ml-1 shrink-0 rounded-pill bg-brand/90 px-3 py-1 font-semibold text-white shadow-glow-brand transition hover:bg-brand-bright"
          >
            Admission Enquiry
          </button>
        </nav>
      </div>
    </div>
  );
}
