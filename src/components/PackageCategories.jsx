import { Link } from 'react-router-dom';

const categories = [
  { title: 'UAE', image: 'https://traverseglobe.com/assets/image/dubai1.webp', link: '/uae-packages', blurb: 'Desert safari, sky-high views, and culture' },
  { title: 'Bali', image: 'https://traverseglobe.com/assets/image/dubai7.jpg', link: '/bali-packages', blurb: 'Beaches, temples, and lush rice terraces' },
  { title: 'Thailand', image: 'https://traverseglobe.com/assets/image/dubai3.jpg', link: '/thailand-packages', blurb: 'Islands, food, and vibrant culture' },
  { title: 'Singapore', image: 'https://traverseglobe.com/assets/image/dubai5.jpg', link: '/singapore-packages', blurb: 'City lights, attractions, and family fun' },
];

export default function PackageCategories(){
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-bold">Explore by Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-2xl shadow-xl group">
              <img src={c.image} alt={c.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-extrabold drop-shadow">{c.title}</h3>
                <p className="text-sm text-white/90">{c.blurb}</p>
                <div className="pt-3 flex justify-end">
                  <Link to={c.link} className="bg-accent text-white py-2 px-4 rounded-full font-semibold hover:-translate-y-1 hover:shadow-xl transition">View Packages</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
