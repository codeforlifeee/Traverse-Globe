import { urlFor } from '@/services/sanityClient';

/** Default responsive ladder for cards and grid imagery. */
export const CARD_WIDTHS = [400, 640, 900];

/** Wider ladder for full-bleed imagery (hero, banners) on hi-dpi desktops. */
export const HERO_WIDTHS = [640, 960, 1280, 1920];

/**
 * Returns true if value is a Sanity native image reference object.
 * Sanity image refs always have { _type: 'image', asset: { _ref: '...' } }.
 */
export function isSanityImageRef(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    value.asset &&
    typeof value.asset._ref === 'string'
  );
}

/**
 * Resolves any image source to a plain URL string.
 * - Plain string (existing data): returned as-is.
 * - Sanity image reference object (new data): passed through urlFor().
 *
 * @param {string|Object} source
 * @param {{ width?: number, height?: number, quality?: number }} opts
 * @returns {string}
 */
export function resolveImageUrl(source, opts = {}) {
  if (!source) return '';
  if (typeof source === 'string') return source;
  if (!isSanityImageRef(source)) return '';

  const { width = 800, height, quality = 75 } = opts;
  let b = urlFor(source).width(width).quality(quality).format('webp').fit('crop');
  if (height) b = b.height(height);
  return b.url();
}

/**
 * Builds { src, srcSet } for responsive images.
 * Works for both plain URL strings (Unsplash / external) and Sanity image refs.
 *
 * @param {string|Object} source
 * @param {{ quality?: number, widths?: number[] }} opts
 * @returns {{ src: string, srcSet: string }}
 */
export function buildSrcSet(source, opts = {}) {
  if (!source) return { src: '', srcSet: '' };

  const { widths = CARD_WIDTHS } = opts;
  // src is only a fallback when srcSet is unsupported — a mid-ladder width is the safe pick.
  const fallbackWidth = widths[Math.floor((widths.length - 1) / 2)];

  if (isSanityImageRef(source)) {
    const { quality = 60 } = opts;
    const make = (w) =>
      urlFor(source).width(w).quality(quality).format('webp').fit('crop').url();
    return {
      src: make(fallbackWidth),
      srcSet: widths.map((w) => `${make(w)} ${w}w`).join(', '),
    };
  }

  // Plain URL string — preserve existing Unsplash param logic exactly
  const url = source;
  const addWebp = (u) =>
    u.includes('images.unsplash.com') && !/fm=/.test(u)
      ? `${u}${u.includes('?') ? '&' : '?'}fm=webp`
      : u;
  const withWidth = (u, w) => {
    let out = u;
    out = /w=\d+/.test(out) ? out.replace(/w=\d+/, `w=${w}`) : `${out}${out.includes('?') ? '&' : '?'}w=${w}`;
    out = /q=\d+/.test(out) ? out.replace(/q=\d+/, 'q=60') : `${out}&q=60`;
    if (!/auto=/.test(out)) out += '&auto=format';
    if (!/fit=/.test(out)) out += '&fit=crop';
    return addWebp(out);
  };
  return {
    src: withWidth(url, fallbackWidth),
    srcSet: widths.map((w) => `${withWidth(url, w)} ${w}w`).join(', '),
  };
}
