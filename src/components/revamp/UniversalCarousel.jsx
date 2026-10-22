import { Children, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { REVEAL_VIEWPORT, riseItem, staggerParent } from '@/lib/motionVariants';
import Kicker from './Kicker';
import SectionRule from './SectionRule';
import { useRail } from '@/hooks/useRail';
import { cn } from '@/lib/utils';

/**
 * UniversalCarousel — one carousel for every horizontal card band on the site.
 *
 * Built on a native scroll-snap rail rather than Swiper. Swiper initialises by
 * measuring its container, and these bands live inside the home page's
 * `content-visibility: auto` wrappers, where the subtree is not laid out until
 * it scrolls into view — so the band could come up locked and refuse to move.
 * The two rails that were always reliable (CollectionGallery, FeedbackSection)
 * are native scrollers, so all four now share that mechanism, and all four share
 * one behaviour hook: drag to slide, bounce at the ends, orange progress line.
 *
 * - No arrow buttons. They competed with the heading and were desktop-only.
 * - Drag with a mouse, swipe on touch, or scroll with a trackpad.
 * - Pushing past either end recoils, so it's obvious the cards have run out.
 *
 * The rail runs full-bleed to the right edge of the screen (`.rail-bleed` in
 * index.css), like CollectionGallery and the reviews band: its first card lines
 * up with the heading, the rest continue past the container instead of being
 * clipped at it.
 *
 * `slidesPerViewDesktop` drives the card width through a `--per` CSS variable,
 * which Tailwind sets per breakpoint. A fractional count on small screens peeks
 * the next card so there is a visible hint that the rail scrolls.
 */
export default function UniversalCarousel({
  kicker,
  title,
  subtitle,
  bg = 'white',
  slidesPerViewDesktop = 4,
  viewAllHref,
  viewAllLabel = 'View all',
  children,
  className,
}) {
  const scrollerRef = useRef(null);
  const { trackRef, barRef } = useRail(scrollerRef);
  const reduceMotion = useReducedMotion();
  const parent = staggerParent(reduceMotion);
  const item = riseItem(reduceMotion);

  const bgClass = {
    white: 'bg-surface/75',
    canvas: 'bg-brand-canvas/50',
    'canvas-2': 'bg-brand-canvas-2/65',
    transparent: 'bg-transparent',
  }[bg] || 'bg-brand-canvas/50';

  const items = Children.toArray(children);

  return (
    <section className={cn('section-y', bgClass, className)}>
      <div className="container-custom">
        {/* Header row: kicker/title/subtitle, revealed as a sequence */}
        <motion.div
          className="mb-6 md:mb-8 max-w-2xl"
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
      </div>

      {/* The rail. Full section width, padded to the container gutter. The track's
          width is the scroller minus that padding — exactly the container's content
          width — so card widths (a % of the track) are unchanged by the bleed. */}
      <div
          ref={scrollerRef}
          className={cn(
            'rail-bleed',
            'overflow-x-auto overscroll-x-contain snap-x snap-mandatory',
            'cursor-grab [&[data-dragging]]:cursor-grabbing',
            '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
            'pb-2'
          )}
        >
          <div
            ref={trackRef}
            style={{ '--per-desktop': slidesPerViewDesktop, '--rail-gap': '1.25rem' }}
            className={cn(
              'flex gap-5 will-change-transform',
              '[--per:1.15] sm:[--per:2.15] md:[--per:3] lg:[--per:var(--per-desktop)]'
            )}
          >
            {items.map((child, i) => (
              <div
                key={i}
                className="shrink-0 snap-start"
                style={{ flexBasis: 'calc((100% - (var(--per) - 1) * var(--rail-gap)) / var(--per))' }}
              >
                {child}
              </div>
            ))}
          </div>
      </div>

      <div className="container-custom">
        {/* Drag progress line — the only control the band needs */}
        <div className="mt-5 flex items-center gap-4">
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
      </div>
    </section>
  );
}
