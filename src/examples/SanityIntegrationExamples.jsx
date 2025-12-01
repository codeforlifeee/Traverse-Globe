/**
 * Sanity Integration Examples
 * 8 Working Code Examples for integrating Sanity CMS
 * Use these examples as reference when updating components
 */

import { useEffect, useState } from 'react';
import {
  fetchPackages,
  fetchPackageById,
  fetchPackageBySlug,
  fetchPackagesByCategory,
  fetchBanners,
  fetchFeaturedPackages,
  searchPackages,
  fetchPackagesWithFilters,
  fetchDestinations,
  getPackageStats
} from '../services/sanityClient';
import PackageCard from '../components/PackageCard';

// ============================================
// Example 1: Package Listing Page
// ============================================
export function PackageListingExample() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        const data = await fetchPackages();
        setPackages(data);
      } catch (err) {
        setError('Failed to load packages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  if (loading) return <div className="text-center py-10">Loading packages...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">All Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <PackageCard key={pkg._id} package={pkg} />
        ))}
      </div>
    </div>
  );
}

// ============================================
// Example 2: Category Packages (e.g., UAE, Bali)
// ============================================
export function CategoryPackagesExample({ category = 'uae' }) {
  const [packages, setPackages] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setLoading(true);
        // Load packages and banners in parallel
        const [packagesData, bannersData] = await Promise.all([
          fetchPackagesByCategory(category),
          fetchBanners(category)
        ]);
        
        setPackages(packagesData);
        setBanners(bannersData);
      } catch (error) {
        console.error('Failed to load category data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [category]);

  if (loading) return <div>Loading {category} packages...</div>;

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      {banners.length > 0 && (
        <div className="relative h-96 overflow-hidden">
          <img
            src={banners[0]}
            alt={`${category} banner`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Packages Grid */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 capitalize">{category} Packages</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <PackageCard key={pkg._id} package={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Example 3: Featured Packages Section (Homepage)
// ============================================
export function FeaturedPackagesExample() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await fetchFeaturedPackages(6); // Get 6 featured packages
        setPackages(data);
      } catch (error) {
        console.error('Failed to load featured packages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <p className="text-center">Loading featured packages...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Tour Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <PackageCard key={pkg._id} package={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Example 4: Package Detail Page
// ============================================
export function PackageDetailExample({ packageId }) {
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPackage = async () => {
      try {
        setLoading(true);
        // Fetch by ID or slug depending on your routing
        const data = await fetchPackageById(packageId);
        // Or use: const data = await fetchPackageBySlug(packageSlug);
        
        if (!data) {
          setError('Package not found');
        } else {
          setPackageData(data);
        }
      } catch (err) {
        setError('Failed to load package details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPackage();
  }, [packageId]);

  if (loading) return <div className="text-center py-20">Loading package details...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!packageData) return <div className="text-center py-20">Package not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Package Header */}
      <div className="relative h-96 bg-gray-900">
        {packageData.image && (
          <img
            src={packageData.image}
            alt={packageData.title}
            className="w-full h-full object-cover opacity-70"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{packageData.title}</h1>
            <p className="text-xl">{packageData.duration} • {packageData.destination}</p>
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Package Overview</h2>
              <p className="text-gray-700">{packageData.overview}</p>
            </section>

            {/* Highlights */}
            {packageData.highlights && packageData.highlights.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                <ul className="space-y-2">
                  {packageData.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerary */}
            {packageData.itinerary && packageData.itinerary.days && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
                <div className="space-y-4">
                  {packageData.itinerary.days.map((day, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-bold text-lg">{day.dayKey}: {day.title}</h3>
                      <p className="text-gray-700 mt-2">{day.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <div className="mb-4">
                <span className="text-3xl font-bold text-blue-600">₹{packageData.price}</span>
                {packageData.strikePrice && (
                  <span className="text-gray-500 line-through ml-2">₹{packageData.strikePrice}</span>
                )}
                <span className="block text-sm text-gray-600 mt-1">Per Person</span>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Book Now
              </button>

              {packageData.rating && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Rating</span>
                    <span className="font-bold">{packageData.rating} ⭐</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Example 5: Hero Banner with Sanity Images
// ============================================
export function HeroBannerExample({ category = 'general' }) {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const data = await fetchBanners(category);
        setBanners(data);
      } catch (error) {
        console.error('Failed to load banners:', error);
      }
    };

    loadBanners();
  }, [category]);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <div className="relative h-screen overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={banner}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Explore the World
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover amazing destinations with our curated tour packages
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition">
            View Packages
          </button>
        </div>
      </div>

      {/* Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// Example 6: Package Search & Filter
// ============================================
export function PackageSearchExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const data = await searchPackages(searchTerm);
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterApply = async () => {
    setLoading(true);
    try {
      const data = await fetchPackagesWithFilters(filters);
      setResults(data);
    } catch (error) {
      console.error('Filter failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search packages by destination, title, or keyword..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Min Price</label>
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Min"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max Price</label>
            <input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Max"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Min Rating</label>
            <select
              value={filters.minRating || ''}
              onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Any</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleFilterApply}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-10">Searching...</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(pkg => (
            <PackageCard key={pkg._id} package={pkg} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          {searchTerm ? 'No packages found. Try a different search term.' : 'Enter a search term to find packages.'}
        </div>
      )}
    </div>
  );
}

// ============================================
// Example 7: Destinations Page
// ============================================
export function DestinationsExample() {
  const [internationalDest, setInternationalDest] = useState([]);
  const [domesticDest, setDomesticDest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setLoading(true);
        // Fetch both types in parallel
        const [international, domestic] = await Promise.all([
          fetchDestinations('international'),
          fetchDestinations('domestic')
        ]);
        
        setInternationalDest(international);
        setDomesticDest(domestic);
      } catch (error) {
        console.error('Failed to load destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
  }, []);

  if (loading) return <div className="text-center py-20">Loading destinations...</div>;

  const DestinationCard = ({ destination }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
      {destination.image && (
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
        {destination.description && (
          <p className="text-gray-600 text-sm">{destination.description}</p>
        )}
        {destination.packageCount && (
          <p className="text-blue-600 font-semibold mt-2">
            {destination.packageCount} Packages Available
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* International Destinations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">International Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {internationalDest.map(dest => (
              <DestinationCard key={dest._id} destination={dest} />
            ))}
          </div>
        </section>

        {/* Domestic Destinations */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Domestic Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domesticDest.map(dest => (
              <DestinationCard key={dest._id} destination={dest} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ============================================
// Example 8: Stats & Analytics Dashboard
// ============================================
export function PackageStatsExample() {
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalDestinations: 0,
    avgRating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getPackageStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading stats...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-white">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="text-4xl font-bold mb-2">{stats.totalPackages}+</div>
            <div className="text-lg">Tour Packages</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="text-4xl font-bold mb-2">{stats.totalDestinations}+</div>
            <div className="text-lg">Destinations</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="text-4xl font-bold mb-2">{stats.avgRating}⭐</div>
            <div className="text-lg">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main Demo Component - Shows all examples
// ============================================
export default function SanityIntegrationExamples() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Sanity Integration Examples</h1>
          <p className="text-xl">8 Working Code Examples for your reference</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="prose max-w-none">
          <h2>Available Examples:</h2>
          <ol className="space-y-2">
            <li><strong>PackageListingExample</strong> - Shows all packages</li>
            <li><strong>CategoryPackagesExample</strong> - Filtered packages by category (UAE, Bali, etc.)</li>
            <li><strong>FeaturedPackagesExample</strong> - Homepage featured tours section</li>
            <li><strong>PackageDetailExample</strong> - Full package details page</li>
            <li><strong>HeroBannerExample</strong> - Category banners with auto-rotation</li>
            <li><strong>PackageSearchExample</strong> - Search & filter functionality</li>
            <li><strong>DestinationsExample</strong> - All destinations page</li>
            <li><strong>PackageStatsExample</strong> - Stats & analytics display</li>
          </ol>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <h3 className="text-lg font-bold mb-2">💡 How to Use These Examples</h3>
            <ul>
              <li>Import the example you need: <code>import {'{ PackageListingExample }'} from '@/examples/SanityIntegrationExamples'</code></li>
              <li>Copy the code pattern to your existing components</li>
              <li>Replace siteData.js imports with Sanity client calls</li>
              <li>All examples include loading states and error handling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
