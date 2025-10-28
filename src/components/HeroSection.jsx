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
        className="w-full h-[350px] md:h-[500px] lg:h-[650px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-darkBlue/30"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Search Overlay */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-4xl">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-lightGray">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-season font-bold text-center mb-6 text-darkBlue">
            Holiday Packages
          </h1>
          <div className="flex flex-col md:flex-row gap-3 md:gap-0">
            <input
              type="text"
              placeholder="Enter Your Dream Destination!"
              className="flex-1 px-6 py-4 md:rounded-l-full rounded-full md:rounded-r-none border-2 border-lightGray focus:outline-none focus:border-orange text-darkBlue font-canva-sans placeholder:text-darkBlue/50"
            />
            <button className="bg-orange hover:bg-teal text-white px-10 py-4 md:rounded-r-full rounded-full md:rounded-l-none transition-all font-poppins font-semibold shadow-lg hover:shadow-xl">
              <i className="fas fa-search mr-2"></i>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
