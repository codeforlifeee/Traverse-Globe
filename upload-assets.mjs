/**
 * Bulk upload script — Photos_TG → Sanity CMS
 *
 * Usage:
 *   node upload-assets.mjs
 *
 * Reads VITE_SANITY_TOKEN automatically from .env in this folder.
 */

import { createClient } from '@sanity/client';
import { createReadStream, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const PHOTOS_DIR = 'C:\\Users\\LENOVO\\Desktop\\Photos_TG';
const PROJECT_ID = 'xe1685rk';
const DATASET = 'production';

// Parse .env file manually — no dotenv dependency needed
function loadEnv(filepath) {
  try {
    return Object.fromEntries(
      readFileSync(filepath, 'utf8')
        .split('\n')
        .filter((l) => l.trim() && !l.startsWith('#'))
        .map((l) => l.split('=').map((p) => p.trim()))
        .filter(([k, v]) => k && v)
    );
  } catch {
    return {};
  }
}

const env = loadEnv(new URL('.env', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
// Command-line SANITY_TOKEN takes priority; fall back to .env VITE_SANITY_TOKEN
const TOKEN = process.env.SANITY_TOKEN || env.VITE_SANITY_TOKEN;

if (!TOKEN) {
  console.error('\n❌  No token found in .env (VITE_SANITY_TOKEN) or environment.\n');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function uploadImage(filepath, filename) {
  return client.assets.upload('image', createReadStream(filepath), {
    filename,
    contentType: 'image/jpeg',
  });
}

async function uploadVideo(filepath, filename) {
  return client.assets.upload('file', createReadStream(filepath), {
    filename,
    contentType: 'video/mp4',
  });
}

async function main() {
  const allFiles = readdirSync(PHOTOS_DIR);
  const images = allFiles.filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  const videos = allFiles.filter((f) => /\.mp4$/i.test(f));

  console.log(`\n📁  Found ${images.length} photos + ${videos.length} videos in Photos_TG\n`);

  // ─── Upload photos ─────────────────────────────────────────────────────────
  console.log('━━━ Uploading photos ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const uploadedImageAssets = [];

  for (let i = 0; i < images.length; i++) {
    const filename = images[i];
    const filepath = join(PHOTOS_DIR, filename);
    process.stdout.write(`  [${i + 1}/${images.length}] ${filename} … `);

    try {
      const asset = await uploadImage(filepath, filename);
      uploadedImageAssets.push(asset);

      await client.create({
        _type: 'customerPhoto',
        photo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        },
        caption: `Trip photo ${i + 1}`,
        order: (i + 1) * 10,
        active: true,
      });

      console.log('✓');
    } catch (err) {
      console.log(`✗  ${err.message}`);
    }

    // Small delay to avoid rate limiting
    await sleep(300);
  }

  // ─── Upload videos ─────────────────────────────────────────────────────────
  console.log('\n━━━ Uploading videos ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  for (let i = 0; i < videos.length; i++) {
    const filename = videos[i];
    const filepath = join(PHOTOS_DIR, filename);
    const role = i === 0 ? 'hero' : 'testimonial';
    process.stdout.write(`  [${i + 1}/${videos.length}] ${filename} (${role}) … `);

    try {
      const videoAsset = await uploadVideo(filepath, filename);

      // Use an already-uploaded image as the poster (cycle through them)
      const posterAsset = uploadedImageAssets[i % uploadedImageAssets.length];

      const doc = {
        _type: 'customerVideo',
        videoFile: {
          _type: 'file',
          asset: { _type: 'reference', _ref: videoAsset._id },
        },
        title: `Trip Video ${i + 1}`,
        role,
        order: (i + 1) * 10,
        active: true,
      };

      // Attach poster if we have one
      if (posterAsset) {
        doc.poster = {
          _type: 'image',
          asset: { _type: 'reference', _ref: posterAsset._id },
        };
      }

      await client.create(doc);
      console.log('✓');
    } catch (err) {
      console.log(`✗  ${err.message}`);
    }

    await sleep(300);
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Done!

Next steps in Sanity Studio (sanity-studio → npx sanity dev):
  • Customer Photos → add real captions and customer names
  • Customer Videos → swap poster images to proper stills
  • Mark one video as "Hero Background", rest as "Testimonial"

Then refresh localhost:5173 — all three sections will appear.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch((err) => {
  console.error('\n❌  Script failed:', err.message);
  process.exit(1);
});
