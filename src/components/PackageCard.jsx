import { Link } from 'react-router-dom';
import { useState, useRef, useEffect, useMemo } from 'react';
import { slugify } from '../utils/slug';
import { companyInfo, packageDetails } from '../data/siteData';

// Utility function to extract days from nights format
const getDaysFromNights = (nights) => {
  if (!nights) return '';
  const match = nights.match(/(\d+)N\/(\d+)D/);
  if (match) {
    return `${match[2]} Days`;
  }
  return nights;
};

export const PriceTag = ({ strike, price }) => (
  <div className="mt-2">
    {typeof strike === 'number' && (
      <p className="text-xs text-darkBlue/40 line-through font-canva-sans">₹{strike.toLocaleString('en-IN')}</p>
    )}
    <div className="flex items-baseline justify-between gap-2">
      <p className="text-lg md:text-xl font-bold text-orange font-poppins">
        ₹{price?.toLocaleString ? price.toLocaleString('en-IN') : price}
  <span className="block text-xs font-normal text-darkBlue/80 font-canva-sans mt-0.5">Per Person on twin sharing</span>
      </p>
    </div>
  </div>
);

export default function PackageCard({ 
  pkg, 
  id, 
  title, 
  duration, 
  price, 
  originalPrice, 
  image, 
  destination, 
  onView, 
  buttonLabel = 'View Package', 
  category 
}) {
  const [showExpertMenu, setShowExpertMenu] = useState(false);
  const menuRef = useRef(null);

  // Support both pkg object and individual props
  const basePackage = pkg || {
    id,
    title,
    nights: duration,
    price,
    strikePrice: originalPrice,
    image
  };

  // Fetch detailed data from packageDetails if available
  const details = packageDetails[basePackage.id];
  
  // Merge base package with details from packageDetails (details take priority)
  const packageData = {
    ...basePackage,
    ...(details && {
      price: details.price,
      strikePrice: details.strikePrice,
      nights: details.duration,
      bannerImage: details.bannerImage
    }),
    // Ensure image field exists for backward compatibility
    get image() {
      return this.bannerImage || basePackage.image || basePackage.bannerImage;
    }
  };

  // Compute a stable slug for the package details page
  // Always use the package title for consistent URL generation
  const computedSlug = useMemo(() => {
    return slugify(packageData.title);
  }, [packageData.title]);

  const resolvedCategory = useMemo(() => {
    if (category) return category;
    const id = Number(packageData.id);
    if ((id >= 1 && id <= 10)) return 'uae';
    if ((id >= 11 && id <= 15) || (id >= 26 && id <= 30)) return 'bali';
    if ((id >= 16 && id <= 20) || (id >= 36 && id <= 39)) return 'thailand';
    if ((id >= 21 && id <= 25) || (id >= 31 && id <= 35)) return 'singapore';
    if ((id >= 40 && id <= 54)) return 'srilanka';
    if ((id >= 55 && id <= 64)) return 'vietnam';
    if ((id >= 65 && id <= 74)) return 'laos';
    if ((id >= 91 && id <= 100)) return 'andaman';
    if ((id >= 101 && id <= 110)) return 'jaipur';
    if ((id >= 111 && id <= 120)) return 'kerala';
    if ((id >= 121 && id <= 130)) return 'kashmir';
    return 'uae';
  }, [category, packageData.id]);

  // Determine destination type (international/domestic) based on category
  const destinationType = useMemo(() => {
    const domesticCategories = ['andaman', 'jaipur', 'kerala', 'kashmir'];
    return domesticCategories.includes(resolvedCategory) ? 'domestic' : 'international';
  }, [resolvedCategory]);
  
  // Use destination prop if provided (new routing), otherwise construct from category
  const packageLink = destination || `/destinations/${destinationType}/${resolvedCategory}/${computedSlug}`;

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

  // Ensure image exists
  const imageUrl = packageData.image || packageData.bannerImage || '';
  
  return (
    <div className="custom-card group bg-white h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl.replace(/w=\d+/, 'w=500').replace(/q=\d+/, 'q=50').replace(/&q=\d+/, '&q=50')}
          srcSet={`${imageUrl.replace(/w=\d+/, 'w=400').replace(/q=\d+/, 'q=50').replace(/&q=\d+/, '&q=50')} 400w, ${imageUrl.replace(/w=\d+/, 'w=500').replace(/q=\d+/, 'q=50').replace(/&q=\d+/, '&q=50')} 500w`}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={packageData.title}
          loading="lazy"
          decoding="async"
          className="w-full h-44 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {packageData.nights && (
          <div className="absolute left-3 bottom-3 bg-darkBlue text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg font-poppins backdrop-blur-sm bg-opacity-90 whitespace-nowrap min-w-fit">
            <span className="inline-block">{getDaysFromNights(packageData.nights)}</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-darkBlue text-base md:text-lg font-poppins mb-2 line-clamp-2 min-h-[2.5rem]">{packageData.title}</h3>
        <PriceTag strike={packageData.strikePrice} price={packageData.price} />
        
        {/* Buttons Section - Pushed to bottom */}
        <div className="mt-auto pt-3 flex flex-col sm:flex-row gap-2">
          {onView ? (
            <button 
              onClick={() => onView(packageData)} 
              className="custom-btn text-xs px-3 py-1.5 font-medium flex-1 hover:scale-[1.02] transition-all duration-200"
            >
              <i className="fa-solid fa-eye mr-1 text-xs"></i>
              {buttonLabel}
            </button>
          ) : (
            <Link 
              to={packageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn text-xs px-3 py-1.5 font-medium flex-1 hover:scale-[1.02] transition-all duration-200 text-center inline-flex items-center justify-center"
            >
              <i className="fa-solid fa-eye mr-1 text-xs"></i>
              {buttonLabel}
            </Link>
          )}
          
          {/* Connect with Expert Button */}
          <div className="relative flex-1" ref={menuRef}>
            <button
              onClick={() => setShowExpertMenu(!showExpertMenu)}
              className="custom-btn w-full text-xs px-3 py-1.5 font-medium bg-teal hover:bg-teal/90 hover:scale-[1.02] transition-all duration-200"
            >
              <i className="fa-solid fa-headset mr-1 text-xs"></i>
              Expert
            </button>
            
            {/* Dropdown Menu */}
            {showExpertMenu && (
              <div className="absolute right-0 bottom-full mb-2 bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200 w-56 z-20 animate-fadeIn">
                <div className="bg-gradient-to-r from-teal to-primary py-2 px-3">
                  <p className="text-white font-semibold text-xs">Connect</p>
                </div>
                <div className="py-1.5">
                  <a
                    href={`tel:${companyInfo.phone.primary}`}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-orange/5 transition-all duration-200 group/item"
                    onClick={() => setShowExpertMenu(false)}
                  >
                    <div className="w-9 h-9 rounded-full bg-orange/10 flex items-center justify-center group-hover/item:bg-orange/20 transition-colors">
                      <i className="fa-solid fa-phone text-orange text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-darkBlue group-hover/item:text-orange transition-colors">Request a Call Back</p>
                      <p className="text-xs text-gray-500">We'll call you shortly</p>
                    </div>
                    <i className="fa-solid fa-chevron-right text-gray-400 text-xs group-hover/item:text-orange transition-colors"></i>
                  </a>
                  <a
                    href={`https://wa.me/${companyInfo.phone.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#25D366]/5 transition-all duration-200 border-t border-gray-100 group/item"
                    onClick={() => setShowExpertMenu(false)}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover/item:bg-[#25D366]/20 transition-colors">
                      <i className="fa-brands fa-whatsapp text-[#25D366] text-base"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-darkBlue group-hover/item:text-[#25D366] transition-colors">WhatsApp Chat</p>
                      <p className="text-xs text-gray-500">Chat with us now</p>
                    </div>
                    <i className="fa-solid fa-chevron-right text-gray-400 text-xs group-hover/item:text-[#25D366] transition-colors"></i>
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
