import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, CalendarDays, Check, CheckCircle2, ChevronDown, Loader2, Users, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { companyInfo } from '../data/companyInfo';
import { cn } from '@/lib/utils';
import ShimmerButton from './magicui/ShimmerButton';

/**
 * HeroSearchBar — the horizontal lead bar across the bottom of the hero.
 *
 * Replaces the old right-hand HeroLeadForm card. That card was hidden below md,
 * so mobile — the majority of this audience — saw no form at all. A single
 * horizontal bar collapses to a stacked sheet on small screens instead.
 *
 * Budget leads the field order rather than destination: Dubai is the destination
 * we sell, and budget is the question that actually qualifies a mid-tier family lead.
 */

const BUDGETS = [
  'Under ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,00,000',
  '₹2,00,000 – ₹3,00,000',
  '₹3,00,000+',
];

const MONTHS = [
  'This month', 'Next month',
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
  'Flexible / Not sure',
];

const TRAVELERS = ['1–2 People', '3–5 People', '6–10 People', '10+ People'];

/**
 * One segment of the bar.
 *
 * A custom listbox rather than a native <select>. The bar is translucent over the
 * hero image, and a transparent native select makes Chrome paint its dropdown
 * white — near-white option text on white in dark mode, blue-on-grey in light.
 *
 * Two things the first version got wrong, both fixed here:
 *  - The panel was absolutely positioned inside the bar, so it extended the
 *    page's scrollable area and spawned scrollbars on a short viewport. It is
 *    now portalled to <body> with `position: fixed`, measured off the trigger,
 *    and flips above the bar when there is no room below. Nothing it does can
 *    change page layout.
 *  - It only opened on click. On a fine pointer it now opens on hover, with a
 *    short close delay so travelling from the trigger into the list never
 *    dismisses it. Touch and keyboard still open on activation.
 *
 * Keyboard behaviour mirrors the native control: Up/Down move, Enter/Space
 * commit, Escape closes, Home/End jump, and focus returns to the trigger.
 */
