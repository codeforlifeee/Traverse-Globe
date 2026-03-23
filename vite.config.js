import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import dotenv from 'dotenv'

dotenv.config()

function localLeadWebhookApi() {
  return {
    name: 'local-lead-webhook-api',
    configureServer(server) {
      server.middlewares.use('/api/lead-webhook', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next();
        }

        try {
          const webhookUrl = process.env.LEAD_WEBHOOK_URL;
          if (!webhookUrl) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'LEAD_WEBHOOK_URL is not configured in .env' }));
            return;
          }

          let rawBody = '';
          req.on('data', (chunk) => {
            rawBody += chunk;
          });

          await new Promise((resolve, reject) => {
            req.on('end', resolve);
            req.on('error', reject);
          });

          const payload = rawBody ? JSON.parse(rawBody) : {};

          const headers = {
            'Content-Type': 'application/json'
          };

          if (process.env.LEAD_WEBHOOK_SECRET) {
            headers['x-webhook-secret'] = process.env.LEAD_WEBHOOK_SECRET;
          }

          const webhookResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              source: 'Traverse Globe Website Popup',
              submittedAt: new Date().toISOString(),
              ...payload
            })
          });

          if (!webhookResponse.ok) {
            const errorBody = await webhookResponse.text();
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: `Webhook forward failed: ${errorBody || webhookResponse.status}` }));
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true }));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: `Failed to process lead webhook request: ${error?.message || 'unknown error'}` }));
        }
      });
    }
  };
}

// Custom plugin to inject CSP meta tag - DISABLED
// CSP is now handled by .htaccess to avoid conflicts
// function injectCSPMetaTag() {
//   return {
//     name: 'inject-csp-meta',
//     transformIndexHtml(html) {
//       // Add CSP meta tag for additional security
//       return html.replace(
//         '<meta charset="UTF-8" />',
//         `<meta charset="UTF-8" />
//     <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`
//       );
//     }
//   }
// }

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    localLeadWebhookApi(),
    // injectCSPMetaTag(), // Disabled - CSP handled by .htaccess
    react({
      babel: {
        plugins: [
          // Remove prop-types in production
          ['transform-react-remove-prop-types', { removeImport: true }]
        ]
      }
    }),
    
    // Gzip compression DISABLED - FTP servers have issues with pre-compressed files
    // Use server-side compression (mod_deflate) instead
    // viteCompression({
    //   algorithm: 'gzip',
    //   ext: '.gz',
    //   threshold: 1024,
    //   deleteOriginFile: false,
    //   filter: /\.(js|mjs|json|css|html|svg)$/i
    // }),
    
    // Brotli compression DISABLED - FTP servers have issues with pre-compressed files
    // Use server-side compression (mod_deflate) instead
    // viteCompression({
    //   algorithm: 'brotliCompress',
    //   ext: '.br',
    //   threshold: 1024,
    //   deleteOriginFile: false,
    //   filter: /\.(js|mjs|json|css|html|svg)$/i
    // }),
    
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
          if (/\.(woff|woff2|ttf|eot)$/.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]';
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
    ]
  },
  
  // Server configuration
  server: {
    hmr: {
      overlay: false
    }
  }
})
