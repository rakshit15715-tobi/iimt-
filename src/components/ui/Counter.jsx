import { useCountUp } from "../../hooks/useCountUp.js";
import { groupDigits } from "../../utils/format.js";

/**
 * Animated statistic.
 *
 * The rolling digits are aria-hidden and the final value is exposed once as visually hidden
 * text, so assistive tech reads "25,000+" instead of every intermediate frame.
 */
export function Counter({ value, suffix = "", decimals = 0, duration = 1600, className = "" }) {
  const { ref, value: current } = useCountUp(value, { duration });

  const formatted = decimals > 0 ? current.toFixed(decimals) : groupDigits(current);
  const finalLabel = `${decimals > 0 ? value.toFixed(decimals) : groupDigits(value)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {formatted}
        {suffix}
      </span>
      <span className="sr-only">{finalLabel}</span>
    </span>
  );
}
