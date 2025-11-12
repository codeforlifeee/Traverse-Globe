import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// Custom plugin to inject CSP meta tag
function injectCSPMetaTag() {
  return {
    name: 'inject-csp-meta',
    transformIndexHtml(html) {
      // Add CSP meta tag for additional security
      return html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`
      );
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    injectCSPMetaTag(),
    react({
      babel: {
        plugins: [
          // Remove prop-types in production
          ['transform-react-remove-prop-types', { removeImport: true }]
        ]
      }
    }),
    
    // Gzip compression for text assets
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg)$/i
    }),
    
    // Brotli compression for better compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg)$/i
    }),
    
    // Bundle analyzer (only in analyze mode)
    process.env.ANALYZE && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html'
    }),
    
    // PWA for caching and offline support
    VitePWA({
      registerType: 'autoUpdate',
      // Avoid injecting registerSW.js to reduce critical request chain; we register manually in main.jsx after load
      injectRegister: null,
      devOptions: {
        enabled: false
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}'],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        sourcemap: false,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              fetchOptions: {
                mode: 'cors',
                credentials: 'omit'
              },
              plugins: [
                {
                  cacheWillUpdate: async ({ response }) => {
                    // Only cache successful responses
                    return response.status === 200 ? response : null;
                  }
                }
              ]
            }
          },
          {
            urlPattern: /^https:\/\/images\.pexels\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pexels-images-cache',
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              fetchOptions: {
                mode: 'cors',
                credentials: 'omit', // Block third-party cookies
                referrerPolicy: 'no-referrer'
              },
              plugins: [
                {
                  requestWillFetch: async ({ request }) => {
                    // Strip cookies from Pexels requests
                    const headers = new Headers(request.headers);
                    headers.delete('Cookie');
                    return new Request(request, { 
                      headers,
                      credentials: 'omit'
                    });
                  },
                  cacheWillUpdate: async ({ response }) => {
                    // Only cache successful responses
                    return response.status === 200 ? response : null;
                  }
                }
              ]
            }
          },
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdnjs-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Traverse Globe',
        short_name: 'TraverseGlobe',
        description: 'Your trusted travel partner for curated holiday packages',
        theme_color: '#FF5B04',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/logo.webp',
            sizes: '192x192',
            type: 'image/webp'
          }
        ]
      }
    })
  ].filter(Boolean),
  
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'swiper', 'lucide-react'],
          'vendor-utils': ['axios', '@tanstack/react-query', 'clsx']
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Use terser for better minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    // Source maps for production debugging (disabled for smaller bundles)
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    // Report compressed size
    reportCompressedSize: true,
    // Target modern browsers for smaller bundles
    target: 'es2015'
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion',
      'swiper'
    ],
    exclude: ['@fortawesome/fontawesome-free']
  },
  
  // Server configuration
  server: {
    hmr: {
      overlay: false
    }
  }
})
