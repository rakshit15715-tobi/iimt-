import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Send } from "lucide-react";

import { useEnquiry } from "../../context/EnquiryContext.jsx";
import { PROGRAMS, PROGRAM_FILTERS } from "../../data/programs.js";
import { refreshAos } from "../../hooks/useAos.js";
import { Reveal } from "../motion/Reveal.jsx";
import { Tilt3D } from "../motion/Tilt3D.jsx";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";
import { GlassCard } from "../ui/GlassCard.jsx";
import { IconTile } from "../ui/IconTile.jsx";
import { Section } from "../ui/Section.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";
import { toneOf } from "../ui/tones.js";

/** Must match the strings in PROGRAM_OPTIONS so the select box accepts the pre-selected value. */
const optionValue = (program) => `${program.faculty} (${program.degree})`;

/**
 * Academic showcase (SRS §2): a category-filtered grid of glowing glass cards.
 *
 * The filter is a real ARIA tab list - roving tabindex, Arrow/Home/End keys, aria-selected and
 * aria-controls - not just styled buttons. Two integration details are handled here:
 *  1. AOS caches node positions, so `refreshAos()` runs after every filter change.
 *  2. Cards are keyed by programme id, so React unmounts/mounts them and each <Tilt3D> runs its
 *     own VanillaTilt init/destroy cycle - no manual re-initialisation needed.
 */
export default function Programs() {
  const { openEnquiry } = useEnquiry();
  const [activeFilter, setActiveFilter] = useState("all");
  const tabRefs = useRef([]);

  const visible = useMemo(
    () => (activeFilter === "all" ? PROGRAMS : PROGRAMS.filter((program) => program.filter === activeFilter)),
    [activeFilter],
  );

  useEffect(() => {
    refreshAos();
  }, [activeFilter]);

  const focusTab = (index) => {
    const next = (index + PROGRAM_FILTERS.length) % PROGRAM_FILTERS.length;
    setActiveFilter(PROGRAM_FILTERS[next].id);
    tabRefs.current[next]?.focus();
  };

  const handleTabKeyDown = (event, index) => {
    const { key } = event;
    if (key === "ArrowRight" || key === "ArrowDown") {
      event.preventDefault();
      focusTab(index + 1);
    } else if (key === "ArrowLeft" || key === "ArrowUp") {
      event.preventDefault();
      focusTab(index - 1);
    } else if (key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (key === "End") {
      event.preventDefault();
      focusTab(PROGRAM_FILTERS.length - 1);
    }
  };

  const countFor = (filterId) =>
    filterId === "all" ? PROGRAMS.length : PROGRAMS.filter((program) => program.filter === filterId).length;

  return (
    <Section id="academics" labelledBy="academics-title">
      <SectionHeading
        id="academics-title"
        eyebrow="Explore programmes"
        tone="accent"
        title="Six Premier Academic Faculties, Limitless Horizons."
        description="From engineering labs to moot courts, pharmacy instrumentation to business analytics - pick the faculty that shapes the career you are aiming for."
        actions={
          <Button variant="secondary" TrailingIcon={ArrowRight} onClick={() => openEnquiry("enquiry")}>
            Talk to a counsellor
          </Button>
        }
      />

      <div role="tablist" aria-label="Filter faculties" className="mt-10 flex flex-wrap gap-2">
        {PROGRAM_FILTERS.map((filter, index) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              id={`faculty-tab-${filter.id}`}
              aria-selected={isActive}
              aria-controls="faculty-panel"
              tabIndex={isActive ? 0 : -1}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              onClick={() => setActiveFilter(filter.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-xs font-semibold transition sm:text-[0.8rem] ${
                isActive
                  ? "border-transparent bg-gradient-to-r from-brand-bright to-brand text-white shadow-glow-brand"
                  : "border-white/10 bg-white/5 text-muted hover:border-white/25 hover:text-content"
              }`}
            >
              {filter.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[0.65rem] ${isActive ? "bg-white/20" : "bg-white/10"}`}
              >
                {countFor(filter.id)}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 text-xs text-muted">
        Showing {visible.length} of {PROGRAMS.length} faculties
        {activeFilter === "all" ? "" : ` in ${PROGRAM_FILTERS.find((filter) => filter.id === activeFilter)?.label}`}.
      </p>

      <div
        id="faculty-panel"
        role="tabpanel"
        aria-labelledby={`faculty-tab-${activeFilter}`}
        className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {visible.map((program, index) => {
          const palette = toneOf(program.tone);
          return (
            <Reveal key={program.id} effect="up" delay={index * 70} className="h-full">
              <Tilt3D className="h-full" max={6}>
                <GlassCard tone={program.tone} interactive className="flex h-full flex-col gap-5">
                  <div className="flex items-start justify-between gap-3">
                    <Badge tone={program.tone}>{program.degree}</Badge>
                    <IconTile Icon={program.Icon} tone={program.tone} />
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug text-content">{program.faculty}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{program.blurb}</p>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {program.courses.map((course) => (
                      <li key={course} className="flex items-start gap-2 text-xs text-body">
                        <Check size={14} className={`mt-0.5 shrink-0 ${palette.text}`} aria-hidden="true" />
                        {course}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/5 pt-4">
                    <Button size="sm" Icon={Send} onClick={() => openEnquiry("apply", { program: optionValue(program) })}>
                      Apply
                    </Button>
                    <a
                      href="#admissions"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition hover:text-content"
                    >
                      How admission works
                      <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                </GlassCard>
              </Tilt3D>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
