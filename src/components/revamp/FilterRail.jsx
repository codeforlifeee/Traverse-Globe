import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Kicker from './Kicker';
import { cn } from '@/lib/utils';

/**
 * FilterRail — left-rail filters used on /packages listings.
 * Also renders inside <MobileFilterSheet> on small screens.
 * REVAMP_PLAN §5.1 §4.2.
 */

const DURATIONS = [
  { value: 'short', label: '1–3 days' },
  { value: 'mid', label: '4–6 days' },
  { value: 'long', label: '7+ days' },
];

const THEMES = [
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'family', label: 'Family with Kids' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'pilgrimage', label: 'Pilgrimage' },
  { value: 'beach', label: 'Beach' },
  { value: 'hills', label: 'Hills' },
];

const STARS = [5, 4, 3];

export default function FilterRail({ facets, values, onChange, categories = [] }) {
  const {
    priceRange = [0, 500000],
    durations = [],
    themes = [],
    stars = [],
    categories: selectedCats = [],
    freeCancellation = false,
  } = values || {};

  const priceMin = facets?.priceMin ?? 0;
  const priceMax = facets?.priceMax ?? 500000;

  const toggleArray = (key, val) => {
    const arr = values[key] || [];
    const next = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
    onChange({ ...values, [key]: next });
  };

  const activeCount = durations.length + themes.length + stars.length + selectedCats.length
    + (freeCancellation ? 1 : 0)
    + (priceRange[0] > priceMin || priceRange[1] < priceMax ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-h3 font-poppins font-semibold text-brand-ink">Filters</span>
          {activeCount > 0 && <Badge variant="orange">{activeCount}</Badge>}
        </div>
        {activeCount > 0 && (
          <button
            onClick={() => onChange({ priceRange: [priceMin, priceMax], durations: [], themes: [], stars: [], categories: [], freeCancellation: false })}
            className="text-xs text-brand-orange hover:underline font-poppins"
          >
            Reset
          </button>
        )}
      </div>

      {/* Price */}
      <FilterSection kicker="Price range">
        <div className="px-1">
          <Slider
            value={priceRange}
            onValueChange={(v) => onChange({ ...values, priceRange: v })}
            min={priceMin}
            max={priceMax}
            step={1000}
          />
        </div>
        <div className="flex items-center justify-between mt-3 text-sm text-brand-muted-ink font-canva-sans">
          <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
          <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
        </div>
      </FilterSection>

      <Separator />

      {/* Duration */}
      <FilterSection kicker="Duration">
        <div className="flex flex-wrap gap-2">
          {DURATIONS.map((d) => {
            const active = durations.includes(d.value);
            return (
              <button
                key={d.value}
                onClick={() => toggleArray('durations', d.value)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-poppins border transition-colors',
                  active
                    ? 'bg-brand-orange text-white border-brand-orange'
                    : 'bg-surface text-brand-ink border-brand-hairline hover:border-brand-orange/40'
                )}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <Separator />

      {/* Themes */}
      <FilterSection kicker="Theme">
        <div className="space-y-2">
          {THEMES.map((t) => (
            <label key={t.value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={themes.includes(t.value)}
                onCheckedChange={() => toggleArray('themes', t.value)}
              />
              <Label className="cursor-pointer font-canva-sans font-normal">{t.label}</Label>
            </label>
          ))}
        </div>
      </FilterSection>

      {categories.length > 0 && (
        <>
          <Separator />
          <FilterSection kicker="Destination">
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {categories.map((c) => (
                <label key={c.slug} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedCats.includes(c.slug)}
                    onCheckedChange={() => toggleArray('categories', c.slug)}
                  />
                  <Label className="cursor-pointer font-canva-sans font-normal">{c.name}</Label>
                </label>
              ))}
            </div>
          </FilterSection>
        </>
      )}

      <Separator />

      <FilterSection kicker="Star rating">
        <div className="space-y-2">
          {STARS.map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={stars.includes(s)}
                onCheckedChange={() => toggleArray('stars', s)}
              />
              <Label className="cursor-pointer font-canva-sans font-normal">{'★'.repeat(s)}<span className="text-brand-muted-ink ml-1">{s}+ stars</span></Label>
            </label>
          ))}
        </div>
      </FilterSection>

      <Separator />

      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox
          checked={freeCancellation}
          onCheckedChange={(v) => onChange({ ...values, freeCancellation: !!v })}
        />
        <Label className="cursor-pointer font-canva-sans font-normal">Free cancellation only</Label>
      </label>
    </div>
  );
}

function FilterSection({ kicker, children }) {
  return (
    <div>
      <Kicker className="mb-3 block">{kicker}</Kicker>
      {children}
    </div>
  );
}
