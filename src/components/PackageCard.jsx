import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useMemo } from 'react';
import { slugify } from '../utils/slug';
import { companyInfo } from '../data/siteData';
import { IoShare } from 'react-icons/io5';

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
  <div className="mt-3">
    {typeof strike === 'number' && (
      <p className="text-sm text-darkBlue/40 line-through font-canva-sans mb-1">₹{strike.toLocaleString('en-IN')}</p>
    )}
    <div className="flex items-baseline justify-between gap-2">
      <p className="text-xl md:text-2xl font-bold text-orange font-poppins">
        ₹{price?.toLocaleString ? price.toLocaleString('en-IN') : price}
  <span className="block text-sm font-normal text-darkBlue/70 font-canva-sans mt-1">Per Person on twin sharing</span>
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
  const [isFlipped, setIsFlipped] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Support both pkg object and individual props
  const basePackage = pkg || {
    id,
    title,
    nights: duration,
    price,
    strikePrice: originalPrice,
    image
  };

  // Use Sanity data structure directly from pkg
  const packageData = {
    ...basePackage,
    // Sanity packages already have all fields
    image: basePackage.image || basePackage.bannerImage,
    nights: basePackage.nights || basePackage.duration
  };

  // Compute a stable slug for the package details page
  // Use Sanity slug if available, otherwise generate from title
  const computedSlug = useMemo(() => {
    return packageData.slug?.current || slugify(packageData.title);
  }, [packageData.slug, packageData.title]);

  const resolvedCategory = useMemo(() => {
    // Use category from props, or Sanity category, or fall back to ID-based logic
    if (category) return category;
    if (packageData.category) return packageData.category;
    
    // Fallback to ID-based category resolution for legacy data
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
  }, [category, packageData.category, packageData.id]);

  // Determine destination type (international/domestic) based on category
  const destinationType = useMemo(() => {
    const domesticCategories = ['andaman', 'jaipur', 'kerala', 'kashmir', 'chardhamyatra'];
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

  // Get details data for quick view from Sanity structure
  const itineraryDays = packageData.itinerary?.days || [];
  const inclusions = packageData.inclusions || [];
  const accommodations = packageData.hotels?.options || packageData.hotels || [];

  // Handle navigation to full package page
  const handleViewPackage = () => {
    navigate(packageLink);
  };

  // Handle share functionality
  const handleShare = async () => {
    const shareData = {
      title: packageData.title,
      text: `Check out this amazing package: ${packageData.title}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  return (
    <div className="custom-card group bg-white h-full flex flex-col flip-card-container">
      <div className="flip-card" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        
        {/* FRONT SIDE */}
        <div className="flip-card-front">
          <div className="relative overflow-hidden rounded-t-2xl h-48 md:h-52">
            <img
              src={imageUrl.replace(/w=\d+/, 'w=500').replace(/q=\d+/, 'q=50').replace(/&q=\d+/, '&q=50')}
              srcSet={`${imageUrl.replace(/w=\d+/, 'w=400').replace(/q=\d+/, 'q=50').replace(/&q=\d+/, '&q=50')} 400w, ${imageUrl.replace(/w=\d+/, 'w=500').replace(/q=\d+/, 'q=50').replace(/&q=\d+/, '&q=50')} 500w`}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              alt={packageData.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {packageData.nights && (
              <div className="absolute left-4 bottom-4 bg-white/95 backdrop-blur-sm text-darkBlue text-xs font-semibold px-4 py-2 rounded-xl font-poppins whitespace-nowrap border border-gray-100"
                style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              >
                <i className="fa-regular fa-calendar text-orange mr-1.5"></i>
                <span className="inline-block">{getDaysFromNights(packageData.nights)}</span>
              </div>
            )}
          </div>
          
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-semibold text-darkBlue text-lg md:text-xl font-poppins mb-3 line-clamp-2 min-h-[2.8rem] leading-snug">{packageData.title}</h3>
            <PriceTag strike={packageData.strikePrice} price={packageData.price} />
            
            {/* Buttons Section - Pushed to bottom */}
            <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-2.5">
              <button 
                onClick={() => setIsFlipped(true)}
                className="custom-btn text-sm px-4 py-2.5 font-medium flex-1 transition-all duration-200"
              >
                <i className="fa-solid fa-bolt mr-1.5 text-sm"></i>
                Quick View
              </button>
              
              {/* View Full Package Button */}
              <button
                onClick={handleViewPackage}
                className="custom-btn text-sm px-4 py-2.5 font-medium flex-1 bg-teal hover:bg-teal/90 transition-all duration-200"
              >
                <i className="fa-solid fa-eye mr-1.5 text-sm"></i>
                View Full Package
              </button>

            </div>
          </div>
        </div>

        {/* BACK SIDE (Quick View) */}
        <div className="flip-card-back overflow-hidden">
          <div className="p-5 flex flex-col h-full bg-white">
            
            {/* Header with Share and Close Button */}
            <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200">
              <h4 className="font-bold text-darkBlue text-base font-poppins">Quick View</h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-orange/10 flex items-center justify-center transition-all duration-200 text-darkBlue hover:text-orange flex-shrink-0"
                  title="Share"
                >
                  <i className="fa-solid fa-share-nodes text-sm"></i>
                </button>
                <button
                  onClick={() => setIsFlipped(false)}
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-red-50 flex items-center justify-center transition-all duration-200 text-darkBlue hover:text-red-600 flex-shrink-0"
                  title="Close"
                >
                  <i className="fa-solid fa-xmark text-base"></i>
                </button>
              </div>
            </div>

            {/* Content - Icon-based minimal text */}
            <div className="flex-1 overflow-y-auto space-y-3">
              
              {/* Itinerary Section */}
              {itineraryDays.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-map-location-dot text-orange text-base"></i>
                    <h5 className="font-semibold text-xs text-darkBlue uppercase tracking-wide">Itinerary</h5>
                    <span className="text-xs bg-orange/20 text-orange rounded px-2 py-0.5 font-medium ml-auto">{itineraryDays.length} Days</span>
                  </div>
                  <div className="space-y-1">
                    {itineraryDays.slice(0, 2).map((day, idx) => (
                      <div key={idx} className="text-xs text-gray-700 flex gap-2 items-start">
                        <span className="font-semibold text-orange min-w-fit">{day.dayKey || `Day ${idx + 1}`}</span>
                        <span className="line-clamp-1">{day.title}</span>
                      </div>
                    ))}
                    {itineraryDays.length > 2 && (
                      <p className="text-xs text-orange font-medium">+{itineraryDays.length - 2} more days</p>
                    )}
                  </div>
                </div>
              )}

              {/* Inclusions Section - Symbol Based */}
              {inclusions.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-check-circle text-green-500 text-base"></i>
                    <h5 className="font-semibold text-xs text-darkBlue uppercase tracking-wide">Included</h5>
                    <span className="text-xs bg-green-100 text-green-700 rounded px-2 py-0.5 font-medium ml-auto">{inclusions.length}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {inclusions.slice(0, 4).map((item, idx) => {
                      // Determine icon based on item content
                      let icon = 'fa-check';
                      if (item.toLowerCase().includes('meal') || item.toLowerCase().includes('food') || item.toLowerCase().includes('breakfast') || item.toLowerCase().includes('lunch') || item.toLowerCase().includes('dinner')) icon = 'fa-utensils';
                      if (item.toLowerCase().includes('hotel') || item.toLowerCase().includes('accommodation') || item.toLowerCase().includes('stay')) icon = 'fa-bed';
                      if (item.toLowerCase().includes('flight') || item.toLowerCase().includes('transport') || item.toLowerCase().includes('airport') || item.toLowerCase().includes('transfer')) icon = 'fa-plane';
                      if (item.toLowerCase().includes('guide') || item.toLowerCase().includes('tour') || item.toLowerCase().includes('visit')) icon = 'fa-person-hiking';
                      if (item.toLowerCase().includes('visa') || item.toLowerCase().includes('insurance') || item.toLowerCase().includes('permit')) icon = 'fa-shield';
                      if (item.toLowerCase().includes('activity') || item.toLowerCase().includes('adventure') || item.toLowerCase().includes('water') || item.toLowerCase().includes('sport')) icon = 'fa-person-skiing';

                      return (
                        <div key={idx} className="text-xs text-gray-700 flex flex-col items-center gap-1 p-1.5 bg-green-50 rounded border border-green-200">
                          <i className={`fa-solid ${icon} text-green-500 text-lg`}></i>
                          <span className="text-center line-clamp-2 text-xs font-medium">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                  {inclusions.length > 4 && (
                    <p className="text-xs text-green-600 font-medium mt-1.5">+{inclusions.length - 4} more included</p>
                  )}
                </div>
              )}

              {/* Accommodations Section */}
              {accommodations.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-hotel text-teal text-base"></i>
                    <h5 className="font-semibold text-xs text-darkBlue uppercase tracking-wide">Hotels</h5>
                    <span className="text-xs bg-teal/20 text-teal rounded px-2 py-0.5 font-medium ml-auto">{accommodations.length}</span>
                  </div>
                  <div className="space-y-1">
                    {accommodations.slice(0, 2).map((hotel, idx) => (
                      <div key={idx} className="text-xs text-gray-700 flex gap-2 items-center">
                        <span className="flex gap-1 min-w-fit">
                          {[1, 2, 3].map((star) => (
                            <i key={star} className={`fa-solid fa-star text-xs ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                          ))}
                        </span>
                        <span className="line-clamp-1">{hotel}</span>
                      </div>
                    ))}
                  </div>
                  {accommodations.length > 2 && (
                    <p className="text-xs text-teal font-medium mt-1">+{accommodations.length - 2} more hotels</p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons - Bottom Aligned */}
            <div className="mt-4 pt-4 flex flex-col gap-2 border-t border-gray-200">
              {/* Expert Button with Dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowExpertMenu(!showExpertMenu)}
                  className="custom-btn w-full text-sm px-4 py-3 font-medium transition-all duration-200"
                >
                  <i className="fa-solid fa-headset mr-2 text-sm"></i>
                  Connect with Expert
                </button>
                
                {/* Dropdown Menu */}
                {showExpertMenu && (
                  <div className="absolute left-0 bottom-full mb-2 bg-white rounded-2xl overflow-hidden border border-gray-100 w-full z-20 animate-fadeIn"
                    style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                  >
                    <div className="bg-gradient-to-r from-teal to-primary py-3 px-4">
                      <p className="text-white font-semibold text-sm">Contact Options</p>
                    </div>
                    <div className="py-2">
                      <a
                        href={`tel:${companyInfo.phone.primary}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-orange/5 transition-all duration-200 group/item"
                        onClick={() => setShowExpertMenu(false)}
                      >
                        <div className="w-11 h-11 rounded-xl bg-orange/10 flex items-center justify-center group-hover/item:bg-orange/20 transition-colors">
                          <i className="fa-solid fa-phone text-orange text-base"></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-darkBlue group-hover/item:text-orange transition-colors">Call Us</p>
                          <p className="text-xs text-gray-500 mt-0.5">{companyInfo.phone.primary}</p>
                        </div>
                      </a>
                      <a
                        href={`https://wa.me/${companyInfo.phone.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#25D366]/5 transition-all duration-200 border-t border-gray-100 group/item"
                        onClick={() => setShowExpertMenu(false)}
                      >
                        <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center group-hover/item:bg-[#25D366]/20 transition-colors">
                          <i className="fa-brands fa-whatsapp text-[#25D366] text-lg"></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-darkBlue group-hover/item:text-[#25D366] transition-colors">WhatsApp</p>
                          <p className="text-xs text-gray-500 mt-0.5">Chat with us now</p>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
