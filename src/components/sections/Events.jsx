import { useMemo } from "react";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";

import { useEnquiry } from "../../context/EnquiryContext.jsx";
import { EVENTS } from "../../data/events.js";
import { byDateAscending, eventDateParts, formatEventDate } from "../../utils/format.js";
import { Reveal } from "../motion/Reveal.jsx";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";
import { GlassCard } from "../ui/GlassCard.jsx";
import { IconTile } from "../ui/IconTile.jsx";
import { Section } from "../ui/Section.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

/**
 * Campus Pulse - the forthcoming events grid.
 *
 * Dates are rendered through `formatEventDate()` / `eventDateParts()` (UTC-safe, unit tested)
 * and the machine-readable `<time datetime>` always carries the original ISO string, so the
 * visible label and the markup can never disagree.
 */
export default function Events() {
  const { openEnquiry } = useEnquiry();
  const events = useMemo(() => byDateAscending(EVENTS), []);

  return (
    <Section id="events" labelledBy="events-title">
      <SectionHeading
        id="events-title"
        eyebrow="Latest updates"
        tone="brand"
        title="Campus Pulse & Forthcoming Events"
        description="Hackathons, mock tests, guest lectures and the annual fest - what the campus has queued up next for aspirants and students alike."
        actions={
          <Button variant="secondary" size="md" Icon={CalendarDays} onClick={() => openEnquiry("visit")}>
            Request an event invitation
          </Button>
        }
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {events.map((event, index) => {
          const parts = eventDateParts(event.date);
          return (
            <Reveal key={event.id} effect="up" delay={index * 80} className="h-full">
              <GlassCard tone={event.tone} interactive className="flex h-full flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid w-14 place-items-center rounded-xl border border-white/10 bg-white/5 py-2">
                      <span className="font-display text-lg font-extrabold leading-none text-content">
                        {parts.day}
                      </span>
                      <span className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-muted">
                        {parts.month}
                      </span>
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <time dateTime={parts.iso} className="text-[0.7rem] font-semibold text-muted">
                        {formatEventDate(event.date)}
                      </time>
                      <Badge tone={event.tone}>{event.category}</Badge>
                    </div>
                  </div>
                  <IconTile Icon={event.Icon} tone={event.tone} size="sm" />
                </div>

                <h3 className="font-display text-base font-bold leading-snug text-content">{event.title}</h3>
                <p className="text-xs leading-relaxed text-muted">{event.description}</p>

                <div className="mt-auto flex flex-col gap-2 border-t border-white/5 pt-4 text-xs text-body">
                  <p className="flex items-center gap-2">
                    <Clock size={13} className="shrink-0 text-muted" aria-hidden="true" />
                    {event.time}
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin size={13} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
                    {event.venue}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  TrailingIcon={ArrowRight}
                  onClick={() => openEnquiry("visit")}
                >
                  Register interest
                </Button>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
