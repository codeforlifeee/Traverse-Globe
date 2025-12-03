// Quick script to verify hotels in Sanity
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'xe1685rk',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

async function checkHotels() {
  try {
    console.log('🔍 Checking hotels in Sanity...\n');
    
    const hotels = await client.fetch(`*[_type == "hotel"] | order(_createdAt desc) {
      name,
      category,
      "slug": slug.current,
      active,
      price,
      location
    }`);
    
    console.log(`✅ Found ${hotels.length} hotels in Sanity\n`);
    
    if (hotels.length > 0) {
      console.log('📋 Sample hotels:');
      hotels.slice(0, 5).forEach((hotel, i) => {
        console.log(`${i + 1}. ${hotel.name} (${hotel.category}) - ${hotel.location} - ₹${hotel.price}`);
      });
      
      const domestic = hotels.filter(h => h.category === 'domestic').length;
      const international = hotels.filter(h => h.category === 'international').length;
      
      console.log(`\n📊 Breakdown:`);
      console.log(`   - Domestic: ${domestic}`);
      console.log(`   - International: ${international}`);
    } else {
      console.log('❌ No hotels found in Sanity!');
      console.log('Run: node migrate-hotels.js');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkHotels();
