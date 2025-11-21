# PHASE 1: Complete Migration to siteData.js

**Goal:** Move ALL manageable content from hardcoded components → `siteData.js`  
**Timeline:** 1-2 weeks  
**Then:** Phase 2 will migrate `siteData.js` → Sanity CMS

---

## 🔍 Content Audit - What Needs Migration

### ✅ Already in siteData.js (Good!)
- [x] Travel packages (all destinations)
- [x] Package details
- [x] Banner images
- [x] Company info (name, phone, email, address)
- [x] Services list
- [x] International destinations
- [x] Domestic destinations
- [x] Blog posts
- [x] Testimonials/Feedback
- [x] Hotel listings
- [x] Hotel categories

### ❌ Currently HARDCODED (Need to Move)

| Component | Hardcoded Content | Priority | Difficulty |
|-----------|------------------|----------|------------|
| **Header.jsx** | Navigation menu items, links | 🟡 Medium | Easy |
| **Footer.jsx** | Quick links, social media links | 🟡 Medium | Easy |
| **HeroSection.jsx** | Hero title "Holiday Packages", search placeholder | 🔴 High | Easy |
| **ToursPackagesBanner.jsx** | Entire banner content (title, description, badges) | 🔴 High | Easy |
| **TrendingDestinations.jsx** | Section title, description | 🟢 Low | Easy |
| **TopDestinations.jsx** | Section title, description | 🟢 Low | Easy |
| **WhyChooseUs.jsx** | Section descriptions (partially hardcoded) | 🟡 Medium | Easy |
| **PackageCard.jsx** | Button texts, labels | 🟢 Low | Easy |
| **All Package Pages** | Page titles, search placeholders, descriptions | 🔴 High | Medium |

---

## 📋 Migration Plan - Step by Step

### Step 1: Expand siteData.js Structure ✅

Add new sections to `siteData.js`:

