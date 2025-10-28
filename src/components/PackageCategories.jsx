import { Link } from 'react-router-dom';

const categories = [
  { title: 'UAE', image: 'https://traverseglobe.com/assets/image/dubai1.webp', link: '/uae-packages', blurb: 'Desert safari, sky-high views, and culture' },
  { title: 'Bali', image: 'https://traverseglobe.com/assets/image/dubai7.jpg', link: '/bali-packages', blurb: 'Beaches, temples, and lush rice terraces' },
  { title: 'Thailand', image: 'https://traverseglobe.com/assets/image/dubai3.jpg', link: '/thailand-packages', blurb: 'Islands, food, and vibrant culture' },
  { title: 'Singapore', image: 'https://traverseglobe.com/assets/image/dubai5.jpg', link: '/singapore-packages', blurb: 'City lights, attractions, and family fun' },
];

export default function PackageCategories(){
  return (
    <section className="section-padding bg-lightGray">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-3xl md:text-4xl font-bold text-darkBlue font-poppins">Explore by Category</h2>
        </div>
        <p className="text-darkBlue/60 mb-8 font-canva-sans">Find your perfect getaway, tailored to your interests</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl group transition-all duration-300 bg-white">
              <div className="relative overflow-hidden h-64">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-darkBlue/50 group-hover:bg-teal/50 transition-colors duration-300" />
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-2xl font-bold text-darkBlue mb-2 font-season">{c.title}</h3>
                <p className="text-sm text-darkBlue/70 mb-4 font-canva-sans">{c.blurb}</p>
                <div className="flex justify-end">
                  <Link to={c.link} className="bg-orange text-white py-2 px-6 rounded-full font-semibold font-poppins hover:bg-teal transition-all hover:shadow-lg text-sm">View Packages</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
