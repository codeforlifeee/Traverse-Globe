import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { fetchFeaturedPackages } from '../services/sanityClient';
import BookingModal from './BookingModal';
import { slugify } from '../utils/slug';

const PackageCard = ({ image, price, title, buttonLabel = 'Book Now', onClick }) => {
  // Fallback image if none provided
  const defaultImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=50';
  const imageUrl = image || defaultImage;
  
  const addWebp = (u) => u.includes('images.unsplash.com') && !/fm=/.test(u) ? `${u}${u.includes('?') ? '&' : '?'}fm=webp` : u;
  const src480 = addWebp(imageUrl.replace(/w=\d+/, 'w=480').replace(/q=\d+/, 'q=50'));
  const src800 = addWebp(imageUrl.replace(/w=\d+/, 'w=800').replace(/q=\d+/, 'q=50'));
  const src1200 = addWebp(imageUrl.replace(/w=\d+/, 'w=1200').replace(/q=\d+/, 'q=50'));
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
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  // const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      try {
        // Fetch featured packages, but fallback to all packages if no featured ones exist
        let data = await fetchFeaturedPackages(20);
        
        // If no featured packages, fetch regular packages
        if (data.length === 0) {
          const { fetchPackages } = await import('../services/sanityClient');
          data = await fetchPackages({ limit: 20 });
        }
        
        setPackages(data);
      } catch (error) {
        console.error('Failed to load packages:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPackages();

    // Refetch on window focus to ensure fresh data
    const handleFocus = () => {
      loadPackages();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

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
    // Use slug from Sanity or detailId if available
    if (pkg.slug?.current) {
      const destinationType = pkg.category === 'kashmir' || pkg.category === 'kerala' || pkg.category === 'jaipur' || pkg.category === 'andaman' ? 'domestic' : 'international';
      window.open(`/destinations/${destinationType}/${pkg.category}/${pkg.slug.current}`, '_blank', 'noopener,noreferrer');
      return;
    }
    if (pkg.detailId) {
      const slug = slugify(pkg.title);
      const { type, category } = resolveCategoryFromDetailId(pkg.detailId);
      window.open(`/destinations/${type}/${category}/${slug}`, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedTitle(pkg.title);
    setShowBooking(true);
  };

  if (loading) {
    return (
      <section className="py-8 md:py-10 lg:py-12 bg-lightGray">
        <div className="container-custom">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div>
          </div>
        </div>
      </section>
    );
  }

  if (packages.length === 0) return null;

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-lightGray">
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
                image={pkg.bannerImage || pkg.image}
                price={pkg.price || 0}
                title={pkg.title || 'Package'}
                buttonLabel={pkg.buttonLabel || 'Book Now'}
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
