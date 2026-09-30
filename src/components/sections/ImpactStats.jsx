import { ArrowRight, Trophy } from "lucide-react";

import { useEnquiry } from "../../context/EnquiryContext.jsx";
import { IMPACT_STATS, PLACEMENT_PROMISE } from "../../data/stats.js";
import { Reveal } from "../motion/Reveal.jsx";
import { Tilt3D } from "../motion/Tilt3D.jsx";
import { Button } from "../ui/Button.jsx";
import { Counter } from "../ui/Counter.jsx";
import { GlassCard } from "../ui/GlassCard.jsx";
import { IconTile } from "../ui/IconTile.jsx";
import { Section } from "../ui/Section.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";
import { toneOf } from "../ui/tones.js";

/**
 * "Impact in Numbers" (SRS §2): staggered glass cards that reveal on scroll, count their value up
 * when they enter the viewport and tilt in 3D on hover.
 *
 * Animation ownership: <Reveal> (AOS) is the outer element, <Tilt3D> (VanillaTilt) the inner one.
 * Both write transforms, so they must never share a node.
 */
export default function ImpactStats() {
  const { openEnquiry } = useEnquiry();

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading
        id="about-title"
        eyebrow="Impact in numbers"
        title="Excellence Measured in Achievements"
        description="Two decades of placement records, recruiter relationships and student outcomes that make IIMT one of North India's most sought-after admission destinations."
        actions={
          <Button variant="secondary" TrailingIcon={ArrowRight} onClick={() => openEnquiry("enquiry")}>
            Request placement report
          </Button>
        }
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {IMPACT_STATS.map((stat, index) => {
          const palette = toneOf(stat.tone);
          return (
            <Reveal key={stat.id} effect="up" delay={index * 90} className="h-full">
              <Tilt3D className="h-full">
                <GlassCard tone={stat.tone} interactive className="flex h-full flex-col gap-5">
                  <IconTile Icon={stat.Icon} tone={stat.tone} />
                  <div>
                    <p className={`font-display text-3xl font-extrabold tracking-tight sm:text-[2.1rem] ${palette.text}`}>
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 font-display text-sm font-bold text-content">{stat.label}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{stat.hint}</p>
                  </div>
                </GlassCard>
              </Tilt3D>
            </Reveal>
          );
        })}
      </div>

      <Reveal effect="up" delay={140} className="mt-5">
        <GlassCard tone="brand" className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <IconTile Icon={Trophy} tone="brand" size="lg" />
            <div>
              <p className="font-display text-2xl font-extrabold text-content">
                <Counter value={PLACEMENT_PROMISE.value} suffix={PLACEMENT_PROMISE.suffix} />
              </p>
              <p className="mt-1 font-display text-sm font-bold text-content">{PLACEMENT_PROMISE.label}</p>
              <p className="mt-1 text-xs text-muted">{PLACEMENT_PROMISE.hint}</p>
            </div>
          </div>
          <Button size="lg" TrailingIcon={ArrowRight} onClick={() => openEnquiry("apply")}>
            Start your application
          </Button>
        </GlassCard>
      </Reveal>

      <p className="mt-6 text-[0.7rem] leading-relaxed text-muted">
        Figures mirror the institute&rsquo;s admission collateral and are used here for demonstration -
        verify against audited institutional data before publishing.
      </p>
    </Section>
  );
}
