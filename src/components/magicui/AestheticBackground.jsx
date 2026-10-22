import { memo } from "react";
import DotPattern from "./DotPattern";

/**
 * AestheticBackground
 * The atmospheric travel canvas behind the whole app (tg-magic-animations §3):
 * - Sunset orange and coastal teal ambient orbs covering the full viewport,
 *   so every scroll position has colour behind it, not just the hero
 * - Faint dashed flight arcs, the brand's route motif
 * - Cartographic dot grid (DotPattern)
 *
 * Colours come from the --c-* theme channels, so teal shifts with the theme like
 * everything else. Orbs are soft radial gradients rather than `filter: blur`, which
 * keeps the layer cheap to composite; the slow drift animates transform only and is
 * gated behind `motion-safe:` so reduced motion gets a static canvas.
 *
 * The layer is `fixed`, so it shows through wherever a page or section uses a
 * translucent backdrop. An opaque full-width wrapper (bg-brand-canvas, bg-surface)
 * hides it completely — use bg-transparent or the /60–/80 translucent variants.
 */

const orb = (channel, alpha) =>
  `radial-gradient(closest-side, rgb(var(${channel}) / ${alpha}), rgb(var(${channel}) / ${alpha * 0.35}) 45%, transparent 100%)`;

const AestheticBackground = memo(() => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none"
    >
      {/* ── 1. Sunset orange horizon, top right ── */}
      <div
        className="absolute -top-[22%] -right-[12%] h-[70vmax] w-[70vmax] rounded-full opacity-100 dark:opacity-70 will-change-transform motion-safe:animate-orb-drift"
        style={{ background: orb("--c-orange", 0.3) }}
      />

      {/* ── 2. Coastal teal, left, mid-viewport ── */}
      <div
        className="absolute top-[18%] -left-[22%] h-[65vmax] w-[65vmax] rounded-full opacity-100 dark:opacity-90 will-change-transform motion-safe:animate-orb-drift-slow"
        style={{ background: orb("--c-teal", 0.26) }}
      />

      {/* ── 3. Warm dusk, bottom right — the lower half of the screen was bare ── */}
      <div
        className="absolute -bottom-[30%] right-[8%] h-[60vmax] w-[60vmax] rounded-full opacity-90 dark:opacity-60 will-change-transform motion-safe:animate-orb-drift-reverse"
        style={{ background: orb("--c-orange", 0.22) }}
      />

      {/* ── 4. Teal haze, bottom left, ties the two hues together ── */}
      <div
        className="absolute -bottom-[25%] -left-[10%] h-[45vmax] w-[45vmax] rounded-full opacity-80 dark:opacity-70 will-change-transform motion-safe:animate-orb-drift-slow"
        style={{ background: orb("--c-teal", 0.2) }}
      />

      {/* ── 5. Dashed flight arcs, barely there ── */}
      <svg
        className="absolute inset-0 size-full text-brand-orange opacity-[0.16] dark:opacity-[0.12]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 10">
          <path d="M-40 640 C 260 380, 560 320, 880 420 S 1340 520, 1500 260" />
          <path d="M120 900 C 380 700, 720 660, 1020 760" />
          <path d="M600 -20 C 760 140, 1040 180, 1480 120" />
        </g>
        <g fill="currentColor">
          <circle cx="880" cy="420" r="3.5" />
          <circle cx="1020" cy="760" r="3.5" />
          <circle cx="1040" cy="170" r="3.5" />
        </g>
      </svg>

      {/* ── 6. Cartographic dot grid ── */}
      <DotPattern
        width={30}
        height={30}
        cx={1.5}
        cy={1.5}
        cr={1.3}
        className="fill-brand-ink/[0.13] dark:fill-brand-ink/[0.08] [mask-image:radial-gradient(ellipse_130%_110%_at_50%_40%,#000_55%,transparent_100%)]"
      />
    </div>
  );
});

AestheticBackground.displayName = "AestheticBackground";
export default AestheticBackground;
