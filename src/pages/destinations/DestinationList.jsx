// DestinationList — one listing page per category (e.g. /destinations/international/uae).
// Mirrors the shared revamp pattern used by PackagesListing: left filter rail +
// mobile sheet, sort dropdown, skeleton grid, zero-state card, "pick the winner"
// elevated middle card every row of three.

import { useEffect, useMemo, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { getCategoryBySlug } from '../../data/categoryConfig';
import { useDestinations } from '../../hooks/useDestinations';
import { slugify } from '../../utils/slug';
import PackageCard from '../../components/PackageCard';
import BreadcrumbTrail from '../../components/revamp/BreadcrumbTrail';
import Kicker from '../../components/revamp/Kicker';
import FilterRail from '../../components/revamp/FilterRail';
import MobileFilterSheet from '../../components/revamp/MobileFilterSheet';
import { SkeletonList } from '../../components/revamp/Skeletons';
import ImageWithFallback from '../../components/revamp/ImageWithFallback';
import { Button } from '@/components/ui/button';

/* ---- shared helpers (duplicated from PackagesListing to keep this file self-contained) ---- */

function parseDurationDays(pkg) {
  const src = pkg.duration || pkg.nights || '';
  const m = String(src).match(/(\d+)\s*D(?:AY)?/i) || String(src).match(/(\d+)\s*days?/i);
  if (m) return parseInt(m[1] || m[2], 10);
  const n = String(src).match(/(\d+)\s*N/i);
  if (n) return parseInt(n[1], 10) + 1;
  return 0;
}

function bucketDuration(days) {
  if (days <= 3) return 'short';
  if (days <= 6) return 'mid';
  return 'long';
}

const SORTS = [
  { value: 'popular', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
];

export default function DestinationList() {
  const { type, category } = useParams();
  const config = getCategoryBySlug(category);
  const { packages = [], banners = [], isLoading } = useDestinations(category);

  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    durations: [],
    themes: [],
    stars: [],
    categories: [],
    freeCancellation: false,
  });

  // Compute the min/max from the actual data so the slider feels right for *this* destination
  const facets = useMemo(() => {
    if (!packages.length) return { priceMin: 0, priceMax: 500000 };
    const prices = packages.map((p) => p.price).filter(Boolean);
    return {
      priceMin: prices.length ? Math.min(...prices) : 0,
      priceMax: prices.length ? Math.max(...prices) : 500000,
    };
  }, [packages]);

  useEffect(() => {
    if (facets.priceMax && filters.priceRange[1] === 500000) {
      setFilters((f) => ({ ...f, priceRange: [facets.priceMin, facets.priceMax] }));
    }
  }, [facets.priceMin, facets.priceMax]);

  const filtered = useMemo(() => {
    const [pmin, pmax] = filters.priceRange;
    return packages.filter((p) => {
      if (p.price != null && (p.price < pmin || p.price > pmax)) return false;
      if (filters.durations.length && !filters.durations.includes(bucketDuration(parseDurationDays(p)))) return false;
      if (filters.themes.length) {
        const has = Array.isArray(p.themes) && p.themes.some((t) => filters.themes.includes(t));
        if (!has) return false;
      }
      if (filters.freeCancellation && !(p.freeCancellationDays > 0)) return false;
      return true;
    });
  }, [packages, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case 'price-asc': return arr.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-desc': return arr.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'rating': return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default: return arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filtered, sortBy]);

  const activeCount = filters.durations.length + filters.themes.length + filters.stars.length
    + filters.categories.length
    + (filters.freeCancellation ? 1 : 0)
    + ((filters.priceRange[0] > facets.priceMin || filters.priceRange[1] < facets.priceMax) ? 1 : 0);

  if (!config) return <Navigate to="/destinations" replace />;
  if (config.type !== type) return <Navigate to={`/destinations/${config.type}/${category}`} replace />;

  const typeLabel = type === 'international' ? 'International' : 'Domestic';
  const hero = banners?.[0] || null;

  return (
    <div className="pb-16 bg-brand-canvas min-h-screen">
      {/* ---------- Compact hero (no on-image search) ---------- */}
      <section className="relative">
        <div className="relative h-[280px] md:h-[360px] lg:h-[420px] overflow-hidden bg-brand-canvas-2">
          <ImageWithFallback
            src={hero}
            alt={`${config.name} travel`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-scrim/55 via-brand-scrim/35 to-brand-scrim/70" />

          <div className="relative h-full container-custom flex flex-col justify-end pb-6 md:pb-8">
            <div className="text-white">
              <BreadcrumbTrail
                items={[
                  { label: 'Destinations', to: '/destinations' },
                  { label: typeLabel, to: `/destinations/${type}` },
                  { label: config.name },
                ]}
                tone="light"
              />
              <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <Kicker tone="orange" size="lg" className="text-white/90">{typeLabel} destination</Kicker>
                  <h1 className="font-season text-3xl md:text-5xl font-bold mt-2 leading-tight">
                    {config.title}
                  </h1>
                  {config.description && (
                    <p className="mt-2 max-w-2xl text-sm md:text-base text-white/90 font-canva-sans">
                      {config.description}
                    </p>
                  )}
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-kicker uppercase text-white/70">Available packages</p>
                  <p className="font-season text-3xl font-bold">
                    {isLoading ? '…' : sorted.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Body with left filter rail + grid ---------- */}
      <div className="container-custom mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter rail — desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-brand-hairline bg-surface p-5 shadow-soft-sm">
              <FilterRail facets={facets} values={filters} onChange={setFilters} />
            </div>
          </aside>

          {/* Results */}
          <section className="lg:col-span-3">
            {/* Toolbar: result count + mobile filter trigger + sort */}
            <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
              <p className="text-sm font-canva-sans text-brand-muted-ink">
                {isLoading
                  ? 'Loading packages…'
                  : <>Showing <span className="font-poppins font-semibold text-brand-ink">{sorted.length}</span> {sorted.length === 1 ? 'package' : 'packages'} in {config.name}</>
                }
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <MobileFilterSheet
                  facets={facets}
                  values={filters}
                  onChange={setFilters}
                  activeCount={activeCount}
                  resultCount={sorted.length}
                />
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-9 py-2 rounded-lg border border-brand-hairline bg-surface text-sm font-poppins text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    {SORTS.map((s) => <option key={s.value} value={s.value}>Sort: {s.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted-ink pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid / skeleton / empty state */}
            {isLoading ? (
              <SkeletonList count={9} columns={3} />
            ) : sorted.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-brand-hairline bg-surface p-10 text-center">
                <Kicker>Nothing matched</Kicker>
                <h3 className="text-h3 font-poppins font-semibold text-brand-ink mt-2">
                  Try widening your filters
                </h3>
                <p className="mt-2 text-sm text-brand-muted-ink font-canva-sans max-w-sm mx-auto">
                  Reset filters, or widen the price range, to see every {config.name} package.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setFilters({
                    priceRange: [facets.priceMin, facets.priceMax],
                    durations: [], themes: [], stars: [], categories: [], freeCancellation: false,
                  })}
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sorted.map((p, idx) => (
                  <PackageCard
                    key={p._id || p.id}
                    pkg={p}
                    category={category}
                    destination={`/destinations/${type}/${category}/${p.slug?.current || slugify(p.title)}`}
                    // Elevate the middle card in each row of three — "pick the winner" per DESIGN.md
                    size={idx % 3 === 1 ? 'large' : 'default'}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
