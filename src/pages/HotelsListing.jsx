import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHotels } from '../services/sanityClient';
import HotelCard from '../components/revamp/HotelCard';
import BreadcrumbTrail from '../components/revamp/BreadcrumbTrail';
import Kicker from '../components/revamp/Kicker';
import { SkeletonList } from '../components/revamp/Skeletons';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const CATEGORIES = [
  { value: 'luxury', label: 'Luxury' },
  { value: 'business', label: 'Business' },
  { value: 'resort', label: 'Resort' },
  { value: 'budget', label: 'Budget' },
  { value: 'domestic', label: 'Domestic' },
  { value: 'international', label: 'International' },
];

const SORTS = [
  { value: 'popular', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
];

export default function HotelsListing() {
  const { city } = useParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    categories: [],
    stars: [],
  });

  useEffect(() => {
    let cancelled = false;
    fetchHotels()
      .then((data) => !cancelled && setHotels(data || []))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  const facets = useMemo(() => {
    const prices = hotels.map((h) => h.price).filter(Boolean);
    return {
      priceMin: prices.length ? Math.min(...prices) : 0,
      priceMax: prices.length ? Math.max(...prices) : 50000,
    };
  }, [hotels]);

  useEffect(() => {
    if (facets.priceMax && filters.priceRange[1] === 50000) {
      setFilters((f) => ({ ...f, priceRange: [facets.priceMin, facets.priceMax] }));
    }
  }, [facets.priceMin, facets.priceMax]);

  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      if (city && h.city?.toLowerCase() !== city.toLowerCase()) return false;
      if (h.price < filters.priceRange[0] || h.price > filters.priceRange[1]) return false;
      if (filters.categories.length && !filters.categories.includes(h.category)) return false;
      if (filters.stars.length && !filters.stars.includes(h.rating)) return false;
      return true;
    });
  }, [hotels, filters, city]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case 'price-asc': return arr.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-desc': return arr.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'rating': return arr.sort((a, b) => (b.reviewRating || 0) - (a.reviewRating || 0));
      default: return arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filtered, sortBy]);

  const toggle = (key, val) => {
    const arr = filters[key];
    setFilters({ ...filters, [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] });
  };

  const Filters = () => (
    <div className="space-y-6">
      <div>
        <Kicker className="mb-3 block">Price per night</Kicker>
        <Slider
          value={filters.priceRange}
          onValueChange={(v) => setFilters({ ...filters, priceRange: v })}
          min={facets.priceMin}
          max={facets.priceMax}
          step={500}
        />
        <div className="flex items-center justify-between mt-3 text-sm text-brand-muted-ink font-canva-sans">
          <span>₹{filters.priceRange[0].toLocaleString('en-IN')}</span>
          <span>₹{filters.priceRange[1].toLocaleString('en-IN')}</span>
        </div>
      </div>

      <Separator />

      <div>
        <Kicker className="mb-3 block">Category</Kicker>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <label key={c.value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.categories.includes(c.value)}
                onCheckedChange={() => toggle('categories', c.value)}
              />
              <Label className="cursor-pointer font-canva-sans font-normal">{c.label}</Label>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Kicker className="mb-3 block">Star rating</Kicker>
        <div className="space-y-2">
          {[5, 4, 3].map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={filters.stars.includes(s)} onCheckedChange={() => toggle('stars', s)} />
              <Label className="cursor-pointer font-canva-sans font-normal">{'★'.repeat(s)} <span className="text-brand-muted-ink ml-1">{s}+ stars</span></Label>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const activeCount = filters.categories.length + filters.stars.length
    + ((filters.priceRange[0] > facets.priceMin || filters.priceRange[1] < facets.priceMax) ? 1 : 0);

  return (
    <div className="pb-16">
      <div className="bg-brand-canvas border-b border-brand-hairline pt-24 md:pt-28 pb-8">
        <div className="container-custom">
          <BreadcrumbTrail items={city ? [{ label: 'Hotels', to: '/hotels' }, { label: city }] : [{ label: 'Hotels' }]} />
          <div className="mt-3">
            <Kicker>Hotels for families</Kicker>
            <h1 className="text-h1 font-poppins font-bold text-brand-ink mt-2">
              {city ? `Hotels in ${city}` : 'Hotels · India + UAE'}
            </h1>
            <p className="mt-2 text-brand-muted-ink font-canva-sans">
              {loading ? 'Loading…' : `${sorted.length} hotel${sorted.length === 1 ? '' : 's'} available`}
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-brand-hairline bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-h3 font-poppins font-semibold text-brand-ink">Filters</span>
                {activeCount > 0 && <Badge variant="orange">{activeCount}</Badge>}
              </div>
              <Filters />
            </div>
          </aside>

          <section className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6 gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                    {activeCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-[10px] rounded-full bg-brand-orange text-white font-poppins font-semibold">
                        {activeCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
                  <SheetHeader className="mb-4"><SheetTitle>Filter hotels</SheetTitle></SheetHeader>
                  <Filters />
                </SheetContent>
              </Sheet>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-9 py-2 rounded-lg border border-brand-hairline bg-white text-sm font-poppins text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
                >
                  {SORTS.map((s) => <option key={s.value} value={s.value}>Sort: {s.label}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted-ink pointer-events-none" />
              </div>
            </div>

            {loading ? (
              <SkeletonList count={9} columns={3} />
            ) : sorted.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-brand-hairline p-10 text-center bg-white">
                <Kicker>No matches</Kicker>
                <h3 className="text-h3 font-poppins font-semibold text-brand-ink mt-2">Try widening your filters</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sorted.map((h, idx) => (
                  <HotelCard key={h._id} hotel={h} size={idx % 3 === 1 ? 'large' : 'default'} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
