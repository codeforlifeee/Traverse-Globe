import { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPackages } from '../services/sanityClient';
import { getTheme } from '../data/themes';
import PackageCard from '../components/PackageCard';
import BreadcrumbTrail from '../components/revamp/BreadcrumbTrail';
import Kicker from '../components/revamp/Kicker';
import ImageWithFallback from '../components/revamp/ImageWithFallback';
import { SkeletonList } from '../components/revamp/Skeletons';

export default function PackagesTheme() {
  const { theme: themeSlug } = useParams();
  const theme = getTheme(themeSlug);
  const [rawPackages, setRawPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!theme) return;
    let cancelled = false;
    fetchPackages()
      .then((data) => !cancelled && setRawPackages(data || []))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [theme]);

  const themed = useMemo(
    () => rawPackages.filter((p) => Array.isArray(p.themes) && p.themes.includes(themeSlug)),
    [rawPackages, themeSlug]
  );

  if (!theme) return <Navigate to="/packages" replace />;

  const destinationCounts = useMemo(() => {
    const counts = {};
    themed.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [themed]);

  return (
    <div className="pb-16">
      {/* Editorial hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src={theme.heroImage} alt={theme.name} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/85 via-brand-ink/50 to-brand-ink/20" />
        </div>
        <div className="relative container-custom pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-24">
          <div className="max-w-3xl">
            <BreadcrumbTrail
              items={[{ label: 'Packages', to: '/packages' }, { label: theme.name }]}
              tone="light"
            />
            <div className="mt-4">
              <Kicker tone="orange" size="lg" className="text-white/90">Theme · {theme.kicker}</Kicker>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-display font-poppins font-bold text-white mt-3 leading-tight"
              >
                {theme.headline}
              </motion.h1>
              <p className="mt-4 text-body-lg text-white/85 font-canva-sans max-w-2xl">
                {theme.subhead}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by destination within theme */}
      {Object.keys(destinationCounts).length > 0 && (
        <div className="container-custom mt-10">
          <Kicker>Popular for this theme</Kicker>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(destinationCounts).map(([cat, count]) => (
              <span key={cat} className="px-3 py-1.5 rounded-full bg-brand-canvas-2 text-brand-ink text-sm font-poppins font-medium">
                {cat.charAt(0).toUpperCase() + cat.slice(1)} <span className="text-brand-muted-ink">({count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="container-custom mt-10">
        <h2 className="text-h2 font-poppins font-bold text-brand-ink mb-6">
          {themed.length} {theme.name.toLowerCase()} packages
        </h2>

        {loading ? (
          <SkeletonList count={6} columns={3} />
        ) : themed.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-brand-hairline p-10 text-center">
            <Kicker>New theme</Kicker>
            <h3 className="text-h3 font-poppins font-semibold text-brand-ink mt-2">
              We're curating {theme.name.toLowerCase()} packages
            </h3>
            <p className="mt-2 text-sm text-brand-muted-ink font-canva-sans max-w-md mx-auto">
              This section is being built. Meanwhile, chat with us and we'll hand-pick something.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {themed.map((p, idx) => (
              <PackageCard
                key={p._id || p.id}
                pkg={p}
                category={p.category}
                destination={`/packages/${p.slug?.current}`}
                size={idx % 3 === 1 ? 'large' : 'default'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
