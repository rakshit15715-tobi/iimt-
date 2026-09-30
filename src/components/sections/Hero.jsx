import { ArrowRight, Award, Download, MapPin, Star, Trophy } from "lucide-react";

import { HERO_HIGHLIGHTS, INSTITUTE } from "../../constants/site.js";
import { useEnquiry } from "../../context/EnquiryContext.jsx";
import { HERO_IMAGE } from "../../data/gallery.js";
import { useTyped } from "../../hooks/useTyped.js";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";

/** The rotating half of the headline. Kept short so the line never wraps awkwardly. */
const HERO_KEYWORDS = ["Leaders", "Innovators", "Entrepreneurs", "Researchers"];

/**
 * Hero (SRS §2): typewriter headline, radial-gradient ambience, dual CTA buttons and the campus
 * photograph with the ranking badge.
 *
 * The fallback keyword is rendered only when reduced motion is on (so Typed.js never runs). When
 * the animation does run the span must start EMPTY: typed.js reads the element's existing content
 * and `strings.unshift(e.currentElContent)`es it into the sequence, so a pre-rendered word would
 * make it appear twice every cycle. The full sentence is exposed through sr-only text, so a screen
 * reader hears "Shaping Tomorrow's Leaders…" instead of every keystroke of the animation.
 */
export default function Hero() {
  const { openEnquiry } = useEnquiry();
  const { nodeRef, reduceMotion, fallback } = useTyped(HERO_KEYWORDS, {
    typeSpeed: 62,
    backSpeed: 28,
    backDelay: 2200,
    loop: true,
    cursorChar: "|",
  });

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20">
      <div className="decor-grid pointer-events-none absolute inset-x-0 top-0 h-[32rem]" aria-hidden="true" />
      <div className="decor-glow-brand pointer-events-none absolute inset-x-0 top-0 h-[36rem]" aria-hidden="true" />
      <div className="decor-glow-accent pointer-events-none absolute inset-x-0 top-0 h-[28rem]" aria-hidden="true" />

      <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div data-aos="fade-up">
          <Badge tone="brand" Icon={Award}>
            {INSTITUTE.accreditation}
          </Badge>

          <h1 className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Shaping Tomorrow&rsquo;s{" "}
            <span className="relative inline-block">
              <span
                ref={nodeRef}
                aria-hidden="true"
                className="inline-block min-w-[4ch] text-brand-bright underline decoration-brand/50 decoration-[6px] underline-offset-[10px]"
              >
                {reduceMotion ? fallback : ""}
              </span>
              <span className="sr-only">Leaders, Innovators and Entrepreneurs</span>
            </span>{" "}
            Through Excellence &amp; Innovation.
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{INSTITUTE.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" TrailingIcon={ArrowRight} onClick={() => openEnquiry("apply")}>
              Apply Online Now
            </Button>
            <Button size="lg" variant="secondary" Icon={Download} onClick={() => openEnquiry("brochure")}>
              Download Brochure
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {HERO_HIGHLIGHTS.map((item) => (
              <div key={item.id} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                <Star size={16} className="text-gold" aria-hidden="true" />
                <span className="text-sm">
                  <span className="font-display font-bold text-content">{item.value}</span>{" "}
                  <span className="text-muted">{item.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative" data-aos="zoom-in" data-aos-delay="120">
          <div className="glass overflow-hidden rounded-card p-2.5">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1rem]">
              <img
                src={HERO_IMAGE.src}
                width={HERO_IMAGE.width}
                height={HERO_IMAGE.height}
                alt="IIMT Group of Colleges campus building with the IIMT sign in Knowledge Park-III, Greater Noida"
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas via-canvas/70 to-transparent p-5 pt-14"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-ink">
                  <MapPin size={12} aria-hidden="true" />
                  IIMT Campus Life
                </p>
                <p className="mt-2 text-sm font-semibold text-content">{HERO_IMAGE.title}</p>
                <p className="mt-1 text-xs text-muted">{HERO_IMAGE.story}</p>
              </div>
            </div>
          </div>

          <div className="glass absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:left-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft text-gold-ink">
              <Trophy size={18} aria-hidden="true" />
            </span>
            <span className="text-xs">
              <span className="block font-display text-sm font-bold text-content">Ranked Top 15</span>
              <span className="text-muted">in North India</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
