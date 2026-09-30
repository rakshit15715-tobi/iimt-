/**
 * Tone map. Tailwind only emits classes it can see as literal strings in the source, so every
 * combination lives here as a complete class name - never build these with template strings.
 */
export const TONES = {
  brand: {
    dot: "bg-brand",
    text: "text-brand-ink",
    tile: "bg-brand-soft text-brand-ink border-brand/25",
    chip: "bg-brand-soft text-brand-ink border-brand/25",
    border: "border-brand/30",
    glow: "shadow-glow-brand",
    hover: "hover:border-brand/45",
  },
  accent: {
    dot: "bg-accent",
    text: "text-accent-ink",
    tile: "bg-accent-soft text-accent-ink border-accent/25",
    chip: "bg-accent-soft text-accent-ink border-accent/25",
    border: "border-accent/30",
    glow: "shadow-glow-accent",
    hover: "hover:border-accent/45",
  },
  gold: {
    dot: "bg-gold",
    text: "text-gold-ink",
    tile: "bg-gold-soft text-gold-ink border-gold/25",
    chip: "bg-gold-soft text-gold-ink border-gold/25",
    border: "border-gold/30",
    glow: "shadow-glow-gold",
    hover: "hover:border-gold/45",
  },
  neutral: {
    dot: "bg-muted",
    text: "text-muted",
    tile: "bg-white/5 text-body border-white/10",
    chip: "bg-white/5 text-body border-white/10",
    border: "border-white/10",
    glow: "shadow-soft",
    hover: "hover:border-white/25",
  },
};

export const TONE_KEYS = Object.keys(TONES);

export function toneOf(tone) {
  return TONES[tone] ?? TONES.neutral;
}
