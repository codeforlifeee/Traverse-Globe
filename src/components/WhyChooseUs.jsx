import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { services, companyInfo } from '../data/siteData';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-6 transition-all duration-200 text-center border border-gray-100 h-full flex flex-col"
      style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)' }}
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange/10 flex items-center justify-center transition-all duration-200">
        <i className={`${icon} text-3xl text-orange`}></i>
      </div>
      <h4 className="text-lg font-bold mb-3 text-darkBlue font-poppins">{title}</h4>
      <p className="text-darkBlue/70 leading-relaxed font-canva-sans text-sm flex-1">{description}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  // services imported from siteData

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Title and Description */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-darkBlue mb-3 font-poppins">
                Why Choose {companyInfo.name}?
              </h2>
              <div className="w-20 h-1.5 bg-orange rounded-full"></div>
            </div>
            <p className="text-darkBlue/70 leading-relaxed text-sm md:text-base font-canva-sans mb-4">
              At {companyInfo.name}, we specialize exclusively in Dubai, offering you a journey through
              its most unique and unexplored destinations. Our deep focus on this vibrant city allows
              us to craft unparalleled experiences that go beyond the ordinary.
            </p>
            <p className="text-darkBlue/70 leading-relaxed text-sm md:text-base font-canva-sans mb-6">
              Discover hidden gems, enjoy exclusive access, and immerse yourself in Dubai like never before. 
              Choose {companyInfo.name} for a travel adventure that's as unique as the city itself!
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100">
                <i className="fa-solid fa-check-circle text-green-600 text-base"></i>
                <span className="text-sm font-medium text-darkBlue font-canva-sans">Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100">
                <i className="fa-solid fa-check-circle text-green-600 text-base"></i>
                <span className="text-sm font-medium text-darkBlue font-canva-sans">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100">
                <i className="fa-solid fa-check-circle text-green-600 text-base"></i>
                <span className="text-sm font-medium text-darkBlue font-canva-sans">Expert Guidance</span>
              </div>
            </div>
          </div>

          {/* Right Column - Services Slider */}
          <div>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="serviceSlider"
            >
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
