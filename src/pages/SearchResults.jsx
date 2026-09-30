import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { sanityClient } from '../services/sanityClient';
import { getAllCategories } from '../data/categoryConfig';
import { THEME_LIST } from '../data/themes';
import Kicker from '../components/revamp/Kicker';
import PackageCard from '../components/PackageCard';
import BreadcrumbTrail from '../components/revamp/BreadcrumbTrail';
import { SkeletonList } from '../components/revamp/Skeletons';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const [query, setQuery] = useState(q);
  const [loading, setLoading] = useState(!!q);
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => { setQuery(q); }, [q]);

  useEffect(() => {
    if (!q) return;
    let cancelled = false;
    setLoading(true);
    Promise.all([
      sanityClient.fetch(
        `*[_type == "package" && active == true && (title match $q || destination match $q || overview match $q)][0..24]`,
        { q: `*${q}*` }
      ),
      sanityClient.fetch(
        `*[_type == "destination" && active == true && (title match $q || description match $q)][0..8]`,
        { q: `*${q}*` }
      ),
      sanityClient.fetch(
        `*[_type == "blogPost" && (title match $q || excerpt match $q)][0..8]`,
        { q: `*${q}*` }
      ),
    ])
      .then(([p, d, b]) => {
        if (cancelled) return;
        setPackages(p || []);
        setDestinations(d || []);
        setBlogPosts(b || []);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [q]);

  const matchingThemes = useMemo(() => {
    const lq = q.toLowerCase();
    if (!lq) return [];
    return THEME_LIST.filter((t) => t.name.toLowerCase().includes(lq) || t.headline.toLowerCase().includes(lq));
  }, [q]);

  const matchingCategories = useMemo(() => {
    const lq = q.toLowerCase();
    if (!lq) return [];
    return getAllCategories().filter((c) => c.name.toLowerCase().includes(lq));
  }, [q]);

  const onSubmit = (e) => {
    e.preventDefault();
    setParams({ q: query });
  };

  const total = packages.length + destinations.length + blogPosts.length + matchingThemes.length + matchingCategories.length;

  return (
    <div className="pt-24 md:pt-28 pb-16">
      <div className="container-custom">
        <BreadcrumbTrail items={[{ label: 'Search' }]} />
        <div className="mt-3">
          <Kicker>Universal search</Kicker>
          <h1 className="text-h1 font-poppins font-bold text-brand-ink mt-2">
            {q ? `Results for "${q}"` : 'Search Traverse Globe'}
          </h1>
        </div>

        <form onSubmit={onSubmit} className="mt-6 relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted-ink" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages, destinations, guides…"
            className="pl-10 h-12 text-base"
            autoFocus
          />
        </form>

        {q ? (
          <div className="mt-10 space-y-14">
            {loading ? (
              <SkeletonList count={6} columns={3} />
            ) : total === 0 ? (
              <div className="rounded-2xl border border-dashed border-brand-hairline p-12 text-center">
                <Kicker>No matches</Kicker>
                <h3 className="text-h3 font-poppins font-semibold text-brand-ink mt-2">Try a different search</h3>
                <p className="mt-2 text-sm text-brand-muted-ink font-canva-sans">
                  Suggestions: <Link to="/destinations/international/uae" className="text-brand-orange">Dubai</Link>, <Link to="/destinations/international/bali" className="text-brand-orange">Bali</Link>, <Link to="/packages/theme/family" className="text-brand-orange">Family trips</Link>
                </p>
              </div>
            ) : (
              <>
                {matchingCategories.length > 0 && (
                  <ResultGroup kicker="Destinations">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {matchingCategories.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/destinations/${c.type}/${c.slug}`}
                          className="p-4 rounded-xl border border-brand-hairline bg-white hover:shadow-soft-md hover:border-brand-orange/30 transition"
                        >
                          <span className="text-lg">{c.icon}</span>
                          <p className="mt-1 font-poppins font-semibold text-brand-ink">{c.name}</p>
                          <p className="text-xs text-brand-muted-ink font-canva-sans capitalize">{c.type}</p>
                        </Link>
                      ))}
                    </div>
                  </ResultGroup>
                )}

                {matchingThemes.length > 0 && (
                  <ResultGroup kicker="Themes">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {matchingThemes.map((t) => (
                        <Link
                          key={t.slug}
                          to={`/packages/theme/${t.slug}`}
                          className="p-4 rounded-xl border border-brand-hairline bg-white hover:shadow-soft-md hover:border-brand-orange/30 transition"
                        >
                          <p className="font-poppins font-semibold text-brand-ink">{t.name}</p>
                          <p className="text-sm text-brand-muted-ink font-canva-sans">{t.kicker}</p>
                        </Link>
                      ))}
                    </div>
                  </ResultGroup>
                )}

                {packages.length > 0 && (
                  <ResultGroup kicker={`Packages (${packages.length})`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {packages.map((p) => (
                        <PackageCard key={p._id} pkg={p} category={p.category} destination={`/packages/${p.slug?.current}`} showQuickView={false} />
                      ))}
                    </div>
                  </ResultGroup>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="mt-10">
            <Kicker>Suggestions</Kicker>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Dubai', 'Bali family', 'Kerala honeymoon', 'Chardham', 'Kashmir'].map((s) => (
                <button
                  key={s}
                  onClick={() => setParams({ q: s })}
                  className="px-3 py-1.5 rounded-full bg-brand-canvas-2 hover:bg-brand-hairline text-sm font-poppins text-brand-ink transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
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
