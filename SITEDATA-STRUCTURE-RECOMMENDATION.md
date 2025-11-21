# 📋 Recommended siteData.js Structure

## 🎯 Goals
1. **Single Source of Truth** - Each package defined only once
2. **Easy for Non-Technical Users** - Clear, simple structure
3. **CMS-Ready** - Easy migration to Sanity/Strapi
4. **No Duplication** - Images, prices, etc. in one place only

---

## 🏗️ Proposed Structure

### **Current Problem:**
```javascript
// ❌ DUPLICATION: Package data in TWO places
export const uaePackages = [
  {
    id: 1,
    title: '3-Star Dubai Supersaver Package - 3N/4D',
    image: 'https://...',  // Image here
  }
];

export const packageDetails = {
  1: {
    name: '3-Star Dubai Supersaver Package - 3N/4D',  // Title duplicated
    price: 35999,
    images: ['https://...'],  // Images here too!
    // ... all other details
  }
};
```

### **✅ RECOMMENDED: Single Package Object**

```javascript
// ===========================================
// 📦 PACKAGES - Single source of truth
// ===========================================
export const packages = [
  {
    // ===== BASIC INFO (Required) =====
    id: 1,
    title: '3-Star Dubai Supersaver Package',
    slug: '3-star-dubai-supersaver-package',  // Auto-generated or manual
    
    // ===== CATEGORIZATION =====
    category: 'uae',
    type: 'international',  // 'international' or 'domestic'
    destination: 'Dubai, UAE',
    
    // ===== PRICING =====
    price: 35999,
    strikePrice: 45999,
    currency: 'INR',
    pricingNote: 'Per Person on twin sharing',
    
    // ===== DURATION =====
    duration: '3N/4D',
    nights: 3,
    days: 4,
    
    // ===== RATINGS & REVIEWS =====
    rating: 4.1,
    totalReviews: 198,
    
    // ===== MEDIA =====
    images: [
      {
        url: 'https://images.pexels.com/photos/17910099/pexels-photo-17910099.jpeg?auto=compress&cs=tinysrgb&w=600&fit=crop&dpr=1',
        alt: 'Dubai Burj Khalifa view',
        isMain: true  // Main card image
      },
      {
        url: 'https://images.pexels.com/photos/12369779/pexels-photo-12369779.jpeg?auto=compress&cs=tinysrgb&w=600&fit=crop&dpr=1',
        alt: 'Desert Safari Dubai'
      },
      // ... more images
    ],
    
    // ===== PACKAGE DETAILS =====
    overview: 'Experience Dubai\'s iconic landmarks and world-class attractions with our budget-friendly package...',
    
    highlights: [
      'Dubai city tour with Burj Khalifa',
      'Desert safari with BBQ dinner',
      'Dubai Mall and Marina visits',
      'Daily breakfast at hotel',
      'Airport transfers included'
    ],
    
    // ===== ITINERARY =====
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai',
        description: 'Welcome to Dubai! Airport pickup and transfer to hotel. Check-in and evening at leisure to explore nearby areas.',
        activities: ['Airport Pickup', 'Hotel Check-in', 'Leisure Time']
      },
      {
        day: 2,
        title: 'Dubai City Tour',
        description: 'Full day guided tour covering Burj Khalifa, Dubai Mall, Jumeirah Mosque, and Dubai Marina. Photo stops at iconic locations.',
        activities: ['Burj Khalifa Visit', 'Dubai Mall', 'Jumeirah Mosque', 'Dubai Marina']
      },
      {
        day: 3,
        title: 'Desert Safari',
        description: 'Evening desert safari with dune bashing, camel ride, and traditional BBQ dinner with cultural performances.',
        activities: ['Dune Bashing', 'Camel Ride', 'BBQ Dinner', 'Belly Dance Show']
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Breakfast at hotel, check-out, and transfer to Dubai International Airport for your onward journey.',
        activities: ['Breakfast', 'Check-out', 'Airport Transfer']
      }
    ],
    
    // ===== INCLUSIONS & EXCLUSIONS =====
    inclusions: [
      '3-star hotel accommodation',
      'Daily breakfast',
      'Airport transfers (arrival & departure)',
      'Dubai city tour with guide',
      'Desert safari with BBQ dinner',
      'All transfers in private AC vehicle'
    ],
    
    exclusions: [
      'International airfare',
      'UAE visa charges',
      'Travel insurance',
      'Personal expenses and tips',
      'Lunch and dinner (except desert BBQ)',
      'Optional activities and entrance fees'
    ],
    
    // ===== ACCOMMODATION =====
    hotels: {
      title: 'Dubai 3-Star Hotel Options:',
      starRating: 3,
      options: [
        { name: 'Ibis Al Barsha', location: 'Al Barsha' },
        { name: 'Citymax Hotel Al Barsha', location: 'Al Barsha' },
        { name: 'Golden Tulip Al Barsha', location: 'Al Barsha' }
      ],
      note: '*Hotel subject to availability at the time of booking. Similar category hotel will be provided.'
    },
    
    // ===== META & STATUS =====
    status: 'active',  // 'active', 'draft', 'archived'
    featured: true,
    popularityScore: 95,
    createdAt: '2024-01-01',
    updatedAt: '2024-12-19',
    
    // ===== SEO =====
    seo: {
      metaTitle: '3-Star Dubai Supersaver Package - 3N/4D | Traverse Globe',
      metaDescription: 'Experience Dubai with our budget-friendly 3-star package. Desert safari, city tours, and more.',
      keywords: ['dubai package', 'dubai tour', 'budget dubai', 'desert safari']
    }
  },
  
  // ... more packages
];
```

