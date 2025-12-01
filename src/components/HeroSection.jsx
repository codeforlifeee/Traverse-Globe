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
        {/* Enhanced Search Overlay with MakeMyTrip style */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-4xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-7"
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <div className="mb-5">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-season font-bold text-darkBlue mb-2">
                Find Your Perfect Holiday
              </h1>
              <p className="text-xs md:text-sm text-darkBlue/70 font-canva-sans">
                Explore amazing destinations worldwide
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-orange">
                  <i className="fa-solid fa-location-dot text-xl"></i>
                </div>
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 text-darkBlue text-sm md:text-base font-canva-sans placeholder:text-darkBlue/40 transition-all duration-200"
                />
              </div>
              <button className="bg-orange hover:bg-teal text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base rounded-xl transition-all duration-200 font-poppins font-semibold flex items-center justify-center gap-2 whitespace-nowrap">
                <i className="fa-solid fa-search text-lg"></i>
                <span>Search Packages</span>
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-darkBlue/60 font-canva-sans font-medium">Popular:</span>
              {['Dubai', 'Bali', 'Thailand', 'Kashmir'].map((dest) => (
                <button 
                  key={dest}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-orange/10 border border-gray-200 hover:border-orange/30 text-darkBlue hover:text-orange text-xs rounded-lg transition-all duration-200 font-canva-sans font-medium"
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
