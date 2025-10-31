import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import UAEPackages from './pages/UAEPackages';
import BaliPackages from './pages/BaliPackages';
import ThailandPackages from './pages/ThailandPackages';
import SingaporePackages from './pages/SingaporePackages';
import PackageDetails from './pages/PackageDetails';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Header />
        <main>
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
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </Router>
  );
}

export default App;
