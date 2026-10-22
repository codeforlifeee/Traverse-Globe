import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import {
  MapPin,
  Package,
  Sparkles,
  Compass,
  TrendingUp,
  Search,
  Clock,
  Hotel,
  BookOpen,
  Ticket,
  FileText,
  X,
  Loader2,
} from 'lucide-react';
import { useSiteSearch, useRecommendations, packageHref, hotelHref, blogHref } from '@/hooks/useSiteSearch';
import {
  getRecentSearches,
  clearRecentSearches,
  pushRecentSearch,
  TRENDING_SEARCHES,
} from '@/lib/searchIndex';
import { cn } from '@/lib/utils';

/**
 * Universal search palette. Opens on Ctrl/Cmd + K or from the header pill.
 *
 * Covers everything on the site: packages and hotels and guides from the CMS,
 * plus destinations, themes, activities and key pages from the local index
 * (see src/lib/searchIndex.js). Query completion, recent searches and
 * recommendations behave like a search engine's own dropdown — suggestions
 * appear from the second character, before the CMS request resolves.
 *
 * cmdk's own filtering is disabled (`shouldFilter={false}`): ranking happens in
 * useSiteSearch, which scores CMS and local results on the same scale. Leaving
 * cmdk to filter on top of that would hide correctly-ranked rows.
 */

/** One row. `icon` is tinted orange for actions, muted for content. */
function Row({ icon: Icon, label, meta, sub, onSelect, value, accent = false }) {
  return (
    <CommandItem value={value || label} onSelect={onSelect}>
      <Icon className={cn('w-4 h-4 mr-2.5 shrink-0', accent ? 'text-brand-orange' : 'text-brand-muted-ink')} />
      <span className="flex-1 min-w-0">
        <span className="block truncate text-brand-ink">{label}</span>
        {sub && <span className="block truncate text-xs text-brand-muted-ink">{sub}</span>}
      </span>
      {meta && <span className="ml-2 shrink-0 text-xs text-brand-muted-ink font-poppins">{meta}</span>}
    </CommandItem>
  );
}

const KIND_ICON = {
  destination: MapPin,
  theme: Sparkles,
  activity: Ticket,
  hotelCategory: Hotel,
  page: FileText,
};

