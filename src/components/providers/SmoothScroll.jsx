import { useEffect } from "react";

/**
 * SmoothScroll Provider
 * Wraps the application in a Lenis instance to give inertial momentum to mouse-wheel
 * scrolling on desktop.
 *
 * Skipped entirely when:
 * - the user prefers reduced motion, or
 * - the primary pointer is coarse (phones, tablets). Touch scrolling already has native
 *   momentum, and Lenis's per-frame loop only adds input latency there — on mid-range
 *   Android it made the page trail behind the finger, which read as lag.
 *
 * Lenis is imported on demand, so the devices that skip it never download it.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || coarsePointer) return;

    let lenis = null;
    let rafId = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        syncTouch: false,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
