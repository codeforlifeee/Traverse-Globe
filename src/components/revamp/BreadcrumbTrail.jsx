import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Breadcrumb trail with JSON-LD structured data for SEO.
 * REVAMP_PLAN §5.1.
 *
 * items: [{ label, to?  }]  — last item has no `to` (current page).
 */
export default function BreadcrumbTrail({ items = [], className, tone = 'default' }) {
  if (!items.length) return null;

  const trail = [{ label: 'Home', to: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.to ? { item: `${typeof window !== 'undefined' ? window.location.origin : ''}${item.to}` } : {}),
    })),
  };

  const linkTone = tone === 'light' ? 'text-white/70 hover:text-white' : 'text-brand-muted-ink hover:text-brand-orange';
  const activeTone = tone === 'light' ? 'text-white' : 'text-brand-ink';
  const sepTone = tone === 'light' ? 'text-white/40' : 'text-brand-muted-ink/60';

  return (
    <nav aria-label="Breadcrumb" className={cn('text-xs md:text-sm font-canva-sans', className)}>
      <script type="application/ld+json" suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className={cn('w-3 h-3', sepTone)} />}
              {isLast || !item.to ? (
                <span className={cn('font-poppins font-medium', activeTone)} aria-current="page">
                  {i === 0 && <Home className="inline-block w-3.5 h-3.5 -mt-0.5 mr-1" />}
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className={cn('font-poppins transition-colors', linkTone)}>
                  {i === 0 && <Home className="inline-block w-3.5 h-3.5 -mt-0.5 mr-1" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
