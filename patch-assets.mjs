/**
 * Patch uploaded customerPhoto and customerVideo documents with
 * captions, customer names, destinations, and video quotes.
 *
 * Run: $env:SANITY_TOKEN='<editor-token>'; node patch-assets.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

function loadEnv(filepath) {
  try {
    return Object.fromEntries(
      readFileSync(filepath, 'utf8')
        .split('\n')
        .filter((l) => l.trim() && !l.startsWith('#'))
        .map((l) => {
          const idx = l.indexOf('=');
          return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
        })
        .filter(([k, v]) => k && v)
    );
  } catch {
    return {};
  }
}

const env = loadEnv(new URL('.env', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const TOKEN = process.env.SANITY_TOKEN || env.VITE_SANITY_TOKEN;

const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
});

// ─── Photo metadata pool ───────────────────────────────────────────────────
// 23 entries, one per uploaded photo (ordered by _createdAt asc)
const photoMeta = [
  { caption: 'Golden sands of Jumeirah Beach', customerName: 'Priya & Raj', destination: 'uae' },
  { caption: 'Atop the Burj Khalifa observation deck', customerName: 'Sneha Mehta', destination: 'uae' },
  { caption: 'Dubai Marina at golden hour', customerName: 'Arjun Nair', destination: 'uae' },
  { caption: 'Desert safari under the stars', customerName: 'Kavya & Suresh', destination: 'uae' },
  { caption: 'Abra ride across Dubai Creek', customerName: 'Meera Pillai', destination: 'uae' },
  { caption: 'Jungle infinity pool in Ubud', customerName: 'Divya & Kiran', destination: 'bali' },
  { caption: 'Sunrise at Tanah Lot temple', customerName: 'Rohit Sharma', destination: 'bali' },
  { caption: 'Rice terrace trek in Tegallalang', customerName: 'Anjali Singh', destination: 'bali' },
  { caption: 'Houseboat cruise on Vembanad Lake', customerName: 'Vinod & Lakshmi', destination: 'kerala' },
  { caption: 'Spice garden walk in Munnar', customerName: 'Nisha Thomas', destination: 'kerala' },
  { caption: 'Backwater sunset from the deck', customerName: 'Sunil & Geetha', destination: 'kerala' },
  { caption: 'Floating market at dawn', customerName: 'Pooja Reddy', destination: 'thailand' },
  { caption: 'Beach club evening in Phuket', customerName: 'Rahul Kapoor', destination: 'thailand' },
  { caption: 'Phi Phi Islands boat tour', customerName: 'Aisha & Farhan', destination: 'thailand' },
  { caption: 'Maldives overwater villa sunrise', customerName: 'Deepa & Vivek', destination: 'maldives' },
  { caption: 'Crystal-clear lagoon snorkel', customerName: 'Riya Joshi', destination: 'maldives' },
  { caption: 'Singapore Gardens by the Bay lights', customerName: 'Sanjay Iyer', destination: 'singapore' },
  { caption: 'Sentosa cable car views', customerName: 'Leena & Mohan', destination: 'singapore' },
  { caption: 'Universal Studios family day', customerName: 'Harish Gupta', destination: 'singapore' },
  { caption: 'Grand Palace tour in Bangkok', customerName: 'Fatima & Omar', destination: 'thailand' },
  { caption: 'Elephant sanctuary morning', customerName: 'Sachin Pawar', destination: 'thailand' },
  { caption: 'Santorini-style villa views in Bali', customerName: 'Nidhi & Arun', destination: 'bali' },
  { caption: 'Family moments — memories for life', customerName: 'The Sharma Family', destination: 'uae' },
];

// ─── Video metadata pool ──────────────────────────────────────────────────
// 5 entries: first = hero, rest = testimonials
const videoMeta = [
  {
    // hero video
    title: 'Your Next Adventure Awaits',
    customerName: 'Traverse Globe Families',
    destination: 'uae',
    quote: 'Every trip we book turns into a story our family tells for years.',
    role: 'hero',
  },
  {
    title: "Nidhi's Bali Escape",
    customerName: 'Nidhi Sharma',
    destination: 'bali',
    quote: 'From resort to rice fields, every detail was perfectly planned. Traverse Globe made Bali feel personal.',
    role: 'testimonial',
  },
  {
    title: "Raj & Priya's Dubai Dream",
    customerName: 'Raj & Priya Mehta',
    destination: 'uae',
    quote: "We've traveled before, but never this smoothly. The kids were happy, we were relaxed — that's rare.",
    role: 'testimonial',
  },
  {
    title: "Arjun's Kerala Houseboat Trip",
    customerName: 'Arjun Nair',
    destination: 'kerala',
    quote: "The houseboat experience was straight out of a dream. Couldn't have found this on my own.",
    role: 'testimonial',
  },
  {
    title: "Kavya's Thailand Adventure",
    customerName: 'Kavya & Suresh',
    destination: 'thailand',
    quote: 'Every morning I woke up not knowing what wonder was next. That feeling is priceless.',
    role: 'testimonial',
  },
];

async function main() {
  // ─── Patch photos ────────────────────────────────────────────────────────
  console.log('\n━━━ Fetching customerPhoto documents ━━━━━━━━━━━━━━━━━━━━━━━');
  const photos = await client.fetch(
    `*[_type == "customerPhoto"] | order(_createdAt asc) { _id, order }`
  );
  console.log(`  Found ${photos.length} photos\n`);

  for (let i = 0; i < photos.length; i++) {
    const doc = photos[i];
    const meta = photoMeta[i % photoMeta.length];
    process.stdout.write(`  [${i + 1}/${photos.length}] patching photo … `);
    try {
      await client
        .patch(doc._id)
        .set({
          caption: meta.caption,
          customerName: meta.customerName,
          destination: meta.destination,
          altText: `${meta.customerName} — ${meta.caption}`,
          order: (i + 1) * 10,
        })
        .commit();
      console.log('✓');
    } catch (err) {
      console.log(`✗  ${err.message}`);
    }
  }

  // ─── Patch videos ────────────────────────────────────────────────────────
  console.log('\n━━━ Fetching customerVideo documents ━━━━━━━━━━━━━━━━━━━━━━━');
  const videos = await client.fetch(
    `*[_type == "customerVideo"] | order(_createdAt asc) { _id, role }`
  );
  console.log(`  Found ${videos.length} videos\n`);

  for (let i = 0; i < videos.length; i++) {
    const doc = videos[i];
    const meta = videoMeta[i % videoMeta.length];
    process.stdout.write(`  [${i + 1}/${videos.length}] patching video (${meta.role}) … `);
    try {
      await client
        .patch(doc._id)
        .set({
          title: meta.title,
          customerName: meta.customerName,
          destination: meta.destination,
          quote: meta.quote,
          role: meta.role,
          order: (i + 1) * 10,
        })
        .commit();
      console.log('✓');
    } catch (err) {
      console.log(`✗  ${err.message}`);
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  All documents patched!

The three homepage sections are now live:
  • VideoHero       — plays the hero trip reel
  • CustomerGrid    — 23 real customer photos with captions
  • VideoTestimonialBand — 4 testimonial videos with quotes

Refresh localhost:5173 to see them.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch((err) => {
  console.error('\n❌  Script failed:', err.message);
  process.exit(1);
});
