import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { internationalDestinations } from '../data/siteData';
import { useNavigate } from 'react-router-dom';

const DestinationCard = ({ image, title, onClick }) => {
  // Build responsive sets for Unsplash 800px base URLs
  const buildUrl = (w) => {
    let u = image;
    u = u.replace(/w=\d+/, `w=${w}`);
    u = /q=\d+/.test(u) ? u.replace(/q=\d+/, 'q=70') : `${u}&q=70`;
    if (!/auto=/.test(u)) u += `${u.includes('?') ? '&' : '?'}auto=format`;
    if (!/fit=/.test(u)) u += `&fit=crop`;
    return u;
  };
  const srcSet = `${buildUrl(480)} 480w, ${buildUrl(800)} 800w, ${buildUrl(1200)} 1200w`;
  return (
    <div 
      className="destination-box group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      onClick={onClick}
      style={{ animationDelay: '0.1s' }}
    >
      <div className="relative overflow-hidden h-72">
        <img
          src={buildUrl(800)}
          srcSet={srcSet}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-darkBlue/40 group-hover:bg-teal/40 transition-colors duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="text-white">
            <strong className="text-2xl font-season drop-shadow-lg">{title}</strong>
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
    // For now, route UAE to the UAE packages listing; others can be added later
    if (link.includes('uae')) navigate('/uae-packages');
    else navigate('/');
  };

  return (
    <section className="section-padding bg-lightGray">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-darkBlue font-poppins">
          Trending Destinations | International
        </h2>
  <p className="text-darkBlue/80 mb-8 font-canva-sans">Explore the hottest travel spots around the globe</p>
        
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
              spaceBetween: 24,
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
