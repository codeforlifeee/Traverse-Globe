import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, Star } from 'lucide-react';
import { useBanners } from '../hooks/queries';
import { HERO_WIDTHS } from '@/lib/sanityImage';
import ImageWithFallback from './revamp/ImageWithFallback';
import Kicker from './revamp/Kicker';
import TrustStrip from './revamp/TrustStrip';

/**
 * Hero — REVAMP_PLAN §4.1
 * - Asymmetric 60/40 split on desktop, stacked on mobile
 * - Single background image with Ken Burns motion (no carousel above the fold)
 * - Left: kicker + display headline + subhead + destination search + popular chips
 * - Right: floating highlight card pulled forward to break the grid
 */
// Known at build time so index.html can <link rel=preload> the very same URL.
const HERO_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1920&q=75';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const { data: banners = [] } = useBanners('general');

  // Render the real hero immediately. Gating on the banner fetch would serialize the
  // LCP image request behind JS parse -> mount -> GROQ round-trip; the CMS banner simply
  // swaps in when it arrives.
  const heroImage = banners[0]?.url || banners[0] || HERO_FALLBACK_IMAGE;

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) {
      window.location.href = '/destinations';
      return;
    }
    // Simple keyword → destination match
    const map = ['uae','dubai','bali','thailand','singapore','vietnam','srilanka','sri lanka','laos','kerala','kashmir','jaipur','andaman','chardham'];
    const hit = map.find((k) => q.includes(k));
    if (hit) {
      const norm = hit.replace(/\s/g, '').replace('srilanka','srilanka').replace('dubai','uae');
      const dom = ['kerala','kashmir','jaipur','andaman','chardham'];
      const type = dom.some((d) => norm.startsWith(d)) ? 'domestic' : 'international';
      const cat = norm === 'chardham' ? 'chardhamyatra' : norm;
      window.location.href = `/destinations/${type}/${cat}`;
      return;
    }
    window.location.href = `/destinations?q=${encodeURIComponent(q)}`;
  };

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Background image with Ken Burns */}
        <div className="absolute inset-0">
          <div className="w-full h-full animate-ken-burns">
            <ImageWithFallback
              src={heroImage}
              alt="Traverse Globe hero"
              className="w-full h-full object-cover"
              loading="eager"
              fetchpriority="high"
              sizes="100vw"
              widths={HERO_WIDTHS}
            />
          </div>
          {/* Dark left gradient for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-scrim/85 via-brand-scrim/50 to-transparent" />
          {/* Bottom fade for TrustStrip transition */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-scrim/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container-custom pt-24 pb-12 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT: copy + search — 7/12 */}
            <div className="lg:col-span-7">
              <Kicker tone="orange" size="lg" className="text-white/90 mb-3 md:mb-4">
                Curated family trips · India + UAE
              </Kicker>

              <h1 className="text-display font-poppins text-white mb-4 md:mb-5 max-w-3xl">
                Your genuine, affordable, <span className="text-brand-orange">first-to-go</span> travel partner.
              </h1>

              <p className="text-sm md:text-body-lg text-white/85 font-canva-sans max-w-xl mb-6 md:mb-8">
                Handpicked trips for real families. Fixed prices, no hidden fees, one WhatsApp away — from Karnal to Sharjah.
              </p>

              {/* Search */}
              <form
                onSubmit={onSearch}
                className="bg-surface/95 backdrop-blur-md rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-soft-xl border border-brand-hairline max-w-2xl"
              >
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted-ink w-5 h-5" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Where to? Dubai, Bali, Kerala…"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-transparent text-brand-ink font-poppins font-medium placeholder:text-brand-muted-ink focus:outline-none text-sm md:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-6 py-3.5 rounded-xl font-poppins font-semibold transition-colors shadow-glow-orange"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </form>

              {/* Popular chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-white/80 text-xs md:text-sm font-poppins uppercase tracking-widest mr-1">Popular</span>
                {[
                  { label: 'Dubai', href: '/destinations/international/uae' },
                  { label: 'Bali', href: '/destinations/international/bali' },
                  { label: 'Thailand', href: '/destinations/international/thailand' },
                  { label: 'Kashmir', href: '/destinations/domestic/kashmir' },
                  { label: 'Chardham', href: '/destinations/domestic/chardhamyatra' },
                ].map((chip) => (
                  <a
                    key={chip.label}
                    href={chip.href}
                    className="px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/25 rounded-full text-xs font-poppins font-medium text-white backdrop-blur transition-colors"
                  >
                    {chip.label}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT: highlight card — 5/12, hidden on small */}
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, y: -6 }}
              className="hidden md:block lg:col-span-5"
            >
              <div className="relative max-w-md ml-auto bg-surface rounded-2xl shadow-soft-xl border border-white/60 overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
                    alt="Featured trip"
                    className="w-full h-full object-cover"
                    loading="eager"
                    sizes="(min-width: 1024px) 28rem, 40vw"
                  />
                  <div className="absolute top-3 left-3 bg-brand-orange text-white text-[11px] font-poppins font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                    Featured
                  </div>
                  <div className="absolute top-3 right-3 bg-brand-trust text-white text-xs font-poppins font-semibold px-2.5 py-1 rounded-md">
                    Save 20%
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-kicker uppercase text-brand-muted-ink font-poppins">Family · Bali</span>
                  <h3 className="text-lg font-poppins font-semibold text-brand-ink mt-2 leading-snug">
                    Bali Wellness Retreat for Families
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-brand-muted-ink font-canva-sans">
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      4.7 (128)
                    </span>
                    <span>·</span>
                    <span>7 nights</span>
                  </div>
                  <div className="mt-4 flex items-end justify-between pt-4 border-t border-brand-hairline">
                    <div>
                      <span className="text-xs text-brand-muted-ink line-through font-canva-sans block">₹35,000</span>
                      <span className="text-2xl font-poppins font-bold text-brand-ink leading-none">₹28,000</span>
                    </div>
                    <a
                      href="/destinations/international/bali"
                      className="inline-flex items-center gap-1 text-sm font-poppins font-semibold text-brand-orange hover:gap-2 transition-all"
                    >
                      Explore <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust strip immediately below hero */}
      <TrustStrip variant="ink" />
    </>
  );
};

export default HeroSection;
