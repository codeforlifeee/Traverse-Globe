import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-poppins font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-canvas-2 text-brand-ink",
        orange: "border-brand-orange/20 bg-brand-orange/10 text-brand-orange",
        trust: "border-brand-trust/20 bg-brand-trust/10 text-brand-trust",
        outline: "border-brand-hairline text-brand-ink",
        ink: "border-transparent bg-brand-ink text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
)
function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
export { Badge, badgeVariants }
