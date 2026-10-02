import { BedDouble, Home, MapPin, Search, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { hotelCategories } from '../data/siteData';
import { useHotels } from '../hooks/queries';
import HeroSlider from '../components/HeroSlider';

const HotelCategoryCard = ({ category }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl group transition-all duration-300 bg-surface h-full">
      <div className="relative overflow-hidden h-44 md:h-52">
        <img 
          src={category.image} 
          alt={category.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-brand-scrim/50 group-hover:bg-teal/50 transition-colors duration-300" />
      </div>
      <div className="p-3 bg-surface">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className="text-lg font-bold text-darkBlue font-season">{category.title}</h3>
          <Link 
            to={category.link} 
            className="bg-orange text-white py-1.5 px-3 text-xs rounded-full font-semibold font-poppins hover:bg-teal transition-all hover:shadow-lg whitespace-nowrap flex-shrink-0"
          >
            Explore
          </Link>
        </div>
        <p className="text-xs text-darkBlue/70 font-canva-sans">{category.blurb}</p>
      </div>
    </div>
  );
};

const HotelCard = ({ hotel, category }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    const slug = hotel.slug?.current || hotel.slug;
    navigate(`/hotels/${category}/${slug}`);
  };

  return (
    <div className="custom-card group bg-surface h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          decoding="async"
          className="w-full h-44 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 bottom-3 bg-brand-scrim text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg font-poppins backdrop-blur-sm bg-opacity-90 flex items-center gap-1">
          <Star className="w-4 h-4 text-orange" />
          {hotel.rating}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        {/* Hotel Name with Book Button */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-darkBlue text-base md:text-lg font-poppins line-clamp-1">{hotel.name}</h3>
            <p className="text-xs text-darkBlue/60 font-canva-sans flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-orange" />
              {hotel.location}
            </p>
          </div>
          <button 
            onClick={handleBookClick}
            className="custom-btn text-xs px-3 py-1.5 font-medium bg-teal hover:bg-teal/90 hover:scale-[1.02] transition-all duration-200 whitespace-nowrap flex-shrink-0"
          >
            <BedDouble className="w-3 h-3 mr-1" />
            Book Now
          </button>
        </div>

        {/* Amenities Tags */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange/10 to-teal/10 text-darkBlue border border-orange/20 font-poppins"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* Pricing */}
        <div className="mt-auto">
          {hotel.originalPrice && (
            <p className="text-xs text-darkBlue/40 line-through font-canva-sans">₹{hotel.originalPrice.toLocaleString('en-IN')}</p>
          )}
          <p className="text-lg md:text-xl font-bold text-orange font-poppins">
            ₹{hotel.price?.toLocaleString('en-IN')}
            <span className="block text-xs font-normal text-darkBlue/80 font-canva-sans mt-0.5">Per Night</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Hotels() {
  const { category } = useParams();
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: hotels = [], isPending } = useHotels({ category });
  const loading = Boolean(category) && isPending;

  const categoryData = useMemo(() => {
    return hotelCategories.find(cat => cat.slug === category);
  }, [category]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return hotels;
    return hotels.filter(h => 
      h.name.toLowerCase().includes(q) || 
      h.location.toLowerCase().includes(q)
    );
  }, [hotels, searchTerm]);

  // Get other hotel categories for "Similar Hotels" section (3 random categories)
  const otherCategories = useMemo(() => {
    const filtered = hotelCategories.filter(cat => cat.slug !== category);
    // Shuffle and take 3 random categories
    return filtered.sort(() => Math.random() - 0.5).slice(0, 3);
  }, [category]);

  if (!categoryData) {
    return (
      <div className="min-h-screen pt-20 pb-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-darkBlue mb-2">Category Not Found</h1>
          <p className="text-darkBlue/70">The hotel category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      {/* Hero slider */}
      <HeroSlider
        images={[
          categoryData.image,
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=80',
        ]}
        className="mt-0"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow">{categoryData.title}</h1>
        <p className="text-white/90 mt-3">{categoryData.blurb}</p>
        <div className="max-w-3xl mx-auto mt-5">
          <form
            className="flex overflow-hidden rounded-full shadow-xl bg-surface"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchTerm(query);
            }}
          >
            <input
              className="flex-1 px-6 py-3 outline-none"
              placeholder="Search hotels by name or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-brand-scrim text-white px-6 hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
          {searchTerm && (
            <p className="text-white/90 text-sm mt-2">Showing results for: <span className="font-semibold">{searchTerm}</span></p>
          )}
        </div>
      </HeroSlider>

      {/* Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-darkBlue mb-2 font-poppins">
              Available Hotels
            </h2>
            <p className="text-sm text-darkBlue/70 font-canva-sans">
              Find the perfect accommodation for your stay
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div>
            </div>
          ) : filtered.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((hotel) => (
                <HotelCard key={hotel._id || hotel.id} hotel={hotel} category={category} />
              ))}
            </div>
          ) : (
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 rounded-2xl p-4">
              {searchTerm ? 'No hotels found matching your search. Try adjusting your search.' : 'No hotels available in this category.'}
            </div>
          )}
        </div>
      </section>

      {/* Similar Hotels Section - Other Categories */}
      {otherCategories.length > 0 && (
        <section className="py-8 bg-lightGray">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-darkBlue mb-2 font-poppins">
                Explore Other Hotel Categories
              </h2>
              <p className="text-sm text-darkBlue/70 font-canva-sans">
                Discover more accommodation options tailored to your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCategories.map((cat) => (
                <HotelCategoryCard key={cat.slug} category={cat} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link 
                to="/"
                className="inline-block custom-btn px-6 py-3 text-sm font-semibold hover:scale-105 transition-all duration-200"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
