// DestinationList Component
// Dynamic component that displays packages for any destination category
// Replaces all individual destination pages (UAEPackages, BaliPackages, etc.)

import { useMemo, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getCategoryBySlug } from '../../data/categoryConfig';
import { useDestinations } from '../../hooks/useDestinations';
import PackageCard from '../../components/PackageCard';
import HeroSlider from '../../components/HeroSlider';
import { slugify } from '../../utils/slug';

export default function DestinationList() {
  const { type, category } = useParams();
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Get category configuration
  const config = getCategoryBySlug(category);

  // Fetch packages and banners for this category
  const { packages, banners, isLoading, error } = useDestinations(category);

  // Filter packages based on search
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return packages;
    return packages.filter(p => p.title.toLowerCase().includes(q));
  }, [packages, searchTerm]);

  // Validate category exists and type matches
  if (!config) {
    return <Navigate to="/destinations" replace />;
  }

  if (config.type !== type) {
    // Redirect to correct type if mismatch
    return <Navigate to={`/destinations/${config.type}/${category}`} replace />;
  }

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(query);
  };

  // Breadcrumb helper
  const typeLabel = type === 'international' ? 'International' : 'Domestic';

  return (
    <div className="min-h-screen pt-20 pb-8">
      {/* Hero Slider with Search */}
      <section className="relative">
        <HeroSlider 
          images={banners} 
          className="w-full h-[280px] md:h-[420px] lg:h-[520px]"
        >
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-3xl">
            <div className="bg-white rounded-2xl p-4 md:p-5 shadow-2xl border border-lightGray">
              {/* Breadcrumb */}
              <div className="text-sm text-darkBlue/60 mb-2 font-canva-sans">
                <Link to="/" className="hover:text-orange">Home</Link>
                <span className="mx-2">→</span>
                <Link to="/destinations" className="hover:text-orange">Destinations</Link>
                <span className="mx-2">→</span>
                <Link to={`/destinations/${type}`} className="hover:text-orange">{typeLabel}</Link>
                <span className="mx-2">→</span>
                <span className="text-darkBlue font-semibold">{config.name}</span>
              </div>

              {/* Title */}
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-season font-bold text-darkBlue">
                  {config.title}
                </h1>
                <p className="text-darkBlue/70 mt-2 font-canva-sans">{config.description}</p>
              </div>

              {/* Search Form */}
              <form
                className="flex flex-col md:flex-row gap-2 md:gap-0"
                onSubmit={handleSearch}
              >
                <input
                  className="flex-1 px-4 py-2.5 md:rounded-l-full rounded-full md:rounded-r-none border-2 border-lightGray focus:outline-none focus:border-orange text-darkBlue text-sm font-canva-sans placeholder:text-darkBlue/50"
                  placeholder={`Search ${config.name} packages...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="bg-orange hover:bg-teal text-white px-5 py-2.5 text-sm md:rounded-r-full rounded-full md:rounded-l-none transition-all font-poppins font-semibold shadow-lg hover:shadow-xl"
                >
                  <i className="fa-solid fa-search mr-2"></i>
                  Search
                </button>
              </form>

              {searchTerm && (
                <p className="text-darkBlue/60 text-sm mt-2 text-center">
                  Showing results for: <span className="font-semibold">{searchTerm}</span>
                </p>
              )}
            </div>
          </div>
        </HeroSlider>
      </section>

      {/* Packages Grid */}
      <section className="container mx-auto px-4 py-10">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange mb-4"></div>
              <p className="text-darkBlue/80 font-poppins">Loading packages...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg mb-4">Error loading packages</p>
            <p className="text-darkBlue/60">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-darkBlue/80 text-lg mb-4">
              {searchTerm ? `No packages found for "${searchTerm}"` : 'No packages available'}
            </p>
            {searchTerm && (
              <button
                onClick={() => { setQuery(''); setSearchTerm(''); }}
                className="bg-orange text-white px-6 py-2 rounded-full hover:bg-teal transition-all"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-season font-bold text-darkBlue mb-2">
                {searchTerm ? `Search Results (${filtered.length})` : `All ${config.name} Packages (${filtered.length})`}
              </h2>
              <p className="text-darkBlue/60">Choose your perfect {config.name} experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  destination={`/destinations/${type}/${category}/${pkg.slug?.current || slugify(pkg.title)}`}
                  category={category}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
