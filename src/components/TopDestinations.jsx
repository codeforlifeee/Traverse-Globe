import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { fetchDomesticDestinations } from '../services/sanityClient';

const TopDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await fetchDomesticDestinations();
        setDestinations(data);
      } catch (error) {
        console.error('Failed to load destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDestinations();

    // Refetch on window focus to ensure fresh data
    const handleFocus = () => {
      loadDestinations();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (loading) {
    return (
      <section className="py-8 md:py-10 lg:py-12 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div>
          </div>
        </div>
      </section>
    );
  }

  if (destinations.length === 0) return null;

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-white">
      <div className="container-custom">
        <div className="mb-5 md:mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-2 text-darkBlue font-poppins">
            Trending Domestic Destinations
          </h2>
          <p className="text-sm md:text-base text-darkBlue/70 font-canva-sans">Explore the hottest travel spots around the country</p>
        </div>
        
        <Swiper
          slidesPerView={1}
          spaceBetween={14}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
          }}
          className="topDestinationSwiper"
        >
          {destinations.map((destination, index) => (
            <SwiperSlide key={index}>
              <Link to={destination.link || '#'} className="block">
                <div className="destination-box group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 bg-white">
                  <div className="relative overflow-hidden aspect-[4/3] md:aspect-[5/4] lg:aspect-[4/3]">
                    {destination.image ? (
                      <img
                        src={destination.image.replace(/w=\d+/, 'w=600').replace(/q=\d+/, 'q=50') + (destination.image.includes('images.unsplash.com') ? (destination.image.includes('?') ? '&' : '?') + 'fm=webp' : '')}
                        srcSet={`${destination.image.replace(/w=\d+/, 'w=400').replace(/q=\d+/, 'q=50') + (destination.image.includes('images.unsplash.com') ? (destination.image.includes('?') ? '&' : '?') + 'fm=webp' : '')} 400w, ${destination.image.replace(/w=\d+/, 'w=600').replace(/q=\d+/, 'q=50') + (destination.image.includes('images.unsplash.com') ? (destination.image.includes('?') ? '&' : '?') + 'fm=webp' : '')} 600w, ${destination.image.replace(/w=\d+/, 'w=800').replace(/q=\d+/, 'q=50') + (destination.image.includes('images.unsplash.com') ? (destination.image.includes('?') ? '&' : '?') + 'fm=webp' : '')} 800w`}
                        sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        alt={destination.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-lightGray flex items-center justify-center">
                        <span className="text-darkBlue/50">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/90 via-darkBlue/40 to-transparent group-hover:from-orange/90 transition-colors duration-200"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                      <div className="text-white">
                        <strong className="text-xl md:text-2xl font-season drop-shadow-lg block mb-1">{destination.title}</strong>
                        <p className="text-sm text-white/90 font-canva-sans flex items-center gap-2">
                          <span>Explore packages</span>
                          <i className="fa-solid fa-arrow-right text-xs"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopDestinations;
