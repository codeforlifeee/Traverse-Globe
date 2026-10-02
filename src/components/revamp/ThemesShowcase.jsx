import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';
import ImageWithFallback from './ImageWithFallback';
import { THEME_LIST } from '../../data/themes';

/**
 * "Browse by theme" grid — REVAMP_PLAN §4.1 step 5.
 * The biggest new IA surface on the home page.
 */
export default function ThemesShowcase() {
  return (
    <Section kicker="What kind of trip?" title="Browse by theme, not just destination" bg="white">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {THEME_LIST.map((t, i) => (
          <motion.div
            key={t.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              to={`/packages/theme/${t.slug}`}
              className="group relative block rounded-2xl overflow-hidden aspect-[4/3] shadow-soft-sm hover:shadow-soft-lg transition-shadow"
            >
              <ImageWithFallback
                src={t.heroImage}
                alt={t.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-scrim/85 via-brand-scrim/30 to-transparent" />
              <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end text-white">
                <span className="text-kicker uppercase font-poppins text-white/70">{t.kicker}</span>
                <div className="mt-1 flex items-center justify-between">
                  <h3 className="text-base md:text-xl font-poppins font-bold">{t.name}</h3>
                  <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
