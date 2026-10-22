import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchContent } from '@/services/sanityClient';
import {
  getAutocomplete,
  getRecommendations,
  searchStatic,
  scoreRecord,
} from '@/lib/searchIndex';
import { getCategoryType } from '@/data/categoryConfig';

/**
 * Universal site search, shared by the ⌘K palette and the /search page.
 *
 * Returns three things at once so the UI never sits empty:
 *  - `suggestions` — query completions, computed locally, available immediately
 *  - `local`       — destinations, themes, activities and pages, also immediate
 *  - grouped CMS results (packages, hotels, guides), which arrive with the fetch
 *
 * The CMS request is debounced and cached per term by react-query, so retyping a
 * narrowed query (or reopening the palette) does not re-fetch.
 */

const DEBOUNCE_MS = 220;
const MIN_LENGTH = 2;

/** Debounced copy of a value — keeps keystrokes off the network. */
export function useDebouncedValue(value, delay = DEBOUNCE_MS) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

/** Canonical URL for a package document. Mirrors PackageCard's own resolution. */
export function packageHref(pkg) {
  const slug = pkg?.slug?.current;
  if (!slug) return '/packages';
  const rawCategory = (pkg.category || '').toLowerCase().trim();
  const category = rawCategory === 'chardham' || rawCategory === 'chardham-yatra'
    ? 'chardhamyatra'
    : rawCategory;
  if (!category) return `/packages/${slug}`;
  const type = getCategoryType(category)
    || (['andaman', 'jaipur', 'kerala', 'kashmir', 'chardhamyatra'].includes(category) ? 'domestic' : 'international');
  return `/destinations/${type}/${category}/${slug}`;
}

/** Canonical URL for a hotel document. */
export function hotelHref(hotel) {
  const slug = hotel?.slug?.current;
  const category = (hotel?.category || 'international').toLowerCase();
  return slug ? `/hotels/${category}/${slug}` : '/hotels';
}

/** Canonical URL for a blog post. External `url` wins when the CMS has one. */
export function blogHref(post) {
  if (post?.url) return post.url;
  const slug = post?.slug?.current;
  return slug ? `/blog/${slug}` : '/blog';
}

export function useSiteSearch(rawQuery, { limits, enabled = true } = {}) {
  const query = String(rawQuery || '').trim();
  const debouncedQuery = useDebouncedValue(query);
  const ready = enabled && debouncedQuery.length >= MIN_LENGTH;

  const cms = useQuery({
    queryKey: ['siteSearch', debouncedQuery, limits || null],
    queryFn: () => searchContent(debouncedQuery, limits || {}),
    enabled: ready,
    placeholderData: (previous) => previous,
    staleTime: 5 * 60 * 1000,
  });

  // Local matches update on every keystroke, not on the debounced value — they
  // cost nothing and keep the palette responsive while the fetch is pending.
  const local = useMemo(() => {
    if (query.length < 1) return { destinations: [], themes: [], activities: [], pages: [], hotelCategories: [] };
    const matches = searchStatic(query, { limit: 24 });
    return {
      destinations: matches.filter((m) => m.kind === 'destination').slice(0, 6),
      themes: matches.filter((m) => m.kind === 'theme').slice(0, 4),
      activities: matches.filter((m) => m.kind === 'activity').slice(0, 6),
      hotelCategories: matches.filter((m) => m.kind === 'hotelCategory').slice(0, 2),
      pages: matches.filter((m) => m.kind === 'page').slice(0, 3),
    };
  }, [query]);

  // CMS titles join the completion vocabulary, so typing "ked" can complete to
  // an actual package name rather than only to our hand-built phrases.
  const suggestions = useMemo(() => {
    const extraTerms = [
      ...(cms.data?.packages || []).map((p) => p.title),
      ...(cms.data?.hotels || []).map((h) => h.name),
    ];
    return getAutocomplete(query, { limit: 5, extraTerms });
  }, [query, cms.data]);

  // Packages come back in CMS order; re-rank them against the query so the
  // closest title match leads regardless of `featured`.
  const packages = useMemo(() => {
    const list = cms.data?.packages || [];
    if (!debouncedQuery) return list;
    return [...list].sort(
      (a, b) =>
        scoreRecord([b.title, b.destination || '', b.category || ''], debouncedQuery) -
        scoreRecord([a.title, a.destination || '', a.category || ''], debouncedQuery)
    );
  }, [cms.data, debouncedQuery]);

  const hotels = cms.data?.hotels || [];
  const blogPosts = cms.data?.blogPosts || [];
  const cmsDestinations = cms.data?.destinations || [];

  const totalCount =
    packages.length +
    hotels.length +
    blogPosts.length +
    local.destinations.length +
    local.themes.length +
    local.activities.length +
    local.hotelCategories.length +
    local.pages.length;

  return {
    query,
    debouncedQuery,
    suggestions,
    local,
    packages,
    hotels,
    blogPosts,
    cmsDestinations,
    totalCount,
    // `isFetching` while a previous result is still shown would flicker the
    // empty state, so "loading" means we have nothing to show yet.
    isLoading: ready && cms.isPending,
    isFetching: cms.isFetching,
    hasQuery: query.length >= MIN_LENGTH,
  };
}

/** Recommendations for the empty state. Recomputed when the palette opens. */
export function useRecommendations(open = true) {
  return useMemo(() => (open ? getRecommendations({ limit: 6 }) : []), [open]);
}
