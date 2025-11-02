import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const categories = [
  { title: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', link: '/packages/uae', blurb: 'Desert safari, sky-high views, and culture' },
  { title: 'Bali', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80', link: '/packages/bali', blurb: 'Beaches, temples, and lush rice terraces' },
  { title: 'Thailand', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', link: '/packages/thailand', blurb: 'Islands, food, and vibrant culture' },
  { title: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80', link: '/packages/singapore', blurb: 'City lights, attractions, and family fun' },
];

const CategoryCard = ({ category }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl group transition-all duration-300 bg-white h-full">
      <div className="relative overflow-hidden h-44 md:h-52">
        <img src={category.image} alt={category.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-darkBlue/50 group-hover:bg-teal/50 transition-colors duration-300" />
      </div>
      <div className="p-3 bg-white">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className="text-lg font-bold text-darkBlue font-season">{category.title}</h3>
          <Link to={category.link} className="bg-orange text-white py-1.5 px-3 text-xs rounded-full font-semibold font-poppins hover:bg-teal transition-all hover:shadow-lg whitespace-nowrap flex-shrink-0">View Packages</Link>
        </div>
        <p className="text-xs text-darkBlue/70 font-canva-sans">{category.blurb}</p>
      </div>
    </div>
  );
};

export default function PackageCategories(){
  return (
    <section className="section-padding bg-lightGray">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl md:text-2xl font-bold text-darkBlue font-poppins">Explore by Category</h2>
        </div>
  <p className="text-sm text-darkBlue/80 mb-6 font-canva-sans">Find your perfect getaway, tailored to your interests</p>
        
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
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="categorySwiper"
        >
          {categories.map((c, idx) => (
            <SwiperSlide key={idx}>
              <CategoryCard category={c} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
