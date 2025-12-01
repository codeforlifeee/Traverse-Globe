// Package Content Generators
// Works with both Sanity data and fallback data

export function getOverviewList(packageData, name) {
  // Accept either a package object or ID
  const detail = typeof packageData === 'object' ? packageData : null;
  
  // Use highlights from Sanity data if available
  if (detail && detail.highlights && Array.isArray(detail.highlights)) {
    return detail.highlights;
  }
  
  // Minimal fallback
  return [
    'Comfortable accommodation with daily breakfast',
    'Airport transfers included',
    'Professional tour guide',
    'All transfers in AC vehicle',
  ];
}

export function getItinerary(packageData, destination) {
  // Accept either a package object or ID
  const detail = typeof packageData === 'object' ? packageData : null;
  
  // Use actual itinerary from Sanity data if available
  if (detail && detail.itinerary && detail.itinerary.days) {
    return detail.itinerary.days.map((day) => ({
      title: `${day.dayKey || 'Day'}: ${day.title}`,
      paragraphs: [day.description]
    }));
  }
  
  // Fallback to generic template if no itinerary exists
  const city = destination.split(',')[0];
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

  return [commonDay1, day2, day3, dayFinal];
}

export function getInclusions(packageData) {
  // Accept either a package object or ID
  const detail = typeof packageData === 'object' ? packageData : null;
  
  // Use actual inclusions from Sanity data if available
  if (detail && detail.inclusions) {
    return detail.inclusions;
  }
  
  // Minimal fallback
  return [
    'Accommodation with daily breakfast',
    'Airport transfers (arrival & departure)',
    'City tour with professional guide',
    'All transfers in private AC vehicle',
  ];
}

export function getExclusions(packageData) {
  // Accept either a package object or ID
  const detail = typeof packageData === 'object' ? packageData : null;
  
  // Use actual exclusions from Sanity data if available
  if (detail && detail.exclusions) {
    return detail.exclusions;
  }
  
  // Fallback to generic exclusions
  return [
    'International airfare',
    'Visa charges (if applicable)',
    'Travel insurance',
    'Personal expenses and tips',
    'Meals not mentioned in inclusions',
  ];
}

export function getHotels(packageData, destination) {
  // Accept either a package object or ID
  const detail = typeof packageData === 'object' ? packageData : null;
  
  // Use actual hotels from Sanity data if available
  if (detail && detail.hotels) {
    // If hotels is an object with options array
    if (detail.hotels.options && Array.isArray(detail.hotels.options)) {
      return detail.hotels.options;
    }
    // If hotels is a simple array
    if (Array.isArray(detail.hotels)) {
      return detail.hotels;
    }
  }
  
  // Minimal fallback
  const city = destination.split(',')[0];
  return [
    `${city}: 3-star hotel or similar`,
    `${city}: 4-star hotel or similar`,
  ];
}
