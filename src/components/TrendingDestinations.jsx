import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchInternationalDestinations } from '../services/sanityClient';
import { useNavigate } from 'react-router-dom';

const DestinationCard = ({ image, title, onClick }) => {
  // Fallback for missing images
  const defaultImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=50';
  const imageUrl = image || defaultImage;
  
  // Build responsive sets with optimized quality for faster loading
  const buildUrl = (w) => {
    let u = imageUrl;
    u = u.replace(/w=\d+/, `w=${w}`);
    u = /q=\d+/.test(u) ? u.replace(/q=\d+/, 'q=50') : `${u}&q=50`;
    if (!/auto=/.test(u)) u += `${u.includes('?') ? '&' : '?'}auto=format`;
    if (!/fit=/.test(u)) u += `&fit=crop`;
    if (u.includes('images.unsplash.com') && !/fm=/.test(u)) u += `&fm=webp`;
    // Add dpr=1 for Pexels to prevent serving 2x images unnecessarily
    if (u.includes('pexels.com') && !/dpr=/.test(u)) u += `&dpr=1`;
    return u;
  };
  const srcSet = `${buildUrl(400)} 400w, ${buildUrl(600)} 600w, ${buildUrl(800)} 800w`;
  return (
    <div 
      className="destination-box group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 bg-white"
      onClick={onClick}
      style={{ animationDelay: '0.1s' }}
    >
  <div className="relative overflow-hidden aspect-[4/3] md:aspect-[5/4] lg:aspect-[4/3]">
        <img
          src={buildUrl(600)}
          srcSet={srcSet}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/90 via-darkBlue/40 to-transparent group-hover:from-orange/90 transition-colors duration-200"></div>
  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          <div className="text-white">
            <strong className="text-xl md:text-2xl font-season drop-shadow-lg block mb-1">{title}</strong>
            <p className="text-sm text-white/90 font-canva-sans flex items-center gap-2">
              <span>Explore packages</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrendingDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await fetchInternationalDestinations();
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

  const handleDestinationClick = (link) => {
    // Direct navigation to the destination
    navigate(link || '/destinations');
  };

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-white">
      <div className="container-custom">
        <div className="mb-5 md:mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-2 text-darkBlue font-poppins">
            Trending International Destinations
          </h2>
          <p className="text-sm md:text-base text-darkBlue/70 font-canva-sans">Discover the hottest travel spots around the globe</p>
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
          className="destinationSwiper"
        >
          {destinations.map((destination, index) => (
            <SwiperSlide key={index}>
              <DestinationCard
                image={destination.image}
                title={destination.title}
                onClick={() => handleDestinationClick(destination.link)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendingDestinations;
