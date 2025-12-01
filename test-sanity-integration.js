// Quick Test Script to Verify Sanity Integration
// Run this with: node test-sanity-integration.js

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  apiVersion: '2023-08-01',
  useCdn: false,
  token: 'skp8QkqBhqF4klXaJ6m1Xr7ij8nOShodYUqkyS7Rf8XjKbcuUTfJ1WMc17cKGxzONK2h8JdIhTfo8XEfBvGbvhMDQMCOZSsDwbfd4EB3604ERK3PNZ1ndKE3tKJX5X3yRBo217jiLNQj3ZHHGVo9ynrVbR0Jq9GsmLM4tAmSZX2R4yO4DYEU'
})

async function testSanityIntegration() {
  console.log('🧪 Testing Sanity CMS Integration...\n')

  try {
    // Test 1: Get all packages
    console.log('Test 1: Fetching all packages...')
    const packages = await client.fetch('*[_type == "package"]')
    console.log(`✅ Found ${packages.length} packages`)

    // Test 2: Get featured packages
    console.log('\nTest 2: Fetching featured packages...')
    const featured = await client.fetch('*[_type == "package" && featured == true]')
    console.log(`✅ Found ${featured.length} featured packages`)

    // Test 3: Get packages by category
    console.log('\nTest 3: Fetching UAE packages...')
    const uaePackages = await client.fetch('*[_type == "package" && category == "uae"]')
    console.log(`✅ Found ${uaePackages.length} UAE packages`)

    // Test 4: Get single package
    console.log('\nTest 4: Fetching single package...')
    const singlePackage = await client.fetch('*[_type == "package" && id == 1][0]')
    console.log(`✅ Found package: ${singlePackage.title}`)

    // Test 5: Get banners
    console.log('\nTest 5: Fetching banners...')
    const banners = await client.fetch('*[_type == "banner"]')
    console.log(`✅ Found ${banners.length} banner groups`)

    // Test 6: Get destinations
    console.log('\nTest 6: Fetching destinations...')
    const destinations = await client.fetch('*[_type == "destination"]')
    console.log(`✅ Found ${destinations.length} destinations`)

    // Summary
    console.log('\n' + '='.repeat(50))
    console.log('🎉 All Tests Passed!')
    console.log('='.repeat(50))
    console.log(`\n📊 Summary:`)
    console.log(`   • Total Packages: ${packages.length}`)
    console.log(`   • Featured Packages: ${featured.length}`)
    console.log(`   • UAE Packages: ${uaePackages.length}`)
    console.log(`   • Banner Groups: ${banners.length}`)
    console.log(`   • Destinations: ${destinations.length}`)
    console.log(`\n✅ Sanity CMS is working perfectly!`)
    console.log(`\n🌐 Studio URL: http://localhost:3333`)
    console.log(`📚 See SANITY-QUICK-START.md for integration guide\n`)

  } catch (error) {
    console.error('❌ Test Failed:', error.message)
    process.exit(1)
  }
}

testSanityIntegration()
