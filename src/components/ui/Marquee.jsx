/**
 * Infinite marquee (SRS §2 "Campus Gallery Marquee").
 *
 * The track holds two identical groups and slides by exactly -50% of its own width, so the
 * second group lands where the first started and the loop is seamless - no JS, no measurement,
 * pure CSS transform on the compositor. The duplicate copy is aria-hidden so screen readers hear
 * the photographs once.
 *
 * Hovering or focusing anything inside pauses the animation (`animation-play-state`), which is
 * what makes the "pause on hover" requirement work without a single event listener.
 */
export function Marquee({ children, label, speed = 46, reverse = false, pauseOnHover = true, className = "" }) {
  const trackClasses = [
    "marquee__track",
    reverse ? "marquee__track--reverse" : "",
    pauseOnHover ? "marquee-pause" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`marquee ${className}`} role="group" aria-label={label}>
      <div className="marquee__viewport">
        <div className={trackClasses} style={{ animationDuration: `${speed}s` }}>
          <div className="marquee__group">{children}</div>
          <div className="marquee__group" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
