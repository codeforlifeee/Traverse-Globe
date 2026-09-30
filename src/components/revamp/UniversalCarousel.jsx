import { useRef, useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import Kicker from './Kicker';
import SectionRule from './SectionRule';
import { cn } from '@/lib/utils';

/**
 * UniversalCarousel — one carousel for every horizontal slider on the landing page.
 *
 * - Custom arrows sit BESIDE the section heading (not floating over cards).
 * - Header-aligned on desktop, hidden on mobile (swipe + peek instead).
 * - Peeks the next card so users know there's more.
 * - Consistent kicker + title + subtitle stack (DESIGN.md signature motif).
 */
export default function UniversalCarousel({
  kicker,
  title,
  subtitle,
  bg = 'white',
  slidesPerViewDesktop = 4,
  autoplay = false,
  loop = false,
  children,
  className,
}) {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNav = useCallback((sw) => {
    if (!sw) return;
    setIsBeginning(sw.isBeginning);
    setIsEnd(sw.isEnd);
  }, []);

  useEffect(() => {
    if (swiperRef.current) updateNav(swiperRef.current);
  }, [children, updateNav]);

  const bgClass = {
    white: 'bg-white',
    canvas: 'bg-brand-canvas',
    'canvas-2': 'bg-brand-canvas-2',
  }[bg] || 'bg-white';

  return (
    <section className={cn('py-12 md:py-16 lg:py-20', bgClass, className)}>
      <div className="container-custom">
        {/* Header row: kicker/title/subtitle on left, arrows on right */}
        <div className="mb-8 md:mb-10 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            {kicker && <Kicker className="mb-3 block">{kicker}</Kicker>}
            <SectionRule className="mb-4" />
            <h2 className="font-poppins font-bold text-h2 text-brand-ink leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-brand-muted-ink font-canva-sans text-sm md:text-base leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Arrows — desktop only, header-aligned */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning && !loop}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-hairline bg-white text-brand-ink transition-all',
                'hover:border-brand-orange hover:bg-brand-orange hover:text-white hover:shadow-glow-orange',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-brand-ink disabled:hover:border-brand-hairline disabled:hover:shadow-none'
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd && !loop}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-hairline bg-white text-brand-ink transition-all',
                'hover:border-brand-orange hover:bg-brand-orange hover:text-white hover:shadow-glow-orange',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-brand-ink disabled:hover:border-brand-hairline disabled:hover:shadow-none'
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* The slider — peek next card via slidesOffsetAfter */}
        <Swiper
          modules={[Autoplay, A11y]}
          onSwiper={(sw) => {
            swiperRef.current = sw;
            updateNav(sw);
          }}
          onSlideChange={updateNav}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          spaceBetween={16}
          slidesPerView={1.15}
          loop={loop}
          autoplay={
            autoplay
              ? { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          breakpoints={{
            640: { slidesPerView: 2.15, spaceBetween: 18 },
            768: { slidesPerView: Math.min(3, slidesPerViewDesktop), spaceBetween: 20 },
            1024: { slidesPerView: slidesPerViewDesktop, spaceBetween: 22 },
            1280: { slidesPerView: slidesPerViewDesktop, spaceBetween: 24 },
          }}
          className="!overflow-visible"
        >
          {Array.isArray(children)
            ? children.map((child, i) => (
                <SwiperSlide key={i} className="!h-auto">
                  {child}
                </SwiperSlide>
              ))
            : (
                <SwiperSlide className="!h-auto">{children}</SwiperSlide>
              )}
        </Swiper>
      </div>
    </section>
  );
}
