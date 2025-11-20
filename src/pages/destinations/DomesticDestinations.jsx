// DomesticDestinations Component
// Shows all domestic destination categories

import { Link } from 'react-router-dom';
import { getDomesticCategories, DESTINATION_TYPES } from '../../data/categoryConfig';

export default function DomesticDestinations() {
  const destinations = getDomesticCategories();

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal to-orange text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">→</span>
            <Link to="/destinations" className="hover:underline">Destinations</Link>
            <span className="mx-2">→</span>
            <span>Domestic</span>
          </nav>
          <div className="text-center">
            <div className="text-6xl mb-4">{DESTINATION_TYPES.domestic.icon}</div>
            <h1 className="text-4xl md:text-5xl font-season font-bold mb-4">
              Domestic Destinations
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {DESTINATION_TYPES.domestic.description}
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <Link
              key={dest.slug}
              to={`/destinations/domestic/${dest.slug}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="p-8">
                <div className="text-6xl mb-4 text-center">{dest.icon}</div>
                <h2 className="text-2xl font-season font-bold text-darkBlue mb-2 text-center group-hover:text-orange transition-colors">
                  {dest.name}
                </h2>
                <p className="text-darkBlue/70 text-center mb-4 text-sm">
                  {dest.description}
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 text-orange font-semibold">
                    View Packages
                    <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
