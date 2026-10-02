import { motion } from 'framer-motion';
import { useCustomerPhotos } from '../../hooks/queries';
import { SkeletonList } from './Skeletons';
import ImageWithFallback from './ImageWithFallback';
import Kicker from './Kicker';
import SectionRule from './SectionRule';

export default function CustomerGrid() {
  const { data: photos = [], isPending } = useCustomerPhotos(12);

  if (isPending) {
    return (
      <section className="section-padding bg-brand-canvas-2">
        <div className="container-custom">
          <SkeletonList count={9} columns={3} />
        </div>
      </section>
    );
  }

  if (!photos.length) return null;

  return (
    <section className="section-padding bg-brand-canvas-2">
      <div className="container-custom">
        {/* Section header */}
        <div className="mb-6 md:mb-8">
          <Kicker>Real Trips · Real People</Kicker>
          <SectionRule />
          <h2 className="text-h2 font-poppins font-bold text-brand-ink mt-3">
            Through Our Travelers' Eyes
          </h2>
          <p className="mt-2 text-sm md:text-base text-brand-muted-ink font-canva-sans max-w-xl">
            Real photos shared by families who traveled with us. No stock images, no filters.
          </p>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {photos.map((photo, i) => (
            <motion.div
              key={photo._id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="relative group overflow-hidden rounded-xl aspect-square bg-brand-canvas cursor-pointer"
            >
              <ImageWithFallback
                src={photo.photo}
                alt={photo.altText || photo.caption || 'Customer trip photo'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay */}
              {(photo.caption || photo.customerName) && (
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-2.5">
                  <div className="rounded-lg bg-brand-scrim/70 backdrop-blur-sm px-3 py-2">
                    {photo.caption && (
                      <p className="text-xs font-poppins font-semibold text-white leading-snug">
                        {photo.caption}
                      </p>
                    )}
                    {photo.customerName && (
                      <p className="text-[11px] text-white/70 font-canva-sans mt-0.5">
                        — {photo.customerName}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
