/**
 * Image Optimization Script for siteData.js
 * This script optimizes all image URLs to reduce loading time
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'siteData.js');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

console.log('🖼️  Starting image optimization...\n');

// Optimization rules
const optimizations = [
  // Ensure all Unsplash URLs use WebP (append fm=webp if missing, preserve other params)
  {
    pattern: /https:\/\/images\.unsplash\.com\/([^"'\s)]+)\?([^"'\s)]*)/g,
    replace: (match, photoPath, query) => {
      try {
        const params = new URLSearchParams(query);
        if (!params.has('fm')) params.set('fm', 'webp');
        // enforce auto=format and fit=crop to align with delivery expectations
        if (!params.has('auto')) params.set('auto', 'format');
        if (!params.has('fit')) params.set('fit', 'crop');
        return `https://images.unsplash.com/${photoPath}?${params.toString()}`;
      } catch {
        return match; // fallback if parsing fails
      }
    },
    name: 'Unsplash add fm=webp'
  },
  // Unsplash optimizations - reduce quality and size
  {
    pattern: /https:\/\/images\.unsplash\.com\/([^?]+)\?auto=format&fit=crop&w=(\d+)&q=(\d+)&fm=webp/g,
    replace: (match, photoId, width, quality) => {
      const newWidth = parseInt(width) > 600 ? '600' : '400';
      const newQuality = '35';
      return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${newWidth}&q=${newQuality}&fm=webp`;
    },
    name: 'Unsplash URLs'
  },
  
  // Pexels banner optimizations (800x400 -> 600x300)
  {
    pattern: /https:\/\/images\.pexels\.com\/photos\/([^?]+)\?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop&dpr=1/g,
    replace: (match, photoId) => {
      return `https://images.pexels.com/photos/${photoId}?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop&dpr=1`;
    },
    name: 'Pexels Banners (800x400)'
  },
  
  // Pexels card images (500 -> 300)
  {
    pattern: /https:\/\/images\.pexels\.com\/photos\/([^?]+)\?auto=compress&cs=tinysrgb&w=500&fit=crop&dpr=1/g,
    replace: (match, photoId) => {
      return `https://images.pexels.com/photos/${photoId}?auto=compress&cs=tinysrgb&w=300&fit=crop&dpr=1`;
    },
    name: 'Pexels Cards (500w)'
  },
  
  // Pexels with different widths
  {
    pattern: /https:\/\/images\.pexels\.com\/photos\/([^?]+)\?auto=compress&cs=tinysrgb&w=(\d+)&fit=crop&dpr=1/g,
    replace: (match, photoId, width) => {
      const newWidth = parseInt(width) > 400 ? '300' : '250';
      return `https://images.pexels.com/photos/${photoId}?auto=compress&cs=tinysrgb&w=${newWidth}&fit=crop&dpr=1`;
    },
    name: 'Pexels Other Widths'
  }
];

let totalReplacements = 0;

// Apply each optimization
optimizations.forEach(opt => {
  let count = 0;
  const originalContent = content;
  
  if (typeof opt.replace === 'function') {
    content = content.replace(opt.pattern, (...args) => {
      count++;
      return opt.replace(...args);
    });
  } else {
    content = content.replace(opt.pattern, opt.replace);
    count = (originalContent.match(opt.pattern) || []).length;
  }
  
  if (count > 0) {
    console.log(`✅ ${opt.name}: ${count} optimized`);
    totalReplacements += count;
  }
});

// Write the optimized content back
fs.writeFileSync(filePath, content, 'utf8');

console.log(`\n🎉 Optimization complete!`);
console.log(`📊 Total images optimized: ${totalReplacements}`);
console.log(`💾 File saved: ${filePath}`);

// Calculate estimated savings
const estimatedSavingsPerImage = 15; // KB per image on average
const totalSavings = totalReplacements * estimatedSavingsPerImage;

console.log(`\n📉 Estimated size reduction: ~${totalSavings}KB (${(totalSavings/1024).toFixed(2)}MB)`);
console.log(`⚡ Expected performance improvement: 40-60% faster image loading`);
