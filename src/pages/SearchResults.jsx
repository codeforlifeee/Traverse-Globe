import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Hotel, Ticket, Sparkles, BookOpen, Clock, TrendingUp, X } from 'lucide-react';
import Kicker from '../components/revamp/Kicker';
import PackageCard from '../components/PackageCard';
import BreadcrumbTrail from '../components/revamp/BreadcrumbTrail';
import ImageWithFallback from '../components/revamp/ImageWithFallback';
import { SkeletonList } from '../components/revamp/Skeletons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CARD_MEDIA } from '@/lib/cardMetrics';
import { useSiteSearch, useRecommendations, hotelHref, blogHref } from '@/hooks/useSiteSearch';
import {
  getRecentSearches,
  clearRecentSearches,
  pushRecentSearch,
  TRENDING_SEARCHES,
} from '@/lib/searchIndex';

/**
 * /search — the full results page behind the ⌘K palette.
 *
 * Shares one engine with the palette (hooks/useSiteSearch), so ranking is
 * identical; this page just shows every group in full rather than the top rows.
 */
export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const [query, setQuery] = useState(q);
  const [recent, setRecent] = useState([]);

  const {
    local,
    packages,
    hotels,
    blogPosts,
    suggestions,
    totalCount,
    isLoading,
    hasQuery,
  } = useSiteSearch(q, { limits: { packages: 36, hotels: 24, blogPosts: 12, destinations: 10 } });

  const recommendations = useRecommendations(!hasQuery);

  useEffect(() => { setQuery(q); }, [q]);
  useEffect(() => { setRecent(getRecentSearches()); }, [q]);
  useEffect(() => { if (q) pushRecentSearch(q); }, [q]);

  const onSubmit = (e) => {
    e.preventDefault();
    setParams(query.trim() ? { q: query.trim() } : {});
  };

  const groups = useMemo(() => ([
    { key: 'destinations', label: 'Destinations', icon: MapPin, items: local.destinations },
    { key: 'themes', label: 'Themes', icon: Sparkles, items: local.themes },
    { key: 'activities', label: 'Activities', icon: Ticket, items: local.activities },
    { key: 'hotelCategories', label: 'Hotel collections', icon: Hotel, items: local.hotelCategories },
    { key: 'pages', label: 'Pages', icon: Search, items: local.pages },
  ]), [local]);

  return (
    <div className="pt-24 md:pt-28 pb-16">
      <div className="container-custom">
        <BreadcrumbTrail items={[{ label: 'Search' }]} />
        <div className="mt-3">
          <Kicker>Universal search</Kicker>
          <h1 className="text-h1 font-poppins font-bold text-brand-ink mt-2">
            {q ? `Results for "${q}"` : 'Search Traverse Globe'}
          </h1>
          {q && !isLoading && (
            <p className="mt-2 text-sm text-brand-muted-ink font-canva-sans">
              {totalCount} {totalCount === 1 ? 'match' : 'matches'} across packages, hotels, activities and guides.
            </p>
          )}
        </div>

        <form onSubmit={onSubmit} className="mt-6 relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted-ink" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages, hotels, activities, destinations, guides…"
            className="pl-10 h-12 text-base"
            autoFocus
          />
        </form>

        {/* Live completions under the box, so a near-miss query can be corrected
            without retyping it. */}
        {hasQuery && suggestions.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-poppins text-brand-muted-ink">Try</span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setParams({ q: s })}
                className="px-3 py-1.5 rounded-full border border-brand-hairline bg-surface text-sm font-poppins text-brand-ink hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {q ? (
          <div className="mt-10 space-y-14">
            {isLoading ? (
              <SkeletonList count={6} columns={3} />
            ) : totalCount === 0 ? (
              <div className="rounded-2xl border border-dashed border-brand-hairline p-12 text-center">
                <Kicker>No matches</Kicker>
                <h3 className="text-h3 font-poppins font-semibold text-brand-ink mt-2">Try a different search</h3>
                <p className="mt-2 text-sm text-brand-muted-ink font-canva-sans">
                  Suggestions:{' '}
                  <Link to="/destinations/international/uae" className="text-brand-orange">Dubai</Link>,{' '}
                  <Link to="/destinations/international/bali" className="text-brand-orange">Bali</Link>,{' '}
                  <Link to="/packages/theme/family" className="text-brand-orange">Family trips</Link>
                </p>
              </div>
            ) : (
              <>
                {groups.filter((g) => g.items.length > 0).map((g) => (
                  <ResultGroup key={g.key} kicker={`${g.label} (${g.items.length})`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {g.items.map((item) => (
                        <LinkTile key={item.id} to={item.href} icon={g.icon} title={item.title} sub={item.subtitle} meta={item.meta} />
                      ))}
                    </div>
                  </ResultGroup>
                ))}

                {packages.length > 0 && (
                  <ResultGroup kicker={`Packages (${packages.length})`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {packages.map((p) => (
                        <PackageCard key={p._id} pkg={p} category={p.category} showQuickView={false} />
                      ))}
                    </div>
                  </ResultGroup>
                )}

                {hotels.length > 0 && (
                  <ResultGroup kicker={`Hotels (${hotels.length})`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {hotels.map((h) => (
                        <Link
                          key={h._id}
                          to={hotelHref(h)}
                          className="group flex flex-col rounded-2xl overflow-hidden bg-surface border border-brand-hairline shadow-soft-sm hover:shadow-soft-xl hover:-translate-y-1 transition-all"
                        >
                          <div className={cn("relative bg-brand-canvas-2 overflow-hidden", CARD_MEDIA)}>
                            <ImageWithFallback
                              src={h.image}
                              alt={h.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-poppins font-semibold text-brand-ink line-clamp-2 group-hover:text-brand-orange transition-colors">
                              {h.name}
                            </h3>
                            <p className="mt-1 text-xs text-brand-muted-ink font-canva-sans">
                              {[h.city, h.country].filter(Boolean).join(', ') || h.location}
                            </p>
                            {h.price > 0 && (
                              <p className="mt-2 font-poppins font-bold text-brand-orange">
                                ₹{h.price.toLocaleString('en-IN')}
                                <span className="text-xs font-normal text-brand-muted-ink"> / night</span>
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </ResultGroup>
                )}

                {blogPosts.length > 0 && (
                  <ResultGroup kicker={`Travel guides (${blogPosts.length})`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {blogPosts.map((b) => (
                        <LinkTile key={b._id} to={blogHref(b)} icon={BookOpen} title={b.title} sub={b.excerpt} meta={b.category} />
                      ))}
                    </div>
                  </ResultGroup>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            {recent.length > 0 && (
              <section>
                <div className="flex items-center justify-between">
                  <Kicker className="block">Recent searches</Kicker>
                  <button
                    onClick={() => { clearRecentSearches(); setRecent([]); }}
                    className="inline-flex items-center gap-1 text-xs font-poppins text-brand-muted-ink hover:text-brand-orange transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Clear
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {recent.map((s) => (
                    <button
                      key={s}
                      onClick={() => setParams({ q: s })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-hairline bg-surface text-sm font-poppins text-brand-ink hover:border-brand-orange hover:text-brand-orange transition-colors"
                    >
                      <Clock className="w-3.5 h-3.5" /> {s}
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section>
              <Kicker className="block">Trending right now</Kicker>
              <div className="mt-3 flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((t) => (
                  <Link
                    key={t.href}
                    to={t.href}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-orange/10 text-sm font-poppins text-brand-orange hover:bg-brand-orange hover:text-white transition-colors"
                  >
                    <TrendingUp className="w-3.5 h-3.5" /> {t.label}
                  </Link>
                ))}
              </div>
            </section>

            {recommendations.length > 0 && (
              <section>
                <Kicker className="block">Recommended for you</Kicker>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {recommendations.map((r) => (
                    <LinkTile key={r.id} to={r.href} icon={Sparkles} title={r.title} sub={r.reason} meta={r.meta} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultGroup({ kicker, children }) {
  return (
    <section>
      <Kicker className="mb-3 block">{kicker}</Kicker>
      {children}
    </section>
  );
}

/** Compact result row used for every group that is not a package or hotel card. */
function LinkTile({ to, icon: Icon, title, sub, meta }) {
  const external = /^https?:\/\//.test(to || '');
  const props = external
    ? { href: to, target: '_blank', rel: 'noreferrer noopener' }
    : { to };
  const Tag = external ? 'a' : Link;

  return (
    <Tag
      {...props}
      className="group flex items-start gap-3 p-4 rounded-xl border border-brand-hairline bg-surface hover:shadow-soft-md hover:border-brand-orange/40 transition-all"
    >
      <span className="mt-0.5 inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
        <Icon className="w-4 h-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-poppins font-semibold text-brand-ink line-clamp-2 group-hover:text-brand-orange transition-colors">
          {title}
        </span>
        {sub && <span className="mt-0.5 block text-xs text-brand-muted-ink font-canva-sans line-clamp-2">{sub}</span>}
      </span>
      {meta && <span className="shrink-0 text-xs text-brand-muted-ink font-poppins">{meta}</span>}
    </Tag>
  );
}
