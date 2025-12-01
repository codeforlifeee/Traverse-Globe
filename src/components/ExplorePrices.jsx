import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { packages as sitePackages, packageDetails } from '../data/siteData';
import BookingModal from './BookingModal';
import { slugify } from '../utils/slug';

const PackageCard = ({ image, price, title, buttonLabel = 'Book Now', onClick }) => {
  const addWebp = (u) => u.includes('images.unsplash.com') && !/fm=/.test(u) ? `${u}${u.includes('?') ? '&' : '?'}fm=webp` : u;
  const src480 = addWebp(image.replace(/w=\d+/, 'w=480').replace(/q=\d+/, 'q=50'));
  const src800 = addWebp(image.replace(/w=\d+/, 'w=800').replace(/q=\d+/, 'q=50'));
  const src1200 = addWebp(image.replace(/w=\d+/, 'w=1200').replace(/q=\d+/, 'q=50'));
  return (
    <div className="custom-card bg-white max-w-[320px] mx-auto">
      <div className="overflow-hidden">
        <img
          src={src800}
          srcSet={`${src480} 480w, ${src800} 800w, ${src1200} 1200w`}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-3">
        <div className="text-orange text-base md:text-lg font-bold mb-1.5 font-poppins">
          ₹ {price.toLocaleString()}
        </div>
        <div className="text-darkBlue font-semibold text-sm md:text-base mb-2 text-center font-poppins">
          {title}
        </div>
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="fa-solid fa-star text-orange text-xs mx-0.5 transition-transform hover:scale-125"></i>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClick}
            className="custom-btn px-3 py-1.5 text-xs"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

const ExplorePrices = () => {
  const packages = sitePackages;
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  // const navigate = useNavigate();

  const resolveCategoryFromDetailId = (id) => {
    const num = Number(id);
    if ((num >= 1 && num <= 10)) return { type: 'international', category: 'uae' };
    if ((num >= 11 && num <= 15) || (num >= 26 && num <= 30)) return { type: 'international', category: 'bali' };
    if ((num >= 16 && num <= 20) || (num >= 36 && num <= 39)) return { type: 'international', category: 'thailand' };
    if ((num >= 21 && num <= 25) || (num >= 31 && num <= 35)) return { type: 'international', category: 'singapore' };
    if ((num >= 40 && num <= 54)) return { type: 'international', category: 'srilanka' };
    if ((num >= 55 && num <= 70)) return { type: 'international', category: 'vietnam' };
    if ((num >= 71 && num <= 90)) return { type: 'international', category: 'laos' };
    if ((num >= 91 && num <= 100)) return { type: 'domestic', category: 'andaman' };
    if ((num >= 101 && num <= 110)) return { type: 'domestic', category: 'jaipur' };
    if ((num >= 111 && num <= 120)) return { type: 'domestic', category: 'kerala' };
    if ((num >= 121 && num <= 130)) return { type: 'domestic', category: 'kashmir' };
    return { type: 'international', category: 'uae' };
  };

  const handleCardClick = (pkg) => {
    // If a detailId is provided, open the package details page in a new tab with a name-based slug
    if (pkg.detailId) {
      const detail = packageDetails?.[pkg.detailId];
      const slug = slugify(detail?.name || pkg.title);
      const { type, category } = resolveCategoryFromDetailId(pkg.detailId);
      window.open(`/destinations/${type}/${category}/${slug}`, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedTitle(pkg.title);
    setShowBooking(true);
  };

  return (
    <section className="py-10 md:py-12 lg:py-14 bg-lightGray">
      <div className="container-custom">
        <div className="mb-5 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-darkBlue mb-2 font-poppins">
            Explore Prices
          </h2>
          <p className="text-xs md:text-sm text-darkBlue/80 font-canva-sans">Explore the hottest travel spots around the globe</p>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={14}
          loop={true}
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
          className="prizeSwiper py-4"
        >
          {packages.map((pkg, index) => (
            <SwiperSlide key={index}>
              <PackageCard
                image={pkg.image}
                price={pkg.price}
                title={pkg.title}
                buttonLabel={pkg.buttonLabel}
                onClick={() => handleCardClick(pkg)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <BookingModal
          open={showBooking}
          onClose={() => setShowBooking(false)}
          packageName={selectedTitle}
        />
      </div>
    </section>
  );
};

export default ExplorePrices;
