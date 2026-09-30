import { toneOf } from "./tones.js";

/** The small uppercase section label with a glowing square dot, as in the design mock-up. */
export function Eyebrow({ children, tone = "brand", className = "" }) {
  const palette = toneOf(tone);
  return (
    <p
      className={`inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.24em] text-muted ${className}`}
    >
      <span className={`h-1.5 w-1.5 rotate-45 rounded-[1px] ${palette.dot}`} aria-hidden="true" />
      {children}
    </p>
  );
}
