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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-lightGray">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="transition-transform hover:scale-105" aria-label={`${companyInfo.name} Home`}>
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/logo.webp"
                alt={companyInfo.name}
                className="h-12 md:h-14 object-contain"
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
          <ul className="hidden lg:flex items-center space-x-6">
            <li>
              <Link 
                to="/" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all hover:after:w-full"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all hover:after:w-full"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all hover:after:w-full"
              >
                Services
              </Link>
            </li>
            <li className="relative group">
              <Link 
                to="/destinations"
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all group-hover:after:w-full"
              >
                Destinations
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute top-full left-0 mt-2 bg-white shadow-xl rounded-xl p-4 min-w-[500px] border border-lightGray grid grid-cols-2 gap-4">
                {/* International Column */}
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-lightGray">
                    <span className="text-lg">✈️</span>
                    <Link to="/destinations/international" className="font-poppins font-semibold text-darkBlue hover:text-orange transition-colors">
                      International
                    </Link>
                  </div>
                  {internationalDestinations.map((dest) => (
                    <Link 
                      key={dest.slug}
                      to={`/destinations/international/${dest.slug}`} 
                      className="block px-3 py-2 rounded-lg hover:bg-lightGray hover:text-orange transition-colors font-canva-sans text-sm flex items-center gap-2"
                    >
                      <span>{dest.icon}</span>
                      <span>{dest.name}</span>
                    </Link>
                  ))}
                </div>
                
                {/* Domestic Column */}
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-lightGray">
                    <span className="text-lg">🇮🇳</span>
                    <Link to="/destinations/domestic" className="font-poppins font-semibold text-darkBlue hover:text-orange transition-colors">
                      Domestic
                    </Link>
                  </div>
                  {domesticDestinations.map((dest) => (
                    <Link 
                      key={dest.slug}
                      to={`/destinations/domestic/${dest.slug}`} 
                      className="block px-3 py-2 rounded-lg hover:bg-lightGray hover:text-orange transition-colors font-canva-sans text-sm flex items-center gap-2"
                    >
                      <span>{dest.icon}</span>
                      <span>{dest.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link 
                to="/blog" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all hover:after:w-full"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="nav-link font-poppins text-sm text-darkBlue font-medium hover:text-orange transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange after:transition-all hover:after:w-full"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="bg-orange text-white px-4 py-1.5 text-sm rounded-full font-poppins font-semibold hover:bg-teal transition-all hover:shadow-md"
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
                      <span>✈️</span>
                      <Link to="/destinations/international" className="font-poppins font-semibold text-darkBlue hover:text-orange" onClick={() => setIsOpen(false)}>
                        International
                      </Link>
                    </div>
                    <ul className="pl-6 space-y-1">
                      {internationalDestinations.map((dest) => (
                        <li key={dest.slug}>
                          <Link 
                            to={`/destinations/international/${dest.slug}`} 
                            className="block text-darkBlue/70 hover:text-orange py-1 font-canva-sans text-sm flex items-center gap-2" 
                            onClick={() => setIsOpen(false)}
                          >
                            <span>{dest.icon}</span>
                            <span>{dest.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span>🇮🇳</span>
                      <Link to="/destinations/domestic" className="font-poppins font-semibold text-darkBlue hover:text-orange" onClick={() => setIsOpen(false)}>
                        Domestic
                      </Link>
                    </div>
                    <ul className="pl-6 space-y-1">
                      {domesticDestinations.map((dest) => (
                        <li key={dest.slug}>
                          <Link 
                            to={`/destinations/domestic/${dest.slug}`} 
                            className="block text-darkBlue/70 hover:text-orange py-1 font-canva-sans text-sm flex items-center gap-2" 
                            onClick={() => setIsOpen(false)}
                          >
                            <span>{dest.icon}</span>
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
