import { useTilt } from "../../hooks/useTilt.js";

/**
 * Vanilla-tilt's React wrapper (SRS §4): smooth 3D tilt with specular glare on the glass cards.
 *
 * With reduced motion enabled the hook skips initialisation and this renders a plain div, so the
 * card stays perfectly usable and keyboard focus is never tilted away from the content.
 */
export function Tilt3D({
  children,
  className = "",
  max = 7,
  glare = true,
  maxGlare = 0.16,
  scale = 1.02,
  as: Tag = "div",
}) {
  const { nodeRef, tiltEnabled } = useTilt({ max, glare, maxGlare, scale });

  return (
    <Tag ref={nodeRef} className={`${tiltEnabled ? "tilt-surface" : ""} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
