import { Eyebrow } from "./Eyebrow.jsx";

/**
 * Section masthead: eyebrow, display heading, supporting paragraph and an optional slot for
 * buttons on the right (used by "Explore all programmes" / "View events calendar").
 *
 * `id` is wired to the section's aria-labelledby so screen readers announce a real heading.
 */
export function SectionHeading({
  id,
  eyebrow,
  tone = "brand",
  title,
  description = null,
  actions = null,
  align = "left",
  className = "",
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";
  return (
    <div
      className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${className}`}
    >
      <div className={`flex max-w-3xl flex-col ${alignment}`}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
          id={id}
          className="mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-content sm:text-4xl lg:text-[2.75rem]"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
