import { REVEAL_EFFECTS } from "./revealEffects.js";

/**
 * AOS reveal wrapper (SRS §4: Animate On Scroll).
 *
 * Why a wrapper instead of scattered data-aos attributes: the integration rules ("one element,
 * one animation owner", valid effect names only) are then enforced in a single place.
 *
 * IMPORTANT: never nest a <Tilt3D> on the same node as a <Reveal> - AOS and VanillaTilt both
 * write inline `transform`, and the last writer wins. Wrap: <Reveal><Tilt3D>…</Tilt3D></Reveal>.
 */
export function Reveal({
  children,
  effect = "up",
  delay = 0,
  duration = 700,
  as: Tag = "div",
  className = "",
  ...rest
}) {
  const aosEffect = typeof effect === "string" && effect.includes("-") ? effect : REVEAL_EFFECTS[effect] ?? "fade-up";

  return (
    <Tag
      className={className}
      data-aos={aosEffect ?? undefined}
      data-aos-delay={aosEffect ? delay : undefined}
      data-aos-duration={aosEffect ? duration : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
