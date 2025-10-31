// Centralized site data to mirror https://traverseglobe-demo.vercel.app/

export const banners = [
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80', // Dubai skyline with Burj Khalifa
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1920&q=80', // Dubai Marina at sunset
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80', // Thailand tropical beach with boats
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80', // Bali tropical resort and pool
  'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1920&q=80', // Singapore Marina Bay cityscape
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1920&q=80', // Japan Mount Fuji with cherry blossoms
  'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?auto=format&fit=crop&w=1920&q=80', // Egypt Pyramids of Giza
  'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1920&q=80', // Hot air balloons over Cappadocia Turkey
];

export const internationalDestinations = [
  { title: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', link: '/destinations/uae' },
  { title: 'Bali', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80', link: '/destinations/bali' },
  { title: 'Thailand', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', link: '/destinations/thailand' },
  { title: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80', link: '/destinations/singapore' },
];

export const domesticDestinations = [
  { title: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80', link: '/destinations/maldives' },
  { title: 'Kashmir', image: 'https://images.unsplash.com/photo-1605649487212-47b9f5c1e813?auto=format&fit=crop&w=800&q=80', link: '/destinations/kashmir' },
  { title: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', link: '/destinations/goa' },
  { title: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', link: '/destinations/kerala' },
];

// UAE package listing data (mirrors UAEcard.html)
export const uaePackages = [
  {
    id: 1,
    title: '3-Star Dubai Supersaver Package - 3N/4D',
    nights: '3N/4D',
    strikePrice: 45999,
    price: 35999,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: '3-Star Dubai Supersaver Package - 4N/5D',
    nights: '4N/5D',
    strikePrice: 53999,
    price: 43999,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Dubai Supersaver Package (5 nights 6 days)',
    nights: '5N/6D',
    strikePrice: 59999,
    price: 49999,
    image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: '4 Star Supersaver Package - 3N/4D',
    nights: '3N/4D',
    strikePrice: 49999,
    price: 39999,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: '4-Star Dubai Supersaver Package - 4N/5D',
    nights: '4N/5D',
    strikePrice: 61599,
    price: 51599,
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf4d82d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: '4-Star Dubai Supersaver Package - 5N/6D',
    nights: '5N/6D',
    strikePrice: 69999,
    price: 59999,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: '5-Star Dubai Supersaver Package - 3N/4D',
    nights: '3N/4D',
    strikePrice: 55999,
    price: 45999,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: '5-Star Dubai Supersaver Package - 4N/5D',
    nights: '4N/5D',
    strikePrice: 64999,
    price: 54999,
    image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    title: '5-Star Dubai Supersaver Package - 5N/6D',
    nights: '5N/6D',
    strikePrice: 76999,
    price: 66999,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    title: 'UAE Grand Tour',
    nights: '9D/8N',
    strikePrice: 79999,
    price: 59999,
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf4d82d?auto=format&fit=crop&w=800&q=80',
  },
];

// Bali package listing data
export const baliPackages = [
  {
    id: 11,
    title: 'Bali Beach Paradise - 5D/4N',
    nights: '5D/4N',
    strikePrice: 39999,
    price: 32999,
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 12,
    title: 'Ubud Cultural Tour - 4D/3N',
    nights: '4D/3N',
    strikePrice: 33999,
    price: 27999,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 13,
    title: 'Bali Adventure - 6D/5N',
    nights: '6D/5N',
    strikePrice: 44999,
    price: 38999,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 14,
    title: 'Bali Luxury Retreat - 7D/6N',
    nights: '7D/6N',
    strikePrice: 62999,
    price: 52999,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 15,
    title: 'Bali Complete - 8D/7N',
    nights: '8D/7N',
    strikePrice: 54999,
    price: 45999,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
  },
  // Additional Bali packages (from Balicard.html)
  {
    id: 26,
    title: 'Bali Honeymoon Special - 5D/4N',
    nights: '4N/5D',
    strikePrice: 48999,
    price: 42999,
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 27,
    title: 'Bali Family Package - 6D/5N',
    nights: '5N/6D',
    strikePrice: 41999,
    price: 36999,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 28,
    title: 'Bali Budget Tour Package - 4D/3N',
    nights: '3N/4D',
    strikePrice: 28999,
    price: 24999,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 29,
    title: 'Bali Premium Experience - 9D/8N',
    nights: '8N/9D',
    strikePrice: 68999,
    price: 58999,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 30,
    title: 'Bali Explorer Package - 10D/9N',
    nights: '9N/10D',
    strikePrice: 72999,
    price: 62999,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
  },
];

// Thailand package listing data
export const thailandPackages = [
  {
    id: 16,
    title: 'Thailand Beach Paradise - 5D/4N',
    nights: '5D/4N',
    strikePrice: 42999,
    price: 35999,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 17,
    title: 'Bangkok Cultural Tour - 4D/3N',
    nights: '4D/3N',
    strikePrice: 36999,
    price: 30999,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 18,
    title: 'Thailand Adventure Package - 6D/5N',
    nights: '6D/5N',
    strikePrice: 47999,
    price: 41999,
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 19,
    title: 'Thailand Luxury Retreat - 7D/6N',
    nights: '7D/6N',
    strikePrice: 65999,
    price: 55999,
    image: 'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 20,
    title: 'Thailand Complete Tour - 8D/7N',
    nights: '8D/7N',
    strikePrice: 57999,
    price: 48999,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
  },
  // Extended Thailand packages
  {
    id: 36,
    title: 'Thailand Honeymoon Special - 5D/4N',
    nights: '5D/4N',
    strikePrice: 51999,
    price: 45999,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 37,
    title: 'Thailand Family Package - 6D/5N',
    nights: '6D/5N',
    strikePrice: 44999,
    price: 39999,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 38,
    title: 'Thailand Budget Tour Package - 4D/3N',
    nights: '4D/3N',
    strikePrice: 31999,
    price: 27999,
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 39,
    title: 'Thailand Premium Experience - 9D/8N',
    nights: '9D/8N',
    strikePrice: 71999,
    price: 61999,
    image: 'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?auto=format&fit=crop&w=800&q=80',
  },
];

// Singapore package listing data
export const singaporePackages = [
  {
    id: 21,
    title: 'Singapore City Break - 3D/2N',
    nights: '3D/2N',
    strikePrice: 30999,
    price: 25999,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 22,
    title: 'Singapore Deluxe - 4D/3N',
    nights: '4D/3N',
    strikePrice: 38999,
    price: 32999,
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 23,
    title: 'Singapore Family Fun - 5D/4N',
    nights: '5D/4N',
    strikePrice: 44999,
    price: 38999,
    image: 'https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 24,
    title: 'Singapore Luxury - 6D/5N',
    nights: '6D/5N',
    strikePrice: 54999,
    price: 48999,
    image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 25,
    title: 'Singapore Complete - 7D/6N',
    nights: '7D/6N',
    strikePrice: 49999,
    price: 44999,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
  },
  // Extended Singapore packages (from provided card list)
  {
    id: 31,
    title: 'Singapore Honeymoon Special - 4D/3N',
    nights: '4D/3N',
    strikePrice: 42999,
    price: 36999,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 32,
    title: 'Singapore Business Package - 5D/4N',
    nights: '5D/4N',
    strikePrice: 47999,
    price: 41999,
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 33,
    title: 'Singapore Budget Tour Package - 3D/2N',
    nights: '3D/2N',
    strikePrice: 28999,
    price: 23999,
    image: 'https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 34,
    title: 'Singapore Premium Experience - 8D/7N',
    nights: '8D/7N',
    strikePrice: 62999,
    price: 52999,
    image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 35,
    title: 'Singapore Explorer Package - 9D/8N',
    nights: '9D/8N',
    strikePrice: 58999,
    price: 49999,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  },
];

export const packages = [
  { id: 'australia', title: 'Australia', price: 29199, image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80', buttonLabel: 'Book Now' },
  // When buttonLabel is 'View Package', provide detailId to navigate to Package Details page
  { id: 'dubai-supersaver', title: 'SUPERSAVER PACKAGE - Dubai (3N/4D)', price: 24999, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', buttonLabel: 'View Package', detailId: 1 },
  { id: 'italy', title: 'Italy', price: 29799, image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80', buttonLabel: 'Book Now' },
  { id: 'japan', title: 'Japan', price: 29899, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80', buttonLabel: 'Book Now' },
  { id: 'turkey', title: 'Turkey', price: 29699, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80', buttonLabel: 'Book Now' },
];

// Detailed package content (subset from package-details-new.html)
export const packageDetails = {
  1: {
    name: '3-Star Dubai Supersaver  Package - 3N/4D',
    priceHTML: '&#8377;35,999',
    destination: 'Dubai, UAE',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1200',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200',
    ],
  },
  2: {
    name: '3-Star Dubai Supersaver Package - 4N/5D',
    priceHTML: '&#8377;43,999',
    destination: 'Dubai, UAE',
    images: [
      'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1200',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200',
    ],
  },
  3: {
    name: '3-Star Dubai Supersaver Package - 5N/6D',
    priceHTML: '&#8377;49,999',
    destination: 'Dubai, UAE',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1200',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200',
    ],
  },
  4: {
    name: '4 Star Dubai Supersaver Package - 3N/4D',
    priceHTML: '&#8377;39,999',
    destination: 'Dubai, UAE',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1200',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200',
    ],
  },
  5: {
    name: '4-Star Dubai Supersaver Package - 4N/5D',
    priceHTML: '&#8377;51,599',
    destination: 'Dubai, UAE',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1200',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200',
    ],
  },
  6: {
    name: '4-Star Dubai Supersaver Package - 5N/6D',
    priceHTML: '&#8377;59,999',
    destination: 'Dubai, UAE',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1200',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200',
    ],
  },
  7: {
    name: '5-Star Dubai Supersaver Package - 3N/4D',
    priceHTML: '&#8377;45,999',
    destination: 'Dubai, UAE',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1200',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200',
    ],
  },
  8: {
    name: '5-Star Dubai Supersaver Package - 4N/5D',
    priceHTML: '&#8377;54,999',
    destination: 'Dubai, UAE',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1200',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200',
    ],
  },
  9: {
    name: '5-Star Dubai Supersaver Package - 5N/6D',
    priceHTML: '&#8377;66,999',
    destination: 'Dubai, UAE',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1200',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200',
    ],
  },
  10: {
    name: 'UAE Grand Tour - 9D/8N',
    priceHTML: '&#8377;59,999',
    destination: 'Dubai, UAE',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=1200',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200',
    ],
  },
  // Bali Packages (11-15)
  11: {
    name: 'Bali Beach Paradise - 5D/4N',
    priceHTML: '&#8377;32,999',
    destination: 'Bali, Indonesia',
    images: [
      'https://picsum.photos/1200/675?random=11',
      'https://picsum.photos/1200/675?random=12',
      'https://picsum.photos/1200/675?random=13',
      'https://picsum.photos/1200/675?random=14',
    ],
  },
  12: {
    name: 'Ubud Cultural Tour - 4D/3N',
    priceHTML: '&#8377;27,999',
    destination: 'Bali, Indonesia',
    images: [
      'https://picsum.photos/1200/675?random=15',
      'https://picsum.photos/1200/675?random=16',
      'https://picsum.photos/1200/675?random=17',
      'https://picsum.photos/1200/675?random=18',
    ],
  },
  13: {
    name: 'Bali Adventure - 6D/5N',
    priceHTML: '&#8377;38,999',
    destination: 'Bali, Indonesia',
    images: [
      'https://picsum.photos/1200/675?random=19',
      'https://picsum.photos/1200/675?random=20',
      'https://picsum.photos/1200/675?random=21',
      'https://picsum.photos/1200/675?random=22',
    ],
  },
  14: {
    name: 'Bali Luxury Retreat - 7D/6N',
    priceHTML: '&#8377;52,999',
    destination: 'Bali, Indonesia',
    images: [
      'https://picsum.photos/1200/675?random=23',
      'https://picsum.photos/1200/675?random=24',
      'https://picsum.photos/1200/675?random=25',
      'https://picsum.photos/1200/675?random=26',
    ],
  },
  15: {
    name: 'Bali Complete - 8D/7N',
    priceHTML: '&#8377;45,999',
    destination: 'Bali, Indonesia',
    images: [
      'https://picsum.photos/1200/675?random=27',
      'https://picsum.photos/1200/675?random=28',
      'https://picsum.photos/1200/675?random=29',
      'https://picsum.photos/1200/675?random=30',
    ],
  },
  // Bali Extended (26-30)
  26: {
    name: 'Bali Honeymoon Special - 5D/4N',
    priceHTML: '&#8377;42,999',
    destination: 'Bali, Indonesia',
    images: [
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200',
      'https://images.unsplash.com/photo-1555400082-6e5b3c8b6b0a?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
    ],
  },
  27: {
    name: 'Bali Family Package - 6D/5N',
    priceHTML: '&#8377;36,999',
    destination: 'Bali, Indonesia',
    images: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
    ],
  },
  28: {
    name: 'Bali Budget Tour Package - 4D/3N',
    priceHTML: '&#8377;24,999',
    destination: 'Bali, Indonesia',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200',
      'https://images.unsplash.com/photo-1555400082-6e5b3c8b6b0a?w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200',
    ],
  },
  29: {
    name: 'Bali Premium Experience - 9D/8N',
    priceHTML: '&#8377;58,999',
    destination: 'Bali, Indonesia',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200',
    ],
  },
  30: {
    name: 'Bali Explorer Package - 10D/9N',
    priceHTML: '&#8377;62,999',
    destination: 'Bali, Indonesia',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200',
    ],
  },
  // Thailand Packages (16-20)
  16: {
    name: 'Bangkok Pattaya - 5D/4N',
    priceHTML: '&#8377;28,999',
    destination: 'Thailand',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200',
      'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?w=1200',
    ],
  },
  17: {
    name: 'Phuket Island - 4D/3N',
    priceHTML: '&#8377;34,999',
    destination: 'Thailand',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200',
      'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?w=1200',
    ],
  },
  18: {
    name: 'Thailand Explorer - 7D/6N',
    priceHTML: '&#8377;42,999',
    destination: 'Thailand',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200',
      'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?w=1200',
    ],
  },
  19: {
    name: 'Krabi Adventure - 5D/4N',
    priceHTML: '&#8377;36,999',
    destination: 'Thailand',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200',
      'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?w=1200',
    ],
  },
  20: {
    name: 'Thailand Grand Tour - 9D/8N',
    priceHTML: '&#8377;55,999',
    destination: 'Thailand',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200',
      'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?w=1200',
    ],
  },
  // Singapore Packages (21-25)
  21: {
    name: 'Singapore City Break - 3D/2N',
    priceHTML: '&#8377;25,999',
    destination: 'Singapore',
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200',
      'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=1200',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200',
    ],
  },
  22: {
    name: 'Singapore Deluxe - 4D/3N',
    priceHTML: '&#8377;32,999',
    destination: 'Singapore',
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200',
      'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=1200',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200',
    ],
  },
  23: {
    name: 'Singapore Family Fun - 5D/4N',
    priceHTML: '&#8377;38,999',
    destination: 'Singapore',
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200',
      'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=1200',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200',
    ],
  },
  24: {
    name: 'Singapore Luxury - 6D/5N',
    priceHTML: '&#8377;48,999',
    destination: 'Singapore',
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200',
      'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=1200',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200',
    ],
  },
  25: {
    name: 'Singapore Complete - 7D/6N',
    priceHTML: '&#8377;44,999',
    destination: 'Singapore',
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200',
      'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=1200',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200',
    ],
  },
  // Singapore Extended (31-35)
  31: {
    name: 'Singapore Honeymoon Special - 4D/3N',
    priceHTML: '&#8377;36,999',
    destination: 'Singapore',
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200',
      'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=1200',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200',
    ],
  },
  32: {
    name: 'Singapore Business Package - 5D/4N',
    priceHTML: '&#8377;41,999',
    destination: 'Singapore',
    images: [
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200',
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200',
      'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=1200',
    ],
  },
  33: {
    name: 'Singapore Budget Tour Package - 3D/2N',
    priceHTML: '&#8377;23,999',
    destination: 'Singapore',
    images: [
      'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=1200',
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200',
    ],
  },
  34: {
    name: 'Singapore Premium Experience - 8D/7N',
    priceHTML: '&#8377;52,999',
    destination: 'Singapore',
    images: [
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200',
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200',
      'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=1200',
    ],
  },
  35: {
    name: 'Singapore Explorer Package - 9D/8N',
    priceHTML: '&#8377;49,999',
    destination: 'Singapore',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200',
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200',
    ],
  },
  // Thailand Extended (36-39)
  36: {
    name: 'Thailand Honeymoon Special - 5D/4N',
    priceHTML: '&#8377;45,999',
    destination: 'Thailand',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200',
      'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?w=1200',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
    ],
  },
  37: {
    name: 'Thailand Family Package - 6D/5N',
    priceHTML: '&#8377;39,999',
    destination: 'Thailand',
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200',
      'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?w=1200',
    ],
  },
  38: {
    name: 'Thailand Budget Tour Package - 4D/3N',
    priceHTML: '&#8377;27,999',
    destination: 'Thailand',
    images: [
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?w=1200',
    ],
  },
  39: {
    name: 'Thailand Premium Experience - 9D/8N',
    priceHTML: '&#8377;61,999',
    destination: 'Thailand',
    images: [
      'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?w=1200',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    ],
  },
};

