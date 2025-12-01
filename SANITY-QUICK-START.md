# 🚀 Sanity CMS Integration - Quick Start Guide

## ✅ What's Already Done

1. ✅ Sanity project created (ID: `xe1685rk`)
2. ✅ All schemas defined (Package, Banner, Destination, Blog, Testimonial)
3. ✅ **127 packages** migrated from siteData.js
4. ✅ **12 banner groups** migrated
5. ✅ **11 destinations** migrated
6. ✅ GraphQL API deployed
7. ✅ Sanity client utility created (`src/services/sanityClient.js`)
8. ✅ Environment variables configured
9. ✅ Studio running on http://localhost:3333

---

## 🎯 How to Use Sanity in Your App

### Option 1: Use Sanity Client Directly (Recommended)

The Sanity client is already set up at `src/services/sanityClient.js`. Here's how to use it:

#### **1. Import the client functions:**
```javascript
import { 
  getPackages, 
  getPackageBySlug, 
  getFeaturedPackages,
  getBanners,
  getDestinations 
} from '@/services/sanityClient'
```

#### **2. Use in your components:**

**Get all packages:**
```javascript
const packages = await getPackages()
```

**Get packages by category:**
```javascript
const uaePackages = await getPackages({ category: 'uae' })
```

**Get featured packages:**
```javascript
const featured = await getFeaturedPackages(6) // Get 6 featured
```

**Get single package:**
```javascript
const package = await getPackageBySlug('3-star-dubai-supersaver-package-3n-4d')
```

**Get banners:**
```javascript
const banners = await getBanners({ category: 'uae' })
```

---

### Option 2: Keep Using siteData.js (Hybrid Approach)

If you want to gradually migrate, you can:
1. Keep using `siteData.js` for now
2. Slowly replace imports with Sanity calls
3. Eventually remove `siteData.js`

---

## 📂 Example Components

Check `src/examples/SanityIntegrationExamples.jsx` for complete examples:

1. **PackageListingPage** - Shows all packages
2. **CategoryPackages** - Filtered by category
3. **FeaturedPackagesSection** - Homepage featured tours
4. **PackageDetailPage** - Full package details
5. **HeroBanner** - Category banners
6. **PackageSearch** - Search & filter functionality
7. **DestinationsPage** - All destinations

---

## 🔄 Migration Guide for Existing Components

### Before (using siteData.js):
```javascript
import { packages } from '@/data/siteData'

function PackageList() {
  return (
    <div>
      {packages.map(pkg => (
        <PackageCard key={pkg.id} package={pkg} />
      ))}
    </div>
  )
}
```

### After (using Sanity):
```javascript
import { useEffect, useState } from 'react'
import { getPackages } from '@/services/sanityClient'

function PackageList() {
  const [packages, setPackages] = useState([])

  useEffect(() => {
    getPackages().then(setPackages)
  }, [])

  return (
    <div>
      {packages.map(pkg => (
        <PackageCard key={pkg._id} package={pkg} />
      ))}
    </div>
  )
}
```

---

## 🎨 Data Structure Changes

### Package Object Comparison:

**siteData.js:**
```javascript
{
  id: 1,
  title: "Package Name",
  price: 25000,
  strikePrice: 30000,
  destination: "Dubai",
  duration: "3N/4D",
  overview: "...",
  highlights: [...],
  itinerary: {
    "Day 1": { title: "...", description: "..." }
  }
}
```

**Sanity:**
```javascript
{
  _id: "abc123...",
  id: 1, // Original ID preserved
  title: "Package Name",
  price: 25000,
  strikePrice: 30000,
  destination: "Dubai",
  duration: "3N/4D",
  slug: { current: "package-name" },
  overview: "...",
  highlights: [...],
  itinerary: {
    days: [
      { dayKey: "Day 1", title: "...", description: "..." }
    ]
  }
}
```

### Key Differences:
- Sanity uses `_id` (string) instead of `id` (number) - but we kept `id` for compatibility
- Slugs are objects: `slug.current` instead of just `slug`
- Itinerary structure: `itinerary.days` is an array instead of object keys
- Added fields: `featured`, `active`, `publishedAt`

