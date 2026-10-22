import { Link } from 'react-router-dom';
import { Compass, Waves, Anchor, Ticket, Ship } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

/**
 * Desktop (lg+) primary navigation, split out of Header so Radix NavigationMenu
 * (~95 KB unminified) is only downloaded by screens that can show it. Below lg this
 * menu was always `hidden`, yet phones were paying for it in the entry chunk.
 */

const popularActivities = [
  { name: 'Desert Safari & Quad Biking', slug: 'desert-safari', icon: Compass, desc: 'Dune bashing, camel rides & BBQ' },
  { name: 'Scuba Diving & Snorkeling', slug: 'scuba-diving', icon: Waves, desc: 'Coral reefs & marine exploration' },
  { name: 'Dhow Cruise & Marina Dinner', slug: 'dhow-cruise', icon: Anchor, desc: 'Luxury dinner on waters' },
  { name: 'Theme Parks & Waterparks', slug: 'theme-parks', icon: Ticket, desc: 'Burj Khalifa, Atlantis & Ferrari World' },
  { name: 'Luxury Yacht Rentals', slug: 'yacht-rental', icon: Ship, desc: 'Private charters in Arabian Gulf' },
];

// Shared desktop top-level link styling (plain links + the Activities trigger).
const topLinkClass = 'nav-link font-poppins text-sm font-medium px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-1';

export default function DesktopNav({ solid, linkTone }) {
  return (
    /* Radix NavigationMenu: role=navigation, full keyboard support */
    <NavigationMenu className="hidden lg:flex" aria-label="Primary">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/" className={cn(topLinkClass, linkTone, solid && 'hover:bg-brand-orange/5')}>
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/packages" className={cn(topLinkClass, linkTone, solid && 'hover:bg-brand-orange/5')}>
              Packages
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/hotels" className={cn(topLinkClass, linkTone, solid && 'hover:bg-brand-orange/5')}>
              Hotels
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger
            className={cn(linkTone, solid && 'hover:bg-brand-orange/5', 'data-[state=open]:text-brand-orange')}
          >
            Activities
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute left-0 top-full mt-2">
            <div className="bg-surface rounded-2xl p-4 min-w-[340px] border border-brand-hairline shadow-soft-xl">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-brand-hairline">
                <span className="text-kicker uppercase text-brand-muted-ink font-poppins font-semibold text-xs">
                  Curated Activities
                </span>
                <NavigationMenuLink asChild>
                  <Link to="/activities" className="text-xs text-brand-orange hover:underline font-poppins font-medium">
                    All Activities →
                  </Link>
                </NavigationMenuLink>
              </div>
              <div className="grid gap-1">
                {popularActivities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <NavigationMenuLink asChild key={act.slug}>
                      <Link
                        to={`/activities/${act.slug}`}
                        className="group/item flex items-center gap-3 px-3 py-2 rounded-xl text-brand-ink hover:text-brand-orange hover:bg-brand-canvas transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 group-hover/item:bg-brand-orange group-hover/item:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-poppins font-medium leading-none">{act.name}</p>
                          <p className="text-[11px] text-brand-muted-ink font-canva-sans mt-1">{act.desc}</p>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  );
                })}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {[
          { to: '/blog', label: 'Guides' },
          // About was merged into Contact — one "Contact Us" entry covers both.
          { to: '/contact', label: 'Contact Us' },
        ].map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuLink asChild>
              <Link to={item.to} className={cn(topLinkClass, linkTone, solid && 'hover:bg-brand-orange/5')}>
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