export const services = [
  { icon: 'fas fa-cogs', title: 'Quick Booking', description: 'Booking is quick as clicking a few clicks. We take care of all transportation and accommodations during your journey.' },
  { icon: 'fas fa-chart-pie', title: 'Backup Team', description: 'We have staff to assist in all stages of your holiday, from travel advise & best prices to ground handling & support during your holiday.' },
  { icon: 'fas fa-thumbs-up', title: 'Exciting Travel', description: 'We have a wide range of expertise and knowledge in our services. So we can provide you exciting and memorable travel experiences.' },
  { icon: 'fas fa-layer-group', title: 'Unique Destinations', description: 'Looking for a unique vacation destination? Then maybe a trip to one of the 10 most unique tourist destinations might.' },
  { icon: 'far fa-chart-bar', title: 'Worth of Money', description: 'There is not a better way to spend money, than spending money on travel. This is what we say, others and science.' },
  { icon: 'fas fa-database', title: 'Wonderful Places', description: 'We do our best to have you a wonderful experience by taking you to the wonderful and amazing places around the world.' },
];

export const feedback = {
  Dubai: {
    country: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500',
    testimonials: [
      { rating: 5, text: 'Amazing experience in Dubai! The Burj Khalifa was breathtaking and the desert safari was unforgettable. TraverseGlobe made everything perfect from start to finish.', author: 'Priya Sharma, Mumbai' },
      { rating: 5, text: 'Dubai trip was incredible! The luxury hotels and shopping malls exceeded expectations. Professional service throughout.', author: 'Amit Gupta, Bangalore' },
      { rating: 5, text: 'Perfect honeymoon destination! Dubai Marina and Palm Jumeirah were stunning. Highly recommend TraverseGlobe.', author: 'Neha & Rohit, Pune' },
    ],
  },
  Japan: {
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500',
    testimonials: [
      { rating: 5, text: 'Japan exceeded all expectations! From Tokyo to Kyoto, every moment was magical. Cherry blossoms were beautiful.', author: 'Rajesh Kumar, Delhi' },
      { rating: 5, text: 'Cultural experience was amazing! Mount Fuji, temples, and Japanese cuisine - everything was perfect.', author: 'Sita Devi, Chennai' },
      { rating: 4, text: 'Technology and tradition blend perfectly in Japan. Bullet trains and ancient temples - unforgettable!', author: 'Vikash Singh, Kolkata' },
    ],
  },
  USA: {
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=500',
    testimonials: [
      { rating: 5, text: 'USA was absolutely wonderful! Times Square, Central Park, and the food scene were incredible.', author: 'Anita Patel, Ahmedabad' },
      { rating: 5, text: 'From New York to California, every city had its charm. Grand Canyon was breathtaking!', author: 'Ravi Sharma, Hyderabad' },
      { rating: 5, text: 'Disney World and Hollywood were dream destinations. Kids loved every moment of the trip.', author: 'Meera Family, Indore' },
    ],
  },
  Egypt: {
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500',
    testimonials: [
      { rating: 5, text: 'Egypt was a perfect blend of history and culture. The pyramids and Nile River were stunning.', author: 'Vikram Singh, Jaipur' },
      { rating: 5, text: 'Pharaohs history came alive! Sphinx and Valley of Kings were incredible. Great archaeological experience.', author: 'Dr. Sunita Rao, Mumbai' },
      { rating: 4, text: 'Red Sea diving and ancient monuments - perfect combination of adventure and history.', author: 'Arjun Mehta, Surat' },
    ],
  },
};
