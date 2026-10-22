import { cn } from "@/lib/utils";

/**
 * The hairline gray divider — second half of the signature motif.
 * REVAMP_PLAN §6.1.
 */
export default function SectionRule({ className, width = "sm", tone = "default" }) {
  const widthCls = { sm: "w-16", md: "w-24", lg: "w-40", full: "w-full" }[width] || "w-16";
  const toneCls = tone === "orange" ? "bg-brand-orange" : "bg-brand-hairline";
  return <span className={cn("block h-px my-4", widthCls, toneCls, className)} />;
}
