import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-lg border border-brand-hairline bg-surface px-3 py-2 text-sm font-canva-sans text-brand-ink ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-brand-muted-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
))
Input.displayName = "Input"
export { Input }
