// Comprehensive Hotel Sample Data for Sanity Migration
// This data will be migrated to Sanity CMS

export const sampleHotels = [
  // DOMESTIC HOTELS (10)
  {
    name: "The Oberoi, New Delhi",
    slug: "the-oberoi-new-delhi",
    category: "domestic",
    location: "New Delhi",
    city: "New Delhi",
    country: "India",
    rating: 5,
    reviewRating: 4.8,
    price: 9500,
    originalPrice: 12000,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Experience luxury and elegance at The Oberoi, New Delhi. Located in the heart of the capital, this iconic hotel offers world-class amenities, impeccable service, and sophisticated accommodations. Perfect for business and leisure travelers seeking an unforgettable stay.",
    highlights: ["5-Star Luxury", "Central Location", "Award-winning Restaurant", "Spa & Wellness"],
    amenities: ["Free WiFi", "Swimming Pool", "Spa & Wellness Center", "Fine Dining Restaurant", "Bar", "Fitness Center", "Room Service", "Concierge", "Airport Shuttle", "Business Center"],
    roomTypes: [
      {
        type: "Deluxe Room",
        price: 9500,
        capacity: 2,
        size: 420,
        bedType: "King Bed",
        amenities: ["City View", "Mini Bar", "Coffee Maker"],
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=60"
      },
      {
        type: "Premier Room",
        price: 12500,
        capacity: 2,
        size: 550,
        bedType: "King Bed",
        amenities: ["City View", "Living Area", "Premium Toiletries"],
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=60"
      },
      {
        type: "Luxury Suite",
        price: 25000,
        capacity: 4,
        size: 1100,
        bedType: "King Bed + Sofa Bed",
        amenities: ["Panoramic View", "Separate Living Room", "Butler Service"],
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    policies: [
      "Photo ID and credit card required at check-in",
      "No smoking in rooms",
      "Pets not allowed",
      "Children welcome"
    ],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    nearbyAttractions: [
      { name: "India Gate", distance: "3 km" },
      { name: "Red Fort", distance: "8 km" },
      { name: "Qutub Minar", distance: "12 km" }
    ],
    address: "Dr Zakir Hussain Marg, New Delhi - 110003",
    phone: "+91-11-2436-3030",
    email: "reservations.delhi@oberoihotels.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  },
  {
    name: "Taj Lake Palace",
    slug: "taj-lake-palace-udaipur",
    category: "domestic",
    location: "Udaipur, Rajasthan",
    city: "Udaipur",
    country: "India",
    rating: 5,
    reviewRating: 4.9,
    price: 18000,
    originalPrice: 21000,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Float away to a fairytale at the Taj Lake Palace, a stunning white marble hotel set on an island in Lake Pichola. This 18th-century palace offers royal accommodations, breathtaking lake views, and an enchanting experience you'll never forget.",
    highlights: ["Heritage Palace", "Island Location", "Lake Views", "Royal Experience"],
    amenities: ["Lake View", "Fine Dining", "Bar", "Boat Transfer", "Spa", "Swimming Pool", "WiFi", "Room Service", "Traditional Performances", "Art Gallery"],
    roomTypes: [
      {
        type: "Palace Room",
        price: 18000,
        capacity: 2,
        size: 500,
        bedType: "King Bed",
        amenities: ["Lake View", "Heritage Decor", "Marble Bathroom"],
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=60"
      },
      {
        type: "Grand Palace Room",
        price: 25000,
        capacity: 2,
        size: 650,
        bedType: "King Bed",
        amenities: ["Panoramic Lake View", "Jharokha Balcony", "Premium Amenities"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    policies: [
      "Photo ID required at check-in",
      "Boat transfer included",
      "Dress code for restaurants",
      "Children above 8 years only"
    ],
    cancellationPolicy: "Free cancellation up to 7 days before check-in",
    nearbyAttractions: [
      { name: "City Palace", distance: "1 km" },
      { name: "Jagdish Temple", distance: "2 km" },
      { name: "Saheliyon Ki Bari", distance: "3 km" }
    ],
    address: "Lake Pichola, Udaipur - 313001",
    phone: "+91-294-242-8800",
    email: "lakepalace.udaipur@tajhotels.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  },
  {
    name: "The Leela Palace Mumbai",
    slug: "the-leela-palace-mumbai",
    category: "domestic",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    country: "India",
    rating: 5,
    reviewRating: 4.7,
    price: 15000,
    originalPrice: 18000,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Overlooking the Arabian Sea, The Leela Palace Mumbai combines traditional Indian grandeur with modern luxury. Located in the Andheri East business district, this 5-star hotel offers spectacular city and sea views.",
    highlights: ["Sea Views", "Rooftop Pool", "Multiple Restaurants", "Business District"],
    amenities: ["Free WiFi", "Rooftop Pool", "Spa", "Multiple Restaurants", "Bar", "Fitness Center", "Business Center", "Valet Parking", "Airport Shuttle"],
    roomTypes: [
      {
        type: "Deluxe Room",
        price: 15000,
        capacity: 2,
        size: 500,
        bedType: "King Bed",
        amenities: ["City View", "Work Desk", "Rain Shower"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Credit card pre-authorization", "Children welcome"],
    cancellationPolicy: "Free cancellation up to 24 hours before check-in",
    nearbyAttractions: [
      { name: "Gateway of India", distance: "15 km" },
      { name: "Marine Drive", distance: "18 km" }
    ],
    address: "Sahar, Andheri East, Mumbai - 400059",
    phone: "+91-22-6691-1234",
    email: "reservations.mumbai@theleela.com",
    mapLink: "https://goo.gl/maps/example",
    featured: false,
    active: true
  },
  {
    name: "Taj Mahal Palace",
    slug: "taj-mahal-palace-mumbai",
    category: "domestic",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    country: "India",
    rating: 5,
    reviewRating: 4.8,
    price: 22000,
    originalPrice: 26000,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60"
    ],
    description: "An iconic landmark overlooking the Arabian Sea and Gateway of India. This grand dame of Mumbai hotels has been the first choice of discerning travelers since 1903.",
    highlights: ["Heritage Hotel", "Gateway of India View", "Historic Landmark", "Luxury Dining"],
    amenities: ["WiFi", "Swimming Pool", "Spa", "7 Restaurants", "Bars", "Fitness Center", "Salon", "Heritage Tours", "Shopping Arcade"],
    roomTypes: [
      {
        type: "Premium Room",
        price: 22000,
        capacity: 2,
        size: 550,
        bedType: "King Bed",
        amenities: ["Sea View", "Heritage Architecture", "Luxe Amenities"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    policies: ["Valid ID required", "Children welcome", "Pet-friendly suites available"],
    cancellationPolicy: "Free cancellation up to 72 hours before check-in",
    nearbyAttractions: [
      { name: "Gateway of India", distance: "0.1 km" },
      { name: "Colaba Causeway", distance: "0.5 km" }
    ],
    address: "Apollo Bunder, Colaba, Mumbai - 400001",
    phone: "+91-22-6665-3366",
    email: "tmh.mumbai@tajhotels.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  },
  {
    name: "ITC Grand Chola",
    slug: "itc-grand-chola-chennai",
    category: "domestic",
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    country: "India",
    rating: 5,
    reviewRating: 4.6,
    price: 12000,
    originalPrice: 15000,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=60"
    ],
    description: "India's largest luxury hotel inspired by the grandeur of the Chola dynasty. Features award-winning restaurants, luxury spa, and impeccable service.",
    highlights: ["Largest Luxury Hotel", "10 Restaurants", "Royal Heritage", "LEED Platinum"],
    amenities: ["WiFi", "3 Swimming Pools", "Kaya Kalp Spa", "10 Restaurants", "Business Center", "Fitness Center", "Shopping Arcade", "Banquet Facilities"],
    roomTypes: [
      {
        type: "Executive Room",
        price: 12000,
        capacity: 2,
        size: 470,
        bedType: "King Bed",
        amenities: ["Work Desk", "Walk-in Closet", "Rain Shower"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Children welcome", "Non-smoking property"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    nearbyAttractions: [
      { name: "Marina Beach", distance: "8 km" },
      { name: "Kapaleeshwarar Temple", distance: "4 km" }
    ],
    address: "63, Mount Road, Guindy, Chennai - 600032",
    phone: "+91-44-2220-0000",
    email: "reservations.itcgrandchola@itchotels.in",
    mapLink: "https://goo.gl/maps/example",
    featured: false,
    active: true
  },
  {
    name: "Taj Exotica Resort & Spa",
    slug: "taj-exotica-goa",
    category: "domestic",
    location: "Goa",
    city: "Benaulim",
    country: "India",
    rating: 5,
    reviewRating: 4.7,
    price: 16000,
    originalPrice: 19000,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Set amidst 56 acres of lush gardens and overlooking Benaulim beach, this Mediterranean-style resort offers luxury and tranquility in South Goa.",
    highlights: ["Beachfront", "56-Acre Estate", "Water Sports", "Multiple Pools"],
    amenities: ["Private Beach", "Swimming Pools", "Spa", "Water Sports", "4 Restaurants", "Bar", "Fitness Center", "Kids Club", "WiFi"],
    roomTypes: [
      {
        type: "Charm Beach Villa",
        price: 16000,
        capacity: 2,
        size: 950,
        bedType: "King Bed",
        amenities: ["Beach View", "Private Balcony", "Outdoor Shower"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Children welcome", "Pet-friendly rooms available"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in",
    nearbyAttractions: [
      { name: "Benaulim Beach", distance: "0 km" },
      { name: "Colva Beach", distance: "3 km" }
    ],
    address: "Calwaddo, Benaulim, Salcette, Goa - 403716",
    phone: "+91-832-668-3333",
    email: "exotica.goa@tajhotels.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  },
  {
    name: "Wildflower Hall, Shimla",
    slug: "wildflower-hall-shimla",
    category: "domestic",
    location: "Shimla, Himachal Pradesh",
    city: "Shimla",
    country: "India",
    rating: 5,
    reviewRating: 4.8,
    price: 20000,
    originalPrice: 24000,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Perched high in the Himalayas, this luxury resort offers spectacular mountain views, colonial charm, and an unforgettable mountain retreat experience.",
    highlights: ["Mountain Views", "Colonial Heritage", "Heated Pool", "Nature Trails"],
    amenities: ["Heated Pool", "Spa", "Restaurant", "Bar", "Fitness Center", "Mountain Biking", "Nature Walks", "WiFi", "Library"],
    roomTypes: [
      {
        type: "Valley View Room",
        price: 20000,
        capacity: 2,
        size: 500,
        bedType: "King Bed",
        amenities: ["Valley View", "Fireplace", "Bathtub"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Children welcome", "Winter season surcharge applies"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in",
    nearbyAttractions: [
      { name: "The Mall Road", distance: "13 km" },
      { name: "Jakhoo Temple", distance: "15 km" }
    ],
    address: "Chharabra, Shimla - 171012",
    phone: "+91-177-264-8585",
    email: "wildflowerhall.shimla@oberoihotels.com",
    mapLink: "https://goo.gl/maps/example",
    featured: false,
    active: true
  },
  {
    name: "Vivanta Dal View",
    slug: "vivanta-dal-view-srinagar",
    category: "domestic",
    location: "Srinagar, Kashmir",
    city: "Srinagar",
    country: "India",
    rating: 5,
    reviewRating: 4.6,
    price: 14000,
    originalPrice: 17000,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Overlooking the famous Dal Lake, this hotel offers Kashmiri hospitality with modern comforts. Experience the beauty of Kashmir from this luxurious retreat.",
    highlights: ["Dal Lake View", "Kashmiri Cuisine", "Shikara Rides", "Mountain Backdrop"],
    amenities: ["Lake View", "Restaurant", "Bar", "Shikara Rides", "Spa", "Fitness Center", "WiFi", "Room Service"],
    roomTypes: [
      {
        type: "Lake View Room",
        price: 14000,
        capacity: 2,
        size: 450,
        bedType: "King Bed",
        amenities: ["Dal Lake View", "Balcony", "Kashmiri Decor"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Travel permits may be required", "Children welcome"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    nearbyAttractions: [
      { name: "Dal Lake", distance: "0 km" },
      { name: "Mughal Gardens", distance: "2 km" }
    ],
    address: "Kralsangri, Brein, Nishat, Srinagar - 190121",
    phone: "+91-194-246-1111",
    email: "dalview.srinagar@tajhotels.com",
    mapLink: "https://goo.gl/maps/example",
    featured: false,
    active: true
  },
  {
    name: "Taj Falaknuma Palace",
    slug: "taj-falaknuma-palace-hyderabad",
    category: "domestic",
    location: "Hyderabad, Telangana",
    city: "Hyderabad",
    country: "India",
    rating: 5,
    reviewRating: 4.9,
    price: 35000,
    originalPrice: 40000,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Once the palace of the Nizam of Hyderabad, this magnificent property has been restored to its former glory. Experience royal luxury in one of India's finest palaces.",
    highlights: ["Royal Palace", "Heritage Property", "City Views", "Nizam's Legacy"],
    amenities: ["Palace Tours", "Fine Dining", "Spa", "Library", "Billiards Room", "Indoor Pool", "Vintage Car Rides", "WiFi"],
    roomTypes: [
      {
        type: "Grand Presidential Suite",
        price: 35000,
        capacity: 3,
        size: 1200,
        bedType: "King Bed",
        amenities: ["Palace View", "Heritage Decor", "Butler Service"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Children above 13 years only", "Dress code for dining"],
    cancellationPolicy: "Free cancellation up to 14 days before check-in",
    nearbyAttractions: [
      { name: "Charminar", distance: "5 km" },
      { name: "Golconda Fort", distance: "8 km" }
    ],
    address: "Engine Bowli, Falaknuma, Hyderabad - 500053",
    phone: "+91-40-6629-8585",
    email: "falaknuma.hyderabad@tajhotels.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  },
  {
    name: "The Gateway Hotel, Agra",
    slug: "gateway-hotel-agra",
    category: "domestic",
    location: "Agra, Uttar Pradesh",
    city: "Agra",
    country: "India",
    rating: 4,
    reviewRating: 4.4,
    price: 8000,
    originalPrice: 10000,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Strategically located near the Taj Mahal, this hotel offers comfortable accommodations and easy access to Agra's historic monuments.",
    highlights: ["Near Taj Mahal", "Mughal Architecture", "Rooftop Restaurant", "Heritage Tours"],
    amenities: ["WiFi", "Swimming Pool", "Restaurant", "Bar", "Fitness Center", "Business Center", "Travel Desk"],
    roomTypes: [
      {
        type: "Superior Room",
        price: 8000,
        capacity: 2,
        size: 350,
        bedType: "King Bed",
        amenities: ["City View", "Work Desk", "Mini Bar"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Children welcome", "Extra bed on request"],
    cancellationPolicy: "Free cancellation up to 24 hours before check-in",
    nearbyAttractions: [
      { name: "Taj Mahal", distance: "4 km" },
      { name: "Agra Fort", distance: "5 km" }
    ],
    address: "Taj East Gate Road, Agra - 282001",
    phone: "+91-562-223-2400",
    email: "gateway.agra@tajhotels.com",
    mapLink: "https://goo.gl/maps/example",
    featured: false,
    active: true
  },

  // INTERNATIONAL HOTELS (10)
  {
    name: "Burj Al Arab Jumeirah",
    slug: "burj-al-arab-jumeirah",
    category: "international",
    location: "Dubai, UAE",
    city: "Dubai",
    country: "United Arab Emirates",
    rating: 5,
    reviewRating: 4.9,
    price: 75000,
    originalPrice: 90000,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=60"
    ],
    description: "The world's most luxurious hotel stands on its own artificial island. Experience unparalleled luxury with 24-carat gold interiors, a private beach, and the most attentive service.",
    highlights: ["World's Most Luxurious", "Private Island", "24-Carat Gold Interiors", "Butler Service"],
    amenities: ["Private Beach", "Butler Service", "Luxury Spa", "9 Restaurants", "2 Swimming Pools", "Fitness Center", "Helipad", "Chauffeur Service", "WiFi"],
    roomTypes: [
      {
        type: "Deluxe King Suite",
        price: 75000,
        capacity: 2,
        size: 2100,
        bedType: "King Bed",
        amenities: ["Ocean View", "Jacuzzi", "iPad Controls", "24-hour Butler"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      },
      {
        type: "Panoramic Suite",
        price: 120000,
        capacity: 2,
        size: 2700,
        bedType: "King Bed",
        amenities: ["180° Views", "Separate Living Room", "Dining Area"],
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    policies: ["Children above 12 years only", "Smart casual dress code", "Photo ID required"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in",
    nearbyAttractions: [
      { name: "Mall of the Emirates", distance: "8 km" },
      { name: "Dubai Marina", distance: "15 km" }
    ],
    address: "Jumeirah Street, Dubai, UAE",
    phone: "+971-4-301-7777",
    email: "baa.reservation@jumeirah.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  },
  {
    name: "Marina Bay Sands",
    slug: "marina-bay-sands-singapore",
    category: "international",
    location: "Singapore",
    city: "Singapore",
    country: "Singapore",
    rating: 5,
    reviewRating: 4.7,
    price: 25000,
    originalPrice: 30000,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Singapore's most iconic hotel features the world's largest rooftop infinity pool, celebrity chef restaurants, and direct access to The Shoppes at Marina Bay Sands.",
    highlights: ["Infinity Pool", "SkyPark", "Casino", "Celebrity Chefs"],
    amenities: ["Infinity Pool", "Casino", "SkyPark", "8 Celebrity Chef Restaurants", "Shopping Mall", "Theater", "Museum", "Spa", "Fitness Center", "WiFi"],
    roomTypes: [
      {
        type: "Deluxe Room",
        price: 25000,
        capacity: 2,
        size: 450,
        bedType: "King Bed",
        amenities: ["City View", "Rain Shower", "Smart TV"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    policies: ["Photo ID required", "Credit card for incidentals", "Children welcome"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    nearbyAttractions: [
      { name: "Gardens by the Bay", distance: "0.5 km" },
      { name: "Merlion Park", distance: "1 km" }
    ],
    address: "10 Bayfront Avenue, Singapore 018956",
    phone: "+65-6688-8868",
    email: "reservations@marinabaysands.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  },
  {
    name: "The Ritz-Carlton Bali",
    slug: "ritz-carlton-bali",
    category: "international",
    location: "Nusa Dua, Bali",
    city: "Nusa Dua",
    country: "Indonesia",
    rating: 5,
    reviewRating: 4.8,
    price: 28000,
    originalPrice: 33000,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Perched on a cliff overlooking the Indian Ocean, this luxury resort offers breathtaking views, world-class dining, and authentic Balinese hospitality.",
    highlights: ["Cliff-top Location", "Ocean Views", "Private Beach", "Award-winning Spa"],
    amenities: ["Private Beach", "3 Swimming Pools", "Spa", "5 Restaurants", "Bar", "Water Sports", "Kids Club", "Fitness Center", "WiFi"],
    roomTypes: [
      {
        type: "Ocean View Room",
        price: 28000,
        capacity: 2,
        size: 550,
        bedType: "King Bed",
        amenities: ["Ocean View", "Balcony", "Bathtub"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Children welcome", "Resort fee applies"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in",
    nearbyAttractions: [
      { name: "Bali Collection Shopping", distance: "2 km" },
      { name: "Water Blow", distance: "3 km" }
    ],
    address: "Jalan Raya Nusa Dua Selatan Lot III, Bali 80363",
    phone: "+62-361-849-8988",
    email: "rc.dpsbr.reservation@ritzcarlton.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  },
  {
    name: "Mandarin Oriental Bangkok",
    slug: "mandarin-oriental-bangkok",
    category: "international",
    location: "Bangkok, Thailand",
    city: "Bangkok",
    country: "Thailand",
    rating: 5,
    reviewRating: 4.9,
    price: 22000,
    originalPrice: 26000,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=60"
    ],
    description: "A Bangkok icon on the banks of the Chao Phraya River. Known for exceptional service, Thai hospitality, and legendary culinary experiences.",
    highlights: ["Riverside Location", "Historic Hotel", "Award-winning Restaurants", "Legendary Service"],
    amenities: ["River View", "Swimming Pool", "Spa", "9 Restaurants", "Cooking School", "Fitness Center", "Thai Cultural Programs", "WiFi"],
    roomTypes: [
      {
        type: "Deluxe Room",
        price: 22000,
        capacity: 2,
        size: 450,
        bedType: "King Bed",
        amenities: ["River View", "Thai Silk Decor", "Rain Shower"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Children welcome", "River shuttle service included"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    nearbyAttractions: [
      { name: "Wat Pho", distance: "2 km" },
      { name: "Grand Palace", distance: "3 km" }
    ],
    address: "48 Oriental Avenue, Bangkok 10500",
    phone: "+66-2-659-9000",
    email: "mobkk-reservations@mohg.com",
    mapLink: "https://goo.gl/maps/example",
    featured: false,
    active: true
  },
  {
    name: "The Ritz Paris",
    slug: "ritz-paris",
    category: "international",
    location: "Paris, France",
    city: "Paris",
    country: "France",
    rating: 5,
    reviewRating: 4.9,
    price: 85000,
    originalPrice: 100000,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60"
    ],
    description: "The epitome of Parisian luxury on Place Vendôme. This legendary hotel has hosted royalty, celebrities, and dignitaries for over a century.",
    highlights: ["Place Vendôme", "Historic Luxury", "Michelin Star Dining", "Ritz Club"],
    amenities: ["Indoor Pool", "Spa", "3 Restaurants", "Bar Hemingway", "Cooking School", "Shopping Arcade", "Fitness Center", "WiFi"],
    roomTypes: [
      {
        type: "Deluxe Room",
        price: 85000,
        capacity: 2,
        size: 450,
        bedType: "King Bed",
        amenities: ["Place Vendôme View", "Marble Bathroom", "Luxury Amenities"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Children welcome", "Dress code for restaurants"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in",
    nearbyAttractions: [
      { name: "Louvre Museum", distance: "1 km" },
      { name: "Opera Garnier", distance: "0.5 km" }
    ],
    address: "15 Place Vendôme, 75001 Paris",
    phone: "+33-1-43-16-30-30",
    email: "reservation@ritzparis.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  },
  {
    name: "The Savoy London",
    slug: "savoy-london",
    category: "international",
    location: "London, United Kingdom",
    city: "London",
    country: "United Kingdom",
    rating: 5,
    reviewRating: 4.8,
    price: 60000,
    originalPrice: 72000,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=60"
    ],
    description: "An iconic London landmark on the Strand. Combining Edwardian and Art Deco style with modern luxury, The Savoy has welcomed guests for over 130 years.",
    highlights: ["Thames Riverside", "Historic Luxury", "American Bar", "Royal Suite"],
    amenities: ["Swimming Pool", "Spa", "5 Restaurants", "American Bar", "Fitness Center", "Butler Service", "Theater Booking", "WiFi"],
    roomTypes: [
      {
        type: "Deluxe River View Room",
        price: 60000,
        capacity: 2,
        size: 350,
        bedType: "King Bed",
        amenities: ["Thames View", "Marble Bathroom", "Art Deco Design"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Children welcome", "Smart casual dress code"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    nearbyAttractions: [
      { name: "Covent Garden", distance: "0.3 km" },
      { name: "British Museum", distance: "1 km" }
    ],
    address: "Strand, London WC2R 0EZ",
    phone: "+44-20-7836-4343",
    email: "info@thesavoylondon.com",
    mapLink: "https://goo.gl/maps/example",
    featured: false,
    active: true
  },
  {
    name: "The Plaza Hotel New York",
    slug: "plaza-hotel-new-york",
    category: "international",
    location: "New York, USA",
    city: "New York",
    country: "United States",
    rating: 5,
    reviewRating: 4.7,
    price: 70000,
    originalPrice: 85000,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60"
    ],
    description: "A New York City landmark overlooking Central Park. This iconic hotel has been featured in numerous films and represents the epitome of New York luxury.",
    highlights: ["Central Park View", "Historic Landmark", "Eloise Suite", "Palm Court"],
    amenities: ["Spa", "Fitness Center", "5 Restaurants", "Palm Court", "Rose Club", "Shopping", "Business Center", "WiFi"],
    roomTypes: [
      {
        type: "Plaza Room",
        price: 70000,
        capacity: 2,
        size: 400,
        bedType: "King Bed",
        amenities: ["Park or City View", "Marble Bathroom", "24k Gold Fixtures"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "4:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Children welcome", "Pet-friendly"],
    cancellationPolicy: "Free cancellation up to 72 hours before check-in",
    nearbyAttractions: [
      { name: "Central Park", distance: "0 km" },
      { name: "Times Square", distance: "1 km" }
    ],
    address: "768 Fifth Avenue, New York, NY 10019",
    phone: "+1-212-759-3000",
    email: "reservations@theplazany.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  },
  {
    name: "Park Hyatt Tokyo",
    slug: "park-hyatt-tokyo",
    category: "international",
    location: "Tokyo, Japan",
    city: "Tokyo",
    country: "Japan",
    rating: 5,
    reviewRating: 4.8,
    price: 45000,
    originalPrice: 55000,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Famous from Lost in Translation, this sophisticated hotel occupies the top 14 floors of Shinjuku Park Tower, offering stunning city views and contemporary luxury.",
    highlights: ["Top 14 Floors", "New York Grill", "Lost in Translation Fame", "City Views"],
    amenities: ["Swimming Pool", "Spa", "4 Restaurants", "New York Bar", "Fitness Center", "Library", "Art Gallery", "WiFi"],
    roomTypes: [
      {
        type: "Park View Room",
        price: 45000,
        capacity: 2,
        size: 450,
        bedType: "King Bed",
        amenities: ["City View", "Deep Soaking Tub", "Premium Amenities"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Children welcome", "English speaking staff"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    nearbyAttractions: [
      { name: "Shinjuku Gyoen", distance: "1 km" },
      { name: "Meiji Shrine", distance: "2 km" }
    ],
    address: "3-7-1-2 Nishi-Shinjuku, Tokyo 163-1055",
    phone: "+81-3-5322-1234",
    email: "tokyo.park@hyatt.com",
    mapLink: "https://goo.gl/maps/example",
    featured: false,
    active: true
  },
  {
    name: "Park Hyatt Sydney",
    slug: "park-hyatt-sydney",
    category: "international",
    location: "Sydney, Australia",
    city: "Sydney",
    country: "Australia",
    rating: 5,
    reviewRating: 4.8,
    price: 42000,
    originalPrice: 50000,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Nestled at the edge of Sydney Harbour with uninterrupted views of the Opera House and Harbour Bridge. Experience the best of Sydney from this prime location.",
    highlights: ["Harbour Views", "Opera House Views", "Harbour Bridge Views", "Rooftop Pool"],
    amenities: ["Rooftop Pool", "Spa", "2 Restaurants", "Bar", "Fitness Center", "Harbour Views", "WiFi"],
    roomTypes: [
      {
        type: "Sydney Opera House View Room",
        price: 42000,
        capacity: 2,
        size: 450,
        bedType: "King Bed",
        amenities: ["Opera House View", "Balcony", "Marble Bathroom"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    policies: ["Photo ID required", "Children welcome", "Valet parking available"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    nearbyAttractions: [
      { name: "Sydney Opera House", distance: "0.2 km" },
      { name: "Harbour Bridge", distance: "0.5 km" }
    ],
    address: "7 Hickson Road, The Rocks, Sydney NSW 2000",
    phone: "+61-2-9241-1234",
    email: "sydney.park@hyatt.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  },
  {
    name: "Conrad Maldives Rangali Island",
    slug: "conrad-maldives-rangali-island",
    category: "international",
    location: "Maldives",
    city: "Rangali Island",
    country: "Maldives",
    rating: 5,
    reviewRating: 4.9,
    price: 95000,
    originalPrice: 110000,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=60"
    ],
    description: "Two private islands connected by a bridge in the Maldives. Home to the world's first underwater restaurant and stunning overwater villas.",
    highlights: ["Underwater Restaurant", "Two Private Islands", "Overwater Villas", "World-class Diving"],
    amenities: ["Private Beach", "12 Restaurants", "2 Spas", "Diving Center", "Water Sports", "Kids Club", "Wine Cellar", "WiFi"],
    roomTypes: [
      {
        type: "Water Villa",
        price: 95000,
        capacity: 2,
        size: 1250,
        bedType: "King Bed",
        amenities: ["Ocean Views", "Private Deck", "Direct Lagoon Access"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60"
      }
    ],
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    policies: ["Photo ID required", "Seaplane transfer required", "Children welcome"],
    cancellationPolicy: "Free cancellation up to 14 days before check-in",
    nearbyAttractions: [
      { name: "Ithaa Undersea Restaurant", distance: "On Property" },
      { name: "Rangali Island Beach", distance: "0 km" }
    ],
    address: "Rangali Island, Ari Atoll, Maldives",
    phone: "+960-668-0629",
    email: "conradmaldives@hilton.com",
    mapLink: "https://goo.gl/maps/example",
    featured: true,
    active: true
  }
];
