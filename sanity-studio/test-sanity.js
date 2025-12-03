/**
 * Test Sanity Studio Configuration
 * Verifies that Sanity can be loaded without errors
 */

import { defineConfig } from 'sanity';

console.log('✅ Sanity import successful');
console.log('📦 defineConfig is available:', typeof defineConfig === 'function');

// Try to load the config
try {
  const config = await import('./sanity.config.js');
  console.log('✅ Sanity config loaded successfully');
  console.log('📝 Project ID:', config.default.projectId);
  console.log('📝 Dataset:', config.default.dataset);
  console.log('✅ All tests passed!');
  process.exit(0);
} catch (error) {
  console.error('❌ Error loading config:', error.message);
  process.exit(1);
}
