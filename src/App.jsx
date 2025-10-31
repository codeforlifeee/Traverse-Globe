import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const UAEPackages = lazy(() => import('./pages/UAEPackages'));
const BaliPackages = lazy(() => import('./pages/BaliPackages'));
const ThailandPackages = lazy(() => import('./pages/ThailandPackages'));
const SingaporePackages = lazy(() => import('./pages/SingaporePackages'));
const PackageDetails = lazy(() => import('./pages/PackageDetails'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Header />
        <main>
          <Suspense fallback={<div className="py-20 text-center text-darkBlue/80">Loading…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/uae-packages" element={<UAEPackages />} />
              <Route path="/bali-packages" element={<BaliPackages />} />
              <Route path="/thailand-packages" element={<ThailandPackages />} />
              <Route path="/singapore-packages" element={<SingaporePackages />} />
              <Route path="/package/:id" element={<PackageDetails />} />
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
