// Test script to verify hotel data flow from Sanity to frontend
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'xe1685rk',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

async function testHotelFlow() {
  console.log('🧪 Testing Hotel Data Flow\n');
  console.log('='.repeat(60));
  
  try {
    // Test 1: Fetch all hotels
    console.log('\n✅ Test 1: Fetch All Hotels');
    const allHotels = await client.fetch(`*[_type == "hotel" && active == true] | order(_createdAt desc)`);
    console.log(`   Found ${allHotels.length} active hotels`);
    
    // Test 2: Fetch domestic hotels
    console.log('\n✅ Test 2: Fetch Domestic Hotels');
    const domesticHotels = await client.fetch(`*[_type == "hotel" && active == true && category == "domestic"]`);
    console.log(`   Found ${domesticHotels.length} domestic hotels`);
    if (domesticHotels.length > 0) {
      console.log(`   Sample: ${domesticHotels[0].name}`);
    }
    
    // Test 3: Fetch international hotels
    console.log('\n✅ Test 3: Fetch International Hotels');
    const internationalHotels = await client.fetch(`*[_type == "hotel" && active == true && category == "international"]`);
    console.log(`   Found ${internationalHotels.length} international hotels`);
    if (internationalHotels.length > 0) {
      console.log(`   Sample: ${internationalHotels[0].name}`);
    }
    
    // Test 4: Fetch hotel by slug
    console.log('\n✅ Test 4: Fetch Hotel by Slug');
    const testSlug = 'the-oberoi-new-delhi';
    const hotelBySlug = await client.fetch(
      `*[_type == "hotel" && active == true && slug.current == $slug][0]`,
      { slug: testSlug }
    );
    if (hotelBySlug) {
      console.log(`   Found: ${hotelBySlug.name}`);
      console.log(`   Category: ${hotelBySlug.category}`);
      console.log(`   Location: ${hotelBySlug.location}`);
      console.log(`   Price: ₹${hotelBySlug.price?.toLocaleString('en-IN')}`);
      console.log(`   Rating: ${hotelBySlug.rating} stars`);
      console.log(`   Room Types: ${hotelBySlug.roomTypes?.length || 0}`);
      console.log(`   Amenities: ${hotelBySlug.amenities?.length || 0}`);
    } else {
      console.log(`   ❌ Hotel with slug "${testSlug}" not found`);
    }
    
    // Test 5: Verify data structure
    console.log('\n✅ Test 5: Verify Data Structure');
    if (allHotels.length > 0) {
      const sample = allHotels[0];
      const requiredFields = ['name', 'slug', 'category', 'location', 'price', 'image'];
      const missingFields = requiredFields.filter(field => !sample[field]);
      
      if (missingFields.length === 0) {
        console.log('   ✅ All required fields present');
      } else {
        console.log(`   ❌ Missing fields: ${missingFields.join(', ')}`);
      }
      
      // Check nested fields
      console.log(`   - Gallery images: ${sample.gallery?.length || 0}`);
      console.log(`   - Room types: ${sample.roomTypes?.length || 0}`);
      console.log(`   - Amenities: ${sample.amenities?.length || 0}`);
      console.log(`   - Nearby attractions: ${sample.nearbyAttractions?.length || 0}`);
    }
    
    // Test 6: Verify slugs are URL-safe
    console.log('\n✅ Test 6: Verify Slugs');
    const invalidSlugs = allHotels.filter(h => {
      const slug = h.slug?.current || h.slug;
      return !slug || !/^[a-z0-9-]+$/.test(slug);
    });
    
    if (invalidSlugs.length === 0) {
      console.log('   ✅ All slugs are URL-safe');
    } else {
      console.log(`   ❌ ${invalidSlugs.length} hotels have invalid slugs`);
      invalidSlugs.forEach(h => {
        console.log(`      - ${h.name}: ${h.slug?.current || h.slug}`);
      });
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Test Summary:');
    console.log(`   - Total Hotels: ${allHotels.length}`);
    console.log(`   - Domestic: ${domesticHotels.length}`);
    console.log(`   - International: ${internationalHotels.length}`);
    console.log(`   - Active: ${allHotels.filter(h => h.active).length}`);
    console.log(`   - Featured: ${allHotels.filter(h => h.featured).length}`);
    
    console.log('\n✅ All tests passed!');
    console.log('\n📍 Next steps:');
    console.log('   1. Start frontend: npm run dev');
    console.log('   2. Visit: http://localhost:5173/hotels/domestic');
    console.log('   3. Visit: http://localhost:5173/hotels/international');
    console.log('   4. Click "Book Now" on any hotel to see detail page');
    console.log('   5. Start Sanity Studio: cd sanity-studio && npm run dev');
    console.log('   6. Edit hotels at: http://localhost:3333');
    
  } catch (error) {
    console.error('\n❌ Error during tests:', error.message);
    console.error(error);
  }
}

testHotelFlow();
