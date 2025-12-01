import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getInternationalCategories, getDomesticCategories } from '../data/categoryConfig';
import { companyInfo } from '../data/siteData';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPackagesDropdown, setShowPackagesDropdown] = useState(false);
  
  const internationalDestinations = getInternationalCategories();
  const domesticDestinations = getDomesticCategories();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <nav className="container mx-auto px-5 lg:px-12 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="transition-opacity hover:opacity-80 duration-200" aria-label={`${companyInfo.name} Home`}>
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/logo.webp"
                alt={companyInfo.name}
                className="h-11 md:h-12 object-contain"
                width="151"
                height="60"
                decoding="async"
              />
            </picture>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-darkBlue focus:outline-none hover:text-orange transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-1">
            <li>
              <Link 
                to="/" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors px-4 py-2 rounded-lg hover:bg-orange/5"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors px-4 py-2 rounded-lg hover:bg-orange/5"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors px-4 py-2 rounded-lg hover:bg-orange/5"
              >
                Services
              </Link>
            </li>
            <li className="relative group">
              <Link 
                to="/"
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors px-4 py-2 rounded-lg hover:bg-orange/5"
              >
                Destinations
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute top-full left-0 mt-2 bg-white rounded-2xl p-6 min-w-[520px] border border-gray-100 grid grid-cols-2 gap-6"
                style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                {/* International Column */}
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                    <i className="fa-solid fa-plane text-orange text-base"></i>
                    <span className="font-poppins font-semibold text-darkBlue text-base">
                      International
                    </span>
                  </div>
                  {internationalDestinations.map((dest) => (
                    <Link 
                      key={dest.slug}
                      to={`/destinations/international/${dest.slug}`} 
                      className="block px-3 py-2.5 rounded-lg hover:bg-orange/5 text-darkBlue hover:text-orange transition-all duration-200 font-canva-sans text-sm flex items-center gap-2.5"
                    >
                      <i className="fa-solid fa-location-dot text-orange/60 text-xs"></i>
                      <span>{dest.name}</span>
                    </Link>
                  ))}
                </div>
                
                {/* Domestic Column */}
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                    <i className="fa-solid fa-map-location-dot text-orange text-base"></i>
                    <span className="font-poppins font-semibold text-darkBlue text-base">
                      Domestic
                    </span>
                  </div>
                  {domesticDestinations.map((dest) => (
                    <Link 
                      key={dest.slug}
                      to={`/destinations/domestic/${dest.slug}`} 
                      className="block px-3 py-2.5 rounded-lg hover:bg-orange/5 text-darkBlue hover:text-orange transition-all duration-200 font-canva-sans text-sm flex items-center gap-2.5"
                    >
                      <i className="fa-solid fa-location-dot text-orange/60 text-xs"></i>
                      <span>{dest.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link 
                to="/blog" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors px-4 py-2 rounded-lg hover:bg-orange/5"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors px-4 py-2 rounded-lg hover:bg-orange/5"
              >
                Contact
              </Link>
            </li>
            <li className="ml-2">
              <Link 
                to="/contact" 
                className="bg-orange hover:bg-teal text-white px-6 py-2.5 text-sm rounded-lg font-poppins font-semibold transition-all duration-200"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul id="mobile-nav" className="lg:hidden pb-4 space-y-3" role="menu">
            <li>
              <Link 
                to="/" 
                className="block text-darkBlue font-poppins font-medium hover:text-orange transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="block text-darkBlue font-poppins font-medium hover:text-orange transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className="block text-darkBlue font-poppins font-medium hover:text-orange transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <button 
                onClick={() => setShowPackagesDropdown(!showPackagesDropdown)}
                className="flex items-center justify-between w-full text-darkBlue font-poppins font-medium py-2"
              >
                <span>Destinations</span>
                <i className={`fa-solid fa-chevron-${showPackagesDropdown ? 'up' : 'down'} text-xs`}></i>
              </button>
              {showPackagesDropdown && (
                <div className="pl-4 space-y-2 mt-2">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-plane text-orange"></i>
                      <span className="font-poppins font-semibold text-darkBlue">
                        International
                      </span>
                    </div>
                    <ul className="pl-6 space-y-1">
                      {internationalDestinations.map((dest) => (
                        <li key={dest.slug}>
                          <Link 
                            to={`/destinations/international/${dest.slug}`} 
                            className="block text-darkBlue hover:text-orange py-1 font-canva-sans text-sm flex items-center gap-2" 
                            onClick={() => setIsOpen(false)}
                          >
                            <i className="fa-solid fa-location-dot text-orange text-xs"></i>
                            <span>{dest.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-map-location-dot text-orange"></i>
                      <span className="font-poppins font-semibold text-darkBlue">
                        Domestic
                      </span>
                    </div>
                    <ul className="pl-6 space-y-1">
                      {domesticDestinations.map((dest) => (
                        <li key={dest.slug}>
                          <Link 
                            to={`/destinations/domestic/${dest.slug}`} 
                            className="block text-darkBlue hover:text-orange py-1 font-canva-sans text-sm flex items-center gap-2" 
                            onClick={() => setIsOpen(false)}
                          >
                            <i className="fa-solid fa-location-dot text-orange text-xs"></i>
                            <span>{dest.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link 
                to="/blog" 
                className="block text-darkBlue font-poppins font-medium hover:text-orange transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="block text-darkBlue font-poppins font-medium hover:text-orange transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="block bg-orange text-white px-4 py-2 rounded-full font-poppins font-semibold text-center hover:bg-teal transition-all"
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
