/**
 * Sanity Client Configuration
 * This file sets up the Sanity client for fetching data from Sanity CMS
 */

import { createClient } from '@sanity/client';

// Create Sanity client instance with real-time updates
export const sanityClient = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  useCdn: false, // Set to false to always get fresh data (no CDN caching)
  apiVersion: '2024-01-01',
  perspective: 'published', // Only fetch published documents
  stega: {
    enabled: false,
  },
  // Token is not needed for public read operations
  // token: 'YOUR_TOKEN_HERE' // Only needed for write operations
});

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
  
  let query = '*[_type == "package" && active == true';
  
  if (category) {
    query += ` && category == "${category}"`;
  }
  
  if (featured) {
    query += ' && featured == true';
  }
  
  query += '] | order(publishedAt desc)';
  
  if (limit) {
    query += `[0...${limit}]`;
  }
  
  try {
    const packages = await sanityClient.fetch(query);
    return packages;
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
  const query = `*[_type == "package" && id == ${id} && active == true][0]`;
  
  try {
    const packageData = await sanityClient.fetch(query);
    return packageData;
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
  const query = `*[_type == "package" && slug.current == "${slug}" && active == true][0]`;
  
  try {
    const packageData = await sanityClient.fetch(query);
    return packageData;
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
  let query = '*[_type == "destination" && active == true';
  
  if (type) {
    query += ` && type == "${type}"`;
  }
  
  query += '] | order(order asc)';
  
  try {
    const destinations = await sanityClient.fetch(query);
    return destinations;
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
  const query = `*[_type == "banner" && category == "${category}" && active == true][0].images`;
  
  try {
    const banners = await sanityClient.fetch(query);
    return banners || [];
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
  const query = '*[_type == "banner" && active == true]';
  
  try {
    const bannersData = await sanityClient.fetch(query);
    const bannersByCategory = {};
    
    bannersData.forEach(banner => {
      bannersByCategory[banner.category] = banner.images || [];
    });
    
    return bannersByCategory;
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
  
  let conditions = ['_type == "package"', 'active == true'];
  
  if (categories && categories.length > 0) {
    const categoryCondition = categories.map(cat => `category == "${cat}"`).join(' || ');
    conditions.push(`(${categoryCondition})`);
  }
  
  if (minPrice !== undefined) {
    conditions.push(`price >= ${minPrice}`);
  }
  
  if (maxPrice !== undefined) {
    conditions.push(`price <= ${maxPrice}`);
  }
  
  if (minRating !== undefined) {
    conditions.push(`rating >= ${minRating}`);
  }
  
  const query = `*[${conditions.join(' && ')}] | order(rating desc, price asc)`;
  
  try {
    const packages = await sanityClient.fetch(query);
    return packages;
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
    const totalPackages = await sanityClient.fetch('count(*[_type == "package" && active == true])');
    const totalDestinations = await sanityClient.fetch('count(*[_type == "destination" && active == true])');
    const avgRating = await sanityClient.fetch('math::avg(*[_type == "package" && active == true].rating)');
    
    return {
      totalPackages,
      totalDestinations,
      avgRating: avgRating?.toFixed(1) || 0
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
