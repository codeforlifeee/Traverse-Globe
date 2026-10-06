import sharp from 'sharp';

async function check() {
  const w = await sharp('public/logo.webp').metadata();
  console.log('logo.webp:', w.width, 'x', w.height);
  const a = await sharp('src/assets/brand/logo-mark-alt.png').metadata();
  console.log('logo-mark-alt.png:', a.width, 'x', a.height);
}

check();
