// Slugify utility
// Consistent slug generation for URLs and CMS
// Use this SAME logic in both frontend and Sanity schemas

/**
 * Convert a string to a URL-friendly slug
 * @param {string} str - String to slugify
 * @returns {string} Slugified string
 */
export const slugify = (str = '') => 
  String(str)
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[`"''`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Validate if a string is a valid slug
 * @param {string} slug - Slug to validate
 * @returns {boolean} True if valid
 */
export const isValidSlug = (slug) => {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
};

/**
 * Extract slug from a full URL or path
 * @param {string} url - URL or path
 * @returns {string} Extracted slug
 */
export const extractSlug = (url) => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1] || '';
};

export default slugify;
