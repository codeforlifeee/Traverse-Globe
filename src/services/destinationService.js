// Destination Service Layer
// Handles data fetching for destinations and packages
// This abstraction allows easy switching from hardcoded data to CMS (Sanity)

import { 
  uaePackages, 
  baliPackages, 
  thailandPackages, 
  singaporePackages, 
  srilankaPackages, 
  vietnamPackages, 
  laosPackages, 
  andamanPackages, 
  jaipurPackages, 
  keralaPackages, 
  kashmirPackages,
  packageDetails,
  uaeBanners,
  baliBanners,
  thailandBanners,
  singaporeBanners,
  srilankaBanners,
  vietnamBanners,
  laosBanners,
  andamanBanners,
  jaipurBanners,
  keralaBanners,
  kashmirBanners
} from '../data/siteData';
import { getCategoryBySlug, getCategoryType } from '../data/categoryConfig';

// Map category slugs to their data
const PACKAGE_DATA_MAP = {
  uae: { packages: uaePackages, banners: uaeBanners },
  bali: { packages: baliPackages, banners: baliBanners },
  thailand: { packages: thailandPackages, banners: thailandBanners },
  singapore: { packages: singaporePackages, banners: singaporeBanners },
  srilanka: { packages: srilankaPackages, banners: srilankaBanners },
  vietnam: { packages: vietnamPackages, banners: vietnamBanners },
  laos: { packages: laosPackages, banners: laosBanners },
  andaman: { packages: andamanPackages, banners: andamanBanners },
  jaipur: { packages: jaipurPackages, banners: jaipurBanners },
  kerala: { packages: keralaPackages, banners: keralaBanners },
  kashmir: { packages: kashmirPackages, banners: kashmirBanners }
};

/**
 * Get packages for a specific destination category
 * @param {string} categorySlug - Category slug (e.g., 'uae', 'kerala')
 * @returns {Promise<Array>} Array of packages
 */
export async function getDestinationPackages(categorySlug) {
  // Simulate async API call (ready for CMS migration)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = PACKAGE_DATA_MAP[categorySlug];
      if (data) {
        resolve(data.packages || []);
      } else {
        reject(new Error(`No packages found for category: ${categorySlug}`));
      }
    }, 100); // Small delay to simulate API
  });
}

/**
 * Get banner images for a specific destination category
 * @param {string} categorySlug - Category slug
 * @returns {Promise<Array>} Array of banner image URLs
 */
export async function getDestinationBanners(categorySlug) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = PACKAGE_DATA_MAP[categorySlug];
      if (data) {
        resolve(data.banners || []);
      } else {
        reject(new Error(`No banners found for category: ${categorySlug}`));
      }
    }, 100);
  });
}

/**
 * Get package details by ID
 * @param {number} packageId - Package ID
 * @returns {Promise<Object>} Package details
 */
export async function getPackageById(packageId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const detail = packageDetails[packageId];
      if (detail) {
        resolve(detail);
      } else {
        reject(new Error(`Package not found: ${packageId}`));
      }
    }, 100);
  });
}

/**
 * Get package by slug within a category
 * @param {string} categorySlug - Category slug
 * @param {string} packageSlug - Package slug
 * @returns {Promise<Object>} Package with details
 */
export async function getPackageBySlug(categorySlug, packageSlug) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = PACKAGE_DATA_MAP[categorySlug];
      if (!data) {
        reject(new Error(`Category not found: ${categorySlug}`));
        return;
      }

      // Find package in list by slug
      const pkg = data.packages.find(p => {
        const pkgSlug = p.title.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        return pkgSlug === packageSlug;
      });

      if (pkg) {
        // Get full details if available
        const details = packageDetails[pkg.id];
        resolve({
          ...pkg,
          details: details || null,
          category: categorySlug
        });
      } else {
        reject(new Error(`Package not found: ${packageSlug} in ${categorySlug}`));
      }
    }, 100);
  });
}

/**
 * Get all packages across all categories
 * @param {string} type - Filter by type ('international' or 'domestic')
 * @returns {Promise<Array>} Array of all packages with category info
 */
export async function getAllPackages(type = null) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allPackages = [];
      
      Object.entries(PACKAGE_DATA_MAP).forEach(([categorySlug, data]) => {
        const categoryType = getCategoryType(categorySlug);
        
        // Filter by type if specified
        if (type && categoryType !== type) {
          return;
        }

        const categoryConfig = getCategoryBySlug(categorySlug);
        data.packages.forEach(pkg => {
          allPackages.push({
            ...pkg,
            category: categorySlug,
            categoryName: categoryConfig?.name || categorySlug,
            categoryType: categoryType
          });
        });
      });

      resolve(allPackages);
    }, 100);
  });
}

/**
 * Search packages by keyword
 * @param {string} query - Search query
 * @param {string} type - Filter by type ('international' or 'domestic')
 * @returns {Promise<Array>} Matching packages
 */
export async function searchPackages(query, type = null) {
  const allPackages = await getAllPackages(type);
  const searchTerm = query.toLowerCase().trim();
  
  return allPackages.filter(pkg => 
    pkg.title.toLowerCase().includes(searchTerm) ||
    pkg.description?.toLowerCase().includes(searchTerm) ||
    pkg.categoryName.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get featured/trending packages
 * @returns {Promise<Array>} Featured packages
 */
export async function getFeaturedPackages() {
  const allPackages = await getAllPackages();
  // For now, return first 6 packages
  // In CMS, this would query packages marked as featured
  return allPackages.slice(0, 6);
}

// CMS Migration Ready: 
// When migrating to Sanity CMS, replace the implementations above with:
/*
import { sanityClient } from '../services/sanityClient';

export async function getDestinationPackages(categorySlug) {
  return await sanityClient.fetch(
    `*[_type == "package" && category->slug.current == $categorySlug] | order(publishedAt desc)`,
    { categorySlug }
  );
}

export async function getPackageBySlug(categorySlug, packageSlug) {
  return await sanityClient.fetch(
    `*[_type == "package" && slug.current == $packageSlug && category->slug.current == $categorySlug][0]`,
    { categorySlug, packageSlug }
  );
}

// ... etc
*/
