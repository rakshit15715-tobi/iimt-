import { ArrowDown, ArrowUpRight, CalendarDays } from "lucide-react";

import { useEnquiry } from "../../context/EnquiryContext.jsx";
import { CAMPUS_TILES } from "../../data/gallery.js";
import { Reveal } from "../motion/Reveal.jsx";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";
import { Section } from "../ui/Section.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

/**
 * Campus Life: a 2x2 masonry grid of the real campus photographs with hover captions.
 * Images carry their intrinsic width/height and lazy-load, so the grid never shifts as the
 * JPEGs stream in.
 */
export default function CampusLife() {
  const { openEnquiry } = useEnquiry();

  return (
    <Section id="campus" labelledBy="campus-title">
      <SectionHeading
        id="campus-title"
        eyebrow="Campus life"
        title="A Living, Thriving Campus of 10,000+ Aspirants."
        description="Beyond classrooms, IIMT runs sports arenas, digital lecture theatres, gardens and a research park - because engineers and managers are built outside the timetable too."
        actions={
          <>
            <Button variant="secondary" size="md" Icon={ArrowDown} href="#gallery">
              View campus gallery
            </Button>
            <Button size="md" Icon={CalendarDays} onClick={() => openEnquiry("visit")}>
              Book a campus tour
            </Button>
          </>
        }
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {CAMPUS_TILES.map((tile, index) => (
          <Reveal key={tile.id} effect={index % 2 === 0 ? "right" : "left"} delay={index * 80}>
            <figure className="group relative overflow-hidden rounded-card border border-white/10 bg-slate-900/40 shadow-2xl shadow-blue-500/5">
              <img
                src={tile.src}
                width={tile.width}
                height={tile.height}
                alt={`${tile.title} - IIMT Group of Colleges, Greater Noida`}
                className="aspect-[4/3] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/45 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <Badge tone={index % 2 === 0 ? "accent" : "brand"}>{tile.tag}</Badge>
                <h3 className="mt-3 font-display text-lg font-bold text-content">{tile.title}</h3>
                <p className="mt-1.5 max-w-md text-xs leading-relaxed text-muted">{tile.story}</p>
                <a
                  href="#gallery"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-brand-ink transition hover:text-content"
                >
                  View gallery
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
