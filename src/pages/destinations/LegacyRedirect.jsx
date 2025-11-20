// LegacyRedirect Component
// Handles backward compatibility by redirecting old URLs to new routing structure
// Old: /uae-packages/:slug → New: /destinations/international/uae/:slug

import { Navigate, useParams, useLocation } from 'react-router-dom';
import { getCategoryBySlug, isValidCategory } from '../../data/categoryConfig';

export default function LegacyRedirect() {
  const params = useParams();
  const location = useLocation();

  // Extract category from different URL patterns
  let category = null;
  let slug = null;

  // Parse the pathname directly
  const pathname = location.pathname;
  
  // Pattern 1: /:category-packages/:slug
  if (pathname.includes('-packages/')) {
    const match = pathname.match(/\/([^/]+)-packages\/([^/]+)/);
    if (match) {
      category = match[1];
      slug = match[2];
    }
  }
  // Pattern 2: /:category-packages (no slug)
  else if (pathname.includes('-packages')) {
    const match = pathname.match(/\/([^/]+)-packages/);
    if (match) {
      category = match[1];
      slug = null;
    }
  }
  // Pattern 3: /package/:slug (old format)
  else if (pathname.startsWith('/package/')) {
    slug = params.slug || pathname.split('/package/')[1];
    // Default to UAE for old package links without category
    category = 'uae';
  }

  // Validate category
  if (!category || !isValidCategory(category)) {
    console.warn('Invalid category in legacy redirect:', category);
    return <Navigate to="/destinations" replace />;
  }

  // Get category config to determine type (international/domestic)
  const config = getCategoryBySlug(category);
  if (!config) {
    return <Navigate to="/destinations" replace />;
  }

  // Build new URL
  const newPath = slug
    ? `/destinations/${config.type}/${category}/${slug}`
    : `/destinations/${config.type}/${category}`;

  return <Navigate to={newPath} replace />;
}
