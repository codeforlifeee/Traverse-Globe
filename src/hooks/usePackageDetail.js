// Custom Hook: usePackageDetail
// Fetches details for a specific package by category and slug.
//
// Backed by react-query: cached across navigation, no set-state-after-unmount race,
// and `refetch` is now the query's own refetch rather than a counter in a dependency
// array. The return shape is unchanged.

import { useQuery } from '@tanstack/react-query';
import { getPackageBySlug } from '../services/destinationService';

export function usePackageDetail(categorySlug, packageSlug) {
  const enabled = Boolean(categorySlug && packageSlug);

  const query = useQuery({
    queryKey: ['package', categorySlug, packageSlug],
    queryFn: () => getPackageBySlug(categorySlug, packageSlug),
    enabled,
  });

  // getPackageBySlug resolves to null when the slug does not exist in the category,
  // which is a "not found", not a transport error.
  const notFound = query.isSuccess && !query.data;

  return {
    packageData: query.data ?? null,
    isLoading: enabled && query.isPending,
    error: query.error?.message ?? (notFound ? 'Package not found' : null),
    refetch: query.refetch,
  };
}
