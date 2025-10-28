import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { banners } from '../data/siteData';

const HeroSection = () => {
  // banners imported from siteData

  return (
    <section className="relative mt-20 md:mt-24">
      {/* Banner Carousel */}
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[300px] md:h-[500px] lg:h-[600px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Search Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-3xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            Holidays Packages
          </h1>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter Your Dream Destination!"
              className="flex-1 px-6 py-3 rounded-l-full border-2 border-primary focus:outline-none focus:border-secondary text-gray-700"
            />
            <button className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-r-full transition-colors">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
