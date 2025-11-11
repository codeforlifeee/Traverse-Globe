/**
 * Unsplash Image Loader with Error Handling
 * Handles network failures and provides fallback options
 */

class UnsplashImageLoader {
  constructor() {
    this.retryAttempts = 3;
    this.retryDelay = 1000;
    this.cache = new Map();
  }

  /**
   * Load image with retry logic
   */
  async loadImage(url, options = {}) {
    const { retries = this.retryAttempts, onProgress } = options;
    
    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        onProgress?.({ attempt: attempt + 1, total: retries });
        
        const response = await fetch(url, {
          mode: 'cors',
          credentials: 'omit',
          cache: 'force-cache'
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        
        // Cache the result
        this.cache.set(url, objectUrl);
        
        return objectUrl;
      } catch (error) {
        console.warn(`Attempt ${attempt + 1}/${retries} failed for ${url}:`, error.message);
        
        if (attempt < retries - 1) {
          // Wait before retrying with exponential backoff
          await new Promise(resolve => 
            setTimeout(resolve, this.retryDelay * Math.pow(2, attempt))
          );
        } else {
          // All attempts failed
          throw error;
        }
      }
    }
  }

  /**
   * Preload critical images
   */
  async preloadImages(urls) {
    const promises = urls.map(url => 
      this.loadImage(url).catch(err => {
        console.error(`Failed to preload ${url}:`, err);
        return null;
      })
    );
    
    return Promise.all(promises);
  }

  /**
   * Clear cache
   */
  clearCache() {
    // Revoke object URLs to free memory
    for (const url of this.cache.values()) {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    }
    this.cache.clear();
  }

  /**
   * Get optimized Unsplash URL
   */
  getOptimizedUrl(baseUrl, options = {}) {
    const {
      width = 800,
      quality = 80,
      format = 'auto',
      fit = 'crop'
    } = options;

    const url = new URL(baseUrl);
    url.searchParams.set('auto', format);
    url.searchParams.set('fit', fit);
    url.searchParams.set('w', width);
    url.searchParams.set('q', quality);

    return url.toString();
  }
}

// Create singleton instance
const unsplashLoader = new UnsplashImageLoader();

// Export for use in components
export default unsplashLoader;

// Clean up on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    unsplashLoader.clearCache();
  });
}
