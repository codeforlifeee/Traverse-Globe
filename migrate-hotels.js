/**
 * Hotel Data Migration Script
 * Migrates sample hotel data to Sanity CMS
 * 
 * Usage: node migrate-hotels.js
 */

import { createClient } from '@sanity/client';
import { sampleHotels } from './src/data/hotelSampleData.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Sanity client with write permissions
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.VITE_SANITY_TOKEN || process.env.SANITY_API_TOKEN, // Write token required for migrations
  useCdn: false,
});

/**
 * Transform hotel data for Sanity
 * @param {Object} hotel - Hotel data from sampleHotels
 * @returns {Object} Sanity document
 */
function transformHotelData(hotel) {
  return {
    _type: 'hotel',
    name: hotel.name,
    slug: {
      _type: 'slug',
      current: hotel.slug
    },
    category: hotel.category,
    location: hotel.location,
    city: hotel.city,
    country: hotel.country,
    rating: hotel.rating,
    reviewRating: hotel.reviewRating,
    price: hotel.price,
    originalPrice: hotel.originalPrice,
    image: hotel.image,
    gallery: hotel.gallery || [],
    description: hotel.description,
    highlights: hotel.highlights || [],
    amenities: hotel.amenities || [],
    roomTypes: (hotel.roomTypes || []).map(room => ({
      _key: `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: room.type,
      price: room.price,
      capacity: room.capacity,
      size: room.size,
      bedType: room.bedType,
      amenities: room.amenities || [],
      image: room.image || ''
    })),
    checkIn: hotel.checkIn || '',
    checkOut: hotel.checkOut || '',
    policies: hotel.policies || [],
    cancellationPolicy: hotel.cancellationPolicy || '',
    nearbyAttractions: (hotel.nearbyAttractions || []).map(attraction => ({
      _key: `attraction-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: attraction.name,
      distance: attraction.distance
    })),
    address: hotel.address || '',
    phone: hotel.phone || '',
    email: hotel.email || '',
    website: hotel.website || '',
    mapLink: hotel.mapLink || '',
    featured: hotel.featured || false,
    active: hotel.active !== undefined ? hotel.active : true
  };
}

/**
 * Migrate a single hotel to Sanity
 * @param {Object} hotel - Hotel data
 * @param {number} index - Hotel index
 */
async function migrateHotel(hotel, index) {
  try {
    const sanityHotel = transformHotelData(hotel);
    
    // Check if hotel already exists
    const existing = await client.fetch(
      `*[_type == "hotel" && slug.current == $slug][0]`,
      { slug: hotel.slug }
    );

    let result;
    if (existing) {
      // Update existing hotel
      result = await client
        .patch(existing._id)
        .set(sanityHotel)
        .commit();
      console.log(`✅ Updated: ${hotel.name} (${index + 1}/${sampleHotels.length})`);
    } else {
      // Create new hotel
      result = await client.create(sanityHotel);
      console.log(`✅ Created: ${hotel.name} (${index + 1}/${sampleHotels.length})`);
    }
    
    return result;
  } catch (error) {
    console.error(`❌ Error migrating ${hotel.name}:`, error.message);
    throw error;
  }
}

/**
 * Main migration function
 */
async function migrateAllHotels() {
  console.log('🚀 Starting hotel data migration to Sanity...\n');
  console.log(`📊 Total hotels to migrate: ${sampleHotels.length}\n`);
  
  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < sampleHotels.length; i++) {
    try {
      await migrateHotel(sampleHotels[i], i);
      successCount++;
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      failureCount++;
      console.error(`Failed to migrate hotel ${i + 1}:`, error);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✨ Migration Complete!');
  console.log('='.repeat(60));
  console.log(`✅ Successfully migrated: ${successCount} hotels`);
  if (failureCount > 0) {
    console.log(`❌ Failed: ${failureCount} hotels`);
  }
  console.log('\n📍 Breakdown by category:');
  
  const domestic = sampleHotels.filter(h => h.category === 'domestic').length;
  const international = sampleHotels.filter(h => h.category === 'international').length;
  
  console.log(`   - Domestic: ${domestic} hotels`);
  console.log(`   - International: ${international} hotels`);
  console.log('\n🎉 You can now view the hotels in Sanity Studio!');
}

// Run migration
migrateAllHotels()
  .then(() => {
    console.log('\n✅ Migration script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration script failed:', error);
    process.exit(1);
  });