```javascript
// NEW: Site Configuration
export const siteConfig = {
  siteName: 'Traverse Globe',
  tagline: 'Your Gateway to Amazing Destinations',
  
  // Hero Section
  hero: {
    title: 'Holiday Packages',
    subtitle: 'Discover Your Next Adventure',
    searchPlaceholder: 'Enter Your Dream Destination!',
    searchButtonText: 'Search'
  },
  
  // Navigation Menu
  navigation: {
    main: [
      { label: 'Home', path: '/', icon: 'fa-home' },
      { label: 'About', path: '/about', icon: 'fa-info-circle' },
      { label: 'Services', path: '/services', icon: 'fa-concierge-bell' },
      { label: 'Destinations', path: '/destinations', icon: 'fa-map-marked-alt' },
      { label: 'Hotels', path: '/hotels/all', icon: 'fa-hotel' },
      { label: 'Blog', path: '/blog', icon: 'fa-blog' },
      { label: 'Contact', path: '/contact', icon: 'fa-envelope' }
    ],
    footer: {
      quickLinks: [
        { label: 'About Us', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact', path: '/contact' }
      ],
      socialMedia: [
        { platform: 'facebook', icon: 'fa-facebook-f', url: 'https://facebook.com/traverseglobe' },
        { platform: 'instagram', icon: 'fa-instagram', url: 'https://instagram.com/traverseglobe' },
        { platform: 'twitter', icon: 'fa-twitter', url: 'https://twitter.com/traverseglobe' },
        { platform: 'youtube', icon: 'fa-youtube', url: 'https://youtube.com/@traverseglobe' }
      ]
    }
  },
  
  // Page Sections Content
  sections: {
    toursPackagesBanner: {
      title: '🌍 Explore Amazing',
      titleHighlight: 'Tours & Packages',
      description: 'Discover handcrafted tour packages designed to give you the best travel experiences across the globe',
      badges: [
        { icon: '✈️', label: 'International Tours' },
        { icon: '🏖️', label: 'Beach Holidays' },
        { icon: '🏔️', label: 'Adventure Trips' },
        { icon: '💑', label: 'Honeymoon Specials' }
      ]
    },
    
    trendingDestinations: {
      title: 'Trending Destinations | International',
      description: 'Explore the hottest travel spots around the globe'
    },
    
    topDestinations: {
      title: 'Top Destinations | Domestic',
      description: 'Explore the hottest travel spots around the country'
    },
    
    whyChooseUs: {
      title: 'Why Choose {companyName}?',
      paragraphs: [
        'At {companyName}, we specialize exclusively in Dubai, offering you a journey through its most unique and unexplored destinations. Our deep focus on this vibrant city allows us to craft unparalleled experiences that go beyond the ordinary.',
        'Discover hidden gems, enjoy exclusive access, and immerse yourself in Dubai like never before. Choose {companyName} for a travel adventure that\'s as unique as the city itself!'
      ]
    }
  },
  
  // Package Page Templates
  packagePages: {
    uae: {
      title: 'UAE Holidays Packages',
      subtitle: 'Best curated Dubai & UAE packages with great inclusions',
      searchPlaceholder: 'Search UAE packages...'
    },
    bali: {
      title: 'Bali Holiday Packages',
      subtitle: 'Experience the paradise island with our curated Bali tours',
      searchPlaceholder: 'Search Bali packages...'
    },
    thailand: {
      title: 'Thailand Holiday Packages',
      subtitle: 'Top Thailand getaways: islands, culture, food',
      searchPlaceholder: 'Search Thailand packages...'
    },
    singapore: {
      title: 'Singapore Holiday Packages',
      subtitle: 'Explore the Lion City with our exclusive tours',
      searchPlaceholder: 'Search Singapore packages...'
    },
    srilanka: {
      title: 'Sri Lanka Holiday Packages',
      subtitle: 'Discover the Pearl of the Indian Ocean',
      searchPlaceholder: 'Search Sri Lanka packages...'
    },
    vietnam: {
      title: 'Vietnam Holiday Packages',
      subtitle: 'Explore Ho Chi Minh City, Hanoi, Halong Bay & Hoi An - 4N/5D to 7N/8D Tours',
      searchPlaceholder: 'Search Vietnam packages...'
    },
    laos: {
      title: 'Laos Holiday Packages',
      subtitle: 'Discover the hidden gem of Southeast Asia',
      searchPlaceholder: 'Search Laos packages...'
    },
    andaman: {
      title: 'Andaman Holiday Packages',
      subtitle: 'Paradise beaches and crystal clear waters',
      searchPlaceholder: 'Search Andaman packages...'
    },
    jaipur: {
      title: 'Jaipur Holiday Packages',
      subtitle: 'Experience the Pink City\'s royal heritage',
      searchPlaceholder: 'Search Jaipur packages...'
    },
    kerala: {
      title: 'Kerala Holiday Packages',
      subtitle: 'God\'s Own Country awaits you',
      searchPlaceholder: 'Search Kerala packages...'
    },
    kashmir: {
      title: 'Kashmir Holiday Packages',
      subtitle: 'Paradise on Earth - Scenic valleys and snow-capped mountains',
      searchPlaceholder: 'Search Kashmir packages...'
    }
  },
  
  // Common UI Text
  uiText: {
    buttons: {
      search: 'Search',
      viewDetails: 'View Details',
      bookNow: 'Book Now',
      loadMore: 'Load More',
      readMore: 'Read More',
      contactUs: 'Contact Us',
      getQuote: 'Get Quote'
    },
    messages: {
      noResults: 'No packages found.',
      loading: 'Loading...',
      error: 'Something went wrong. Please try again.',
      searchResults: 'Showing results for:'
    }
  }
};
```

### Step 2: Update Components to Use siteConfig

