import { Link } from 'react-router-dom';
import { companyInfo } from '../data/siteData';

const Footer = () => {
  return (
    <footer className="bg-darkBlue text-white py-8 md:py-10 mt-8 md:mt-10 border-t-4 border-orange">
      <div className="container-custom">
        {/* Mobile: Traverse Globe full width, then 2 columns for Quick Links + Contact Us, then Follow Us full width */}
        {/* Desktop: All 4 sections side by side */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4 md:gap-8 lg:gap-10">
          {/* About Section - Full width on mobile, 1 column on desktop */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2 text-white font-season">{companyInfo.name}</h3>
              <div className="w-12 h-1 bg-orange rounded-full"></div>
            </div>
            <p className="text-white/70 font-canva-sans leading-relaxed text-sm">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick Links and Contact Us - 2 columns on mobile, each 1 column on desktop */}
          <div className="grid grid-cols-2 gap-6 md:contents">
            {/* Quick Links */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 font-poppins text-white">Quick Links</h4>
                <div className="w-12 h-1 bg-orange rounded-full"></div>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-white/70 hover:text-orange transition-colors font-canva-sans text-sm flex items-center gap-2 group">
                    <i className="fa-solid fa-chevron-right text-xs text-orange/60 group-hover:text-orange transition-colors"></i>
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white/70 hover:text-orange transition-colors font-canva-sans text-base flex items-center gap-2 group">
                    <i className="fa-solid fa-chevron-right text-xs text-orange/60 group-hover:text-orange transition-colors"></i>
                    <span>Services</span>
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-white/70 hover:text-orange transition-colors font-canva-sans text-base flex items-center gap-2 group">
                    <i className="fa-solid fa-chevron-right text-xs text-orange/60 group-hover:text-orange transition-colors"></i>
                    <span>Blog</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white/70 hover:text-orange transition-colors font-canva-sans text-base flex items-center gap-2 group">
                    <i className="fa-solid fa-chevron-right text-xs text-orange/60 group-hover:text-orange transition-colors"></i>
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 font-poppins text-white">Contact Us</h4>
                <div className="w-12 h-1 bg-orange rounded-full"></div>
              </div>
              <ul className="space-y-3 text-white/70 font-canva-sans text-sm">
                <li className="flex items-start group">
                  <i className="fa-solid fa-phone mr-3 text-orange mt-1 flex-shrink-0 text-lg"></i>
                  <a 
                    href={`tel:${companyInfo.phone.primary}`}
                    className="hover:text-orange transition-colors"
                  >
                    {companyInfo.phone.primary}
                  </a>
                </li>
                <li className="flex items-start group">
                  <i className="fa-solid fa-envelope mr-3 text-orange mt-1 flex-shrink-0 text-lg"></i>
                  <a 
                    href={`mailto:${companyInfo.email.primary}`}
                    className="break-words hover:text-orange transition-colors"
                  >
                    {companyInfo.email.primary}
                  </a>
                </li>
                <li className="flex items-start group">
                  <i className="fa-solid fa-map-marker-alt mr-3 text-orange mt-1 flex-shrink-0 text-lg"></i>
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
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2 font-poppins text-white">Follow Us</h4>
              <div className="w-12 h-1 bg-orange rounded-full"></div>
            </div>
            <div className="flex gap-3">
              <a 
                href={companyInfo.social.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook" 
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-orange text-white transition-all duration-200"
              >
                <i className="fa-brands fa-facebook text-xl"></i>
              </a>
              <a 
                href={companyInfo.social.instagram} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram" 
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-orange text-white transition-all duration-200"
              >
                <i className="fa-brands fa-instagram text-xl"></i>
              </a>
              <a 
                href={companyInfo.social.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn" 
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-orange text-white transition-all duration-200"
              >
                <i className="fa-brands fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center font-canva-sans">
          <p className="text-sm text-white font-medium">
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved. | Crafted with ❤️ for travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

