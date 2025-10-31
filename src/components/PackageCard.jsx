import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export const PriceTag = ({ strike, price }) => (
  <div className="mt-3">
    {typeof strike === 'number' && (
      <p className="text-sm text-darkBlue/40 line-through font-canva-sans">₹{strike.toLocaleString('en-IN')}</p>
    )}
    <div className="flex items-baseline justify-between gap-2">
      <p className="text-2xl font-bold text-orange font-poppins">
        ₹{price?.toLocaleString ? price.toLocaleString('en-IN') : price}
  <span className="block text-xs font-normal text-darkBlue/80 font-canva-sans mt-1">Per Person on twin sharing</span>
      </p>
    </div>
  </div>
);

export default function PackageCard({ pkg, onView, buttonLabel = 'View Package' }){
  const [showExpertMenu, setShowExpertMenu] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowExpertMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-card group bg-white h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={pkg.image.replace(/w=\d+/, 'w=800').replace(/q=\d+/, 'q=70')}
          srcSet={`${pkg.image.replace(/w=\d+/, 'w=480').replace(/q=\d+/, 'q=70')} 480w, ${pkg.image.replace(/w=\d+/, 'w=800').replace(/q=\d+/, 'q=70')} 800w, ${pkg.image.replace(/w=\d+/, 'w=1200').replace(/q=\d+/, 'q=70')} 1200w`}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={pkg.title}
          loading="lazy"
          decoding="async"
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {pkg.nights && (
          <div className="absolute left-4 bottom-4 bg-darkBlue text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg font-poppins backdrop-blur-sm bg-opacity-90">{pkg.nights}</div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-semibold text-darkBlue text-xl font-poppins mb-3 line-clamp-2 min-h-[3.5rem]">{pkg.title}</h3>
        <PriceTag strike={pkg.strikePrice} price={pkg.price} />
        
        {/* Buttons Section - Pushed to bottom */}
        <div className="mt-auto pt-5 flex flex-col sm:flex-row gap-2">
          {onView ? (
            <button 
              onClick={() => onView(pkg)} 
              className="custom-btn text-xs px-4 py-2 font-medium flex-1 hover:scale-[1.02] transition-all duration-200"
            >
              <i className="fas fa-eye mr-1.5 text-xs"></i>
              {buttonLabel}
            </button>
          ) : (
            <Link 
              to={`/package/${pkg.id}`} 
              className="custom-btn text-xs px-4 py-2 font-medium flex-1 hover:scale-[1.02] transition-all duration-200 text-center inline-flex items-center justify-center"
            >
              <i className="fas fa-eye mr-1.5 text-xs"></i>
              {buttonLabel}
            </Link>
          )}
          
          {/* Connect with Expert Button */}
          <div className="relative flex-1" ref={menuRef}>
            <button
              onClick={() => setShowExpertMenu(!showExpertMenu)}
              className="custom-btn w-full text-xs px-4 py-2 font-medium bg-teal hover:bg-teal/90 hover:scale-[1.02] transition-all duration-200"
            >
              <i className="fas fa-headset mr-1.5 text-xs"></i>
              Expert
            </button>
            
            {/* Dropdown Menu */}
            {showExpertMenu && (
              <div className="absolute right-0 bottom-full mb-3 bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200 w-64 z-20 animate-fadeIn">
                <div className="bg-gradient-to-r from-teal to-primary py-3 px-4">
                  <p className="text-white font-semibold text-sm">Connect</p>
                </div>
                <div className="py-2">
                  <a
                    href="tel:+919997085457"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-orange/5 transition-all duration-200 group/item"
                    onClick={() => setShowExpertMenu(false)}
                  >
                    <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center group-hover/item:bg-orange/20 transition-colors">
                      <i className="fas fa-phone text-orange text-lg"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-darkBlue group-hover/item:text-orange transition-colors">Request a Call Back</p>
                      <p className="text-xs text-gray-500">We'll call you shortly</p>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400 text-xs group-hover/item:text-orange transition-colors"></i>
                  </a>
                  <a
                    href="https://wa.me/919997085457"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#25D366]/5 transition-all duration-200 border-t border-gray-100 group/item"
                    onClick={() => setShowExpertMenu(false)}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover/item:bg-[#25D366]/20 transition-colors">
                      <i className="fab fa-whatsapp text-[#25D366] text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-darkBlue group-hover/item:text-[#25D366] transition-colors">WhatsApp Chat</p>
                      <p className="text-xs text-gray-500">Chat with us now</p>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400 text-xs group-hover/item:text-[#25D366] transition-colors"></i>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
