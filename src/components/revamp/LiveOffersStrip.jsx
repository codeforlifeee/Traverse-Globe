import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Section from './Section';
import ImageWithFallback from './ImageWithFallback';
import { sanityClient } from '../../services/sanityClient';

/**
 * Live Offers strip — Cleartrip-style, copyable codes.
 * Falls back to sensible defaults if no `offer` docs in Sanity yet.
 * REVAMP_PLAN §4.1 step 7 + §5.4.
 */
const FALLBACK_OFFERS = [
  { code: 'SEASON20', title: 'Season kick-off', discount: 'Up to 20% off', destination: 'Bali · Thailand · Vietnam',
    image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=800&q=75' },
  { code: 'FAMILY10', title: 'Family-first deal', discount: 'Flat 10% off', destination: 'All family packages',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75' },
  { code: 'EARLYBIRD', title: 'Book 45 days out', discount: 'Save ₹5,000/pax', destination: 'International trips',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=75' },
  { code: 'CHARDHAM', title: 'Chardham Yatra', discount: 'Group discount', destination: 'Domestic pilgrimage',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=75' },
];

export default function LiveOffersStrip() {
  const [offers, setOffers] = useState(FALLBACK_OFFERS);
  const [copiedCode, setCopiedCode] = useState('');

  useEffect(() => {
    let cancelled = false;
    // Try to load from Sanity; if none, keep fallback
    sanityClient.fetch('*[_type == "offer" && active == true] | order(displayOrder asc)[0..3]')
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) setOffers(data);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const copy = (code) => {
    try { navigator.clipboard.writeText(code); setCopiedCode(code); setTimeout(() => setCopiedCode(''), 1800); } catch {}
  };

  return (
    <Section kicker="Live offers" title="Codes worth using this week" bg="canvas">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {offers.map((o, i) => (
          <motion.div
            key={o.code || i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group relative rounded-2xl overflow-hidden bg-white border border-brand-hairline shadow-soft-sm hover:shadow-soft-lg transition-shadow"
          >
            <div className="relative aspect-[16/9]">
              <ImageWithFallback src={o.image} alt={o.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/20 to-transparent" />
              <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-orange text-white text-[11px] font-poppins font-semibold">
                <Sparkles className="w-3 h-3" /> {o.discount}
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-poppins font-semibold text-brand-ink">{o.title}</p>
              <p className="mt-0.5 text-xs text-brand-muted-ink font-canva-sans">{o.destination}</p>
              <button
                onClick={() => copy(o.code)}
                className={cn(
                  'mt-3 w-full inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg border font-mono text-sm transition-colors',
                  copiedCode === o.code
                    ? 'border-brand-trust bg-brand-trust/10 text-brand-trust'
                    : 'border-dashed border-brand-hairline hover:border-brand-orange text-brand-ink'
                )}
              >
                <span className="font-poppins font-semibold tracking-wider text-xs uppercase">{o.code}</span>
                {copiedCode === o.code
                  ? <Check className="w-3.5 h-3.5" />
                  : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
