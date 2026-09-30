/**
 * One button component for every call to action, rendered as <a> when `href` is present.
 *
 * Hover states are CSS-only (GPU-friendly transform + colour) so they never trigger a React
 * render, and the brand variant carries a coloured glow shadow per the SRS "neon glow button
 * hover states" requirement.
 */
const VARIANTS = {
  primary:
    "bg-gradient-to-r from-brand-bright to-brand text-white shadow-glow-brand hover:from-brand hover:to-brand-bright hover:shadow-[0_20px_55px_-16px_rgba(255,59,82,0.75)]",
  secondary:
    "border border-white/15 bg-white/5 text-content backdrop-blur-sm hover:border-white/30 hover:bg-white/10",
  outline: "border border-brand/40 bg-brand-soft/40 text-brand-ink hover:border-brand/70 hover:bg-brand-soft",
  ghost: "text-body hover:bg-white/5 hover:text-content",
};

const SIZES = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm sm:h-13 sm:px-7 sm:text-base",
};

export function Button({
  children,
  href = null,
  variant = "primary",
  size = "md",
  Icon = null,
  TrailingIcon = null,
  className = "",
  type = "button",
  external = false,
  ...rest
}) {
  const classes = `group inline-flex shrink-0 items-center justify-center gap-2 rounded-pill font-semibold tracking-tight transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${VARIANTS[variant] ?? VARIANTS.primary} ${SIZES[size] ?? SIZES.md} ${className}`;

  const content = (
    <>
      {Icon ? <Icon size={16} aria-hidden="true" /> : null}
      {children}
      {TrailingIcon ? (
        <TrailingIcon
          size={16}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
