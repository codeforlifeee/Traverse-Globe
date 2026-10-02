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
  useCdn: import.meta.env?.PROD ?? (process.env.NODE_ENV === 'production'),
  perspective: 'published', // Only fetch published documents
  stega: false, // Visual Editing is unused - drops the stega encoder from the bundle
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

/* ------------------------------------------------------------------ *
 * Projections
 *
 * Queries are projected so listings stop downloading fields nothing renders.
 * `slug` stays a raw Sanity object because every consumer reads `slug?.current`.
 * ------------------------------------------------------------------ */

/**
 * Everything a package card or listing row renders.
 * Omits overview, exclusions, highlights and images entirely, and strips the long
 * per-day `description` from the itinerary while keeping the array length intact so
 * PackageCard's "N days" count stays correct.
 */
const PACKAGE_CARD = `
  _id, id, slug, category, title, price, strikePrice, destination, duration,
  rating, reviews, bannerImage, themes, urgency, savingsPercent,
  freeCancellationDays, featured, publishedAt,
  "itinerary": { "days": itinerary.days[]{ dayKey, title } },
  inclusions,
  hotels
`;

/** Hotel card fields. Omits gallery, roomTypes, policies and nearbyAttractions. */
const HOTEL_CARD = `
  _id, name, slug, category, location, city, country, rating, reviewRating,
  reviewCount, price, originalPrice, image, amenities, featured
`;

/** Projection suffix: '' returns the whole document, used by detail pages. */
const proj = (fields) => (fields === 'full' ? '' : ` { ${fields} }`);

/**
 * Fetch all packages from Sanity
 * @param {Object} options - Query options
 * @param {string} options.category - Filter by category (optional)
 * @param {number} options.limit - Limit results (optional)
 * @param {boolean} options.featured - Filter featured packages (optional)
 * @param {'card'|'full'} options.fields - 'card' (default) projects listing fields only
 * @returns {Promise<Array>} Array of package objects
 */
export async function fetchPackages(options = {}) {
  const { category, limit, featured, fields = 'card' } = options;

  try {
    const params = {};
    let filter = '_type == "package" && active == true';

    if (category) {
      filter += ' && category == $category';
      params.category = category;
    }
    if (featured) {
      filter += ' && featured == true';
    }

    let query = `*[${filter}] | order(publishedAt desc)`;
    if (limit) {
      query += '[0...$limit]';
      params.limit = limit;
    }
    query += proj(fields === 'full' ? 'full' : PACKAGE_CARD);

    const data = await sanityClient.fetch(query, params);
    return data || [];
  } catch (error) {
    console.error('Error fetching packages from Sanity:', error);
    return [];
  }
}

/**
 * Fetch a single package by ID (full document - detail page)
 * @param {number} id - Package ID
 * @returns {Promise<Object|null>} Package object or null
 */
