import { useState, useEffect, useRef } from 'react';

/**
 * OptimizedImage component with instant loading, blur-up placeholder,
 * and aggressive caching for blazing-fast performance
 */
export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchpriority = 'auto',
  sizes,
  onLoad,
  onError,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Extract base URL and check image source
  const isUnsplash = src?.includes('unsplash.com');
  const isPexels = src?.includes('pexels.com');
  
  // Generate tiny blur placeholder (10px width)
  const getBlurPlaceholder = () => {
    if (!src) return '';
    if (isUnsplash) {
      const baseUrl = src.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&w=10&q=10&blur=50`;
    }
    if (isPexels) {
      const baseUrl = src.split('?')[0];
      return `${baseUrl}?auto=compress&cs=tinysrgb&w=10&fit=crop`;
    }
    return '';
  };
  
  // Generate responsive images with lower quality for faster loading
  // Optimized: reduced max width to 800px and quality to 50 for better performance
  const getSrcSet = () => {
    if (!src) return undefined;
    
    if (isUnsplash) {
      const baseUrl = src.split('?')[0];
      const widths = [400, 600, 800];
      return widths
        .map(w => `${baseUrl}?auto=format&fit=crop&w=${w}&q=50&fm=webp ${w}w`)
        .join(', ');
    }
    
    if (isPexels) {
      const baseUrl = src.split('?')[0];
      const widths = [400, 600, 800];
      return widths
        .map(w => `${baseUrl}?auto=compress&cs=tinysrgb&w=${w}&fit=crop&dpr=1&fm=webp ${w}w`)
        .join(', ');
    }
    
    return undefined;
  };

  // Optimize src with quality parameter - reduced to q=50 for faster loading + WebP format
  const getOptimizedSrc = () => {
    if (!src) return '';
    
    // Unsplash optimization - reduce quality to 50 and request WebP
    if (isUnsplash) {
      const baseUrl = src.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&w=800&q=50&fm=webp`;
    }
    
    // Pexels optimization - ensure proper params and request WebP if supported
    if (isPexels) {
      let optimized = src.replace(/w=\d+/, 'w=800').replace(/&dpr=\d+/, '&dpr=1');
      // Pexels auto-delivers WebP when requested via auto=compress
      return optimized;
    }
    
    return src;
  };

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  // Preload image on mount if it's high priority
  useEffect(() => {
    if (fetchpriority === 'high' && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getOptimizedSrc();
      document.head.appendChild(link);
      return () => document.head.removeChild(link);
    }
  }, [src, fetchpriority]);

  const blurPlaceholder = getBlurPlaceholder();

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Ultra-low quality blur placeholder for instant perceived load */}
      {!isLoaded && !hasError && blurPlaceholder && (
        <img
          src={blurPlaceholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
          style={{ filter: 'blur(20px)' }}
          aria-hidden="true"
        />
      )}
      
      {/* Gradient overlay during loading for better aesthetics */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}
      
      {/* Main image with instant decode */}
      {!hasError && (
        <img
          ref={imgRef}
          src={getOptimizedSrc()}
          srcSet={getSrcSet()}
          sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
          alt={alt}
          loading={loading}
          fetchpriority={fetchpriority}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          crossOrigin="anonymous"
          className={`relative w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          width={width}
          height={height}
          {...props}
        />
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Image unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
}
