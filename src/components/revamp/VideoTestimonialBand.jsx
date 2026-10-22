import { useState, useRef, useCallback } from 'react';
import { Play, Pause, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/css';
import { useCustomerVideosByRole } from '../../hooks/queries';
import { SkeletonList } from './Skeletons';
import ImageWithFallback from './ImageWithFallback';
import Kicker from './Kicker';
import SectionRule from './SectionRule';

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.style.opacity = '1';
      el.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-surface border border-brand-hairline shadow-soft-sm h-full">
      {/* Video / poster area */}
      <div
        className="relative aspect-[4/3] overflow-hidden cursor-pointer group bg-brand-canvas"
        onClick={toggle}
      >
        {/* Poster — always visible until video plays */}
        <ImageWithFallback
          src={video.poster}
          alt={video.title || video.customerName || 'Video testimonial'}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Video — invisible until played */}
        {video.videoUrl && (
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: playing ? 1 : 0 }}
            playsInline
            controls={playing}
            preload="metadata"
            onEnded={() => setPlaying(false)}
          />
        )}

        {/* Play/Pause button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-soft-md transition-colors duration-200 ${playing ? 'bg-surface/80 group-hover:bg-surface' : 'bg-surface/90 group-hover:bg-brand-orange group-hover:text-white'}`}>
            {playing
              ? <Pause className="w-5 h-5 text-brand-ink" />
              : <Play className="w-5 h-5 text-brand-ink group-hover:text-white ml-0.5" />
            }
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-4 md:p-5 gap-2">
        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {[0,1,2,3,4].map((i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote */}
        {video.quote && (
          <p className="font-season text-sm md:text-base text-brand-ink italic leading-relaxed line-clamp-3">
            "{video.quote}"
          </p>
        )}

        {/* Customer info */}
        <div className="mt-auto pt-3 border-t border-brand-hairline">
          {video.customerName && (
            <p className="text-sm font-poppins font-semibold text-brand-ink">
              {video.customerName}
            </p>
          )}
          {video.destination && (
            <p className="text-kicker uppercase text-brand-muted-ink mt-0.5">
              {video.destination}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function VideoTestimonialBand() {
  const { data: videos = [], isPending } = useCustomerVideosByRole('testimonial', 6);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNav = useCallback((sw) => {
    if (!sw) return;
    setIsBeginning(sw.isBeginning);
    setIsEnd(sw.isEnd);
  }, []);

  if (isPending) {
    return (
      <section className="section-padding bg-surface/75">
        <div className="container-custom">
          <SkeletonList count={3} columns={3} />
        </div>
      </section>
    );
  }

  if (!videos.length) return null;

  return (
    <section className="section-padding bg-surface/75">
      <div className="container-custom">
        {/* Section header */}
        <div className="mb-6 md:mb-8 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Kicker>Heard From Our Travelers</Kicker>
            <SectionRule />
            <h2 className="text-h2 font-poppins font-bold text-brand-ink mt-3">
              Watch what they say
            </h2>
            <p className="mt-2 text-sm md:text-base text-brand-muted-ink font-canva-sans max-w-xl">
              Short clips from families who traveled with us — unscripted, unedited.
            </p>
          </div>

          {/* Arrows — desktop only, header-aligned */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-hairline bg-surface text-brand-ink transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white hover:shadow-glow-orange disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface disabled:hover:text-brand-ink disabled:hover:border-brand-hairline disabled:hover:shadow-none"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-hairline bg-surface text-brand-ink transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white hover:shadow-glow-orange disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface disabled:hover:text-brand-ink disabled:hover:border-brand-hairline disabled:hover:shadow-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[A11y]}
          onSwiper={(sw) => {
            swiperRef.current = sw;
            updateNav(sw);
          }}
          onSlideChange={updateNav}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          spaceBetween={16}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          a11y={{ prevSlideMessage: 'Previous video', nextSlideMessage: 'Next video' }}
          className="!overflow-visible"
        >
          {videos.map((v) => (
            <SwiperSlide key={v._id} className="h-auto">
              <VideoCard video={v} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
