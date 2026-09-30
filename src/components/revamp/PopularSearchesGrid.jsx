import { Link } from 'react-router-dom';
import Section from './Section';
import Kicker from './Kicker';

/**
 * SEO link farm at bottom of home / category pages.
 * REVAMP_PLAN §4.1 step 12, §5.1.
 */
const GROUPS = [
  {
    kicker: 'Popular packages',
    links: [
      { label: 'Dubai family packages under ₹50,000', to: '/destinations/international/uae' },
      { label: '5-day Kerala honeymoon', to: '/packages/theme/honeymoon' },
      { label: 'Chardham Yatra from Delhi', to: '/chardham' },
      { label: 'Bali family beach retreat', to: '/destinations/international/bali' },
      { label: 'Kashmir winter holidays', to: '/destinations/domestic/kashmir' },
      { label: 'Andaman honeymoon 5N/6D', to: '/destinations/domestic/andaman' },
      { label: 'Thailand luxury family', to: '/destinations/international/thailand' },
      { label: 'Singapore with kids', to: '/destinations/international/singapore' },
    ],
  },
  {
    kicker: 'Popular destinations',
    links: [
      { label: 'Best time to visit Dubai', to: '/destinations/international/uae' },
      { label: 'Sri Lanka in December', to: '/destinations/international/srilanka' },
      { label: 'Vietnam in October', to: '/destinations/international/vietnam' },
      { label: 'Munnar & Alleppey combo', to: '/destinations/domestic/kerala' },
      { label: 'Gulmarg + Pahalgam', to: '/destinations/domestic/kashmir' },
      { label: 'Jaipur heritage tour', to: '/destinations/domestic/jaipur' },
      { label: 'Laos hidden gem trip', to: '/destinations/international/laos' },
    ],
  },
  {
    kicker: 'Popular themes',
    links: [
      { label: 'Honeymoon packages', to: '/packages/theme/honeymoon' },
      { label: 'Family with kids', to: '/packages/theme/family' },
      { label: 'Adventure trips', to: '/packages/theme/adventure' },
      { label: 'Beach escapes', to: '/packages/theme/beach' },
      { label: 'Hill retreats', to: '/packages/theme/hills' },
      { label: 'Pilgrimage yatras', to: '/packages/theme/pilgrimage' },
    ],
  },
  {
    kicker: 'Popular hotels',
    links: [
      { label: 'Luxury hotels', to: '/hotels/luxury' },
      { label: 'Resort hotels', to: '/hotels/resort' },
      { label: 'Business hotels', to: '/hotels/business' },
      { label: 'Budget hotels', to: '/hotels/budget' },
      { label: 'Hotels in Dubai', to: '/hotels/city/Dubai' },
      { label: 'Hotels in Bali', to: '/hotels/city/Bali' },
    ],
  },
];

export default function PopularSearchesGrid() {
  return (
    <Section kicker="Popular searches" title="Everyone's browsing this week" bg="canvas-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {GROUPS.map((group) => (
          <div key={group.kicker}>
            <Kicker className="mb-3 block">{group.kicker}</Kicker>
            <ul className="space-y-1.5">
              {group.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-brand-ink hover:text-brand-orange font-canva-sans leading-snug transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
