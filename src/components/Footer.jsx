import { Link } from 'react-router-dom';
import { companyInfo } from '../data/siteData';

const Footer = () => {
  return (
    <footer className="bg-darkBlue text-white py-8 mt-8">
      <div className="container-custom">
        {/* Mobile: Traverse Globe full width, then 2 columns for Quick Links + Contact Us, then Follow Us full width */}
        {/* Desktop: All 4 sections side by side */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
          {/* About Section - Full width on mobile, 1 column on desktop */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-orange font-season">{companyInfo.name}</h3>
            <p className="text-white/70 font-canva-sans leading-relaxed">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick Links and Contact Us - 2 columns on mobile, each 1 column on desktop */}
          <div className="grid grid-cols-2 gap-4 md:contents">
            {/* Quick Links */}
            <div className="md:col-span-1">
              <h4 className="text-xl font-semibold mb-4 font-poppins">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-white/70 hover:text-orange transition-colors font-canva-sans">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white/70 hover:text-orange transition-colors font-canva-sans">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-white/70 hover:text-orange transition-colors font-canva-sans">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white/70 hover:text-orange transition-colors font-canva-sans">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-1">
              <h4 className="text-xl font-semibold mb-4 font-poppins">Contact Us</h4>
              <ul className="space-y-2 text-white/70 font-canva-sans text-sm">
                <li className="flex items-start">
                  <i className="fa-solid fa-phone mr-2 md:mr-3 text-orange mt-1 flex-shrink-0"></i>
                  <span>{companyInfo.phone.primary}</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-envelope mr-2 md:mr-3 text-orange mt-1 flex-shrink-0"></i>
                  <span className="break-words">{companyInfo.email.primary}</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-map-marker-alt mr-2 md:mr-3 text-orange mt-1 flex-shrink-0"></i>
                  <a 
                    href={companyInfo.address.karnal.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-orange transition-colors"
                  >
                    {companyInfo.address.karnal.full}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Links - Full width on mobile, 1 column on desktop */}
          <div className="md:col-span-1">
            <h4 className="text-xl font-semibold mb-4 font-poppins">Follow Us</h4>
            <div className="flex space-x-4">
              <a 
                href={companyInfo.social.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook" 
                className="text-white/70 hover:text-orange transition-colors text-xl"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a 
                href={companyInfo.social.instagram} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram" 
                className="text-white/70 hover:text-orange transition-colors text-xl"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a 
                href={companyInfo.social.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn" 
                className="text-white/70 hover:text-orange transition-colors text-xl"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
  <div className="border-t border-white/20 mt-6 pt-6 text-center text-white/70 font-canva-sans">
          <p>
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved. | Crafted with ❤️ for travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

