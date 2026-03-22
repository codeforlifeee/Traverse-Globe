import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../utils/slug';

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

export default function QuickViewCard({ 
  pkg, 
  id, 
  title, 
  duration, 
  price, 
  originalPrice, 
  image, 
  destination, 
  buttonLabel = 'View Package', 
  category 
}) {
  const [isFlipped, setIsFlipped] = useState(false);
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
    image: basePackage.image || basePackage.bannerImage,
    nights: basePackage.nights || basePackage.duration
  };

  // Compute a stable slug - use Sanity slug if available
  const computedSlug = useMemo(() => {
    return packageData.slug?.current || slugify(packageData.title);
  }, [packageData.slug, packageData.title]);

  const resolvedCategory = useMemo(() => {
    // Use category from props, or Sanity category, or fall back to ID-based logic
    if (category) return category;
    if (packageData.category) return packageData.category;
    
    // Fallback to ID-based category resolution
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

  // Ensure image exists
  const imageUrl = packageData.image || packageData.bannerImage || '';

  // Handle navigation to full package page
  const handleViewPackage = () => {
    navigate(packageLink);
  };

  // Handle share button click
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: packageData.title,
        text: `Check out this amazing package: ${packageData.title}`,
        url: window.location.href
      }).catch(err => console.log('Share failed:', err));
    } else {
      // Fallback: copy to clipboard
      const url = `${window.location.origin}${packageLink}`;
      navigator.clipboard.writeText(url).then(() => {
        alert('Package link copied to clipboard!');
      });
    }
  };

  const itineraryDays = packageData.itinerary?.days || [];
  const inclusions = packageData.inclusions || [];
  const exclusions = packageData.exclusions || [];
  const accommodations = packageData.hotels?.options || packageData.hotels || [];

  return (
    <div className="custom-card group bg-white flex flex-col flip-card-container">
      <div className="flip-card" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        
        {/* FRONT SIDE */}
        <div className="flip-card-front flex flex-col w-full">
          {/* Image Section */}
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

          {/* Content Section */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-semibold text-darkBlue text-base md:text-lg font-poppins mb-2 line-clamp-2 min-h-[2.5rem]">
              {packageData.title}
            </h3>
            <PriceTag strike={packageData.strikePrice} price={packageData.price} />
            
            {/* Buttons Section - Pushed to bottom */}
            <div className="mt-auto pt-3 flex flex-col sm:flex-row gap-2">
              <button 
                onClick={() => setIsFlipped(true)}
                className="custom-btn text-xs px-3 py-1.5 font-medium flex-1 hover:scale-[1.02] transition-all duration-200"
              >
                <i className="fa-solid fa-bolt mr-1 text-xs"></i>
                Quick View
              </button>
              <button 
                onClick={handleViewPackage}
                className="custom-btn text-xs px-3 py-1.5 font-medium flex-1 bg-teal hover:bg-teal/90 hover:scale-[1.02] transition-all duration-200"
              >
                <i className="fa-solid fa-eye mr-1 text-xs"></i>
                View Full Package
              </button>
            </div>
          </div>
        </div>

        {/* BACK SIDE (Quick View) */}
        <div className="flip-card-back flex flex-col w-full">
          {/* Back content starts immediately */}
          <div className="p-4 flex flex-col min-h-full overflow-y-auto bg-white">
            
            {/* Header with Close Button */}
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
              <h4 className="font-bold text-darkBlue text-sm font-poppins">Quick View</h4>
              <button
                onClick={() => setIsFlipped(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-orange/20 flex items-center justify-center transition-all duration-200 text-darkBlue hover:text-orange"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            {/* Itinerary Section */}
            {itineraryDays.length > 0 && (
              <div className="mb-3">
                <h5 className="font-semibold text-xs text-darkBlue mb-2 text-orange">ITINERARY</h5>
                <div className="space-y-1.5 max-h-24 overflow-y-auto">
                  {itineraryDays.slice(0, 4).map((day, idx) => (
                    <div key={idx} className="text-xs bg-gray-50 p-2 rounded border-l-2 border-orange">
                      <p className="font-semibold text-darkBlue">{day.dayKey || `Day ${idx + 1}`}: {day.title}</p>
                      <p className="text-gray-600 text-xs line-clamp-1">{day.description}</p>
                    </div>
                  ))}
                  {itineraryDays.length > 4 && (
                    <p className="text-xs text-orange font-medium">+{itineraryDays.length - 4} more days</p>
                  )}
                </div>
              </div>
            )}

            {/* Inclusions Section */}
            {inclusions.length > 0 && (
              <div className="mb-3">
                <h5 className="font-semibold text-xs text-darkBlue mb-1.5 text-orange">INCLUSIONS</h5>
                <ul className="space-y-0.5 max-h-16 overflow-y-auto">
                  {inclusions.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex gap-1.5">
                      <i className="fa-solid fa-check text-orange text-xs mt-0.5 flex-shrink-0"></i>
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                  {inclusions.length > 3 && (
                    <p className="text-xs text-orange font-medium">+{inclusions.length - 3} more</p>
                  )}
                </ul>
              </div>
            )}

            {/* Exclusions Section */}
            {exclusions.length > 0 && (
              <div className="mb-3">
                <h5 className="font-semibold text-xs text-darkBlue mb-1.5 text-orange">EXCLUSIONS</h5>
                <ul className="space-y-0.5 max-h-16 overflow-y-auto">
                  {exclusions.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex gap-1.5">
                      <i className="fa-solid fa-circle-xmark text-red-500 text-xs mt-0.5 flex-shrink-0"></i>
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                  {exclusions.length > 3 && (
                    <p className="text-xs text-orange font-medium">+{exclusions.length - 3} more</p>
                  )}
                </ul>
              </div>
            )}

            {/* Accommodations Section */}
            {accommodations.length > 0 && (
              <div className="mb-3">
                <h5 className="font-semibold text-xs text-darkBlue mb-1.5 text-orange">ACCOMMODATIONS</h5>
                <ul className="space-y-0.5 max-h-16 overflow-y-auto">
                  {accommodations.slice(0, 3).map((hotel, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex gap-1.5">
                      <i className="fa-solid fa-building text-teal text-xs mt-0.5 flex-shrink-0"></i>
                      <span className="line-clamp-1">{hotel}</span>
                    </li>
                  ))}
                  {accommodations.length > 3 && (
                    <p className="text-xs text-orange font-medium">+{accommodations.length - 3} more</p>
                  )}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-auto pt-3 flex flex-col gap-2 border-t border-gray-200">
              <a
                href={`tel:+919997085457`}
                className="custom-btn w-full text-xs px-3 py-2 font-medium hover:scale-[1.02] transition-all duration-200 text-center"
              >
                <i className="fa-solid fa-phone mr-1 text-xs"></i>
                Call Expert
              </a>
              <a
                href={`https://wa.me/919997085457`}
                target="_blank"
                rel="noopener noreferrer"
                className="custom-btn w-full text-xs px-3 py-2 font-medium bg-teal hover:bg-teal/90 hover:scale-[1.02] transition-all duration-200 text-center"
              >
                <i className="fa-brands fa-whatsapp mr-1 text-xs"></i>
                WhatsApp Expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
