// Sanity CMS Service
// Handles all Sanity API interactions
// This file is ready for when you set up Sanity

import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// Sanity client configuration
let sanityClient = null;
let builder = null;

/**
 * Initialize Sanity client
 * Call this before using any Sanity functions
 */
export const initSanityClient = () => {
  if (sanityClient) return sanityClient;
  
  sanityClient = createClient({
    projectId: import.meta.env?.VITE_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env?.VITE_SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production',
    apiVersion: import.meta.env?.VITE_SANITY_API_VERSION || process.env.VITE_SANITY_API_VERSION || '2024-01-01',
    useCdn: false, // Disable CDN to get fresh data immediately from Sanity
    perspective: 'published', // Only fetch published documents
    // Note: token is intentionally omitted for browser security (read-only access)
  });
  
  builder = createImageUrlBuilder(sanityClient);
  
  return sanityClient;
};

/**
 * Get optimized image URL from Sanity
 * @param {Object} source - Image reference
 * @returns {Object} Image URL builder
 */
export const urlFor = (source) => {
  if (!builder) initSanityClient();
  return builder.image(source);
};

// GROQ Queries
const QUERIES = {
  // Package queries
  allPackages: `*[_type == "package"] | order(_createdAt desc)`,
  packagesByDestination: `*[_type == "package" && destination == $destination] | order(price asc)`,
  packageById: `*[_type == "package" && packageId == $id][0]`,
  packageBySlug: `*[_type == "package" && destination == $destination && slug.current == $slug][0]`,
  
  // Blog queries
  allBlogPosts: `*[_type == "blogPost"] | order(publishedAt desc)`,
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug][0]`,
  
  // Testimonial queries
  allTestimonials: `*[_type == "testimonial"] | order(rating desc)`,
  
  // Hotel queries
  allHotels: `*[_type == "hotel"] | order(name asc)`,
  hotelsByCategory: `*[_type == "hotel" && category == $category]`,
  hotelCategories: `*[_type == "hotelCategory"] | order(order asc)`,
  
  // Banner queries
  bannersByDestination: `*[_type == "banner" && destination == $destination]{urls}[0]`
};

/**
 * Fetch all packages
 */
export const getAllPackagesFromSanity = async () => {
  const client = initSanityClient();
  if (!client) {
    console.warn('Sanity client not initialized');
    return [];
  }
  
  try {
    return await client.fetch(QUERIES.allPackages);
  } catch (error) {
    console.error('Error fetching packages from Sanity:', error);
    return [];
  }
};

/**
 * Fetch packages for a specific destination
 */
export const getPackagesFromSanity = async (destination) => {
  const client = initSanityClient();
  if (!client) {
    console.warn('Sanity client not initialized');
    return [];
  }
  
  try {
    return await client.fetch(QUERIES.packagesByDestination, { destination });
  } catch (error) {
    console.error(`Error fetching packages for ${destination}:`, error);
    return [];
  }
};

/**
 * Fetch package by ID
 */
export const getPackageByIdFromSanity = async (id) => {
  const client = initSanityClient();
  if (!client) {
    console.warn('Sanity client not initialized');
    return null;
  }
  
  try {
    return await client.fetch(QUERIES.packageById, { id: parseInt(id) });
  } catch (error) {
    console.error(`Error fetching package ${id}:`, error);
    return null;
  }
};

/**
 * Fetch package by slug
 */
export const getPackageBySlugFromSanity = async (destination, slug) => {
  const client = initSanityClient();
  if (!client) {
    console.warn('Sanity client not initialized');
    return null;
  }
  
  try {
    return await client.fetch(QUERIES.packageBySlug, { destination, slug });
  } catch (error) {
    console.error(`Error fetching package ${destination}/${slug}:`, error);
    return null;
  }
};

/**
 * Fetch banners for a destination
 */
export const getBannersFromSanity = async (destination) => {
  const client = initSanityClient();
  if (!client) {
    console.warn('Sanity client not initialized');
    return [];
  }
  
  try {
    const result = await client.fetch(QUERIES.bannersByDestination, { destination });
    return result?.urls || [];
  } catch (error) {
    console.error(`Error fetching banners for ${destination}:`, error);
    return [];
  }
};

/**
 * Fetch all blog posts
 */
export const getBlogPostsFromSanity = async () => {
  const client = initSanityClient();
  if (!client) {
    console.warn('Sanity client not initialized');
    return [];
  }
  
  try {
    return await client.fetch(QUERIES.allBlogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

/**
 * Fetch blog post by slug
 */
export const getBlogPostBySlugFromSanity = async (slug) => {
  const client = initSanityClient();
  if (!client) {
    console.warn('Sanity client not initialized');
    return null;
  }
  
  try {
    return await client.fetch(QUERIES.blogPostBySlug, { slug });
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
};

/**
 * Fetch testimonials
 */
export const getFeedbackFromSanity = async () => {
  const client = initSanityClient();
  if (!client) {
    console.warn('Sanity client not initialized');
    return [];
  }
  
  try {
    return await client.fetch(QUERIES.allTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

/**
 * Fetch hotels by category
 */
export const getHotelsFromSanity = async (category) => {
  const client = initSanityClient();
  if (!client) {
    console.warn('Sanity client not initialized');
    return [];
  }
  
  try {
    if (category) {
      return await client.fetch(QUERIES.hotelsByCategory, { category });
    }
    return await client.fetch(QUERIES.allHotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};

/**
 * Fetch hotel categories
 */
export const getHotelCategoriesFromSanity = async () => {
  const client = initSanityClient();
  if (!client) {
    console.warn('Sanity client not initialized');
    return [];
  }
  
  try {
    return await client.fetch(QUERIES.hotelCategories);
  } catch (error) {
    console.error('Error fetching hotel categories:', error);
    return [];
  }
};

// Export client for direct use if needed
export { sanityClient };

// Export all functions
export default {
  initSanityClient,
  urlFor,
  getAllPackagesFromSanity,
  getPackagesFromSanity,
  getPackageByIdFromSanity,
  getPackageBySlugFromSanity,
  getBannersFromSanity,
  getBlogPostsFromSanity,
  getBlogPostBySlugFromSanity,
  getFeedbackFromSanity,
  getHotelsFromSanity,
  getHotelCategoriesFromSanity
};