export default function SearchCommand({ open, onOpenChange }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState([]);

  const {
    suggestions,
    local,
    packages,
    hotels,
    blogPosts,
    totalCount,
    isLoading,
    isFetching,
    hasQuery,
  } = useSiteSearch(query, { enabled: open });

  const recommendations = useRecommendations(open && !hasQuery);

  // Refresh history each time the palette opens; clear the box so a new session
  // does not start inside the previous query.
  useEffect(() => {
    if (!open) return;
    setRecent(getRecentSearches());
    setQuery('');
  }, [open]);

  const go = (path, term) => {
    if (term) pushRecentSearch(term);
    onOpenChange(false);
    if (/^https?:\/\//.test(path)) {
      window.open(path, '_blank', 'noopener,noreferrer');
      return;
    }
    navigate(path);
  };

  const runSearch = (term) => {
    const q = String(term || query).trim();
    if (!q) return;
    pushRecentSearch(q);
    onOpenChange(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const showIdle = !hasQuery;

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} shouldFilter={false} label="Search Traverse Globe">
      <CommandInput
        placeholder="Search packages, hotels, activities, destinations…"
        value={query}
        onValueChange={setQuery}
        onKeyDown={(e) => {
          // Enter on the input with nothing highlighted falls through to the
          // full-results page; cmdk handles Enter on a highlighted row itself.
          if (e.key === 'Enter' && query && !e.defaultPrevented) runSearch();
        }}
      />

      <CommandList>
        <CommandEmpty>
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-brand-orange" /> Searching…
            </span>
          ) : hasQuery ? (
            <span>
              No matches for “{query}”. <span className="text-brand-orange">Press Enter</span> to search everything.
            </span>
          ) : (
            'Start typing…'
          )}
        </CommandEmpty>

        {/* ── Idle state: history, trending, recommendations ── */}
        {showIdle && recent.length > 0 && (
          <>
            <CommandGroup heading="Recent searches">
              {recent.map((term) => (
                <Row
                  key={`recent-${term}`}
                  icon={Clock}
                  label={term}
                  value={`recent ${term}`}
                  onSelect={() => runSearch(term)}
                />
              ))}
              <CommandItem
                value="clear-recent-searches"
                onSelect={() => {
                  clearRecentSearches();
                  setRecent([]);
                }}
              >
                <X className="w-4 h-4 mr-2.5 shrink-0 text-brand-muted-ink" />
                <span className="text-brand-muted-ink">Clear search history</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {showIdle && (
          <>
            <CommandGroup heading="Trending">
              {TRENDING_SEARCHES.map((t) => (
                <Row
                  key={t.href}
                  icon={TrendingUp}
                  accent
                  label={t.label}
                  value={`trending ${t.label}`}
                  onSelect={() => go(t.href, t.label)}
                />
              ))}
            </CommandGroup>

            {recommendations.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Recommended for you">
                  {recommendations.map((r) => (
                    <Row
                      key={`rec-${r.id}`}
                      icon={KIND_ICON[r.kind] || Compass}
                      label={r.title}
                      sub={r.reason}
                      meta={r.meta}
                      value={`rec ${r.title}`}
                      onSelect={() => go(r.href, r.title)}
                    />
                  ))}
                </CommandGroup>
              </>
            )}
          </>
        )}

        {/* ── Query completions ── */}
        {hasQuery && suggestions.length > 0 && (
          <CommandGroup heading="Suggestions">
            {suggestions.map((s) => (
              <Row
                key={`sug-${s}`}
                icon={Search}
                label={s}
                value={`suggest ${s}`}
                onSelect={() => runSearch(s)}
              />
            ))}
          </CommandGroup>
        )}

        {/* ── Packages ── */}
        {packages.length > 0 && (
          <CommandGroup heading={`Packages (${packages.length})`}>
            {packages.slice(0, 6).map((p) => (
              <Row
                key={p._id}
                icon={Package}
                label={p.title}
                sub={[p.destination, p.duration].filter(Boolean).join(' · ') || undefined}
                meta={p.price ? `₹${p.price.toLocaleString('en-IN')}` : undefined}
                value={`pkg ${p._id}`}
                onSelect={() => go(packageHref(p), query)}
              />
            ))}
          </CommandGroup>
        )}

        {/* ── Hotels ── */}
        {hotels.length > 0 && (
          <CommandGroup heading={`Hotels (${hotels.length})`}>
            {hotels.slice(0, 5).map((h) => (
              <Row
                key={h._id}
                icon={Hotel}
                label={h.name}
                sub={[h.city, h.country].filter(Boolean).join(', ') || h.location || undefined}
                meta={h.price ? `₹${h.price.toLocaleString('en-IN')}` : undefined}
                value={`hotel ${h._id}`}
                onSelect={() => go(hotelHref(h), query)}
              />
            ))}
          </CommandGroup>
        )}

        {/* ── Activities ── */}
        {local.activities.length > 0 && (
          <CommandGroup heading="Activities">
            {local.activities.map((a) => (
              <Row
                key={a.id}
                icon={Ticket}
                label={a.title}
                sub={a.subtitle}
                meta={a.meta}
                value={`act ${a.id}`}
                onSelect={() => go(a.href, query)}
              />
            ))}
          </CommandGroup>
        )}

        {/* ── Destinations ── */}
        {local.destinations.length > 0 && (
          <CommandGroup heading="Destinations">
            {local.destinations.map((d) => (
              <Row
                key={d.id}
                icon={MapPin}
                label={d.title}
                meta={d.meta}
                value={`dest ${d.id}`}
                onSelect={() => go(d.href, query)}
              />
            ))}
          </CommandGroup>
        )}

        {/* ── Themes ── */}
        {local.themes.length > 0 && (
          <CommandGroup heading="Themes">
            {local.themes.map((t) => (
              <Row
                key={t.id}
                icon={Sparkles}
                label={t.title}
                sub={t.subtitle}
                value={`theme ${t.id}`}
                onSelect={() => go(t.href, query)}
              />
            ))}
          </CommandGroup>
        )}

        {/* ── Guides ── */}
        {blogPosts.length > 0 && (
          <CommandGroup heading="Travel guides">
            {blogPosts.slice(0, 4).map((b) => (
              <Row
                key={b._id}
                icon={BookOpen}
                label={b.title}
                sub={b.category}
                value={`blog ${b._id}`}
                onSelect={() => go(blogHref(b), query)}
              />
            ))}
          </CommandGroup>
        )}

        {/* ── Hotel collections + pages ── */}
        {(local.hotelCategories.length > 0 || local.pages.length > 0) && (
          <CommandGroup heading="Pages">
            {[...local.hotelCategories, ...local.pages].map((p) => (
              <Row
                key={p.id}
                icon={KIND_ICON[p.kind] || FileText}
                label={p.title}
                meta={p.meta}
                value={`page ${p.id}`}
                onSelect={() => go(p.href, query)}
              />
            ))}
          </CommandGroup>
        )}

        {/* With cmdk filtering disabled, CommandEmpty only fires when the list
            renders nothing at all — and the "see all results" row below always
            renders. So the no-match notice is stated here instead. */}
        {hasQuery && !isLoading && totalCount === 0 && (
          <div className="px-4 py-6 text-center text-sm font-canva-sans text-brand-muted-ink">
            Nothing matched “{query}”. Try a destination, a month, or a budget —
            or <span className="text-brand-orange font-semibold">press Enter</span> to search everything.
          </div>
        )}

        {/* ── Always offer the full results page ── */}
        {hasQuery && (
          <>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem value="see-all-results" onSelect={() => runSearch()}>
                <Compass className="w-4 h-4 mr-2.5 shrink-0 text-brand-orange" />
                <span className="flex-1 text-brand-ink">
                  See all results for “{query}”
                </span>
                {isFetching ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-muted-ink" />
                ) : (
                  totalCount > 0 && (
                    <span className="text-xs text-brand-muted-ink font-poppins">{totalCount} matches</span>
                  )
                )}
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
