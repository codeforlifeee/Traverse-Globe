import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import ImageWithFallback from './ImageWithFallback';
import HeartIcon from './HeartIcon';

/**
 * HotelCard — matches PackageCard visual language.
 * REVAMP_PLAN §5.1.
 */
export default function HotelCard({ hotel, size = 'default' }) {
  const price = hotel.price;
  const original = hotel.originalPrice;
  const savings = original && price && original > price
    ? Math.round(((original - price) / original) * 100)
    : null;

  const to = `/hotels/${hotel.category}/${hotel.slug?.current || ''}`;

  const shortlistItem = {
    id: `hotel:${hotel._id || hotel.slug?.current}`,
    type: 'hotel',
    title: hotel.name,
    price,
    image: hotel.image,
    slug: hotel.slug?.current,
    category: hotel.category,
    href: to,
  };

  const isLarge = size === 'large';

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group h-full flex flex-col rounded-2xl overflow-hidden bg-white border transition-shadow duration-300',
        'shadow-soft-sm hover:shadow-soft-xl',
        isLarge ? 'border-brand-orange/30 ring-1 ring-brand-orange/10' : 'border-brand-hairline'
      )}
    >
      <div className={cn('relative overflow-hidden', isLarge ? 'aspect-[16/10]' : 'aspect-[4/3]')}>
        <ImageWithFallback
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {savings && (
          <div className="absolute top-3 left-3 bg-brand-trust text-white text-xs font-poppins font-semibold px-2.5 py-1 rounded-md shadow-soft-md">
            Save {savings}%
          </div>
        )}

        <div className="absolute top-3 right-3">
          <HeartIcon item={shortlistItem} size="md" />
        </div>

        {hotel.rating > 0 && (
          <div className="absolute left-3 bottom-3 flex items-center gap-1 bg-white/95 backdrop-blur text-brand-ink text-xs font-poppins font-semibold px-2 py-1.5 rounded-lg">
            {Array.from({ length: hotel.rating }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
            ))}
          </div>
        )}

        {hotel.reviewRating > 0 && (
          <div className="absolute right-3 bottom-3 flex items-center gap-1 bg-white/95 backdrop-blur text-brand-ink text-xs font-poppins font-semibold px-2 py-1.5 rounded-lg">
            {hotel.reviewRating.toFixed(1)}
            {hotel.reviewCount > 0 && <span className="text-brand-muted-ink font-normal">({hotel.reviewCount})</span>}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-5">
        <span className="text-kicker uppercase text-brand-muted-ink font-poppins mb-2">
          {hotel.city ? `${hotel.city}${hotel.country ? ` · ${hotel.country}` : ''}` : hotel.category}
        </span>
        <h3 className={cn(
          'font-poppins font-semibold text-brand-ink mb-2 line-clamp-2 leading-snug',
          isLarge ? 'text-lg md:text-xl' : 'text-base md:text-lg'
        )}>
          {hotel.name}
        </h3>
        {hotel.location && (
          <p className="text-xs text-brand-muted-ink font-canva-sans line-clamp-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {hotel.location}
          </p>
        )}

        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            {typeof original === 'number' && original > (price || 0) && (
              <span className="text-sm text-brand-muted-ink line-through font-canva-sans">
                ₹{original.toLocaleString('en-IN')}
              </span>
            )}
            {price > 0 ? (
              <span className="text-xl font-poppins font-bold text-brand-orange">
                ₹{price.toLocaleString('en-IN')}
                <span className="text-xs text-brand-muted-ink font-normal ml-1 font-canva-sans">/night</span>
              </span>
            ) : (
              <span className="text-sm text-brand-muted-ink font-canva-sans">Contact for rates</span>
            )}
          </div>

          <Link
            to={to}
            className="mt-3 block w-full text-center px-4 py-2.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-poppins font-semibold transition-colors shadow-soft-md hover:shadow-glow-orange"
          >
            View hotel
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
