import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="transition-transform hover:scale-105">
            <img 
              src="/logo.webp" 
              alt="Traverse Globe" 
              className="h-12 md:h-16 object-contain"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-8">
            <li>
              <Link 
                to="/" 
                className="nav-link text-gray-700 font-semibold hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="nav-link text-gray-700 font-semibold hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className="nav-link text-gray-700 font-semibold hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                Services
              </Link>
            </li>
            <li className="relative group">
              <span 
                className="nav-link text-gray-700 font-semibold hover:text-primary transition-colors cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all group-hover:after:w-full"
              >
                Packages
              </span>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute top-full left-0 mt-2 bg-white shadow-lg rounded-xl p-3 min-w-[200px] border">
                <Link to="/uae-packages" className="block px-4 py-2 rounded-lg hover:bg-gray-50" >UAE</Link>
                <Link to="/bali-packages" className="block px-4 py-2 rounded-lg hover:bg-gray-50" >Bali</Link>
                <Link to="/thailand-packages" className="block px-4 py-2 rounded-lg hover:bg-gray-50" >Thailand</Link>
                <Link to="/singapore-packages" className="block px-4 py-2 rounded-lg hover:bg-gray-50" >Singapore</Link>
              </div>
            </li>
            <li>
              <Link 
                to="/blog" 
                className="nav-link text-gray-700 font-semibold hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="nav-link text-gray-700 font-semibold hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-secondary transition-all hover:shadow-lg hover:scale-105"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul className="lg:hidden pb-4 space-y-3">
            <li>
              <Link 
                to="/" 
                className="block text-gray-700 font-semibold hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="block text-gray-700 font-semibold hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className="block text-gray-700 font-semibold hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <div className="block text-gray-700 font-semibold py-2">Packages</div>
              <ul className="pl-4 space-y-1">
                <li>
                  <Link to="/uae-packages" className="block text-gray-600 hover:text-primary py-1" onClick={() => setIsOpen(false)}>UAE</Link>
                </li>
                <li>
                  <Link to="/bali-packages" className="block text-gray-600 hover:text-primary py-1" onClick={() => setIsOpen(false)}>Bali</Link>
                </li>
                <li>
                  <Link to="/thailand-packages" className="block text-gray-600 hover:text-primary py-1" onClick={() => setIsOpen(false)}>Thailand</Link>
                </li>
                <li>
                  <Link to="/singapore-packages" className="block text-gray-600 hover:text-primary py-1" onClick={() => setIsOpen(false)}>Singapore</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link 
                to="/blog" 
                className="block text-gray-700 font-semibold hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="block text-gray-700 font-semibold hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="block bg-primary text-white px-6 py-2 rounded-full font-semibold text-center hover:bg-secondary transition-all"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
