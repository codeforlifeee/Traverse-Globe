import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command';
import { MapPin, Package, Sparkles, Compass, TrendingUp } from 'lucide-react';
import { getAllCategories } from '../../data/categoryConfig';
import { THEME_LIST } from '../../data/themes';
import { sanityClient } from '../../services/sanityClient';

/**
 * Universal search palette. Opens on Ctrl/Cmd + K.
 * Matches packages (via Sanity), destinations, and themes.
 */
export default function SearchCommand({ open, onOpenChange }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim() || query.length < 2) { setPackages([]); return; }
    let cancelled = false;
    setLoading(true);
    const timer = setTimeout(() => {
      sanityClient.fetch(
        `*[_type == "package" && active == true && (title match $q || destination match $q)][0..7]{ _id, title, slug, category, price }`,
        { q: `*${query}*` }
      )
        .then((data) => !cancelled && setPackages(data || []))
        .finally(() => !cancelled && setLoading(false));
    }, 250);
    return () => { clearTimeout(timer); cancelled = true; };
  }, [query]);

  const go = (path) => {
    onOpenChange(false);
    navigate(path);
  };

  const submitFullSearch = () => go(`/search?q=${encodeURIComponent(query)}`);

  const categories = getAllCategories();

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search packages, destinations, themes…"
        value={query}
        onValueChange={setQuery}
        onKeyDown={(e) => { if (e.key === 'Enter' && query) submitFullSearch(); }}
      />
      <CommandList>
        <CommandEmpty>
          {loading ? 'Searching…' : query ? 'No matches. Press Enter for full search.' : 'Start typing…'}
        </CommandEmpty>

        {query.length < 2 && (
          <>
            <CommandGroup heading="Trending">
              <CommandItem onSelect={() => go('/destinations/international/uae')}>
                <TrendingUp className="w-4 h-4 mr-2 text-brand-orange" />
                Dubai family packages
              </CommandItem>
              <CommandItem onSelect={() => go('/packages/theme/honeymoon')}>
                <TrendingUp className="w-4 h-4 mr-2 text-brand-orange" />
                Honeymoon packages
              </CommandItem>
              <CommandItem onSelect={() => go('/destinations/domestic/chardhamyatra')}>
                <TrendingUp className="w-4 h-4 mr-2 text-brand-orange" />
                Chardham Yatra
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {packages.length > 0 && (
          <CommandGroup heading="Packages">
            {packages.map((p) => (
              <CommandItem key={p._id} onSelect={() => go(`/packages/${p.slug?.current}`)}>
                <Package className="w-4 h-4 mr-2 text-brand-muted-ink" />
                <span className="flex-1 truncate">{p.title}</span>
                {p.price && <span className="ml-2 text-xs text-brand-muted-ink font-poppins">₹{p.price.toLocaleString('en-IN')}</span>}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandGroup heading="Destinations">
          {categories
            .filter((c) => !query || c.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 6)
            .map((c) => (
              <CommandItem key={c.slug} onSelect={() => go(`/destinations/${c.type}/${c.slug}`)}>
                <MapPin className="w-4 h-4 mr-2 text-brand-muted-ink" />
                <span className="flex-1">{c.name}</span>
                <span className="text-xs text-brand-muted-ink capitalize">{c.type}</span>
              </CommandItem>
            ))}
        </CommandGroup>

        <CommandGroup heading="Themes">
          {THEME_LIST
            .filter((t) => !query || t.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 4)
            .map((t) => (
              <CommandItem key={t.slug} onSelect={() => go(`/packages/theme/${t.slug}`)}>
                <Sparkles className="w-4 h-4 mr-2 text-brand-muted-ink" />
                <span className="flex-1">{t.name}</span>
                <span className="text-xs text-brand-muted-ink hidden md:inline">{t.kicker}</span>
              </CommandItem>
            ))}
        </CommandGroup>

        {query && (
          <>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem onSelect={submitFullSearch}>
                <Compass className="w-4 h-4 mr-2 text-brand-orange" />
                See all results for "{query}"
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
