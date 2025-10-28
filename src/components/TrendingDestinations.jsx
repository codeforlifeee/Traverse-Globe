import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { internationalDestinations } from '../data/siteData';
import { useNavigate } from 'react-router-dom';

const DestinationCard = ({ image, title, onClick }) => {
  return (
    <div 
      className="destination-box group cursor-pointer"
      onClick={onClick}
      style={{ animationDelay: '0.1s' }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-120 group-hover:rotate-3"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-all duration-300 group-hover:from-primary/90">
        <div className="text-white">
          <strong className="text-2xl drop-shadow-lg">{title}</strong>
        </div>
      </div>
    </div>
  );
};

const TrendingDestinations = () => {
  const destinations = internationalDestinations;
  const navigate = useNavigate();

  const handleDestinationClick = (link) => {
    // For now, route UAE to the UAE packages listing; others can be added later
    if (link.includes('uae')) navigate('/uae-packages');
    else navigate('/');
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Trending Destinations | International
        </h2>
        
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
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
