import { CheckCircle2, Phone, ShieldCheck, Clock, Award } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import Kicker from './revamp/Kicker';
import SectionRule from './revamp/SectionRule';

/**
 * WhyChooseUs — REVAMP_PLAN §3 #8, #14, #15 & §4.4
 * - Left column: 5-10 crisp lines of Dubai focus copy + guarantees + orange Call CTA
 * - Right column: Engaging Scuba / Adventure video player with poster fallback
 */
export default function WhyChooseUs() {
  return (
    <section className="section-y bg-brand-canvas/40 backdrop-blur-[2px]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Dubai copy + Guarantees + Call CTA (7/12) */}
          <div className="lg:col-span-7">
            <Kicker tone="orange" size="sm" className="mb-2">
              The Traverse Globe Promise
            </Kicker>
            <SectionRule className="mb-4" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-poppins font-bold text-brand-ink mb-4 leading-tight">
              Why Travel With {companyInfo.name}?
            </h2>

            {/* Refined 5–10 crisp lines of high-impact copy */}
            <p className="text-brand-ink/80 leading-relaxed text-sm md:text-base font-canva-sans mb-3">
              At {companyInfo.name}, we specialize in authentic, tailor-made Dubai &amp; global travel experiences. From private desert safaris across golden dunes to luxury marina yacht cruises and all-inclusive family theme park escapes, our local ground presence ensures true insider rates with zero hidden charges.
            </p>
            <p className="text-brand-ink/80 leading-relaxed text-sm md:text-base font-canva-sans mb-6">
              Every itinerary is customized to your pace with handpicked 4-star+ hotels, transparent pricing, and 24/7 dedicated on-ground concierge support throughout your journey.
            </p>

            {/* Guarantee Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="flex items-center gap-2.5 bg-surface px-4 py-3 rounded-xl border border-brand-hairline shadow-soft-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-brand-ink font-poppins">
                  Best Price Guarantee
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-surface px-4 py-3 rounded-xl border border-brand-hairline shadow-soft-sm">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-brand-ink font-poppins">
                  24/7 On-Ground Care
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-surface px-4 py-3 rounded-xl border border-brand-hairline shadow-soft-sm">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-brand-ink font-poppins">
                  Verified Local Guides
                </span>
              </div>
            </div>

            {/* Direct Call CTA Button */}
            <div>
              <a
                href={`tel:${companyInfo.phone.primary}`}
                className="inline-flex items-center gap-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white px-7 py-3.5 rounded-xl font-poppins font-semibold text-sm md:text-base shadow-glow-orange transition-all duration-200 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Call an Expert Now
              </a>
            </div>
          </div>

          {/* Right Column: Adventure & Scuba Diving Video Player (5/12) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-scrim shadow-soft-xl border border-brand-hairline group">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-scuba-diver-swimming-among-fishes-4171-large.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Gradient scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-scrim/90 via-brand-scrim/30 to-transparent flex items-end p-6">
                <div>
                  <span className="text-brand-orange text-xs font-poppins font-bold uppercase tracking-wider">
                    Unmatched Adventures
                  </span>
                  <h4 className="text-white font-poppins font-bold text-lg md:text-xl mt-1 leading-snug">
                    Deep Sea Scuba &amp; Desert Excursions
                  </h4>
                  <p className="text-white/80 font-canva-sans text-xs mt-1">
                    Authentic experiences arranged directly by Traverse Globe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
