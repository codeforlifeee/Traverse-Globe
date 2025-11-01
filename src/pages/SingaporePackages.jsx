import { useMemo, useState } from 'react';
import { singaporePackages } from '../data/siteData';
import PackageCard from '../components/PackageCard';
import HeroSlider from '../components/HeroSlider';

export default function SingaporePackages() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return singaporePackages;
    return singaporePackages.filter(p => p.title.toLowerCase().includes(q));
  }, [searchTerm]);

  return (
    <div className="min-h-screen pt-20 pb-10">
      <HeroSlider
        images={[
          'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
        ]}
      >
  <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow">Singapore Holiday Packages</h1>
        <p className="text-white/90 mt-3">City lights, world-class attractions, and family fun</p>
        <div className="max-w-3xl mx-auto mt-5">
          <form
            className="flex overflow-hidden rounded-full shadow-xl bg-white"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchTerm(query);
            }}
          >
            <input
              className="flex-1 px-6 py-3 outline-none"
              placeholder="Search Singapore packages..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="bg-primary text-white px-6 hover:bg-secondary transition-colors" aria-label="Search">
              <i className="fa fa-search" />
            </button>
          </form>
          {searchTerm && (
            <p className="text-white/90 text-sm mt-2">Showing results for: <span className="font-semibold">{searchTerm}</span></p>
          )}
        </div>
      </HeroSlider>

      {/* Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filtered.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} category="singapore" />
              ))}
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4">No packages found.</div>
          )}
        </div>
      </section>
    </div>
  );
}
