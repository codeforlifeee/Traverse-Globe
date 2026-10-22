import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Phone,
  Clock,
  Sparkles,
  CheckCircle,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Filter,
} from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { companyInfo } from '../data/companyInfo';
import Kicker from '../components/revamp/Kicker';
import SectionRule from '../components/revamp/SectionRule';
import ImageWithFallback from '../components/revamp/ImageWithFallback';
import { ALL_ACTIVITIES, ACTIVITY_CATEGORIES as CATEGORIES } from '../data/activities';
import { cn } from '@/lib/utils';
import { CARD_MEDIA } from '@/lib/cardMetrics';


export default function Activities() {
  const { category: urlCategory } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'all');

  const filteredActivities = useMemo(() => {
    if (selectedCategory === 'all') return ALL_ACTIVITIES;
    return ALL_ACTIVITIES.filter(
      (a) => a.category === selectedCategory || a.slug === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen pt-28 pb-16 bg-transparent">
      {/* Hero Header */}
      <section className="page-band py-12 md:py-16 border-b border-brand-hairline">
        <div className="container-custom">
          <Kicker tone="orange" size="sm" className="mb-2">
            Signature Excursions &amp; Adventures
          </Kicker>
          <SectionRule className="mb-4" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-brand-ink max-w-3xl leading-tight">
            Curated Activities &amp; Experiences
          </h1>
          <p className="mt-3 text-sm md:text-base text-brand-muted-ink font-canva-sans max-w-2xl leading-relaxed">
            From thrilling desert dune bashing and deep sea scuba diving to serene luxury yacht cruises and VIP theme park access. Every activity is verified for safety, quality, and real value.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-poppins font-semibold transition-[background-color,color,box-shadow] duration-200 ${
                  selectedCategory === cat.key
                    ? 'bg-brand-orange text-white shadow-soft-md shadow-brand-orange/20 scale-105'
                    : 'bg-surface text-brand-ink border border-brand-hairline hover:border-brand-orange/40 hover:text-brand-orange'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="section-y">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-brand-muted-ink font-canva-sans">
              Showing <span className="font-semibold text-brand-ink">{filteredActivities.length}</span> verified activities
            </p>
            <div className="flex items-center gap-2 text-xs font-poppins text-brand-muted-ink">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% Best Price &amp; Instant Confirmation
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((act) => {
              const waText = encodeURIComponent(
                `Hi Traverse Globe! I'd like to book/enquire about the activity: "${act.title}" (₹${act.price}/person). Can you share details?`
              );
              const waUrl = `https://wa.me/${companyInfo.phone.whatsapp}?text=${waText}`;

              return (
                <article
                  key={act.id}
                  className="flex flex-col bg-surface rounded-2xl overflow-hidden border border-brand-hairline shadow-soft-sm hover:shadow-soft-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300"
                >
                  {/* Media */}
                  <div className={cn("relative overflow-hidden bg-brand-canvas-2", CARD_MEDIA)}>
                    <ImageWithFallback
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    {act.badge && (
                      <span className="absolute top-3 left-3 bg-brand-orange text-white text-[11px] font-poppins font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-soft-md">
                        {act.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-poppins px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      {act.duration}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-xs text-brand-muted-ink font-poppins mb-1.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                        {act.location}
                      </span>
                      <span className="font-semibold text-brand-ink">
                        ★ {act.rating} ({act.reviews})
                      </span>
                    </div>

                    <h3 className="font-poppins font-bold text-base md:text-lg text-brand-ink leading-snug mb-2">
                      {act.title}
                    </h3>

                    <p className="text-xs md:text-sm text-brand-muted-ink font-canva-sans line-clamp-2 mb-3">
                      {act.description}
                    </p>

                    {/* Highlights bullet list */}
                    <div className="mb-4 space-y-1">
                      {act.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-brand-ink/90 font-canva-sans">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing Block */}
                    <div className="mt-auto pt-3 border-t border-brand-hairline">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          {act.originalPrice > act.price && (
                            <span className="text-xs text-brand-muted-ink line-through font-canva-sans mr-2">
                              ₹{act.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="text-xl font-poppins font-bold text-brand-ink">
                            ₹{act.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-brand-muted-ink font-canva-sans ml-1">
                            / Person
                          </span>
                        </div>
                        <span className="text-[11px] font-poppins text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                          Instant Confirmation
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`tel:${companyInfo.phone.primary}`}
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white text-xs font-poppins font-semibold transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          Call Expert
                        </a>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-poppins font-semibold transition-colors shadow-soft-sm"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                          Book via WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Consultation Banner */}
      <section className="mt-12">
        <div className="container-custom">
          <div className="rounded-3xl bg-brand-scrim text-white p-8 md:p-12 text-center relative overflow-hidden shadow-soft-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-transparent pointer-events-none" />
            <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-3 relative z-10">
              Need a Custom Excursion or Group Charter?
            </h3>
            <p className="text-white/80 font-canva-sans text-sm md:text-base max-w-2xl mx-auto mb-6 relative z-10">
              Our travel specialists can bundle multiple activities, private yacht rentals, helicopter transfers, and luxury hotel packages at exclusive discounted rates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <a
                href={`tel:${companyInfo.phone.primary}`}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-7 py-3.5 rounded-xl font-poppins font-semibold text-sm shadow-glow-orange transition-[transform,box-shadow,background-color]"
              >
                <Phone className="w-4 h-4" />
                Speak to our Adventure Specialist
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-6 py-3.5 rounded-xl font-poppins font-medium text-sm transition-[background-color]"
              >
                Request Custom Itinerary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
