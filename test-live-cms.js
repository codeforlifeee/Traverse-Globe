// Test Script: Verify Live CMS Updates
// Run this to check if your CMS updates are working

import { createClient } from '@sanity/client';

// Sanity client WITHOUT CDN (gets fresh data)
const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  apiVersion: '2023-08-01',
  useCdn: false, // IMPORTANT: No CDN for live updates
  perspective: 'published',
});

async function testLiveUpdates() {
  console.log('🧪 Testing Live CMS Updates...\n');

  try {
    // Fetch the Andaman package
    const packageSlug = '4-star-alluring-andamans-4n-5d';
    const query = `*[_type == "package" && slug.current == "${packageSlug}"][0]{
      _id,
      _updatedAt,
      packageTitle,
      price,
      strikePrice,
      rating,
      numberOfReviews,
      active,
      featured
    }`;

    console.log('📡 Fetching package from Sanity (NO CDN)...');
    const packageData = await client.fetch(query);

    if (!packageData) {
      console.error('❌ Package not found!');
      return;
    }

    console.log('\n✅ Package Found:\n');
    console.log(`   📦 Title: ${packageData.packageTitle}`);
    console.log(`   💰 Price: ₹${packageData.price?.toLocaleString('en-IN')}`);
    if (packageData.strikePrice) {
      console.log(`   🏷️  Strike Price: ₹${packageData.strikePrice?.toLocaleString('en-IN')}`);
    }
    console.log(`   ⭐ Rating: ${packageData.rating} (${packageData.numberOfReviews} reviews)`);
    console.log(`   📅 Last Updated: ${new Date(packageData._updatedAt).toLocaleString()}`);
    console.log(`   ✅ Active: ${packageData.active}`);
    console.log(`   🌟 Featured: ${packageData.featured}`);

    console.log('\n🔍 Testing Update Detection...');
    console.log('   ℹ️  Try this:');
    console.log('   1. Update this package in Sanity CMS');
    console.log('   2. Click PUBLISH');
    console.log('   3. Wait 10 seconds');
    console.log('   4. Run this script again: node test-live-cms.js');
    console.log('   5. The "Last Updated" time should change!');

    console.log('\n📊 Quick Stats:');
    const stats = await client.fetch(`{
      "totalPackages": count(*[_type == "package"]),
      "activePackages": count(*[_type == "package" && active == true]),
      "featuredPackages": count(*[_type == "package" && featured == true])
    }`);
    console.log(`   📦 Total Packages: ${stats.totalPackages}`);
    console.log(`   ✅ Active Packages: ${stats.activePackages}`);
    console.log(`   🌟 Featured Packages: ${stats.featuredPackages}`);

    console.log('\n✅ Live CMS connection working!\n');
    console.log('🎯 Your website will now show updates within 10-30 seconds!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Possible issues:');
    console.error('   - Check VITE_SANITY_PROJECT_ID in .env');
    console.error('   - Verify internet connection');
    console.error('   - Ensure Sanity project is accessible');
  }
}

// Run the test
testLiveUpdates();