#### 2.1 Update HeroSection.jsx
```javascript
// BEFORE (Hardcoded)
<h1 className="text-2xl md:text-3xl lg:text-4xl font-season font-bold text-center mb-4 text-darkBlue">
  Holiday Packages
</h1>

// AFTER (From siteData)
import { siteConfig } from '../data/siteData';

<h1 className="text-2xl md:text-3xl lg:text-4xl font-season font-bold text-center mb-4 text-darkBlue">
  {siteConfig.hero.title}
</h1>
<input
  type="text"
  placeholder={siteConfig.hero.searchPlaceholder}
  // ... rest of input
/>
<button>
  <i className="fa-solid fa-search mr-2"></i>
  {siteConfig.hero.searchButtonText}
</button>
```

#### 2.2 Update ToursPackagesBanner.jsx
```javascript
// BEFORE (Entirely Hardcoded)
<h2>🌍 Explore Amazing <span>Tours & Packages</span></h2>
<p>Discover handcrafted tour packages...</p>

// AFTER (From siteData)
import { siteConfig } from '../data/siteData';

const { toursPackagesBanner } = siteConfig.sections;

<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-darkBlue font-poppins">
  {toursPackagesBanner.title} <span className="text-orange">{toursPackagesBanner.titleHighlight}</span>
</h2>
<p className="text-base md:text-lg text-gray-600 font-canva-sans max-w-3xl mx-auto">
  {toursPackagesBanner.description}
</p>
<div className="flex flex-wrap justify-center gap-3 pt-3">
  {toursPackagesBanner.badges.map((badge, index) => (
    <div key={index} className="bg-orange/10 rounded-full px-4 py-2 flex items-center gap-2">
      <span className="text-2xl">{badge.icon}</span>
      <span className="font-semibold text-darkBlue">{badge.label}</span>
    </div>
  ))}
</div>
```

#### 2.3 Update TrendingDestinations.jsx
```javascript
// BEFORE
<h2 className="text-xl md:text-2xl font-bold mb-2 text-darkBlue font-poppins">
  Trending Destinations | International
</h2>
<p className="text-sm text-darkBlue/80 mb-6 font-canva-sans">
  Explore the hottest travel spots around the globe
</p>

// AFTER
import { siteConfig } from '../data/siteData';

const { trendingDestinations } = siteConfig.sections;

<h2 className="text-xl md:text-2xl font-bold mb-2 text-darkBlue font-poppins">
  {trendingDestinations.title}
</h2>
<p className="text-sm text-darkBlue/80 mb-6 font-canva-sans">
  {trendingDestinations.description}
</p>
```

#### 2.4 Update Package Pages (Example: UAEPackages.jsx)
```javascript
// BEFORE
<h1>UAE Holidays Packages</h1>
<p>Best curated Dubai & UAE packages with great inclusions</p>
<input placeholder="Search UAE packages..." />

// AFTER
import { siteConfig } from '../data/siteData';

const pageConfig = siteConfig.packagePages.uae;

<h1 className="text-2xl md:text-3xl lg:text-4xl font-season font-bold text-darkBlue">
  {pageConfig.title}
</h1>
<p className="text-darkBlue/70 mt-2 font-canva-sans">
  {pageConfig.subtitle}
</p>
<input
  type="text"
  placeholder={pageConfig.searchPlaceholder}
  // ... rest
/>
```

#### 2.5 Update Header.jsx
```javascript
// BEFORE (Links are hardcoded)
<Link to="/">Home</Link>
<Link to="/about">About</Link>

// AFTER
import { siteConfig } from '../data/siteData';

{siteConfig.navigation.main.map((item, index) => (
  <li key={index}>
    <Link to={item.path} className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors">
      {item.label}
    </Link>
  </li>
))}
```

#### 2.6 Update Footer.jsx
```javascript
// BEFORE
<Link to="/about">About Us</Link>
<Link to="/services">Services</Link>

// AFTER
import { siteConfig } from '../data/siteData';

{siteConfig.navigation.footer.quickLinks.map((link, index) => (
  <li key={index}>
    <Link to={link.path} className="text-white/70 hover:text-orange transition-colors font-canva-sans">
      {link.label}
    </Link>
  </li>
))}

{/* Social Media */}
{siteConfig.navigation.footer.socialMedia.map((social, index) => (
  <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
    <i className={`fab ${social.icon}`}></i>
  </a>
))}
```

