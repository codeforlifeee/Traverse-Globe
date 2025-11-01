import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { banners } from '../data/siteData';

const HeroSection = () => {
  // banners imported from siteData

  return (
    <section className="relative mt-16 md:mt-20">
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
  className="w-full h-[280px] md:h-[420px] lg:h-[520px]"
      >
        {banners.map((banner, index) => {
          // Build responsive srcset by varying width and quality params in Unsplash URLs
          const buildUrl = (w) => {
            let u = banner;
            u = u.replace(/w=\d+/, `w=${w}`);
            u = /q=\d+/.test(u) ? u.replace(/q=\d+/, 'q=70') : `${u}&q=70`;
            if (!/auto=/.test(u)) u += `${u.includes('?') ? '&' : '?'}auto=format`;
            if (!/fit=/.test(u)) u += `&fit=crop`;
            return u;
          };
          const srcSet = `${buildUrl(640)} 640w, ${buildUrl(1280)} 1280w, ${buildUrl(1920)} 1920w`;
          return (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={buildUrl(1280)}
                  srcSet={srcSet}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchpriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                  sizes="100vw"
                  width="1920"
                  height="650"
                />
                <div className="absolute inset-0 bg-darkBlue/30"></div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Search Overlay */}
  <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-3xl">
        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-2xl border border-lightGray">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-season font-bold text-center mb-4 text-darkBlue">
            Holiday Packages
          </h1>
          <div className="flex flex-col md:flex-row gap-2 md:gap-0">
            <input
              type="text"
              placeholder="Enter Your Dream Destination!"
              className="flex-1 px-4 py-2.5 md:rounded-l-full rounded-full md:rounded-r-none border-2 border-lightGray focus:outline-none focus:border-orange text-darkBlue text-sm font-canva-sans placeholder:text-darkBlue/50"
            />
            <button className="bg-orange hover:bg-teal text-white px-5 py-2.5 text-sm md:rounded-r-full rounded-full md:rounded-l-none transition-all font-poppins font-semibold shadow-lg hover:shadow-xl">
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
