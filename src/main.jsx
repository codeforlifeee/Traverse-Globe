import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './utils/trustedTypes.js' // Initialize Trusted Types policy

// Performance monitoring
if (typeof window !== 'undefined' && 'performance' in window) {
  // Report Web Vitals
  window.addEventListener('load', () => {
    // Log initial load metrics
    const perfData = performance.getEntriesByType('navigation')[0];
    if (perfData) {
      console.log('Performance Metrics:', {
        DNS: perfData.domainLookupEnd - perfData.domainLookupStart,
        TCP: perfData.connectEnd - perfData.connectStart,
        Request: perfData.responseStart - perfData.requestStart,
        Response: perfData.responseEnd - perfData.responseStart,
        DOM: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        Load: perfData.loadEventEnd - perfData.loadEventStart,
        Total: perfData.loadEventEnd - perfData.fetchStart
      });
    }
  });

  // Observe Long Tasks
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry.duration.toFixed(2) + 'ms');
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task API not supported
    }
  }
}

// Hydrate the root
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker for PWA (deferred to after window load)
if (import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const { registerSW } = await import('virtual:pwa-register');
      const updateSW = registerSW({
        immediate: false,
        onRegistered(registration) {
          if (registration) {
            console.log('SW registered:', registration.scope);
          } else {
            console.log('SW registered');
          }
        },
        onRegisterError(error) {
          console.error('SW registration failed:', error);
        }
      });

      // Proactively check for updates periodically
      setInterval(() => {
        try {
          updateSW && updateSW();
        } catch {}
      }, 60 * 60 * 1000);
    } catch (e) {
      console.warn('PWA register module not available:', e);
    }
  });
}

// Load diagnostics in development
if (import.meta.env.DEV) {
  import('./utils/swDiagnostics.js').catch(() => {
    console.log('SW diagnostics not available');
  });
}

// Preload critical routes on idle
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload top destination images with valid URLs
    const criticalImages = [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = `${src}?auto=format&fit=crop&w=800&q=80`;
      document.head.appendChild(link);
    });
  }, { timeout: 2000 });
}
