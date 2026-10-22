const { Jimp } = require("jimp");

async function autocrop(path) {
  const image = await Jimp.read(path);
  image.autocrop();
  await image.write(path);
  console.log(`Cropped ${path}`);
}

async function main() {
  await autocrop('./src/assets/brand/logo-full.png');
  await autocrop('./src/assets/brand/logo-mark-alt.png');
}

main().catch(console.error);
