import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTop from './components/ScrollToTop';
import AnalyticsRouteListener from './components/AnalyticsRouteListener';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const UAEPackages = lazy(() => import('./pages/UAEPackages'));
const BaliPackages = lazy(() => import('./pages/BaliPackages'));
const ThailandPackages = lazy(() => import('./pages/ThailandPackages'));
const SingaporePackages = lazy(() => import('./pages/SingaporePackages'));
const PackageDetails = lazy(() => import('./pages/PackageDetails'));
const PackageRedirect = lazy(() => import('./pages/PackageRedirect'));
const Hotels = lazy(() => import('./pages/Hotels'));
const Search = lazy(() => import('./pages/Search'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsRouteListener />
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Header />
        <main>
          <Suspense fallback={
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange mb-4"></div>
                <p className="text-darkBlue/80 font-poppins">Loading...</p>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/search" element={<Search />} />
              {/* Package Routes */}
              <Route path="/packages/uae" element={<UAEPackages />} />
              <Route path="/packages/uae/:slug" element={<PackageDetails />} />
              <Route path="/packages/bali" element={<BaliPackages />} />
              <Route path="/packages/bali/:slug" element={<PackageDetails />} />
              <Route path="/packages/thailand" element={<ThailandPackages />} />
              <Route path="/packages/thailand/:slug" element={<PackageDetails />} />
              <Route path="/packages/singapore" element={<SingaporePackages />} />
              <Route path="/packages/singapore/:slug" element={<PackageDetails />} />
              {/* Hotels Routes */}
              <Route path="/hotels/:category" element={<Hotels />} />
              {/* Backward compatibility: redirect old slug URLs to nested category path */}
              <Route path="/package/:slug" element={<PackageRedirect />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </Router>
  );
}

export default App;
