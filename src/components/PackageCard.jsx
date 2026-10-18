import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Eye,
  Star,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Headphones,
  Check,
  Flame,
  Zap,
  Hotel,
} from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { cn } from '@/lib/utils';
import { slugify } from '../utils/slug';
import { companyInfo } from '../data/companyInfo';
import HeartIcon from './revamp/HeartIcon';
import ImageWithFallback from './revamp/ImageWithFallback';

const formatDuration = (nights) => {
  if (!nights) return '5 Days & 4 Nights';
  const match = nights.match(/(\d+)N\/?(\d+)?D?/i);
  if (match) {
    const n = parseInt(match[1], 10);
    const d = match[2] ? parseInt(match[2], 10) : n + 1;
    return `${d} Days & ${n} Nights`;
  }
  return nights;
};

const computeSavingsAmount = (price, strike) => {
  if (!price || !strike || strike <= price) return null;
  return strike - price;
};

const computeSavingsPercent = (price, strike) => {
  if (!price || !strike || strike <= price) return null;
  return Math.round(((strike - price) / strike) * 100);
};

const URGENCY_META = {
  'high-demand': { label: 'High demand', icon: Flame, tone: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' },
  'few-seats': { label: 'Few seats left', icon: Zap, tone: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50' },
  'just-launched': { label: 'Just launched', icon: Sparkles, tone: 'bg-brand-trust/10 text-brand-trust border-brand-trust/20' },
  'sold-out': { label: 'Sold out', icon: X, tone: 'bg-brand-hairline text-brand-muted-ink border-brand-hairline' },
};

/**
 * PackageCard — Upgraded Thrillophilia benchmark (REVAMP_PLAN §3 #6 & §4.2)
 *
 * Anatomy:
 * +-------------------------------------------------------+
 * | [ IMAGE CAROUSEL / SLIDER ]                           |
 * | - Top Left: "SAVE ₹XX,XXX" pill                      |
 * | - Top Right: Heart shortlist button                   |
 * | - Center Hover CTA: "Quick View"                      |
 * | - Bottom Image: Pagination Dots (• • •)               |
 * +-------------------------------------------------------+
 * | 7 Days & 6 Nights                          ★ 4.8 (24) |
 * |                                                       |
 * | Scenic Iceland With Diamond Circle                    |
 * |                                                       |
 * | [ 3D Reykjavík • 4D Akureyri ] (Light amber pill)     |
 * |                                                       |
 * | ₹3,06,372  [ SAVE ₹75,900 ]                           |
 * | ₹2,30,472 / Person                                    |
 * |                                                       |
 * | +-------+  +----------------------------------------+ |
 * | |  [📞] |  |             View Package               | |
 * | +-------+  +----------------------------------------+ |
 * +-------------------------------------------------------+
 */
export default function PackageCard({
  pkg,
  id,
  title,
  duration,
  price,
  originalPrice,
  image,
  destination,
  onView,
  buttonLabel = 'View Package',
  category,
  size = 'default',
  showQuickView = true,
}) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCallTooltip, setShowCallTooltip] = useState(false);
  const navigate = useNavigate();

  const basePackage = pkg || {
    id, title, nights: duration, price, strikePrice: originalPrice, image
  };
  const packageData = {
    ...basePackage,
    image: basePackage.image || basePackage.bannerImage,
    nights: basePackage.nights || basePackage.duration,
  };

  const computedSlug = useMemo(
    () => packageData.slug?.current || slugify(packageData.title),
    [packageData.slug, packageData.title]
  );

  const resolvedCategory = useMemo(() => {
    let cat = (category || packageData.category || '').toLowerCase().trim();
    if (cat === 'chardham' || cat === 'chardham-yatra') return 'chardhamyatra';
    if (cat) return cat;
    const numId = Number(packageData.id);
    if (numId >= 1 && numId <= 10) return 'uae';
    if ((numId >= 11 && numId <= 15) || (numId >= 26 && numId <= 30)) return 'bali';
    if ((numId >= 16 && numId <= 20) || (numId >= 36 && numId <= 39)) return 'thailand';
    if ((numId >= 21 && numId <= 25) || (numId >= 31 && numId <= 35)) return 'singapore';
    if (numId >= 40 && numId <= 54) return 'srilanka';
    if (numId >= 55 && numId <= 64) return 'vietnam';
    if (numId >= 65 && numId <= 74) return 'laos';
    if (numId >= 91 && numId <= 100) return 'andaman';
    if (numId >= 101 && numId <= 110) return 'jaipur';
    if (numId >= 111 && numId <= 120) return 'kerala';
    if (numId >= 121 && numId <= 130) return 'kashmir';
    return 'uae';
  }, [category, packageData.category, packageData.id]);

  const destinationType = useMemo(() => {
    const domestic = ['andaman', 'jaipur', 'kerala', 'kashmir', 'chardhamyatra', 'chardham'];
    return domestic.includes(resolvedCategory?.toLowerCase()) ? 'domestic' : 'international';
  }, [resolvedCategory]);

  const canonicalLink = `/destinations/${destinationType}/${resolvedCategory}/${computedSlug}`;
  const packageLink = (destination && !destination.startsWith('/packages/')) ? destination : canonicalLink;

  // Multi-image gallery list
  const imageList = useMemo(() => {
    const list = [];
    if (Array.isArray(packageData.gallery) && packageData.gallery.length > 0) {
      list.push(...packageData.gallery.map((img) => (typeof img === 'string' ? img : img?.asset?.url || img?.url || img)));
    }
    if (Array.isArray(packageData.images) && packageData.images.length > 0) {
      list.push(...packageData.images.map((img) => (typeof img === 'string' ? img : img?.asset?.url || img?.url || img)));
    }
    if (packageData.image) {
      list.push(typeof packageData.image === 'string' ? packageData.image : packageData.image?.asset?.url || packageData.image?.url);
    }
    if (packageData.bannerImage && !list.includes(packageData.bannerImage)) {
      list.push(packageData.bannerImage);
    }

    const valid = list.filter(Boolean);
    return valid.length > 0
      ? Array.from(new Set(valid)).slice(0, 4)
      : [packageData.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'];
  }, [packageData]);

  const strikePrice = packageData.strikePrice || (packageData.price ? Math.round(packageData.price * 1.25) : null);
  const savingsAmount = computeSavingsAmount(packageData.price, strikePrice);
  const savingsPercent = packageData.savingsPercent || computeSavingsPercent(packageData.price, strikePrice);

  const urgency = packageData.urgency || null;
  const soldOut = urgency === 'sold-out' || packageData.active === false;
  const urgencyMeta = urgency && URGENCY_META[urgency];
  const UrgencyIcon = urgencyMeta?.icon;

  const itineraryDays = packageData.itinerary?.days || [];
  const inclusions = packageData.inclusions || [];
  const accommodations = packageData.hotels?.options || packageData.hotels || [];

  // Generate highlights stops pill (e.g., "3D Dubai • 2D Abu Dhabi" or custom tags)
  const stopsPill = useMemo(() => {
    if (packageData.highlights && Array.isArray(packageData.highlights) && packageData.highlights.length > 0) {
      return packageData.highlights.slice(0, 2).join(' • ');
    }
    if (itineraryDays.length >= 2) {
      const day1 = itineraryDays[0]?.title?.split('-')[0]?.trim() || 'Arrival';
      const day2 = itineraryDays[1]?.title?.split('-')[0]?.trim() || 'City Tour';
      return `${day1} • ${day2}`;
    }
    if (resolvedCategory === 'uae') return 'Dubai City • Desert Safari • Marina';
    if (resolvedCategory === 'bali') return 'Ubud Rice Terraces • Kuta Beach';
    if (resolvedCategory === 'kashmir') return 'Srinagar Dal Lake • Gulmarg';
    if (resolvedCategory === 'kerala') return 'Munnar Hills • Alleppey Backwaters';
    if (resolvedCategory === 'thailand') return 'Bangkok Temples • Phuket Beaches';
    return `${resolvedCategory?.toUpperCase()} Signature Highlights`;
  }, [packageData.highlights, itineraryDays, resolvedCategory]);

  const handleViewPackage = () => {
    if (soldOut) return;
    if (onView) return onView(packageData);
    navigate(packageLink);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const shortlistItem = {
    id: `pkg:${packageData.id || computedSlug}`,
    type: 'package',
    title: packageData.title,
    price: packageData.price,
    image: imageList[0],
    slug: computedSlug,
    category: resolvedCategory,
    href: packageLink,
    packageId: packageData._id,
  };

  const isLarge = size === 'large';
  const isCompact = size === 'compact';

  return (
    <motion.div
      whileHover={soldOut ? {} : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative h-full flex flex-col rounded-2xl overflow-hidden bg-surface border transition-all duration-300',
        'shadow-soft-sm hover:shadow-soft-xl',
        isLarge ? 'border-brand-orange/40 ring-1 ring-brand-orange/20' : 'border-brand-hairline',
        soldOut && 'grayscale opacity-70 pointer-events-none'
      )}
    >
      <div className="flip-card-container w-full h-full" style={{ minHeight: isLarge ? 540 : 490 }}>
        <div
          className="flip-card w-full h-full"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* ==================== FRONT OF CARD ==================== */}
          <div className="flip-card-front w-full h-full flex flex-col bg-surface">
            {/* Top Media Header */}
            <div className="relative aspect-[16/10] overflow-hidden bg-brand-canvas-2 select-none">
              <ImageWithFallback
                src={imageList[activeImageIdx]}
                alt={packageData.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Bottom Overlay for Legibility */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />

              {/* Top-Left: Discount Badge (Save INR XX,XXX or Save XX%) */}
              {savingsAmount > 0 && !soldOut && (
                <div className="absolute top-3 left-3 bg-brand-orange text-white text-[11px] font-poppins font-bold px-2.5 py-1 rounded-lg shadow-soft-md tracking-tight uppercase">
                  SAVE ₹{savingsAmount.toLocaleString('en-IN')}
                </div>
              )}

              {/* Top-Right: Shortlist Heart */}
              <div className="absolute top-3 right-3 z-10">
                <HeartIcon item={shortlistItem} size="md" />
              </div>

              {/* Multi-image Arrow Controls (Desktop hover) */}
              {imageList.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Bottom Pagination Dots */}
                  <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                    {imageList.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIdx(dotIdx);
                        }}
                        aria-label={`Show image ${dotIdx + 1}`}
                        className={cn(
                          'w-2 h-2 rounded-full transition-all duration-200',
                          activeImageIdx === dotIdx
                            ? 'bg-brand-orange w-4'
                            : 'bg-white/70 hover:bg-white'
                        )}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Quick View center hover overlay button */}
              {showQuickView && !isCompact && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(true);
                    }}
                    className="pointer-events-auto inline-flex items-center gap-1.5 bg-surface/90 hover:bg-surface text-brand-ink px-3.5 py-1.5 rounded-full text-xs font-poppins font-semibold shadow-soft-md backdrop-blur-sm transition-transform hover:scale-105"
                  >
                    <Eye className="w-3.5 h-3.5 text-brand-orange" />
                    Quick View
                  </button>
                </div>
              )}
            </div>

            {/* Body Section */}
            <div className="p-4 md:p-5 flex flex-col flex-1">
              {/* Row 1: Duration (Left) & Star Rating (Right) */}
              <div className="flex items-center justify-between gap-2 text-xs font-poppins text-brand-muted-ink mb-1.5">
                <span className="inline-flex items-center gap-1 font-medium text-brand-ink">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  {formatDuration(packageData.nights)}
                </span>

                <div className="flex items-center gap-1 text-xs font-semibold text-brand-ink">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <span>{packageData.rating ? packageData.rating.toFixed(1) : '4.8'}</span>
                  <span className="text-brand-muted-ink font-normal">
                    ({packageData.reviews || 18})
                  </span>
                </div>
              </div>

              {/* Row 2: Package Title */}
              <h3 className="font-poppins font-bold text-brand-ink text-base md:text-lg line-clamp-2 leading-snug mb-2 group-hover:text-brand-orange transition-colors">
                <a href={packageLink} onClick={(e) => { e.preventDefault(); handleViewPackage(); }}>
                  {packageData.title}
                </a>
              </h3>

              {/* Row 3: Itinerary Highlights / Stops Pill */}
              <div className="mb-3">
                <span className="bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300 text-[11px] font-poppins font-medium px-2.5 py-1 rounded-md inline-block line-clamp-1 border border-amber-200/60 dark:border-amber-800/40">
                  {stopsPill}
                </span>
              </div>

              {/* Urgency Badge if any */}
              {urgencyMeta && !soldOut && (
                <div className={cn(
                  'inline-flex self-start items-center gap-1 text-[11px] font-poppins font-medium px-2 py-0.5 rounded-md border mb-2',
                  urgencyMeta.tone
                )}>
                  {UrgencyIcon && <UrgencyIcon className="w-3 h-3" />}
                  {urgencyMeta.label}
                </div>
              )}

              {/* Row 4: Pricing Block */}
              <div className="mt-auto pt-2 border-t border-brand-hairline">
                <div className="flex items-baseline gap-2 flex-wrap mb-1">
                  {strikePrice > (packageData.price || 0) && (
                    <span className="text-xs text-brand-muted-ink line-through font-canva-sans">
                      ₹{strikePrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {savingsPercent > 0 && (
                    <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-poppins font-semibold px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/40">
                      SAVE {savingsPercent}%
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl md:text-2xl font-bold font-poppins text-brand-ink leading-none">
                    ₹{packageData.price ? packageData.price.toLocaleString('en-IN') : '24,999'}
                  </span>
                  <span className="text-xs text-brand-muted-ink font-canva-sans">
                    / Adult
                  </span>
                </div>

                {/* Bottom Buttons: Call Button (Left) + View Package (Right) */}
                <div className="mt-4 flex items-center gap-2">
                  {/* Left: Square Call Button */}
                  <a
                    href={`tel:${companyInfo.phone.primary}`}
                    aria-label="Call an expert"
                    className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all shadow-soft-sm hover:shadow-glow-orange"
                    title={`Call expert: ${companyInfo.phone.primary}`}
                  >
                    <Phone className="w-5 h-5" />
                  </a>

                  {/* Right: Primary View Package Button */}
                  <button
                    onClick={handleViewPackage}
                    disabled={soldOut}
                    className={cn(
                      'flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-poppins font-semibold transition-all duration-200 shadow-soft-md',
                      soldOut
                        ? 'bg-brand-hairline text-brand-muted-ink cursor-not-allowed'
                        : 'bg-brand-orange hover:bg-brand-orange-hover text-white hover:shadow-glow-orange hover:-translate-y-0.5'
                    )}
                  >
                    {buttonLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== BACK OF CARD (QUICK VIEW) ==================== */}
          <div className="flip-card-back w-full h-full overflow-hidden bg-surface flex flex-col p-5">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-brand-hairline">
              <div>
                <span className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-brand-orange">
                  Quick Itinerary
                </span>
                <h4 className="font-poppins font-bold text-brand-ink text-base line-clamp-1">
                  {packageData.title}
                </h4>
              </div>
              <button
                onClick={() => setIsFlipped(false)}
                className="w-8 h-8 rounded-lg bg-brand-canvas-2 hover:bg-brand-hairline flex items-center justify-center text-brand-ink transition-colors"
                title="Close Quick View"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 scrollbar-thin">
              {itineraryDays.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-kicker uppercase font-poppins text-brand-muted-ink">
                      Day Breakdown
                    </span>
                    <span className="text-[11px] bg-brand-orange/10 text-brand-orange rounded px-2 py-0.5 font-poppins font-medium">
                      {itineraryDays.length} Days
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {itineraryDays.slice(0, 4).map((day, idx) => (
                      <div key={idx} className="text-xs text-brand-ink flex gap-2 items-start">
                        <span className="font-poppins font-semibold text-brand-orange min-w-fit">
                          {day.dayKey || `Day ${idx + 1}`}
                        </span>
                        <span className="line-clamp-1">{day.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {inclusions.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-kicker uppercase font-poppins text-brand-muted-ink">
                      Inclusions
                    </span>
                    <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded px-2 py-0.5 font-poppins font-medium">
                      {inclusions.length} items
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {inclusions.slice(0, 4).map((item, idx) => (
                      <li key={idx} className="text-xs text-brand-ink flex gap-2 items-start">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {accommodations.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-kicker uppercase font-poppins text-brand-muted-ink">
                      Stays
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {accommodations.slice(0, 2).map((hotel, idx) => (
                      <li key={idx} className="text-xs text-brand-ink line-clamp-1 flex items-center gap-1.5">
                        <Hotel className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{typeof hotel === 'string' ? hotel : hotel.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quick Consultation Actions on Card Back */}
            <div className="mt-3 pt-3 border-t border-brand-hairline space-y-2">
              <a
                href={`tel:${companyInfo.phone.primary}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white py-2.5 px-4 rounded-xl text-xs font-poppins font-semibold transition-colors shadow-soft-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Expert ({companyInfo.phone.primary})
              </a>

              <a
                href={`https://wa.me/${companyInfo.phone.whatsapp}?text=${encodeURIComponent(`Hi Traverse Globe! I want details on: ${packageData.title}`)}`}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-2 px-4 rounded-xl text-xs font-poppins font-semibold transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
