/**
 * Cookie Control & Third-Party Cookie Blocker
 * Prevents third-party cookies from being set
 */

(function() {
  'use strict';
  
  // List of allowed first-party cookie prefixes
  const allowedCookiePrefixes = [
    '__Secure-',
    '__Host-',
    '_ga',
    '_gid',
    '_gat',
    'consent',
    'auth',
    'session'
  ];
  
  // Domains to block cookies from
  const blockedDomains = [
    'pexels.com',
    'images.pexels.com',
    'cloudflare.com'
  ];
  
  // Override document.cookie setter
  const originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') || 
                                   Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');
  
  if (originalCookieDescriptor && originalCookieDescriptor.configurable) {
    Object.defineProperty(document, 'cookie', {
      get() {
        return originalCookieDescriptor.get.call(document);
      },
      set(value) {
        // Check if cookie is from blocked domain
        const cookieName = value.split('=')[0].trim();
        const domain = value.match(/domain=([^;]+)/i);
        
        if (domain) {
          const domainValue = domain[1].trim();
          const isBlocked = blockedDomains.some(blocked => 
            domainValue.includes(blocked)
          );
          
          if (isBlocked) {
            console.warn('🚫 Blocked third-party cookie:', cookieName, 'from', domainValue);
            return;
          }
        }
        
        // Allow first-party cookies
        return originalCookieDescriptor.set.call(document, value);
      },
      configurable: true
    });
  }
  
  // Block third-party cookies via fetch/XHR interception
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const [url] = args;
    const urlString = typeof url === 'string' ? url : url.url;
    
    // Check if request is to blocked domain
    const isBlocked = blockedDomains.some(domain => urlString.includes(domain));
    
    if (isBlocked && args[1]) {
      // Set credentials to 'omit' to prevent cookies
      args[1] = {
        ...args[1],
        credentials: 'omit',
        mode: 'cors'
      };
    }
    
    return originalFetch.apply(this, args);
  };
  
  console.log('✅ Third-party cookie blocker initialized');
})();
