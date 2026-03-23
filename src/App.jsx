import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy, memo, useEffect, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

// Critical components - loaded immediately
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BookingModal from './components/BookingModal';
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

// Optimized loading fallback
const LoadingFallback = memo(() => (
  <div className="min-h-[calc(100vh-80px)] flex items-center justify-center" role="status" aria-live="polite">
    <div className="text-center">
      <div 
        className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange mb-4"
        aria-hidden="true"
      ></div>
      <p className="text-darkBlue/80 font-poppins">Loading...</p>
    </div>
  </div>
));
LoadingFallback.displayName = 'LoadingFallback';

function TimedSitewideFormPopup() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);

    const timerId = window.setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [location.pathname]);

  return (
    <BookingModal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      packageName="General Travel Enquiry"
    />
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
      <ScrollToTop />
      <div className="min-h-screen bg-white overflow-x-hidden">
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          <FloatingButtons />
        </Suspense>
        <TimedSitewideFormPopup />
      </div>
      </ErrorBoundary>
      </Router>
  );
}

export default App;
