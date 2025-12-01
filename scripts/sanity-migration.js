/**
 * Sanity CMS Migration Script
 * This script migrates all data from siteData.js to Sanity CMS
 * 
 * Prerequisites:
 * 1. Install @sanity/client: npm install @sanity/client
 * 2. Ensure Sanity project is set up and running
 * 3. Update the credentials in this file with your actual Sanity project details
 * 
 * Usage:
 * node scripts/sanity-migration.js
 */

import { createClient } from '@sanity/client';
import {
  banners,
  laosBanners,
  uaeBanners,
  baliBanners,
  thailandBanners,
  singaporeBanners,
  vietnamBanners,
  srilankaBanners,
  andamanBanners,
  jaipurBanners,
  keralaBanners,
  kashmirBanners,
  internationalDestinations,
  domesticDestinations,
  uaePackages,
  baliPackages,
  thailandPackages,
  singaporePackages,
  srilankaPackages,
  vietnamPackages,
  laosPackages,
  andamanPackages,
  jaipurPackages,
  keralaPackages,
  kashmirPackages
} from '../src/data/siteData.js';

// Sanity Client Configuration
const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skp8QkqBhqF4klXaJ6m1Xr7ij8nOShodYUqkyS7Rf8XjKbcuUTfJ1WMc17cKGxzONK2h8JdIhTfo8XEfBvGbvhMDQMCOZSsDwbfd4EB3604ERK3PNZ1ndKE3tKJX5X3yRBo217jiLNQj3ZHHGVo9ynrVbR0Jq9GsmLM4tAmSZX2R4yO4DYEU'
});

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[`"''`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Helper function to transform itinerary object to array format
function transformItinerary(itineraryObj) {
  if (!itineraryObj || typeof itineraryObj !== 'object') {
    return { days: [] };
  }

  const days = Object.keys(itineraryObj).map(dayKey => ({
    dayKey: dayKey,
    title: itineraryObj[dayKey].title || '',
    description: itineraryObj[dayKey].description || ''
  }));

  return { days };
}

// Helper function to transform package data for Sanity
function transformPackage(pkg) {
  const slug = generateSlug(pkg.title);
  
  return {
    _type: 'package',
    id: pkg.id,
    slug: {
      _type: 'slug',
      current: slug
    },
    category: pkg.category,
    title: pkg.title,
    price: pkg.price,
    strikePrice: pkg.strikePrice || null,
    destination: pkg.destination,
    duration: pkg.duration,
    rating: pkg.rating,
    reviews: pkg.reviews,
    overview: pkg.overview,
    highlights: pkg.highlights || [],
    itinerary: transformItinerary(pkg.itinerary),
    inclusions: pkg.inclusions || [],
    exclusions: pkg.exclusions || [],
    hotels: pkg.hotels ? {
      title: pkg.hotels.title || '',
      options: pkg.hotels.options || [],
      note: pkg.hotels.note || ''
    } : null,
    bannerImage: pkg.bannerImage || (pkg.images && pkg.images[0]) || '',
    images: pkg.images || [],
    featured: pkg.featured || false,
    active: true,
    publishedAt: new Date().toISOString()
  };
}

// Helper function to create banner documents
function createBannerDocument(name, category, imageArray) {
  return {
    _type: 'banner',
    name: name,
    category: category,
    images: imageArray || [],
    active: true
  };
}

// Helper function to create destination documents
function createDestinationDocument(dest, type, order) {
  const slug = generateSlug(dest.title);
  
  return {
    _type: 'destination',
    title: dest.title,
    slug: {
      _type: 'slug',
      current: slug
    },
    image: dest.image,
    link: dest.link,
    type: type,
    order: order,
    active: true,
    description: dest.description || ''
  };
}

// Migration Functions
async function migrateBanners() {
  console.log('\n📸 Migrating Banners...');
  
  const bannersToMigrate = [
    createBannerDocument('General Banners', 'general', banners),
    createBannerDocument('Laos Banners', 'laos', laosBanners),
    createBannerDocument('UAE Banners', 'uae', uaeBanners),
    createBannerDocument('Bali Banners', 'bali', baliBanners),
    createBannerDocument('Thailand Banners', 'thailand', thailandBanners),
    createBannerDocument('Singapore Banners', 'singapore', singaporeBanners),
    createBannerDocument('Vietnam Banners', 'vietnam', vietnamBanners),
    createBannerDocument('Sri Lanka Banners', 'srilanka', srilankaBanners),
    createBannerDocument('Andaman Banners', 'andaman', andamanBanners),
    createBannerDocument('Jaipur Banners', 'jaipur', jaipurBanners),
    createBannerDocument('Kerala Banners', 'kerala', keralaBanners),
    createBannerDocument('Kashmir Banners', 'kashmir', kashmirBanners)
  ];

  let successCount = 0;
  let failCount = 0;

  for (const banner of bannersToMigrate) {
    try {
      const result = await client.create(banner);
      console.log(`✅ Created banner: ${banner.name}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to create banner ${banner.name}:`, error.message);
      failCount++;
    }
  }

  console.log(`\n✨ Banners Migration Complete: ${successCount} success, ${failCount} failed`);
}

async function migrateDestinations() {
  console.log('\n🌍 Migrating Destinations...');
  
  const destinationsToMigrate = [
    ...internationalDestinations.map((dest, index) => 
      createDestinationDocument(dest, 'international', index)
    ),
    ...domesticDestinations.map((dest, index) => 
      createDestinationDocument(dest, 'domestic', index + 100)
    )
  ];

  let successCount = 0;
  let failCount = 0;

  for (const destination of destinationsToMigrate) {
    try {
      const result = await client.create(destination);
      console.log(`✅ Created destination: ${destination.title}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to create destination ${destination.title}:`, error.message);
      failCount++;
    }
  }

  console.log(`\n✨ Destinations Migration Complete: ${successCount} success, ${failCount} failed`);
}

async function migratePackages() {
  console.log('\n📦 Migrating Packages...');
  
  const allPackages = [
    ...(uaePackages || []),
    ...(baliPackages || []),
    ...(thailandPackages || []),
    ...(singaporePackages || []),
    ...(srilankaPackages || []),
    ...(vietnamPackages || []),
    ...(laosPackages || []),
    ...(andamanPackages || []),
    ...(jaipurPackages || []),
    ...(keralaPackages || []),
    ...(kashmirPackages || [])
  ];

  console.log(`Total packages to migrate: ${allPackages.length}`);

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  for (const pkg of allPackages) {
    if (!pkg || !pkg.id || !pkg.title) {
      console.warn(`⚠️  Skipping invalid package:`, pkg?.title || 'Unknown');
      skippedCount++;
      continue;
    }

    try {
      const transformedPackage = transformPackage(pkg);
      const result = await client.create(transformedPackage);
      console.log(`✅ Created package [ID: ${pkg.id}]: ${pkg.title}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to create package [ID: ${pkg.id}] ${pkg.title}:`, error.message);
      failCount++;
    }
  }

  console.log(`\n✨ Packages Migration Complete: ${successCount} success, ${failCount} failed, ${skippedCount} skipped`);
}

// Main Migration Function
async function runMigration() {
  console.log('🚀 Starting Sanity CMS Migration...');
  console.log('Project ID:', client.config().projectId);
  console.log('Dataset:', client.config().dataset);
  console.log('─'.repeat(60));

  try {
    // Test connection
    await client.fetch('*[_type == "package"][0]');
    console.log('✅ Successfully connected to Sanity');

    // Run migrations in sequence
    await migrateBanners();
    await migrateDestinations();
    await migratePackages();

    console.log('\n' + '─'.repeat(60));
    console.log('🎉 Migration Complete!');
    console.log('\nNext steps:');
    console.log('1. Verify data in Sanity Studio (http://localhost:3333)');
    console.log('2. Update frontend components to fetch from Sanity');
    console.log('3. Test all pages and package details');
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
}

// Cleanup function (optional - use with caution!)
async function cleanupSanityData() {
  console.log('\n🗑️  WARNING: This will delete ALL data in Sanity!');
  console.log('Deleting packages...');
  
  try {
    const packages = await client.fetch('*[_type == "package"]._id');
    for (const id of packages) {
      await client.delete(id);
    }
    console.log(`Deleted ${packages.length} packages`);

    const bannersDocs = await client.fetch('*[_type == "banner"]._id');
    for (const id of bannersDocs) {
      await client.delete(id);
    }
    console.log(`Deleted ${bannersDocs.length} banners`);

    const destinations = await client.fetch('*[_type == "destination"]._id');
    for (const id of destinations) {
      await client.delete(id);
    }
    console.log(`Deleted ${destinations.length} destinations`);

    console.log('✅ Cleanup complete');
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  }
}

// Command line arguments handling
const args = process.argv.slice(2);

if (args.includes('--cleanup')) {
  cleanupSanityData().then(() => process.exit(0));
} else if (args.includes('--packages-only')) {
  migratePackages().then(() => process.exit(0));
} else if (args.includes('--banners-only')) {
  migrateBanners().then(() => process.exit(0));
} else if (args.includes('--destinations-only')) {
  migrateDestinations().then(() => process.exit(0));
} else {
  runMigration().then(() => process.exit(0));
}
