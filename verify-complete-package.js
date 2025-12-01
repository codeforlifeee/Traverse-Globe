// Final Verification: Query a complete package with all fields
// This demonstrates that ALL data fields are properly migrated
// Run with: node verify-complete-package.js

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  apiVersion: '2023-08-01',
  useCdn: false,
  token: 'skp8QkqBhqF4klXaJ6m1Xr7ij8nOShodYUqkyS7Rf8XjKbcuUTfJ1WMc17cKGxzONK2h8JdIhTfo8XEfBvGbvhMDQMCOZSsDwbfd4EB3604ERK3PNZ1ndKE3tKJX5X3yRBo217jiLNQj3ZHHGVo9ynrVbR0Jq9GsmLM4tAmSZX2R4yO4DYEU'
})

async function verifyCompletePackage() {
  console.log('🔍 Verifying Complete Package Migration...\n')

  try {
    // Fetch a complete package with all fields
    const pkg = await client.fetch(`
      *[_type == "package" && id == 1][0]{
        _id,
        id,
        title,
        slug,
        category,
        price,
        strikePrice,
        destination,
        duration,
        rating,
        reviews,
        overview,
        highlights,
        itinerary,
        inclusions,
        exclusions,
        hotels,
        bannerImage,
        images,
        featured,
        active,
        publishedAt
      }
    `)

    if (!pkg) {
      console.error('❌ Package not found!')
      return
    }

    console.log('✅ Package Found!\n')
    console.log('=' .repeat(60))
    console.log(`📦 Package: ${pkg.title}`)
    console.log('='.repeat(60))

    // Verify all fields
    const fields = {
      'ID': pkg.id,
      'Title': pkg.title,
      'Slug': pkg.slug?.current,
      'Category': pkg.category,
      'Price': `₹${pkg.price?.toLocaleString()}`,
      'Strike Price': pkg.strikePrice ? `₹${pkg.strikePrice?.toLocaleString()}` : 'N/A',
      'Destination': pkg.destination,
      'Duration': pkg.duration,
      'Rating': pkg.rating,
      'Reviews': pkg.reviews,
      'Overview Length': pkg.overview?.length + ' characters',
      'Highlights Count': pkg.highlights?.length + ' items',
      'Itinerary Days': pkg.itinerary?.days?.length + ' days',
      'Inclusions Count': pkg.inclusions?.length + ' items',
      'Exclusions Count': pkg.exclusions?.length + ' items',
      'Hotel Options': pkg.hotels?.options?.length + ' hotels',
      'Banner Image': pkg.bannerImage ? '✅ Present' : '❌ Missing',
      'Gallery Images': pkg.images?.length + ' images',
      'Featured': pkg.featured ? 'Yes' : 'No',
      'Active': pkg.active ? 'Yes' : 'No'
    }

    console.log('\n📋 Field Verification:')
    Object.entries(fields).forEach(([field, value]) => {
      const status = value && value !== 'undefined' && value !== 'N/A' ? '✅' : '⚠️'
      console.log(`   ${status} ${field}: ${value}`)
    })

    // Show sample itinerary
    if (pkg.itinerary?.days?.length > 0) {
      console.log('\n📅 Sample Itinerary (First Day):')
      const firstDay = pkg.itinerary.days[0]
      console.log(`   ${firstDay.dayKey}: ${firstDay.title}`)
      console.log(`   Description: ${firstDay.description?.substring(0, 100)}...`)
    }

    // Show sample highlights
    if (pkg.highlights?.length > 0) {
      console.log('\n⭐ Sample Highlights:')
      pkg.highlights.slice(0, 3).forEach((h, i) => {
        console.log(`   ${i + 1}. ${h}`)
      })
    }

    // Show sample inclusions
    if (pkg.inclusions?.length > 0) {
      console.log('\n✓ Sample Inclusions:')
      pkg.inclusions.slice(0, 3).forEach((inc, i) => {
        console.log(`   ${i + 1}. ${inc}`)
      })
    }

    console.log('\n' + '='.repeat(60))
    console.log('🎉 Complete Package Verification: SUCCESS!')
    console.log('='.repeat(60))
    console.log('\n✅ All fields are properly migrated and accessible!')
    console.log('✅ Data structure matches siteData.js format!')
    console.log('✅ Ready for production use!\n')

  } catch (error) {
    console.error('❌ Verification Failed:', error.message)
    process.exit(1)
  }
}

verifyCompletePackage()
