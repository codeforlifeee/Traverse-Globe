import { useState, useEffect, useRef } from 'react';

/**
 * OptimizedImage component with lazy loading, modern format support,
 * and responsive images for better performance
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
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef(null);
  const maxRetries = 2;

  // Extract base URL and check if it's from Unsplash
  const isUnsplash = src?.includes('unsplash.com');
  
  // Generate responsive images for Unsplash
  const getSrcSet = () => {
    if (!isUnsplash || !src) return undefined;
    
    const baseUrl = src.split('?')[0];
    const widths = [640, 750, 828, 1080, 1200, 1920];
    
    return widths
      .map(w => `${baseUrl}?auto=format&fit=crop&w=${w}&q=80 ${w}w`)
      .join(', ');
  };

  // Optimize src with quality parameter
  const getOptimizedSrc = () => {
    if (!src) return '';
    if (isUnsplash && !src.includes('q=')) {
      return `${src}${src.includes('?') ? '&' : '?'}auto=format&fit=crop&q=80`;
    }
    return src;
  };

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    // Retry loading the image up to maxRetries times
    if (retryCount < maxRetries) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        if (imgRef.current) {
          imgRef.current.src = getOptimizedSrc();
        }
      }, 1000 * (retryCount + 1)); // Exponential backoff
    } else {
      setHasError(true);
      onError?.(e);
    }
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Main image */}
      {!hasError && (
        <img
          ref={imgRef}
          src={getOptimizedSrc()}
          srcSet={getSrcSet()}
          sizes={sizes || '100vw'}
          alt={alt}
          loading={loading}
          fetchpriority={fetchpriority}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          width={width}
          height={height}
          {...props}
        />
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
}
