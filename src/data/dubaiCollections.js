// Tiles for the homepage CollectionGallery (the "Ways to see Dubai" band).
//
// Presentational only — image, copy and a destination URL. No pricing or
// availability lives here; those come from the CMS on the page each tile links
// to, so a stale number can never reach the homepage.
//
// `tags` drive the filter pills. `tall` makes a tile span both grid rows, which
// is what gives the strip its staggered Club Med rhythm — roughly every third
// tile should be tall or the band reads as a flat row.

export const DUBAI_COLLECTION_TABS = [
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'desert-safari', label: 'Desert Safari' },
  { value: 'theme-parks', label: 'Ferrari World & Parks' },
  { value: 'family', label: 'Family' },
];

export const DUBAI_COLLECTIONS = [
  {
    id: 'burj-khalifa',
    title: 'Burj Khalifa — At the Top',
    subtitle: 'Level 124 & 125 with skip-the-queue entry',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=75',
    href: '/destinations/international/uae',
    badge: 'Icon',
    tags: ['family', 'honeymoon'],
    tall: true,
  },
  {
    id: 'desert-safari',
    title: 'Evening Desert Safari',
    subtitle: 'Dune bashing, camel ride & BBQ dinner',
    image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=800&q=75',
    href: '/activities/desert-safari',
    badge: 'Best seller',
    tags: ['desert-safari', 'family'],
  },
  {
    id: 'ferrari-world',
    title: 'Ferrari World Abu Dhabi',
    subtitle: 'Formula Rossa & full-day park access',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=75',
    href: '/activities/theme-parks',
    badge: 'Thrill',
    tags: ['theme-parks', 'family'],
  },
  {
    id: 'dhow-cruise',
    title: 'Marina Dhow Cruise',
    subtitle: 'Sunset dinner with live music',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=75',
    href: '/activities/dhow-cruise',
    badge: 'Romantic',
    tags: ['honeymoon'],
    tall: true,
  },
  {
    id: 'palm-jumeirah',
    title: 'Palm Jumeirah & Atlantis',
    subtitle: 'Aquaventure waterpark & Lost Chambers',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=75',
    href: '/destinations/international/uae',
    badge: 'Family',
    tags: ['family', 'theme-parks'],
  },
  {
    id: 'yacht-charter',
    title: 'Private Yacht Charter',
    subtitle: 'Two hours on the Arabian Gulf, just the two of you',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=75',
    href: '/activities/yacht-rental',
    badge: 'Luxury',
    tags: ['honeymoon'],
  },
  {
    id: 'quad-biking',
    title: 'Quad Biking & Sandboarding',
    subtitle: 'Red dunes at Lahbab, pickup included',
    image: 'https://images.unsplash.com/photo-1451186859696-371d9477be93?auto=format&fit=crop&w=800&q=75',
    href: '/activities/desert-safari',
    badge: 'Adventure',
    tags: ['desert-safari'],
    tall: true,
  },
  {
    id: 'global-village',
    title: 'Global Village & Miracle Garden',
    subtitle: 'Seasonal — November through April',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=75',
    href: '/destinations/international/uae',
    badge: 'Seasonal',
    tags: ['family', 'theme-parks'],
  },
  {
    id: 'honeymoon-suite',
    title: 'Honeymoon Suite Escapes',
    subtitle: 'Five-star stays with private pool access',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=75',
    href: '/packages/theme/honeymoon',
    badge: 'Couples',
    tags: ['honeymoon'],
  },
  {
    id: 'overnight-safari',
    title: 'Overnight Desert Camp',
    subtitle: 'Bedouin tents, stargazing & sunrise breakfast',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=800&q=75',
    href: '/activities/desert-safari',
    badge: 'Overnight',
    tags: ['desert-safari', 'honeymoon'],
    tall: true,
  },
  {
    id: 'img-worlds',
    title: 'IMG Worlds of Adventure',
    subtitle: "The world's largest indoor theme park",
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=800&q=75',
    href: '/activities/theme-parks',
    badge: 'Indoor',
    tags: ['theme-parks', 'family'],
  },
  {
    id: 'old-dubai',
    title: 'Old Dubai & Gold Souk',
    subtitle: 'Abra crossing, spice souk & Al Fahidi',
    image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=800&q=75',
    href: '/destinations/international/uae',
    badge: 'Culture',
    tags: ['family', 'honeymoon'],
  },
];