export async function fetchPackageById(id) {
  try {
    const query = '*[_type == "package" && active == true && id == $id][0]';
    const data = await sanityClient.fetch(query, { id: Number(id) });
    return data || null;
  } catch (error) {
    console.error(`Error fetching package with ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetch a single package by slug (full document - detail page)
 * @param {string} slug - Package slug
 * @returns {Promise<Object|null>} Package object or null
 */
export async function fetchPackageBySlug(slug) {
  try {
    const query = '*[_type == "package" && active == true && slug.current == $slug][0]';
    const data = await sanityClient.fetch(query, { slug });
    return data || null;
  } catch (error) {
    console.error(`Error fetching package with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch packages by category.
 * Returns FULL documents: DestinationDetail renders package detail straight out of
 * this list rather than making a second detail request.
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of package objects
 */
export async function fetchPackagesByCategory(category) {
  return fetchPackages({ category, fields: 'full' });
}

/**
 * Fetch all destinations
 * @param {string} type - 'international' or 'domestic' (optional)
 * @returns {Promise<Array>} Array of destination objects
 */
export async function fetchDestinations(type = null) {
  try {
    const params = {};
    let filter = '_type == "destination" && active == true';
    if (type) {
      filter += ' && type == $type';
      params.type = type;
    }
    const query = `*[${filter}] | order(order asc)`;
    const data = await sanityClient.fetch(query, params);
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
    const query = '*[_type == "banner" && category == $category && active == true][0].images';
    const images = await sanityClient.fetch(query, { category });
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
    const query = '*[_type == "banner" && active == true] { category, images }';
    const bannersData = await sanityClient.fetch(query);
    const bannersByCategory = {};
    (bannersData || []).forEach((banner) => {
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
 * @param {number} limit - Maximum results (default 25)
 * @returns {Promise<Array>} Array of matching package objects
 */
export async function searchPackages(keyword, limit = 25) {
  try {
    const query = `*[_type == "package" && active == true && (
      title match $kw ||
      destination match $kw ||
      category match $kw ||
      overview match $kw
    )] | order(rating desc)[0...$limit]${proj(PACKAGE_CARD)}`;
    const results = await sanityClient.fetch(query, { kw: `${keyword}*`, limit });
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
 * @param {number} filters.limit - Maximum results (default 60)
 * @returns {Promise<Array>} Array of filtered package objects
 */
export async function fetchPackagesWithFilters(filters = {}) {
  const { categories, minPrice, maxPrice, minRating, limit = 60 } = filters;

  try {
    const params = { limit };
    let filter = '_type == "package" && active == true';

    if (categories?.length) {
      filter += ' && category in $categories';
      params.categories = categories;
    }
    if (minPrice !== undefined) {
      filter += ' && price >= $minPrice';
      params.minPrice = Number(minPrice);
    }
    if (maxPrice !== undefined) {
      filter += ' && price <= $maxPrice';
      params.maxPrice = Number(maxPrice);
    }
    if (minRating !== undefined) {
      filter += ' && rating >= $minRating';
      params.minRating = Number(minRating);
    }

    const query = `*[${filter}] | order(publishedAt desc)[0...$limit]${proj(PACKAGE_CARD)}`;
    const data = await sanityClient.fetch(query, params);
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
    // One round trip instead of three.
    const stats = await sanityClient.fetch(`{
      "totalPackages": count(*[_type == "package" && active == true]),
      "totalDestinations": count(*[_type == "destination" && active == true]),
      "avgRating": math::avg(*[_type == "package" && active == true].rating)
    }`);
    return {
      totalPackages: stats?.totalPackages || 0,
      totalDestinations: stats?.totalDestinations || 0,
      avgRating: stats?.avgRating ? Number(stats.avgRating).toFixed(1) : 0,
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
 * @param {'card'|'full'} options.fields - 'card' (default) projects listing fields only
 * @returns {Promise<Array>} Array of hotel objects
 */
export async function fetchHotels(options = {}) {
  const { category, limit, featured, fields = 'card' } = options;

  try {
    const params = {};
    let filter = '_type == "hotel" && active == true';

    if (category) {
      filter += ' && category == $category';
      params.category = category;
    }
    if (featured) {
      filter += ' && featured == true';
    }

    let query = `*[${filter}] | order(_createdAt desc)`;
    if (limit) {
      query += '[0...$limit]';
      params.limit = limit;
    }
    query += proj(fields === 'full' ? 'full' : HOTEL_CARD);

    const data = await sanityClient.fetch(query, params);
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
 * Fetch a single hotel by slug (full document - detail page)
 * @param {string} category - Hotel category
 * @param {string} slug - Hotel slug
 * @returns {Promise<Object|null>} Hotel object or null
 */
export async function fetchHotelBySlug(category, slug) {
  try {
    const query =
      '*[_type == "hotel" && active == true && category == $category && slug.current == $slug][0]';
    const data = await sanityClient.fetch(query, { category, slug });
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
 * @param {number} limit - Maximum results (default 25)
 * @returns {Promise<Array>} Array of matching hotel objects
 */
export async function searchHotels(keyword, limit = 25) {
  try {
    const query = `*[_type == "hotel" && active == true && (
      name match $kw ||
      location match $kw ||
      city match $kw ||
      country match $kw ||
      category match $kw ||
      description match $kw
    )] | order(rating desc)[0...$limit]${proj(HOTEL_CARD)}`;
    const results = await sanityClient.fetch(query, { kw: `${keyword}*`, limit });
    return results || [];
  } catch (error) {
    console.error('Error searching hotels:', error);
    return [];
  }
}

/**
 * Packages for the homepage carousel, featured first.
 * Replaces the old "fetch featured, and if empty fetch again" two-request waterfall:
 * ordering by featured desc puts featured packages first and still fills the carousel
 * when nothing is flagged featured.
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export async function fetchHomepagePackages(limit = 20) {
  try {
    const query = `*[_type == "package" && active == true]
      | order(featured desc, publishedAt desc)[0...$limit]${proj(PACKAGE_CARD)}`;
    const data = await sanityClient.fetch(query, { limit });
    return data || [];
  } catch (error) {
    console.error('Error fetching homepage packages:', error);
    return [];
  }
}

/**
 * Promo offers for the Live Offers strip. Returns [] when none are published so the
 * caller can keep its own fallback copy.
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export async function fetchOffers(limit = 4) {
  try {
    const query = `*[_type == "offer" && active == true]
      | order(displayOrder asc)[0...$limit] {
        _id, code, title, discount, destination, image
      }`;
    const data = await sanityClient.fetch(query, { limit });
    return data || [];
  } catch (error) {
    console.error('Error fetching offers:', error);
    return [];
  }
}

/**
 * Every active customer video in one request. The whole set is tiny, so VideoHero and
 * VideoTestimonialBand select their role from a single shared cache entry rather than
 * issuing a request each.
 * @param {{ limit?: number }} options
 * @returns {Promise<Array>}
 */
export async function fetchAllCustomerVideos({ limit = 20 } = {}) {
  try {
    const query = `*[_type == "customerVideo" && active == true]
      | order(order asc)[0...$limit] {
        _id,
        "videoUrl": videoFile.asset->url,
        poster,
        title, customerName, destination, quote, role
      }`;
    const data = await sanityClient.fetch(query, { limit });
    return data || [];
  } catch (error) {
    console.error('Error fetching customer videos:', error);
    return [];
  }
}

/**
 * Fetch customer trip photos for the CustomerGrid section.
 * Returns photo as a full Sanity image reference object (pass to urlFor).
 * @param {{ limit?: number }} options
 * @returns {Promise<Array>}
 */
export async function fetchCustomerPhotos({ limit = 24 } = {}) {
  try {
    const query = `*[_type == "customerPhoto" && active == true]
      | order(order asc, _createdAt desc)[0...$limit] {
        _id, photo, altText, caption, customerName, destination
      }`;
    const data = await sanityClient.fetch(query, { limit });
    return data || [];
  } catch (error) {
    console.error('Error fetching customer photos:', error);
    return [];
  }
}

/**
 * Fetch customer videos by role.
 * Returns videoUrl as a plain CDN string; poster as a Sanity image ref (pass to urlFor).
 * @param {{ role?: 'hero' | 'testimonial', limit?: number }} options
 * @returns {Promise<Array>}
 */
export async function fetchCustomerVideos({ role = 'testimonial', limit = 10 } = {}) {
  try {
    const query = `*[_type == "customerVideo" && active == true && role == $role]
      | order(order asc)[0...$limit] {
        _id,
        "videoUrl": videoFile.asset->url,
        poster,
        title, customerName, destination, quote, role
      }`;
    const data = await sanityClient.fetch(query, { role, limit });
    return data || [];
  } catch (error) {
    console.error('Error fetching customer videos:', error);
    return [];
  }
}

/**
 * Blog posts for /blog.
 * Projected to the field names the page already uses (id, date) so the component
 * shape is unchanged from the previous hardcoded data.
 * @param {{ limit?: number }} options
 * @returns {Promise<Array>}
 */
export async function fetchBlogPosts({ limit = 50 } = {}) {
  try {
    const query = `*[_type == "blogPost" && active == true]
      | order(publishedAt desc)[0...$limit] {
        "id": _id,
        title,
        "slug": slug.current,
        author,
        "date": publishedAt,
        excerpt,
        image,
        category,
        readTime,
        url
      }`;
    const data = await sanityClient.fetch(query, { limit });
    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Testimonials and platform ratings in a single round trip. Both feed one home-page
 * section, so there is no reason to spend two requests on them.
 * @returns {Promise<{ testimonials: Array, platforms: Array }>}
 */
export async function fetchHomeReviews({ limit = 60 } = {}) {
  try {
    const query = `{
      "testimonials": *[_type == "testimonial" && active == true]
        | order(order asc, _createdAt asc)[0...$limit] {
          _id, name, location, destination, rating, text, avatar, featured
        },
      "platforms": *[_type == "platformReview" && active == true]
        | order(displayOrder asc) {
          _id, platform, rating, totalReviews
        }
    }`;
    const data = await sanityClient.fetch(query, { limit });
    return { testimonials: data?.testimonials || [], platforms: data?.platforms || [] };
  } catch (error) {
    console.error('Error fetching home reviews:', error);
    return { testimonials: [], platforms: [] };
  }
}

// Export default client for custom queries
export default sanityClient;
