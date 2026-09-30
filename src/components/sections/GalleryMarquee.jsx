import { GALLERY_ITEMS } from "../../data/gallery.js";
import { Marquee } from "../ui/Marquee.jsx";
import { Eyebrow } from "../ui/Eyebrow.jsx";

/**
 * Continuous auto-scrolling campus gallery (SRS §2: infinite marquee with pause-on-hover).
 *
 * The scrolling is one CSS keyframe on the compositor; hovering or tabbing into any photograph
 * pauses it via `animation-play-state`. With reduced motion the CSS unrolls the marquee into a
 * wrapped grid instead of a conveyor belt.
 */
export default function GalleryMarquee() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative py-14 sm:py-16">
      <div className="section-shell flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow tone="accent">Campus gallery</Eyebrow>
          <h2
            id="gallery-title"
            className="mt-3 font-display text-2xl font-extrabold tracking-tight text-content sm:text-3xl"
          >
            Every corner of the campus, in motion
          </h2>
        </div>
        <p className="text-xs text-muted">
          {GALLERY_ITEMS.length} photographs &middot; hover or tab in to pause the reel
        </p>
      </div>

      <div className="mt-8">
        <Marquee label="Campus photographs" speed={52}>
          {GALLERY_ITEMS.map((item) => (
            <figure
              key={`reel-${item.id}`}
              className="group relative w-[15rem] shrink-0 overflow-hidden rounded-card border border-white/10 bg-slate-900/40 sm:w-[19rem]"
            >
              <img
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.title}
                className="aspect-[4/3] w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas via-canvas/70 to-transparent p-4 pt-10">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-ink">
                  {item.tag}
                </span>
                <p className="mt-1 text-sm font-semibold text-content">{item.title}</p>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
