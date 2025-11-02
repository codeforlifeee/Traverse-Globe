import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { hotelCategories } from '../data/siteData';
import 'swiper/css';
import 'swiper/css/navigation';

const HotelCard = ({ hotel }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl group transition-all duration-300 bg-white h-full">
      <div className="relative overflow-hidden h-44 md:h-52">
        <img 
          src={hotel.image} 
          alt={hotel.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-darkBlue/50 group-hover:bg-teal/50 transition-colors duration-300" />
      </div>
      <div className="p-3 bg-white">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className="text-lg font-bold text-darkBlue font-season">{hotel.title}</h3>
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
    <section className="section-padding bg-lightGray">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl md:text-2xl font-bold text-darkBlue font-poppins">Explore Hotels</h2>
        </div>
        <p className="text-sm text-darkBlue/80 mb-6 font-canva-sans">Discover the perfect accommodation for your stay</p>
        
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
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
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
