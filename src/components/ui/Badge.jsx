import { toneOf } from "./tones.js";

/**
 * Small glass pill. Used for accreditation chips, programme tags, recruiter names and the
 * category label on event cards.
 */
export function Badge({ tone = "neutral", Icon = null, children, className = "" }) {
  const palette = toneOf(tone);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm ${palette.chip} ${className}`}
    >
      {Icon ? <Icon size={12} aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
