import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap as Bolt, Eye, Headphones, Phone, X, Star, Clock, Flame, Zap, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { slugify } from '../utils/slug';
import { companyInfo } from '../data/siteData';
import HeartIcon from './revamp/HeartIcon';
import ImageWithFallback from './revamp/ImageWithFallback';

const getDaysFromNights = (nights) => {
  if (!nights) return '';
  const match = nights.match(/(\d+)N\/(\d+)D/);
  if (match) return `${match[2]} Days`;
  return nights;
};

const computeSavings = (price, strike) => {
  if (!price || !strike || strike <= price) return null;
  return Math.round(((strike - price) / strike) * 100);
};

const URGENCY_META = {
  'high-demand': { label: 'High demand', icon: Flame, tone: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' },
  'few-seats': { label: 'Only a few left', icon: Zap, tone: 'bg-amber-50 text-amber-700 border-amber-200' },
  'just-launched': { label: 'Just launched', icon: Sparkles, tone: 'bg-brand-trust/10 text-brand-trust border-brand-trust/20' },
  'sold-out': { label: 'Sold out', icon: X, tone: 'bg-slate-200 text-slate-600 border-slate-300' },
};

export const PriceTag = ({ strike, price, size = 'default' }) => {
  const priceCls = size === 'lg'
    ? 'text-2xl md:text-3xl'
    : 'text-xl md:text-2xl';
  return (
    <div className="mt-1">
      <div className="flex items-baseline gap-2 flex-wrap">
        {typeof strike === 'number' && strike > 0 && strike > (price || 0) && (
          <span className="text-sm text-brand-muted-ink line-through font-canva-sans">
            ₹{strike.toLocaleString('en-IN')}
          </span>
        )}
        <span className={cn('font-bold text-brand-orange font-poppins leading-none', priceCls)}>
          ₹{price?.toLocaleString ? price.toLocaleString('en-IN') : price}
        </span>
      </div>
      <p className="text-xs text-brand-muted-ink font-canva-sans mt-1">Per person on twin sharing</p>
    </div>
  );
};

/**
 * PackageCard — refactored per REVAMP_PLAN §5.
 * - `size` variants: 'default' | 'large' (elevated for "Pick the Winner") | 'compact'
 * - Heart icon on top-right (adds to shortlist)
 * - Save-% badge on top-left (auto-computed from strike + price, or pkg.savingsPercent)
 * - Urgency badge below title (pkg.urgency)
 * - Rating pill on image (pkg.rating)
 * - Grayscale + "Sold out" treatment when urgency === 'sold-out' or pkg.active === false
 * - Preserves the flip quick-view mechanic from the previous card
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
  const [showExpertMenu, setShowExpertMenu] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const menuRef = useRef(null);
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
    if (category) return category;
    if (packageData.category) return packageData.category;
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
    const domestic = ['andaman', 'jaipur', 'kerala', 'kashmir', 'chardhamyatra'];
    return domestic.includes(resolvedCategory) ? 'domestic' : 'international';
  }, [resolvedCategory]);

  const packageLink = destination || `/destinations/${destinationType}/${resolvedCategory}/${computedSlug}`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowExpertMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const imageUrl = packageData.image || packageData.bannerImage || '';
  const savingsPercent = packageData.savingsPercent
    || computeSavings(packageData.price, packageData.strikePrice);
  const urgency = packageData.urgency || null;
  const soldOut = urgency === 'sold-out' || packageData.active === false;

  const urgencyMeta = urgency && URGENCY_META[urgency];
  const UrgencyIcon = urgencyMeta?.icon;

  const itineraryDays = packageData.itinerary?.days || [];
  const inclusions = packageData.inclusions || [];
  const accommodations = packageData.hotels?.options || packageData.hotels || [];

  const handleViewPackage = () => {
    if (soldOut) return;
    if (onView) return onView(packageData);
    navigate(packageLink);
  };

  const shortlistItem = {
    id: `pkg:${packageData.id || computedSlug}`,
    type: 'package',
    title: packageData.title,
    price: packageData.price,
    image: imageUrl,
    slug: computedSlug,
    category: resolvedCategory,
    href: packageLink,
  };

  // Size variants
  const isLarge = size === 'large';
  const isCompact = size === 'compact';
  const imgAspect = isLarge ? 'aspect-[16/10]' : 'aspect-[4/3]';
  const titleCls = isLarge
    ? 'text-lg md:text-2xl'
    : (isCompact ? 'text-base' : 'text-base md:text-lg');
  const bodyPad = isLarge ? 'p-6' : 'p-5';

  return (
    <motion.div
      whileHover={soldOut ? {} : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative h-full flex flex-col rounded-2xl overflow-hidden bg-white border transition-shadow duration-300',
        'shadow-soft-sm hover:shadow-soft-xl',
        isLarge ? 'border-brand-orange/30 ring-1 ring-brand-orange/10' : 'border-brand-hairline',
        soldOut && 'grayscale opacity-70 pointer-events-none'
      )}
    >
      <div className="flip-card-container" style={{ minHeight: isLarge ? 520 : 460 }}>
        <div className="flip-card" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>

          {/* FRONT */}
          <div className="flip-card-front">
            {/* Image */}
            <div className={cn('relative overflow-hidden', imgAspect)}>
              <ImageWithFallback
                src={imageUrl}
                alt={packageData.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient bottom for legibility of chips */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Top-left: Save % */}
              {savingsPercent > 0 && !soldOut && (
                <div className="absolute top-3 left-3 bg-brand-trust text-white text-xs font-poppins font-semibold px-2.5 py-1 rounded-md shadow-soft-md">
                  Save {savingsPercent}%
                </div>
              )}

              {/* Top-right: Heart */}
              <div className="absolute top-3 right-3">
                <HeartIcon item={shortlistItem} size="md" />
              </div>

              {/* Featured pick badge (only on large) */}
              {isLarge && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[11px] font-poppins font-semibold uppercase tracking-widest px-3 py-1 rounded-full shadow-glow-orange">
                  Our pick
                </div>
              )}

              {/* Bottom-left: duration */}
              {packageData.nights && (
                <div className="absolute left-3 bottom-3 flex items-center gap-1.5 bg-white/95 backdrop-blur text-brand-ink text-xs font-poppins font-medium px-2.5 py-1.5 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{getDaysFromNights(packageData.nights)}</span>
                </div>
              )}

              {/* Bottom-right: rating */}
              {packageData.rating > 0 && (
                <div className="absolute right-3 bottom-3 flex items-center gap-1 bg-white/95 backdrop-blur text-brand-ink text-xs font-poppins font-semibold px-2 py-1.5 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <span>{packageData.rating.toFixed(1)}</span>
                  {packageData.reviews > 0 && (
                    <span className="text-brand-muted-ink font-normal">({packageData.reviews})</span>
                  )}
                </div>
              )}

              {/* Sold-out overlay */}
              {soldOut && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <span className="bg-white text-brand-ink text-sm font-poppins font-bold uppercase tracking-widest px-4 py-2 rounded-md">
                    Sold out
                  </span>
                </div>
              )}
            </div>

            {/* Body */}
            <div className={cn('flex flex-col flex-grow', bodyPad)}>
              {/* Kicker: category */}
              <span className="text-kicker uppercase text-brand-muted-ink font-poppins mb-2">
                {destinationType} · {resolvedCategory}
              </span>

              <h3 className={cn(
                'font-poppins font-semibold text-brand-ink mb-2 line-clamp-2 leading-snug',
                titleCls
              )}>
                {packageData.title}
              </h3>

              {/* Urgency badge */}
              {urgencyMeta && !soldOut && (
                <div className={cn(
                  'inline-flex self-start items-center gap-1 text-[11px] font-poppins font-medium px-2 py-1 rounded-md border mb-3',
                  urgencyMeta.tone
                )}>
                  {UrgencyIcon && <UrgencyIcon className="w-3 h-3" />}
                  {urgencyMeta.label}
                </div>
              )}

              <div className="mt-auto pt-3">
                <PriceTag strike={packageData.strikePrice} price={packageData.price} size={isLarge ? 'lg' : 'default'} />

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  {showQuickView && !isCompact && (
                    <button
                      onClick={() => setIsFlipped(true)}
                      disabled={soldOut}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-canvas-2 hover:bg-brand-hairline text-brand-ink text-sm font-poppins font-medium transition-colors"
                    >
                      <Bolt className="w-4 h-4" />
                      Quick view
                    </button>
                  )}
                  <button
                    onClick={handleViewPackage}
                    disabled={soldOut}
                    className={cn(
                      'flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-poppins font-semibold transition-colors',
                      soldOut
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-brand-orange hover:bg-brand-orange-hover text-white shadow-soft-md hover:shadow-glow-orange'
                    )}
                  >
                    <Eye className="w-4 h-4" />
                    {buttonLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BACK — Quick view (preserved from previous card, restyled) */}
          <div className="flip-card-back overflow-hidden">
            <div className="p-5 flex flex-col h-full bg-white">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-brand-hairline">
                <h4 className="font-poppins font-bold text-brand-ink text-base">Quick view</h4>
                <button
                  onClick={() => setIsFlipped(false)}
                  className="w-8 h-8 rounded-lg bg-brand-canvas-2 hover:bg-brand-hairline flex items-center justify-center text-brand-ink transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4">
                {itineraryDays.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-kicker uppercase font-poppins text-brand-muted-ink">Itinerary</span>
                      <span className="text-[11px] bg-brand-orange/10 text-brand-orange rounded px-2 py-0.5 font-poppins font-medium">{itineraryDays.length} days</span>
                    </div>
                    <div className="space-y-1.5">
                      {itineraryDays.slice(0, 3).map((day, idx) => (
                        <div key={idx} className="text-xs text-brand-ink flex gap-2 items-start">
                          <span className="font-poppins font-semibold text-brand-orange min-w-fit">{day.dayKey || `Day ${idx + 1}`}</span>
                          <span className="line-clamp-1">{day.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {inclusions.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-kicker uppercase font-poppins text-brand-muted-ink">Included</span>
                      <span className="text-[11px] bg-brand-trust/10 text-brand-trust rounded px-2 py-0.5 font-poppins font-medium">{inclusions.length}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {inclusions.slice(0, 4).map((item, idx) => (
                        <li key={idx} className="text-xs text-brand-ink flex gap-2 items-start">
                          <span className="text-brand-trust mt-0.5">✓</span>
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {accommodations.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-kicker uppercase font-poppins text-brand-muted-ink">Hotels</span>
                      <span className="text-[11px] bg-brand-canvas-2 text-brand-ink rounded px-2 py-0.5 font-poppins font-medium">{accommodations.length}</span>
                    </div>
                    <ul className="space-y-1">
                      {accommodations.slice(0, 2).map((hotel, idx) => (
                        <li key={idx} className="text-xs text-brand-ink line-clamp-1">{hotel}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-brand-hairline" ref={menuRef}>
                <button
                  onClick={() => setShowExpertMenu(!showExpertMenu)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-poppins font-semibold transition-colors"
                >
                  <Headphones className="w-4 h-4" />
                  Talk to an expert
                </button>
                {showExpertMenu && (
                  <div className="mt-2 rounded-xl border border-brand-hairline overflow-hidden animate-fade-in">
                    <a
                      href={`tel:${companyInfo.phone.primary}`}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-brand-orange/5"
                      onClick={() => setShowExpertMenu(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-poppins font-semibold text-brand-ink">Call us</p>
                        <p className="text-xs text-brand-muted-ink">{companyInfo.phone.primary}</p>
                      </div>
                    </a>
                    <a
                      href={`https://wa.me/${companyInfo.phone.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#25D366]/5 border-t border-brand-hairline"
                      onClick={() => setShowExpertMenu(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center">
                        <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-poppins font-semibold text-brand-ink">WhatsApp</p>
                        <p className="text-xs text-brand-muted-ink">Chat with us now</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
