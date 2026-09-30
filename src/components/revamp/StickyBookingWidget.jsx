import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Download, ShieldCheck, Calendar, Users } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import BookingModal from '../BookingModal';
import { companyInfo } from '../../data/siteData';

/**
 * Desktop-only sticky right-rail widget for detail pages.
 * REVAMP_PLAN §4.6 — the highest-conversion element on the site.
 */
export default function StickyBookingWidget({ pkg, className }) {
  const [modalOpen, setModalOpen] = useState(false);
  const savings = pkg?.savingsPercent
    || (pkg?.strikePrice && pkg?.price && pkg.strikePrice > pkg.price
      ? Math.round(((pkg.strikePrice - pkg.price) / pkg.strikePrice) * 100)
      : null);

  const whatsAppUrl = `https://wa.me/${String(companyInfo.phone.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hi Traverse Globe, I'd like a quote for "${pkg?.title || 'a package'}" (${window?.location?.href || ''}). Please share details.`
  )}`;

  return (
    <>
      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          'hidden lg:block sticky top-24 rounded-2xl border border-brand-hairline bg-white shadow-soft-lg overflow-hidden',
          className
        )}
      >
        {/* Price header */}
        <div className="p-5 bg-gradient-to-br from-white to-brand-canvas">
          <div className="flex items-center justify-between mb-2">
            <span className="text-kicker uppercase text-brand-muted-ink font-poppins">Starts from</span>
            {savings > 0 && <Badge variant="trust">Save {savings}%</Badge>}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-poppins font-bold text-brand-ink">
              ₹{pkg?.price?.toLocaleString('en-IN') || '—'}
            </span>
            {pkg?.strikePrice > pkg?.price && (
              <span className="text-sm text-brand-muted-ink line-through font-canva-sans">
                ₹{pkg.strikePrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <p className="text-xs text-brand-muted-ink font-canva-sans mt-1">
            Per person on twin sharing
          </p>
        </div>

        <Separator />

        {/* Quick info */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2.5 text-sm text-brand-ink font-canva-sans">
            <Calendar className="w-4 h-4 text-brand-orange flex-shrink-0" />
            <span>{pkg?.duration || pkg?.nights || 'Custom dates'}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-brand-ink font-canva-sans">
            <Users className="w-4 h-4 text-brand-orange flex-shrink-0" />
            <span>Family-friendly · 2 adults typical</span>
          </div>
          {pkg?.freeCancellationDays > 0 && (
            <div className="flex items-center gap-2.5 text-sm text-brand-ink font-canva-sans">
              <ShieldCheck className="w-4 h-4 text-brand-trust flex-shrink-0" />
              <span>Free cancellation up to {pkg.freeCancellationDays} days before</span>
            </div>
          )}
        </div>

        <Separator />

        {/* CTAs */}
        <div className="p-5 space-y-2.5">
          <Button
            onClick={() => setModalOpen(true)}
            size="lg"
            className="w-full font-poppins font-semibold shadow-glow-orange"
          >
            Get quote
          </Button>
          <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/5"
            >
              <FaWhatsapp className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </Button>
          </a>
          <p className="text-[11px] text-brand-muted-ink font-canva-sans text-center pt-1">
            No payment now · Fixed price · Reply within 30 min
          </p>
        </div>

        {/* Secondary CTA */}
        <div className="px-5 pb-5">
          <button className="text-xs text-brand-muted-ink hover:text-brand-orange font-canva-sans inline-flex items-center gap-1 transition-colors">
            <Download className="w-3.5 h-3.5" />
            Prefer PDF? Download itinerary
          </button>
        </div>
      </motion.aside>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        packageName={pkg?.title || 'Package enquiry'}
      />
    </>
  );
}
