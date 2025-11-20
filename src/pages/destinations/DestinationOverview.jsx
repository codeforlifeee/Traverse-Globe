// DestinationOverview Component
// Main hub showing all destinations (both international and domestic)

import { Link } from 'react-router-dom';
import { getInternationalCategories, getDomesticCategories, DESTINATION_TYPES } from '../../data/categoryConfig';

export default function DestinationOverview() {
  const internationalDestinations = getInternationalCategories();
  const domesticDestinations = getDomesticCategories();

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange to-teal text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-season font-bold mb-4">
            Explore Our Destinations
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Discover amazing travel experiences across the globe and within India
          </p>
        </div>
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
          <h2 className="text-3xl font-season font-bold text-darkBlue mb-8 text-center">
            Popular Destinations
          </h2>
          
          {/* International Preview */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-season font-bold text-darkBlue flex items-center gap-2">
                <span className="text-3xl">{DESTINATION_TYPES.international.icon}</span>
                International
              </h3>
              <Link
                to="/destinations/international"
                className="text-orange hover:text-teal font-semibold flex items-center gap-2"
              >
                View All
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {internationalDestinations.slice(0, 4).map((dest) => (
                <Link
                  key={dest.slug}
                  to={`/destinations/international/${dest.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 text-center"
                >
                  <div className="text-4xl mb-3">{dest.icon}</div>
                  <h4 className="font-poppins font-semibold text-darkBlue mb-1 group-hover:text-orange transition-colors">
                    {dest.name}
                  </h4>
                  <p className="text-sm text-darkBlue/60">Explore Packages</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Domestic Preview */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-season font-bold text-darkBlue flex items-center gap-2">
                <span className="text-3xl">{DESTINATION_TYPES.domestic.icon}</span>
                Domestic
              </h3>
              <Link
                to="/destinations/domestic"
                className="text-orange hover:text-teal font-semibold flex items-center gap-2"
              >
                View All
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {domesticDestinations.map((dest) => (
                <Link
                  key={dest.slug}
                  to={`/destinations/domestic/${dest.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 text-center"
                >
                  <div className="text-4xl mb-3">{dest.icon}</div>
                  <h4 className="font-poppins font-semibold text-darkBlue mb-1 group-hover:text-orange transition-colors">
                    {dest.name}
                  </h4>
                  <p className="text-sm text-darkBlue/60">Explore Packages</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
