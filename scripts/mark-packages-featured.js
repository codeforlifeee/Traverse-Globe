/**
 * Script to mark some packages as featured in Sanity
 * This will randomly select packages and mark them as featured
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skp8QkqBhqF4klXaJ6m1Xr7ij8nOShodYUqkyS7Rf8XjKbcuUTfJ1WMc17cKGxzONK2h8JdIhTfo8XEfBvGbvhMDQMCOZSsDwbfd4EB3604ERK3PNZ1ndKE3tKJX5X3yRBo217jiLNQj3ZHHGVo9ynrVbR0Jq9GsmLM4tAmSZX2R4yO4DYEU', // Read-write token
});

async function markPackagesAsFeatured() {
  console.log('\n🎯 Marking packages as featured...\n');

  try {
    // Get all active packages
    const allPackages = await client.fetch(
      '*[_type == "package" && active == true] | order(rating desc, price asc)'
    );

    console.log(`📦 Found ${allPackages.length} active packages`);

    if (allPackages.length === 0) {
      console.log('❌ No packages found to mark as featured');
      return;
    }

    // Select packages to feature:
    // - Top rated packages (rating >= 4.5)
    // - From different categories
    // - Good price variety
    const categoriesToFeature = ['uae', 'bali', 'thailand', 'singapore', 'srilanka', 'vietnam', 'andaman', 'kashmir', 'kerala'];
    const packagesToFeature = [];

    // Get 2-3 packages from each category
    for (const category of categoriesToFeature) {
      const categoryPackages = allPackages
        .filter(pkg => pkg.category === category && pkg.rating >= 4.0)
        .slice(0, 3); // Take top 3 from each category
      
      packagesToFeature.push(...categoryPackages);
    }

    // Limit to 20 featured packages
    const finalFeaturedPackages = packagesToFeature.slice(0, 20);

    console.log(`\n✨ Marking ${finalFeaturedPackages.length} packages as featured:\n`);

    // Update each package
    let updated = 0;
    for (const pkg of finalFeaturedPackages) {
      try {
        await client
          .patch(pkg._id)
          .set({ featured: true })
          .commit();
        
        console.log(`   ✅ ${pkg.title} (${pkg.category}) - ₹${pkg.price.toLocaleString()}`);
        updated++;
      } catch (error) {
        console.error(`   ❌ Failed to update ${pkg.title}:`, error.message);
      }
    }

    console.log(`\n✅ Successfully marked ${updated} packages as featured!`);
    console.log('\n💡 Now refresh your website to see featured packages on the home page.');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check that you have a valid Sanity write token');
    console.log('   2. Verify the token has proper permissions');
    console.log('   3. Check network connection');
  }
}

markPackagesAsFeatured();
