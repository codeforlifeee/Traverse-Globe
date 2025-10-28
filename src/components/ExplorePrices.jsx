import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { packages as sitePackages } from '../data/siteData';
import BookingModal from './BookingModal';

const PackageCard = ({ image, price, title, buttonLabel = 'Book Now', onClick }) => {
  return (
    <div className="custom-card bg-white">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="text-orange text-3xl font-bold mb-2 font-poppins">
          ₹ {price.toLocaleString()}
        </div>
        <div className="text-darkBlue font-semibold text-lg mb-4 text-center font-poppins">
          {title}
        </div>
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="fas fa-star text-orange mx-0.5 transition-transform hover:scale-125"></i>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClick}
            className="custom-btn px-8 py-2"
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
    <section className="section-padding bg-lightGray">
      <div className="container-custom">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-darkBlue mb-3 font-poppins">
            Explore Prices
          </h2>
          <p className="text-darkBlue/60 font-canva-sans">Explore the hottest travel spots around the globe</p>
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
