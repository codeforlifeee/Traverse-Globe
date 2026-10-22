import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { useCustomerVideosByRole } from '../../hooks/queries';
import ImageWithFallback from './ImageWithFallback';
import Kicker from './Kicker';

export default function VideoHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const { data: heroVideos = [], isPending } = useCustomerVideosByRole('hero', 1);
  const video = heroVideos[0] || null;

  // Lazy-load video only when section scrolls into view, and only on non-mobile
  useEffect(() => {
    if (!video || !videoRef.current || !sectionRef.current) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.load();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [video]);

  if (isPending || !video) return null;

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const waUrl = `https://wa.me/${import.meta.env?.VITE_WHATSAPP_NUMBER || '919999999999'}`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-scrim"
      style={{ minHeight: '320px', maxHeight: '560px', aspectRatio: '16/9' }}
    >
      {/* Poster image — always visible base layer */}
      <ImageWithFallback
        src={video.poster}
        alt={video.title || 'Trip footage'}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Video — desktop only, loads lazily via IntersectionObserver */}
      {!isMobile && video.videoUrl && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        >
          <source src={video.videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Dark gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-scrim/80 via-brand-scrim/25 to-transparent" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 md:pb-14 px-4 text-center">
        <Kicker tone="orange" size="lg" className="text-white/90 mb-2">
          See the world through our travelers
        </Kicker>

        {video.title && (
          <p className="font-season text-2xl md:text-3xl lg:text-4xl text-white max-w-2xl leading-tight mb-6">
            {video.title}
          </p>
        )}

        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-poppins font-semibold text-sm px-5 py-2.5 rounded-full shadow-soft-md transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Plan a trip like this
        </a>
      </div>
    </section>
  );
}
