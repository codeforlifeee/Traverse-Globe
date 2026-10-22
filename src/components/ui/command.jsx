import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive ref={ref}
    className={cn("flex h-full w-full flex-col overflow-hidden rounded-2xl bg-surface text-brand-ink", className)} {...props} />
))

// `shouldFilter`, `filter`, `label` and `loop` belong to cmdk, not to Dialog -
// forwarding them to Dialog leaks unknown attributes onto the DOM node.
const CommandDialog = ({ children, shouldFilter, filter, label, loop = true, ...props }) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden p-0 shadow-soft-xl max-w-2xl border-brand-hairline bg-surface">
      <Command
        shouldFilter={shouldFilter}
        filter={filter}
        label={label}
        loop={loop}
        className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:font-poppins [&_[cmdk-group-heading]]:text-kicker [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-brand-muted-ink [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5"
      >
        {children}
      </Command>
    </DialogContent>
  </Dialog>
)

const CommandInput = React.forwardRef(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-brand-hairline px-4" cmdk-input-wrapper="">
    <Search className="mr-3 h-5 w-5 shrink-0 text-brand-muted-ink" />
    <CommandPrimitive.Input ref={ref}
      className={cn("flex h-12 w-full rounded-md bg-transparent py-3 text-sm font-canva-sans text-brand-ink caret-brand-orange outline-none placeholder:text-brand-muted-ink disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
  </div>
))

const CommandList = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={cn("max-h-[60vh] md:max-h-[460px] overflow-y-auto overflow-x-hidden py-2 scrollbar-thin", className)} {...props} />
))

const CommandEmpty = React.forwardRef((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm text-brand-muted-ink font-canva-sans" {...props} />
))

const CommandGroup = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Group ref={ref} className={cn("overflow-hidden py-2 text-brand-ink", className)} {...props} />
))

const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("mx-2 h-px bg-brand-hairline", className)} {...props} />
))

// NOTE: the disabled variants must match `data-[disabled=true]`, not
// `data-[disabled]`. cmdk v1 always renders the attribute and writes "false"
// into it, and Tailwind's bare `data-[disabled]:` compiles to the
// attribute-PRESENCE selector `[data-disabled]` — so every item was getting
// `pointer-events: none`. Rows highlighted and fired on Enter but ignored the
// mouse entirely.
const CommandItem = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Item ref={ref}
    className={cn("relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm font-canva-sans outline-none aria-selected:bg-brand-orange/10 aria-selected:text-brand-ink aria-selected:ring-1 aria-selected:ring-inset aria-selected:ring-brand-orange/30 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50", className)} {...props} />
))

const CommandShortcut = ({ className, ...props }) => (
  <span className={cn("ml-auto text-xs tracking-widest text-brand-muted-ink", className)} {...props} />
)

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator }
