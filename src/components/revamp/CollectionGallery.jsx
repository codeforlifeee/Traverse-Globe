import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { REVEAL_VIEWPORT, riseItem, staggerParent } from '@/lib/motionVariants';
import ImageWithFallback from './ImageWithFallback';
import Kicker from './Kicker';
import SectionRule from './SectionRule';
import { cn } from '@/lib/utils';
import { useRail } from '@/hooks/useRail';

/**
 * CollectionGallery — the Club Med style browse band.
 *
 * A horizontally scrolling, two-row staggered grid of tiles with filter pills
 * above it. Differs from UniversalCarousel in three ways that matter here:
 *
 * - Tiles are image-first and varying height, so the band reads as a gallery
 *   rather than another row of product cards.
 * - It scrolls as one continuous strip (native scroll-snap), steered by the
 *   orange drag-progress line alone, rather than paging slide by slide.
 * - The pills filter in place; picking one re-flows the strip and scrolls it
 *   back to the start.
 *
 * Items: { id, title, subtitle, image, href, badge, tags: string[] }
 * Tabs:  { value, label } — `value` matches an entry in an item's `tags`.
 */

/** The glide. Shared by the pill and the tab press feedback (tg-magic-animations §2.1). */
const TAB_SPRING = { type: 'spring', stiffness: 300, damping: 25, mass: 0.8 };
export default function CollectionGallery({
  kicker,
  title,
  subtitle,
  tabs = [],
  items = [],
  viewAllHref,
  viewAllLabel = 'View all',
  bg = 'white',
}) {
  const [active, setActive] = useState('all');
  const reduceMotion = useReducedMotion();
  const parent = staggerParent(reduceMotion);
  const item = riseItem(reduceMotion);
  const scrollerRef = useRef(null);
  // Drag to slide, bounce at the ends, and an imperatively-driven progress
  // line — the same behaviour every other rail on the site has.
  const { trackRef, barRef } = useRail(scrollerRef);

  const filtered = useMemo(
    () => (active === 'all' ? items : items.filter((i) => (i.tags || []).includes(active))),
    [items, active]
  );

  // Jump back to the start whenever the filter changes, otherwise a narrow
  // result set can render entirely off-screen to the left.
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTo({ left: 0, behavior: 'auto' });
  }, [active]);

  const bgClass = { white: 'bg-surface/75', canvas: 'bg-brand-canvas/50', 'canvas-2': 'bg-brand-canvas-2/65' }[bg] || 'bg-brand-canvas/50';

  if (!items.length) return null;

  return (
    <section className={cn('section-y overflow-hidden', bgClass)}>
      <div className="container-custom">
        <div className="mb-6 md:mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Header revealed as a sequence, matching every other band */}
          <motion.div
            className="max-w-2xl"
            variants={parent}
            initial="hidden"
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
          >
            {kicker && (
              <motion.div variants={item}>
                <Kicker className="mb-3 block">{kicker}</Kicker>
              </motion.div>
            )}
            <motion.div variants={item}>
              <SectionRule className="mb-4" />
            </motion.div>
            <motion.h2 variants={item} className="font-poppins font-bold text-h2 text-brand-ink leading-tight">
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p variants={item} className="mt-2 text-brand-muted-ink font-canva-sans text-sm md:text-base leading-relaxed">
                {subtitle}
              </motion.p>
            )}
          </motion.div>

          {/* Filter pills */}
          {tabs.length > 0 && (
            <div
              className="flex flex-wrap gap-2 shrink-0"
              role="tablist"
              aria-label={`Filter ${title}`}
            >
              {[{ value: 'all', label: 'All' }, ...tabs].map((t) => {
                const isActive = active === t.value;
                return (
                  <motion.button
                    key={t.value}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(t.value)}
                    whileHover={reduceMotion ? {} : { scale: 1.02 }}
                    whileTap={reduceMotion ? {} : { scale: 0.97 }}
                    transition={TAB_SPRING}
                    className={cn(
                      // `transition-colors`, not `transition-all`: the transform is
                      // Framer's now, and letting CSS animate it too fights the spring.
                      'relative rounded-full px-4 py-2 text-sm font-poppins font-medium border transition-colors duration-200',
                      isActive
                        ? 'border-brand-orange text-white'
                        : 'bg-surface text-brand-ink border-brand-hairline hover:border-brand-orange/50 hover:text-brand-orange'
                    )}
                  >
                    {/* The sliding indicator. Because it is `absolute inset-0` of
                        whichever tab is active, Framer interpolates its position AND
                        its size between tabs — so it glides and stretches to fit a
                        wider or narrower label rather than cutting. */}
                    {isActive && (
                      <motion.span
                        layoutId={reduceMotion ? undefined : 'activeTabPill'}
                        className="absolute inset-0 rounded-full bg-brand-orange shadow-glow-orange"
                        transition={TAB_SPRING}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{t.label}</span>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* The strip. Bleeds past the container on the right so the next tile peeks. */}
      <div className="relative">
        <div
          ref={scrollerRef}
          // Full-bleed strip padded to the container gutter (.rail-bleed, index.css).
          className={cn(
            'rail-bleed overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2',
            'cursor-grab [&[data-dragging]]:cursor-grabbing',
            '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
          )}
        >
          {/* Two rows, column-flowing: tall tiles span both rows, short ones stack. */}
          <div
            ref={trackRef}
            className="grid grid-flow-col auto-cols-[minmax(230px,1fr)] grid-rows-2 gap-4 md:auto-cols-[minmax(260px,1fr)] will-change-transform"
            style={{ gridTemplateRows: 'repeat(2, 170px)' }}
          >
            {filtered.map((item) => {
              const Tile = item.href ? Link : 'div';
              return (
                <Tile
                  key={item.id}
                  {...(item.href ? { to: item.href } : {})}
                  className={cn(
                    'group relative snap-start overflow-hidden rounded-2xl shadow-soft-sm hover:shadow-soft-lg transition-shadow',
                    item.tall ? 'row-span-2' : 'row-span-1'
                  )}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'linear-gradient(to top, rgb(var(--c-scrim)/0.92) 0%, rgb(var(--c-scrim)/0.75) 35%, rgb(var(--c-scrim)/0.25) 70%, rgb(var(--c-scrim)/0.05) 100%)',
                    }}
                  />

                  {item.badge && (
                    <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-surface/95 backdrop-blur px-2.5 py-1 text-[11px] font-poppins font-semibold text-brand-ink">
                      {item.badge}
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="font-poppins font-bold text-base leading-tight line-clamp-2 text-white">{item.title}</h3>
                    {item.subtitle && (
                      <p className="mt-0.5 text-xs text-white/80 font-canva-sans line-clamp-1">{item.subtitle}</p>
                    )}
                  </div>
                </Tile>
              );
            })}
          </div>
        </div>
      </div>

      {/* Drag progress */}
      <div className="container-custom mt-5 flex items-center gap-4">
        <div className="flex-1 h-1 rounded-full bg-brand-hairline overflow-hidden" aria-hidden="true">
          <div ref={barRef} className="h-full w-1/3 rounded-full bg-brand-orange" />
        </div>

        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="shrink-0 text-sm font-poppins font-semibold text-brand-orange hover:underline"
          >
            {viewAllLabel} →
          </Link>
        )}
      </div>
    </section>
  );
}
