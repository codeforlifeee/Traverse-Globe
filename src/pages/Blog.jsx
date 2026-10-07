import { useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
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
  const { slug } = useParams();
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
      <div className="min-h-screen pt-20 pb-8 container-custom py-10 md:py-14" aria-busy="true">
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

  // Individual Post Detail View
  if (slug) {
    const post = postsData.find((p) => p.slug === slug);
    if (!post) return <Navigate to="/blog" replace />;

    return (
      <div className="min-h-screen pt-28 pb-16 bg-surface">
        <div className="container-custom max-w-3xl">
          <Link to="/blog" className="inline-flex items-center text-brand-teal hover:text-brand-orange font-semibold transition-colors mb-8">
            <span className="mr-2">←</span> Back to Travel Guides
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block bg-brand-orange text-white text-xs font-poppins font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-brand-muted-ink text-sm font-canva-sans font-medium">
              {post.readTime} min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-brand-ink leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-brand-muted-ink text-sm font-canva-sans mb-10 pb-10 border-b border-brand-hairline">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-canvas-2 flex items-center justify-center font-bold text-brand-ink">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-brand-ink">{post.author}</p>
                <p>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {post.image && (
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-12 shadow-soft-xl">
              <img 
                src={(post.image.includes('images.unsplash.com') ? post.image.replace(/q=\d+/, 'q=80') + (post.image.includes('fm=') ? '' : '&fm=webp') : post.image)} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-brand max-w-none prose-lg">
            <p className="text-xl md:text-2xl text-brand-muted-ink leading-relaxed font-canva-sans mb-10 font-medium">
              {post.excerpt}
            </p>
            
            <div className="text-brand-ink font-canva-sans leading-relaxed space-y-6">
              {post.content ? (
                <PortableText 
                  value={post.content} 
                  components={{
                    block: {
                      h3: ({children}) => <h3 className="text-2xl font-poppins font-bold mt-12 mb-4 text-brand-ink">{children}</h3>,
                      normal: ({children}) => <p className="mb-4">{children}</p>,
                    }
                  }}
                />
              ) : (
                <div className="bg-brand-canvas-2 rounded-2xl p-8 text-center border border-brand-hairline mt-12">
                  <h3 className="text-brand-ink font-poppins font-semibold text-xl mb-3">Full Article Coming Soon</h3>
                  <p className="text-brand-muted-ink font-canva-sans mb-6">
                    This is a placeholder for the blog detail page. In the future, the rich-text content editor from Sanity CMS will be rendered directly into this space!
                  </p>
                </div>
              )}
            </div>

            <div className="mt-16 pt-8 border-t border-brand-hairline text-center">
              <Link to="/blog" className="inline-flex h-11 items-center justify-center rounded-full bg-brand-orange px-8 font-poppins font-semibold text-white transition-colors hover:bg-brand-orange-hover">
                Explore More Guides
              </Link>
            </div>
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
        <div className="absolute inset-x-0 bottom-6 md:bottom-10 flex justify-center z-10">
          <div className="w-11/12 max-w-3xl bg-surface/95 backdrop-blur-md rounded-full shadow-soft-xl flex overflow-hidden border border-brand-hairline">
            <div className="px-5 py-3 text-brand-ink font-poppins font-medium whitespace-nowrap hidden md:block border-r border-brand-hairline">Search</div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, destinations, tips..."
              className="flex-1 px-4 py-3 bg-transparent outline-none text-brand-ink placeholder:text-brand-muted-ink"
            />
            <button className="bg-brand-orange hover:bg-brand-orange-hover text-white px-5 md:px-7 transition-colors" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container-custom mt-8 md:mt-12">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-poppins font-medium border transition-colors ${
                category === c ? 'bg-brand-ink text-white border-brand-ink' : 'bg-surface text-brand-ink border-brand-hairline hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Featured article */}
      {featured && featured.image && (
        <section className="py-8 md:py-12">
          <div className="container-custom">
            <Link to={featured.url || `/guides/${featured.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch group cursor-pointer block">
              <div className="relative rounded-2xl overflow-hidden shadow-soft-sm group-hover:shadow-soft-xl transition-shadow h-64 lg:h-auto">
                <img 
                  src={(featured.image.includes('images.unsplash.com') ? featured.image.replace(/q=\d+/, 'q=50') + (featured.image.includes('fm=') ? '' : '&fm=webp') : featured.image)} 
                  srcSet={`${featured.image.replace(/w=\d+/, 'w=640').replace(/q=\d+/, 'q=50')} 640w, ${featured.image.replace(/w=\d+/, 'w=960').replace(/q=\d+/, 'q=50')} 960w, ${featured.image.replace(/w=\d+/, 'w=1280').replace(/q=\d+/, 'q=50')} 1280w`}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt={featured.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-scrim/80 via-brand-scrim/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block bg-brand-orange text-white text-xs font-poppins font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {featured.category}
                  </span>
                  <h2 className="mt-3 text-white text-h2 font-bold font-poppins drop-shadow-md leading-tight">
                    {featured.title}
                  </h2>
                </div>
              </div>
              <div className="bg-surface rounded-2xl border border-brand-hairline p-8 flex flex-col shadow-soft-sm group-hover:shadow-soft-xl transition-shadow justify-center">
                <div className="text-brand-muted-ink text-sm mb-4 font-canva-sans flex items-center gap-2">
                  <span className="font-semibold text-brand-ink">{featured.author}</span>
                  <span>•</span>
                  <span>{new Date(featured.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{featured.readTime} min read</span>
                </div>
                <p className="text-brand-ink font-canva-sans text-lg leading-relaxed line-clamp-4">
                  {featured.excerpt}
                </p>
                <div className="mt-8">
                  <span className="inline-flex items-center justify-center font-poppins font-semibold text-sm transition-all h-11 px-6 rounded-full bg-brand-ink text-white group-hover:bg-brand-orange">
                    Read Article
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Articles grid */}
      <section className="pb-12 md:pb-20">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-h2 font-poppins font-bold text-brand-ink">Latest Articles</h2>
            <div className="text-brand-muted-ink font-canva-sans text-sm">{filtered.length} result(s)</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((p) => (
              <Link to={p.url || `/guides/${p.slug}`} key={p.id} className="group flex flex-col bg-surface rounded-2xl shadow-soft-sm hover:shadow-soft-xl border border-brand-hairline overflow-hidden transition-all hover:-translate-y-1">
                {p.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-canvas-2">
                    <img 
                      src={(p.image.includes('images.unsplash.com') ? p.image.replace(/q=\d+/, 'q=50') + (p.image.includes('fm=') ? '' : '&fm=webp') : p.image)} 
                      srcSet={`${p.image.replace(/w=\d+/, 'w=400').replace(/q=\d+/, 'q=50')} 400w, ${p.image.replace(/w=\d+/, 'w=600').replace(/q=\d+/, 'q=50')} 600w, ${p.image.replace(/w=\d+/, 'w=800').replace(/q=\d+/, 'q=50')} 800w`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" 
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-surface/95 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-poppins font-semibold text-brand-ink shadow-soft-sm">
                        {p.category}
                      </span>
                    </div>
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-brand-muted-ink font-canva-sans mb-3">
                    <span>{new Date(p.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{p.readTime} min read</span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-ink font-poppins leading-snug group-hover:text-brand-orange transition-colors">{p.title}</h3>
                  <p className="mt-2 text-brand-muted-ink text-sm font-canva-sans line-clamp-3">{p.excerpt}</p>
                  <div className="mt-auto pt-4 flex items-center text-brand-teal font-semibold text-sm group-hover:text-brand-orange transition-colors">
                    Read more <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
