import { cn } from "@/lib/utils";

/**
 * The signature kicker. Small uppercase label above every section heading.
 * REVAMP_PLAN §6.1 — the site's fingerprint.
 */
export default function Kicker({ children, className, tone = "muted", size = "default" }) {
  const toneCls = tone === "orange" ? "text-brand-orange" : "text-brand-muted-ink";
  const sizeCls = size === "lg" ? "text-kicker-lg" : "text-kicker";
  return (
    <span
      className={cn(
        "inline-block uppercase font-poppins",
        sizeCls,
        toneCls,
        className
      )}
    >
      {children}
    </span>
  );
}