---

## 🎯 Implementation Checklist

### Week 1: Setup & Core Sections
- [ ] **Day 1:** Add `siteConfig` object to `siteData.js`
- [ ] **Day 2:** Update `HeroSection.jsx` to use siteConfig
- [ ] **Day 3:** Update `ToursPackagesBanner.jsx` to use siteConfig
- [ ] **Day 4:** Update `TrendingDestinations.jsx` and `TopDestinations.jsx`
- [ ] **Day 5:** Update `WhyChooseUs.jsx` to use siteConfig
- [ ] **Day 6-7:** Test all changes, fix any issues

### Week 2: Navigation & Package Pages
- [ ] **Day 1:** Update `Header.jsx` navigation
- [ ] **Day 2:** Update `Footer.jsx` links and social media
- [ ] **Day 3:** Add package page configs for all 11 destinations
- [ ] **Day 4:** Update UAE, Bali, Thailand package pages
- [ ] **Day 5:** Update Singapore, Sri Lanka, Vietnam package pages
- [ ] **Day 6:** Update Laos, Andaman, Jaipur, Kerala, Kashmir pages
- [ ] **Day 7:** Final testing, commit changes

---

## 🚀 After Phase 1 Completion

Once everything is in `siteData.js`:

### Phase 2 Will Be:
1. ✅ All content already centralized in `siteData.js`
2. ✅ Create Sanity schemas matching `siteData.js` structure
3. ✅ Use `dataService.js` (already created) to fetch from Sanity
4. ✅ Toggle `VITE_USE_SANITY=true` when ready
5. ✅ No component changes needed! (just data source changes)

---

## 📊 What Can Stay Hardcoded (CSS/Styling)

These are OK to keep hardcoded:
- ✅ CSS classes (Tailwind classes)
- ✅ Component structure/layout
- ✅ Animation configurations
- ✅ Swiper settings
- ✅ Image optimization logic
- ✅ Responsive breakpoints
- ✅ Color schemes (defined in tailwind.config)

---

## 💡 Benefits of This Approach

1. **Incremental Progress:** Can migrate section by section
2. **Easy Testing:** Test each component after migration
3. **No Breaking Changes:** Site works throughout migration
4. **Single Source of Truth:** All content in one place
5. **Sanity Ready:** Structure mirrors what Sanity will use
6. **Rollback Safe:** Can revert any component if needed

---

## 🔄 Migration Flow Summary

```
Current State:
├── Components (Hardcoded content ❌)
├── siteData.js (Some content ✅)

Phase 1 Result:
├── Components (Zero hardcoded content ✅)
├── siteData.js (ALL content ✅)

Phase 2 Result:
├── Components (Use dataService ✅)
├── dataService.js (Fetches from Sanity ✅)
├── Sanity CMS (All content ✅)
├── siteData.js (Fallback only ✅)
```

---

## 🎯 Success Criteria

Phase 1 is complete when:
- [ ] All page titles come from `siteData.js`
- [ ] All section headings come from `siteData.js`
- [ ] All button texts come from `siteData.js`
- [ ] All navigation links come from `siteData.js`
- [ ] All placeholder texts come from `siteData.js`
- [ ] Search "TODO" or "hardcoded" returns zero results
- [ ] Site works identically to before
- [ ] No console errors

---

## 📝 Next Steps

1. **Review this plan** - Make sure you understand the approach
2. **Start with Step 1** - Add `siteConfig` to `siteData.js`
3. **Migrate one component at a time** - Test after each
4. **Commit frequently** - Use git after each working component
5. **Track progress** - Check off items as you complete them

**Ready to start Phase 1?** 🚀
