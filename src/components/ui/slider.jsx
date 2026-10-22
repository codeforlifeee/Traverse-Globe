import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

// Radix renders one thumb per value, so a range slider needs a Thumb element per
// entry in `value`. Hardcoding a single Thumb left the upper bound of every price
// range undraggable — the track showed a range but only the lower handle moved.
const Slider = React.forwardRef(({ className, ...props }, ref) => {
  const values = props.value ?? props.defaultValue ?? [props.min ?? 0]
  const thumbCount = Array.isArray(values) ? values.length : 1

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-brand-orange" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-5 w-5 rounded-full border-2 border-brand-orange bg-background shadow-soft-sm ring-offset-background transition-colors hover:bg-brand-orange/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
