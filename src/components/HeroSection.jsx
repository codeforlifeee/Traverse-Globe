import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { renderingPrerender } from '@/lib/hydration';
import { REVEAL_VIEWPORT, riseItem, staggerParent } from '@/lib/motionVariants';
import { PhoneCall, Star } from 'lucide-react';
import { HERO_WIDTHS } from '@/lib/sanityImage';
import ImageWithFallback from './revamp/ImageWithFallback';
import Kicker from './revamp/Kicker';
import HeroSearchBar from './HeroSearchBar';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { companyInfo } from '../data/companyInfo';
import ShimmerButton from './magicui/ShimmerButton';
import NumberTicker from './magicui/NumberTicker';

/**
 * Hero — REVAMP_PLAN §4.1 (CRO Update)
 * - Copy block: kicker + headline + subhead + dual CTA buttons (Call + WhatsApp) + stats
 * - Below it: HeroSearchBar, a full-width horizontal lead bar (replaces the old
 *   right-hand card, which was hidden below md and so missed most of the traffic)
 * - Background: Dubai skyline twilight image (brand-relevant)
 * - TrustStrip removed — relocated to Home.jsx below package cards
 */

// The hero is the LCP element, so its image is fixed rather than CMS-driven. It used
// to render a skyline and then swap to the 'general' banner once Sanity answered: a
// visible flicker, a second full-width download, and LCP pushed out to the swap.
// The diver shot was that banner's first image, so it is now the hero from first paint.
//
// Keep in sync with <link rel=preload imagesrcset> in index.html. That preload must
// list exactly the URLs buildSrcSet(HERO_IMAGE, { widths: HERO_WIDTHS }) produces,
// or the browser downloads the preload and then the real image as well.
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80';

const HeroSection = () => {
  // When the hero arrived as pre-rendered HTML it is already on screen, so replaying
  // the entrance would blank it out and fade it back in. Start in the final state.
  // Captured at mount: a later client-side visit to "/" still gets the entrance.
  const [skipIntro] = useState(renderingPrerender);
  const intro = skipIntro ? false : 'hidden';
  // With the entrance skipped nothing animates, so use the variants the build
  // rendered with (the server has no motion preference); otherwise the reduced-motion
  // variant's missing `transform` would not match the pre-rendered style attribute.
  const reduceMotion = useReducedMotion() && !skipIntro;
  const parent = staggerParent(reduceMotion);
  const item = riseItem(reduceMotion);

  const waText = encodeURIComponent(
    "Hi Traverse Globe! I'd like to plan a trip. Can you help me?"
  );
  const waUrl = `https://wa.me/${companyInfo.phone.whatsapp}?text=${waText}`;

  return (
    <section className="relative overflow-hidden">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0">
        <div className="w-full h-full animate-ken-burns">
          <ImageWithFallback
            src={HERO_IMAGE}
            alt="Scuba diver beside a school of yellow fish on a coral reef — Traverse Globe"
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
            sizes="100vw"
            widths={HERO_WIDTHS}
          />
        </div>
        {/* Dark left gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-scrim/90 via-brand-scrim/55 to-brand-scrim/20" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-scrim/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container-custom pt-24 pb-12 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-4xl">
          {/* The hero reveals as one sequence rather than appearing all at once:
              kicker, headline, promise, CTAs, then the proof. */}
          <motion.div variants={parent} initial={intro} animate="show">
            <motion.div variants={item}>
              <Kicker tone="orange" size="lg" className="text-white/90 mb-3 md:mb-4">
                Curated family trips · India + UAE
              </Kicker>
            </motion.div>

            {/* Not animated: the headline is the mobile LCP element, and a fade-in
                from opacity 0 delays LCP until the animation starts. The lines
                around it still rise in, so the sequence reads the same. */}
            <h1 className="text-display font-poppins text-white mb-4 md:mb-5 max-w-3xl min-h-[96px] sm:min-h-[72px] md:min-h-0">
              Your genuine, affordable,{' '}
              <span className="text-brand-orange">first-to-go</span> travel partner.
            </h1>

            <motion.p variants={item} className="text-sm md:text-body-lg text-white/85 font-canva-sans max-w-xl mb-7 md:mb-9">
              Handpicked trips for real families. Fixed prices, no hidden fees, one WhatsApp away — from Karnal to Sharjah.
            </motion.p>

            {/* Dual CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3 md:gap-4">
              <ShimmerButton
                as="a"
                href={`tel:${companyInfo.phone.primary}`}
                shimmerColor="#ffffff"
                shimmerDuration="2.2s"
                className="px-7 py-4 rounded-2xl text-sm md:text-base"
              >
                <PhoneCall className="w-5 h-5 mr-1" />
                Connect with an Expert
              </ShimmerButton>

              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-6 py-4 rounded-2xl font-poppins font-medium text-sm md:text-base backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Trust proof — the numbers carry the claim.
                Grouped into one glass strip with hairline dividers so the three
                figures read as a single credential rather than three loose bits
                of text floating on the photograph.

                The two quantities count up; the founding year does not. A year
                is a number but not a quantity — animating it made the hero look
                like a scoreboard, and thousands-separating it printed the
                nonsense "Since 2,018". */}
            <motion.dl
              variants={item}
              className="mt-8 inline-flex flex-wrap items-stretch gap-y-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md divide-x divide-white/20"
            >
              <div className="px-5 first:pl-0 last:pr-0">
                <dt className="sr-only">families served</dt>
                <dd>
                  <span className="block font-poppins font-bold text-2xl md:text-3xl text-white leading-none">
                    <NumberTicker value={10000} suffix="+" delay={0.5} animate={!skipIntro} />
                  </span>
                  <span className="mt-1.5 block text-[11px] font-poppins uppercase tracking-widest text-white/65">
                    families served
                  </span>
                </dd>
              </div>

              <div className="px-5 first:pl-0 last:pr-0">
                <dt className="sr-only">Google and WhatsApp rating</dt>
                <dd>
                  <span className="flex items-baseline gap-1 font-poppins font-bold text-2xl md:text-3xl text-white leading-none">
                    <NumberTicker value={4.8} decimalPlaces={1} delay={0.65} animate={!skipIntro} />
                    <Star className="w-4 h-4 md:w-5 md:h-5 shrink-0 translate-y-[-1px] fill-brand-orange text-brand-orange" />
                  </span>
                  <span className="mt-1.5 block text-[11px] font-poppins uppercase tracking-widest text-white/65">
                    Google &amp; WhatsApp
                  </span>
                </dd>
              </div>

              <div className="px-5 first:pl-0 last:pr-0">
                <dt className="sr-only">planning trips since</dt>
                <dd>
                  <span className="block font-poppins font-bold text-2xl md:text-3xl text-white leading-none tabular-nums">
                    <span className="text-white/60 text-lg md:text-xl font-semibold">Since </span>2018
                  </span>
                  <span className="mt-1.5 block text-[11px] font-poppins uppercase tracking-widest text-white/65">
                    planning trips
                  </span>
                </dd>
              </div>
            </motion.dl>
          </motion.div>
        </div>

        {/* Horizontal lead bar — the hero's primary conversion surface, on every
            breakpoint. Last in the same sequence, on the shared spring rather
            than the linear tween it used to carry. */}
        <motion.div
          variants={item}
          initial={intro}
          animate="show"
          transition={{ delay: 0.45 }}
          className="mt-10 md:mt-14"
        >
          <HeroSearchBar />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
