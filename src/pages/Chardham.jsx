import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mountain, Hotel, HeartPulse, Utensils, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchPackages } from '../services/sanityClient';
import ImageWithFallback from '../components/revamp/ImageWithFallback';
import Kicker from '../components/revamp/Kicker';
import Section from '../components/revamp/Section';
import BreadcrumbTrail from '../components/revamp/BreadcrumbTrail';
import PackageCard from '../components/PackageCard';
import { SkeletonList } from '../components/revamp/Skeletons';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

/**
 * /chardham — dedicated landing page for the Chardham Yatra product.
 * REVAMP_PLAN §4.10.
 */
const DHAMS = [
  { name: 'Yamunotri', deity: 'Goddess Yamuna', img: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=800&q=75' },
  { name: 'Gangotri', deity: 'Goddess Ganga', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=75' },
  { name: 'Kedarnath', deity: 'Lord Shiva', img: 'https://images.unsplash.com/photo-1613310023042-ad79320c00ff?auto=format&fit=crop&w=800&q=75' },
  { name: 'Badrinath', deity: 'Lord Vishnu', img: 'https://images.unsplash.com/photo-1601181706916-1b7d3e0e1c6d?auto=format&fit=crop&w=800&q=75' },
];

const HANDLED = [
  { icon: Hotel, title: 'Comfortable stays', body: 'Vetted hotels near each dham, with en-suite bathrooms and warm bedding.' },
  { icon: HeartPulse, title: 'Medical readiness', body: 'Oxygen support at altitude, first-aid kits, and a coordinator on standby.' },
  { icon: Utensils, title: 'Pure vegetarian food', body: 'Simple, hot, satvik meals with allergy notes handled in advance.' },
  { icon: ShieldCheck, title: 'Permits & darshan', body: 'All temple permits arranged. VIP darshan slots where policy allows.' },
];

export default function Chardham() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchPackages({ category: 'chardhamyatra' })
      .then((data) => !cancelled && setPackages(data || []))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="pb-20">
      {/* Cinematic hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?auto=format&fit=crop&w=1920&q=75"
            alt="Kedarnath"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-scrim/85 via-brand-scrim/60 to-brand-scrim/30" />
        </div>
        <div className="relative container-custom pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
          <div className="max-w-3xl">
            <BreadcrumbTrail items={[{ label: 'Chardham Yatra' }]} tone="light" />
            <div className="mt-4">
              <Kicker tone="orange" size="lg" className="text-white/90">Sacred Yatra · 4 Dhams</Kicker>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-display font-poppins font-bold text-white mt-3 leading-tight"
              >
                Chardham Yatra — done <span className="text-brand-orange">with dignity.</span>
              </motion.h1>
              <p className="mt-4 text-body-lg text-white/85 font-canva-sans max-w-2xl">
                Yamunotri, Gangotri, Kedarnath, Badrinath. Handled by a team that treats the yatra as sacred, not a checklist.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 items-center text-white/80 text-sm font-canva-sans">
                <span className="inline-flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-orange" /> 12,000+ pilgrims since 2020</span>
                <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-orange" /> Medical coordinator included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 dhams */}
      <Section kicker="The four dhams" title="Where the yatra takes you" bg="canvas">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {DHAMS.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden bg-surface border border-brand-hairline shadow-soft-sm"
            >
              <div className="relative aspect-[4/3]">
                <ImageWithFallback src={d.img} alt={d.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-scrim/70 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <p className="text-xs uppercase tracking-widest font-poppins opacity-90">{d.deity}</p>
                  <h3 className="text-lg font-poppins font-bold">{d.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* What we handle */}
      <Section kicker="What we handle for you" title="Yatra logistics, without the anxiety" bg="white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {HANDLED.map((h) => (
            <div key={h.title} className="rounded-2xl bg-brand-canvas border border-brand-hairline p-5">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-orange/10 text-brand-orange">
                <h.icon className="w-5 h-5" />
              </span>
              <h3 className="mt-3 text-h3 font-poppins font-semibold text-brand-ink">{h.title}</h3>
              <p className="mt-2 text-sm text-brand-muted-ink font-canva-sans leading-relaxed">{h.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Packages */}
      <Section kicker="Choose your yatra" title="Chardham packages by helicopter & road" bg="canvas">
        {loading ? (
          <SkeletonList count={3} columns={3} />
        ) : packages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-brand-hairline p-10 text-center bg-surface">
            <p className="text-brand-muted-ink font-canva-sans">Contact us for the season's yatra packages.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.slice(0, 6).map((p, idx) => (
              <PackageCard
                key={p._id || p.id}
                pkg={p}
                category="chardhamyatra"
                destination={`/packages/${p.slug?.current}`}
                size={idx % 3 === 1 ? 'large' : 'default'}
              />
            ))}
          </div>
        )}
      </Section>

      {/* FAQ */}
      <Section kicker="Common questions" title="Before you book the yatra" bg="white">
        <div className="max-w-3xl">
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>When is the best time for Chardham Yatra?</AccordionTrigger>
              <AccordionContent>
                The dhams typically open from late April/early May and close by late October/early November. We book on the announced opening dates every year — check our packages for current season windows.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Is the yatra suitable for seniors?</AccordionTrigger>
              <AccordionContent>
                Yes — we run helicopter yatra packages that reduce trekking, and our road yatras include palki/pony service at Yamunotri and Kedarnath. A medical coordinator is included on every departure.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Do I need any permits?</AccordionTrigger>
              <AccordionContent>
                Yes — the government issues biometric registration for all pilgrims. We handle registration, medical certificates, and darshan slots. You only bring valid ID.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>What if weather grounds the helicopter?</AccordionTrigger>
              <AccordionContent>
                We rebook the affected leg on the next flyable day or convert to road at no extra cost. If a dham becomes inaccessible due to force majeure, we refund that dham's proportional cost per government policy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>
    </div>
  );
}
