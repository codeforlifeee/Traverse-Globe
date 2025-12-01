// Example: Using Sanity CMS in Your React Components
// This file shows how to integrate Sanity data into your existing components

import { useEffect, useState } from 'react'
import { 
  getPackages, 
  getPackageBySlug, 
  getBanners,
  getDestinations,
  getFeaturedPackages 
} from '@/services/sanityClient'

// ============================================
// Example 1: Package Listing Page
// ============================================
export function PackageListingPage() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Get all packages
        const data = await getPackages()
        setPackages(data)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  if (loading) return <div>Loading packages...</div>

  return (
    <div className="package-grid">
      {packages.map((pkg) => (
        <PackageCard key={pkg._id} package={pkg} />
      ))}
    </div>
  )
}

// ============================================
// Example 2: Filtered Package Listing (by category)
// ============================================
export function CategoryPackages({ category }) {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Get packages filtered by category
        const data = await getPackages({ category })
        setPackages(data)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [category])

  return (
    <div>
      <h2>{category.toUpperCase()} Packages</h2>
      <div className="package-grid">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} package={pkg} />
        ))}
      </div>
    </div>
  )
}

// ============================================
// Example 3: Featured Packages for Homepage
// ============================================
export function FeaturedPackagesSection() {
  const [packages, setPackages] = useState([])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedPackages(6) // Get 6 featured packages
        setPackages(data)
      } catch (error) {
        console.error('Error fetching featured packages:', error)
      }
    }

    fetchFeatured()
  }, [])

  return (
    <section className="featured-packages">
      <h2>Featured Tours</h2>
      <div className="package-carousel">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} package={pkg} />
        ))}
      </div>
    </section>
  )
}

