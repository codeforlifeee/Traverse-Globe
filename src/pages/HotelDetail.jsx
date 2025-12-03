import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BookingModal from '../components/BookingModal';
import { companyInfo } from '../data/siteData';

const HotelDetail = () => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchHotelDetail = async () => {
      try {
        setLoading(true);
        // Import sanityClient dynamically to avoid issues
        const { fetchHotelBySlug } = await import('../services/sanityClient');
        const data = await fetchHotelBySlug(category, slug);
        setHotel(data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category && slug) {
      fetchHotelDetail();
    }
  }, [category, slug]);

  const handleBookRoom = (room = null) => {
    setSelectedRoom(room);
    setShowBooking(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange mx-auto mb-4"></div>
          <p className="text-darkBlue font-canva-sans">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen pt-20 pb-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-darkBlue mb-2">Hotel Not Found</h1>
          <p className="text-darkBlue/70 mb-4">The hotel you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/hotels')}
            className="custom-btn"
          >
            Browse Hotels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      {/* Image Gallery */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-[300px] md:h-[450px] lg:h-[550px]"
        >
          {hotel.gallery && hotel.gallery.length > 0 ? (
            hotel.gallery.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`${hotel.name} - Image ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchpriority={idx === 0 ? "high" : "auto"}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </SwiperSlide>
          )}
        </Swiper>
      </section>

      {/* Hotel Information */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-darkBlue/60 mb-4 font-canva-sans">
            <button onClick={() => navigate('/')} className="hover:text-orange">Home</button>
            <span className="mx-2">/</span>
            <button onClick={() => navigate(`/hotels/${category}`)} className="hover:text-orange">Hotels</button>
            <span className="mx-2">/</span>
            <span className="text-darkBlue font-medium">{hotel.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-darkBlue font-poppins mb-2">
                      {hotel.name}
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-darkBlue/70">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-map-marker-alt text-orange"></i>
                        <span>{hotel.location}</span>
                      </div>
                      {hotel.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star text-xs ${
                                i < hotel.rating ? 'text-orange' : 'text-gray-300'
                              }`}
                            ></i>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {hotel.reviewRating && (
                    <div className="bg-orange text-white px-4 py-2 rounded-lg text-center">
                      <div className="text-xl font-bold">{hotel.reviewRating}</div>
                      <div className="text-xs">
                        {hotel.reviewCount ? `${hotel.reviewCount} reviews` : 'Rating'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Highlights */}
                {hotel.highlights && hotel.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {hotel.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange/10 text-darkBlue border border-orange/20"
                      >
                        <i className="fas fa-check text-orange text-xs mr-1"></i>
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-darkBlue mb-3 font-poppins">About This Hotel</h2>
                <p className="text-darkBlue/80 leading-relaxed font-canva-sans">{hotel.description}</p>
              </div>

              {/* Amenities */}
              {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-darkBlue mb-4 font-poppins">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {hotel.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-darkBlue/80">
                        <i className="fas fa-check text-orange"></i>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Room Types */}
              {hotel.roomTypes && hotel.roomTypes.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-darkBlue mb-4 font-poppins">Available Rooms</h2>
                  <div className="space-y-4">
                    {hotel.roomTypes.map((room, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-xl p-4 hover:border-orange/50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          {room.image && (
                            <img
                              src={room.image}
                              alt={room.type}
                              className="w-full sm:w-32 h-24 object-cover rounded-lg"
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-bold text-darkBlue mb-2">{room.type}</h3>
                            <div className="flex flex-wrap gap-3 text-xs text-darkBlue/70 mb-2">
                              {room.capacity && (
                                <span className="flex items-center gap-1">
                                  <i className="fas fa-user"></i> {room.capacity} Guests
                                </span>
                              )}
                              {room.size && (
                                <span className="flex items-center gap-1">
                                  <i className="fas fa-ruler-combined"></i> {room.size} sq ft
                                </span>
                              )}
                              {room.bedType && (
                                <span className="flex items-center gap-1">
                                  <i className="fas fa-bed"></i> {room.bedType}
                                </span>
                              )}
                            </div>
                            {room.amenities && room.amenities.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {room.amenities.slice(0, 3).map((amenity, i) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <div className="text-right">
                              <p className="text-xl font-bold text-orange font-poppins">
                                ₹{room.price?.toLocaleString('en-IN')}
                              </p>
                              <p className="text-xs text-darkBlue/60">per night</p>
                            </div>
                            <button
                              onClick={() => handleBookRoom(room)}
                              className="custom-btn text-sm px-4 py-2 mt-2"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby Attractions */}
              {hotel.nearbyAttractions && hotel.nearbyAttractions.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-darkBlue mb-4 font-poppins">Nearby Attractions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {hotel.nearbyAttractions.map((attraction, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-darkBlue/80">
                        <i className="fas fa-map-pin text-orange mt-1"></i>
                        <div>
                          <p className="font-semibold">{attraction.name}</p>
                          {attraction.distance && (
                            <p className="text-xs text-darkBlue/60">{attraction.distance}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Policies */}
              {hotel.policies && hotel.policies.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-darkBlue mb-4 font-poppins">Hotel Policies</h2>
                  <ul className="space-y-2">
                    {hotel.policies.map((policy, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-darkBlue/80">
                        <i className="fas fa-info-circle text-orange mt-1"></i>
                        <span>{policy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 sticky top-24">
                <div className="mb-4">
                  <p className="text-sm text-darkBlue/60 mb-1">Starting from</p>
                  {hotel.originalPrice && (
                    <p className="text-sm text-darkBlue/40 line-through">
                      ₹{hotel.originalPrice.toLocaleString('en-IN')}
                    </p>
                  )}
                  <p className="text-3xl font-bold text-orange font-poppins">
                    ₹{hotel.price?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-darkBlue/60">per night</p>
                </div>

                <button
                  onClick={() => handleBookRoom()}
                  className="custom-btn w-full mb-4"
                >
                  <i className="fas fa-bed mr-2"></i>
                  Book This Hotel
                </button>

                {/* Check-in/Check-out Times */}
                <div className="border-t border-gray-200 pt-4 mb-4 space-y-2">
                  {hotel.checkIn && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-darkBlue/60">Check-in:</span>
                      <span className="font-semibold text-darkBlue">{hotel.checkIn}</span>
                    </div>
                  )}
                  {hotel.checkOut && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-darkBlue/60">Check-out:</span>
                      <span className="font-semibold text-darkBlue">{hotel.checkOut}</span>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <h3 className="font-bold text-darkBlue mb-2">Need Help?</h3>
                  <a
                    href={`tel:${companyInfo.phone.primary}`}
                    className="flex items-center gap-2 text-sm text-darkBlue hover:text-orange transition-colors"
                  >
                    <i className="fas fa-phone text-orange"></i>
                    <span>{companyInfo.phone.primary}</span>
                  </a>
                  <a
                    href={`https://wa.me/${companyInfo.phone.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-darkBlue hover:text-orange transition-colors"
                  >
                    <i className="fab fa-whatsapp text-orange"></i>
                    <span>WhatsApp Us</span>
                  </a>
                  <a
                    href={`mailto:${companyInfo.email.primary}`}
                    className="flex items-center gap-2 text-sm text-darkBlue hover:text-orange transition-colors"
                  >
                    <i className="fas fa-envelope text-orange"></i>
                    <span>{companyInfo.email.primary}</span>
                  </a>
                </div>

                {/* Map Link */}
                {hotel.mapLink && (
                  <a
                    href={hotel.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 text-sm text-teal hover:text-teal/80 transition-colors font-medium"
                  >
                    <i className="fas fa-map-marked-alt"></i>
                    <span>View on Map</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        open={showBooking}
        onClose={() => setShowBooking(false)}
        packageName={selectedRoom ? `${hotel.name} - ${selectedRoom.type}` : hotel.name}
      />
    </div>
  );
};

export default HotelDetail;
