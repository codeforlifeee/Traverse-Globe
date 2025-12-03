// DestinationOverview Component
// Main hub showing all destinations (both international and domestic)

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchDestinations } from '../../services/sanityClient';
import { DESTINATION_TYPES } from '../../data/categoryConfig';
import HeroSlider from '../../components/HeroSlider';

const destinationHeroImages = [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1600&q=80'
];

export default function DestinationOverview() {
  const [internationalDestinations, setInternationalDestinations] = useState([]);
  const [domesticDestinations, setDomesticDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [international, domestic] = await Promise.all([
          fetchDestinations('international'),
          fetchDestinations('domestic')
        ]);
        setInternationalDestinations(international);
        setDomesticDestinations(domestic);
      } catch (error) {
        console.error('Failed to load destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-8 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange mx-auto mb-4"></div>
          <p className="text-darkBlue font-canva-sans">Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 bg-gray-50">
      {/* Hero Slider Section */}
      <section className="relative">
        <HeroSlider 
          images={destinationHeroImages} 
          className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
        >
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-season font-bold mb-6 text-white drop-shadow-2xl">
              Explore World Destinations
            </h1>
            <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-lg font-poppins">
              Curated travel experiences across the globe and India's finest destinations
            </p>
          </div>
        </HeroSlider>
      </section>

      {/* Destination Type Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Link
            to="/destinations/international"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">{DESTINATION_TYPES.international.icon}</div>
              <h2 className="text-3xl font-season font-bold text-darkBlue mb-3 group-hover:text-orange transition-colors">
                {DESTINATION_TYPES.international.label}
              </h2>
              <p className="text-darkBlue/70 mb-4">{DESTINATION_TYPES.international.description}</p>
              <div className="text-orange font-semibold flex items-center justify-center gap-2">
                View Destinations
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </div>
              <div className="mt-4 text-sm text-darkBlue/50">
                {internationalDestinations.length} Destinations
              </div>
            </div>
          </Link>

          <Link
            to="/destinations/domestic"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">{DESTINATION_TYPES.domestic.icon}</div>
              <h2 className="text-3xl font-season font-bold text-darkBlue mb-3 group-hover:text-orange transition-colors">
                {DESTINATION_TYPES.domestic.label}
              </h2>
              <p className="text-darkBlue/70 mb-4">{DESTINATION_TYPES.domestic.description}</p>
              <div className="text-orange font-semibold flex items-center justify-center gap-2">
                View Destinations
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </div>
              <div className="mt-4 text-sm text-darkBlue/50">
                {domesticDestinations.length} Destinations
              </div>
            </div>
          </Link>
        </div>

        {/* Featured Destinations Preview */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-season font-bold text-darkBlue mb-4">
              Featured Destinations
            </h2>
            <p className="text-darkBlue/70 text-lg">Handpicked destinations for unforgettable experiences</p>
          </div>

          {/* International Preview */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 border-b-2 border-orange/20 pb-4">
              <h3 className="text-2xl md:text-3xl font-season font-bold text-darkBlue">
                International Destinations
              </h3>
              <Link
                to="/destinations/international"
                className="text-orange hover:text-teal font-bold flex items-center gap-2 transition-colors"
              >
                View All
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {internationalDestinations.slice(0, 4).map((dest, idx) => (
                <Link
                  key={idx}
                  to={dest.link}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <h4 className="font-poppins font-bold text-white text-lg mb-1">
                        {dest.title}
                      </h4>
                      <p className="text-sm text-white/90 font-medium">Explore Packages →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Domestic Preview */}
          <div>
            <div className="flex items-center justify-between mb-8 border-b-2 border-teal/20 pb-4">
              <h3 className="text-2xl md:text-3xl font-season font-bold text-darkBlue">
                Domestic Destinations
              </h3>
              <Link
                to="/destinations/domestic"
                className="text-teal hover:text-orange font-bold flex items-center gap-2 transition-colors"
              >
                View All
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {domesticDestinations.map((dest, idx) => (
                <Link
                  key={idx}
                  to={dest.link}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <h4 className="font-poppins font-bold text-white text-lg mb-1">
                        {dest.title}
                      </h4>
                      <p className="text-sm text-white/90 font-medium">Explore Packages →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
