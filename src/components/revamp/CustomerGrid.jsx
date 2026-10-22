import { useCustomerPhotos } from '../../hooks/queries';
import { SkeletonList } from './Skeletons';
import ImageWithFallback from './ImageWithFallback';
import UniversalCarousel from './UniversalCarousel';

export default function CustomerGrid() {
  const { data: photos = [], isPending } = useCustomerPhotos(12);

  if (isPending) {
    return (
      <section className="section-padding bg-brand-canvas-2/65">
        <div className="container-custom">
          <SkeletonList count={4} columns={4} />
        </div>
      </section>
    );
  }

  if (!photos.length) return null;

  return (
    <UniversalCarousel
      bg="canvas-2"
      kicker="Real Trips · Real People"
      title="Through Our Travelers' Eyes"
      subtitle="Real photos shared by families who traveled with us. No stock images, no filters."
      slidesPerViewDesktop={4}
    >
      {photos.map((photo, i) => (
        <div
          key={photo._id || i}
          className="relative group overflow-hidden rounded-xl aspect-square bg-surface border border-brand-hairline cursor-pointer"
        >
          <ImageWithFallback
            src={photo.photo}
            alt={photo.altText || photo.caption || 'Customer trip photo'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Hover overlay */}
          {(photo.caption || photo.customerName) && (
            <div className="absolute inset-x-0 bottom-0 p-2 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
              <div className="rounded-lg bg-brand-scrim/80 backdrop-blur-md px-3 py-2 border border-white/10 shadow-soft-sm">
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
        </div>
      ))}
    </UniversalCarousel>
  );
}
