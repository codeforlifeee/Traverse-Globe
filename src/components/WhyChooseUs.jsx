import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { services } from '../data/siteData';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/20 text-center">
      <div className="text-5xl text-primary mb-6 transition-all duration-300 hover:scale-110 hover:rotate-6 inline-block">
        <i className={icon}></i>
      </div>
      <h4 className="text-xl font-bold mb-4 text-gray-800">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  // services imported from siteData

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Title and Description */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Why Choose Traverse Globe?
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              At Traverse Globe, we specialize exclusively in Dubai, offering you a journey through
              its most unique and unexplored destinations. Our deep focus on this vibrant city allows
              us to craft unparalleled experiences that go beyond the ordinary. Discover hidden gems,
              enjoy exclusive access, and immerse yourself in Dubai like never before. Choose Traverse
              Globe for a travel adventure that's as unique as the city itself!
            </p>
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
