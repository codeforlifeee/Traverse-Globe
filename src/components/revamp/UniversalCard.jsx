import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildSrcSet } from '@/lib/sanityImage';

/**
 * UniversalCard — one card design for every carousel/grid on the site.
 *
 * Renders the same visual across destinations, categories, hotels, packages, and prices.
 * Content adapts via props; layout, typography, spacing, hover and shadow stay identical.
 *
 * Anatomy:
 *   ┌─────────────────────────┐
 *   │ [BADGE]           [★]   │  image, aspect-[4/5], badges float top
 *   │                         │
 *   ├──── hairline ───────────┤
 *   │ KICKER                  │  optional uppercase micro-label
 *   │ Title (serif)           │  font-season h3
 *   │ Subtitle one liner      │  muted body
 *   │                         │
 *   │ ₹ 45,999    Explore →   │  price left / cta right (either optional)
 *   └─────────────────────────┘
 */

const buildResponsiveSrc = (imageOrUrl) => buildSrcSet(imageOrUrl);

export default function UniversalCard({
  image,
  imageAlt = '',
  kicker,
  title,
  subtitle,
  badge,
  rating,
  price,
  cta,
  href,
  onClick,
  variant = 'default',
  className,
}) {
  const { src, srcSet } = buildResponsiveSrc(image);
  const isElevated = variant === 'elevated';

  const Body = (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl bg-surface transition-all duration-300',
        'border border-brand-hairline',
        'shadow-soft-sm hover:shadow-soft-xl hover:-translate-y-1',
        isElevated && 'ring-2 ring-brand-orange/20 shadow-soft-md',
        'h-full',
        className
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5] bg-brand-canvas-2">
        {image ? (
          <img
            src={src}
            srcSet={srcSet}
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            alt={imageAlt || title || ''}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brand-muted-ink/40 text-sm">
            No image
          </div>
        )}

        {/* Subtle bottom gradient for depth (not obscuring content) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-scrim/25 to-transparent" />

        {/* Top-left badge */}
        {badge && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-surface/95 backdrop-blur px-2.5 py-1 text-[11px] font-poppins font-semibold text-brand-ink shadow-soft-sm">
            {badge}
          </span>
        )}

        {/* Top-right rating (hotels/packages) */}
        {rating != null && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-surface/95 backdrop-blur px-2.5 py-1 text-[11px] font-poppins font-semibold text-brand-ink shadow-soft-sm">
            <Star className="h-3 w-3 fill-brand-orange text-brand-orange" />
            {typeof rating === 'number' ? rating.toFixed(1) : rating}
          </span>
        )}

        {/* Elevated variant flag */}
        {isElevated && (
          <span className="absolute right-3 bottom-3 inline-flex items-center rounded-full bg-brand-orange px-2.5 py-1 text-[10px] font-poppins font-bold uppercase tracking-widest text-white shadow-soft-md">
            Our pick
          </span>
        )}
      </div>

      {/* Hairline — DESIGN.md signature motif */}
      <div className="h-px bg-brand-hairline" />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        {kicker && (
          <span className="text-kicker uppercase text-brand-muted-ink">
            {kicker}
          </span>
        )}

        <h3 className="font-season text-lg md:text-xl leading-tight text-brand-ink">
          {title}
        </h3>

        {subtitle && (
          <p className="line-clamp-2 text-sm text-brand-muted-ink font-canva-sans leading-snug">
            {subtitle}
          </p>
        )}

        {/* Footer row: price + cta */}
        {(price || cta) && (
          <div className="mt-auto flex items-end justify-between gap-3 pt-3">
            {price ? (
              <div className="flex flex-col leading-none">
                {price.from && (
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted-ink font-poppins mb-0.5">
                    From
                  </span>
                )}
                <span className="font-poppins text-lg md:text-xl font-bold text-brand-ink">
                  ₹{Number(price.amount).toLocaleString('en-IN')}
                </span>
                {price.perPerson && (
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted-ink font-poppins mt-0.5">
                    per person
                  </span>
                )}
              </div>
            ) : (
              <span />
            )}

            {cta && (
              cta.style === 'button' ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-4 py-2 text-xs font-poppins font-semibold text-white shadow-soft-sm transition-all group-hover:bg-brand-orange-hover group-hover:shadow-glow-orange">
                  {cta.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-sm font-poppins font-semibold text-brand-orange transition-all group-hover:gap-2">
                  {cta.label}
                  <ArrowRight className="h-4 w-4" />
                </span>
              )
            )}
          </div>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link to={href} className="block h-full">
        {Body}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block h-full w-full text-left">
        {Body}
      </button>
    );
  }
  return Body;
}
