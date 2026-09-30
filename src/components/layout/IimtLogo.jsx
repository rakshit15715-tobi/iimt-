import { INSTITUTE } from "../../constants/site.js";

/**
 * The IIMT mark, rebuilt in the browser instead of hot-linking the institute's image asset:
 * a crimson gradient tile with the wordmark inside plus a stacked "Group of Colleges" line.
 * Everything is drawn with theme tokens, so it re-tints with the palette.
 */
export function IimtLogo({ size = "md", showWordmark = true, className = "" }) {
  const tile = size === "sm" ? "h-9 w-9 rounded-xl text-[0.58rem]" : size === "lg" ? "h-12 w-12 rounded-2xl text-[0.72rem]" : "h-10 w-10 rounded-xl text-[0.62rem]";

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span
        className={`grid shrink-0 place-items-center bg-gradient-to-br from-brand-bright to-brand font-display font-extrabold tracking-tight text-white shadow-glow-brand ${tile}`}
        aria-hidden="true"
      >
        IIMT
      </span>
      {showWordmark ? (
        <span className="leading-none">
          <span className="block font-display text-base font-extrabold tracking-tight text-content sm:text-lg">
            {INSTITUTE.name}
          </span>
          <span className="mt-1 block text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-muted">
            {INSTITUTE.campus} &middot; {INSTITUTE.region}
          </span>
        </span>
      ) : (
        <span className="sr-only">{INSTITUTE.name}</span>
      )}
    </span>
  );
}
