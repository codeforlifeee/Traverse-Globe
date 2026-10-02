import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, memo } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

// Critical components - loaded immediately
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

// Lazy load non-critical components
const FloatingButtons = lazy(() => import('./components/FloatingButtons'));

// Lazy load all page components
const About = lazy(() => import(/* webpackChunkName: "about" */ './pages/About'));
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ './pages/Blog'));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ './pages/Contact'));
const Hotels = lazy(() => import(/* webpackChunkName: "hotels" */ './pages/Hotels'));
const HotelDetail = lazy(() => import(/* webpackChunkName: "hotel-detail" */ './pages/HotelDetail'));

// NEW: Dynamic destination routing components
const DestinationOverview = lazy(() => import(/* webpackChunkName: "destination-overview" */ './pages/destinations/DestinationOverview'));
const InternationalDestinations = lazy(() => import(/* webpackChunkName: "international" */ './pages/destinations/InternationalDestinations'));
const DomesticDestinations = lazy(() => import(/* webpackChunkName: "domestic" */ './pages/destinations/DomesticDestinations'));
const DestinationList = lazy(() => import(/* webpackChunkName: "destination-list" */ './pages/destinations/DestinationList'));
const DestinationDetail = lazy(() => import(/* webpackChunkName: "destination-detail" */ './pages/destinations/DestinationDetail'));
const LegacyRedirect = lazy(() => import(/* webpackChunkName: "legacy-redirect" */ './pages/destinations/LegacyRedirect'));

// Revamp — Phase 2 canonical routes
const PackageDetail = lazy(() => import(/* webpackChunkName: "package-detail" */ './pages/PackageDetail'));
const PackagesListing = lazy(() => import(/* webpackChunkName: "packages-listing" */ './pages/PackagesListing'));
const PackagesTheme = lazy(() => import(/* webpackChunkName: "packages-theme" */ './pages/PackagesTheme'));
const SearchResults = lazy(() => import(/* webpackChunkName: "search" */ './pages/SearchResults'));
const Shortlist = lazy(() => import(/* webpackChunkName: "shortlist" */ './pages/Shortlist'));
const Trust = lazy(() => import(/* webpackChunkName: "trust" */ './pages/Trust'));
const Chardham = lazy(() => import(/* webpackChunkName: "chardham" */ './pages/Chardham'));
const HotelsListing = lazy(() => import(/* webpackChunkName: "hotels-listing" */ './pages/HotelsListing'));
const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ './pages/NotFound'));

// Route fallback. A skeleton that roughly matches a page's shape reads as the page
// arriving rather than as a blocking spinner, and it reserves height so the swap to
// real content does not shift the layout.
const LoadingFallback = memo(() => (
  <div
    className="min-h-[calc(100vh-80px)] container-custom py-10 md:py-14"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <span className="sr-only">Loading page</span>
    <div className="animate-pulse space-y-6" aria-hidden="true">
      <div className="h-8 w-2/3 max-w-md rounded-lg bg-brand-canvas-2" />
      <div className="h-4 w-1/2 max-w-sm rounded bg-brand-canvas-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-brand-hairline">
            <div className="aspect-[4/3] bg-brand-canvas-2" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 rounded bg-brand-canvas-2" />
              <div className="h-3 w-1/2 rounded bg-brand-canvas-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
));
LoadingFallback.displayName = 'LoadingFallback';

// TimedSitewideFormPopup removed per REVAMP_PLAN §4.6 — the global 10-second
// interruption trained users to dismiss before they knew what we sell. Replaced
// by a scroll-triggered soft toast on detail pages only (added in Phase 2).

function App() {
  return (
    <Router>
      <ErrorBoundary>
      <ScrollToTop />
      <div className="min-h-screen bg-surface overflow-x-hidden">
        <Header />
        <main role="main">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Static Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              
              {/* Hotel Routes */}
              <Route path="/hotels/:category" element={<Hotels />} />
              <Route path="/hotels/:category/:slug" element={<HotelDetail />} />
              
              {/* NEW: Dynamic Destination Routes */}
              <Route path="/destinations" element={<DestinationOverview />} />
              <Route path="/destinations/international" element={<InternationalDestinations />} />
              <Route path="/destinations/domestic" element={<DomesticDestinations />} />
              <Route path="/destinations/:type/:category" element={<DestinationList />} />
              <Route path="/destinations/:type/:category/:slug" element={<DestinationDetail />} />

              {/* Revamp Phase 2 — canonical URLs */}
              <Route path="/packages" element={<PackagesListing />} />
              <Route path="/packages/theme/:theme" element={<PackagesTheme />} />
              <Route path="/packages/:slug" element={<PackageDetail />} />
              <Route path="/search" element={<SearchResults />} />

              {/* Revamp Phase 3 — new surfaces */}
              <Route path="/shortlist" element={<Shortlist />} />
              <Route path="/trust" element={<Trust />} />
              <Route path="/chardham" element={<Chardham />} />
              <Route path="/hotels" element={<HotelsListing />} />
              <Route path="/hotels/city/:city" element={<HotelsListing />} />
              <Route path="/guides" element={<Blog />} />
              <Route path="/guides/:slug" element={<Blog />} />
              
              {/* Backward Compatibility - Redirects old URLs to new structure */}
              <Route path="/uae-packages" element={<LegacyRedirect />} />
              <Route path="/uae-packages/:slug" element={<LegacyRedirect />} />
              <Route path="/thailand-packages" element={<LegacyRedirect />} />
              <Route path="/thailand-packages/:slug" element={<LegacyRedirect />} />
              <Route path="/bali-packages" element={<LegacyRedirect />} />
              <Route path="/bali-packages/:slug" element={<LegacyRedirect />} />
              <Route path="/singapore-packages" element={<LegacyRedirect />} />
              <Route path="/singapore-packages/:slug" element={<LegacyRedirect />} />
              <Route path="/srilanka-packages" element={<LegacyRedirect />} />
              <Route path="/srilanka-packages/:slug" element={<LegacyRedirect />} />
              <Route path="/vietnam-packages" element={<LegacyRedirect />} />
              <Route path="/vietnam-packages/:slug" element={<LegacyRedirect />} />
              <Route path="/laos-packages" element={<LegacyRedirect />} />
              <Route path="/laos-packages/:slug" element={<LegacyRedirect />} />
              <Route path="/andaman-packages" element={<LegacyRedirect />} />
              <Route path="/andaman-packages/:slug" element={<LegacyRedirect />} />
              <Route path="/jaipur-packages" element={<LegacyRedirect />} />
              <Route path="/jaipur-packages/:slug" element={<LegacyRedirect />} />
              <Route path="/kerala-packages" element={<LegacyRedirect />} />
              <Route path="/kerala-packages/:slug" element={<LegacyRedirect />} />
              <Route path="/kashmir-packages" element={<LegacyRedirect />} />
              <Route path="/kashmir-packages/:slug" element={<LegacyRedirect />} />
              <Route path="/package/:slug" element={<LegacyRedirect />} />
              
              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          <FloatingButtons />
        </Suspense>
      </div>
      </ErrorBoundary>
      </Router>
  );
}

export default App;
