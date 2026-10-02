import { useQuery } from '@tanstack/react-query';
import {
  fetchDestinations,
  fetchBanners,
  fetchPackagesByCategory,
  fetchHomepagePackages,
  fetchPackages,
  fetchOffers,
  fetchCustomerPhotos,
  fetchAllCustomerVideos,
  fetchHotels,
  fetchBlogPosts,
  fetchHomeReviews,
} from '@/services/sanityClient';

/**
 * Shared react-query hooks for Sanity content.
 *
 * Cache defaults (staleTime, no refetch-on-focus) live on the QueryClient in main.jsx.
 * Components that need the same document set use the same queryKey and narrow the
 * result with `select`, so each set is fetched once per cache window no matter how
 * many sections render it.
 */

/** Banner image URLs for a category. */
export function useBanners(category = 'general') {
  return useQuery({
    queryKey: ['banners', category],
    queryFn: () => fetchBanners(category),
    enabled: Boolean(category),
  });
}

/**
 * Destinations narrowed by type. TrendingDestinations ('international') and
 * TopDestinations ('domestic') share one request via the common key.
 */
export function useDestinationsByType(type) {
  return useQuery({
    queryKey: ['destinations'],
    queryFn: () => fetchDestinations(),
    select: (all) => (type ? (all || []).filter((d) => d.type === type) : all || []),
  });
}

/** Homepage package carousel - featured first, one request. */
export function useHomepagePackages(limit = 20) {
  return useQuery({
    queryKey: ['packages', 'homepage', limit],
    queryFn: () => fetchHomepagePackages(limit),
  });
}

/** Packages in a category (card fields). */
export function usePackagesByCategory(category, limit) {
  return useQuery({
    queryKey: ['packages', { category, limit }],
    queryFn: () => fetchPackages({ category, limit }),
    enabled: Boolean(category),
  });
}

/** Every active package (card fields) - for listing pages that filter client-side. */
export function useAllPackages() {
  return useQuery({
    queryKey: ['packages', 'all'],
    queryFn: () => fetchPackages(),
  });
}

/**
 * Full package documents for a category. DestinationDetail renders package detail
 * straight out of this list, so it needs every field - hence a separate cache entry
 * from the card-projected ['packages', {category}].
 */
export function usePackagesFullByCategory(category) {
  return useQuery({
    queryKey: ['packages', 'full', category],
    queryFn: () => fetchPackagesByCategory(category),
    enabled: Boolean(category),
  });
}

/** Promo codes for the Live Offers strip. */
export function useOffers(limit = 4) {
  return useQuery({
    queryKey: ['offers', limit],
    queryFn: () => fetchOffers(limit),
  });
}

/** Customer photos for the CustomerGrid section. */
export function useCustomerPhotos(limit = 12) {
  return useQuery({
    queryKey: ['customerPhotos', limit],
    queryFn: () => fetchCustomerPhotos({ limit }),
  });
}

/**
 * Customer videos narrowed by role. VideoHero ('hero') and VideoTestimonialBand
 * ('testimonial') share one request via the common key.
 */
export function useCustomerVideosByRole(role, limit) {
  return useQuery({
    queryKey: ['customerVideos'],
    queryFn: () => fetchAllCustomerVideos(),
    select: (all) => {
      const matching = (all || []).filter((v) => v.role === role);
      return limit ? matching.slice(0, limit) : matching;
    },
  });
}

/** Blog posts for /blog, newest first. */
export function useBlogPosts(limit = 50) {
  return useQuery({
    queryKey: ['blogPosts', limit],
    queryFn: () => fetchBlogPosts({ limit }),
  });
}

/**
 * Testimonials + platform ratings for the home-page reviews section, in one request.
 */
export function useHomeReviews(limit = 60) {
  return useQuery({
    queryKey: ['homeReviews', limit],
    queryFn: () => fetchHomeReviews({ limit }),
  });
}

/** Hotels, optionally by category (card fields). */
export function useHotels({ category, limit } = {}) {
  return useQuery({
    queryKey: ['hotels', { category, limit }],
    queryFn: () => fetchHotels({ category, limit }),
  });
}
