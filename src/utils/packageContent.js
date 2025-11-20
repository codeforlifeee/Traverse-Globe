// Package Content Generators
// Generic content for package details pages

export function getOverviewList(id, name) {
  const idNum = Number(id);
  
  // Laos specific overview
  if (idNum >= 70 && idNum <= 84) {
    if (idNum >= 70 && idNum <= 72) {
      return [
        'Explore UNESCO World Heritage city of Luang Prabang',
        'Visit Pak Ou Caves with thousands of Buddha statues',
        'Discover breathtaking Kuang Si Waterfalls with swimming',
        'Experience traditional Elephant Village interactions',
        'Witness sacred alms-giving ceremony at dawn',
        'Hands-on Lao cooking class with organic ingredients',
        'Mekong River boat trip with scenic landscapes',
        'Visit Wat Xieng Thong temple (classic Lao architecture)',
        'Explore Royal Palace Museum and cultural heritage',
        'Browse vibrant Night Market for local crafts'
      ];
    }
    if (idNum >= 73 && idNum <= 75) {
      return [
        'Explore UNESCO World Heritage city of Luang Prabang',
        'Visit Pak Ou Caves with thousands of Buddha statues',
        'Discover breathtaking Kuang Si Waterfalls with swimming',
        'Experience traditional Elephant Village interactions',
        'Witness sacred alms-giving ceremony at dawn',
        'Climb Phousi Hill for panoramic mountain views',
        'Mekong River sunset cruise with mountain backdrop',
        'Visit Bear Rescue Center and wildlife conservation',
        'Explore traditional weaving at Ock Pop Tok Center',
        'Browse colorful Night Market for local handicrafts'
      ];
    }
    if (idNum >= 76 && idNum <= 78) {
      return [
        'Explore UNESCO World Heritage city of Luang Prabang',
        'Visit Pak Ou Caves with thousands of Buddha statues',
        'Discover breathtaking Kuang Si Waterfalls with swimming',
        'Experience capital city Vientiane with golden temples',
        'Visit fascinating Buddha Park with 200+ sculptures',
        'High-speed train journey from Luang Prabang to Vientiane',
        'Explore That Luang Stupa and Patuxay Monument',
        'Done Xing Xu Island peaceful riverside community',
        'Sacred alms-giving ceremony and morning markets',
        'Mekong Riverfront sunset views and local culture'
      ];
    }
    if (idNum >= 79 && idNum <= 81) {
      return [
        'Explore UNESCO World Heritage city of Luang Prabang',
        'Visit Pak Ou Caves with thousands of Buddha statues',
        'Discover breathtaking Kuang Si Waterfalls with swimming',
        'Experience traditional alms-giving ceremony at dawn',
        'Scenic Mekong River cruise with sunset views',
        'Visit ancient Buddhist temples and monasteries',
        'Explore vibrant night markets and local handicrafts',
        'Traditional Lao cuisine and cooking experiences',
        'Comfortable accommodation with daily breakfast',
        'Professional English-speaking guide throughout'
      ];
    }
    if (idNum >= 82 && idNum <= 84) {
      return [
        'Explore UNESCO World Heritage city of Luang Prabang',
        'Private Baci Ceremony for welcome and good fortune',
        'Visit mystical Pak Ou Caves with thousands of Buddha images',
        'Discover spectacular Kuang Si Waterfall with turquoise pools',
        'Experience cool highlands of Bolaven Plateau',
        'Ancient Khmer temple complex Wat Phou (UNESCO site)',
        '4,000 Islands region with Don Khong and Don Khone',
        'Khone Phapheng Falls - largest waterfall in Southeast Asia',
        'Tea and coffee plantations with local craft villages',
        'Sacred alms-giving ceremony and cultural immersion'
      ];
    }
    return [
      'Airport transfers with meet & greet service',
      'Explore UNESCO World Heritage city of Luang Prabang',
      'Visit ancient Buddhist temples and monasteries',
      'Experience traditional alms-giving ceremony at dawn',
      'Scenic Mekong River cruise with sunset views',
      'Discover Kuang Si Waterfalls with turquoise pools',
      'Explore vibrant night markets and local handicrafts',
      'Traditional Lao cuisine and cooking experiences',
      'Comfortable accommodation with daily breakfast',
      'Professional English-speaking guide throughout'
    ];
  }
  
  // Vietnam specific overview
  if (idNum >= 58 && idNum <= 69) {
    const starLevel = idNum <= 60 ? (idNum === 58 ? '3-star' : idNum === 59 ? '4-star' : '5-star') :
      idNum <= 63 ? (idNum === 61 ? '3-star' : idNum === 62 ? '4-star' : '5-star') :
      idNum <= 66 ? (idNum === 64 ? '3-star' : idNum === 65 ? '4-star' : '5-star') :
      (idNum === 67 ? '3-star' : idNum === 68 ? '4-star' : '5-star');
    
    return [
      'Airport transfers with meet & greet service',
      'Explore bustling Ho Chi Minh City (Saigon)',
      'Visit historic Hanoi with Old Quarter walking tour',
      'Scenic Halong Bay cruise with limestone karsts',
      'Discover ancient town of Hoi An with lantern festival',
      'Cu Chi Tunnels underground war history experience',
      'Traditional Vietnamese cuisine and cooking classes',
      `${starLevel} accommodation with daily breakfast`,
      'Professional English-speaking guide throughout',
      'All transfers in private AC vehicle'
    ];
  }
  
  // Sri Lanka specific overview
  if (idNum >= 40 && idNum <= 57) {
    const starLevel = idNum <= 42 || (idNum >= 43 && idNum <= 45) || (idNum >= 49 && idNum <= 51) || (idNum >= 52 && idNum <= 54) || (idNum >= 55 && idNum <= 57) ? 
      (idNum === 40 || idNum === 43 || idNum === 46 || idNum === 49 || idNum === 52 || idNum === 55 ? '3-star' : 
       idNum === 41 || idNum === 44 || idNum === 47 || idNum === 50 || idNum === 53 || idNum === 56 ? '4-star' : '5-star') : '4-star';
    
    return [
      'Airport transfers with meet & greet service',
      'Visit iconic Pinnawala Elephant Orphanage',
      'Explore Temple of the Sacred Tooth Relic in Kandy',
      'Tea plantation tour with factory visit and tasting',
      'Scenic Madu River boat safari with wildlife spotting',
      'Kosgoda Sea Turtle Conservation Project visit',
      'Comprehensive Colombo city tour with shopping',
      `${starLevel} accommodation with daily breakfast`,
      'Professional English-speaking guide throughout',
      'All transfers in private AC vehicle'
    ];
  }
  
  // Dubai specific overview
  const base = [
    'Arrival in city with Hotel Transfer and Dhow Cruise Dinner',
    'Half-Day City Tour with Burj Khalifa (124th Floor)',
    'Desert Safari Adventure with BBQ Dinner and Entertainment',
    'Comfortable hotel accommodation with daily breakfast',
    'All transfers in private AC vehicle',
    'Professional English-speaking tour guide',
  ];

  if ([2,5,8].includes(idNum)) {
    return [
      base[0], base[1], base[2], 'Dubai Miracle Garden and Global Village Visit', base[3], base[4]
    ];
  }
  if ([3,6,9].includes(idNum)) {
    return [
      base[0], base[1], base[2], 'Dubai Miracle Garden and Global Village Visit', 'Full-Day Abu Dhabi City Tour with Sheikh Zayed Grand Mosque', base[3]
    ];
  }
  if (idNum>=11 && idNum<=25){
    // Generic for Bali/Thailand/Singapore
    return [
      'Airport transfers and accommodation',
      'Daily breakfast at hotel',
      'Sightseeing tours with professional guide',
      'Cultural experiences and activities',
      'All transfers in private AC vehicle',
    ];
  }
  return base;
}