// ============================================
// Example 4: Package Detail Page
// ============================================
export function PackageDetailPage({ slug }) {
  const [packageData, setPackageData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const data = await getPackageBySlug(slug)
        setPackageData(data)
      } catch (error) {
        console.error('Error fetching package:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackage()
  }, [slug])

  if (loading) return <div>Loading package details...</div>
  if (!packageData) return <div>Package not found</div>

  return (
    <div className="package-detail">
      <div className="hero-banner">
        <img src={packageData.bannerImage} alt={packageData.title} />
        <h1>{packageData.title}</h1>
      </div>

      <div className="package-info">
        <div className="price-section">
          <span className="current-price">₹{packageData.price.toLocaleString()}</span>
          {packageData.strikePrice && (
            <span className="strike-price">₹{packageData.strikePrice.toLocaleString()}</span>
          )}
        </div>

        <div className="meta-info">
          <span>📍 {packageData.destination}</span>
          <span>⏱️ {packageData.duration}</span>
          <span>⭐ {packageData.rating} ({packageData.reviews} reviews)</span>
        </div>
      </div>

      <section className="overview">
        <h2>Overview</h2>
        <p>{packageData.overview}</p>
      </section>

      <section className="highlights">
        <h2>Highlights</h2>
        <ul>
          {packageData.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className="itinerary">
        <h2>Daily Itinerary</h2>
        {packageData.itinerary?.days?.map((day, index) => (
          <div key={index} className="day-item">
            <h3>{day.dayKey}: {day.title}</h3>
            <p>{day.description}</p>
          </div>
        ))}
      </section>

      <section className="inclusions-exclusions">
        <div className="inclusions">
          <h3>What's Included</h3>
          <ul>
            {packageData.inclusions.map((item, index) => (
              <li key={index}>✓ {item}</li>
            ))}
          </ul>
        </div>

        <div className="exclusions">
          <h3>What's Not Included</h3>
          <ul>
            {packageData.exclusions.map((item, index) => (
              <li key={index}>✗ {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {packageData.hotels && (
        <section className="hotels">
          <h2>{packageData.hotels.title}</h2>
          <ul>
            {packageData.hotels.options?.map((hotel, index) => (
              <li key={index}>{hotel}</li>
            ))}
          </ul>
          {packageData.hotels.note && <p className="note">{packageData.hotels.note}</p>}
        </section>
      )}

      <section className="gallery">
        <h2>Gallery</h2>
        <div className="image-grid">
          {packageData.images.map((image, index) => (
            <img key={index} src={image} alt={`Gallery ${index + 1}`} />
          ))}
        </div>
      </section>

      <div className="booking-section">
        <button className="btn-primary">Book Now</button>
      </div>
    </div>
  )
}

// ============================================
// Example 5: Banner Component
// ============================================
export function HeroBanner({ category = 'general' }) {
  const [banners, setBanners] = useState([])

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners({ category })
        setBanners(data)
      } catch (error) {
        console.error('Error fetching banners:', error)
      }
    }

    fetchBanners()
  }, [category])

  return (
    <div className="hero-carousel">
      {banners.map((banner, index) => (
        <div key={index} className="banner-slide">
          <img src={banner.image} alt={banner.title} />
          <h2>{banner.title}</h2>
        </div>
      ))}
    </div>
  )
}

// ============================================
// Example 6: Package Card Component (Reusable)
// ============================================
function PackageCard({ package: pkg }) {
  return (
    <div className="package-card">
      <div className="card-image">
        <img src={pkg.bannerImage} alt={pkg.title} />
        {pkg.featured && <span className="badge-featured">Featured</span>}
      </div>
      
      <div className="card-content">
        <h3>{pkg.title}</h3>
        <p className="destination">📍 {pkg.destination}</p>
        <p className="duration">⏱️ {pkg.duration}</p>
        
        <div className="rating">
          <span>⭐ {pkg.rating}</span>
          <span className="reviews">({pkg.reviews} reviews)</span>
        </div>

        <div className="pricing">
          <span className="price">₹{pkg.price.toLocaleString()}</span>
          {pkg.strikePrice && (
            <span className="strike-price">₹{pkg.strikePrice.toLocaleString()}</span>
          )}
        </div>

        <a href={`/packages/${pkg.slug.current}`} className="btn-view-details">
          View Details
        </a>
      </div>
    </div>
  )
}

// ============================================
// Example 7: Search & Filter Component
// ============================================
export function PackageSearch() {
  const [allPackages, setAllPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 200000,
    rating: 0
  })

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getPackages()
      setAllPackages(data)
      setFilteredPackages(data)
    }
    fetchPackages()
  }, [])

  useEffect(() => {
    let filtered = allPackages

    if (filters.category) {
      filtered = filtered.filter(pkg => pkg.category === filters.category)
    }

    filtered = filtered.filter(pkg => 
      pkg.price >= filters.minPrice && pkg.price <= filters.maxPrice
    )

    if (filters.rating > 0) {
      filtered = filtered.filter(pkg => pkg.rating >= filters.rating)
    }

    setFilteredPackages(filtered)
  }, [filters, allPackages])

  return (
    <div className="package-search">
      <div className="filters">
        <select 
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
        >
          <option value="">All Destinations</option>
          <option value="uae">UAE</option>
          <option value="bali">Bali</option>
          <option value="thailand">Thailand</option>
          {/* Add more categories */}
        </select>

        <input
          type="range"
          min="0"
          max="200000"
          value={filters.maxPrice}
          onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
        />
        <span>Max Price: ₹{filters.maxPrice.toLocaleString()}</span>

        <select
          value={filters.rating}
          onChange={(e) => setFilters({...filters, rating: parseFloat(e.target.value)})}
        >
          <option value="0">All Ratings</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>

      <div className="results">
        <p>Found {filteredPackages.length} packages</p>
        <div className="package-grid">
          {filteredPackages.map(pkg => (
            <PackageCard key={pkg._id} package={pkg} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// Example 8: Destinations Page
// ============================================
export function DestinationsPage() {
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations()
        setDestinations(data)
      } catch (error) {
        console.error('Error fetching destinations:', error)
      }
    }
    fetchDestinations()
  }, [])

  return (
    <div className="destinations-grid">
      {destinations.map((dest) => (
        <div key={dest._id} className="destination-card">
          <img src={dest.image} alt={dest.name} />
          <h3>{dest.name}</h3>
          <p>{dest.description}</p>
          <a href={`/packages?category=${dest.slug.current}`}>
            View Packages
          </a>
        </div>
      ))}
    </div>
  )
}

export default {
  PackageListingPage,
  CategoryPackages,
  FeaturedPackagesSection,
  PackageDetailPage,
  HeroBanner,
  PackageSearch,
  DestinationsPage
}
