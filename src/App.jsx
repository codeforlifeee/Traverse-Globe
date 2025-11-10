import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, memo } from 'react';

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

// Package pages
const UAEPackages = lazy(() => import(/* webpackChunkName: "uae" */ './pages/UAEPackages'));
const BaliPackages = lazy(() => import(/* webpackChunkName: "bali" */ './pages/BaliPackages'));
const ThailandPackages = lazy(() => import(/* webpackChunkName: "thailand" */ './pages/ThailandPackages'));
const SingaporePackages = lazy(() => import(/* webpackChunkName: "singapore" */ './pages/SingaporePackages'));
const SriLankaPackages = lazy(() => import(/* webpackChunkName: "srilanka" */ './pages/SriLankaPackages'));
const VietnamPackages = lazy(() => import(/* webpackChunkName: "vietnam" */ './pages/VietnamPackages'));
const LaosPackages = lazy(() => import(/* webpackChunkName: "laos" */ './pages/LaosPackages'));
const AndamanPackages = lazy(() => import(/* webpackChunkName: "andaman" */ './pages/AndamanPackages'));
const JaipurPackages = lazy(() => import(/* webpackChunkName: "jaipur" */ './pages/JaipurPackages'));
const KeralaPackages = lazy(() => import(/* webpackChunkName: "kerala" */ './pages/KeralaPackages'));
const KashmirPackages = lazy(() => import(/* webpackChunkName: "kashmir" */ './pages/KashmirPackages'));
const PackageDetails = lazy(() => import(/* webpackChunkName: "package-details" */ './pages/PackageDetails'));
const PackageRedirect = lazy(() => import(/* webpackChunkName: "redirect" */ './pages/PackageRedirect'));

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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Header />
        <main role="main">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              
              {/* Package Routes */}
              <Route path="/uae-packages" element={<UAEPackages />} />
              <Route path="/uae-packages/:slug" element={<PackageDetails />} />
              <Route path="/bali-packages" element={<BaliPackages />} />
              <Route path="/bali-packages/:slug" element={<PackageDetails />} />
              <Route path="/thailand-packages" element={<ThailandPackages />} />
              <Route path="/thailand-packages/:slug" element={<PackageDetails />} />
              <Route path="/singapore-packages" element={<SingaporePackages />} />
              <Route path="/singapore-packages/:slug" element={<PackageDetails />} />
              <Route path="/srilanka-packages" element={<SriLankaPackages />} />
              <Route path="/srilanka-packages/:slug" element={<PackageDetails />} />
              <Route path="/vietnam-packages" element={<VietnamPackages />} />
              <Route path="/vietnam-packages/:slug" element={<PackageDetails />} />
              <Route path="/laos-packages" element={<LaosPackages />} />
              <Route path="/laos-packages/:slug" element={<PackageDetails />} />
              <Route path="/andaman-packages" element={<AndamanPackages />} />
              <Route path="/andaman-packages/:slug" element={<PackageDetails />} />
              <Route path="/jaipur-packages" element={<JaipurPackages />} />
              <Route path="/jaipur-packages/:slug" element={<PackageDetails />} />
              <Route path="/kerala-packages" element={<KeralaPackages />} />
              <Route path="/kerala-packages/:slug" element={<PackageDetails />} />
              <Route path="/kashmir-packages" element={<KashmirPackages />} />
              <Route path="/kashmir-packages/:slug" element={<PackageDetails />} />
              
              {/* Backward compatibility */}
              <Route path="/package/:slug" element={<PackageRedirect />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          <FloatingButtons />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
