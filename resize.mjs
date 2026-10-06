import sharp from 'sharp';

async function crop() {
  await sharp('src/assets/brand/logo-mark-alt.png')
    .resize(766, 304, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFile('src/assets/brand/logo-mark-alt-resized.png');
    
  console.log('Resized logo-mark-alt.png to match logo.webp');
}

crop();
