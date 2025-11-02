import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { uaePackages, baliPackages, thailandPackages, singaporePackages } from '../data/siteData';
import PackageCard from '../components/PackageCard';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Combine all packages
  const allPackages = useMemo(() => {
    return [
      ...uaePackages.map(pkg => ({ ...pkg, category: 'uae' })),
      ...baliPackages.map(pkg => ({ ...pkg, category: 'bali' })),
      ...thailandPackages.map(pkg => ({ ...pkg, category: 'thailand' })),
      ...singaporePackages.map(pkg => ({ ...pkg, category: 'singapore' })),
    ];
  }, []);

  // Filter packages based on search query
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    
    return allPackages.filter(pkg => 
      pkg.title.toLowerCase().includes(q) ||
      pkg.category.toLowerCase().includes(q) ||
      (pkg.tags && pkg.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  }, [query, allPackages]);

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
            Search Results
          </h1>
          {query && (
            <p className="text-white/90 text-lg font-canva-sans">
              Showing results for: <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {!query ? (
            <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl p-6 text-center">
              <i className="fas fa-search text-4xl mb-3 text-blue-400"></i>
              <p className="text-lg font-semibold mb-2">Start Your Search</p>
              <p className="text-sm">Enter a destination, package name, or tag to find your perfect holiday package.</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-darkBlue mb-2 font-poppins">
                  Found {searchResults.length} {searchResults.length === 1 ? 'Package' : 'Packages'}
                </h2>
                <p className="text-sm text-darkBlue/70 font-canva-sans">
                  Browse through our curated selection matching your search
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((pkg) => (
                  <PackageCard key={`${pkg.category}-${pkg.id}`} pkg={pkg} category={pkg.category} />
                ))}
              </div>
            </>
          ) : (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-6 text-center">
              <i className="fas fa-exclamation-triangle text-4xl mb-3 text-amber-400"></i>
              <p className="text-lg font-semibold mb-2">No Results Found</p>
              <p className="text-sm mb-4">We couldn't find any packages matching "{query}"</p>
              <div className="space-y-2">
                <p className="text-sm font-semibold">Try searching for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link to="/search?q=Dubai" className="bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full text-xs font-medium transition-colors">Dubai</Link>
                  <Link to="/search?q=Bali" className="bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full text-xs font-medium transition-colors">Bali</Link>
                  <Link to="/search?q=Thailand" className="bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full text-xs font-medium transition-colors">Thailand</Link>
                  <Link to="/search?q=Singapore" className="bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full text-xs font-medium transition-colors">Singapore</Link>
                  <Link to="/search?q=Luxury" className="bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full text-xs font-medium transition-colors">Luxury</Link>
                  <Link to="/search?q=Budget" className="bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full text-xs font-medium transition-colors">Budget</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Popular Searches Section */}
      {query && (
        <section className="py-8 bg-lightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-darkBlue mb-6 font-poppins">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link 
                to="/packages/uae" 
                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all group"
              >
                <i className="fas fa-plane-departure text-3xl text-orange mb-2 group-hover:scale-110 transition-transform"></i>
                <p className="font-semibold text-darkBlue font-poppins">UAE Packages</p>
              </Link>
              <Link 
                to="/packages/bali" 
                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all group"
              >
                <i className="fas fa-umbrella-beach text-3xl text-orange mb-2 group-hover:scale-110 transition-transform"></i>
                <p className="font-semibold text-darkBlue font-poppins">Bali Packages</p>
              </Link>
              <Link 
                to="/packages/thailand" 
                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all group"
              >
                <i className="fas fa-water text-3xl text-orange mb-2 group-hover:scale-110 transition-transform"></i>
                <p className="font-semibold text-darkBlue font-poppins">Thailand Packages</p>
              </Link>
              <Link 
                to="/packages/singapore" 
                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all group"
              >
                <i className="fas fa-city text-3xl text-orange mb-2 group-hover:scale-110 transition-transform"></i>
                <p className="font-semibold text-darkBlue font-poppins">Singapore Packages</p>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
