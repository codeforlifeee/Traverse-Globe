import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { isShortlisted, toggleShortlist, subscribeShortlist } from "@/lib/shortlist";

/**
 * Heart icon that toggles shortlist membership.
 * REVAMP_PLAN §8 — moment of delight #2: satisfying scale pulse on add.
 */
export default function HeartIcon({ item, className, size = "md" }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!item?.id) return;
    setActive(isShortlisted(item.id));
    const unsub = subscribeShortlist(() => setActive(isShortlisted(item.id)));
    return unsub;
  }, [item?.id]);

  const sizeCls = { sm: "w-8 h-8", md: "w-9 h-9", lg: "w-10 h-10" }[size] || "w-9 h-9";
  const iconCls = { sm: "w-4 h-4", md: "w-[18px] h-[18px]", lg: "w-5 h-5" }[size] || "w-[18px] h-[18px]";

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!item?.id) return;
    toggleShortlist(item);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? "Remove from shortlist" : "Save to shortlist"}
      className={cn(
        "relative flex items-center justify-center rounded-full bg-surface/95 backdrop-blur shadow-soft-md border border-brand-hairline transition-colors",
        "hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2",
        sizeCls,
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={active ? "on" : "off"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: active ? [1, 1.3, 1] : 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex"
        >
          <Heart
            className={cn(
              iconCls,
              active ? "fill-brand-orange stroke-brand-orange" : "stroke-brand-ink/70"
            )}
            strokeWidth={active ? 0 : 1.8}
          />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
