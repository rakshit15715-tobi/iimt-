import { PhoneCall } from "lucide-react";

import { ADMISSION_STEPS } from "../../data/admissionSteps.js";
import { INSTITUTE } from "../../constants/site.js";
import { telHref } from "../../utils/format.js";
import { Reveal } from "../motion/Reveal.jsx";
import { GlassCard } from "../ui/GlassCard.jsx";

/** The four-step admission track that sits beside the enquiry form. */
export default function AdmissionJourney() {
  return (
    <div className="flex flex-col gap-5">
      <ol className="flex flex-col gap-4">
        {ADMISSION_STEPS.map((step, index) => (
          <Reveal key={step.id} effect="right" delay={index * 70} as="li">
            <GlassCard tone="accent" interactive className="flex items-start gap-4">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent-soft font-display text-sm font-extrabold text-accent-ink"
                aria-hidden="true"
              >
                {step.step}
              </span>
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="font-display text-base font-bold text-content">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{step.description}</p>
                </div>
                <step.Icon size={18} className="mt-0.5 hidden shrink-0 text-accent sm:block" aria-hidden="true" />
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </ol>

      <Reveal effect="up" delay={120}>
        <GlassCard padding="lg">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted">
            Alternatively, call the admission desk
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {INSTITUTE.admissionDesk.map((phone) => (
              <a
                key={phone}
                href={telHref(phone)}
                className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-body transition hover:border-brand/45 hover:text-content"
              >
                <PhoneCall size={15} className="text-brand-bright" aria-hidden="true" />
                {phone}
              </a>
            ))}
          </div>
          <p className="mt-4 text-[0.7rem] leading-relaxed text-muted">
            Mon-Sat, 9:00 AM - 6:00 PM &middot; {INSTITUTE.address.line1}, {INSTITUTE.address.city} -{" "}
            {INSTITUTE.address.pin}
          </p>
        </GlassCard>
      </Reveal>
    </div>
  );
}
