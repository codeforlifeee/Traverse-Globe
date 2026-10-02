import { useMemo, useState } from 'react';
import { companyInfo } from '../data/companyInfo';
import { useBlogPosts } from '../hooks/queries';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const heroImages = [
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1280&q=50&fm=webp',
  'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1280&q=50&fm=webp',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1280&q=50&fm=webp',
];

export default function Blog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const { data: postsData = [], isPending } = useBlogPosts();

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(postsData.map((p) => p.category)))],
    [postsData]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return postsData.filter((p) => {
      const matchesCat = category === 'All' || p.category === category;
      if (!q) return matchesCat;
      const hay = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase();
      return matchesCat && hay.includes(q);
    });
  }, [query, category, postsData]);

  const featured = filtered[0] || postsData[0];
  const others = featured ? filtered.filter((p) => p.id !== featured.id) : [];

  // Everything below dereferences `featured`, so bail out before it is read.
  if (isPending) {
    return (
      <div className="container-custom py-10 md:py-14" aria-busy="true">
        <span className="sr-only">Loading articles</span>
        <div className="animate-pulse space-y-6" aria-hidden="true">
          <div className="h-8 w-2/3 max-w-md rounded-lg bg-brand-canvas-2" />
          <div className="aspect-[16/9] rounded-2xl bg-brand-canvas-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-brand-hairline">
                <div className="aspect-[4/3] bg-brand-canvas-2" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-brand-canvas-2" />
                  <div className="h-3 w-1/2 rounded bg-brand-canvas-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!featured) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-h2 font-poppins font-bold text-brand-ink">Travel Guides</h1>
        <p className="mt-3 text-brand-muted-ink font-canva-sans">
          No articles published yet. Check back soon.
        </p>
      </div>
    );
  }

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${companyInfo.name} Travel Blog`,
    url: typeof window !== 'undefined' ? window.location.href : `${companyInfo.website}blog`,
  };

  const featuredJsonLd = featured
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: featured.title,
        datePublished: featured.date,
        author: { '@type': 'Person', name: featured.author },
        image: featured.image,
        articleSection: featured.category,
        url: featured.url || '#',
        timeRequired: `PT${featured.readTime}M`,
        description: featured.excerpt,
      }
    : null;

  return (
    <div className="min-h-screen pt-20 pb-8">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      {featuredJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredJsonLd) }} />
      )}

      {/* Hero slider with overlay title and search */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="w-full h-[260px] md:h-[420px] lg:h-[520px]"
        >
          {heroImages.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <img 
                  src={src}
                  srcSet={`${src.replace(/w=\d+/, 'w=640')} 640w, ${src.replace(/w=\d+/, 'w=960')} 960w, ${src.replace(/w=\d+/, 'w=1280')} 1280w`}
                  sizes="100vw"
                  alt={`Travel hero ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay heading + search */}
        <div className="absolute inset-x-0 bottom-6 md:bottom-10 flex justify-center">
          <div className="w-11/12 max-w-3xl bg-surface/95 backdrop-blur rounded-full shadow-xl flex overflow-hidden">
            <div className="px-5 py-3 text-darkBlue font-poppins whitespace-nowrap hidden md:block">Search</div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, destinations, tips..."
              className="flex-1 px-4 py-3 outline-none text-darkBlue/80"
            />
            <button className="bg-orange hover:bg-teal text-white px-5 md:px-7 transition-colors" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
                <path d="M20 20l-3.5-3.5" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 mt-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-poppins border transition ${
                category === c ? 'bg-orange text-white border-orange' : 'bg-surface text-darkBlue border-lightGray hover:border-orange/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Featured article */}
      {featured && featured.image && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={(featured.image.includes('images.unsplash.com') ? featured.image.replace(/q=\d+/, 'q=50') + (featured.image.includes('fm=') ? '' : '&fm=webp') : featured.image)} 
                  srcSet={`${featured.image.replace(/w=\d+/, 'w=640').replace(/q=\d+/, 'q=50')} 640w, ${featured.image.replace(/w=\d+/, 'w=960').replace(/q=\d+/, 'q=50')} 960w, ${featured.image.replace(/w=\d+/, 'w=1280').replace(/q=\d+/, 'q=50')} 1280w`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  alt={featured.title} 
                  className="w-full h-64 md:h-full object-cover" 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-surface/90 text-darkBlue text-xs font-semibold px-2 py-1 rounded-full">
                    {featured.category}
                  </span>
                  <h2 className="mt-2 text-white text-2xl md:text-3xl font-bold font-poppins drop-shadow-sm">
                    {featured.title}
                  </h2>
                </div>
              </div>
              <div className="bg-surface rounded-2xl border border-lightGray p-6 flex flex-col">
                <div className="text-darkBlue/70 text-sm mb-2">
                  By {featured.author} • {new Date(featured.date).toLocaleDateString()} • {featured.readTime} min read
                </div>
                <p className="text-darkBlue/80 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-4">
                  <a href={featured.url || '#'} className="custom-btn px-5 py-2 text-sm inline-block !rounded-full">Read Article</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles grid */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="gradient-text text-2xl md:text-3xl font-extrabold">Latest Articles</h2>
            <div className="text-darkBlue/80 text-sm">{filtered.length} result(s)</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((p) => (
              <article key={p.id} className="bg-surface rounded-2xl shadow-sm hover:shadow-md border border-lightGray overflow-hidden transition">
                {p.image && (
                  <img 
                    src={(p.image.includes('images.unsplash.com') ? p.image.replace(/q=\d+/, 'q=50') + (p.image.includes('fm=') ? '' : '&fm=webp') : p.image)} 
                    srcSet={`${p.image.replace(/w=\d+/, 'w=400').replace(/q=\d+/, 'q=50')} 400w, ${p.image.replace(/w=\d+/, 'w=600').replace(/q=\d+/, 'q=50')} 600w, ${p.image.replace(/w=\d+/, 'w=800').replace(/q=\d+/, 'q=50')} 800w`}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    alt={p.title} 
                    className="w-full h-44 object-cover" 
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-darkBlue/80">
                    <span className="inline-block bg-lightGray text-darkBlue px-2 py-0.5 rounded-full font-semibold">{p.category}</span>
                    <span>•</span>
                    <span>{new Date(p.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{p.readTime} min read</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-darkBlue font-poppins">{p.title}</h3>
                  <p className="mt-1 text-darkBlue/80 text-sm">{p.excerpt}</p>
                  <div className="mt-3">
                    <a href={p.url || '#'} className="text-teal hover:text-orange font-semibold">Read more →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
