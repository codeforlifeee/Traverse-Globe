import { useState } from 'react';
import { CheckCircle2, Download, FileText, Loader2 } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { companyInfo } from '../../data/companyInfo';
import ImageWithFallback from './ImageWithFallback';
import { cn } from '@/lib/utils';
import ShimmerButton from '../magicui/ShimmerButton';

/**
 * BrochureBanner — wide split-image promo band, in the shape of Klook's app banner.
 *
 * There is no mobile app to promote, so the same slot offers the thing we do
 * have: a Dubai itinerary PDF in exchange for a phone number. That makes the
 * band a lead source rather than decoration.
 *
 * On submit the brochure is delivered over WhatsApp by the team — we capture the
 * number, we do not serve a file. Wire VITE_BROCHURE_URL if a direct download
 * should also be offered.
 */

const BULLETS = [
  'Day-by-day 4N/5D Dubai itinerary',
  'Real per-person costs, nothing hidden',
  'Visa checklist & documents needed',
  'Best months, and what to skip',
];

export default function BrochureBanner() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const phoneValid = /^[0-9]{10}$/.test(phone.replace(/\D/g, '').slice(-10));
  const waBase = `https://wa.me/${String(companyInfo.phone.whatsapp).replace(/\D/g, '')}`;
  const waText = encodeURIComponent('Hi Traverse Globe! Please send me the free Dubai itinerary guide.');
  const brochureUrl = import.meta.env?.VITE_BROCHURE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneValid) return;

    setStatus('loading');
    try {
      const sheetUrl = import.meta.env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
      await fetch(sheetUrl || '/api/lead-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          request: 'Dubai brochure',
          timestamp: new Date().toISOString(),
          source: 'brochure-banner',
        }),
        mode: sheetUrl ? 'no-cors' : 'cors',
      }).catch(() => null);
    } finally {
      setStatus('success');
    }
  };

  return (
    <section>
      <div className="relative overflow-hidden bg-brand-scrim shadow-soft-xl grid grid-cols-1 lg:grid-cols-2 min-h-[260px] md:min-h-[300px]">
          {/* Copy side — padded to the shared container gutter so the headline
              aligns with the sections above and below it. */}
          <div
            className="bleed-start-half relative z-10 py-7 md:py-9 lg:py-10 flex flex-col justify-center"
            style={{ paddingInlineEnd: '1.5rem' }}
          >
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-brand-orange px-3 py-1 text-[11px] font-poppins font-bold uppercase tracking-wider text-white mb-3">
              <FileText className="w-3.5 h-3.5" />
              Free guide
            </span>

            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-white leading-tight">
              The Dubai trip, costed out honestly
            </h2>
            <p className="mt-2 text-white/75 font-canva-sans text-sm md:text-base max-w-md">
              A 12-page planner we actually use with clients. Tell us where to send it.
            </p>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-white/85 font-canva-sans">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {status === 'success' ? (
              <div className="mt-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur p-4">
                <p className="font-poppins font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  On its way.
                </p>
                <p className="mt-1 text-sm text-white/75 font-canva-sans">
                  We'll WhatsApp the guide to {phone} shortly.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`${waBase}?text=${waText}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] px-5 py-2.5 text-sm font-poppins font-semibold text-white transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Get it now on WhatsApp
                  </a>
                  {brochureUrl && (
                    <a
                      href={brochureUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-2.5 text-sm font-poppins font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="WhatsApp number"
                  aria-label="WhatsApp number for the Dubai guide"
                  className="flex-1 min-w-0 rounded-xl bg-white/10 border border-white/25 px-4 py-3 text-sm font-poppins text-white placeholder:text-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
                {/* The band exists to capture this number, so this is the
                    primary CTA and carries the shimmer sweep. */}
                <ShimmerButton
                  type="submit"
                  disabled={status === 'loading' || !phoneValid}
                  borderRadius="0.75rem"
                  className={cn(
                    'shrink-0 px-6 py-3 text-sm',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  {status === 'loading'
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                    : <>Send me the guide</>}
                </ShimmerButton>
              </form>
            )}
          </div>

          {/* Image side — becomes a background wash behind the copy on mobile.
              The image is absolutely positioned on desktop too: as an in-flow
              <img> its natural 3:2 ratio set the grid row height (~530px at
              desktop widths) and overrode the band's min-height. */}
          <div className="absolute inset-0 lg:relative lg:inset-auto">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=75"
              alt="Dubai skyline at dusk"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Fades the image into the copy panel: downward on mobile, sideways on desktop */}
            <div className="absolute inset-0 bg-brand-scrim/80 lg:bg-gradient-to-r lg:from-brand-scrim lg:via-brand-scrim/40 lg:to-transparent" />
          </div>
      </div>
    </section>
  );
}
