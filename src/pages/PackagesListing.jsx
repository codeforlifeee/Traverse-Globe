import { useEffect, useMemo, useState } from 'react';
import { useAllPackages } from '../hooks/queries';
import { getAllCategories } from '../data/categoryConfig';
import PackageCard from '../components/PackageCard';
import FilterRail from '../components/revamp/FilterRail';
import MobileFilterSheet from '../components/revamp/MobileFilterSheet';
import BreadcrumbTrail from '../components/revamp/BreadcrumbTrail';
import Kicker from '../components/revamp/Kicker';
import { SkeletonList } from '../components/revamp/Skeletons';
import NoMatchCTA from '../components/revamp/NoMatchCTA';
import { ChevronDown } from 'lucide-react';

function parseDurationDays(pkg) {
  const src = pkg.duration || pkg.nights || '';
  const m = String(src).match(/(\d+)\s*D|(\d+)\s*D(?:AY)?/i) || String(src).match(/(\d+)\s*days?/i);
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

export default function PackagesListing() {
  const { data: rawPackages = [], isPending: loading } = useAllPackages();
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    durations: [],
    themes: [],
    stars: [],
    categories: [],
  });

  const facets = useMemo(() => {
    if (!rawPackages.length) return { priceMin: 0, priceMax: 500000 };
    const prices = rawPackages.map((p) => p.price).filter(Boolean);
    return {
      priceMin: Math.min(...prices),
      priceMax: Math.max(...prices),
    };
  }, [rawPackages]);

  useEffect(() => {
    if (facets.priceMax && filters.priceRange[1] === 500000) {
      setFilters((f) => ({ ...f, priceRange: [facets.priceMin, facets.priceMax] }));
    }
  }, [facets.priceMin, facets.priceMax]);

  const filtered = useMemo(() => {
    const [pmin, pmax] = filters.priceRange;
    return rawPackages.filter((p) => {
      if (p.price < pmin || p.price > pmax) return false;
      if (filters.durations.length && !filters.durations.includes(bucketDuration(parseDurationDays(p)))) return false;
      if (filters.themes.length) {
        const has = Array.isArray(p.themes) && p.themes.some((t) => filters.themes.includes(t));
        if (!has) return false;
      }
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      return true;
    });
  }, [rawPackages, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case 'price-asc': return arr.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-desc': return arr.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'rating': return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default: return arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filtered, sortBy]);

  const resetFilters = () => setFilters({
    priceRange: [facets.priceMin, facets.priceMax],
    durations: [], themes: [], stars: [], categories: [],
  });

  const activeCount = filters.durations.length + filters.themes.length + filters.stars.length + filters.categories.length
    + ((filters.priceRange[0] > facets.priceMin || filters.priceRange[1] < facets.priceMax) ? 1 : 0);

  const allCategories = getAllCategories();

  return (
    <div className="pb-16">
      {/* Page header */}
      <div className="page-band border-b border-brand-hairline pt-24 md:pt-28 pb-8">
        <div className="container-custom">
          <BreadcrumbTrail items={[{ label: 'All packages' }]} />
          <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Kicker>Browse everything</Kicker>
              <h1 className="text-h1 font-poppins font-bold text-brand-ink mt-2">All family packages · India + UAE</h1>
              <p className="mt-2 text-brand-muted-ink font-canva-sans">
                {loading ? 'Loading…' : `${sorted.length} package${sorted.length === 1 ? '' : 's'} match your filters`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-custom mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters — left rail on lg+ */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-brand-hairline bg-surface p-5">
              <FilterRail facets={facets} values={filters} onChange={setFilters} categories={allCategories} />
            </div>
          </aside>

          {/* Results */}
          <section className="lg:col-span-3">
            {/* Mobile filter + sort toolbar */}
            <div className="flex items-center justify-between mb-6 gap-3">
              <MobileFilterSheet
                facets={facets}
                values={filters}
                onChange={setFilters}
                categories={allCategories}
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

            {loading ? (
              <SkeletonList count={9} columns={3} />
            ) : sorted.length === 0 ? (
              <NoMatchCTA variant="empty" onReset={resetFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sorted.map((p, idx) => (
                    <PackageCard
                      key={p._id || p.id}
                      pkg={p}
                      category={p.category}
                      // Elevate the middle card in every row of 3 — "Pick the Winner"
                      size={idx % 3 === 1 ? 'large' : 'default'}
                    />
                  ))}
                </div>
                <NoMatchCTA onReset={resetFilters} />
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