function Field({ icon: Icon, label, value, onChange, options, placeholder, isFirst, isLast }) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [panelStyle, setPanelStyle] = useState(null);
  const wrapRef = useRef(null);
  const listRef = useRef(null);
  const triggerRef = useRef(null);
  const closeTimer = useRef(0);
  const listId = useId();

  const choices = [{ value: '', label: placeholder }, ...options.map((o) => ({ value: o, label: o }))];
  const selectedIdx = Math.max(0, choices.findIndex((c) => c.value === value));

  /** Measure against the viewport, and flip up when the panel would not fit below. */
  const position = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const r = trigger.getBoundingClientRect();
    const panelHeight = Math.min(288, choices.length * 40 + 16);
    const spaceBelow = window.innerHeight - r.bottom;
    const openUp = spaceBelow < panelHeight + 16 && r.top > spaceBelow;
    setPanelStyle({
      position: 'fixed',
      left: Math.round(r.left),
      width: Math.round(r.width),
      maxHeight: panelHeight,
      ...(openUp
        ? { bottom: Math.round(window.innerHeight - r.top + 8) }
        : { top: Math.round(r.bottom + 8) }),
    });
  }, [choices.length]);

  const cancelClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = 0;
  };

  const openNow = () => {
    cancelClose();
    position();
    setOpen(true);
  };

  const closeSoon = (delay = 180) => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), delay);
  };

  const close = ({ refocus = false } = {}) => {
    cancelClose();
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  // Hover-to-open, but only where hovering is a real gesture. On touch a
  // "hover" is the first half of a tap and would open the wrong field.
  const hoverEnabled = typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Dismiss on an outside press, and keep the panel pinned to the trigger while
  // the page scrolls or resizes under it.
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (wrapRef.current?.contains(e.target)) return;
      if (listRef.current?.contains(e.target)) return;
      close();
    };
    const onReflow = () => position();
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('scroll', onReflow, true);
    window.addEventListener('resize', onReflow);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onReflow, true);
      window.removeEventListener('resize', onReflow);
    };
  }, [open, position]);

  useEffect(() => cancelClose, []);

  // Opening lands the cursor on the current value, as a native select does.
  useEffect(() => {
    if (open) setActiveIdx(selectedIdx);
  }, [open, selectedIdx]);

  const commit = (choice) => {
    onChange({ target: { value: choice.value } });
    close({ refocus: true });
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close({ refocus: true });
      return;
    }
    if (e.key === 'Tab') {
      close();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { openNow(); return; }
      setActiveIdx((i) => {
        const next = e.key === 'ArrowDown' ? i + 1 : i - 1;
        return Math.min(choices.length - 1, Math.max(0, next));
      });
      return;
    }
    if (e.key === 'Home') { e.preventDefault(); setActiveIdx(0); return; }
    if (e.key === 'End') { e.preventDefault(); setActiveIdx(choices.length - 1); return; }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) { openNow(); return; }
      if (activeIdx >= 0) commit(choices[activeIdx]);
    }
  };

  const panel = open && panelStyle ? createPortal(
    <ul
      ref={listRef}
      id={listId}
      role="listbox"
      tabIndex={-1}
      aria-label={label}
      aria-activedescendant={activeIdx >= 0 ? `${listId}-${activeIdx}` : undefined}
      onMouseEnter={cancelClose}
      onMouseLeave={() => hoverEnabled && closeSoon()}
      style={panelStyle}
      className="z-[60] overflow-y-auto select-none rounded-2xl border border-brand-hairline bg-surface p-1.5 shadow-soft-xl focus:outline-none scrollbar-thin"
    >
      {choices.map((c, i) => {
        const isSelected = c.value === value;
        const isActive = i === activeIdx;
        return (
          <li
            key={c.value || 'placeholder'}
            id={`${listId}-${i}`}
            role="option"
            aria-selected={isSelected}
            onMouseEnter={() => setActiveIdx(i)}
            onClick={() => commit(c)}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 font-poppins text-sm transition-colors',
              isActive ? 'bg-brand-orange/10 text-brand-ink' : 'text-brand-ink',
              !c.value && 'text-brand-muted-ink'
            )}
          >
            <span className="flex-1 truncate">{c.label}</span>
            {isSelected && c.value && <Check className="w-4 h-4 shrink-0 text-brand-orange" />}
          </li>
        );
      })}
    </ul>,
    document.body
  ) : null;

  return (
    <div
      ref={wrapRef}
      className="relative flex-1 min-w-0"
      onMouseEnter={() => hoverEnabled && openNow()}
      onMouseLeave={() => hoverEnabled && closeSoon()}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : openNow())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        className={cn(
          'group/field w-full flex items-center gap-3 px-4 py-3 md:py-2.5 text-left select-none transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-orange',
          // Match the bar's pill ends so the hover tint never pokes out of it.
          isFirst && 'rounded-2xl md:rounded-l-full md:rounded-r-none',
          isLast && 'rounded-2xl md:rounded-r-full md:rounded-l-none',
          !isFirst && !isLast && 'rounded-2xl md:rounded-none',
          open ? 'bg-brand-orange/[0.07]' : 'hover:bg-brand-canvas/70'
        )}
      >
        <span
          className={cn(
            'inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-xl transition-colors',
            open ? 'bg-brand-orange text-white' : 'bg-brand-orange/10 text-brand-orange'
          )}
        >
          <Icon className="w-4 h-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              'block text-[10px] font-poppins font-semibold uppercase tracking-widest transition-colors',
              open ? 'text-brand-orange' : 'text-brand-muted-ink'
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              'block truncate font-poppins text-sm',
              value ? 'text-brand-ink font-medium' : 'text-brand-muted-ink'
            )}
          >
            {value || placeholder}
          </span>
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 shrink-0 transition-transform duration-200',
            open ? 'rotate-180 text-brand-orange' : 'text-brand-muted-ink group-hover/field:text-brand-orange'
          )}
        />
      </button>

      {panel}
    </div>
  );
}

