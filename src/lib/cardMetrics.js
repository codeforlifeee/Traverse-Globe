/**
 * Shared card geometry.
 *
 * Every card on the site — packages, hotels, activities, destinations, guides,
 * wishlist rows, search results — is built from these. Cards used to each pick
 * their own media ratio (16/8, 16/9, 16/10, 4/3, 4/5) and body padding, so two
 * bands sitting next to each other on the same page could differ by 200px in
 * height. One ratio and one body rhythm keeps them within a line or two of each
 * other no matter what content they carry.
 *
 * These are Tailwind class strings, not CSS values, so they compose with `cn()`
 * and a card can still override one locally when it genuinely needs to. This
 * file is inside the Tailwind content glob, so the classes are emitted.
 *
 * Image-only tiles (CollectionGallery, ThemesShowcase, CustomerGrid) are a
 * different species — they carry no body copy and are sized by their grid — so
 * they are deliberately not covered here.
 */

/** The card media window. 16/10 was already the most common ratio on the site. */
export const CARD_MEDIA = 'aspect-[16/10]';

/** Body padding. */
export const CARD_BODY = 'p-4 md:p-5';

/** Title block — two lines at most, so a long title cannot stretch one card. */
export const CARD_TITLE = 'font-poppins font-semibold text-base md:text-lg leading-snug line-clamp-2';

/**
 * The card surface and its lift.
 *
 * Cards stay fully OPAQUE (`bg-surface`, no alpha) on purpose. The page sits on
 * the ambient orange/teal orbs from magicui/AestheticBackground, and the sections
 * are translucent so those shine through between content — a card that was also
 * translucent would dissolve into the wash. Solid cards floating on a translucent
 * band is what produces the depth; `shadow-soft-md` at rest is what lifts them off
 * it (DESIGN.md: shadow-md resting / shadow-xl hover).
 */
export const CARD_SURFACE = 'bg-surface border border-brand-hairline';
export const CARD_LIFT = 'shadow-soft-md hover:shadow-soft-xl';
export const CARD_SHELL =
  `group h-full flex flex-col rounded-2xl overflow-hidden ${CARD_SURFACE} ${CARD_LIFT} transition-[transform,box-shadow] duration-300`;
