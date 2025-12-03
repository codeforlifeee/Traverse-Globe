import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { hotelCategories } from '../data/siteData';
import 'swiper/css';
import 'swiper/css/navigation';

const HotelCard = ({ hotel }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl group transition-all duration-300 bg-white h-full max-w-[320px] mx-auto">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={hotel.image} 
          alt={hotel.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-darkBlue/50 group-hover:bg-teal/50 transition-colors duration-300" />
      </div>
      <div className="p-3 bg-white">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className="text-base md:text-lg font-bold text-darkBlue font-season">{hotel.title}</h3>
          <Link 
            to={hotel.link} 
            className="bg-orange text-white py-1.5 px-3 text-xs rounded-full font-semibold font-poppins hover:bg-teal transition-all hover:shadow-lg whitespace-nowrap flex-shrink-0"
          >
            Explore
          </Link>
        </div>
        <p className="text-xs text-darkBlue/70 font-canva-sans">{hotel.blurb}</p>
      </div>
    </div>
  );
};

export default function HotelCategories() {
  return (
    <section className="py-8 md:py-10 lg:py-12 bg-lightGray">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-darkBlue font-poppins">Explore Hotels</h2>
        </div>
        <p className="text-xs md:text-sm text-darkBlue/80 mb-5 font-canva-sans">Discover the perfect accommodation for your stay</p>
        
        <Swiper
          slidesPerView={1}
          spaceBetween={14}
          autoplay={{
            delay: 3500,
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
          className="categorySwiper"
        >
          {hotelCategories.map((hotel, idx) => (
            <SwiperSlide key={idx}>
              <HotelCard hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