export default function HeroSearchBar() {
  const [form, setForm] = useState({ budget: '', month: '', travelers: '', name: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle | expanded | loading | success
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const waBase = `https://wa.me/${String(companyInfo.phone.whatsapp).replace(/\D/g, '')}`;
  const waText = encodeURIComponent(
    [
      'Hi Traverse Globe! I would like a Dubai itinerary.',
      form.name && `Name: ${form.name}`,
      `Budget: ${form.budget || 'Not sure yet'}`,
      `Month: ${form.month || 'Flexible'}`,
      `Travellers: ${form.travelers || 'Not specified'}`,
    ].filter(Boolean).join('\n')
  );

  const phoneValid = /^[0-9]{10}$/.test(form.phone.replace(/\D/g, '').slice(-10));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // The first press only reveals the name/phone row — we ask for contact details
    // once the visitor has already told us something about the trip.
    if (status === 'idle') {
      setStatus('expanded');
      return;
    }
    if (!form.name.trim() || !phoneValid) return;

    setStatus('loading');
    try {
      const sheetUrl = import.meta.env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
      await fetch(sheetUrl || '/api/lead-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString(), source: 'hero-search-bar' }),
        mode: sheetUrl ? 'no-cors' : 'cors',
      }).catch(() => null);
    } finally {
      // The WhatsApp hand-off is the real conversion, so never block on the webhook.
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl md:rounded-full bg-surface shadow-soft-xl p-5 md:px-7 md:py-4 flex flex-col md:flex-row md:items-center gap-4"
      >
        <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <div className="flex-1 min-w-0">
          <p className="font-poppins font-bold text-brand-ink">Got it — we will call you within 24 hours.</p>
          <p className="text-sm font-canva-sans text-brand-muted-ink">
            Want your Dubai itinerary right now? Message us on WhatsApp.
          </p>
        </div>
        <a
          href={`${waBase}?text=${waText}`}
          target="_blank"
          rel="noreferrer noopener"
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-poppins font-semibold text-sm px-6 py-3 rounded-full transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4" />
          Open WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* The bar itself */}
      <div
        className={cn(
          // No overflow-hidden: each field's dropdown is portalled to <body>, but
          // the hover tints on the end segments still need the pill's own radius.
          'bg-surface shadow-soft-xl ring-1 ring-brand-hairline/70',
          'flex flex-col md:flex-row md:items-stretch',
          'rounded-2xl md:rounded-full',
          'divide-y md:divide-y-0 md:divide-x divide-brand-hairline',
          'p-1.5 md:p-1.5'
        )}
      >
        <Field
          isFirst
          icon={Wallet}
          label="Budget per person"
          value={form.budget}
          onChange={set('budget')}
          options={BUDGETS}
          placeholder="Choose a budget"
        />
        <Field
          icon={CalendarDays}
          label="When"
          value={form.month}
          onChange={set('month')}
          options={MONTHS}
          placeholder="Travel month"
        />
        <Field
          icon={Users}
          label="Who is going"
          value={form.travelers}
          onChange={set('travelers')}
          options={TRAVELERS}
          placeholder="Number of travellers"
        />

        <div className="flex items-center p-1.5 md:p-0 md:pl-2">
          {/* The hero's highest-value CTA, so it carries the shimmer sweep. */}
          <ShimmerButton
            type="submit"
            disabled={status === 'loading'}
            borderRadius="9999px"
            shimmerDuration="2.4s"
            className="group/cta w-full md:w-auto px-7 py-3.5 md:py-3 text-sm disabled:opacity-60 whitespace-nowrap"
          >
            {status === 'loading'
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
              : <>Plan my Dubai trip <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5" /></>}
          </ShimmerButton>
        </div>
      </div>

      {/* Second step — name + phone, revealed once the trip details are picked */}
      {(status === 'expanded' || status === 'loading') && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="overflow-hidden"
        >
          <div className="mt-3 flex flex-col sm:flex-row gap-2 rounded-2xl md:rounded-full bg-surface shadow-soft-lg p-2">
            <input
              type="text"
              required
              value={form.name}
              onChange={set('name')}
              placeholder="Your name"
              className="flex-1 min-w-0 px-4 py-3 rounded-xl md:rounded-full bg-brand-canvas text-brand-ink text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-brand-orange placeholder:text-brand-muted-ink"
            />
            <input
              type="tel"
              required
              value={form.phone}
              onChange={set('phone')}
              placeholder="WhatsApp number"
              className="flex-1 min-w-0 px-4 py-3 rounded-xl md:rounded-full bg-brand-canvas text-brand-ink text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-brand-orange placeholder:text-brand-muted-ink"
            />
            <button
              type="submit"
              disabled={status === 'loading' || !form.name.trim() || !phoneValid}
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-poppins font-semibold text-sm px-6 py-3 rounded-xl md:rounded-full transition-colors"
            >
              {status === 'loading'
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                : 'Send'}
            </button>
          </div>
        </motion.div>
      )}
    </form>
  );
}
