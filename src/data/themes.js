// Themes for /packages/theme/:theme — REVAMP_PLAN §4.3
export const THEMES = {
  honeymoon: {
    slug: 'honeymoon',
    name: 'Honeymoon',
    kicker: 'For the genuinely in love',
    headline: 'Honeymoon packages built for real couples',
    subhead: 'Private villas, no group tours, and time actually spent together — from Bali to Kashmir.',
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=75',
  },
  family: {
    slug: 'family',
    name: 'Family with Kids',
    kicker: 'For real families',
    headline: 'Family trips your kids will actually enjoy',
    subhead: 'Age-appropriate itineraries, family-sized rooms, and pace that fits everyone under one roof.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=75',
  },
  adventure: {
    slug: 'adventure',
    name: 'Adventure',
    kicker: 'For thrill seekers',
    headline: 'Adventure trips with the boring bits handled',
    subhead: 'Trekking, watersports, wildlife — we plan the logistics so you plan the story.',
    heroImage: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1920&q=75',
  },
  pilgrimage: {
    slug: 'pilgrimage',
    name: 'Pilgrimage',
    kicker: 'For the sacred journey',
    headline: 'Yatra packages that respect the meaning',
    subhead: 'Comfortable stays, on-time darshan slots, and someone reachable when Wi-Fi isn’t.',
    heroImage: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1920&q=75',
  },
  beach: {
    slug: 'beach',
    name: 'Beach Escape',
    kicker: 'For the salt-water reset',
    headline: 'Beach escapes without the resort crowds',
    subhead: 'Small hotels, honest sunsets, and swimmable water. Andaman, Bali, Sri Lanka & more.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=75',
  },
  hills: {
    slug: 'hills',
    name: 'Hill Retreat',
    kicker: 'For the cool escape',
    headline: 'Hill retreats worth the drive up',
    subhead: 'Mountain views without motion sickness, from Kashmir to Munnar.',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=75',
  },
};

export const THEME_LIST = Object.values(THEMES);

export function getTheme(slug) {
  return THEMES[slug] || null;
}
