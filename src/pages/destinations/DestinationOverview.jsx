// DestinationOverview — `/destinations` landing hub. Two choice tiles
// (International + Domestic) plus a featured preview grid of the top destinations.
// Reads from Sanity via `useDestinationsByType` so the counts and previews stay fresh.

import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Mountain, MapPin } from 'lucide-react';
import { useDestinationsByType } from '../../hooks/queries';
import ImageWithFallback from '../../components/revamp/ImageWithFallback';
import Kicker from '../../components/revamp/Kicker';
import Section from '../../components/revamp/Section';
import UniversalCard from '../../components/revamp/UniversalCard';
import TrustStrip from '../../components/revamp/TrustStrip';
import { SkeletonList, SkeletonHero } from '../../components/revamp/Skeletons';

const HERO_FALLBACK = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=75';

export default function DestinationOverview() {
  const { data: international = [], isPending: intlPending } = useDestinationsByType('international');
  const { data: domestic = [], isPending: domPending } = useDestinationsByType('domestic');
  const isPending = intlPending || domPending;

  return (
    <div className="min-h-screen bg-brand-canvas pt-20 pb-12">
      {/* ---------- Asymmetric hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="container-custom py-10 md:py-16 lg:py-20">
          {isPending ? (
            <SkeletonHero />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: copy */}
              <div className="lg:col-span-6 relative z-10">
                <Breadcrumb />
                <Kicker tone="orange" size="lg" className="mt-4">Pick anywhere</Kicker>
                <h1 className="font-season text-4xl md:text-5xl lg:text-6xl font-bold text-brand-ink mt-3 leading-[1.1]">
                  Where would you like to <span className="text-brand-orange">experience next?</span>
                </h1>
                <p className="mt-5 text-base md:text-lg text-brand-muted-ink font-canva-sans max-w-xl">
                  From Dubai dunes to Kerala backwaters — handpicked destinations, honest prices,
                  one WhatsApp message away.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/destinations/international"
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-poppins font-semibold text-sm px-5 py-2.5 rounded-full shadow-soft-md transition-colors"
                  >
                    <Plane className="w-4 h-4" /> International
                  </Link>
                  <Link
                    to="/destinations/domestic"
                    className="inline-flex items-center gap-2 border border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white font-poppins font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
                  >
                    <Mountain className="w-4 h-4" /> Within India
                  </Link>
                </div>
              </div>

              {/* Right: hero image + highlight stat card */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-soft-xl">
                  <ImageWithFallback
                    src={international[0]?.image || domestic[0]?.image || HERO_FALLBACK}
                    alt="Explore the world with Traverse Globe"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-scrim/55 via-transparent to-transparent" />
                </div>

                <div className="hidden md:block absolute -bottom-4 -left-6 lg:-left-10 bg-surface rounded-2xl shadow-soft-xl border border-brand-hairline p-4 w-60">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-season font-bold text-brand-orange leading-none">
                      {international.length + domestic.length}+
                    </div>
                    <div>
                      <p className="text-kicker uppercase text-brand-muted-ink">Destinations</p>
                      <p className="font-poppins font-semibold text-sm text-brand-ink">Live now</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-brand-muted-ink leading-relaxed">
                    Family-first stays, transfers & tours — ready to send out tonight.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <TrustStrip />

      {/* ---------- Two choice tiles ---------- */}
      <Section
        kicker="Choose your journey"
        title="International or within India?"
        bg="canvas-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <ChoiceTile
            to="/destinations/international"
            image={international[0]?.image || HERO_FALLBACK}
            icon={<Plane className="w-5 h-5" />}
            kicker="Away from home"
            title="International"
            count={international.length}
            description="Dubai, Thailand, Bali, Singapore, Vietnam and more"
          />
          <ChoiceTile
            to="/destinations/domestic"
            image={domestic[0]?.image || HERO_FALLBACK}
            icon={<Mountain className="w-5 h-5" />}
            kicker="Across India"
            title="Domestic"
            count={domestic.length}
            description="Kerala, Kashmir, Rajasthan, Andaman and more"
          />
        </div>
      </Section>

      {/* ---------- Featured preview ---------- */}
      <Section
        kicker="Most loved"
        title="Featured destinations"
        subtitle="Where our families are heading this season"
        action={
          <Link to="/destinations/international" className="hidden md:inline-flex items-center gap-1 text-sm font-poppins font-semibold text-brand-orange hover:text-brand-orange-hover transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        }
      >
        {isPending ? (
          <SkeletonList count={8} columns={4} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...international.slice(0, 4), ...domestic.slice(0, 4)].map((dest, idx) => (
              <UniversalCard
                key={dest._id || `${dest.title}-${idx}`}
                image={dest.image}
                imageAlt={dest.title}
                kicker={dest.type === 'international' ? 'International' : 'Domestic'}
                title={dest.title}
                cta="Explore"
                href={dest.link}
                variant={idx === 0 ? 'elevated' : 'default'}
              />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

function Breadcrumb() {
  return (
    <nav className="text-xs md:text-sm font-canva-sans text-brand-muted-ink flex items-center gap-1 flex-wrap">
      <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
      <span>›</span>
      <span className="text-brand-ink font-poppins font-semibold">Destinations</span>
    </nav>
  );
}

function ChoiceTile({ to, image, icon, kicker, title, count, description }) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-2xl border border-brand-hairline bg-surface shadow-soft-sm hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-brand-canvas-2">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-scrim/80 via-brand-scrim/25 to-transparent" />

        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-surface/95 backdrop-blur-sm text-brand-ink rounded-full px-3 py-1 text-xs font-poppins font-semibold">
          <MapPin className="w-3 h-3" /> {count} destinations
        </div>

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-brand-orange/90 flex items-center justify-center">
              {icon}
            </div>
            <p className="text-kicker uppercase text-white/85 font-poppins">{kicker}</p>
          </div>
          <h3 className="font-season text-3xl md:text-4xl font-bold mt-2">{title}</h3>
          <p className="mt-1 text-sm md:text-base text-white/90 font-canva-sans max-w-sm">
            {description}
          </p>
          <span className="inline-flex items-center gap-1 mt-3 text-sm font-poppins font-semibold text-brand-orange bg-surface rounded-full px-3 py-1.5 group-hover:bg-brand-orange group-hover:text-white transition-colors">
            Browse all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
