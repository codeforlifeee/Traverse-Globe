import { useMemo, useRef } from 'react';
import { companyInfo } from '../data/companyInfo';
import { useHomeReviews } from '../hooks/queries';
import { SkeletonList } from './revamp/Skeletons';
import ImageWithFallback from './revamp/ImageWithFallback';
import { useRail } from '../hooks/useRail';
import Kicker from './revamp/Kicker';
import SectionRule from './revamp/SectionRule';
import { cn } from '@/lib/utils';
// Parked with the two-row marquee variant below.
// import Marquee from './magicui/Marquee';

// Simple star icon component (no external icon deps)
const Star = ({ filled = false, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M11.48 3.499a.75.75 0 0 1 1.04 0l2.468 2.468c.142.142.331.237.533.267l3.49.507a.75.75 0 0 1 .416 1.279l-2.524 2.46a1 1 0 0 0-.286.885l.596 3.474a.75.75 0 0 1-1.088.791l-3.12-1.64a1 1 0 0 0-.93 0l-3.12 1.64a.75.75 0 0 1-1.088-.79l.596-3.475a1 1 0 0 0-.286-.885L4.57 8.02a.75.75 0 0 1 .416-1.279l3.49-.507a1 1 0 0 0 .533-.267l2.468-2.468Z"
    />
  </svg>
);

/**
 * One review card. Solid surface, per the opaque-card rule in
 * src/lib/cardMetrics.js — the glass treatment lives with the marquee variant
 * parked at the bottom of this file.
 */
function ReviewCard({ review }) {
  return (
    <article
      className={cn(
        'snap-start shrink-0 w-[300px] md:w-[360px] flex flex-col rounded-2xl overflow-hidden',
        'bg-surface border border-brand-hairline',
        'shadow-soft-md hover:shadow-soft-xl transition-shadow duration-300'
      )}
    >
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-brand-orange">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} filled={i < review.rating} className="w-4 h-4" />
          ))}
        </div>

        <blockquote className="mt-3 text-sm md:text-base text-brand-ink/90 font-canva-sans leading-relaxed line-clamp-5">
          “{review.text}”
        </blockquote>

        {review.tripPhotos && review.tripPhotos.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            {review.tripPhotos.map((photo, pIdx) => (
              <ImageWithFallback
                key={pIdx}
                src={photo}
                alt={`${review.author || 'Traveller'} trip in ${review.country}`}
                className="w-16 h-16 object-cover rounded-xl border border-brand-hairline"
                loading="lazy"
              />
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center gap-3 border-t border-brand-hairline mt-4">
          <img
            src={review.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'}
            alt=""
            className="w-10 h-10 rounded-full border border-brand-hairline object-cover"
            loading="lazy"
          />
          <div>
            <div className="text-sm font-poppins font-semibold text-brand-ink">{review.author}</div>
            <div className="text-xs text-brand-muted-ink font-canva-sans">Visited {review.country}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

const FeedbackSection = () => {
  const { data, isPending } = useHomeReviews();
  const testimonials = data?.testimonials ?? [];
  const platformReviews = data?.platforms ?? [];

  // Map platformReviews to badge format for UI
  const platformBadges = platformReviews.map(review => {
    const colorMap = {
      'Google': { color: 'bg-[#EA4335]', urlEnv: 'VITE_GOOGLE_REVIEWS_URL' },
      'Tripadvisor': { color: 'bg-[#34E0A1]', urlEnv: 'VITE_TRIPADVISOR_REVIEWS_URL' },
      'Facebook': { color: 'bg-[#1877F2]', urlEnv: 'VITE_FACEBOOK_REVIEWS_URL' }
    };
    return {
      name: review.platform,
      color: colorMap[review.platform]?.color || 'bg-brand-muted-ink',
      bg: 'bg-surface',
      text: 'text-darkBlue',
      rating: review.rating,
      urlEnv: colorMap[review.platform]?.urlEnv || '#'
    };
  });

const DESTINATION_FALLBACK_PHOTOS = {
  uae: [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=300&q=80',
  ],
  dubai: [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=300&q=80',
  ],
  bali: [
    'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=300&q=80',
  ],
  thailand: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=300&q=80',
  ],
  kashmir: [
    'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=300&q=80',
  ],
  kerala: [
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=300&q=80',
  ],
};

  const allTestimonials = useMemo(
    () =>
      testimonials
        .map((t, idx) => {
          const destKey = (t.destination || '').toLowerCase().trim();
          const photos = (t.tripPhotos && t.tripPhotos.length > 0)
            ? t.tripPhotos
            : (DESTINATION_FALLBACK_PHOTOS[destKey] || DESTINATION_FALLBACK_PHOTOS['dubai']);
          return {
            ...t,
            country: t.destination,
            author: [t.name, t.location].filter(Boolean).join(', '),
            key: t._id || `${t.destination}-${idx}`,
            tripPhotos: photos ? photos.slice(0, 3) : [],
          };
        })
        .sort((a, b) => b.rating - a.rating),
    [testimonials]
  );


  const scrollerRef = useRef(null);
  // One rail, drag to slide, bounce at either end, orange progress line below —
  // the same behaviour every other card rail on the site has.
  const { trackRef, barRef } = useRail(scrollerRef);

  const totalReviews = allTestimonials.length;
  const avgRating = useMemo(() => {
    if (!totalReviews) return 0;
    const sum = allTestimonials.reduce((acc, t) => acc + (t.rating || 0), 0);
    return sum / totalReviews;
  }, [allTestimonials, totalReviews]);


  const getEnv = (key) => import.meta?.env?.[key] || '#';
  const readReviewsUrl = getEnv('VITE_GOOGLE_REVIEWS_URL');
  const writeReviewUrl = getEnv('VITE_GOOGLE_WRITE_REVIEW_URL');

  // Structured data for SEO (aggregateRating)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyInfo.name,
    url: typeof window !== 'undefined' ? window.location.origin : companyInfo.website,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating ? avgRating.toFixed(1) : '0',
      reviewCount: totalReviews,
    },
  };

  if (isPending) {
    return (
      <section className="section-y bg-surface/75">
        <div className="container-custom">
          <SkeletonList count={3} columns={3} />
        </div>
      </section>
    );
  }

  if (!allTestimonials.length) return null;

  return (
    <section className="section-y bg-surface/75 overflow-hidden">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-custom">
        {/* Header — left-aligned kicker/title/subtitle stack, matching every other
            band on the page. The old centred heading sat oddly above a left-anchored rail. */}
        <div className="mb-6 md:mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <Kicker className="mb-3 block">Verified reviews</Kicker>
            <SectionRule className="mb-4" />
            <h2 className="font-poppins font-bold text-h2 text-brand-ink leading-tight">
              What travellers say about us
            </h2>
            <p className="mt-2 text-brand-muted-ink font-canva-sans text-sm md:text-base leading-relaxed">
              Real stories from our customers — curated, verified and showcased.
            </p>
          </div>

          {/* Rating summary + platform badges */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-2.5 rounded-2xl border border-brand-hairline bg-brand-canvas px-4 py-3">
              <span className="font-poppins font-bold text-2xl text-brand-ink leading-none">
                {avgRating.toFixed(1)}
              </span>
              <span>
                <span className="flex items-center text-brand-orange">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} filled={i < Math.round(avgRating)} className="w-3.5 h-3.5" />
                  ))}
                </span>
                <span className="block text-[11px] text-brand-muted-ink font-canva-sans mt-0.5">
                  {totalReviews} reviews
                </span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {platformBadges.map((p) => (
                <a
                  key={p.name}
                  href={getEnv(p.urlEnv)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-hairline bg-surface px-3 py-1.5 hover:-translate-y-0.5 hover:shadow-soft-md transition-all"
                >
                  <span className={`inline-block w-2 h-2 rounded-full ${p.color}`} />
                  <span className="text-xs font-poppins text-brand-ink">{p.name}</span>
                  <span className="text-xs text-brand-muted-ink">{p.rating.toFixed(1)}★</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rail — bleeds to the viewport edge so the next card peeks, like the gallery band */}
      <div
        ref={scrollerRef}
        // Full-bleed rail padded to the container gutter (.rail-bleed, index.css).
        className="rail-bleed overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2 cursor-grab [&[data-dragging]]:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div ref={trackRef} className="flex gap-4 md:gap-5 will-change-transform">
          {allTestimonials.map((t) => (
            <ReviewCard key={t.key} review={t} />
          ))}
        </div>
      </div>

      {/* Drag progress + CTA */}
      <div className="container-custom mt-5 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[80px] h-1 rounded-full bg-brand-hairline overflow-hidden" aria-hidden="true">
          <div ref={barRef} className="h-full w-1/3 rounded-full bg-brand-orange" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={readReviewsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="px-4 py-2 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-poppins font-semibold transition-colors"
          >
            Read full reviews
          </a>
          <a
            href={writeReviewUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="px-4 py-2 rounded-full border border-brand-hairline text-brand-ink hover:border-brand-orange hover:text-brand-orange text-sm font-poppins font-semibold transition-colors"
          >
            Write a review
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;

/* ---------------------------------------------------------------------------
 * PARKED: two opposing infinite marquee rows (glassmorphism cards)
 *
 * Replaced by the single drag-to-slide rail above, which keeps the orange
 * progress line and matches every other card rail on the site. Kept here so the
 * variant can be restored without rebuilding it.
 *
 * To restore:
 *   1. Re-add  import Marquee from './magicui/Marquee';
 *   2. Swap ReviewCard's surface classes for the glass set:
 *        'bg-surface/70 backdrop-blur-xl backdrop-saturate-150'
 *        'border border-white/40 dark:border-white/10'
 *        'ring-1 ring-inset ring-white/20 dark:ring-white/5'
 *      and drop 'snap-start' from it.
 *   3. Restore the row split and constants, and swap the rail JSX for the rows.
 *
 * Constants:
 *   const MAX_PER_ROW = 6;      // Marquee renders `repeat` copies of its
 *   const MARQUEE_REPEAT = 3;   // children; 60 reviews x repeat 4 = ~240 cards
 *
 * Row split - alternating indices keep both tracks visually balanced:
 *   const [rowOne, rowTwo] = useMemo(() => {
 *     const a = [];
 *     const b = [];
 *     allTestimonials.forEach((t, i) => (i % 2 === 0 ? a : b).push(t));
 *     return [a.slice(0, MAX_PER_ROW), b.slice(0, MAX_PER_ROW)];
 *   }, [allTestimonials]);
 *
 * Markup - the mask fades both ends instead of hard-cutting at the viewport:
 *   <div
 *     className="relative"
 *     style={{
 *       WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
 *       maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
 *     }}
 *   >
 *     <Marquee pauseOnHover repeat={MARQUEE_REPEAT} className="[--duration:46s] [--gap:1.25rem]">
 *       {rowOne.map((t) => <ReviewCard key={t.key} review={t} />)}
 *     </Marquee>
 *     {rowTwo.length > 0 && (
 *       <Marquee reverse pauseOnHover repeat={MARQUEE_REPEAT} className="[--duration:54s] [--gap:1.25rem]">
 *         {rowTwo.map((t) => <ReviewCard key={t.key} review={t} />)}
 *       </Marquee>
 *     )}
 *   </div>
 * ------------------------------------------------------------------------- */

