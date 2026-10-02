import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import BookingModal from '../BookingModal';
import { cn } from '@/lib/utils';

/**
 * Bottom-sticky booking bar for mobile detail pages.
 * REVAMP_PLAN §4.6 mobile treatment.
 */
export default function MobileBookingBar({ pkg }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'lg:hidden fixed bottom-0 left-0 right-0 z-40',
          'bg-surface border-t border-brand-hairline shadow-[0_-8px_24px_rgba(15,23,42,0.08)]',
          'pb-[env(safe-area-inset-bottom)]'
        )}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-widest text-brand-muted-ink font-poppins">Starts from</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-poppins font-bold text-brand-ink truncate">
                ₹{pkg?.price?.toLocaleString('en-IN') || '—'}
              </span>
              {pkg?.strikePrice > pkg?.price && (
                <span className="text-xs text-brand-muted-ink line-through">
                  ₹{pkg.strikePrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            className="font-poppins font-semibold shadow-glow-orange flex-shrink-0"
          >
            Get quote
          </Button>
        </div>
      </motion.div>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        packageName={pkg?.title || 'Package enquiry'}
      />
    </>
  );
}
