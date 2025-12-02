// Destination Service Layer
// Handles data fetching for destinations and packages
// Now fully integrated with Sanity CMS

import { fetchPackagesByCategory, fetchBanners, fetchPackages, searchPackages as searchSanityPackages } from './sanityClient';
import { getCategoryBySlug, getCategoryType } from '../data/categoryConfig';

/**
 * Get packages for a specific destination category
 * @param {string} categorySlug - Category slug (e.g., 'uae', 'kerala')
 * @returns {Promise<Array>} Array of packages
 */
export async function getDestinationPackages(categorySlug) {
  try {
    const packages = await fetchPackagesByCategory(categorySlug);
    return packages || [];
  } catch (error) {
    console.error(`Error fetching packages for ${categorySlug}:`, error);
    return [];
  }
}

/**
 * Get banner images for a specific destination category
 * @param {string} categorySlug - Category slug
 * @returns {Promise<Array>} Array of banner image URLs
 */
export async function getDestinationBanners(categorySlug) {
  try {
    const banners = await fetchBanners(categorySlug);
    return banners || [];
  } catch (error) {
    console.error(`Error fetching banners for ${categorySlug}:`, error);
    return [];
  }
}

/**
 * Get package details by ID
 * @param {number} packageId - Package ID
 * @returns {Promise<Object>} Package details
 */
export async function getPackageById(packageId) {
  try {
    const { fetchPackageById } = await import('./sanityClient');
    const packageData = await fetchPackageById(packageId);
    return packageData || null;
  } catch (error) {
    console.error(`Error fetching package ${packageId}:`, error);
    return null;
  }
}

/**
 * Get package by slug within a category
 * @param {string} categorySlug - Category slug
 * @param {string} packageSlug - Package slug
 * @returns {Promise<Object>} Package with details
 */
export async function getPackageBySlug(categorySlug, packageSlug) {
  try {
    const { fetchPackageBySlug } = await import('./sanityClient');
    const packageData = await fetchPackageBySlug(packageSlug);
    
    if (packageData && packageData.category === categorySlug) {
      return packageData;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching package ${packageSlug} in ${categorySlug}:`, error);
    return null;
  }
}

/**
 * Get all packages across all categories
 * @param {string} type - Filter by type ('international' or 'domestic')
 * @returns {Promise<Array>} Array of all packages with category info
 */
export async function getAllPackages(type = null) {
  try {
    const packages = await fetchPackages({});
    
    // Filter by destination type if specified
    if (type) {
      const filteredPackages = packages.filter(pkg => {
        const categoryType = getCategoryType(pkg.category);
        return categoryType === type;
      });
      
      return filteredPackages.map(pkg => {
        const categoryConfig = getCategoryBySlug(pkg.category);
        return {
          ...pkg,
          categoryName: categoryConfig?.name || pkg.category,
          categoryType: getCategoryType(pkg.category)
        };
      });
    }
    
    return packages.map(pkg => {
      const categoryConfig = getCategoryBySlug(pkg.category);
      return {
        ...pkg,
        categoryName: categoryConfig?.name || pkg.category,
        categoryType: getCategoryType(pkg.category)
      };
    });
  } catch (error) {
    console.error('Error fetching all packages:', error);
    return [];
  }
}

/**
 * Search packages by keyword
 * @param {string} query - Search query
 * @param {string} type - Filter by type ('international' or 'domestic')
 * @returns {Promise<Array>} Matching packages
 */
export async function searchPackages(query, type = null) {
  try {
    // Use Sanity's search capabilities
    const results = await searchSanityPackages(query);
    
    // Filter by type if specified
    if (type) {
      return results.filter(pkg => {
        const categoryType = getCategoryType(pkg.category);
        return categoryType === type;
      });
    }
    
    return results;
  } catch (error) {
    console.error('Error searching packages:', error);
    return [];
  }
}

/**
 * Get featured/trending packages
 * @returns {Promise<Array>} Featured packages
 */
export async function getFeaturedPackages() {
  try {
    const { fetchFeaturedPackages } = await import('./sanityClient');
    return await fetchFeaturedPackages();
  } catch (error) {
    console.error('Error fetching featured packages:', error);
    return [];
  }
}
