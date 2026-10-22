import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Plane, ShieldCheck, Wallet } from 'lucide-react';
import Kicker from './Kicker';
import SectionRule from './SectionRule';
import { cn } from '@/lib/utils';

/**
 * A short Dubai primer, sitting directly above the package carousel.
 *
 * Deliberately tight: it orients a first-time traveller in a few seconds and
 * answers the questions that otherwise become the first WhatsApp message, without
 * pushing the packages themselves below the fold.
 *
 * The right-hand column carries the interactive 3D globe with a flight badge for
 * the India → UAE corridor, which is the one route this business actually sells.
 * The copy block enters on a staggered spring fade-up (tg-magic-animations §2).
 */

// The canvas is WebGL and three.js rides with it, so it is split out and the copy
// paints first. The Suspense placeholder reserves the same square the canvas
// fills, so the swap cannot shift the section. Changing `activeRoute` makes the
// globe slerp that corridor to face the viewer and relaunch the aircraft on it.
const Globe = lazy(() => import('@/components/magicui/Globe'));

/**
 * True once `ref` comes within `rootMargin` of the viewport and the main thread is
 * idle. Gates the globe: three.js plus its textures is the heaviest thing on the
 * homepage, and without this it downloaded on every visit, scrolled to or not.
 */
function useNearViewportIdle(ref, rootMargin = '150px') {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || ready) return undefined;

    let idleId = 0;
    let timeoutId = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      } else {
        timeoutId = window.setTimeout(() => setReady(true), 200);
      }
    }, { rootMargin });
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [ref, rootMargin, ready]);

  return ready;
}

const GLOBE_PLACEHOLDER = (
  <div
    className="mx-auto aspect-square w-full max-w-[370px] animate-pulse rounded-full border border-brand-hairline bg-teal/5 ring-1 ring-inset ring-teal/10"
    aria-hidden="true"
  />
);

const FACTS = [
  { icon: CalendarDays, label: 'Best months', value: 'Nov – Mar' },
  { icon: Plane, label: 'Flight time', value: '3–4 hrs from Delhi' },
  { icon: Wallet, label: 'Typical budget', value: '₹55k – ₹1.2L pp' },
  { icon: ShieldCheck, label: 'Visa', value: '3–5 working days' },
];

const SPRING = { type: 'spring', stiffness: 300, damping: 25, mass: 0.8 };

export default function DubaiIntro() {
  const reduceMotion = useReducedMotion();
  const globeSlotRef = useRef(null);
  const showGlobe = useNearViewportIdle(globeSlotRef);

  // Transform is dropped entirely under reduced motion — a plain fade still
  // sequences the block without anything travelling across the screen.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0.04 : 0.09, delayChildren: 0.08 } },
  };
  const item = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: SPRING } };

  return (
    <section className="pt-9 md:pt-12 lg:pt-14 pb-2 bg-transparent">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ── Copy + facts: staggered spring fade-up ── */}
        <motion.div
          className="lg:col-span-7"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={item}>
            <Kicker className="mb-3 block">Why Dubai, and why now</Kicker>
          </motion.div>

          <motion.div variants={item}>
            <SectionRule className="mb-4" />
          </motion.div>

          <motion.h2
            variants={item}
            className="font-poppins font-bold text-h2 text-brand-ink leading-tight"
          >
            A first international trip that actually works for a family
          </motion.h2>

          <div className="mt-4 space-y-2.5 text-brand-muted-ink font-canva-sans text-sm md:text-base leading-relaxed">
            <motion.p variants={item}>
              Three to four hours from most Indian metros, so a four-night trip is
              actually worth taking — and November to March sits at a comfortable
              24–30°C for the desert, the beaches and the parks alike.
            </motion.p>
            <motion.p variants={item}>
              Vegetarian and Jain food is everywhere, Hindi is widely spoken, and we
              file your visa as part of the package rather than as an add-on.
            </motion.p>
            <motion.p variants={item}>
              Budget ₹55,000 to ₹1.2 lakh per person for four or five nights including
              flights, a four-star stay, transfers and the headline attractions —
              quoted in full, up front, with nothing added later.
            </motion.p>
          </div>

          <motion.dl variants={item} className="mt-5 grid grid-cols-2 gap-2.5 md:gap-3">
            {FACTS.map(({ icon: Icon, label, value }) => (
              // Icon beside the text rather than stacked above it — same information
              // in roughly half the height, so the facts don't dominate the column.
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-brand-hairline bg-surface px-3.5 py-3"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10">
                  <Icon className="h-[18px] w-[18px] text-brand-orange" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[10px] font-poppins font-semibold uppercase tracking-widest text-brand-muted-ink">
                    {label}
                  </dt>
                  <dd className="mt-0.5 font-poppins font-bold text-sm md:text-[15px] text-brand-ink leading-snug">{value}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Globe + interactive flight badge ── */}
        <motion.div
          className="lg:col-span-5"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ...SPRING, stiffness: 220 }}
        >
          <div className="relative mx-auto w-full max-w-[420px] flex flex-col items-center">
            {/* The 3D globe */}
            <div ref={globeSlotRef} className="relative w-full">
              {showGlobe ? (
                <Suspense fallback={GLOBE_PLACEHOLDER}>
                  <Globe className="mx-auto px-0" activeRoute="dxb" />
                </Suspense>
              ) : (
                GLOBE_PLACEHOLDER
              )}
            </div>

            <p className="mt-3 text-center font-canva-sans text-xs text-brand-muted-ink">
              Drag to explore the globe · scroll or pinch to zoom
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