---

## 🛠️ Updating Components

### 1. Update Package Detail Pages

**Old way:**
```javascript
const package = packages.find(p => p.id === parseInt(id))
```

**New way:**
```javascript
const package = await getPackageBySlug(slug)
// or use ID if you prefer:
const package = await getPackages({ id: parseInt(id) }).then(pkgs => pkgs[0])
```

### 2. Update Itinerary Rendering

**Old way:**
```javascript
{Object.entries(package.itinerary).map(([day, details]) => (
  <div key={day}>
    <h3>{day}: {details.title}</h3>
    <p>{details.description}</p>
  </div>
))}
```

**New way:**
```javascript
{package.itinerary?.days?.map((day, index) => (
  <div key={index}>
    <h3>{day.dayKey}: {day.title}</h3>
    <p>{day.description}</p>
  </div>
))}
```

### 3. Update Category Filtering

**Old way:**
```javascript
const filtered = packages.filter(p => p.category === 'uae')
```

**New way:**
```javascript
const filtered = await getPackages({ category: 'uae' })
```

---

## 🔑 Environment Variables

Make sure `.env` file exists with:
```env
VITE_SANITY_PROJECT_ID=xe1685rk
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2023-08-01
VITE_SANITY_TOKEN=skp8Qkq...
VITE_USE_SANITY=true
```

---

## 🧪 Testing Checklist

### Phase 1: Verify Data in Studio
- [ ] Open http://localhost:3333
- [ ] Check all 127 packages are visible
- [ ] Click on a package and verify all fields
- [ ] Check banners section
- [ ] Check destinations section

### Phase 2: Update Frontend Components
- [ ] Update package listing page
- [ ] Update package detail page
- [ ] Update homepage featured section
- [ ] Update category pages
- [ ] Update search/filter functionality
- [ ] Update banners/hero sections

### Phase 3: Test Functionality
- [ ] Browse packages by category
- [ ] View package details
- [ ] Check all images load
- [ ] Verify itinerary displays correctly
- [ ] Test search and filters
- [ ] Check mobile responsiveness

---

## 📊 Benefits of Using Sanity

1. **Content Management**: Update packages without deploying code
2. **Real-time Updates**: Changes reflect immediately
3. **Image Optimization**: Sanity can optimize images on-the-fly
4. **Version Control**: Track content changes
5. **Collaboration**: Multiple team members can edit content
6. **Preview**: Preview changes before publishing
7. **API**: GraphQL and REST APIs available
8. **Webhooks**: Trigger builds on content changes

---

## 🎓 Next Steps

1. **Start Small**: Begin by replacing one component (e.g., featured packages)
2. **Test Thoroughly**: Ensure data displays correctly
3. **Gradually Migrate**: Move more components over time
4. **Remove siteData.js**: Once all components use Sanity

---

## 💡 Pro Tips

### Caching Strategy:
```javascript
// Cache packages for better performance
const [cachedPackages, setCachedPackages] = useState(null)

useEffect(() => {
  if (!cachedPackages) {
    getPackages().then(data => {
      setCachedPackages(data)
      localStorage.setItem('packages-cache', JSON.stringify(data))
    })
  }
}, [cachedPackages])
```

### Error Handling:
```javascript
try {
  const packages = await getPackages()
  setPackages(packages)
} catch (error) {
  console.error('Failed to fetch packages:', error)
  // Fallback to local data
  setPackages(localPackages)
}
```

### Loading States:
```javascript
const [loading, setLoading] = useState(true)

useEffect(() => {
  getPackages()
    .then(setPackages)
    .finally(() => setLoading(false))
}, [])

if (loading) return <Spinner />
```

---

## 📞 Support

- **Sanity Docs**: https://www.sanity.io/docs
- **Studio URL**: http://localhost:3333
- **GraphQL Playground**: https://xe1685rk.api.sanity.io/v2023-08-01/graphql/production/default

---

## 🎉 You're All Set!

The migration is complete and your Sanity CMS is ready to use. Start by exploring the Studio at http://localhost:3333 and then gradually integrate the Sanity client into your React components.

Happy coding! 🚀
