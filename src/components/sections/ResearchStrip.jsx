import { RESEARCH_CELLS } from "../../data/researchCells.js";
import { Reveal } from "../motion/Reveal.jsx";
import { GlassCard } from "../ui/GlassCard.jsx";
import { IconTile } from "../ui/IconTile.jsx";
import { Section } from "../ui/Section.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

/**
 * Research & Innovation strip. This is a deliberate, small addition: the navbar keeps the design
 * mock-up's "Research" link, and this section makes that anchor point at something real.
 */
export default function ResearchStrip() {
  return (
    <Section id="research" labelledBy="research-title">
      <SectionHeading
        id="research-title"
        eyebrow="Research & innovation"
        tone="gold"
        title="Where Ideas Get Built, Filed and Funded"
        description="Four in-house centres take a student idea from a lab bench to a patent, a prototype or a funded venture."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {RESEARCH_CELLS.map((cell, index) => (
          <Reveal key={cell.id} effect="up" delay={index * 80} className="h-full">
            <GlassCard tone={cell.tone} interactive className="flex h-full flex-col gap-4">
              <IconTile Icon={cell.Icon} tone={cell.tone} />
              <h3 className="font-display text-base font-bold leading-snug text-content">{cell.title}</h3>
              <p className="text-xs leading-relaxed text-muted">{cell.description}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
