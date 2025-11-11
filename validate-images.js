// Image URL Validator - Check all image URLs in siteData.js
// Run with: node validate-images.js

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Validating Image URLs...\n');

// Read siteData.js
const siteDataPath = join(__dirname, 'src', 'data', 'siteData.js');
const content = readFileSync(siteDataPath, 'utf-8');

// Extract all image URLs
const urlRegex = /(https?:\/\/[^\s'"]+)/g;
const urls = content.match(urlRegex) || [];

// Categorize URLs
const categories = {
  pexels: [],
  unsplash: [],
  other: []
};

urls.forEach(url => {
  const cleanUrl = url.replace(/[,;)\]]/g, '');
  if (cleanUrl.includes('pexels.com')) {
    categories.pexels.push(cleanUrl);
  } else if (cleanUrl.includes('unsplash.com')) {
    categories.unsplash.push(cleanUrl);
  } else {
    categories.other.push(cleanUrl);
  }
});

// Validation checks
const checks = {
  pexelsParams: true,
  unsplashParams: true,
  issues: []
};

console.log('📊 Image URL Statistics:\n');
console.log(`  Pexels images: ${categories.pexels.length}`);
console.log(`  Unsplash images: ${categories.unsplash.length}`);
console.log(`  Other images: ${categories.other.length}`);
console.log(`  Total: ${urls.length}\n`);

// Check Pexels URLs
console.log('🔍 Checking Pexels URLs...\n');
categories.pexels.forEach((url, idx) => {
  const hasAutoCompress = url.includes('auto=compress');
  const hasCs = url.includes('cs=tinysrgb');
  const hasWidth = url.includes('w=');
  
  if (!hasAutoCompress || !hasCs || !hasWidth) {
    checks.pexelsParams = false;
    checks.issues.push(`  ❌ Pexels #${idx + 1} missing params: ${url.substring(0, 80)}...`);
  }
});

if (checks.pexelsParams) {
  console.log('  ✅ All Pexels URLs have correct parameters\n');
} else {
  console.log('  ❌ Some Pexels URLs missing parameters:\n');
  checks.issues.forEach(issue => console.log(issue));
  console.log('');
}

// Check Unsplash URLs
console.log('🔍 Checking Unsplash URLs...\n');
categories.unsplash.forEach((url, idx) => {
  const hasAutoFormat = url.includes('auto=format');
  const hasFitCrop = url.includes('fit=crop');
  const hasWidth = url.includes('w=');
  const hasQuality = url.includes('q=');
  
  if (!hasAutoFormat || !hasFitCrop || !hasWidth || !hasQuality) {
    checks.unsplashParams = false;
    checks.issues.push(`  ❌ Unsplash #${idx + 1} missing params: ${url.substring(0, 80)}...`);
  }
});

if (checks.unsplashParams) {
  console.log('  ✅ All Unsplash URLs have correct parameters\n');
} else {
  console.log('  ❌ Some Unsplash URLs missing parameters:\n');
  checks.issues.forEach(issue => console.log(issue));
  console.log('');
}

// Check for duplicate URLs
console.log('🔍 Checking for duplicate URLs...\n');
const uniqueUrls = new Set(urls);
if (uniqueUrls.size < urls.length) {
  console.log(`  ⚠️  Found ${urls.length - uniqueUrls.size} duplicate URLs\n`);
} else {
  console.log('  ✅ No duplicate URLs found\n');
}

// Final summary
console.log('═══════════════════════════════════════\n');
if (checks.pexelsParams && checks.unsplashParams) {
  console.log('✅ ALL CHECKS PASSED!\n');
  console.log('Your images should load correctly in production.\n');
} else {
  console.log('❌ SOME ISSUES FOUND!\n');
  console.log('Please fix the URLs listed above.\n');
  console.log('Expected formats:\n');
  console.log('  Pexels: ?auto=compress&cs=tinysrgb&w=1920&h=650&fit=crop');
  console.log('  Unsplash: ?auto=format&fit=crop&w=1920&q=80\n');
}

// Sample URLs for reference
console.log('📝 Sample correct URLs:\n');
console.log('Pexels:');
console.log('  https://images.pexels.com/photos/1660603/pexels-photo-1660603.jpeg?auto=compress&cs=tinysrgb&w=1920&h=650&fit=crop\n');
console.log('Unsplash:');
console.log('  https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80\n');

process.exit(checks.pexelsParams && checks.unsplashParams ? 0 : 1);
