import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Quote } from "lucide-react";

import { useEnquiry } from "../../context/EnquiryContext.jsx";
import { PACKAGE_HIGHLIGHTS } from "../../data/stats.js";
import { RECRUITERS, TESTIMONIALS } from "../../data/recruiters.js";
import { initials } from "../../utils/format.js";
import { Reveal } from "../motion/Reveal.jsx";
import { Button } from "../ui/Button.jsx";
import { GlassCard } from "../ui/GlassCard.jsx";
import { Section } from "../ui/Section.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

/**
 * Placement record: package chips, the recruiter wall and a testimonial carousel.
 *
 * The carousel is button-driven with no autoplay, so nothing moves under a visitor who is
 * reading and it stays fully usable from the keyboard.
 */
export default function Placements() {
  const { openEnquiry } = useEnquiry();
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index];

  const step = (delta) => setIndex((previous) => (previous + delta + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <Section id="placements" labelledBy="placements-title">
      <SectionHeading
        id="placements-title"
        eyebrow="Placement record"
        tone="gold"
        title="Where Ambition Meets Global Opportunities"
        description="The Career Development Cell runs aptitude bootcamps, mock interviews and corporate drives through the year, with placement assistance for every eligible student."
        actions={
          <div className="flex flex-wrap gap-3">
            {PACKAGE_HIGHLIGHTS.map((item) => (
              <span key={item.id} className="glass rounded-2xl px-4 py-3 text-center">
                <span className="block font-display text-xl font-extrabold text-gold-ink">{item.value}</span>
                <span className="mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  {item.label}
                </span>
              </span>
            ))}
          </div>
        }
      />

      <Reveal effect="up" className="mt-12">
        <GlassCard padding="lg">
          <span className="inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted">
            <Building2 size={14} className="text-accent" aria-hidden="true" />
            Leading recruiters on campus
          </span>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {RECRUITERS.map((name) => (
              <li
                key={name}
                className="rounded-pill border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-body transition hover:border-white/25 hover:text-content"
              >
                {name}
              </li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>

      <Reveal effect="up" delay={120} className="mt-5">
        <GlassCard tone="brand" padding="lg">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-brand/30 bg-brand-soft text-brand-ink"
                aria-hidden="true"
              >
                <Quote size={20} />
              </span>
              <figure className="max-w-2xl">
                <blockquote className="text-sm leading-relaxed text-body sm:text-base">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 font-display text-xs font-bold text-content"
                    aria-hidden="true"
                  >
                    {initials(testimonial.author)}
                  </span>
                  <span className="text-xs">
                    <span className="block font-semibold text-content">{testimonial.author}</span>
                    <span className="text-muted">
                      {testimonial.role}, {testimonial.organisation}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 lg:flex-col lg:items-end">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous testimonial"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition hover:border-white/25 hover:text-content"
                >
                  <ArrowLeft size={15} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next testimonial"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition hover:border-white/25 hover:text-content"
                >
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
                <span className="text-[0.7rem] text-muted lg:hidden">
                  {index + 1} / {TESTIMONIALS.length}
                </span>
              </div>
              <Button size="sm" variant="secondary" onClick={() => openEnquiry("enquiry")}>
                Get the placement report
              </Button>
            </div>
          </div>
        </GlassCard>
      </Reveal>

      <p className="mt-6 text-[0.7rem] leading-relaxed text-muted">
        Recruiter names and quotes are published by the IIMT Career Development Cell; package figures are
        illustrative for this capstone build.
      </p>
    </Section>
  );
}
