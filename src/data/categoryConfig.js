// Category Configuration for Traverse Globe
// Centralizes all destination metadata and categorization

export const DESTINATION_TYPES = {
  international: {
    label: 'International',
    slug: 'international',
    icon: '✈️',
    description: 'Explore amazing international destinations',
    color: '#FF6B35'
  },
  domestic: {
    label: 'Domestic',
    slug: 'domestic',
    icon: '🇮🇳',
    description: 'Discover the beauty of India',
    color: '#06A77D'
  }
};

export const CATEGORIES = {
  // International Destinations
  uae: {
    name: 'UAE',
    type: 'international',
    slug: 'uae',
    title: 'UAE Holidays Packages',
    description: 'Best curated Dubai & UAE packages with great inclusions',
    metaDescription: 'Explore the best UAE holiday packages with Dubai tours, Abu Dhabi experiences, and luxury desert safaris.',
    color: '#FF6B35',
    icon: '🏙️',
    featured: true,
    displayOrder: 1
  },
  thailand: {
    name: 'Thailand',
    type: 'international',
    slug: 'thailand',
    title: 'Thailand Tour Packages',
    description: 'Experience the Land of Smiles with curated Thailand packages',
    metaDescription: 'Discover amazing Thailand tour packages including Bangkok, Phuket, Pattaya, and Krabi destinations.',
    color: '#00B4D8',
    icon: '🏝️',
    featured: true,
    displayOrder: 2
  },
  bali: {
    name: 'Bali',
    type: 'international',
    slug: 'bali',
    title: 'Bali Island Packages',
    description: 'Discover the paradise island of Bali',
    metaDescription: 'Book the best Bali tour packages with beach resorts, temple tours, and cultural experiences.',
    color: '#06D6A0',
    icon: '🌺',
    featured: true,
    displayOrder: 3
  },
  singapore: {
    name: 'Singapore',
    type: 'international',
    slug: 'singapore',
    title: 'Singapore Tour Packages',
    description: 'Explore the Lion City with exciting Singapore tours',
    metaDescription: 'Experience Singapore with packages including Universal Studios, Gardens by the Bay, and Marina Bay.',
    color: '#EF476F',
    icon: '🦁',
    featured: false,
    displayOrder: 4
  },
  vietnam: {
    name: 'Vietnam',
    type: 'international',
    slug: 'vietnam',
    title: 'Vietnam Travel Packages',
    description: 'Explore the beauty and culture of Vietnam',
    metaDescription: 'Discover Vietnam tour packages with Hanoi, Ho Chi Minh, Halong Bay, and Da Nang destinations.',
    color: '#FFD60A',
    icon: '🏔️',
    featured: false,
    displayOrder: 5
  },
  srilanka: {
    name: 'Sri Lanka',
    type: 'international',
    slug: 'srilanka',
    title: 'Sri Lanka Tour Packages',
    description: 'Discover the pearl of the Indian Ocean',
    metaDescription: 'Book Sri Lanka tour packages with Colombo, Kandy, Galle, and beautiful tea plantations.',
    color: '#F72585',
    icon: '🐘',
    featured: false,
    displayOrder: 6
  },
  laos: {
    name: 'Laos',
    type: 'international',
    slug: 'laos',
    title: 'Laos Adventure Packages',
    description: 'Experience the hidden gem of Southeast Asia',
    metaDescription: 'Explore Laos with packages featuring Luang Prabang, Vientiane, and stunning natural landscapes.',
    color: '#4361EE',
    icon: '⛰️',
    featured: false,
    displayOrder: 7
  },

  // Domestic Destinations
  kerala: {
    name: 'Kerala',
    type: 'domestic',
    slug: 'kerala',
    title: 'Kerala Tour Packages',
    description: "Experience God's Own Country with backwaters and hill stations",
    metaDescription: 'Book Kerala tour packages with Munnar, Alleppey, Kochi, and beautiful backwater experiences.',
    color: '#06A77D',
    icon: '🌴',
    featured: true,
    displayOrder: 1
  },
  kashmir: {
    name: 'Kashmir',
    type: 'domestic',
    slug: 'kashmir',
    title: 'Kashmir Tour Packages',
    description: 'Visit Paradise on Earth with snow-capped mountains',
    metaDescription: 'Explore Kashmir tour packages with Srinagar, Gulmarg, Pahalgam, and Dal Lake experiences.',
    color: '#7209B7',
    icon: '🏔️',
    featured: true,
    displayOrder: 2
  },
  jaipur: {
    name: 'Jaipur',
    type: 'domestic',
    slug: 'jaipur',
    title: 'Jaipur Heritage Packages',
    description: 'Discover the Pink City with royal palaces and forts',
    metaDescription: 'Book Jaipur tour packages with Amber Fort, City Palace, Hawa Mahal, and Rajasthan culture.',
    color: '#F72585',
    icon: '🏰',
    featured: false,
    displayOrder: 3
  },
  andaman: {
    name: 'Andaman',
    type: 'domestic',
    slug: 'andaman',
    title: 'Andaman Island Packages',
    description: 'Explore tropical paradise with pristine beaches',
    metaDescription: 'Discover Andaman tour packages with Port Blair, Havelock Island, and crystal-clear beaches.',
    color: '#06D6A0',
    icon: '🏖️',
    featured: true,
    displayOrder: 4
  },
  chardhamyatra: {
    name: 'Chardham Yatra',
    type: 'domestic',
    slug: 'chardhamyatra',
    title: 'Chardham Yatra Packages',
    description: 'Sacred Himalayan pilgrimage to Yamunotri, Gangotri, Kedarnath, and Badrinath',
    metaDescription: 'Explore Chardham Yatra packages with guided darshan, transfers, and comfortable stays across all four dhams.',
    color: '#F97316',
    icon: '🛕',
    featured: false,
    displayOrder: 5
  }
};

// Helper Functions
export const getInternationalCategories = () => 
  Object.values(CATEGORIES)
    .filter(cat => cat.type === 'international')
    .sort((a, b) => a.displayOrder - b.displayOrder);

export const getDomesticCategories = () => 
  Object.values(CATEGORIES)
    .filter(cat => cat.type === 'domestic')
    .sort((a, b) => a.displayOrder - b.displayOrder);

export const getFeaturedCategories = () => 
  Object.values(CATEGORIES)
    .filter(cat => cat.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

export const getCategoryBySlug = (slug) => CATEGORIES[slug] || null;

export const getCategoryType = (categorySlug) => 
  CATEGORIES[categorySlug]?.type || null;

export const isValidCategory = (slug) => slug in CATEGORIES;

export const isValidType = (type) => type in DESTINATION_TYPES;

export const getAllCategories = () => 
  Object.values(CATEGORIES).sort((a, b) => {
    if (a.type === b.type) {
      return a.displayOrder - b.displayOrder;
    }
    return a.type === 'international' ? -1 : 1;
  });
