import { cn } from "@/lib/utils";
import Kicker from "./Kicker";
import SectionRule from "./SectionRule";

/**
 * Standardised section wrapper — every content section on the revamp uses this.
 * Wires the kicker + hairline rule + heading + optional right-side action into a
 * consistent rhythm.
 *
 * REVAMP_PLAN §6.3 spacing rhythm: py-16 md:py-24, gap-4 md:gap-6 lg:gap-8.
 */
export default function Section({
  kicker,
  title,
  subtitle,
  action,
  children,
  bg = "canvas",
  fullBleed = false,
  className,
  headerAlign = "left",
  id,
}) {
  const bgCls = {
    canvas: "bg-brand-canvas",
    "canvas-2": "bg-brand-canvas-2",
    white: "bg-surface",
    ink: "bg-brand-scrim text-white",
    none: "",
  }[bg] || "bg-brand-canvas";

  const wrapCls = fullBleed
    ? "px-4 md:px-6 lg:px-8"
    : "container-custom";

  const alignCls = headerAlign === "center" ? "items-center text-center" : "items-start";

  return (
    <section
      id={id}
      className={cn("py-14 md:py-20 lg:py-24", bgCls, className)}
    >
      <div className={wrapCls}>
        {(kicker || title || action) && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
            <div className={cn("flex flex-col", alignCls)}>
              {kicker && <Kicker tone={bg === "ink" ? "orange" : "muted"}>{kicker}</Kicker>}
              {title && (
                <h2 className={cn(
                  "text-h2 font-poppins mt-3",
                  bg === "ink" ? "text-white" : "text-brand-ink"
                )}>
                  {title}
                </h2>
              )}
              <SectionRule
                width="sm"
                tone={bg === "ink" ? "orange" : "default"}
                className={cn(headerAlign === "center" && "mx-auto")}
              />
              {subtitle && (
                <p className={cn(
                  "text-body-lg max-w-2xl -mt-1",
                  bg === "ink" ? "text-white/70" : "text-brand-muted-ink"
                )}>
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
