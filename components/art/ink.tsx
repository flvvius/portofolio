import type { ReactNode, SVGProps } from "react";

/**
 * ILLUSTRATION PROTOCOL
 *
 * Every drawing on this site is made with the same pen:
 *   - brown ink line work (inherits `currentColor`, which is --ink)
 *   - one stroke weight, everywhere, at every render size. That is what
 *     `vector-effect: non-scaling-stroke` buys us (applied in globals.css via
 *     `.ink-art *`): a 320px turntable and a 28px cuckoo have identical line
 *     weight, the way they would if one hand drew both with one nib.
 *   - round caps and joins — no sharp mitres, nothing mechanical
 *   - shading is cross-hatch only, never a fill or a gradient
 *   - the only fills permitted: paper tones, ink for tiny solids (eyes,
 *     screw heads), and the orange record label. Nothing else.
 *
 * Paths are drawn slightly off-true on purpose. Straight lines wobble a
 * little, circles are drawn as four uneven arcs. If a shape looks CAD-perfect,
 * it is wrong for this site.
 */

export const PAPER = "#F4EFE6";
export const PAPER_WARM = "#EDE5D6";
export const ACCENT = "#D96B2B";

type InkArtProps = SVGProps<SVGSVGElement> & {
  viewBox: string;
  children: ReactNode;
  /** Decorative by default — pass a title to make it announced. */
  title?: string;
};

export function InkArt({
  viewBox,
  children,
  className,
  title,
  ...rest
}: InkArtProps) {
  return (
    <svg
      viewBox={viewBox}
      className={["ink-art", className].filter(Boolean).join(" ")}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Cross-hatch shading. The only shading technique used on this site. */
export function Hatch({
  d,
  opacity = 0.55,
}: {
  d: string;
  opacity?: number;
}) {
  return <path d={d} strokeWidth={1.1} opacity={opacity} />;
}
