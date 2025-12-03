// DomesticDestinations Component
// Shows all domestic destination categories

import { Link } from 'react-router-dom';
import { domesticDestinations } from '../../data/siteData';
import HeroSlider from '../../components/HeroSlider';

const domesticHeroImages = [
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80'
];

export default function DomesticDestinations() {
  const destinations = domesticDestinations;

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gray-50">
      {/* Hero Slider Section */}
      <section className="relative">
        <HeroSlider 
          images={domesticHeroImages} 
          className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl mx-auto">
              <div className="inline-block bg-teal/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <nav className="text-sm text-white/95 font-medium">
                  <Link to="/" className="hover:text-teal transition-colors">Home</Link>
                  <span className="mx-2">/</span>
                  <Link to="/destinations" className="hover:text-teal transition-colors">Destinations</Link>
                  <span className="mx-2">/</span>
                  <span>Domestic</span>
                </nav>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-season font-bold mb-6 text-white drop-shadow-2xl">
                Domestic Destinations
              </h1>
              <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-lg font-poppins leading-relaxed">
                Experience the incredible diversity of India from the Himalayas to pristine beaches and vibrant culture
              </p>
            </div>
          </div>
        </HeroSlider>
      </section>

      {/* Destinations Grid */}
      <section className="w-full px-4 md:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-season font-bold text-darkBlue mb-3">Explore Incredible India</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal to-orange mx-auto mb-4"></div>
          <p className="text-darkBlue/70 text-lg max-w-2xl mx-auto">Discover the beauty and diversity of India with our carefully curated packages</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {destinations.map((dest, idx) => (
              <Link
                key={idx}
                to={dest.link}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <i className="fa-solid fa-location-dot text-orange text-xl"></i>
                          <h3 className="text-xl font-season font-bold text-darkBlue">
                            {dest.title}
                          </h3>
                        </div>
                        <span className="bg-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Featured
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-orange font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                      View Packages
                      <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                    </span>
                    <i className="fa-solid fa-map-location-dot text-darkBlue/20 text-xl"></i>
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
