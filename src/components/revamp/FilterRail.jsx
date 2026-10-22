import { useEffect, useState } from 'react';
import { Baby, Compass, Heart, Landmark, Mountain, Palmtree, RotateCcw } from 'lucide-react';
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

// Each theme carries an icon so the block scans as a set of choices rather than
// a column of identical checkboxes.
const THEMES = [
  { value: 'honeymoon', label: 'Honeymoon', icon: Heart },
  { value: 'family', label: 'Family with Kids', icon: Baby },
  { value: 'adventure', label: 'Adventure', icon: Compass },
  { value: 'pilgrimage', label: 'Pilgrimage', icon: Landmark },
  { value: 'beach', label: 'Beach', icon: Palmtree },
  { value: 'hills', label: 'Hills', icon: Mountain },
];

const STARS = [5, 4, 3];

const EMPTY = { durations: [], themes: [], stars: [], categories: [] };

/** ₹1,23,456 → "1,23,456", and back. Kept as text so the field can be cleared while typing. */
const formatINR = (n) => (Number.isFinite(n) ? n.toLocaleString('en-IN') : '');
const parseINR = (s) => {
  const digits = String(s).replace(/[^\d]/g, '');
  return digits ? parseInt(digits, 10) : NaN;
};

/**
 * A highlighted min/max box. Typing commits on blur or Enter so that half-typed
 * numbers never momentarily filter everything out of the results.
 */
function PriceBound({ label, value, onCommit }) {
  const [draft, setDraft] = useState(formatINR(value));

  // Re-sync when the slider (or a reset) moves the bound from outside.
  useEffect(() => { setDraft(formatINR(value)); }, [value]);

  const commit = () => {
    const parsed = parseINR(draft);
    if (Number.isFinite(parsed)) onCommit(parsed);
    else setDraft(formatINR(value));
  };

  return (
    <label className="flex-1 min-w-0 block rounded-xl border-2 border-brand-orange/30 bg-brand-orange/5 px-3 py-2 focus-within:border-brand-orange transition-colors">
      <span className="block text-[10px] font-poppins font-semibold uppercase tracking-widest text-brand-orange">
        {label}
      </span>
      <span className="flex items-center gap-1">
        <span className="text-brand-ink font-poppins text-sm">₹</span>
        <input
          type="text"
          inputMode="numeric"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); commit(); } }}
          aria-label={`${label} price`}
          className="w-full min-w-0 bg-transparent border-0 p-0 font-poppins font-semibold text-sm text-brand-ink focus:outline-none focus:ring-0"
        />
      </span>
    </label>
  );
}

export default function FilterRail({ facets, values, onChange, categories = [] }) {
  const {
    priceRange = [0, 500000],
    durations = [],
    themes = [],
    stars = [],
    categories: selectedCats = [],
  } = values || {};

  const priceMin = facets?.priceMin ?? 0;
  const priceMax = facets?.priceMax ?? 500000;

  const toggleArray = (key, val) => {
    const arr = values[key] || [];
    const next = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
    onChange({ ...values, [key]: next });
  };

  // Clamp to the facet bounds and keep min ≤ max, whichever side was edited.
  const setBound = (index) => (raw) => {
    const clamped = Math.min(Math.max(raw, priceMin), priceMax);
    const next = [...priceRange];
    next[index] = clamped;
    if (index === 0 && clamped > next[1]) next[1] = clamped;
    if (index === 1 && clamped < next[0]) next[0] = clamped;
    onChange({ ...values, priceRange: next });
  };

  const reset = () => onChange({ priceRange: [priceMin, priceMax], ...EMPTY });

  const activeCount = durations.length + themes.length + stars.length + selectedCats.length
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
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-hairline px-3 py-1.5 text-xs font-poppins text-brand-ink hover:border-brand-orange hover:text-brand-orange transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Price — the two bounds are the control; the slider is the coarse adjuster */}
      <FilterSection kicker="Price range">
        <div className="flex items-center gap-2 mb-4">
          <PriceBound label="Min" value={priceRange[0]} onCommit={setBound(0)} />
          <span className="text-brand-muted-ink shrink-0" aria-hidden="true">–</span>
          <PriceBound label="Max" value={priceRange[1]} onCommit={setBound(1)} />
        </div>
        <div className="px-1">
          <Slider
            value={priceRange}
            onValueChange={(v) => onChange({ ...values, priceRange: v })}
            min={priceMin}
            max={priceMax}
            step={1000}
            minStepsBetweenThumbs={1}
            aria-label="Price range"
          />
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
                aria-pressed={active}
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

      {/* Themes — icon tiles rather than a checkbox list */}
      <FilterSection kicker="Theme">
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((t) => {
            const active = themes.includes(t.value);
            const Icon = t.icon;
            return (
              <button
                key={t.value}
                onClick={() => toggleArray('themes', t.value)}
                aria-pressed={active}
                className={cn(
                  'flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all',
                  active
                    ? 'border-brand-orange bg-brand-orange/10 text-brand-orange shadow-soft-sm'
                    : 'border-brand-hairline bg-surface text-brand-ink hover:border-brand-orange/40 hover:-translate-y-0.5'
                )}
              >
                <Icon className={cn('w-4 h-4', active ? 'text-brand-orange' : 'text-brand-muted-ink')} />
                <span className="text-xs font-poppins font-medium leading-tight">{t.label}</span>
              </button>
            );
          })}
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
              <Label className="cursor-pointer font-canva-sans font-normal">
                {'★'.repeat(s)}<span className="text-brand-muted-ink ml-1">{s}+ stars</span>
              </Label>
            </label>
          ))}
        </div>
      </FilterSection>
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
