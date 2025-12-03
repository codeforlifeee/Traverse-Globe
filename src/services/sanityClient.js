/**
 * Sanity Client Configuration
 * This file sets up the Sanity client for fetching data from Sanity CMS
 */

import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// Initialize Sanity client
const sanityClient = createClient({
  projectId: import.meta.env?.VITE_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env?.VITE_SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env?.VITE_SANITY_API_VERSION || process.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Disable CDN to get fresh data immediately from Sanity
  perspective: 'published', // Only fetch published documents
  // Note: token is intentionally omitted for browser security (read-only access)
  // If you need write access, use a server-side endpoint instead
});

// Initialize image URL builder
const builder = createImageUrlBuilder(sanityClient);

/**
 * Helper function to generate optimized image URLs
 * @param {Object} source - Image reference from Sanity
 * @returns {Object} Image URL builder
 */
export const urlFor = (source) => {
  return builder.image(source);
};

export { sanityClient };

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
    
    const data = await sanityClient.fetch(query);
    return data || [];
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
    const query = `*[_type == "package" && active == true && id == ${Number(id)}][0]`;
    const data = await sanityClient.fetch(query);
    return data || null;
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
    const query = `*[_type == "package" && active == true && slug.current == "${slug}"][0]`;
    const data = await sanityClient.fetch(query);
    return data || null;
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
    let query = '*[_type == "destination" && active == true';
    if (type) {
      query += ` && type == "${type}"`;
    }
    query += '] | order(order asc)';
    
    const data = await sanityClient.fetch(query);
    return data || [];
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
    const query = `*[_type == "banner" && category == "${category}" && active == true][0].images`;
    const images = await sanityClient.fetch(query);
    return images || [];
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
    const query = '*[_type == "banner" && active == true]';
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
    return results || [];
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
    let query = '*[_type == "package" && active == true';
    
    if (categories?.length) {
      const categoryConditions = categories.map(cat => `category == "${cat}"`).join(' || ');
      query += ` && (${categoryConditions})`;
    }
    
    if (minPrice !== undefined) {
      query += ` && price >= ${Number(minPrice)}`;
    }
    
    if (maxPrice !== undefined) {
      query += ` && price <= ${Number(maxPrice)}`;
    }
    
    if (minRating !== undefined) {
      query += ` && rating >= ${Number(minRating)}`;
    }
    
    query += '] | order(publishedAt desc)';
    
    const data = await sanityClient.fetch(query);
    return data || [];
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
    const [totalPackages, totalDestinations, avgRating] = await Promise.all([
      sanityClient.fetch('count(*[_type == "package" && active == true])'),
      sanityClient.fetch('count(*[_type == "destination" && active == true])'),
      sanityClient.fetch('math::avg(*[_type == "package" && active == true].rating)'),
    ]);
    return {
      totalPackages: totalPackages || 0,
      totalDestinations: totalDestinations || 0,
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

/**
 * Fetch all hotels from Sanity
 * @param {Object} options - Query options
 * @param {string} options.category - Filter by category (optional)
 * @param {number} options.limit - Limit results (optional)
 * @param {boolean} options.featured - Filter featured hotels (optional)
 * @returns {Promise<Array>} Array of hotel objects
 */
export async function fetchHotels(options = {}) {
  const { category, limit, featured } = options;
  
  try {
    let query = '*[_type == "hotel" && active == true';
    
    if (category) {
      query += ` && category == "${category}"`;
    }
    
    if (featured) {
      query += ' && featured == true';
    }
    
    query += '] | order(_createdAt desc)';
    
    if (limit) {
      query += `[0...${limit}]`;
    }
    
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (error) {
    console.error('Error fetching hotels from Sanity:', error);
    return [];
  }
}

/**
 * Fetch hotels by category
 * @param {string} category - Category name (domestic/international/budget/luxury/business/resort)
 * @returns {Promise<Array>} Array of hotel objects
 */
export async function fetchHotelsByCategory(category) {
  return fetchHotels({ category });
}

/**
 * Fetch a single hotel by slug
 * @param {string} category - Hotel category
 * @param {string} slug - Hotel slug
 * @returns {Promise<Object|null>} Hotel object or null
 */
export async function fetchHotelBySlug(category, slug) {
  try {
    const query = `*[_type == "hotel" && active == true && category == "${category}" && slug.current == "${slug}"][0]`;
    const data = await sanityClient.fetch(query);
    return data || null;
  } catch (error) {
    console.error(`Error fetching hotel with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch featured hotels
 * @param {number} limit - Number of hotels to fetch
 * @returns {Promise<Array>} Array of featured hotel objects
 */
export async function fetchFeaturedHotels(limit = 6) {
  return fetchHotels({ featured: true, limit });
}

/**
 * Search hotels by keyword
 * @param {string} keyword - Search keyword
 * @returns {Promise<Array>} Array of matching hotel objects
 */
export async function searchHotels(keyword) {
  const query = `*[_type == "hotel" && active == true && (
    name match "${keyword}*" ||
    location match "${keyword}*" ||
    city match "${keyword}*" ||
    country match "${keyword}*" ||
    category match "${keyword}*" ||
    description match "${keyword}*"
  )] | order(rating desc)`;
  
  try {
    const results = await sanityClient.fetch(query);
    return results || [];
  } catch (error) {
    console.error('Error searching hotels:', error);
    return [];
  }
}

// Export default client for custom queries
export default sanityClient;