export function getItinerary(id, destination) {
  const city = destination.split(',')[0];
  const idNum = Number(id);
  
  const commonDay1 = {
    title: 'Day 1: Arrival',
    paragraphs: [`Welcome to ${city}! Airport transfer to hotel and check-in. Evening at leisure.`]
  };
  const day2 = {
    title: 'Day 2: Sightseeing',
    paragraphs: ['Full day city tour and cultural experiences with professional guide.']
  };
  const day3 = {
    title: 'Day 3: Activities',
    paragraphs: ['Adventure activities, shopping, and local experiences.']
  };
  const dayFinal = {
    title: 'Final Day: Departure',
    paragraphs: ['Check-out and transfer to airport for departure.']
  };

  // Generic 4-day template for all packages
  return [commonDay1, day2, day3, dayFinal];
}

export function getInclusions(id) {
  const idNum = Number(id);
  const base = [
    'Accommodation with daily breakfast',
    'Airport transfers (arrival & departure)',
    'City tour with professional guide',
    'All transfers in private AC vehicle',
  ];
  
  if (idNum>=58 && idNum<=69){
    return [
      'Accommodation as per package duration',
      'Daily breakfast at hotel',
      'Airport transfers (arrival & departure)',
      'Domestic flights (Ho Chi Minh - Hanoi)',
      'Ho Chi Minh City tour with Reunification Palace',
      'Cu Chi Tunnels underground experience',
      'Hanoi city tour with Ho Chi Minh Mausoleum',
      'Halong Bay cruise with cave visits',
      'Hoi An ancient town exploration',
      'Traditional water puppet show',
      'Vietnamese cooking class experience',
      'All transfers in private AC vehicle',
      'Professional English-speaking guide',
    ];
  }
  if (idNum>=40 && idNum<=57){
    return [
      '4 Nights accommodation as per package',
      'Daily breakfast at hotel',
      'Airport transfers (arrival & departure)',
      'Pinnawala Elephant Orphanage visit',
      'Spice & Herbal Garden tour',
      'Temple of the Sacred Tooth Relic visit',
      'Sri Bhaktha Hanuman Temple & Ramboda Falls',
      'Tea Factory & Plantation tour with tasting',
      'Seetha Amman Temple visit',
      'Yala National Park jeep safari',
      'Colombo city tour with major landmarks',
      'All transfers in private AC vehicle',
      'Professional English-speaking guide',
    ];
  }
  if (idNum>=1 && idNum<=10){
    return [
      '3/4/5 Nights accommodation as per package',
      'Daily breakfast at hotel',
      'Airport transfers (arrival & departure)',
      'Dubai City Tour with professional guide',
      'Burj Khalifa 124th floor entry tickets',
      'Desert Safari with BBQ dinner',
      'Dhow Cruise with dinner',
      'All transfers in private AC vehicle',
    ];
  }
  return base;
}

