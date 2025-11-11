/**
 * Service Worker Diagnostics
 * Run this in the browser console to diagnose issues
 */

async function diagnoseSW() {
  console.log('🔍 Service Worker Diagnostics');
  console.log('================================\n');

  // Check if SW is supported
  if (!('serviceWorker' in navigator)) {
    console.error('❌ Service Workers are not supported');
    return;
  }

  console.log('✅ Service Workers are supported\n');

  // Check registrations
  const registrations = await navigator.serviceWorker.getRegistrations();
  console.log(`📋 Active registrations: ${registrations.length}`);
  
  registrations.forEach((reg, i) => {
    console.log(`\nRegistration ${i + 1}:`);
    console.log(`  Scope: ${reg.scope}`);
    console.log(`  Active: ${!!reg.active}`);
    console.log(`  Installing: ${!!reg.installing}`);
    console.log(`  Waiting: ${!!reg.waiting}`);
  });

  // Check caches
  console.log('\n📦 Cache Storage:');
  const cacheNames = await caches.keys();
  console.log(`  Total caches: ${cacheNames.length}`);
  
  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    console.log(`\n  ${name}:`);
    console.log(`    Entries: ${keys.length}`);
    
    // Show some entries
    if (keys.length > 0) {
      console.log('    Sample entries:');
      keys.slice(0, 3).forEach(key => {
        console.log(`      - ${key.url.substring(0, 80)}...`);
      });
    }
  }

  // Check Unsplash images specifically
  console.log('\n🖼️  Unsplash Image Cache:');
  const unsplashCache = cacheNames.find(name => name.includes('unsplash'));
  
  if (unsplashCache) {
    const cache = await caches.open(unsplashCache);
    const keys = await cache.keys();
    const unsplashUrls = keys.filter(key => key.url.includes('unsplash.com'));
    
    console.log(`  Cached Unsplash images: ${unsplashUrls.length}`);
    
    if (unsplashUrls.length > 0) {
      console.log('  URLs:');
      unsplashUrls.slice(0, 5).forEach(key => {
        console.log(`    - ${key.url}`);
      });
    }
  } else {
    console.log('  ⚠️  No Unsplash cache found');
  }

  // Test image loading
  console.log('\n🧪 Testing Image Load:');
  const testUrl = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80';
  
  try {
    const response = await fetch(testUrl, {
      mode: 'cors',
      credentials: 'omit'
    });
    
    console.log(`  ✅ Test fetch successful (${response.status})`);
    console.log(`  Type: ${response.type}`);
    console.log(`  Headers:`, Object.fromEntries(response.headers.entries()));
  } catch (error) {
    console.error('  ❌ Test fetch failed:', error.message);
  }

  console.log('\n================================');
  console.log('Diagnostics complete!');
}

// Utility to clear all caches
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  console.log(`🗑️  Clearing ${cacheNames.length} caches...`);
  
  await Promise.all(
    cacheNames.map(name => {
      console.log(`  Deleting: ${name}`);
      return caches.delete(name);
    })
  );
  
  console.log('✅ All caches cleared!');
}

// Utility to unregister all service workers
async function unregisterAllSW() {
  const registrations = await navigator.serviceWorker.getRegistrations();
  console.log(`🗑️  Unregistering ${registrations.length} service workers...`);
  
  await Promise.all(
    registrations.map(reg => {
      console.log(`  Unregistering: ${reg.scope}`);
      return reg.unregister();
    })
  );
  
  console.log('✅ All service workers unregistered!');
}

// Utility to completely reset
async function resetServiceWorker() {
  console.log('🔄 Resetting Service Worker...\n');
  await clearAllCaches();
  await unregisterAllSW();
  console.log('\n✅ Reset complete! Reload the page to register a fresh service worker.');
}

// Export functions
window.swDiagnostics = {
  diagnose: diagnoseSW,
  clearCaches: clearAllCaches,
  unregisterAll: unregisterAllSW,
  reset: resetServiceWorker
};

console.log('%c Service Worker Diagnostics Loaded! ', 'background: #4CAF50; color: white; padding: 5px 10px; font-weight: bold;');
console.log('Run these commands in the console:');
console.log('  swDiagnostics.diagnose()     - Check SW status');
console.log('  swDiagnostics.clearCaches()  - Clear all caches');
console.log('  swDiagnostics.unregisterAll() - Unregister all SWs');
console.log('  swDiagnostics.reset()        - Complete reset');
