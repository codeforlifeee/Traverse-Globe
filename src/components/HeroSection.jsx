import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle } from 'lucide-react';
import { useBanners } from '../hooks/queries';
import { HERO_WIDTHS } from '@/lib/sanityImage';
import ImageWithFallback from './revamp/ImageWithFallback';
import Kicker from './revamp/Kicker';
import HeroLeadForm from './HeroLeadForm';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { companyInfo } from '../data/companyInfo';

/**
 * Hero — REVAMP_PLAN §4.1 (CRO Update)
 * - Left: kicker + headline + subhead + dual CTA buttons (Call + WhatsApp)
 * - Right: Lead Capture Form connected to Google Sheets via /api/lead-webhook
 * - Background: Dubai skyline twilight image (brand-relevant)
 * - TrustStrip removed — relocated to Home.jsx below package cards
 */

// Keep in sync with <link rel=preload> in index.html
const HERO_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80';

const HeroSection = () => {
  const { data: banners = [] } = useBanners('general');

  // Render immediately — CMS banner swaps in when it arrives without blocking LCP.
  const heroImage = banners[0]?.url || banners[0] || HERO_FALLBACK_IMAGE;

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
            src={heroImage}
            alt="Dubai skyline — Traverse Globe"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT: copy + CTAs — 7/12 */}
          <div className="lg:col-span-7">
            <Kicker tone="orange" size="lg" className="text-white/90 mb-3 md:mb-4">
              Curated family trips · India + UAE
            </Kicker>

            <h1 className="text-display font-poppins text-white mb-4 md:mb-5 max-w-3xl">
              Your genuine, affordable,{' '}
              <span className="text-brand-orange">first-to-go</span> travel partner.
            </h1>

            <p className="text-sm md:text-body-lg text-white/85 font-canva-sans max-w-xl mb-7 md:mb-9">
              Handpicked trips for real families. Fixed prices, no hidden fees, one WhatsApp away — from Karnal to Sharjah.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <a
                href={`tel:${companyInfo.phone.primary}`}
                className="inline-flex items-center justify-center gap-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white px-7 py-4 rounded-2xl font-poppins font-semibold text-sm md:text-base shadow-glow-orange transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <PhoneCall className="w-5 h-5" />
                Connect with an Expert
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-6 py-4 rounded-2xl font-poppins font-medium text-sm md:text-base backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust micro-copy */}
            <p className="mt-5 text-white/60 text-xs font-canva-sans">
              10,000+ families served since 2018 · 4.8★ across Google &amp; WhatsApp
            </p>
          </div>

          {/* RIGHT: Lead Capture Form — 5/12, hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block lg:col-span-5"
          >
            <HeroLeadForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
