import sharp from 'sharp';

async function processImage() {
  const { data, info } = await sharp('public/logo.webp')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a > 0) {
      // If the red channel is less than 150, it's not the bright orange plane.
      // It must be the dark text. So we turn it white.
      if (r < 150) {
        data[i] = 255;     // R
        data[i + 1] = 255; // G
        data[i + 2] = 255; // B
      }
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile('public/logo-white-text.png');
    
  console.log('Successfully created public/logo-white-text.png!');
}

processImage().catch(console.error);
