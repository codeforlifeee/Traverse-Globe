import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Tag, PhoneCall, Clock, CheckCircle } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { companyInfo } from '../../data/companyInfo';
import { useOffers } from '../../hooks/queries';
import ImageWithFallback from './ImageWithFallback';
import ShimmerButton from '../magicui/ShimmerButton';

/**
 * SalesBanner — CMS-driven promotional banner (REVAMP_PLAN §3 #9 & §4.3)
 * Replaces the static VideoHero on the homepage.
 * Features:
 * - Dynamic offer data from Sanity via useOffers() with fallback campaign copy
 * - Promotional discount highlight + coupon code copy
 * - Direct "Connect with an Expert" and "WhatsApp" action buttons
 * - High-conversion responsive visual layout
 */
export default function SalesBanner() {
  const { data: offers = [] } = useOffers(1);
  const activeOffer = offers[0] || null;
  const [copied, setCopied] = useState(false);

  const promoCode = activeOffer?.code || 'TRAVERSE35';
  const discountText = activeOffer?.discount || 'UP TO 35% OFF';
  const promoTitle = activeOffer?.title || 'Mega Holiday Season Sale — UAE & Island Escapes';
  const bgImage = activeOffer?.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80';

  const waText = encodeURIComponent(
    `Hi Traverse Globe! I want to avail the promo code "${promoCode}" (${discountText}) for my upcoming trip.`
  );
  const waUrl = `https://wa.me/${companyInfo.phone.whatsapp}?text=${waText}`;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    // Full-bleed: this is the one promotional band that should read as a break in
    // the page, so it runs edge to edge rather than sitting inside the container.
    <section className="relative overflow-hidden">
      <div>
        <div className="relative overflow-hidden shadow-soft-xl bg-brand-scrim">
          {/* Background image + overlay */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={bgImage}
              alt={promoTitle}
              className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-700 hover:scale-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-scrim/95 via-brand-scrim/80 to-brand-scrim/40" />
            <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />
          </div>

          {/* Banner content */}
          <div className="relative z-10 container-custom section-y grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headlines & Campaign Details */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-brand-orange text-white text-xs font-poppins font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-glow-orange">
                  <Sparkles className="w-3.5 h-3.5" />
                  Limited Time Offer
                </span>
                <span className="inline-flex items-center gap-1 text-white/80 text-xs font-poppins">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  Valid for bookings this month
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-season text-white leading-tight mb-3">
                {promoTitle}
              </h3>

              <p className="text-white/85 font-canva-sans text-sm md:text-base max-w-2xl mb-6">
                Book handpicked itineraries to Dubai, Bali, Thailand, or Kashmir with all-inclusive transparent pricing, 4-star+ rated hotels, and dedicated 24/7 on-ground concierge.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <ShimmerButton
                  as="a"
                  href={`tel:${companyInfo.phone.primary}`}
                  borderRadius="0.75rem"
                  className="px-6 py-3.5 text-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  Claim Deal via Call
                </ShimmerButton>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-3.5 rounded-xl font-poppins font-medium text-sm shadow-soft-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp Concierge
                </a>

                <a
                  href="/packages"
                  className="inline-flex items-center gap-1 text-white/90 hover:text-brand-orange font-poppins text-sm font-semibold transition-colors px-2 py-2"
                >
                  View All Packages <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Promo Code Card */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
              <div className="w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 text-center text-white shadow-soft-xl">
                <span className="text-xs font-poppins font-medium uppercase tracking-widest text-brand-orange block mb-1">
                  Flash Discount
                </span>
                <div className="text-3xl md:text-4xl font-poppins font-black text-white tracking-tight mb-3">
                  {discountText}
                </div>

                <p className="text-xs text-white/70 font-canva-sans mb-3">
                  Apply coupon code at booking:
                </p>

                <button
                  onClick={handleCopyCode}
                  className="w-full flex items-center justify-center gap-2 bg-white text-brand-ink hover:bg-brand-canvas py-2.5 px-4 rounded-xl font-mono text-sm font-bold border-2 border-dashed border-brand-orange transition-colors"
                  title="Click to copy code"
                >
                  <Tag className="w-4 h-4 text-brand-orange" />
                  <span>{promoCode}</span>
                  {copied ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-poppins">
                      <CheckCircle className="w-3.5 h-3.5" /> Copied!
                    </span>
                  ) : (
                    <span className="text-[11px] text-brand-muted-ink font-poppins uppercase">
                      (Tap to copy)
                    </span>
                  )}
                </button>

                <p className="text-[11px] text-white/50 font-canva-sans mt-3">
                  *Applicable on customized family & couple packages
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
