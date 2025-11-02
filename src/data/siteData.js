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

// Hotel Categories
export const hotelCategories = [
  { 
    title: 'Luxury Hotels', 
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', 
    link: '/hotels/luxury-hotels', 
    blurb: '5-star amenities, world-class service',
    icon: 'fa-crown',
    slug: 'luxury-hotels'
  },
  { 
    title: 'Beach Resorts', 
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', 
    link: '/hotels/beach-resorts', 
    blurb: 'Oceanfront views, private beaches',
    icon: 'fa-umbrella-beach',
    slug: 'beach-resorts'
  },
  { 
    title: 'Business Hotels', 
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80', 
    link: '/hotels/business-hotels', 
    blurb: 'Conference rooms, city center locations',
    icon: 'fa-briefcase',
    slug: 'business-hotels'
  },
  { 
    title: 'Budget Hotels', 
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80', 
    link: '/hotels/budget-hotels', 
    blurb: 'Affordable comfort, great value',
    icon: 'fa-tags',
    slug: 'budget-hotels'
  },
  { 
    title: 'Boutique Hotels', 
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80', 
    link: '/hotels/boutique-hotels', 
    blurb: 'Unique design, personalized experience',
    icon: 'fa-gem',
    slug: 'boutique-hotels'
  },
  { 
    title: 'Family Hotels', 
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80', 
    link: '/hotels/family-hotels', 
    blurb: 'Kid-friendly amenities, spacious rooms',
    icon: 'fa-users',
    slug: 'family-hotels'
  },
];

// Hotel Listings by Category
export const hotelListings = {
  'luxury-hotels': [
    {
      id: 'lux-1',
      name: 'The Taj Mahal Palace Mumbai',
      location: 'Mumbai, Maharashtra',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 18000,
      originalPrice: 24000,
      amenities: ['Pool', 'Spa', 'Fine Dining', 'Butler Service', 'Sea View'],
      description: 'Iconic luxury hotel overlooking the Gateway of India with world-class hospitality and heritage charm.'
    },
    {
      id: 'lux-2',
      name: 'The Oberoi Udaivilas Udaipur',
      location: 'Udaipur, Rajasthan',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 22000,
      originalPrice: 28000,
      amenities: ['Lake View', 'Spa', 'Palace Architecture', 'Fine Dining', 'Boat Rides'],
      description: 'Majestic palace hotel on Lake Pichola with royal Rajasthani architecture and unparalleled luxury.'
    },
    {
      id: 'lux-3',
      name: 'The Leela Palace New Delhi',
      location: 'New Delhi',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 16000,
      originalPrice: 21000,
      amenities: ['Rooftop Pool', 'Luxury Spa', 'Multiple Restaurants', 'Concierge', 'Airport Transfer'],
      description: 'Contemporary luxury in the heart of Delhi with impeccable service and modern amenities.'
    },
    {
      id: 'lux-4',
      name: 'ITC Grand Chola Chennai',
      location: 'Chennai, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 14000,
      originalPrice: 19000,
      amenities: ['Grand Architecture', 'Multiple Pools', 'Spa', 'Fine Dining', 'Business Center'],
      description: 'South India\'s grandest luxury hotel inspired by Chola dynasty architecture with exceptional hospitality.'
    },
  ],
  'beach-resorts': [
    {
      id: 'beach-1',
      name: 'Taj Exotica Resort & Spa Goa',
      location: 'Benaulim, Goa',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 15000,
      originalPrice: 20000,
      amenities: ['Private Beach', 'Water Sports', 'Infinity Pool', 'Spa', 'Beachside Dining'],
      description: 'Mediterranean-style beach resort with pristine beachfront and lush tropical gardens in South Goa.'
    },
    {
      id: 'beach-2',
      name: 'Alila Diwa Goa',
      location: 'Majorda, Goa',
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 12000,
      originalPrice: 16000,
      amenities: ['Beach Access', 'Pool', 'Spa', 'Water Sports', 'Goan Cuisine'],
      description: 'Contemporary luxury resort blending Goan-Portuguese architecture with modern design and beach access.'
    },
    {
      id: 'beach-3',
      name: 'Radisson Blu Resort Temple Bay',
      location: 'Mahabalipuram, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=800&q=80',
      rating: 4,
      price: 9000,
      originalPrice: 13000,
      amenities: ['Beach Access', 'Pool', 'Heritage Site Nearby', 'Spa', 'Multi-cuisine Restaurant'],
      description: 'Coastal resort near UNESCO World Heritage temples with panoramic Bay of Bengal views.'
    },
    {
      id: 'beach-4',
      name: 'Vivanta by Taj Kovalam',
      location: 'Kovalam, Kerala',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 11000,
      originalPrice: 15000,
      amenities: ['Cliff-top Views', 'Private Beach', 'Ayurvedic Spa', 'Pool', 'Kerala Cuisine'],
      description: 'Stunning cliff-top resort overlooking the Arabian Sea with authentic Kerala hospitality.'
    },
  ],
  'business-hotels': [
    {
      id: 'biz-1',
      name: 'JW Marriott Mumbai Sahar',
      location: 'Mumbai, Maharashtra',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 12000,
      originalPrice: 16000,
      amenities: ['Conference Rooms', 'Business Center', 'High-Speed WiFi', 'Airport Shuttle', 'Executive Lounge'],
      description: 'Premier business hotel near Mumbai airport with extensive meeting facilities and executive services.'
    },
    {
      id: 'biz-2',
      name: 'The Westin Bangalore',
      location: 'Bangalore, Karnataka',
      image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 10000,
      originalPrice: 14000,
      amenities: ['Meeting Rooms', 'Business Lounge', 'Wellness Center', 'Multiple Restaurants', 'Valet'],
      description: 'Modern business hotel in IT corridor with state-of-the-art conference facilities and wellness amenities.'
    },
    {
      id: 'biz-3',
      name: 'Hyatt Regency Pune',
      location: 'Pune, Maharashtra',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 9000,
      originalPrice: 12000,
      amenities: ['Business Center', 'Conference Hall', 'WiFi', 'Fitness Center', 'Multi-cuisine Dining'],
      description: 'Elegant business hotel near Pune IT parks with comprehensive corporate facilities.'
    },
    {
      id: 'biz-4',
      name: 'Trident BKC Mumbai',
      location: 'Mumbai, Maharashtra',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 11000,
      originalPrice: 15000,
      amenities: ['Meeting Rooms', 'Business Center', 'Fine Dining', 'Pool', 'Central Location'],
      description: 'Contemporary business hotel in Mumbai\'s business district with excellent connectivity and facilities.'
    },
  ],
  'budget-hotels': [
    {
      id: 'budget-1',
      name: 'FabHotel Prime Plaza',
      location: 'Delhi NCR',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      rating: 3,
      price: 2500,
      originalPrice: 3500,
      amenities: ['Free WiFi', 'Breakfast', 'AC Rooms', '24/7 Reception', 'Metro Nearby'],
      description: 'Comfortable budget accommodation near metro station with modern amenities and clean rooms.'
    },
    {
      id: 'budget-2',
      name: 'Treebo Trend Pearl Inn',
      location: 'Jaipur, Rajasthan',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
      rating: 3,
      price: 2200,
      originalPrice: 3200,
      amenities: ['Clean Rooms', 'WiFi', 'Breakfast', 'Travel Desk', 'Heritage Area'],
      description: 'Budget-friendly hotel near major Jaipur attractions with comfortable stays and helpful staff.'
    },
    {
      id: 'budget-3',
      name: 'OYO Flagship Beach View',
      location: 'Panjim, Goa',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
      rating: 3,
      price: 3000,
      originalPrice: 4500,
      amenities: ['Beach Nearby', 'WiFi', 'Breakfast', 'Clean Rooms', 'Bike Rental'],
      description: 'Affordable Goa stay near beaches with basic amenities and easy access to nightlife.'
    },
    {
      id: 'budget-4',
      name: 'Zostel Manali',
      location: 'Manali, Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      rating: 4,
      price: 1800,
      originalPrice: 2800,
      amenities: ['Hostel & Private Rooms', 'Common Area', 'WiFi', 'Mountain Views', 'Cafe'],
      description: 'Backpacker-friendly accommodation with stunning mountain views and social atmosphere.'
    },
  ],
  'boutique-hotels': [
    {
      id: 'boutique-1',
      name: 'Suryagarh Jaisalmer',
      location: 'Jaisalmer, Rajasthan',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 16000,
      originalPrice: 21000,
      amenities: ['Fort Architecture', 'Desert Safari', 'Heritage Dining', 'Spa', 'Cultural Performances'],
      description: 'Magnificent desert fortress hotel with authentic Rajasthani architecture and royal experiences.'
    },
    {
      id: 'boutique-2',
      name: 'The Malabar House Kochi',
      location: 'Fort Kochi, Kerala',
      image: 'https://images.unsplash.com/photo-1569660072562-48a035e65c30?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 12000,
      originalPrice: 16000,
      amenities: ['Heritage Property', 'Courtyard Pool', 'Fine Dining', 'Art Collection', 'Spa'],
      description: 'Restored 18th-century Dutch heritage bungalow with contemporary design and old-world charm.'
    },
    {
      id: 'boutique-3',
      name: 'Abode Bombay',
      location: 'Colaba, Mumbai',
      image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80',
      rating: 4,
      price: 10000,
      originalPrice: 14000,
      amenities: ['Boutique Suites', 'Rooftop Bar', 'Contemporary Design', 'Curated Art', 'Personalized Service'],
      description: 'Chic boutique hotel in South Mumbai with curated interiors and personalized hospitality.'
    },
    {
      id: 'boutique-4',
      name: 'Dune Eco Village & Spa',
      location: 'Puducherry',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      rating: 5,
      price: 13000,
      originalPrice: 17000,
      amenities: ['Eco-friendly', 'Beach Access', 'Organic Farm', 'Yoga', 'Ayurvedic Spa'],
      description: 'Sustainable luxury eco-resort with organic farm, private beach access, and holistic wellness.'
    },
  ],
  'family-hotels': [
    {
      id: 'family-1',
      name: 'Club Mahindra Goa',
      location: 'Varca Beach, Goa',
      image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
      rating: 4,
      price: 12000,
      originalPrice: 16000,
      amenities: ['Kids Club', 'Family Pool', 'Beach Access', 'Play Area', 'Family Suites'],
      description: 'Family-friendly beach resort with dedicated kids activities and entertainment for all ages.'
    },
    {
      id: 'family-2',
      name: 'The Golden Palms Bangalore',
      location: 'Bangalore, Karnataka',
      image: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?auto=format&fit=crop&w=800&q=80',
      rating: 4,
      price: 10000,
      originalPrice: 14000,
      amenities: ['Water Park', 'Kids Club', 'Adventure Activities', 'Family Rooms', 'Multiple Pools'],
      description: 'Resort with water park and adventure activities perfect for family vacations near Bangalore.'
    },
    {
      id: 'family-3',
      name: 'Ramada Udaipur Resort',
      location: 'Udaipur, Rajasthan',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      rating: 4,
      price: 9000,
      originalPrice: 12000,
      amenities: ['Lake View', 'Kids Play Area', 'Family Suites', 'Pool', 'Rajasthani Cuisine'],
      description: 'Family resort with lake views and cultural experiences showcasing Rajasthani heritage.'
    },
    {
      id: 'family-4',
      name: 'Sterling Ooty Fern Hill',
      location: 'Ooty, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      rating: 4,
      price: 8000,
      originalPrice: 11000,
      amenities: ['Mountain Views', 'Kids Activities', 'Family Rooms', 'Indoor Games', 'Nature Trails'],
      description: 'Hill station resort with cool climate, nature trails, and family-friendly activities in Nilgiris.'
    },
  ],
};

