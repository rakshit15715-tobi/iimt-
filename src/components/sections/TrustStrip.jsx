import { BadgeCheck } from "lucide-react";

import { ACCREDITATIONS } from "../../constants/site.js";

/**
 * Accreditation strip. Only approvals the institute genuinely holds are listed (AICTE, PCI, BCI,
 * NAAC and the Ministry of Education's IIC) - the design mock-up also showed an "AACSB Member"
 * chip, which was dropped because no public source supports it.
 */
export default function TrustStrip() {
  return (
    <section aria-label="Recognitions and approvals" className="border-y border-white/5 bg-canvas-2/60">
      <div className="section-shell py-6">
        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-between">
          {ACCREDITATIONS.map((item, index) => (
            <li
              key={item}
              className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs"
              data-aos="fade-up"
              data-aos-delay={index * 60}
            >
              <BadgeCheck size={15} className="text-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
