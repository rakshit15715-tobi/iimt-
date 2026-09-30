import { toneOf } from "./tones.js";

/**
 * The frosted-glass surface every section is built from (SRS §3.2).
 * `interactive` adds the lift-on-hover behaviour; `tone` adds a coloured border highlight.
 */
export function GlassCard({
  as: Tag = "div",
  tone = null,
  interactive = false,
  padding = "md",
  className = "",
  children,
  ...rest
}) {
  const palette = tone ? toneOf(tone) : toneOf("neutral");
  const pad = padding === "none" ? "" : padding === "sm" ? "p-4" : padding === "lg" ? "p-6 sm:p-8" : "p-5 sm:p-6";

  return (
    <Tag
      className={`glass rounded-card ${pad} ${
        tone ? palette.border : ""
      } ${interactive ? `transition duration-300 hover:-translate-y-1 ${palette.hover} hover:bg-slate-900/60` : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Eyebrow label + title + optional description, used at the top of every glass card. */
export function GlassCardHeader({ eyebrow = null, title, subtitle = null, action = null, tone = "brand", className = "" }) {
  const palette = toneOf(tone);
  return (
    <header className={`flex items-start justify-between gap-4 ${className}`}>
      <div>
        {eyebrow ? (
          <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${palette.text}`}>{eyebrow}</p>
        ) : null}
        <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-content sm:text-xl">{title}</h3>
        {subtitle ? <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p> : null}
      </div>
      {action}
    </header>
  );
}
