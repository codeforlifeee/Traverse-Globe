import { useState } from 'react';
import { CheckCircle2, Loader2, Phone, MessageCircle, User, Calendar, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { companyInfo } from '../data/companyInfo';

const DESTINATIONS = [
  'Dubai / UAE',
  'Bali',
  'Thailand',
  'Singapore',
  'Kashmir',
  'Kerala',
  'Andaman',
  'Jaipur / Rajasthan',
  'Chardham Yatra',
  'Other',
];

const MONTHS = [
  'October 2025', 'November 2025', 'December 2025',
  'January 2026', 'February 2026', 'March 2026',
  'April 2026', 'May 2026', 'June 2026',
  'July 2026', 'August 2026', 'September 2026',
  'Flexible / Not Sure',
];

const TRAVELERS = ['1–2 People', '3–5 People', '6–10 People', '10+ People'];

/**
 * HeroLeadForm — converts hero right-panel into a lead capture card.
 * Submits to /api/lead-webhook (same-origin proxy) or a Google Apps Script URL.
 * Success state shows confirmation + a one-click WhatsApp deep-link.
 */
export default function HeroLeadForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    destination: '',
    month: '',
    travelers: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const waBase = `https://wa.me/${companyInfo.phone.whatsapp}`;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.destination) return;

    setStatus('loading');
    try {
      const body = {
        ...form,
        timestamp: new Date().toISOString(),
        source: 'hero-lead-form',
      };

      const googleSheetUrl = import.meta.env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
      const endpoint = googleSheetUrl || '/api/lead-webhook';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        mode: googleSheetUrl ? 'no-cors' : 'cors',
      }).catch(() => null);

      if (res && !res.ok && res.status !== 404 && res.type !== 'opaque') throw new Error('server');

      setStatus('success');
    } catch {
      // Show success anyway — WhatsApp link ensures zero lead drop.
      setStatus('success');
    }
  };

  const waText = encodeURIComponent(
    `Hi Traverse Globe! I'd like to enquire about a trip.\n` +
    `Name: ${form.name}\n` +
    `Destination: ${form.destination || 'Not specified'}\n` +
    `Month: ${form.month || 'Flexible'}\n` +
    `Travelers: ${form.travelers || 'Not specified'}`
  );

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface rounded-2xl shadow-soft-xl border border-white/60 overflow-hidden p-8 flex flex-col items-center text-center gap-5"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-poppins font-bold text-brand-ink">
            We've got your details!
          </h3>
          <p className="mt-1 text-sm font-canva-sans text-brand-muted-ink max-w-xs">
            Our travel expert will call you within 24 hours. For an instant response, connect on WhatsApp now.
          </p>
        </div>
        <a
          href={`${waBase}?text=${waText}`}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-poppins font-semibold text-sm px-6 py-3 rounded-xl shadow-soft-md transition-colors w-full justify-center"
        >
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp Now
        </a>
        <a
          href={`tel:${companyInfo.phone.primary}`}
          className="inline-flex items-center gap-2 border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-poppins font-semibold text-sm px-6 py-3 rounded-xl transition-colors w-full justify-center"
        >
          <Phone className="w-4 h-4" />
          Call Us Directly
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 1 }}
      transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, y: -4 }}
      className="bg-surface rounded-2xl shadow-soft-xl border border-white/60 overflow-hidden"
    >
      {/* Card header */}
      <div className="bg-brand-orange px-5 py-4">
        <p className="text-[11px] font-poppins font-semibold uppercase tracking-widest text-white/80">
          Free Consultation
        </p>
        <h3 className="text-base md:text-lg font-poppins font-bold text-white leading-snug mt-0.5">
          Get a Custom Quote &amp; Itinerary
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3">
        {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted-ink" />
          <input
            type="text"
            required
            value={form.name}
            onChange={set('name')}
            placeholder="Your name"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-brand-hairline bg-brand-canvas text-brand-ink text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-brand-orange placeholder:text-brand-muted-ink"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted-ink" />
          <input
            type="tel"
            required
            value={form.phone}
            onChange={set('phone')}
            placeholder="WhatsApp / Phone number"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-brand-hairline bg-brand-canvas text-brand-ink text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-brand-orange placeholder:text-brand-muted-ink"
          />
        </div>

        {/* Destination */}
        <select
          required
          value={form.destination}
          onChange={set('destination')}
          className="w-full px-3 py-2.5 rounded-xl border border-brand-hairline bg-brand-canvas text-brand-ink text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-brand-orange"
        >
          <option value="" disabled>Destination of interest</option>
          {DESTINATIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* Month & Travelers in a row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-muted-ink" />
            <select
              value={form.month}
              onChange={set('month')}
              className="w-full pl-8 pr-2 py-2.5 rounded-xl border border-brand-hairline bg-brand-canvas text-brand-ink text-xs font-poppins focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option value="">Travel Month</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-muted-ink" />
            <select
              value={form.travelers}
              onChange={set('travelers')}
              className="w-full pl-8 pr-2 py-2.5 rounded-xl border border-brand-hairline bg-brand-canvas text-brand-ink text-xs font-poppins focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option value="">Travelers</option>
              {TRAVELERS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white font-poppins font-semibold text-sm py-3 rounded-xl shadow-glow-orange transition-all duration-200 hover:-translate-y-0.5 mt-1"
        >
          {status === 'loading' ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
          ) : (
            'Get Custom Quote & Itinerary'
          )}
        </button>

        <p className="text-[11px] text-brand-muted-ink font-canva-sans text-center">
          Free · No spam · Our expert calls within 24 hrs
        </p>
      </form>
    </motion.div>
  );
}
