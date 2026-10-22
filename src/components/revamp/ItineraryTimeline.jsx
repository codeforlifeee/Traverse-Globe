import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Kicker from './Kicker';

/**
 * Vertical stepper for daily itinerary — REVAMP_PLAN §4.6.
 * Each day is a collapsible node on a rail.
 */
export default function ItineraryTimeline({ days = [] }) {
  const [openIdx, setOpenIdx] = useState(0);

  if (!days.length) return null;

  return (
    <div className="relative">
      <div className="absolute left-[15px] top-3 bottom-3 w-px bg-brand-hairline" aria-hidden />

      <div className="space-y-3">
        {days.map((day, idx) => {
          const isOpen = openIdx === idx;
          const label = day.dayKey || `Day ${idx + 1}`;
          return (
            <div key={idx} className="relative pl-10">
              <div className={cn(
                'absolute left-0 top-3.5 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-surface transition-colors',
                isOpen ? 'border-brand-orange text-brand-orange' : 'border-brand-hairline text-brand-muted-ink'
              )}>
                <span className="text-[11px] font-poppins font-semibold">{idx + 1}</span>
              </div>

              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className={cn(
                  'w-full text-left rounded-2xl border transition-shadow',
                  isOpen
                    ? 'border-brand-orange/30 shadow-soft-md bg-surface'
                    : 'border-brand-hairline hover:shadow-soft-md bg-surface'
                )}
              >
                <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <div className="min-w-0">
                    <Kicker tone="orange">{label}</Kicker>
                    <h3 className="mt-1 text-sm md:text-base font-poppins font-semibold text-brand-ink line-clamp-2">
                      {day.title}
                    </h3>
                  </div>
                  <ChevronDown className={cn('w-5 h-5 flex-shrink-0 text-brand-muted-ink transition-transform', isOpen && 'rotate-180 text-brand-orange')} />
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && day.description && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1">
                        <p className="text-sm text-brand-muted-ink font-canva-sans leading-relaxed whitespace-pre-line">
                          {day.description}
                        </p>
                        {day.location && (
                          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-brand-muted-ink font-canva-sans">
                            <MapPin className="w-3.5 h-3.5" />
                            {day.location}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
