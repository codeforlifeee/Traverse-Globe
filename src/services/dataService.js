// Central Data Service - Abstraction Layer
// This service provides a unified interface for data access
// Supports both hardcoded data (current) and Sanity CMS (future)

import * as siteData from '../data/siteData';

// Feature flag to switch between hardcoded and Sanity
const USE_SANITY = import.meta.env.VITE_USE_SANITY === 'true';

/**
 * Get packages for a specific destination
 * @param {string} destination - Destination slug (e.g., 'uae', 'bali')
 * @returns {Promise<Array>} Array of packages
 */
export const getPackages = async (destination) => {
  if (USE_SANITY) {
    // Future: Sanity implementation
    const { getPackagesFromSanity } = await import('./sanityService');
    return getPackagesFromSanity(destination);
  }
  
  // Current: Hardcoded data
  const dataMap = {
    'uae': siteData.uaePackages,
    'bali': siteData.baliPackages,
    'thailand': siteData.thailandPackages,
    'singapore': siteData.singaporePackages,
    'srilanka': siteData.srilankaPackages,
    'vietnam': siteData.vietnamPackages,
    'laos': siteData.laosPackages,
    'andaman': siteData.andamanPackages,
    'jaipur': siteData.jaipurPackages,
    'kerala': siteData.keralaPackages,
    'kashmir': siteData.kashmirPackages
  };
  
  return dataMap[destination] || [];
};

/**
 * Get banner images for a specific destination
 * @param {string} destination - Destination slug
 * @returns {Promise<Array>} Array of banner URLs
 */
export const getBanners = async (destination) => {
  if (USE_SANITY) {
    const { getBannersFromSanity } = await import('./sanityService');
    return getBannersFromSanity(destination);
  }
  
  const dataMap = {
    'uae': siteData.uaeBanners,
    'bali': siteData.baliBanners,
    'thailand': siteData.thailandBanners,
    'singapore': siteData.singaporeBanners,
    'srilanka': siteData.srilankaBanners,
    'vietnam': siteData.vietnamBanners,
    'laos': siteData.laosBanners,
    'andaman': siteData.andamanBanners,
    'jaipur': siteData.jaipurBanners,
    'kerala': siteData.keralaBanners,
    'kashmir': siteData.kashmirBanners
  };
  
  return dataMap[destination] || [];
};

/**
 * Get all packages (for home page, search, etc.)
 * @returns {Promise<Array>} All packages
 */
export const getAllPackages = async () => {
  if (USE_SANITY) {
    const { getAllPackagesFromSanity } = await import('./sanityService');
    return getAllPackagesFromSanity();
  }
  
  // Combine all packages
  return [
    ...siteData.uaePackages,
    ...siteData.baliPackages,
    ...siteData.thailandPackages,
    ...siteData.singaporePackages,
    ...siteData.srilankaPackages,
    ...siteData.vietnamPackages,
    ...siteData.laosPackages,
    ...siteData.andamanPackages,
    ...siteData.jaipurPackages,
    ...siteData.keralaPackages,
    ...siteData.kashmirPackages
  ];
};

/**
 * Get package by ID
 * @param {number} id - Package ID
 * @returns {Promise<Object>} Package details
 */
export const getPackageById = async (id) => {
  if (USE_SANITY) {
    const { getPackageByIdFromSanity } = await import('./sanityService');
    return getPackageByIdFromSanity(id);
  }
  
  return siteData.packageDetails[id];
};

/**
 * Get package by slug
 * @param {string} destination - Destination slug
 * @param {string} slug - Package slug
 * @returns {Promise<Object>} Package details
 */
export const getPackageBySlug = async (destination, slug) => {
  if (USE_SANITY) {
    const { getPackageBySlugFromSanity } = await import('./sanityService');
    return getPackageBySlugFromSanity(destination, slug);
  }
  
  // Find package by slug in hardcoded data
  const packages = await getPackages(destination);
  return packages.find(pkg => pkg.slug === slug);
};

/**
 * Get blog posts
 * @returns {Promise<Array>} Array of blog posts
 */
export const getBlogPosts = async () => {
  if (USE_SANITY) {
    const { getBlogPostsFromSanity } = await import('./sanityService');
    return getBlogPostsFromSanity();
  }
  
  return siteData.blogPosts || [];
};

/**
 * Get testimonials/feedback
 * @returns {Promise<Array>} Array of testimonials
 */
export const getFeedback = async () => {
  if (USE_SANITY) {
    const { getFeedbackFromSanity } = await import('./sanityService');
    return getFeedbackFromSanity();
  }
  
  return siteData.feedback || [];
};

/**
 * Get hotel listings
 * @param {string} category - Hotel category
 * @returns {Promise<Array>} Array of hotels
 */
export const getHotels = async (category) => {
  if (USE_SANITY) {
    const { getHotelsFromSanity } = await import('./sanityService');
    return getHotelsFromSanity(category);
  }
  
  // Filter by category if provided
  if (category && siteData.hotelListings) {
    return siteData.hotelListings.filter(hotel => hotel.category === category);
  }
  
  return siteData.hotelListings || [];
};

/**
 * Get hotel categories
 * @returns {Promise<Array>} Array of categories
 */
export const getHotelCategories = async () => {
  if (USE_SANITY) {
    const { getHotelCategoriesFromSanity } = await import('./sanityService');
    return getHotelCategoriesFromSanity();
  }
  
  return siteData.hotelCategories || [];
};

/**
 * Get company information
 * @returns {Object} Company info
 */
export const getCompanyInfo = () => {
  // Company info rarely changes, keep in siteData
  return siteData.companyInfo;
};

/**
 * Search packages by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} Matching packages
 */
export const searchPackages = async (query) => {
  const allPackages = await getAllPackages();
  const lowerQuery = query.toLowerCase();
  
  return allPackages.filter(pkg => 
    pkg.title?.toLowerCase().includes(lowerQuery) ||
    pkg.description?.toLowerCase().includes(lowerQuery) ||
    pkg.location?.toLowerCase().includes(lowerQuery)
  );
};

// Export for backward compatibility
export default {
  getPackages,
  getBanners,
  getAllPackages,
  getPackageById,
  getPackageBySlug,
  getBlogPosts,
  getFeedback,
  getHotels,
  getHotelCategories,
  getCompanyInfo,
  searchPackages
};