// UAE package listing data (mirrors UAEcard.html)
export const uaePackages = [
  {
    id: 1,
    title: '3-Star Dubai Supersaver Package - 3N/4D',
    nights: '3N/4D',
    strikePrice: 45999,
    price: 35999,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    tags: ['Budget', 'City Tour', 'Shopping'],
    overview: 'Discover the allure of Dubai with our exclusive tour package! Explore iconic landmarks, enjoy thrilling adventures and world-class shopping. With comfortable stays, guided tours, and seamless transfers, experience the perfect blend of adventure, luxury, and culture.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival | Hotel Transfer | Dhow Cruise Dinner',
        description: 'Welcome to Dubai! Upon arrival at the airport, our representative will assist with a smooth transfer to the hotel.\n\nCheck-in and relax after your journey and soak in the first glimpses of this amazing city.\n\nEvening Dhow Cruise: Enjoy a buffet dinner, live entertainment, and stunning night views of the skyline.'
      },
      {
        day: 2,
        title: 'Half-Day City Tour | Burj Khalifa (124th – Non-Prime)',
        description: 'Explore the city\'s blend of heritage and modernity: Jumeirah Mosque, Burj Al Arab, Palm Jumeirah, Atlantis photo stop, and Al Fahidi district.\n\nAfternoon free at leisure for shopping or relaxation.\n\nEvening visit to Burj Khalifa with mesmerizing Fountain Show.'
      },
      {
        day: 3,
        title: 'Desert Safari Adventure with BBQ Dinner',
        description: 'Morning at leisure.\n\nAfternoon dune bashing, sandboarding, camel rides, and a BBQ dinner with live shows under the stars.'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Breakfast at hotel. Check-out & transfer to airport for your onward journey.'
      }
    ],
    inclusions: [
      '2/3/4 Nights accommodation as per package',
      'Daily breakfast at hotel',
      'Airport transfers (arrival & departure)',
      'Dubai City Tour with professional guide',
      'Burj Khalifa 124th floor entry tickets',
      'Desert Safari with BBQ dinner',
      'Dhow Cruise with dinner',
      'All transfers in private AC vehicle'
    ],
    exclusions: [
      'International airfare',
      'Visa charges (if applicable)',
      'Travel insurance',
      'Personal expenses and tips',
      'Meals not mentioned in inclusions'
    ],
    accommodations: [
      'Ramada by Wyndham Dubai Deira or similar',
      'Citymax Hotel Bur Dubai or similar',
      'Golden Tulip Al Barsha or similar'
    ],
    accommodationNote: '*Hotel subject to availability at the time of booking. Similar category hotel will be provided.'
  },
  {
    id: 2,
    title: '3-Star Dubai Supersaver Package - 4N/5D',
    nights: '4N/5D',
    strikePrice: 53999,
    price: 43999,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    tags: ['Budget', 'Adventure', 'Family'],
    overview: 'Discover the allure of Dubai with our exclusive tour package! Explore iconic landmarks, enjoy thrilling adventures and world-class shopping. With comfortable stays, guided tours, and seamless transfers, experience the perfect blend of adventure, luxury, and culture.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival | Hotel Transfer | Dhow Cruise Dinner',
        description: 'Welcome to Dubai! Upon arrival at the airport, our representative will assist with a smooth transfer to the hotel.\n\nCheck-in and relax after your journey and soak in the first glimpses of this amazing city.\n\nEvening Dhow Cruise: Enjoy a buffet dinner, live entertainment, and stunning night views of the skyline.'
      },
      {
        day: 2,
        title: 'Half-Day City Tour | Burj Khalifa (124th – Non-Prime)',
        description: 'Explore the city\'s blend of heritage and modernity: Jumeirah Mosque, Burj Al Arab, Palm Jumeirah, Atlantis photo stop, and Al Fahidi district.\n\nAfternoon free at leisure for shopping or relaxation.\n\nEvening visit to Burj Khalifa with mesmerizing Fountain Show.'
      },
      {
        day: 3,
        title: 'Desert Safari Adventure with BBQ Dinner',
        description: 'Morning at leisure.\n\nAfternoon dune bashing, sandboarding, camel rides, and a BBQ dinner with live shows under the stars.'
      },
      {
        day: 4,
        title: 'Dubai Miracle Garden | Global Village',
        description: 'Stroll through Miracle Garden\'s spectacular floral displays.\n\nExperience Global Village\'s pavilions, cuisines, shopping and live performances.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Breakfast at hotel. Check-out & transfer to airport for your onward journey.'
      }
    ],
    inclusions: [
      '3/4/5 Nights accommodation as per package',
      'Daily breakfast at hotel',
      'Airport transfers (arrival & departure)',
      'Dubai City Tour with professional guide',
      'Burj Khalifa 124th floor entry tickets',
      'Desert Safari with BBQ dinner',
      'Dhow Cruise with dinner',
      'All transfers in private AC vehicle'
    ],
    exclusions: [
      'International airfare',
      'Visa charges (if applicable)',
      'Travel insurance',
      'Personal expenses and tips',
      'Meals not mentioned in inclusions'
    ],
    accommodations: [
      'Ramada by Wyndham Dubai Deira or similar',
      'Citymax Hotel Bur Dubai or similar',
      'Golden Tulip Al Barsha or similar'
    ],
    accommodationNote: '*Hotel subject to availability at the time of booking. Similar category hotel will be provided.'
  },
  {
    id: 3,
    title: 'Dubai Supersaver Package (5 nights 6 days)',
    nights: '5N/6D',
    strikePrice: 59999,
    price: 49999,
    image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&w=800&q=80',
    tags: ['Popular', 'Desert Safari', 'Burj Khalifa'],
    overview: 'Experience the complete Dubai adventure with our 5-night package! From iconic landmarks to thrilling desert safaris, luxury shopping to cultural experiences, this package offers the perfect balance of excitement and relaxation.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival | Hotel Transfer | Welcome',
        description: 'Welcome to Dubai! Our representative will meet you at the airport and transfer you to your hotel.\n\nCheck-in and relax. Evening free for leisure or explore nearby areas on your own.'
      },
      {
        day: 2,
        title: 'Dubai City Tour | Burj Khalifa',
        description: 'Full-day city tour covering Jumeirah Mosque, Burj Al Arab, Palm Jumeirah, Atlantis, and traditional souks.\n\nEvening visit to Burj Khalifa 124th floor with stunning city views and fountain show.'
      },
      {
        day: 3,
        title: 'Desert Safari with BBQ Dinner',
        description: 'Morning at leisure for shopping or relaxation.\n\nAfternoon pickup for desert safari adventure with dune bashing, camel riding, sandboarding, and traditional BBQ dinner with live entertainment.'
      },
      {
        day: 4,
        title: 'Dhow Cruise Marina | Free Time',
        description: 'Day free for shopping at Dubai Mall or exploring at your own pace.\n\nEvening Marina Dhow Cruise with international buffet dinner and live entertainment.'
      },
      {
        day: 5,
        title: 'Abu Dhabi City Tour',
        description: 'Full-day tour to Abu Dhabi visiting Sheikh Zayed Grand Mosque, Emirates Palace, Heritage Village, and Corniche.\n\nReturn to Dubai in the evening.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Breakfast at hotel. Check-out and transfer to airport for your onward journey with wonderful memories.'
      }
    ],
    inclusions: [
      '5 Nights accommodation in 3-star hotel',
      'Daily breakfast at hotel',
      'Airport transfers (arrival & departure)',
      'Dubai City Tour with guide',
      'Burj Khalifa 124th floor tickets',
      'Desert Safari with BBQ dinner',
      'Dhow Cruise Marina with dinner',
      'Abu Dhabi City Tour',
      'All transfers in private AC vehicle'
    ],
    exclusions: [
      'International airfare',
      'UAE visa charges',
      'Travel insurance',
      'Personal expenses and tips',
      'Lunch and dinner (except mentioned)',
      'Optional tours and activities'
    ],
    accommodations: [
      'Ramada by Wyndham Dubai Deira or similar',
      'Citymax Hotel Bur Dubai or similar',
      'Golden Tulip Al Barsha or similar'
    ],
    accommodationNote: '*Hotel subject to availability at the time of booking. Similar category hotel will be provided.'
  },
  {
    id: 4,
    title: '4 Star Supersaver Package - 3N/4D',
    nights: '3N/4D',
    strikePrice: 49999,
    price: 39999,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
    tags: ['Comfort', 'Luxury', 'City Tour'],
    overview: 'Upgrade your Dubai experience with our 4-star package! Enjoy enhanced comfort, premium hotel amenities, and all the must-see attractions. Perfect for travelers seeking quality and value.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival | Hotel Transfer | Dhow Cruise',
        description: 'Arrive in Dubai and transfer to your 4-star hotel. Check-in and freshen up.\n\nEvening Dhow Cruise with international buffet dinner and entertainment along Dubai Creek.'
      },
      {
        day: 2,
        title: 'Dubai City Tour | Burj Khalifa',
        description: 'Half-day guided city tour visiting iconic landmarks.\n\nAfternoon shopping at Dubai Mall.\n\nEvening Burj Khalifa visit with fountain show.'
      },
      {
        day: 3,
        title: 'Desert Safari Adventure',
        description: 'Morning at leisure to enjoy hotel facilities.\n\nAfternoon desert safari with dune bashing, camel riding, henna painting, and BBQ dinner with cultural shows.'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Breakfast at hotel. Free time until checkout.\n\nTransfer to airport for your departure flight.'
      }
    ],
    inclusions: [
      '3 Nights accommodation in 4-star hotel',
      'Daily breakfast at hotel',
      'Airport transfers in private vehicle',
      'Dubai City Tour',
      'Burj Khalifa entry tickets (124th floor)',
      'Desert Safari with BBQ dinner',
      'Dhow Cruise with dinner',
      'All tours in private AC vehicle'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Personal expenses',
      'Meals not mentioned',
      'Optional activities'
    ],
    accommodations: [
      'Copthorne Hotel Dubai or similar',
      'Rove Downtown Dubai or similar',
      'Millennium Place Barsha Heights or similar'
    ],
    accommodationNote: '*4-star hotels subject to availability. Similar standard accommodation will be provided.'
  },
  {
    id: 5,
    title: '4-Star Dubai Supersaver Package - 4N/5D',
    nights: '4N/5D',
    strikePrice: 61599,
    price: 51599,
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf4d82d?auto=format&fit=crop&w=800&q=80',
    tags: ['Premium', 'Adventure', 'Sightseeing'],
    overview: 'Discover Dubai in premium comfort! This 4-star package combines luxury accommodation with thrilling experiences. Explore world-famous attractions, enjoy desert adventures, and create unforgettable memories.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival | Welcome to Dubai',
        description: 'Airport pickup and transfer to 4-star hotel.\n\nCheck-in and relax. Evening free for leisure.'
      },
      {
        day: 2,
        title: 'Dubai City Tour | Burj Khalifa',
        description: 'Morning city tour covering major attractions including Burj Al Arab, Palm Jumeirah, and Dubai Marina.\n\nEvening Burj Khalifa visit with breathtaking views.'
      },
      {
        day: 3,
        title: 'Desert Safari | BBQ Dinner',
        description: 'Day free for shopping or relaxation.\n\nAfternoon desert adventure with multiple activities and traditional dinner under the stars.'
      },
      {
        day: 4,
        title: 'Dhow Cruise | Dubai Mall',
        description: 'Day at leisure for shopping at world-class malls.\n\nEvening Dhow Cruise with dinner and entertainment.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Breakfast and checkout. Transfer to airport with amazing memories of Dubai.'
      }
    ],
    inclusions: [
      '4 Nights in 4-star hotel',
      'Daily breakfast',
      'Airport transfers both ways',
      'Dubai City Tour',
      'Burj Khalifa tickets',
      'Desert Safari with dinner',
      'Dhow Cruise with dinner',
      'Private AC vehicle for all transfers'
    ],
    exclusions: [
      'Airfare',
      'Visa charges',
      'Insurance',
      'Personal expenses',
      'Lunches and dinners not mentioned',
      'Additional activities'
    ],
    accommodations: [
      'Copthorne Hotel Dubai or similar',
      'Rove Downtown Dubai or similar',
      'Millennium Place Barsha Heights or similar'
    ],
    accommodationNote: '*Accommodation subject to availability. Equivalent standard will be provided.'
  },
  {
    id: 6,
    title: '4-Star Dubai Supersaver Package - 5N/6D',
    nights: '5N/6D',
    strikePrice: 69999,
    price: 59999,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    tags: ['Popular', 'Family', 'Shopping'],
    overview: 'The perfect family package for Dubai! Extended stay with comfortable 4-star accommodation, family-friendly activities, shopping experiences, and all major attractions. Great value for an extended Dubai vacation.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival | Hotel Check-in',
        description: 'Welcome to Dubai! Transfer to hotel and check-in.\n\nEvening free to explore nearby areas or relax at hotel.'
      },
      {
        day: 2,
        title: 'Dubai City Tour',
        description: 'Full-day city tour with guide visiting all major landmarks and photo opportunities.\n\nEvening free for leisure.'
      },
      {
        day: 3,
        title: 'Burj Khalifa | Dubai Mall',
        description: 'Morning free for relaxation.\n\nAfternoon visit to Burj Khalifa.\n\nEvening shopping at Dubai Mall with fountain show.'
      },
      {
        day: 4,
        title: 'Desert Safari Adventure',
        description: 'Relax in the morning.\n\nAfternoon desert safari with all activities and BBQ dinner.'
      },
      {
        day: 5,
        title: 'Dhow Cruise | Free Time',
        description: 'Day free for shopping or optional tours.\n\nEvening Dhow Cruise with dinner.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Breakfast and checkout. Airport transfer for your flight home.'
      }
    ],
    inclusions: [
      '5 Nights 4-star accommodation',
      'Daily breakfast',
      'Airport transfers',
      'Dubai City Tour',
      'Burj Khalifa entry',
      'Desert Safari with dinner',
      'Dhow Cruise with dinner',
      'All transfers in AC vehicle'
    ],
    exclusions: [
      'International flights',
      'Visa processing',
      'Insurance',
      'Tips and gratuities',
      'Meals except breakfast and mentioned dinners',
      'Optional tours'
    ],
    accommodations: [
      'Copthorne Hotel Dubai or similar',
      'Rove Downtown Dubai or similar',
      'Millennium Place Barsha Heights or similar'
    ],
    accommodationNote: '*Hotels subject to availability. Similar category provided.'
  },
  {
    id: 7,
    title: '5-Star Dubai Supersaver Package - 3N/4D',
    nights: '3N/4D',
    strikePrice: 55999,
    price: 45999,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    tags: ['Luxury', 'Premium', 'Honeymoon'],
    overview: 'Indulge in luxury with our 5-star Dubai experience! Premium hotels, personalized service, and exclusive experiences. Perfect for honeymooners and luxury travelers seeking the ultimate Dubai getaway.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Style',
        description: 'VIP airport reception and luxury transfer to 5-star hotel.\n\nWelcome drinks and check-in. Evening at leisure to enjoy premium hotel facilities.'
      },
      {
        day: 2,
        title: 'Dubai Highlights | Burj Khalifa',
        description: 'Private city tour with premium vehicle.\n\nAfternoon at leisure.\n\nEvening Burj Khalifa visit with premium lounge access.'
      },
      {
        day: 3,
        title: 'Premium Desert Safari',
        description: 'Morning spa session at hotel (optional).\n\nLuxury desert safari with private majlis seating and gourmet BBQ dinner.'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Leisurely breakfast. Late checkout available.\n\nLuxury transfer to airport.'
      }
    ],
    inclusions: [
      '3 Nights in 5-star luxury hotel',
      'Daily breakfast buffet',
      'Premium airport transfers',
      'Private Dubai City Tour',
      'Burj Khalifa premium tickets',
      'Premium Desert Safari with gourmet dinner',
      'Dhow Cruise Marina with dinner',
      'All transfers in luxury vehicles'
    ],
    exclusions: [
      'International airfare',
      'UAE visa',
      'Travel insurance',
      'Spa treatments',
      'Alcoholic beverages',
      'Personal shopping and expenses'
    ],
    accommodations: [
      'JW Marriott Marquis Dubai or similar',
      'Hilton Dubai Al Habtoor City or similar',
      'Sheraton Grand Hotel Dubai or similar'
    ],
    accommodationNote: '*5-star luxury hotels subject to availability. Equivalent luxury accommodation guaranteed.'
  },
  {
    id: 8,
    title: '5-Star Dubai Supersaver Package - 4N/5D',
    nights: '4N/5D',
    strikePrice: 64999,
    price: 54999,
    image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&w=800&q=80',
    tags: ['Luxury', 'Romantic', 'Fine Dining'],
    overview: 'The ultimate romantic Dubai escape! Luxurious 5-star accommodation, fine dining experiences, and premium tours. Create magical moments in the city of dreams with personalized service and exclusive amenities.',
    itinerary: [
      {
        day: 1,
        title: 'Grand Arrival | Dhow Cruise',
        description: 'Premium airport reception and luxury hotel transfer.\n\nCheck-in to 5-star accommodation.\n\nEvening Marina Dhow Cruise with premium dining experience.'
      },
      {
        day: 2,
        title: 'Private City Tour | Burj Khalifa',
        description: 'Personalized city tour with English-speaking guide.\n\nLunch at leisure.\n\nSunset at Burj Khalifa with At The Top SKY experience (148th floor).'
      },
      {
        day: 3,
        title: 'VIP Desert Experience',
        description: 'Morning at leisure - enjoy hotel spa and pool.\n\nAfternoon VIP desert safari with falcon show, private seating, and premium BBQ dinner with live entertainment.'
      },
      {
        day: 4,
        title: 'Leisure Day | Fine Dining',
        description: 'Day free for luxury shopping or optional experiences.\n\nEvening fine dining experience at hotel or renowned restaurant.'
      },
      {
        day: 5,
        title: 'Farewell Dubai',
        description: 'Leisurely breakfast. Late checkout facility.\n\nLuxury airport transfer with fond memories.'
      }
    ],
    inclusions: [
      '4 Nights 5-star luxury accommodation',
      'Daily gourmet breakfast',
      'Premium airport transfers',
      'Private city tour with guide',
      'Burj Khalifa At The Top SKY tickets',
      'VIP Desert Safari with premium dinner',
      'Marina Dhow Cruise with dinner',
      'All transfers in luxury vehicles',
      'Welcome amenities'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Travel and medical insurance',
      'Fine dining meals (except mentioned)',
      'Spa treatments',
      'Personal expenses and shopping'
    ],
    accommodations: [
      'JW Marriott Marquis Dubai or similar',
      'Hilton Dubai Al Habtoor City or similar',
      'Sheraton Grand Hotel Dubai or similar',
      'Address Dubai Mall or similar'
    ],
    accommodationNote: '*Premium 5-star hotels guaranteed. Upgrades available on request.'
  },
  {
    id: 9,
    title: '5-Star Dubai Supersaver Package - 5N/6D',
    nights: '5N/6D',
    strikePrice: 76999,
    price: 66999,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
    tags: ['Luxury', 'Best Seller', 'All Inclusive'],
    overview: 'Our most popular luxury package! Experience Dubai like royalty with extended stay in 5-star hotels, comprehensive tours, premium experiences, and exclusive amenities. The ultimate all-inclusive Dubai vacation.',
    itinerary: [
      {
        day: 1,
        title: 'Royal Welcome',
        description: 'VIP airport meet & greet with luxury transfer.\n\nCheck-in to 5-star hotel with welcome amenities.\n\nEvening at leisure with hotel facilities.'
      },
      {
        day: 2,
        title: 'Dubai City Tour | Burj Khalifa',
        description: 'Private guided city tour covering all major attractions.\n\nAfternoon at Dubai Mall.\n\nSunset at Burj Khalifa with SKY access.'
      },
      {
        day: 3,
        title: 'Premium Desert Safari',
        description: 'Morning relaxation or spa time.\n\nAfternoon VIP desert safari with exclusive experiences and gourmet dinner.'
      },
      {
        day: 4,
        title: 'Abu Dhabi Excursion',
        description: 'Full-day luxury tour to Abu Dhabi visiting Grand Mosque, Emirates Palace, and Louvre Museum.\n\nReturn to Dubai evening.'
      },
      {
        day: 5,
        title: 'Dhow Cruise | Free Time',
        description: 'Day for shopping or optional activities.\n\nEvening premium Marina Dhow Cruise with international buffet.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Leisurely breakfast. Late checkout.\n\nLuxury airport transfer for your journey home.'
      }
    ],
    inclusions: [
      '5 Nights in 5-star luxury hotel',
      'Daily gourmet breakfast',
      'VIP airport transfers',
      'Private Dubai City Tour',
      'Burj Khalifa At The Top SKY',
      'VIP Desert Safari with gourmet dinner',
      'Premium Dhow Cruise with dinner',
      'Abu Dhabi City Tour',
      'All luxury vehicle transfers',
      'Welcome amenities and gifts'
    ],
    exclusions: [
      'International airfare',
      'UAE visa charges',
      'Comprehensive travel insurance',
      'Meals not specified',
      'Spa and wellness treatments',
      'Shopping and personal expenses',
      'Optional premium experiences'
    ],
    accommodations: [
      'JW Marriott Marquis Dubai or similar',
      'Hilton Dubai Al Habtoor City or similar',
      'Address Dubai Mall or similar',
      'Sheraton Grand Hotel Dubai or similar'
    ],
    accommodationNote: '*Guaranteed 5-star luxury properties. Room upgrades and suites available upon request.'
  },
  {
    id: 10,
    title: 'UAE Grand Tour',
    nights: '9D/8N',
    strikePrice: 79999,
    price: 59999,
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf4d82d?auto=format&fit=crop&w=800&q=80',
    tags: ['Complete Tour', 'Best Value', 'Family'],
    overview: 'Explore the entire UAE with our comprehensive grand tour! Visit Dubai, Abu Dhabi, and other emirates. Experience modern marvels, cultural heritage, desert adventures, and coastal beauty. The complete UAE experience for families and explorers.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival Dubai',
        description: 'Airport reception and hotel transfer.\n\nCheck-in and relax. Evening Dhow Cruise with dinner.'
      },
      {
        day: 2,
        title: 'Dubai City Tour',
        description: 'Full-day Dubai city tour covering all major landmarks and attractions.\n\nEvening free for shopping.'
      },
      {
        day: 3,
        title: 'Burj Khalifa | Desert Safari',
        description: 'Morning visit to Burj Khalifa.\n\nAfternoon desert safari with BBQ dinner and entertainment.'
      },
      {
        day: 4,
        title: 'Dubai to Abu Dhabi',
        description: 'Checkout and drive to Abu Dhabi.\n\nCity tour including Grand Mosque, Emirates Palace, Heritage Village.\n\nCheck-in to Abu Dhabi hotel.'
      },
      {
        day: 5,
        title: 'Abu Dhabi | Ferrari World',
        description: 'Full-day at Ferrari World theme park with unlimited rides.\n\nEvening at leisure.'
      },
      {
        day: 6,
        title: 'Abu Dhabi to Dubai',
        description: 'Morning Louvre Museum visit.\n\nReturn to Dubai. Evening at leisure or shopping.'
      },
      {
        day: 7,
        title: 'Sharjah & Ajman Tour',
        description: 'Day trip to Sharjah and Ajman emirates.\n\nVisit cultural sites, museums, and beaches.\n\nReturn to Dubai.'
      },
      {
        day: 8,
        title: 'Dubai Parks & Resorts',
        description: 'Full-day at Dubai Parks - Motiongate, Bollywood Parks, or Legoland.\n\nEvening return to hotel.'
      },
      {
        day: 9,
        title: 'Departure',
        description: 'Breakfast and checkout.\n\nFree time until transfer to airport for departure.'
      }
    ],
    inclusions: [
      '8 Nights accommodation (5N Dubai + 3N Abu Dhabi)',
      'Daily breakfast at hotels',
      'Airport transfers',
      'Dubai City Tour',
      'Burj Khalifa tickets',
      'Desert Safari with dinner',
      'Dhow Cruise with dinner',
      'Abu Dhabi City Tour',
      'Ferrari World tickets',
      'Louvre Museum tickets',
      'Sharjah & Ajman tour',
      'Dubai Parks tickets',
      'All inter-city and tour transfers'
    ],
    exclusions: [
      'International flights',
      'Visa charges',
      'Travel insurance',
      'Lunch and dinners (except mentioned)',
      'Personal expenses',
      'Tips to guides and drivers'
    ],
    accommodations: [
      'Dubai: Ramada/Citymax or similar 3-star hotels',
      'Abu Dhabi: Centro Capital Centre or similar 3-star hotels'
    ],
    accommodationNote: '*Hotels subject to availability. Similar category accommodation will be provided in both cities.'
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
    tags: ['Beach', 'Relaxation', 'Popular'],
    overview: 'Escape to tropical paradise! Relax on pristine beaches, explore vibrant culture, and experience Balinese hospitality. This beach-focused package offers the perfect blend of relaxation and adventure in Indonesia\'s most beautiful island.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bali',
        description: 'Welcome to Bali! Airport pickup and transfer to your beachfront hotel.\n\nCheck-in and relax. Evening free to explore the beach or hotel facilities.'
      },
      {
        day: 2,
        title: 'Uluwatu Temple | Kecak Dance',
        description: 'Morning at leisure on the beach.\n\nAfternoon visit to Uluwatu Temple perched on cliff.\n\nEvening Kecak Fire Dance performance at sunset.'
      },
      {
        day: 3,
        title: 'Water Sports | Beach Activities',
        description: 'Full day of water sports at Tanjung Benoa - parasailing, banana boat, jet ski.\n\nEvening beachside seafood dinner.'
      },
      {
        day: 4,
        title: 'Tanah Lot Temple | Sunset',
        description: 'Visit iconic Tanah Lot sea temple.\n\nExplore local markets.\n\nSunset viewing and traditional dinner.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Breakfast at hotel. Free time for last-minute shopping or beach time.\n\nAirport transfer for departure.'
      }
    ],
    inclusions: [
      '4 Nights beachfront accommodation',
      'Daily breakfast',
      'Airport transfers',
      'Uluwatu Temple tour with Kecak Dance',
      'Water sports package',
      'Tanah Lot Temple tour',
      'All transfers in AC vehicle',
      'English-speaking guide'
    ],
    exclusions: [
      'International flights',
      'Indonesia visa on arrival',
      'Travel insurance',
      'Lunch and dinner (except mentioned)',
      'Personal expenses',
      'Tips and gratuities'
    ],
    accommodations: [
      'Swiss-Belhotel Tuban or similar',
      'Grand Ixora Kuta Resort or similar',
      'Kuta Beach Club or similar'
    ],
    accommodationNote: '*Beachfront hotels subject to availability. Similar category accommodation will be provided.'
  },
  {
    id: 12,
    title: 'Ubud Cultural Tour - 4D/3N',
    nights: '4D/3N',
    strikePrice: 33999,
    price: 27999,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
    tags: ['Culture', 'Temples', 'Budget'],
    overview: 'Immerse yourself in Bali\'s rich culture! Explore ancient temples, traditional villages, rice terraces, and art markets. Perfect for culture enthusiasts and budget travelers seeking authentic Balinese experiences.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival | Transfer to Ubud',
        description: 'Airport pickup and scenic drive to Ubud.\n\nCheck-in to hotel in cultural heart of Bali.\n\nEvening walk through Ubud market.'
      },
      {
        day: 2,
        title: 'Temples & Rice Terraces',
        description: 'Visit Tirta Empul holy water temple.\n\nTegalalang Rice Terraces with jungle swing.\n\nCoffee plantation visit with tasting.'
      },
      {
        day: 3,
        title: 'Ubud Cultural Tour',
        description: 'Ubud Palace and art galleries.\n\nSacred Monkey Forest.\n\nTraditional Barong dance performance.\n\nArt and craft shopping.'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Morning yoga session (optional).\n\nBreakfast and checkout.\n\nTransfer to airport.'
      }
    ],
    inclusions: [
      '3 Nights Ubud accommodation',
      'Daily breakfast',
      'Airport transfers',
      'Temple entrance fees',
      'Rice terraces tour',
      'Monkey Forest entry',
      'Cultural dance performance',
      'All tours with guide',
      'AC vehicle transfers'
    ],
    exclusions: [
      'International airfare',
      'Visa fees',
      'Insurance',
      'Meals not mentioned',
      'Shopping expenses',
      'Optional yoga classes'
    ],
    accommodations: [
      'Ubud Raya Hotel or similar',
      'Komaneka Bisma or similar',
      'Puri Garden Hotel or similar'
    ],
    accommodationNote: '*Ubud area hotels with cultural ambiance guaranteed.'
  },
  {
    id: 13,
    title: 'Bali Adventure - 6D/5N',
    nights: '6D/5N',
    strikePrice: 44999,
    price: 38999,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    tags: ['Adventure', 'Water Sports', 'Trekking'],
    overview: 'For thrill-seekers and adventure lovers! White water rafting, volcano trekking, ATV rides, snorkeling, and more. Experience Bali\'s adventurous side with exciting activities and stunning natural beauty.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival | Welcome',
        description: 'Airport transfer to hotel.\n\nBriefing about adventure activities.\n\nRelax and prepare for adventures ahead.'
      },
      {
        day: 2,
        title: 'White Water Rafting',
        description: 'Full-day Ayung River rafting adventure through jungle and rice paddies.\n\nLunch by the river.\n\nEvening free.'
      },
      {
        day: 3,
        title: 'Mount Batur Sunrise Trek',
        description: 'Early morning pickup for sunrise trek (2am start).\n\nBreakfast at summit.\n\nReturn to hotel and rest.\n\nEvening at leisure.'
      },
      {
        day: 4,
        title: 'ATV Ride | Waterfall',
        description: 'Morning ATV ride through plantations and villages.\n\nAfternoon visit to Tegenungan Waterfall.\n\nSwimming and photo opportunities.'
      },
      {
        day: 5,
        title: 'Snorkeling | Water Sports',
        description: 'Morning snorkeling at Blue Lagoon.\n\nAfternoon water sports package.\n\nBeach BBQ dinner.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Breakfast and relaxation.\n\nCheckout and airport transfer.'
      }
    ],
    inclusions: [
      '5 Nights accommodation',
      'Daily breakfast',
      'Airport transfers',
      'White water rafting with equipment',
      'Mount Batur trek with guide',
      'ATV ride with equipment',
      'Snorkeling equipment',
      'Water sports package',
      'All entry fees',
      'Safety equipment for all activities'
    ],
    exclusions: [
      'Flights',
      'Visa',
      'Insurance (highly recommended)',
      'Meals except breakfast',
      'Personal expenses',
      'Photos and videos'
    ],
    accommodations: [
      'Swiss-Belhotel Rainforest or similar',
      'Grand Ixora Kuta Resort or similar',
      'Bali Dynasty Resort or similar'
    ],
    accommodationNote: '*Comfortable hotels near activity locations. Adventure insurance recommended.'
  },
  {
    id: 14,
    title: 'Bali Luxury Retreat - 7D/6N',
    nights: '7D/6N',
    strikePrice: 62999,
    price: 52999,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    tags: ['Luxury', 'Spa', 'Honeymoon'],
    overview: 'Ultimate luxury and romance in Bali! Stay in premium resorts with private pools, enjoy couples spa treatments, fine dining, and exclusive experiences. Perfect for honeymooners and luxury travelers.',
    itinerary: [
      {
        day: 1,
        title: 'Luxury Arrival',
        description: 'VIP airport reception and premium transfer.\n\nCheck-in to luxury resort with welcome drinks.\n\nCandlelight dinner by the pool.'
      },
      {
        day: 2,
        title: 'Couples Spa Day',
        description: 'Morning relaxation at private villa.\n\nAfternoon couples Balinese spa treatment.\n\nEvening sunset cocktails.'
      },
      {
        day: 3,
        title: 'Private Yacht | Snorkeling',
        description: 'Private yacht charter to Nusa Penida.\n\nSnorkeling at pristine locations.\n\nGourmet lunch on board.\n\nReturn at sunset.'
      },
      {
        day: 4,
        title: 'Ubud Luxury Tour',
        description: 'Private tour of Ubud highlights.\n\nLunch at fine dining restaurant.\n\nPersonal shopper at art markets.\n\nTraditional dance performance.'
      },
      {
        day: 5,
        title: 'Beach Club Experience',
        description: 'Day at exclusive beach club.\n\nCabana rental and butler service.\n\nGourmet beachside dining.'
      },
      {
        day: 6,
        title: 'Romantic Sunset Dinner',
        description: 'Day at leisure - spa or beach.\n\nEvening private beachside dinner with traditional music.'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Leisurely breakfast. Late checkout.\n\nLuxury airport transfer.'
      }
    ],
    inclusions: [
      '6 Nights luxury resort accommodation',
      'Daily gourmet breakfast',
      'VIP airport transfers',
      'Couples spa treatment (2 sessions)',
      'Private yacht charter',
      'Private Ubud tour',
      'Beach club day pass',
      'Romantic beachside dinner',
      '2 fine dining experiences',
      'Welcome amenities and honeymoon setup'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Insurance',
      'Additional spa treatments',
      'Alcoholic beverages',
      'Personal shopping'
    ],
    accommodations: [
      'The St. Regis Bali Resort or similar',
      'AYANA Resort Bali or similar',
      'Mulia Resort Nusa Dua or similar',
      'Samabe Bali Suites & Villas or similar'
    ],
    accommodationNote: '*5-star luxury resorts with private pool villas. Honeymoon packages include special amenities.'
  },
  {
    id: 15,
    title: 'Bali Complete - 8D/7N',
    nights: '8D/7N',
    strikePrice: 54999,
    price: 45999,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    tags: ['Complete Tour', 'Best Value', 'Family'],
    overview: 'Experience everything Bali has to offer! Beaches, culture, adventure, temples, and nature. This comprehensive tour covers all major attractions and activities. Perfect for families and first-time visitors.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival | Beach Time',
        description: 'Airport transfer to hotel.\n\nCheck-in and freshen up.\n\nEvening beach walk and welcome dinner.'
      },
      {
        day: 2,
        title: 'Kuta & Seminyak',
        description: 'Beach activities and shopping at Kuta.\n\nAfternoon at Seminyak boutiques.\n\nSunset at beach club.'
      },
      {
        day: 3,
        title: 'Ubud Cultural Day',
        description: 'Full day Ubud tour - temples, rice terraces, monkey forest.\n\nTraditional lunch.\n\nBarong dance performance.'
      },
      {
        day: 4,
        title: 'Water Sports & Temple',
        description: 'Morning water sports at Tanjung Benoa.\n\nAfternoon Uluwatu Temple.\n\nKecak dance at sunset.'
      },
      {
        day: 5,
        title: 'Nusa Penida Island',
        description: 'Day trip to Nusa Penida.\n\nVisit Kelingking Beach, Angel Billabong, Broken Beach.\n\nSnorkeling session.'
      },
      {
        day: 6,
        title: 'North Bali Tour',
        description: 'Visit Tanah Lot Temple.\n\nJatiluwih Rice Terraces (UNESCO site).\n\nUlun Danu Temple.\n\nGit Git Waterfall.'
      },
      {
        day: 7,
        title: 'Leisure & Shopping',
        description: 'Morning spa treatment.\n\nAfternoon shopping for souvenirs.\n\nFarewell dinner with cultural show.'
      },
      {
        day: 8,
        title: 'Departure',
        description: 'Breakfast and last-minute shopping.\n\nCheckout and airport transfer.'
      }
    ],
    inclusions: [
      '7 Nights accommodation',
      'Daily breakfast',
      'Airport transfers',
      'All tours as per itinerary',
      'Water sports package',
      'Nusa Penida day trip with boat',
      'Temple entrance fees',
      'Cultural performances (2)',
      'Spa treatment (1 session)',
      'All transfers in AC vehicle',
      'English-speaking guides'
    ],
    exclusions: [
      'International flights',
      'Visa on arrival fee',
      'Travel insurance',
      'Lunch and dinner (except mentioned)',
      'Personal expenses',
      'Additional activities'
    ],
    accommodations: [
      'Swiss-Belhotel Tuban or similar',
      'Grand Ixora Kuta Resort or similar',
      'Bali Dynasty Resort or similar'
    ],
    accommodationNote: '*Well-located hotels for easy access to all attractions. Family rooms available.'
  },
  {
    id: 26,
    title: 'Bali Honeymoon Special - 5D/4N',
    nights: '4N/5D',
    strikePrice: 48999,
    price: 42999,
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80',
    tags: ['Honeymoon', 'Romantic', 'Premium'],
    overview: 'Celebrate your love in paradise! Romantic experiences, private dinners, couple activities, and luxurious accommodations. Create unforgettable memories in Bali\'s most romantic settings.',
    itinerary: [
      {
        day: 1,
        title: 'Romantic Arrival',
        description: 'Airport reception with flower garlands.\n\nPrivate transfer to resort.\n\nHoneymoon room setup with decorations.\n\nCandlelight dinner.'
      },
      {
        day: 2,
        title: 'Couples Spa & Beach',
        description: 'Morning couples spa treatment.\n\nAfternoon private beach time.\n\nSunset cocktails.\n\nRomantic dinner at beachside restaurant.'
      },
      {
        day: 3,
        title: 'Romantic Ubud',
        description: 'Private tour to Tegalalang Rice Terraces.\n\nJungle swing experience for two.\n\nLunch at romantic restaurant with valley view.\n\nEvening back to resort.'
      },
      {
        day: 4,
        title: 'Beach Activities | Sunset Cruise',
        description: 'Morning water activities.\n\nAfternoon relaxation.\n\nEvening private sunset cruise with dinner on boat.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Leisurely breakfast.\n\nCouple photo shoot (optional).\n\nCheckout and airport transfer.'
      }
    ],
    inclusions: [
      '4 Nights honeymoon suite',
      'Daily breakfast in bed option',
      'Airport transfers',
      'Couples spa treatment (2 sessions)',
      'Private Ubud tour',
      'Romantic dinners (3)',
      'Sunset cruise with dinner',
      'Honeymoon room decoration',
      'Flower bath setup',
      'Welcome champagne'
    ],
    exclusions: [
      'Flights',
      'Visa',
      'Insurance',
      'Couple photo shoot package',
      'Additional spa treatments',
      'Alcoholic beverages'
    ],
    accommodations: [
      'AYANA Resort Bali or similar',
      'The Samaya Seminyak or similar',
      'Royal Santrian or similar'
    ],
    accommodationNote: '*Premium honeymoon suites with ocean views. Special honeymoon amenities included.'
  },
  {
    id: 27,
    title: 'Bali Family Package - 6D/5N',
    nights: '5N/6D',
    strikePrice: 41999,
    price: 36999,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
    tags: ['Family', 'Kid Friendly', 'Activities'],
    overview: 'Perfect family vacation in Bali! Kid-friendly activities, family resorts, safe adventures, and cultural experiences. Create wonderful family memories with activities suitable for all ages.',
    itinerary: [
      {
        day: 1,
        title: 'Family Arrival',
        description: 'Airport meet and greet.\n\nFamily-friendly hotel check-in.\n\nEvening by the pool.'
      },
      {
        day: 2,
        title: 'Bali Safari & Marine Park',
        description: 'Full day at Bali Safari Park.\n\nAnimal shows and rides.\n\nWater park access.\n\nLunch at park.'
      },
      {
        day: 3,
        title: 'Beach Fun & Water Sports',
        description: 'Morning at beach with calm waters.\n\nFamily-safe water sports.\n\nSandcastle building.\n\nBeach games.'
      },
      {
        day: 4,
        title: 'Ubud Family Tour',
        description: 'Visit Monkey Forest (kids love it!).\n\nRice terraces walk.\n\nTraditional Balinese cooking class for family.\n\nBarong dance show.'
      },
      {
        day: 5,
        title: 'Water Park | Shopping',
        description: 'Morning at Waterbom Bali (Asia\'s best water park).\n\nAfternoon souvenir shopping.\n\nFarewell dinner.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Breakfast and family photos.\n\nCheckout and airport transfer.'
      }
    ],
    inclusions: [
      '5 Nights family room accommodation',
      'Daily breakfast',
      'Airport transfers',
      'Bali Safari & Marine Park tickets',
      'Waterbom Park tickets',
      'Family-safe water sports',
      'Ubud family tour',
      'Cooking class',
      'Cultural show tickets',
      'All transfers in spacious vehicle'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Meals not mentioned',
      'Extra activities',
      'Personal expenses'
    ],
    accommodations: [
      'Grand Ixora Kuta Resort or similar',
      'Swiss-Belhotel Rainforest or similar',
      'Bali Dynasty Resort or similar'
    ],
    accommodationNote: '*Family-friendly hotels with kids pool and activities. Connecting rooms available.'
  },
  {
    id: 28,
    title: 'Bali Budget Tour Package - 4D/3N',
    nights: '3N/4D',
    strikePrice: 28999,
    price: 24999,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    tags: ['Budget', 'Backpacker', 'Beach'],
    overview: 'Explore Bali on a budget! Affordable accommodation, essential tours, and authentic experiences without breaking the bank. Perfect for backpackers and budget-conscious travelers.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival | Kuta Beach',
        description: 'Shared airport transfer to budget hotel in Kuta.\n\nCheck-in and beach exploration.\n\nEvening at Kuta Beach sunset.'
      },
      {
        day: 2,
        title: 'Ubud Day Tour',
        description: 'Shared tour to Ubud.\n\nVisit temples, rice terraces, and markets.\n\nLocal lunch included.\n\nReturn to hotel.'
      },
      {
        day: 3,
        title: 'Beach & Temple',
        description: 'Morning beach time.\n\nAfternoon visit to Tanah Lot Temple.\n\nSunset viewing.\n\nLocal dinner.'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Morning shopping at local markets.\n\nCheckout and shared airport transfer.'
      }
    ],
    inclusions: [
      '3 Nights budget hotel',
      'Daily breakfast',
      'Shared airport transfers',
      'Ubud day tour (shared)',
      'Tanah Lot tour (shared)',
      'Temple entrance fees',
      'Basic travel insurance'
    ],
    exclusions: [
      'Flights',
      'Visa',
      'Lunch and dinner (except 1 local lunch)',
      'Water sports',
      'Optional activities',
      'Personal expenses'
    ],
    accommodations: [
      'Kuta Central Park Hotel or similar',
      'Ozz Hotel Kuta or similar',
      'Grand Kuta Hotel or similar'
    ],
    accommodationNote: '*Clean budget hotels near beach. Dorm rooms also available for solo travelers.'
  },
  {
    id: 29,
    title: 'Bali Premium Experience - 9D/8N',
    nights: '8N/9D',
    strikePrice: 68999,
    price: 58999,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    tags: ['Premium', 'Luxury', 'All Inclusive'],
    overview: 'The ultimate premium Bali experience! Luxury accommodations, exclusive tours, fine dining, and VIP treatment. Explore Bali in style with this all-inclusive premium package.',
    itinerary: [
      {
        day: 1,
        title: 'Premium Arrival',
        description: 'VIP fast-track immigration.\n\nLuxury transfer to 5-star resort.\n\nWelcome spa treatment.\n\nGourmet dinner.'
      },
      {
        day: 2,
        title: 'Luxury Beach Day',
        description: 'Private beach cabana.\n\nWater sports with instructor.\n\nBeachside gourmet lunch.\n\nSunset champagne.'
      },
      {
        day: 3,
        title: 'Private Ubud Tour',
        description: 'Private guided Ubud exploration.\n\nLunch at award-winning restaurant.\n\nPersonal shopping assistant.\n\nTraditional dance performance.'
      },
      {
        day: 4,
        title: 'Nusa Penida Luxury Trip',
        description: 'Private speedboat to Nusa Penida.\n\nExclusive beach access.\n\nGourmet picnic lunch.\n\nReturn at sunset.'
      },
      {
        day: 5,
        title: 'Wellness Day',
        description: 'Morning yoga session.\n\nFull-day spa package.\n\nHealthy gourmet meals.\n\nMeditation at sunset.'
      },
      {
        day: 6,
        title: 'Cultural Immersion',
        description: 'Private temple tour with expert guide.\n\nTraditional Balinese ceremony participation.\n\nCooking class with chef.\n\nCultural dinner show.'
      },
      {
        day: 7,
        title: 'Adventure Premium',
        description: 'Private sunrise Mount Batur trek.\n\nBreakfast at summit.\n\nAfternoon spa recovery.\n\nEvening at leisure.'
      },
      {
        day: 8,
        title: 'Leisure & Shopping',
        description: 'Day free for luxury shopping.\n\nPersonal shopper available.\n\nFarewell fine dining experience.'
      },
      {
        day: 9,
        title: 'Departure',
        description: 'Late checkout.\n\nLuxury airport transfer with VIP lounge access.'
      }
    ],
    inclusions: [
      '8 Nights 5-star luxury resort',
      'All meals (gourmet breakfast, lunch, dinner)',
      'VIP airport transfers',
      'Private tours with guide',
      'Luxury spa treatments (5 sessions)',
      'Private Nusa Penida trip',
      'Mount Batur trek',
      'All activities and entrance fees',
      'Personal concierge service',
      'Premium beverages',
      'Welcome amenities'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Premium insurance',
      'Alcoholic beverages (except welcome drinks)',
      'Personal shopping',
      'Additional spa treatments'
    ],
    accommodations: [
      'The St. Regis Bali Resort or similar',
      'Four Seasons Jimbaran Bay or similar',
      'Bulgari Resort Bali or similar'
    ],
    accommodationNote: '*Ultra-luxury 5-star resorts with butler service. Villa upgrades available.'
  },
  {
    id: 30,
    title: 'Bali Explorer Package - 10D/9N',
    nights: '9N/10D',
    strikePrice: 72999,
    price: 62999,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    tags: ['Extended Stay', 'Complete', 'Adventure'],
    overview: 'The most comprehensive Bali tour! Explore every corner of the island - beaches, mountains, temples, villages, islands. Extended stay for deep cultural immersion and complete exploration.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival | South Bali',
        description: 'Airport transfer.\n\nCheck-in to beach hotel.\n\nOrientation and welcome dinner.'
      },
      {
        day: 2,
        title: 'South Bali Exploration',
        description: 'Uluwatu Temple.\n\nJimbaran Beach.\n\nSeafood dinner by the beach.\n\nKecak Dance.'
      },
      {
        day: 3,
        title: 'Nusa Penida Day Trip',
        description: 'Full day island hopping.\n\nKelingking Beach, Angel Billabong.\n\nSnorkeling.\n\nReturn evening.'
      },
      {
        day: 4,
        title: 'Transfer to Ubud',
        description: 'Morning checkout.\n\nScenic drive to Ubud via Tanah Lot.\n\nCheck-in to Ubud hotel.\n\nEvening market walk.'
      },
      {
        day: 5,
        title: 'Ubud Cultural Deep Dive',
        description: 'Temple tour.\n\nRice terraces.\n\nMonkey Forest.\n\nTraditional arts and crafts.\n\nCooking class.'
      },
      {
        day: 6,
        title: 'Mount Batur Sunrise',
        description: 'Early morning trek.\n\nSunrise breakfast.\n\nHot springs visit.\n\nAfternoon rest.\n\nEvening massage.'
      },
      {
        day: 7,
        title: 'North Bali Adventure',
        description: 'Drive to north coast.\n\nLovina dolphins.\n\nGit Git Waterfall.\n\nUlun Danu Temple.\n\nReturn to Ubud.'
      },
      {
        day: 8,
        title: 'East Bali Exploration',
        description: 'Tirta Gangga Water Palace.\n\nLempuyang Temple (Gates of Heaven).\n\nVirgin beach.\n\nTraditional village visit.'
      },
      {
        day: 9,
        title: 'Transfer to Beach | Relaxation',
        description: 'Morning checkout from Ubud.\n\nTransfer to beach resort.\n\nAfternoon spa and beach.\n\nFarewell dinner.'
      },
      {
        day: 10,
        title: 'Departure',
        description: 'Final breakfast.\n\nLast-minute shopping.\n\nAirport transfer with wonderful memories.'
      }
    ],
    inclusions: [
      '9 Nights accommodation (split between locations)',
      'Daily breakfast',
      'All transfers',
      'All tours as per itinerary',
      'Nusa Penida day trip with boat',
      'Mount Batur trek with guide',
      'All temple entrance fees',
      'Cultural activities',
      'Spa treatment (2 sessions)',
      'Cooking class',
      'English-speaking guides',
      '2 traditional dinners'
    ],
    exclusions: [
      'International flights',
      'Visa fees',
      'Insurance',
      'Lunch and dinners (except 2)',
      'Optional activities',
      'Personal expenses',
      'Tips'
    ],
    accommodations: [
      'South Bali: Swiss-Belhotel Tuban or similar (4 nights)',
      'Ubud: Komaneka Bisma or similar (3 nights)',
      'Beach resort: Grand Ixora or similar (2 nights)'
    ],
    accommodationNote: '*Multi-location stay for complete Bali experience. Hotels in prime locations for each area.'
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
    tags: ['Beach', 'Island Hopping', 'Popular'],
    overview: 'Experience tropical paradise in Thailand! Crystal-clear waters, white sand beaches, island hopping adventures, and vibrant nightlife. Perfect blend of relaxation and excitement in Phuket and Phi Phi Islands.',
    itinerary: [
      { day: 1, title: 'Arrival in Phuket', description: 'Airport transfer to beach resort.\n\nCheck-in and relax.\n\nEvening at Patong Beach.' },
      { day: 2, title: 'Phi Phi Islands Day Trip', description: 'Speedboat to Phi Phi Islands.\n\nMaya Bay, Viking Cave, snorkeling.\n\nLunch on island.\n\nReturn evening.' },
      { day: 3, title: 'James Bond Island Tour', description: 'Phang Nga Bay tour.\n\nKayaking through caves.\n\nVisit James Bond Island.\n\nSeafood lunch.' },
      { day: 4, title: 'Beach Day & Shopping', description: 'Morning at beach.\n\nAfternoon shopping at markets.\n\nOptional Simon Cabaret show.' },
      { day: 5, title: 'Departure', description: 'Breakfast.\n\nFree time until airport transfer.' }
    ],
    inclusions: ['4 Nights beach resort', 'Daily breakfast', 'Airport transfers', 'Phi Phi Islands tour', 'James Bond Island tour', 'Snorkeling equipment', 'All boat transfers', 'English guide'],
    exclusions: ['Flights', 'Thailand visa', 'Insurance', 'Lunches and dinners', 'Optional shows', 'Personal expenses'],
    accommodations: ['Novotel Phuket Resort or similar', 'Deevana Plaza Phuket or similar', 'Andakira Hotel Patong or similar'],
    accommodationNote: '*Beachfront or near-beach hotels. Sea-view rooms on request.'
  },
  {
    id: 17,
    title: 'Bangkok Cultural Tour - 4D/3N',
    nights: '4D/3N',
    strikePrice: 36999,
    price: 30999,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    tags: ['Culture', 'Temples', 'Street Food'],
    overview: 'Discover the heart of Thailand! Explore ancient temples, floating markets, vibrant street food scene, and Thai culture. Experience Bangkok\'s perfect mix of tradition and modernity.',
    itinerary: [
      { day: 1, title: 'Arrival | Temple Tour', description: 'Airport pickup.\n\nCheck-in.\n\nAfternoon Grand Palace and Wat Phra Kaew.\n\nEvening at Khao San Road.' },
      { day: 2, title: 'Floating Market & River Cruise', description: 'Damnoen Saduak Floating Market.\n\nRailway market.\n\nAfternoon free.\n\nEvening Chao Phraya dinner cruise.' },
      { day: 3, title: 'Ayutthaya Day Trip', description: 'Full day ancient city tour.\n\nHistorical temples.\n\nThai lunch.\n\nReturn to Bangkok.' },
      { day: 4, title: 'Departure', description: 'Morning shopping at Chatuchak Market.\n\nAirport transfer.' }
    ],
    inclusions: ['3 Nights hotel', 'Daily breakfast', 'Transfers', 'Temple entrance fees', 'Floating market tour', 'Ayutthaya tour', 'Dinner cruise', 'Guide'],
    exclusions: ['Flights', 'Visa', 'Insurance', 'Meals not mentioned', 'Shopping', 'Tips'],
    accommodations: ['Ramada Plaza Bangkok or similar', 'Novotel Bangkok Sukhumvit or similar', 'Grand Mercure Bangkok or similar'],
    accommodationNote: '*Centrally located hotels near BTS stations.'
  },
  {
    id: 18,
    title: 'Thailand Adventure Package - 6D/5N',
    nights: '6D/5N',
    strikePrice: 47999,
    price: 41999,
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
    tags: ['Adventure', 'Scuba Diving', 'Nature'],
    overview: 'Adventure awaits in Thailand! Scuba diving, jungle trekking, elephant sanctuary, zip-lining, and island adventures. For thrill-seekers and nature lovers.',
    itinerary: [
      { day: 1, title: 'Arrival Chiang Mai', description: 'Airport transfer.\n\nHotel check-in.\n\nNight market exploration.' },
      { day: 2, title: 'Elephant Sanctuary', description: 'Full day ethical elephant experience.\n\nFeed, bath, and learn.\n\nJungle trek.\n\nWaterfall visit.' },
      { day: 3, title: 'Zip-lining Adventure', description: 'Longest zip-line in Thailand.\n\nCanopy walks.\n\nAbseil experience.\n\nJungle lunch.' },
      { day: 4, title: 'Transfer to Krabi', description: 'Flight to Krabi.\n\nBeach resort check-in.\n\nEvening at Ao Nang Beach.' },
      { day: 5, title: 'Scuba Diving / Snorkeling', description: 'Full day diving at Phi Phi or Koh Lanta.\n\nMultiple dive sites.\n\nLunch on boat.' },
      { day: 6, title: 'Departure', description: 'Breakfast.\n\nBeach time.\n\nAirport transfer.' }
    ],
    inclusions: ['5 Nights hotels (2N Chiang Mai + 3N Krabi)', 'Daily breakfast', 'All transfers including flight', 'Elephant sanctuary', 'Zip-lining', 'Scuba diving/snorkeling', 'All equipment', 'Guides'],
    exclusions: ['International flights', 'Visa', 'Insurance', 'Meals except breakfast', 'Optional activities', 'Tips'],
    accommodations: ['Chiang Mai: Duangtawan Hotel or similar', 'Krabi: Deevana Plaza Krabi or similar'],
    accommodationNote: '*Adventure insurance recommended. Dive certification not required for intro dives.'
  },
  {
    id: 19,
    title: 'Thailand Luxury Retreat - 7D/6N',
    nights: '7D/6N',
    strikePrice: 65999,
    price: 55999,
    image: 'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?auto=format&fit=crop&w=800&q=80',
    tags: ['Luxury', 'Spa', 'Premium'],
    overview: 'Indulge in Thai luxury! 5-star resorts, world-class spas, private islands, gourmet dining, and VIP experiences. Ultimate relaxation and pampering in Thailand\'s finest destinations.',
    itinerary: [
      { day: 1, title: 'Luxury Arrival Bangkok', description: 'VIP airport meet & greet.\n\nLimousine transfer to 5-star hotel.\n\nWelcome spa treatment.\n\nRooftop fine dining.' },
      { day: 2, title: 'Bangkok Premium Tour', description: 'Private temple tour.\n\nLunch at Michelin-star restaurant.\n\nAfternoon spa.\n\nEvening luxury dinner cruise.' },
      { day: 3, title: 'Transfer to Phuket', description: 'Private flight to Phuket.\n\nLuxury resort check-in.\n\nPrivate pool villa.\n\nSunset cocktails.' },
      { day: 4, title: 'Private Yacht Charter', description: 'Full-day private yacht.\n\nPhi Phi Islands.\n\nGourmet lunch on board.\n\nSnorkeling pristine spots.' },
      { day: 5, title: 'Spa & Wellness Day', description: 'Morning yoga.\n\nFull-day spa package.\n\nHealthy gourmet meals.\n\nBeach meditation.' },
      { day: 6, title: 'Beach Club & Fine Dining', description: 'Exclusive beach club access.\n\nCabana service.\n\nEvening fine dining experience.' },
      { day: 7, title: 'Departure', description: 'Late checkout.\n\nVIP airport transfer.' }
    ],
    inclusions: ['6 Nights 5-star luxury (3N Bangkok + 3N Phuket)', 'Daily gourmet breakfast', 'VIP transfers', 'Private yacht charter', 'Spa treatments (4 sessions)', 'Fine dining (5 meals)', 'Private tours', 'Domestic flight', 'Butler service'],
    exclusions: ['International flights', 'Visa', 'Premium insurance', 'Alcoholic beverages', 'Personal shopping', 'Additional spa'],
    accommodations: ['Bangkok: Mandarin Oriental or similar', 'Phuket: Sri Panwa or Trisara or similar'],
    accommodationNote: '*Ultra-luxury 5-star properties. Pool villa upgrades available.'
  },
  {
    id: 20,
    title: 'Thailand Complete Tour - 8D/7N',
    nights: '8D/7N',
    strikePrice: 57999,
    price: 48999,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    tags: ['Complete Tour', 'Best Value', 'Family'],
    overview: 'Experience all of Thailand! Bangkok temples, Chiang Mai culture, Phuket beaches, and Ayutthaya history. Complete package covering Thailand\'s highlights. Best value for comprehensive exploration.',
    itinerary: [
      { day: 1, title: 'Bangkok Arrival', description: 'Airport transfer.\n\nHotel check-in.\n\nEvening at Asiatique market.' },
      { day: 2, title: 'Bangkok Temples', description: 'Grand Palace, Wat Pho, Wat Arun.\n\nChao Phraya boat ride.\n\nEvening street food tour.' },
      { day: 3, title: 'Ayutthaya & Transfer', description: 'Day trip to Ayutthaya.\n\nEvening flight to Chiang Mai.' },
      { day: 4, title: 'Chiang Mai Culture', description: 'Temple tour.\n\nDoi Suthep.\n\nNight bazaar.' },
      { day: 5, title: 'Elephant & Nature', description: 'Elephant sanctuary.\n\nWaterfall visit.\n\nEvening transfer to Phuket.' },
      { day: 6, title: 'Phuket Beach', description: 'Beach relaxation.\n\nWater sports.\n\nPatong nightlife.' },
      { day: 7, title: 'Island Hopping', description: 'Phi Phi Islands tour.\n\nSnorkeling.\n\nBeach BBQ.' },
      { day: 8, title: 'Departure', description: 'Last-minute shopping.\n\nAirport transfer.' }
    ],
    inclusions: ['7 Nights hotels (2N Bangkok + 2N Chiang Mai + 3N Phuket)', 'Daily breakfast', 'All transfers', 'Domestic flights (2)', 'All tours', 'Entrance fees', 'Island tours', 'Guides'],
    exclusions: ['International flights', 'Visa', 'Insurance', 'Lunches and dinners', 'Optional activities', 'Tips'],
    accommodations: ['Bangkok: Novotel Sukhumvit', 'Chiang Mai: Duangtawan Hotel', 'Phuket: Deevana Plaza'],
    accommodationNote: '*Well-located 3-4 star hotels. Family rooms available.'
  },
  {
    id: 36,
    title: 'Thailand Honeymoon Special - 5D/4N',
    nights: '5D/4N',
    strikePrice: 51999,
    price: 45999,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    tags: ['Honeymoon', 'Romantic', 'Beach'],
    overview: 'Romance in paradise! Honeymoon suite, candlelight dinners, couple spa, private beach experiences, and romantic island tours. Create magical memories in Thailand.',
    itinerary: [
      { day: 1, title: 'Romantic Arrival', description: 'Flower garland welcome.\n\nHoneymoon suite check-in with decoration.\n\nCandlelight beach dinner.' },
      { day: 2, title: 'Couples Spa Day', description: 'Couples massage and spa.\n\nPrivate pool villa.\n\nSunset champagne.' },
      { day: 3, title: 'Private Island Tour', description: 'Private longtail boat.\n\nSecluded beaches.\n\nRomantic picnic lunch.\n\nSnorkeling for two.' },
      { day: 4, title: 'Romantic Experiences', description: 'Morning at leisure.\n\nAfternoon couple activities.\n\nSunset dinner cruise.' },
      { day: 5, title: 'Departure', description: 'Couple photo shoot.\n\nBreakfast.\n\nCheckout and transfer.' }
    ],
    inclusions: ['4 Nights honeymoon suite', 'Breakfast in bed option', 'Transfers', 'Couples spa (2 sessions)', 'Romantic dinners (3)', 'Private island tour', 'Honeymoon decorations', 'Flower bath', 'Champagne'],
    exclusions: ['Flights', 'Visa', 'Insurance', 'Photo shoot package', 'Extra spa', 'Shopping'],
    accommodations: ['The Slate Phuket or similar', 'Anantara Mai Khao or similar', 'SAii Lagoon Phuket or similar'],
    accommodationNote: '*Honeymoon pool suites with ocean view. Romance package included.'
  },
  {
    id: 37,
    title: 'Thailand Family Package - 6D/5N',
    nights: '6D/5N',
    strikePrice: 44999,
    price: 39999,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    tags: ['Family', 'Kid Friendly', 'Fun'],
    overview: 'Perfect family adventure in Thailand! Kid-friendly activities, safe beaches, fun parks, cultural experiences, and family resorts. Activities for all ages.',
    itinerary: [
      { day: 1, title: 'Family Arrival', description: 'Airport welcome.\n\nFamily room check-in.\n\nKids pool time.' },
      { day: 2, title: 'Safari World Bangkok', description: 'Full day at Safari World.\n\nAnimal shows.\n\nMarine park.\n\nLunch at park.' },
      { day: 3, title: 'Transfer to Phuket', description: 'Flight to Phuket.\n\nBeach resort check-in.\n\nEvening beach walk.' },
      { day: 4, title: 'Island Adventure', description: 'Family-friendly island tour.\n\nSnorkeling in calm waters.\n\nBeach games.\n\nBBQ lunch.' },
      { day: 5, title: 'Aquarium & Splash Jungle', description: 'Morning at Phuket Aquarium.\n\nAfternoon at water park.\n\nEvening at hotel.' },
      { day: 6, title: 'Departure', description: 'Beach morning.\n\nCheckout and airport transfer.' }
    ],
    inclusions: ['5 Nights family rooms', 'Daily breakfast', 'Transfers', 'Safari World tickets', 'Island tour', 'Water park tickets', 'Aquarium entry', 'Kid-friendly guides', 'Domestic flight'],
    exclusions: ['International flights', 'Visa', 'Insurance', 'Meals not mentioned', 'Extra activities', 'Tips'],
    accommodations: ['Bangkok: Novotel Bangkok Silom', 'Phuket: Novotel Phuket Resort'],
    accommodationNote: '*Family-friendly hotels with kids club. Connecting rooms available.'
  },
  {
    id: 38,
    title: 'Thailand Budget Tour Package - 4D/3N',
    nights: '4D/3N',
    strikePrice: 31999,
    price: 27999,
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
    tags: ['Budget', 'Backpacker', 'City Tour'],
    overview: 'Explore Thailand on a budget! Affordable accommodation, essential tours, street food experiences, and backpacker-friendly activities. Great value for money.',
    itinerary: [
      { day: 1, title: 'Bangkok Arrival', description: 'Shared airport transfer.\n\nBudget hotel check-in.\n\nKhao San Road exploration.' },
      { day: 2, title: 'Temple Tour', description: 'Shared temple tour.\n\nGrand Palace, Wat Pho.\n\nStreet food dinner.' },
      { day: 3, title: 'Floating Market', description: 'Floating market visit.\n\nLocal market shopping.\n\nEvening at Chatuchak.' },
      { day: 4, title: 'Departure', description: 'Morning free.\n\nShared airport transfer.' }
    ],
    inclusions: ['3 Nights budget hotel', 'Daily breakfast', 'Shared transfers', 'Temple tour', 'Floating market', 'Basic insurance'],
    exclusions: ['Flights', 'Visa', 'Meals except breakfast', 'Optional activities', 'Tips'],
    accommodations: ['Lub d Bangkok Silom or similar', 'NapPark Hostel or similar', 'The Yard Hostel or similar'],
    accommodationNote: '*Clean budget hotels/hostels. Dorm beds available for solo travelers.'
  },
  {
    id: 39,
    title: 'Thailand Premium Experience - 9D/8N',
    nights: '9D/8N',
    strikePrice: 71999,
    price: 61999,
    image: 'https://images.unsplash.com/photo-1563492065-1a5a6e0d8ea1?auto=format&fit=crop&w=800&q=80',
    tags: ['Premium', 'All Inclusive', 'Luxury'],
    overview: 'Ultimate Thailand luxury experience! Premium hotels, exclusive tours, fine dining, spa treatments, and VIP services across Bangkok, Chiang Mai, and Islands. All-inclusive premium package.',
    itinerary: [
      { day: 1, title: 'VIP Bangkok Arrival', description: 'Fast-track immigration.\n\nLimousine transfer.\n\n5-star check-in.\n\nWelcome dinner.' },
      { day: 2, title: 'Bangkok Premium', description: 'Private temple tour.\n\nMichelin lunch.\n\nSpa treatment.\n\nRooftop dinner.' },
      { day: 3, title: 'Luxury Chiang Mai', description: 'Private flight.\n\nLuxury resort.\n\nEvening at leisure.' },
      { day: 4, title: 'Premium Experiences', description: 'Private elephant sanctuary.\n\nGourmet lunch.\n\nSpa session.' },
      { day: 5, title: 'Transfer to Islands', description: 'Flight to Koh Samui.\n\nBeach villa.\n\nSunset cocktails.' },
      { day: 6, title: 'Private Yacht', description: 'Full-day private yacht.\n\nIsland hopping.\n\nGourmet lunch aboard.' },
      { day: 7, title: 'Wellness Day', description: 'Yoga and meditation.\n\nFull spa package.\n\nHealthy dining.' },
      { day: 8, title: 'Leisure & Dining', description: 'Beach club access.\n\nFarewell fine dining.' },
      { day: 9, title: 'VIP Departure', description: 'Late checkout.\n\nVIP airport transfer.' }
    ],
    inclusions: ['8 Nights 5-star luxury', 'All gourmet meals', 'VIP transfers', 'Domestic flights', 'Private tours', 'Spa (6 sessions)', 'Yacht charter', 'Butler service', 'All activities'],
    exclusions: ['International flights', 'Visa', 'Premium insurance', 'Alcoholic beverages', 'Shopping', 'Extra spa'],
    accommodations: ['Bangkok: Mandarin Oriental', 'Chiang Mai: Four Seasons', 'Koh Samui: Six Senses'],
    accommodationNote: '*Ultra-luxury properties. Villa and suite upgrades available.'
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
    tags: ['City Tour', 'Quick Trip', 'Budget'],
    overview: 'Quick weekend getaway to Singapore! Explore the Lion City\'s iconic attractions, vibrant streets, and diverse culture. Perfect for a short break packed with urban adventures.',
    itinerary: [
      { day: 1, title: 'Arrival | Marina Bay', description: 'Airport transfer to hotel.\n\nCheck-in and freshen up.\n\nEvening at Marina Bay Sands light show.' },
      { day: 2, title: 'City Tour | Sentosa', description: 'Morning city tour - Merlion, Chinatown, Little India.\n\nAfternoon at Sentosa Island.\n\nEvening at Clarke Quay.' },
      { day: 3, title: 'Departure', description: 'Morning shopping at Orchard Road.\n\nAirport transfer.' }
    ],
    inclusions: ['2 Nights hotel', 'Daily breakfast', 'Airport transfers', 'City tour', 'Sentosa basic entry', 'MRT day pass'],
    exclusions: ['Flights', 'Singapore visa', 'Insurance', 'Meals except breakfast', 'Attractions tickets', 'Shopping'],
    accommodations: ['Park Avenue Robertson or similar', 'Strand Hotel or similar', 'Hotel 81 Chinatown or similar'],
    accommodationNote: '*Central location hotels near MRT stations.'
  },
  {
    id: 22,
    title: 'Singapore Deluxe - 4D/3N',
    nights: '4D/3N',
    strikePrice: 38999,
    price: 32999,
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80',
    tags: ['Popular', 'Comfort', 'Sightseeing'],
    overview: 'Experience Singapore in comfort! Well-paced itinerary covering major attractions, comfortable accommodation, and authentic experiences. Great balance of sightseeing and leisure.',
    itinerary: [
      { day: 1, title: 'Arrival | Gardens by the Bay', description: 'Airport reception.\n\nHotel check-in.\n\nEvening at Gardens by the Bay with Supertree light show.' },
      { day: 2, title: 'Singapore City Tour', description: 'Full-day city tour covering Merlion, Marina Bay, Chinatown, Little India, Kampong Glam.\n\nEvening at Clarke Quay.' },
      { day: 3, title: 'Sentosa Island', description: 'Full day at Sentosa - Universal Studios or S.E.A. Aquarium.\n\nCable car ride.\n\nEvening Wings of Time show.' },
      { day: 4, title: 'Departure', description: 'Morning visit to Jewel Changi.\n\nShopping.\n\nAirport transfer.' }
    ],
    inclusions: ['3 Nights 3-star hotel', 'Daily breakfast', 'Transfers', 'City tour', 'Gardens by the Bay', 'Sentosa basic entry', 'Cable car', 'Wings of Time'],
    exclusions: ['Flights', 'Visa', 'Insurance', 'Universal Studios tickets', 'Meals except breakfast', 'Shopping'],
    accommodations: ['Fragrance Hotel Imperial or similar', 'Hotel Grand Pacific or similar', 'Berjaya Hotel or similar'],
    accommodationNote: '*Comfortable hotels with good connectivity.'
  },
  {
    id: 23,
    title: 'Singapore Family Fun - 5D/4N',
    nights: '5D/4N',
    strikePrice: 44999,
    price: 38999,
    image: 'https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=800&q=80',
    tags: ['Family', 'Theme Parks', 'Kid Friendly'],
    overview: 'Ultimate family fun in Singapore! Theme parks, zoo adventures, interactive museums, and kid-friendly attractions. Create wonderful family memories in the Lion City.',
    itinerary: [
      { day: 1, title: 'Arrival | Night Safari', description: 'Airport transfer.\n\nFamily room check-in.\n\nEvening Night Safari with tram ride.' },
      { day: 2, title: 'Universal Studios', description: 'Full day at Universal Studios Singapore.\n\nAll rides and shows.\n\nLunch at park.' },
      { day: 3, title: 'Singapore Zoo | River Wonders', description: 'Morning at Singapore Zoo.\n\nAfternoon River Wonders.\n\nAnimal shows for kids.' },
      { day: 4, title: 'Science Centre | Gardens', description: 'Morning at Science Centre.\n\nAfternoon Gardens by the Bay.\n\nChildren\'s Garden.\n\nSupertree light show.' },
      { day: 5, title: 'Departure', description: 'Morning at Jewel Changi Canopy Park.\n\nAirport transfer.' }
    ],
    inclusions: ['4 Nights family room', 'Daily breakfast', 'Transfers', 'Night Safari tickets', 'Universal Studios tickets', 'Zoo + River Wonders combo', 'Science Centre entry', 'Gardens by the Bay'],
    exclusions: ['Flights', 'Visa', 'Insurance', 'Meals except breakfast', 'Shopping', 'Extra activities'],
    accommodations: ['Fragrance Hotel Sapphire or similar', 'Village Hotel Albert Court or similar', 'Grand Park City Hall or similar'],
    accommodationNote: '*Family-friendly hotels. Family rooms and connecting rooms available.'
  },
  {
    id: 24,
    title: 'Singapore Luxury - 6D/5N',
    nights: '6D/5N',
    strikePrice: 54999,
    price: 48999,
    image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=800&q=80',
    tags: ['Luxury', 'Premium', 'Shopping'],
    overview: 'Experience Singapore in luxury! Stay at premium hotels, fine dining, exclusive shopping, and VIP experiences. Indulge in the finest the Lion City has to offer.',
    itinerary: [
      { day: 1, title: 'Luxury Arrival', description: 'Limousine airport transfer.\n\n5-star hotel check-in.\n\nWelcome spa treatment.\n\nFine dining at hotel.' },
      { day: 2, title: 'Private City Tour', description: 'Private guided tour.\n\nLunch at Michelin restaurant.\n\nAfternoon at Marina Bay Sands SkyPark.\n\nEvening rooftop bar experience.' },
      { day: 3, title: 'Shopping & Dining', description: 'Personal shopping at Orchard Road.\n\nLunch at ION Sky.\n\nAfternoon spa.\n\nEvening fine dining cruise.' },
      { day: 4, title: 'Luxury Sentosa', description: 'Private transfer to Sentosa.\n\nBeach club access.\n\nGourmet lunch.\n\nEvening return.' },
      { day: 5, title: 'Gardens & Wellness', description: 'Morning Gardens by the Bay VIP tour.\n\nAfternoon wellness spa.\n\nFarewell dinner.' },
      { day: 6, title: 'Departure', description: 'Late checkout.\n\nLast shopping.\n\nLimousine transfer.' }
    ],
    inclusions: ['5 Nights 5-star hotel', 'Daily gourmet breakfast', 'Limousine transfers', 'Private tours', 'Spa (3 sessions)', 'Fine dining (4 meals)', 'Personal shopper', 'VIP experiences'],
    exclusions: ['Flights', 'Visa', 'Premium insurance', 'Shopping expenses', 'Alcoholic beverages', 'Extra spa'],
    accommodations: ['Marina Bay Sands or similar', 'Raffles Hotel or similar', 'The Fullerton Hotel or similar'],
    accommodationNote: '*5-star luxury hotels. Suite upgrades available.'
  },
  {
    id: 25,
    title: 'Singapore Complete - 7D/6N',
    nights: '7D/6N',
    strikePrice: 49999,
    price: 44999,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    tags: ['Complete Tour', 'Best Value', 'Popular'],
    overview: 'Complete Singapore experience! All major attractions, neighborhoods, theme parks, and cultural sites. Comprehensive tour with best value covering everything Singapore offers.',
    itinerary: [
      { day: 1, title: 'Arrival | Marina Bay', description: 'Airport transfer.\n\nCheck-in.\n\nEvening Marina Bay area.' },
      { day: 2, title: 'Singapore City Tour', description: 'Full-day city tour - all major landmarks.\n\nEvening at Clarke Quay.' },
      { day: 3, title: 'Universal Studios', description: 'Full day at Universal Studios.\n\nEvening Wings of Time.' },
      { day: 4, title: 'Zoo & Night Safari', description: 'Morning Singapore Zoo.\n\nEvening Night Safari.' },
      { day: 5, title: 'Gardens & Shopping', description: 'Morning Gardens by the Bay.\n\nAfternoon Orchard Road shopping.\n\nEvening light show.' },
      { day: 6, title: 'Sentosa & Beaches', description: 'Sentosa beach activities.\n\nS.E.A. Aquarium.\n\nCable car ride.' },
      { day: 7, title: 'Departure', description: 'Jewel Changi visit.\n\nAirport transfer.' }
    ],
    inclusions: ['6 Nights hotel', 'Daily breakfast', 'All transfers', 'City tour', 'Universal Studios', 'Zoo + Night Safari', 'Gardens by the Bay', 'S.E.A. Aquarium', 'Wings of Time', 'Cable car'],
    exclusions: ['Flights', 'Visa', 'Insurance', 'Meals except breakfast', 'Shopping', 'Optional activities'],
    accommodations: ['Fragrance Hotel Imperial or similar', 'Grand Park City Hall or similar', 'Hotel Grand Pacific or similar'],
    accommodationNote: '*Well-located hotels for easy access to attractions.'
  },
  {
    id: 31,
    title: 'Singapore Honeymoon Special - 4D/3N',
    nights: '4D/3N',
    strikePrice: 42999,
    price: 36999,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    tags: ['Honeymoon', 'Romantic', 'Luxury'],
    overview: 'Romantic Singapore honeymoon! Luxury stays, romantic dinners, couple experiences, and city lights. Create magical memories in one of Asia\'s most romantic cities.',
    itinerary: [
      { day: 1, title: 'Romantic Arrival', description: 'Airport reception with flower bouquet.\n\nHoneymoon suite with decoration.\n\nRomantic dinner at SkyPark.' },
      { day: 2, title: 'Private City Tour', description: 'Private guided tour for couple.\n\nLunch at romantic restaurant.\n\nAfternoon spa couple treatment.\n\nEvening Singapore Flyer.' },
      { day: 3, title: 'Sentosa Romance', description: 'Private beach time.\n\nCable car ride.\n\nRomantic lunch.\n\nEvening dinner cruise.' },
      { day: 4, title: 'Departure', description: 'Couple breakfast.\n\nJewel Changi visit.\n\nAirport transfer.' }
    ],
    inclusions: ['3 Nights honeymoon suite', 'Daily breakfast', 'Transfers', 'Honeymoon decoration', 'Couple spa', 'Romantic dinners (2)', 'Private tour', 'Singapore Flyer', 'Champagne'],
    exclusions: ['Flights', 'Visa', 'Insurance', 'Extra dining', 'Shopping', 'Photos'],
    accommodations: ['Marina Bay Sands or similar', 'The Fullerton Bay Hotel or similar', 'Raffles Hotel or similar'],
    accommodationNote: '*Luxury honeymoon suites with city views. Romance package included.'
  },
  {
    id: 32,
    title: 'Singapore Business Package - 5D/4N',
    nights: '5D/4N',
    strikePrice: 47999,
    price: 41999,
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80',
    tags: ['Business', 'Meetings', 'Hotels'],
    overview: 'Perfect for business travelers! Business hotels, meeting facilities, airport proximity, and flexible schedule. Combine work with brief city exploration.',
    itinerary: [
      { day: 1, title: 'Business Arrival', description: 'Fast-track airport service.\n\nBusiness hotel check-in.\n\nEvening business dinner arrangement.' },
      { day: 2-3, title: 'Business Days', description: 'Meeting room facilities available.\n\nBusiness center access.\n\nFlexible meal timings.' },
      { day: 4, title: 'Leisure & Shopping', description: 'Half-day city tour.\n\nShopping at Orchard.\n\nEvening at leisure.' },
      { day: 5, title: 'Departure', description: 'Late checkout option.\n\nAirport transfer.' }
    ],
    inclusions: ['4 Nights business hotel', 'Daily breakfast', 'Airport transfers', 'Meeting room access', 'Business center', 'WiFi', 'Half-day city tour', 'Flexible services'],
    exclusions: ['Flights', 'Visa', 'Insurance', 'Business meals', 'Phone/fax charges', 'Shopping'],
    accommodations: ['Orchard Hotel Singapore or similar', 'Swissôtel The Stamford or similar', 'Carlton Hotel or similar'],
    accommodationNote: '*Business-friendly hotels with meeting facilities and CBD access.'
  },
  {
    id: 33,
    title: 'Singapore Budget Tour Package - 3D/2N',
    nights: '3D/2N',
    strikePrice: 28999,
    price: 23999,
    image: 'https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=800&q=80',
    tags: ['Budget', 'Backpacker', 'City Tour'],
    overview: 'Explore Singapore on a budget! Affordable stay, essential tours, hawker food experiences, and public transport. Great value for backpackers and budget travelers.',
    itinerary: [
      { day: 1, title: 'Budget Arrival', description: 'Public transport from airport.\n\nBudget hotel check-in.\n\nEvening at hawker center.' },
      { day: 2, title: 'Walking Tour', description: 'Self-guided walking tour.\n\nFree attractions - Merlion, Chinatown, Little India.\n\nHawker food lunch.' },
      { day: 3, title: 'Departure', description: 'Morning visit to free attractions.\n\nPublic transport to airport.' }
    ],
    inclusions: ['2 Nights budget hotel', 'Daily breakfast', 'MRT tourist pass', 'Walking tour map'],
    exclusions: ['Flights', 'Visa', 'Insurance', 'Meals except breakfast', 'Paid attractions', 'Shopping'],
    accommodations: ['Fragrance Hotel Bugis or similar', 'Hotel 81 or similar', 'Champion Hotel or similar'],
    accommodationNote: '*Clean budget hotels. Dorm beds available.'
  },
  {
    id: 34,
    title: 'Singapore Premium Experience - 8D/7N',
    nights: '8D/7N',
    strikePrice: 62999,
    price: 52999,
    image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=800&q=80',
    tags: ['Premium', 'All Inclusive', 'Luxury'],
    overview: 'Ultimate premium Singapore experience! All-inclusive luxury package with 5-star stays, fine dining, VIP experiences, and exclusive tours. The finest Singapore has to offer.',
    itinerary: [
      { day: 1, title: 'VIP Arrival', description: 'Fast-track immigration.\n\nLimousine transfer.\n\nLuxury suite.\n\nWelcome fine dining.' },
      { day: 2, title: 'Premium City Tour', description: 'Private luxury tour.\n\nMichelin lunch.\n\nSpa treatment.\n\nRooftop dinner.' },
      { day: 3, title: 'Yacht Experience', description: 'Private yacht charter.\n\nGourmet lunch aboard.\n\nIsland exploration.' },
      { day: 4, title: 'Shopping & Spa', description: 'Personal shopper service.\n\nFull spa package.\n\nFine dining.' },
      { day: 5, title: 'Premium Sentosa', description: 'Private island tour.\n\nBeach club VIP.\n\nGourmet dining.' },
      { day: 6, title: 'Cultural Premium', description: 'Private cultural experiences.\n\nExclusive dining.\n\nEvening show.' },
      { day: 7, title: 'Wellness & Leisure', description: 'Spa and wellness.\n\nLeisure time.\n\nFarewell dinner.' },
      { day: 8, title: 'VIP Departure', description: 'Late checkout.\n\nVIP lounge.\n\nLimousine transfer.' }
    ],
    inclusions: ['7 Nights ultra-luxury hotel', 'All gourmet meals', 'Limousine transfers', 'Private tours', 'Yacht charter', 'Spa (5 sessions)', 'Personal shopper', 'VIP experiences', 'All activities'],
    exclusions: ['Flights', 'Visa', 'Premium insurance', 'Alcoholic beverages', 'Shopping', 'Extra services'],
    accommodations: ['Marina Bay Sands Presidential Suite or similar', 'Raffles Hotel or similar', 'Capella Singapore or similar'],
    accommodationNote: '*Ultra-luxury properties. Presidential suite and villa options.'
  },
  {
    id: 35,
    title: 'Singapore Explorer Package - 9D/8N',
    nights: '9D/8N',
    strikePrice: 58999,
    price: 49999,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    tags: ['Extended Stay', 'Complete', 'Leisure'],
    overview: 'Extended Singapore exploration! Dive deep into every neighborhood, attraction, and experience. Leisurely paced comprehensive tour with time to truly experience Singapore.',
    itinerary: [
      { day: 1, title: 'Arrival | Orientation', description: 'Airport transfer.\n\nCheck-in.\n\nOrientation walk.' },
      { day: 2, title: 'Central Singapore', description: 'Marina Bay, Raffles, Merlion.\n\nGardens by the Bay.' },
      { day: 3, title: 'Cultural Districts', description: 'Chinatown, Little India, Kampong Glam.\n\nFood tour.' },
      { day: 4, title: 'Universal Studios', description: 'Full day theme park.\n\nEvening show.' },
      { day: 5, title: 'Wildlife Day', description: 'Zoo, River Wonders, Night Safari.' },
      { day: 6, title: 'Sentosa Exploration', description: 'Full day Sentosa.\n\nBeaches and attractions.' },
      { day: 7, title: 'Shopping & Dining', description: 'Orchard Road.\n\nLocal markets.\n\nFood trails.' },
      { day: 8, title: 'Leisure Day', description: 'Free for personal exploration.\n\nOptional activities.' },
      { day: 9, title: 'Departure', description: 'Jewel Changi.\n\nAirport transfer.' }
    ],
    inclusions: ['8 Nights hotel', 'Daily breakfast', 'All transfers', 'All major attractions', 'Universal Studios', 'Zoo combo', 'Gardens by the Bay', 'Sentosa attractions', 'Food tours (2)', 'MRT pass'],
    exclusions: ['Flights', 'Visa', 'Insurance', 'Some meals', 'Shopping', 'Optional activities'],
    accommodations: ['Park Avenue Robertson or similar', 'Hotel Grand Pacific or similar', 'Fragrance Hotel Imperial or similar'],
    accommodationNote: '*Well-located hotels. Extended stay discounts applied.'
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

// Blog posts used in Blog page
export const blogPosts = [
  {
    id: 'best-time-dubai',
    title: 'Best Time to Visit Dubai: Weather, Events, and Deals',
    category: 'Destinations',
    date: '2025-09-02',
    readTime: 8,
    author: 'Team Traverse Globe',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
    excerpt: 'From winter festivals to summer sales, here’s how to time your Dubai trip for weather and wallet-friendly fun.',
    url: '#',
  },
  {
    id: 'bali-first-timers',
    title: 'Bali for First‑Timers: 7‑Day Itinerary That Balances Beach and Culture',
    category: 'Guides',
    date: '2025-08-18',
    readTime: 9,
    author: 'Aisha Khan',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&q=80',
    excerpt: 'Uluwatu sunsets, Ubud rice terraces, waterfalls, and cafés—this balanced plan saves you time and avoids FOMO.',
    url: '#',
  },
  {
    id: 'thailand-vs-bali',
    title: 'Thailand vs Bali: Which Tropical Escape Fits Your Travel Style?',
    category: 'Tips',
    date: '2025-07-12',
    readTime: 7,
    author: 'Rohit Verma',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    excerpt: 'Beaches, nightlife, visas, budgets, and food—here’s a side‑by‑side comparison to help you decide.',
    url: '#',
  },
  {
    id: 'singapore-48-hours',
    title: '48 Hours in Singapore: The Perfect Stopover Plan',
    category: 'Itineraries',
    date: '2025-06-25',
    readTime: 6,
    author: 'Team Traverse Globe',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80',
    excerpt: 'Short on time? Squeeze in hawker food, Gardens by the Bay, Marina Bay views, and Sentosa highlights.',
    url: '#',
  },
  {
    id: 'uae-theme-parks',
    title: 'The Ultimate Guide to UAE Theme Parks for Families',
    category: 'Family',
    date: '2025-05-14',
    readTime: 10,
    author: 'Neelam Patel',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80',
    excerpt: 'From Motiongate to Ferrari World—tickets, height limits, fast passes, and where to stay nearby.',
    url: '#',
  },
  {
    id: 'travel-scams-avoid',
    title: '10 Common Travel Scams (and How to Avoid Them)',
    category: 'Safety',
    date: '2025-04-20',
    readTime: 7,
    author: 'Team Traverse Globe',
    image: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200&q=80',
    excerpt: 'From taxi tricks to too‑good‑to‑be‑true tours—spot the signs early and keep your trip stress‑free.',
    url: '#',
  },
  {
    id: 'visa-tips-indians',
    title: 'Visa Tips for Indian Travelers: Faster Approvals, Fewer Rejections',
    category: 'Tips',
    date: '2025-03-05',
    readTime: 8,
    author: 'Ankit Sharma',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80',
    excerpt: 'Documents, timelines, and common pitfalls—plus how our team supports you at every step.',
    url: '#',
  },
  {
    id: 'dubai-budget',
    title: 'Dubai on a Budget: Free and Low‑Cost Must‑Dos',
    category: 'Deals',
    date: '2025-02-10',
    readTime: 6,
    author: 'Team Traverse Globe',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200&q=80',
    excerpt: 'Old Dubai walks, free viewpoints, abra rides, and local eats that save big without compromise.',
    url: '#',
  },
  {
    id: 'packing-checklist',
    title: 'Carry‑On Packing Checklist: International Trips',
    category: 'Guides',
    date: '2025-01-19',
    readTime: 5,
    author: 'Sara D’Souza',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    excerpt: 'The essential list that fits in a cabin bag: meds, tech, docs, and the underrated items pros swear by.',
    url: '#',
  },
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
