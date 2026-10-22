import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { homepagePackagesQuery } from './hooks/queries'
import './utils/trustedTypes.js' // Initialize Trusted Types policy

// CMS content changes rarely, so cached data stays fresh for minutes and survives
// navigation. refetchOnWindowFocus is off: it previously re-ran every homepage query
// on each tab refocus.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

// The first CMS-driven homepage section (the package carousel) is lazy, so on its own
// its query would wait for React to mount, then for the section chunk to download.
// Starting it here runs the request in parallel with both.
if (window.location.pathname === '/') {
  queryClient.prefetchQuery(homepagePackagesQuery(20));
}

// Keep this tree identical to render() in entry-server.jsx (apart from the router),
// or hydration of the pre-rendered homepage will not match.
const app = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

// The homepage ships with its header and hero pre-rendered (scripts/prerender.mjs), so
// React adopts that markup instead of rebuilding it. index.html strips the marker on
// every other URL, which then renders from scratch as before.
const rootElement = document.getElementById('root');
const start = () => {
  if (rootElement.hasAttribute('data-prerendered')) {
    hydrateRoot(rootElement, app);
  } else {
    createRoot(rootElement).render(app);
  }
};

// Let the browser paint first. The scripts are preloaded, so they are often ready the
// moment the HTML finishes parsing; starting React synchronously then ran the whole
// hydration before the first paint, holding back the pre-rendered headline (FCP/LCP)
// for the length of it. rAF fires just before the next paint and the timeout runs
// just after it. Hidden tabs never fire rAF, so they start straight away.
if (document.visibilityState === 'visible') {
  requestAnimationFrame(() => setTimeout(start, 0));
} else {
  start();
}

// PWA registration removed to completely eliminate caching issues.

// Load diagnostics in development
if (import.meta.env.DEV) {
  import('./utils/swDiagnostics.js').catch(() => {
    console.log('SW diagnostics not available');
  });
}