---

## 📁 File Organization

### **Option 1: Single File (Simple - Good for Small Sites)**
```
src/data/
  └── siteData.js  (All data here)
```

### **Option 2: Modular Files (Better for Large Sites)** ⭐ RECOMMENDED
```
src/data/
  ├── index.js                 // Re-exports everything
  ├── packages/
  │   ├── index.js             // Combines all packages
  │   ├── uae.js               // UAE packages
  │   ├── thailand.js          // Thailand packages
  │   ├── kashmir.js           // Kashmir packages
  │   └── ...
  ├── company.js               // Company info
  ├── testimonials.js          // Feedback/reviews
  ├── destinations.js          // Top destinations
  └── meta/
      ├── features.js          // Company features
      ├── platformReviews.js   // Google, TripAdvisor ratings
      └── contactCategories.js // Contact form categories
```

**Example: `src/data/packages/uae.js`**
```javascript
export const uaePackages = [
  {
    id: 1,
    title: '3-Star Dubai Supersaver Package',
    category: 'uae',
    type: 'international',
    // ... all package data
  },
  {
    id: 2,
    title: '4-Star Dubai Premium Package',
    // ...
  }
];
```

**Example: `src/data/index.js`**
```javascript
// Packages
export { uaePackages } from './packages/uae';
export { thailandPackages } from './packages/thailand';
export { kashmirPackages } from './packages/kashmir';

// Company
export { companyInfo } from './company';
export { testimonials } from './testimonials';

// Helper: Get all packages
export const getAllPackages = () => {
  return [
    ...uaePackages,
    ...thailandPackages,
    ...kashmirPackages,
    // ...
  ];
};

// Helper: Get package by ID
export const getPackageById = (id) => {
  return getAllPackages().find(pkg => pkg.id === id);
};

// Helper: Get packages by category
export const getPackagesByCategory = (category) => {
  return getAllPackages().filter(pkg => pkg.category === category);
};
```

---

## 🔄 Component Usage (After Restructure)

### **Package Listing Page**
```javascript
import { kashmirPackages } from '../data';

const KashmirPackages = () => {
  return (
    <div>
      {kashmirPackages.map(pkg => (
        <PackageCard key={pkg.id} package={pkg} />
      ))}
    </div>
  );
};
```

### **Package Detail Page**
```javascript
import { getPackageById } from '../data';

const DestinationDetail = () => {
  const { id } = useParams();
  const package = getPackageById(Number(id));
  
  return (
    <div>
      <h1>{package.title}</h1>
      <p>₹{package.price}</p>
      {/* All data from single source */}
    </div>
  );
};
```

### **PackageCard Component**
```javascript
const PackageCard = ({ package: pkg }) => {
  return (
    <div>
      <img src={pkg.images[0].url} alt={pkg.images[0].alt} />
      <h3>{pkg.title}</h3>
      <p>₹{pkg.price}</p>
      <span>{pkg.duration}</span>
      <span>⭐ {pkg.rating} ({pkg.totalReviews} reviews)</span>
    </div>
  );
};
```

---

## 🚀 Migration to Sanity CMS

With this structure, migrating to Sanity is straightforward:

### **Sanity Schema (Direct Mapping)**
```javascript
// schemas/package.js
export default {
  name: 'package',
  title: 'Tour Package',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Package Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'UAE', value: 'uae' },
          { title: 'Thailand', value: 'thailand' },
          { title: 'Kashmir', value: 'kashmir' }
        ]
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number'
    },
    {
      name: 'strikePrice',
      title: 'Original Price',
      type: 'number'
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        fields: [
          { name: 'alt', type: 'string', title: 'Alt Text' },
          { name: 'isMain', type: 'boolean', title: 'Main Image' }
        ]
      }]
    },
    {
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'day', type: 'number', title: 'Day' },
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', title: 'Description' },
          { name: 'activities', type: 'array', of: [{ type: 'string' }] }
        ]
      }]
    },
    // ... more fields matching the structure
  ]
}
```

---

## 📝 Non-Technical User Guide

### **How to Add a New Package:**

1. Open `src/data/packages/kashmir.js`
2. Copy an existing package object
3. Update the values:
   ```javascript
   {
     id: 131,  // Next available ID
     title: 'New Kashmir Package',  // Change this
     price: 45999,  // Change price
     strikePrice: 52999,  // Change original price
     duration: '5N/6D',  // Change duration
     // ... update other fields
   }
   ```
4. Save the file

### **How to Update a Price:**
1. Find the package by ID in the appropriate file
2. Change the `price` field
3. Save - Price updates everywhere automatically!

---

## ✅ Benefits of This Structure

| Benefit | Description |
|---------|-------------|
| **No Duplication** | Each package defined once |
| **Easy Updates** | Change price in one place |
| **Clear Hierarchy** | Organized by category |
| **Type Safety** | Easy to add TypeScript later |
| **CMS-Ready** | Direct mapping to Sanity/Strapi |
| **Maintainable** | Non-technical users can edit |
| **Scalable** | Add 1000s of packages easily |

---

## 🎯 Implementation Steps

1. **Create new structure** (I can help with this)
2. **Migrate existing data** (Automated script)
3. **Update components** (Use helpers)
4. **Test thoroughly**
5. **Remove old structure**

Would you like me to implement this new structure for your project?
