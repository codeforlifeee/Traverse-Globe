import React from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI - ShimmerButton
 * Luxury CTA button with a continuous sweep of luminous light across its surface.
 */
export const ShimmerButton = React.forwardRef(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.08em",
      shimmerDuration = "2.5s",
      borderRadius = "1rem",
      background = "radial-gradient(ellipse 80% 80% at 50% 120%, #FF5B04, #e65204)",
      className,
      children,
      as: Component = "button",
      ...props
    },
    ref
  ) => {
    return (
      <Component
        style={{
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        }}
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-glow-orange",
          "transform-gpu transition-transform ease-out",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]"
          )}
        >
          {/* Spark */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* Spark before */}
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2 font-poppins font-semibold">
          {children}
        </span>

        {/* Highlight backdrop */}
        <div
          className={cn(
            "insert-0 absolute size-full",
            "rounded-[var(--radius)] px-4 py-1.5 text-sm font-medium",
            "transform-gpu transition-all duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_10px_rgba(255,255,255,0.2)]",
            "group-active:shadow-[inset_0_-10px_10px_rgba(0,0,0,0.2)]"
          )}
        />

        {/* Backdrop overlay */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
          )}
        />
      </Component>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
export default ShimmerButton;
