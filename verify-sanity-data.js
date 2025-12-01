/**
 * Sanity Data Verification Script
 * Run this to verify your Sanity data is loading correctly
 * Usage: node verify-sanity-data.js
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  perspective: 'published',
});

async function verifyData() {
  console.log('\n🔍 Verifying Sanity CMS Data...\n');

  try {
    // Test 1: Check International Destinations
    console.log('📍 Testing International Destinations...');
    const intlDest = await client.fetch('*[_type == "destination" && active == true && type == "international"] | order(order asc)');
    console.log(`   ✅ Found ${intlDest.length} international destinations`);
    if (intlDest.length > 0) {
      console.log(`   First: ${intlDest[0].title}`);
    }

    // Test 2: Check Domestic Destinations
    console.log('\n📍 Testing Domestic Destinations...');
    const domDest = await client.fetch('*[_type == "destination" && active == true && type == "domestic"] | order(order asc)');
    console.log(`   ✅ Found ${domDest.length} domestic destinations`);
    if (domDest.length > 0) {
      console.log(`   First: ${domDest[0].title}`);
    }

    // Test 3: Check Featured Packages
    console.log('\n📦 Testing Featured Packages...');
    const packages = await client.fetch('*[_type == "package" && active == true && featured == true] | order(publishedAt desc)[0...20]');
    console.log(`   ✅ Found ${packages.length} featured packages`);
    if (packages.length > 0) {
      console.log(`   First: ${packages[0].title} - ₹${packages[0].price}`);
    }

    // Test 4: Check Banners
    console.log('\n🖼️  Testing Banners...');
    const banners = await client.fetch('*[_type == "banner" && category == "general" && active == true][0].images');
    console.log(`   ✅ Found ${banners ? banners.length : 0} banner images`);

    // Test 5: Check Total Documents
    console.log('\n📊 Document Statistics...');
    const totalPackages = await client.fetch('count(*[_type == "package" && active == true])');
    const totalDestinations = await client.fetch('count(*[_type == "destination" && active == true])');
    const totalBanners = await client.fetch('count(*[_type == "banner" && active == true])');
    console.log(`   📦 Total Packages: ${totalPackages}`);
    console.log(`   📍 Total Destinations: ${totalDestinations}`);
    console.log(`   🖼️  Total Banners: ${totalBanners}`);

    // Summary
    console.log('\n✅ All Sanity checks passed!');
    console.log('\n💡 If sections are not showing on website:');
    console.log('   1. Hard refresh browser (Ctrl+Shift+R)');
    console.log('   2. Clear browser cache');
    console.log('   3. Check browser console for errors');
    console.log('   4. Verify CSP allows Sanity API connections');

  } catch (error) {
    console.error('\n❌ Error connecting to Sanity:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check project ID is correct: xe1685rk');
    console.log('   2. Verify dataset is "production"');
    console.log('   3. Check network connection');
    console.log('   4. Verify CORS settings in Sanity dashboard');
  }
}

verifyData();
