// DomesticDestinations — hub listing every domestic (India) destination category.
// Mirrors InternationalDestinations: Sanity hook, asymmetric hero, UniversalCard grid.

import { Link } from 'react-router-dom';
import { ArrowRight, MapPinned, MapPin, Mountain } from 'lucide-react';
import { useDestinationsByType } from '../../hooks/queries';
import ImageWithFallback from '../../components/revamp/ImageWithFallback';
import Kicker from '../../components/revamp/Kicker';
import Section from '../../components/revamp/Section';
import UniversalCard from '../../components/revamp/UniversalCard';
import TrustStrip from '../../components/revamp/TrustStrip';
import { SkeletonList, SkeletonHero } from '../../components/revamp/Skeletons';

const HERO_FALLBACK = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=75';

export default function DomesticDestinations() {
  const { data: destinations = [], isPending } = useDestinationsByType('domestic');

  return (
    <div className="min-h-screen bg-brand-canvas pt-20 pb-12">
      {/* ------------- Asymmetric Hero ------------- */}
      <section className="relative overflow-hidden">
        <div className="container-custom py-10 md:py-16 lg:py-20">
          {isPending ? (
            <SkeletonHero />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: copy */}
              <div className="lg:col-span-6 relative z-10">
                <Breadcrumb current="Domestic" />
                <Kicker tone="orange" size="lg" className="mt-4">Across India</Kicker>
                <h1 className="font-season text-4xl md:text-5xl lg:text-6xl font-bold text-brand-ink mt-3 leading-[1.1]">
                  From beaches to Himalayas, <span className="text-brand-orange">handpicked</span>
                </h1>
                <p className="mt-5 text-base md:text-lg text-brand-muted-ink font-canva-sans max-w-xl">
                  Kerala backwaters, Kashmir houseboats, Rajasthan palaces, Andaman islands —
                  thoughtfully curated for families who want trips that actually fit.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Kerala', 'Kashmir', 'Jaipur', 'Andaman', 'Chardham'].map((d) => (
                    <span key={d} className="text-xs md:text-sm font-poppins font-medium text-brand-ink bg-surface border border-brand-hairline rounded-full px-3 py-1">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: hero image, offset to break the symmetry */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-soft-xl">
                  <ImageWithFallback
                    src={destinations[0]?.image || HERO_FALLBACK}
                    alt="Domestic destinations"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-scrim/55 via-transparent to-transparent" />
                </div>

                {/* Highlight card pulled out in front of the image */}
                <div className="hidden md:block absolute -bottom-4 -left-6 lg:-left-10 bg-surface rounded-2xl shadow-soft-xl border border-brand-hairline p-4 w-56">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                      <Mountain className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-kicker uppercase text-brand-muted-ink">Local guides</p>
                      <p className="font-poppins font-semibold text-sm text-brand-ink">Real experiences</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-brand-muted-ink leading-relaxed">
                    From Munnar homestays to Kashmir shikaras — stories, not just stays.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <TrustStrip />

      {/* ------------- Destinations grid ------------- */}
      <Section
        kicker="Explore India"
        title="Pick your corner of the country"
        subtitle={isPending ? '' : `${destinations.length} destinations with family-first packages`}
        bg="canvas"
      >
        {isPending ? (
          <SkeletonList count={8} columns={4} />
        ) : destinations.length === 0 ? (
          <EmptyState />
        ) : (
          <DestinationGrid destinations={destinations} />
        )}
      </Section>
    </div>
  );
}

function Breadcrumb({ current }) {
  return (
    <nav className="text-xs md:text-sm font-canva-sans text-brand-muted-ink flex items-center gap-1 flex-wrap">
      <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
      <span>›</span>
      <Link to="/destinations" className="hover:text-brand-orange transition-colors">Destinations</Link>
      <span>›</span>
      <span className="text-brand-ink font-poppins font-semibold">{current}</span>
    </nav>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 bg-surface rounded-2xl border border-brand-hairline">
      <MapPinned className="w-10 h-10 text-brand-muted-ink mx-auto mb-3" />
      <p className="text-brand-ink font-poppins font-semibold mb-1">No destinations loaded</p>
      <p className="text-sm text-brand-muted-ink">Check back soon — we're adding fresh picks regularly.</p>
    </div>
  );
}

function DestinationGrid({ destinations }) {
  const [featured, ...rest] = destinations;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      <div className="col-span-2 md:col-span-2 md:row-span-1">
        <FeaturedCard dest={featured} />
      </div>

      {rest.map((dest) => (
        <UniversalCard
          key={dest._id || dest.title}
          image={dest.image}
          imageAlt={dest.title}
          kicker="Domestic"
          title={dest.title}
          subtitle="Stays, transport & local experiences, planned"
          cta="Explore packages"
          href={dest.link}
          badge="Featured"
        />
      ))}
    </div>
  );
}

function FeaturedCard({ dest }) {
  if (!dest) return null;
  return (
    <Link
      to={dest.link}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-brand-orange/30 bg-surface shadow-soft-md hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300 ring-2 ring-brand-orange/15"
    >
      <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-brand-canvas-2">
        <ImageWithFallback src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-scrim/70 via-brand-scrim/15 to-transparent" />

        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-brand-orange text-white px-3 py-1 text-[11px] font-poppins font-semibold uppercase tracking-wide">
          <MapPin className="w-3 h-3" /> Featured
        </span>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-kicker uppercase text-white/80 mb-1">Most loved</p>
          <h3 className="font-season text-2xl md:text-3xl font-bold leading-tight">{dest.title}</h3>
          <p className="mt-1 text-sm text-white/90 font-canva-sans max-w-md hidden md:block">
            Carefully planned stays, tours & transfers across India.
          </p>
          <span className="inline-flex items-center gap-1 mt-3 text-sm font-poppins font-semibold text-brand-orange bg-surface rounded-full px-3 py-1.5 group-hover:bg-brand-orange group-hover:text-white transition-colors">
            Explore packages <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
