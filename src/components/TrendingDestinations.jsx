import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { internationalDestinations } from '../data/siteData';
import { useNavigate } from 'react-router-dom';

const DestinationCard = ({ image, title, onClick }) => {
  // Build responsive sets with optimized quality for faster loading
  const buildUrl = (w) => {
    let u = image;
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
      className="destination-box group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      onClick={onClick}
      style={{ animationDelay: '0.1s' }}
    >
  <div className="relative overflow-hidden h-48 md:h-56">
        <img
          src={buildUrl(600)}
          srcSet={srcSet}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-darkBlue/40 group-hover:bg-teal/40 transition-colors duration-300"></div>
  <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="text-white">
            <strong className="text-lg md:text-xl font-season drop-shadow-lg">{title}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrendingDestinations = () => {
  const destinations = internationalDestinations;
  const navigate = useNavigate();

  const handleDestinationClick = (link) => {
    // Direct navigation to the destination
    navigate(link || '/destinations');
  };

  return (
    <section className="section-padding bg-lightGray">
      <div className="container-custom">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-darkBlue font-poppins">
          Trending Destinations | International
        </h2>
  <p className="text-sm text-darkBlue/80 mb-6 font-canva-sans">Explore the hottest travel spots around the globe</p>
        
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
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
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
