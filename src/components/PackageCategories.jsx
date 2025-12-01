import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const categories = [
  { title: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', link: '/destinations/international/uae', blurb: 'Desert safari, sky-high views, and culture' },
  { title: 'Bali', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80', link: '/destinations/international/bali', blurb: 'Beaches, temples, and lush rice terraces' },
  { title: 'Thailand', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', link: '/destinations/international/thailand', blurb: 'Islands, food, and vibrant culture' },
  { title: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80', link: '/destinations/international/singapore', blurb: 'City lights, attractions, and family fun' },
];

const CategoryCard = ({ category }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl group transition-all duration-300 bg-white h-full border border-gray-100 max-w-[360px] mx-auto"
      style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)' }}
    >
      {/* Use aspect-ratio for consistent sizing across screen sizes instead of fixed heights */}
      <div className="relative overflow-hidden aspect-[3/2] md:aspect-[4/3] lg:aspect-[5/3]">
        <img src={category.image} alt={category.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/80 via-darkBlue/30 to-transparent" />
        <div className="absolute top-4 right-4 bg-orange text-white px-4 py-1.5 rounded-full text-xs font-semibold"
          style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        >
          <i className="fa-solid fa-fire mr-1.5"></i>
          Popular
        </div>
      </div>
      <div className="p-5 bg-white">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-darkBlue mb-2 font-season">{category.title}</h3>
        <p className="text-sm md:text-base text-darkBlue/70 mb-5 font-canva-sans line-clamp-2 leading-relaxed">{category.blurb}</p>
        <Link to={category.link} className="inline-flex items-center gap-2 text-orange hover:text-teal font-semibold font-poppins text-base transition-colors group/link">
          <span>Explore Packages</span>
          <i className="fa-solid fa-arrow-right text-sm transition-transform group-hover/link:translate-x-1"></i>
        </Link>
      </div>
    </div>
  );
};

export default function PackageCategories(){
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container-custom">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-darkBlue font-poppins mb-3">Explore by Category</h2>
          <p className="text-base md:text-lg text-darkBlue/70 font-canva-sans">Find your perfect getaway, tailored to your interests</p>
        </div>
        
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
            1024: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="categorySwiper"
        >
          {categories.map((c, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-stretch">
              <CategoryCard category={c} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
