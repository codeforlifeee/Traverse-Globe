import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI - NumberTicker
 * Smooth odometer-style rolling count-up driven by spring physics.
 *
 * Deliberately overdamped. The old 120/40 config snapped to the number almost
 * immediately and read as a frantic slot machine; this one glides and settles,
 * which is what makes a trust number feel stated rather than performed.
 *
 * Note `useGrouping`: a year is a number but not a quantity, so it must not be
 * thousands-separated — a ticker counting to 2018 was rendering "2,018".
 * Anything year-like should pass `useGrouping={false}`, or simply not animate.
 */

/** Overdamped: no overshoot, long gentle settle. */
const CHILL_SPRING = { damping: 60, stiffness: 55, mass: 1 };

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  prefix = "",
  suffix = "",
  useGrouping = true,
  springConfig,
  // false renders the final figure with no count-up (used when the number arrived
  // in pre-rendered HTML and is already on screen).
  animate = true,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, springConfig || CHILL_SPRING);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const format = (n) =>
    Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
      useGrouping,
    }).format(Number(Number(n).toFixed(decimalPlaces)));

  useEffect(() => {
    if (!animate || !isInView) return undefined;

    // Counting up is motion; with the preference set, state the figure instead.
    if (reduceMotion) {
      if (ref.current) ref.current.textContent = `${prefix}${format(value)}${suffix}`;
      return undefined;
    }

    const timer = setTimeout(() => {
      motionValue.set(direction === "down" ? 0 : value);
    }, delay * 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionValue, isInView, delay, value, direction, reduceMotion, animate]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${format(latest)}${suffix}`;
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [springValue, decimalPlaces, prefix, suffix, useGrouping]
  );

  return (
    <span className={cn("inline-block tabular-nums tracking-tight", className)} ref={ref}>
      {/* Formatted rather than a bare "0", so the first paint matches the shape
          of the final value (e.g. "0.0★", not "0★") and the width does not jump. */}
      {`${prefix}${format(!animate || direction === "down" ? value : 0)}${suffix}`}
    </span>
  );
}
