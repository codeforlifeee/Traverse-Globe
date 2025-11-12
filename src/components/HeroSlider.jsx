import { useEffect, useRef, useState } from 'react';

export default function HeroSlider({ images = [], interval = 4000, className = '', children }){
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set([0])); // Preload first image
  const timer = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (!images.length) return;
    timer.current = setInterval(() => {
      if (!hoverRef.current) {
        setIndex(i => {
          const nextIndex = (i + 1) % images.length;
          // Preload next image
          setLoadedImages(prev => new Set([...prev, nextIndex, (nextIndex + 1) % images.length]));
          return nextIndex;
        });
      }
    }, interval);
    return () => clearInterval(timer.current);
  }, [images.length, interval]);

  const go = (dir) => {
    setIndex(i => {
      const n = images.length;
      const nextIndex = (i + (dir === 'next' ? 1 : -1) + n) % n;
      setLoadedImages(prev => new Set([...prev, nextIndex]));
      return nextIndex;
    });
  };

  // Build optimized URL + responsive sets
  const buildBase = (url) => (url || '').split('?')[0];
  const getOptimizedUrl = (url, w = 1280, q = 60) => {
    if (!url) return '';
    const base = buildBase(url);
    if (url.includes('unsplash.com')) {
      return `${base}?auto=format&fit=crop&w=${w}&q=${q}&fm=webp`;
    }
    if (url.includes('pexels.com')) {
      // Pexels: prefer dpr=1, rely on auto=compress
      return `${base}?auto=compress&cs=tinysrgb&w=${w}&fit=crop&dpr=1`;
    }
    return url;
  };

  const getSrcSet = (url) => {
    if (!url) return undefined;
    const widths = [640, 960, 1280, 1600];
    return widths.map((w) => `${getOptimizedUrl(url, w)} ${w}w`).join(', ');
  };

  return (
    <div
      className={`relative w-full select-none ${className}`}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      style={{ contain: 'layout paint' }}
    >
      <div className="relative overflow-hidden rounded-none">
        <div className="w-full h-[260px] md:h-[480px] relative">
          {/* Slides */}
          <div className="absolute inset-0">
            <div
              className="h-full w-full flex transition-transform duration-700"
              style={{ transform: `translateX(-${index * 100}%)`, willChange: 'transform' }}
            >
              {images.map((src, idx) => (
                <div key={idx} className="h-full w-full shrink-0 grow-0 basis-full relative">
                  <img 
                    src={getOptimizedUrl(src, 1280)} 
                    srcSet={getSrcSet(src)}
                    sizes="100vw"
                    alt={`Travel destination ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover" 
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchpriority={idx === 0 ? 'high' : 'auto'}
                    decoding={idx === 0 ? 'sync' : 'async'}
                    crossOrigin="anonymous"
                    onError={(e) => {
                      console.error('Image failed to load:', src);
                      e.target.style.background = '#ddd';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Overlay content */}
          {children && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                {children}
              </div>
            </div>
          )}

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center" onClick={() => go('prev')}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center" onClick={() => go('next')}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </>
          )}

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button key={i} aria-label={`Go to slide ${i+1}`} className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`} onClick={() => setIndex(i)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
