/**
 * Sanity Client Configuration
 * This file sets up the Sanity client for fetching data from Sanity CMS
 */

// Client-side service now uses same-origin API routes to avoid CORS.
// If you need direct Sanity access, prefer server-side via /api endpoints.
export const sanityClient = null;

/**
 * Fetch all packages from Sanity
 * @param {Object} options - Query options
 * @param {string} options.category - Filter by category (optional)
 * @param {number} options.limit - Limit results (optional)
 * @param {boolean} options.featured - Filter featured packages (optional)
 * @returns {Promise<Array>} Array of package objects
 */
export async function fetchPackages(options = {}) {
  const { category, limit, featured } = options;
  
  try {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (featured) params.set('featured', 'true');
    if (limit) params.set('limit', String(limit));
    const res = await fetch(`/api/packages?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch packages');
    return await res.json();
  } catch (error) {
    console.error('Error fetching packages from Sanity:', error);
    return [];
  }
}

/**
 * Fetch a single package by ID
 * @param {number} id - Package ID
 * @returns {Promise<Object|null>} Package object or null
 */
export async function fetchPackageById(id) {
  try {
    const res = await fetch(`/api/packages?id=${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Failed to fetch package by id');
    return await res.json();
  } catch (error) {
    console.error(`Error fetching package with ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetch a single package by slug
 * @param {string} slug - Package slug
 * @returns {Promise<Object|null>} Package object or null
 */
export async function fetchPackageBySlug(slug) {
  try {
    const res = await fetch(`/api/packages?slug=${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error('Failed to fetch package by slug');
    return await res.json();
  } catch (error) {
    console.error(`Error fetching package with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch packages by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of package objects
 */
export async function fetchPackagesByCategory(category) {
  return fetchPackages({ category });
}

/**
 * Fetch all destinations
 * @param {string} type - 'international' or 'domestic' (optional)
 * @returns {Promise<Array>} Array of destination objects
 */
export async function fetchDestinations(type = null) {
  try {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    const res = await fetch(`/api/destinations?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch destinations');
    return await res.json();
  } catch (error) {
    console.error('Error fetching destinations from Sanity:', error);
    return [];
  }
}

/**
 * Fetch international destinations
 * @returns {Promise<Array>} Array of international destination objects
 */
export async function fetchInternationalDestinations() {
  return fetchDestinations('international');
}

/**
 * Fetch domestic destinations
 * @returns {Promise<Array>} Array of domestic destination objects
 */
export async function fetchDomesticDestinations() {
  return fetchDestinations('domestic');
}

/**
 * Fetch banners by category
 * @param {string} category - Category name (e.g., 'uae', 'bali', 'general')
 * @returns {Promise<Array>} Array of banner image URLs
 */
export async function fetchBanners(category = 'general') {
  try {
    const params = new URLSearchParams({ category });
    const res = await fetch(`/api/banners?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch banners');
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error(`Error fetching banners for category ${category}:`, error);
    return [];
  }
}

/**
 * Fetch all banners grouped by category
 * @returns {Promise<Object>} Object with categories as keys and banner arrays as values
 */
export async function fetchAllBanners() {
  try {
    const res = await fetch('/api/banners?all=true');
    if (!res.ok) throw new Error('Failed to fetch all banners');
    return await res.json();
  } catch (error) {
    console.error('Error fetching all banners:', error);
    return {};
  }
}

/**
 * Search packages by keyword
 * @param {string} keyword - Search keyword
 * @returns {Promise<Array>} Array of matching package objects
 */
export async function searchPackages(keyword) {
  const query = `*[_type == "package" && active == true && (
    title match "${keyword}*" ||
    destination match "${keyword}*" ||
    category match "${keyword}*" ||
    overview match "${keyword}*"
  )] | order(rating desc)`;
  
  try {
    const results = await sanityClient.fetch(query);
    return results;
  } catch (error) {
    console.error('Error searching packages:', error);
    return [];
  }
}

/**
 * Fetch featured packages for homepage
 * @param {number} limit - Number of packages to fetch
 * @returns {Promise<Array>} Array of featured package objects
 */
export async function fetchFeaturedPackages(limit = 6) {
  return fetchPackages({ featured: true, limit });
}

/**
 * Fetch packages with filters
 * @param {Object} filters - Filter options
 * @param {string[]} filters.categories - Array of categories
 * @param {number} filters.minPrice - Minimum price
 * @param {number} filters.maxPrice - Maximum price
 * @param {number} filters.minRating - Minimum rating
 * @returns {Promise<Array>} Array of filtered package objects
 */
export async function fetchPackagesWithFilters(filters = {}) {
  const { categories, minPrice, maxPrice, minRating } = filters;
  
  try {
    const params = new URLSearchParams();
    if (categories?.length) params.set('categories', categories.join(','));
    if (minPrice !== undefined) params.set('minPrice', String(minPrice));
    if (maxPrice !== undefined) params.set('maxPrice', String(maxPrice));
    if (minRating !== undefined) params.set('minRating', String(minRating));
    const res = await fetch(`/api/packages?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch filtered packages');
    return await res.json();
  } catch (error) {
    console.error('Error fetching packages with filters:', error);
    return [];
  }
}

/**
 * Get package statistics
 * @returns {Promise<Object>} Statistics object
 */
export async function getPackageStats() {
  try {
    const [packagesRes, destinationsRes, avgRes] = await Promise.all([
      fetch('/api/packages?count=true'),
      fetch('/api/destinations?count=true'),
      fetch('/api/packages?avgRating=true'),
    ]);
    const totalPackages = packagesRes.ok ? await packagesRes.json() : 0;
    const totalDestinations = destinationsRes.ok ? await destinationsRes.json() : 0;
    const avgRating = avgRes.ok ? await avgRes.json() : 0;
    return {
      totalPackages,
      totalDestinations,
      avgRating: Number(avgRating)?.toFixed(1) || 0,
    };
  } catch (error) {
    console.error('Error fetching package stats:', error);
    return {
      totalPackages: 0,
      totalDestinations: 0,
      avgRating: 0
    };
  }
}

// Export default client for custom queries
export default sanityClient;
