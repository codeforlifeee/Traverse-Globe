import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { packages as sitePackages } from '../data/siteData';
import BookingModal from './BookingModal';

const PackageCard = ({ image, price, title, buttonLabel = 'Book Now', onClick }) => {
  return (
    <div className="custom-card">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110 hover:rotate-2"
        />
      </div>
      <div className="p-6">
        <div className="gradient-text text-3xl font-extrabold mb-2">
          ₹ {price.toLocaleString()}
        </div>
        <div className="text-gray-800 font-bold text-lg mb-4 text-center">
          {title}
        </div>
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="fas fa-star text-yellow-400 mx-0.5 transition-transform hover:scale-125 hover:rotate-360"></i>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClick}
            className="custom-btn hover:bg-accent/90"
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
  const navigate = useNavigate();

  const handleCardClick = (pkg) => {
    // If a detailId is provided, navigate to the package details page; otherwise open booking modal
    if (pkg.detailId) {
      navigate(`/package/${pkg.detailId}`);
      return;
    }
    setSelectedTitle(pkg.title);
    setShowBooking(true);
  };

  return (
    <section className="py-12 md:py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Explore Prices
          </h2>
          <p className="text-gray-600">Explore the hottest travel spots around the globe.</p>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
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
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
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
