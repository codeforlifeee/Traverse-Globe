/**
 * Universal search — scoring, the static index, autocomplete and recommendations.
 *
 * Two halves make up site search:
 *  - this module, which indexes everything the app already knows locally
 *    (destinations, themes, activities, hotel cities, key pages) and ranks it, and
 *  - `searchContent()` in services/sanityClient.js, which matches CMS documents
 *    (packages, hotels, blog posts, destination docs) in one round trip.
 *
 * Both feed hooks/useSiteSearch.js, which is what SearchCommand and /search render.
 * Nothing here touches the network, so suggestions appear on the first keystroke
 * while the CMS request is still in flight.
 */

import { getAllCategories } from '../data/categoryConfig';
import { THEME_LIST } from '../data/themes';
import { ALL_ACTIVITIES } from '../data/activities';
import { hotelCategories } from '../data/siteData';

/* ------------------------------------------------------------------ *
 * Scoring
 * ------------------------------------------------------------------ */

const normalise = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();

/** Subsequence test — "drbai" still reaches "dubai" after a typo. */
function isSubsequence(needle, haystack) {
  let i = 0;
  for (let j = 0; j < haystack.length && i < needle.length; j += 1) {
    if (haystack[j] === needle[i]) i += 1;
  }
  return i === needle.length;
}

/**
 * How well one field matches the query, 0 when it does not.
 * The tiers are deliberately far apart so a title prefix always outranks a
 * description substring no matter how many terms hit.
 */