export function getExclusions() {
  return [
    'International airfare',
    'Visa charges (if applicable)',
    'Travel insurance',
    'Personal expenses and tips',
    'Meals not mentioned in inclusions',
  ];
}

export function getHotels(id, destination) {
  const idNum = Number(id);
  const city = destination.split(',')[0];
  
  if (idNum>=70 && idNum<=84){
    return [
      'Vientiane: 3-4 star hotel in city center',
      'Luang Prabang: Boutique hotel near UNESCO sites',
      'Vang Vieng: Riverside resort with mountain views',
      'Pakse: Comfortable hotel near Champasak ruins',
    ];
  }
  if (idNum>=58 && idNum<=69){
    const starLevel = idNum <= 60 ? (idNum === 58 ? '3-star' : idNum === 59 ? '4-star' : '5-star') :
      idNum <= 63 ? (idNum === 61 ? '3-star' : idNum === 62 ? '4-star' : '5-star') :
      idNum <= 66 ? (idNum === 64 ? '3-star' : idNum === 65 ? '4-star' : '5-star') :
      (idNum === 67 ? '3-star' : idNum === 68 ? '4-star' : '5-star');
    return [
      `Ho Chi Minh City: ${starLevel} hotel in District 1`,
      `Hanoi: ${starLevel} hotel in Old Quarter area`,
      `Halong Bay: ${starLevel} cruise boat accommodation`,
      `Hoi An: ${starLevel} boutique hotel in Ancient Town`,
    ];
  }
  if (idNum>=40 && idNum<=57){
    const starLevel = idNum <= 42 ? (idNum === 40 ? '3-star' : idNum === 41 ? '4-star' : '5-star') : '4-star';
    return [
      `Kandy: ${starLevel} hotel with mountain views`,
      `Nuwara Eliya: ${starLevel} colonial-style hotel`,
      `Yala: ${starLevel} safari lodge near national park`,
      `Colombo: ${starLevel} city hotel with modern amenities`,
    ];
  }
  if (idNum>=1 && idNum<=10){
    return [
      'Ramada by Wyndham Dubai Deira or similar',
      'Citymax Hotel Bur Dubai or similar',
      'Golden Tulip Al Barsha or similar',
    ];
  }
  return [
    `${city} 3-star or similar`,
    `${city} 4-star or similar`,
    `${city} 5-star or similar`,
  ];
}
