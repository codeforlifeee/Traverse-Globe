// Service Worker Cleanup Script
// This helps clean up old caches and handle errors

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches that are not in the current version
          if (cacheName.includes('unsplash-images-cache')) {
            // Keep unsplash cache but limit size
            return caches.open(cacheName).then((cache) => {
              return cache.keys().then((requests) => {
                // Keep only the most recent 50 images
                if (requests.length > 50) {
                  const toDelete = requests.slice(0, requests.length - 50);
                  return Promise.all(
                    toDelete.map((request) => cache.delete(request))
                  );
                }
              });
            });
          }
        })
      );
    })
  );
});

// Handle fetch errors gracefully
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Handle Font Awesome CSS and fonts
  if (url.includes('cdnjs.cloudflare.com/ajax/libs/font-awesome') || 
      url.includes('font-awesome')) {
    event.respondWith(
      fetch(event.request, {
        mode: 'cors',
        credentials: 'omit'
      })
        .then((response) => {
          // Only cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open('font-awesome-cache-v1').then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch((error) => {
          // Try to serve from cache if network fails
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            console.warn('Failed to fetch Font Awesome:', event.request.url, error);
            // Return empty response for fonts to prevent errors
            return new Response('', { status: 200, statusText: 'OK' });
          });
        })
    );
    return;
  }
  
  // Handle Unsplash images
  if (url.includes('images.unsplash.com')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response before caching
          const responseClone = response.clone();
          
          // Only cache successful responses
          if (response.status === 200) {
            caches.open('unsplash-images-cache').then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          
          return response;
        })
        .catch((error) => {
          // Try to serve from cache if network fails
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Return a placeholder or error response
            console.warn('Failed to fetch image:', event.request.url, error);
            
            // Return a minimal SVG placeholder
            const svg = `
              <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#f3f4f6"/>
                <text x="50%" y="50%" text-anchor="middle" fill="#9ca3af" font-size="14" font-family="sans-serif">
                  Image Loading Failed
                </text>
              </svg>
            `;
            
            return new Response(svg, {
              headers: { 'Content-Type': 'image/svg+xml' }
            });
          });
        })
    );
  }
});
