// Custom Hook: useDestinations
// Fetches packages and banners for a specific destination category.
//
// Backed by react-query, so the result is cached across navigation and the old
// set-state-after-unmount race is gone. The return shape is unchanged.

import { usePackagesFullByCategory, useBanners } from './queries';

export function useDestinations(categorySlug) {
  const packagesQuery = usePackagesFullByCategory(categorySlug);
  const bannersQuery = useBanners(categorySlug);

  const enabled = Boolean(categorySlug);

  return {
    packages: packagesQuery.data ?? [],
    banners: bannersQuery.data ?? [],
    // Disabled queries stay "pending" forever, so without a category there is nothing loading.
    isLoading: enabled && (packagesQuery.isPending || bannersQuery.isPending),
    error: packagesQuery.error?.message ?? bannersQuery.error?.message ?? null,
  };
}
