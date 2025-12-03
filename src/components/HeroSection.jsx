import { useState, useEffect } from 'react';
import { fetchBanners } from '../services/sanityClient';
import HeroSlider from './HeroSlider';

const HeroSection = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const data = await fetchBanners('general');
        setBanners(data);
      } catch (error) {
        console.error('Failed to load banners:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBanners();

    // Refetch on window focus to ensure fresh data
    const handleFocus = () => {
      loadBanners();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (loading || banners.length === 0) {
    return (
      <section className="relative mt-16 md:mt-[68px] h-[320px] md:h-[420px] lg:h-[500px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mt-16 md:mt-[68px]">
      <HeroSlider 
        images={banners} 
        className="w-full h-[320px] md:h-[420px] lg:h-[500px]"
      >
        {/* Enhanced Search Overlay with translucent background */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 w-[95%] sm:w-11/12 max-w-4xl px-2 md:px-0">
          <div className="bg-white/80 backdrop-blur-md rounded-xl md:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-7"
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <div className="mb-3 md:mb-5">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-season font-bold text-darkBlue mb-1 md:mb-2">
                Find Your Perfect Holiday
              </h1>
              <p className="text-xs md:text-sm text-darkBlue/70 font-canva-sans">
                Explore amazing destinations worldwide
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
              <div className="flex-1 relative">
                <div className="absolute left-3 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 text-orange">
                  <i className="fa-solid fa-location-dot text-base sm:text-lg md:text-xl"></i>
                </div>
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 rounded-lg md:rounded-xl border border-gray-200 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 text-darkBlue text-xs sm:text-sm md:text-base font-canva-sans placeholder:text-darkBlue/40 transition-all duration-200 bg-white/90"
                />
              </div>
              <button className="bg-orange hover:bg-teal text-white px-4 sm:px-5 md:px-8 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base rounded-lg md:rounded-xl transition-all duration-200 font-poppins font-semibold flex items-center justify-center gap-2 whitespace-nowrap">
                <i className="fa-solid fa-search text-sm sm:text-base md:text-lg"></i>
                <span className="hidden xs:inline">Search Packages</span>
                <span className="xs:hidden">Search</span>
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-3 md:mt-4 flex flex-wrap gap-1.5 md:gap-2 items-center">
              <span className="text-xs text-darkBlue/60 font-canva-sans font-medium">Popular:</span>
              {['Dubai', 'Bali', 'Thailand', 'Kashmir'].map((dest) => (
                <button 
                  key={dest}
                  className="px-2 md:px-3 py-1 md:py-1.5 bg-white/70 hover:bg-orange/10 border border-gray-200 hover:border-orange/30 text-darkBlue hover:text-orange text-xs rounded-lg transition-all duration-200 font-canva-sans font-medium"
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>
        </div>
      </HeroSlider>
    </section>
  );
};

export default HeroSection;