function fieldScore(field, query) {
  const text = normalise(field);
  if (!text) return 0;
  if (text === query) return 100;
  if (text.startsWith(query)) return 80;
  // Word-boundary prefix: "safari" should hit "Desert Safari".
  if (new RegExp(`\\b${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(text)) return 60;
  if (text.includes(query)) return 40;
  if (query.length >= 4 && isSubsequence(query, text)) return 15;
  return 0;
}

/**
 * Score a record against a query. `fields` is ordered by importance and each
 * later field is worth progressively less, so the title dominates.
 * Multi-word queries must match every term somewhere, which stops
 * "dubai honeymoon" returning every Dubai package.
 */
export function scoreRecord(fields, rawQuery) {
  const query = normalise(rawQuery);
  if (!query) return 0;
  const terms = query.split(' ').filter(Boolean);

  let total = 0;
  for (const term of terms) {
    let best = 0;
    fields.forEach((field, idx) => {
      const weight = 1 / (1 + idx * 0.6);
      best = Math.max(best, fieldScore(field, term) * weight);
    });
    if (best === 0) return 0; // every term has to land somewhere
    total += best;
  }
  // Whole-query match on the primary field is a strong signal on its own.
  total += fieldScore(fields[0], query) * 0.5;
  return total;
}

/* ------------------------------------------------------------------ *
 * The static index
 * ------------------------------------------------------------------ */

/**
 * Entry shape: { id, kind, title, subtitle, meta, href, keywords, popularity }
 * `kind` drives the icon and the group heading in the UI.
 */
let cachedIndex = null;

function buildIndex() {
  const entries = [];

  for (const c of getAllCategories()) {
    entries.push({
      id: `dest:${c.slug}`,
      kind: 'destination',
      title: c.name,
      subtitle: c.description || c.title,
      meta: c.type === 'international' ? 'International' : 'Domestic',
      href: `/destinations/${c.type}/${c.slug}`,
      keywords: [c.title, c.type, c.slug, c.metaDescription].filter(Boolean),
      popularity: c.featured ? 3 : 1,
    });
  }

  for (const t of THEME_LIST) {
    entries.push({
      id: `theme:${t.slug}`,
      kind: 'theme',
      title: t.name,
      subtitle: t.kicker,
      meta: 'Theme',
      href: `/packages/theme/${t.slug}`,
      keywords: [t.headline, t.subhead, t.slug].filter(Boolean),
      popularity: 2,
    });
  }

  for (const a of ALL_ACTIVITIES) {
    entries.push({
      id: `activity:${a.slug}`,
      kind: 'activity',
      title: a.title,
      subtitle: `${a.categoryName} · ${a.location}`,
      meta: a.price ? `₹${a.price.toLocaleString('en-IN')}` : 'Activity',
      href: `/activities/${a.slug}`,
      keywords: [a.categoryName, a.location, a.category, ...(a.highlights || [])].filter(Boolean),
      popularity: a.badge === 'Best Seller' ? 3 : 2,
      image: a.image,
      price: a.price,
      rating: a.rating,
    });
  }

  for (const h of hotelCategories || []) {
    const slug = h.slug || h.category || normalise(h.title).replace(/\s+/g, '-');
    entries.push({
      id: `hotelcat:${slug}`,
      kind: 'hotelCategory',
      title: h.title || h.name,
      subtitle: h.blurb || h.description,
      meta: 'Hotels',
      href: h.link || h.href || `/hotels/${slug}`,
      keywords: ['hotel', 'stay', 'resort', slug].filter(Boolean),
      popularity: 1,
    });
  }

  // Key pages, so "wishlist" or "contact" resolve rather than falling through.
  const pages = [
    { title: 'All holiday packages', href: '/packages', keywords: ['packages', 'tours', 'trips', 'holidays'] },
    { title: 'All hotels', href: '/hotels', keywords: ['hotels', 'stays', 'rooms', 'accommodation'] },
    { title: 'Activities & experiences', href: '/activities', keywords: ['activities', 'things to do', 'excursions'] },
    { title: 'Travel guides', href: '/blog', keywords: ['guides', 'blog', 'tips', 'itineraries'] },
    { title: 'Chardham Yatra', href: '/chardham', keywords: ['chardham', 'yatra', 'kedarnath', 'badrinath', 'pilgrimage'] },
    { title: 'My wishlist', href: '/wishlist', keywords: ['wishlist', 'shortlist', 'saved'] },
    { title: 'Contact us', href: '/contact', keywords: ['contact', 'office', 'phone', 'whatsapp', 'about'] },
    { title: 'Why travellers trust us', href: '/trust', keywords: ['trust', 'reviews', 'safety'] },
  ];
  for (const p of pages) {
    entries.push({
      id: `page:${p.href}`,
      kind: 'page',
      title: p.title,
      subtitle: null,
      meta: 'Page',
      href: p.href,
      keywords: p.keywords,
      popularity: 0.5,
    });
  }

  return entries;
}

export function getStaticIndex() {
  if (!cachedIndex) cachedIndex = buildIndex();
  return cachedIndex;
}

/** Ranked local matches. `kinds` narrows to specific entry types. */
export function searchStatic(query, { limit = 20, kinds = null } = {}) {
  if (!query || query.trim().length < 1) return [];
  const pool = kinds ? getStaticIndex().filter((e) => kinds.includes(e.kind)) : getStaticIndex();
  return pool
    .map((e) => ({
      entry: e,
      score: scoreRecord([e.title, e.subtitle || '', (e.keywords || []).join(' ')], query),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || (b.entry.popularity || 0) - (a.entry.popularity || 0))
    .slice(0, limit)
    .map((r) => r.entry);
}

/* ------------------------------------------------------------------ *
 * Autocomplete — Google-style term completion
 * ------------------------------------------------------------------ */

/**
 * The completion vocabulary: phrases a visitor would plausibly type, built from
 * the same data the site renders rather than a hand-kept keyword list.
 */
let cachedVocabulary = null;

function buildVocabulary() {
  const phrases = new Map(); // normalised → { term, weight }
  const add = (term, weight) => {
    if (!term) return;
    const key = normalise(term);
    if (key.length < 3) return;
    const existing = phrases.get(key);
    if (!existing || existing.weight < weight) phrases.set(key, { term, weight });
  };

  for (const c of getAllCategories()) {
    add(c.name, c.featured ? 10 : 6);
    add(`${c.name} packages`, c.featured ? 9 : 5);
    add(`${c.name} family packages`, 4);
    add(`${c.name} honeymoon packages`, 4);
    add(`${c.name} hotels`, 3);
  }
  for (const t of THEME_LIST) {
    add(`${t.name} packages`, 6);
    add(t.name, 5);
  }
  for (const a of ALL_ACTIVITIES) {
    add(a.categoryName, 4);
    add(a.title.split(' with ')[0], 3);
  }
  ['Dubai desert safari', 'Dubai visa', 'Chardham Yatra by helicopter', 'Budget family trips',
    'Best time to visit Dubai', 'Group tour packages', 'Weekend getaways'].forEach((p) => add(p, 7));

  return [...phrases.values()];
}

export function getVocabulary() {
  if (!cachedVocabulary) cachedVocabulary = buildVocabulary();
  return cachedVocabulary;
}

/**
 * Query completions for the suggestion row at the top of the palette.
 * `extraTerms` lets live CMS titles feed completion too.
 */
export function getAutocomplete(query, { limit = 5, extraTerms = [] } = {}) {
  const q = normalise(query);
  if (q.length < 2) return [];

  const pool = [
    ...getVocabulary(),
    ...extraTerms.filter(Boolean).map((term) => ({ term, weight: 2 })),
  ];

  const seen = new Set([q]);
  return pool
    .map(({ term, weight }) => {
      const text = normalise(term);
      let score = 0;
      if (text.startsWith(q)) score = 100;
      else if (new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(text)) score = 70;
      else if (text.includes(q)) score = 40;
      return { term, score: score + weight };
    })
    .filter((r) => r.score > 5)
    .sort((a, b) => b.score - a.score)
    .filter((r) => {
      const key = normalise(r.term);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit)
    .map((r) => r.term);
}

/* ------------------------------------------------------------------ *
 * Recent searches (per device)
 * ------------------------------------------------------------------ */

const RECENT_KEY = 'tg_recent_searches';
const RECENT_MAX = 6;

export function getRecentSearches() {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string').slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
}

export function pushRecentSearch(term) {
  const clean = String(term || '').trim();
  if (clean.length < 2) return;
  try {
    const next = [clean, ...getRecentSearches().filter((s) => normalise(s) !== normalise(clean))].slice(0, RECENT_MAX);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch { /* private mode — history just won't persist */ }
}

export function clearRecentSearches() {
  try {
    window.localStorage.removeItem(RECENT_KEY);
  } catch { /* nothing to clear */ }
}

/* ------------------------------------------------------------------ *
 * Recommendations
 * ------------------------------------------------------------------ */

/** What we push when there is nothing typed yet. */
export const TRENDING_SEARCHES = [
  { label: 'Dubai family packages', href: '/destinations/international/uae' },
  { label: 'Honeymoon packages', href: '/packages/theme/honeymoon' },
  { label: 'Chardham Yatra', href: '/chardham' },
  { label: 'Desert safari', href: '/activities/desert-safari' },
  { label: 'Kashmir in summer', href: '/destinations/domestic/kashmir' },
];

/**
 * "Because you searched X" — related entries derived from the visitor's own
 * history, falling back to featured destinations for a first-time visitor.
 */
export function getRecommendations({ limit = 6 } = {}) {
  const recent = getRecentSearches();
  const out = [];
  const seen = new Set();

  for (const term of recent) {
    for (const entry of searchStatic(term, { limit: 3 })) {
      if (seen.has(entry.id)) continue;
      seen.add(entry.id);
      out.push({ ...entry, reason: `Because you searched "${term}"` });
      if (out.length >= limit) return out;
    }
  }

  const featured = getStaticIndex()
    .filter((e) => e.kind === 'destination' && e.popularity >= 3)
    .concat(getStaticIndex().filter((e) => e.kind === 'activity' && e.popularity >= 3));
  for (const entry of featured) {
    if (seen.has(entry.id)) continue;
    seen.add(entry.id);
    out.push({ ...entry, reason: 'Popular with families like yours' });
    if (out.length >= limit) break;
  }
  return out;
}
