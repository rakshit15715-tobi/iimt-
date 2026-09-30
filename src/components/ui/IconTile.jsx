import { toneOf } from "./tones.js";

const SIZES = {
  sm: "h-9 w-9 rounded-xl",
  md: "h-11 w-11 rounded-2xl",
  lg: "h-12 w-12 rounded-2xl",
};

/** Icon in a frosted tile - used by programme cards, admission steps, events and statistics. */
export function IconTile({ Icon, tone = "brand", size = "md", className = "" }) {
  const palette = toneOf(tone);
  const glyph = size === "sm" ? 16 : size === "lg" ? 22 : 19;
  return (
    <span
      className={`grid shrink-0 place-items-center border backdrop-blur-sm ${SIZES[size]} ${palette.tile} ${className}`}
    >
      <Icon size={glyph} aria-hidden="true" />
    </span>
  );
}
