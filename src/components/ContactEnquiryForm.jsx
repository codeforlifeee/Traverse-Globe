import { useState } from 'react';
import { CheckCircle2, Loader2, Phone } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { companyInfo } from '../data/companyInfo';
import { cn } from '@/lib/utils';

/**
 * ContactEnquiryForm — the inline form on /contact.
 *
 * Deliberately not a modal: /contact is the page people land on when they have
 * already decided to get in touch, so the form should be in front of them rather
 * than one click behind a button. BookingModal stays for in-context enquiries
 * raised from a specific package card.
 */

const BUDGETS = [
  'Under ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,00,000',
  '₹2,00,000 – ₹3,00,000',
  '₹3,00,000+',
];

const TRAVELERS = ['1–2 People', '3–5 People', '6–10 People', '10+ People'];

export default function ContactEnquiryForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', budget: '', travelers: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [touched, setTouched] = useState({});

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const blur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const nameValid = form.name.trim().length >= 2;
  const phoneValid = /^[0-9]{10}$/.test(form.phone.replace(/\D/g, '').slice(-10));
  const valid = nameValid && phoneValid;

  const waBase = `https://wa.me/${String(companyInfo.phone.whatsapp).replace(/\D/g, '')}`;
  const waText = encodeURIComponent(
    [
      'Hi Traverse Globe! I would like to plan a trip.',
      form.name && `Name: ${form.name}`,
      form.budget && `Budget: ${form.budget}`,
      form.travelers && `Travellers: ${form.travelers}`,
      form.message && `Notes: ${form.message}`,
    ].filter(Boolean).join('\n')
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (!valid) return;

    setStatus('loading');
    try {
      const sheetUrl = import.meta.env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
      await fetch(sheetUrl || '/api/lead-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString(), source: 'contact-page-form' }),
        mode: sheetUrl ? 'no-cors' : 'cors',
      }).catch(() => null);
    } finally {
      // WhatsApp is the real hand-off, so a webhook failure must never block it.
      setStatus('success');
    }
  };

  const fieldClass = (invalid) =>
    cn(
      'w-full px-4 py-3 rounded-xl border bg-brand-canvas text-brand-ink text-sm font-poppins',
      'focus:outline-none focus:ring-2 focus:ring-brand-orange placeholder:text-brand-muted-ink',
      invalid ? 'border-rose-500' : 'border-brand-hairline'
    );

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-poppins font-bold text-brand-ink">Thanks — we've got your details.</h3>
          <p className="mt-1 text-sm font-canva-sans text-brand-muted-ink">
            An expert will call you within 24 hours. For an instant reply, message us on WhatsApp.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <a
            href={`${waBase}?text=${waText}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-poppins font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Chat on WhatsApp
          </a>
          <a
            href={`tel:${companyInfo.phone.primary}`}
            className="inline-flex items-center justify-center gap-2 border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-poppins font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call us
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label htmlFor="ce-name" className="block text-sm font-poppins font-medium text-brand-ink mb-1.5">
          Your name <span className="text-brand-orange">*</span>
        </label>
        <input
          id="ce-name"
          type="text"
          value={form.name}
          onChange={set('name')}
          onBlur={blur('name')}
          aria-invalid={touched.name && !nameValid}
          placeholder="Full name"
          className={fieldClass(touched.name && !nameValid)}
        />
        {touched.name && !nameValid && (
          <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-canva-sans">Please enter your name.</p>
        )}
      </div>

      <div>
        <label htmlFor="ce-phone" className="block text-sm font-poppins font-medium text-brand-ink mb-1.5">
          WhatsApp / Phone <span className="text-brand-orange">*</span>
        </label>
        <input
          id="ce-phone"
          type="tel"
          value={form.phone}
          onChange={set('phone')}
          onBlur={blur('phone')}
          aria-invalid={touched.phone && !phoneValid}
          placeholder="10-digit mobile number"
          className={fieldClass(touched.phone && !phoneValid)}
        />
        {touched.phone && !phoneValid && (
          <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-canva-sans">Enter a 10-digit mobile number.</p>
        )}
      </div>

      <div>
        <label htmlFor="ce-email" className="block text-sm font-poppins font-medium text-brand-ink mb-1.5">Email</label>
        <input
          id="ce-email"
          type="email"
          value={form.email}
          onChange={set('email')}
          placeholder="you@example.com"
          className={fieldClass(false)}
        />
      </div>

      <div>
        <label htmlFor="ce-budget" className="block text-sm font-poppins font-medium text-brand-ink mb-1.5">Budget per person</label>
        <select id="ce-budget" value={form.budget} onChange={set('budget')} className={fieldClass(false)}>
          <option value="">Choose a budget</option>
          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="ce-travelers" className="block text-sm font-poppins font-medium text-brand-ink mb-1.5">Travellers</label>
        <select id="ce-travelers" value={form.travelers} onChange={set('travelers')} className={fieldClass(false)}>
          <option value="">How many of you?</option>
          {TRAVELERS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="ce-message" className="block text-sm font-poppins font-medium text-brand-ink mb-1.5">
          Where do you want to go?
        </label>
        <textarea
          id="ce-message"
          rows={3}
          value={form.message}
          onChange={set('message')}
          placeholder="Dubai in December, 2 adults + 1 child, 5 nights…"
          className={cn(fieldClass(false), 'resize-y')}
        />
      </div>

      <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white font-poppins font-semibold text-sm py-3.5 rounded-xl shadow-glow-orange transition-all duration-200 hover:-translate-y-0.5"
        >
          {status === 'loading'
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
            : 'Request a callback'}
        </button>
        <a
          href={`${waBase}?text=${waText}`}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-poppins font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4" />
          WhatsApp instead
        </a>
      </div>
    </form>
  );
}
