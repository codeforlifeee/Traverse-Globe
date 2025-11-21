// Cache Service
// Provides in-memory caching to reduce API calls
// Useful for both development and production

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes default

/**
 * Get cached data by key
 * @param {string} key - Cache key
 * @returns {any|null} Cached data or null if expired/not found
 */
export function getCached(key) {
  const item = cache.get(key);
  
  if (!item) {
    return null;
  }
  
  // Check if cache has expired
  if (Date.now() - item.timestamp > item.duration) {
    cache.delete(key);
    return null;
  }
  
  return item.data;
}

/**
 * Set cache data
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} duration - Cache duration in milliseconds (default: 5 minutes)
 */
export function setCache(key, data, duration = CACHE_DURATION) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    duration
  });
}

/**
 * Clear specific cache key
 * @param {string} key - Cache key to clear
 */
export function clearCacheKey(key) {
  cache.delete(key);
}

/**
 * Clear all cache
 */
export function clearAllCache() {
  cache.clear();
}

/**
 * Get cache statistics
 * @returns {Object} Cache stats
 */
export function getCacheStats() {
  const now = Date.now();
  let valid = 0;
  let expired = 0;
  
  cache.forEach((item) => {
    if (now - item.timestamp > item.duration) {
      expired++;
    } else {
      valid++;
    }
  });
  
  return {
    total: cache.size,
    valid,
    expired
  };
}

/**
 * Cleanup expired cache entries
 */
export function cleanupCache() {
  const now = Date.now();
  const keysToDelete = [];
  
  cache.forEach((item, key) => {
    if (now - item.timestamp > item.duration) {
      keysToDelete.push(key);
    }
  });
  
  keysToDelete.forEach(key => cache.delete(key));
  
  return keysToDelete.length;
}

/**
 * Wrapper function to cache async operations
 * @param {string} key - Cache key
 * @param {Function} fn - Async function to execute and cache
 * @param {number} duration - Cache duration (optional)
 * @returns {Promise<any>} Function result
 */
export async function withCache(key, fn, duration = CACHE_DURATION) {
  // Check cache first
  const cached = getCached(key);
  if (cached !== null) {
    return cached;
  }
  
  // Execute function and cache result
  try {
    const result = await fn();
    setCache(key, result, duration);
    return result;
  } catch (error) {
    // Don't cache errors
    throw error;
  }
}

// Auto-cleanup expired cache every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    const cleaned = cleanupCache();
    if (cleaned > 0) {
      console.log(`[Cache] Cleaned ${cleaned} expired entries`);
    }
  }, 10 * 60 * 1000);
}

export default {
  getCached,
  setCache,
  clearCacheKey,
  clearAllCache,
  getCacheStats,
  cleanupCache,
  withCache
};
