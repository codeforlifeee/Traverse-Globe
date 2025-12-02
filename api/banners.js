const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'xe1685rk',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || undefined,
});

module.exports = async (req, res) => {
  try {
    // Always serve fresh data; prevent CDN/browser caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const { category = 'general', all } = req.query;

    if (all === 'true') {
      const allQuery = '*[_type == "banner" && active == true]';
      const bannersData = await client.fetch(allQuery);
      const bannersByCategory = {};
      bannersData.forEach(banner => {
        bannersByCategory[banner.category] = banner.images || [];
      });
      return res.status(200).json(bannersByCategory);
    }

    const query = `*[_type == "banner" && category == "${category}" && active == true][0].images`;
    const images = await client.fetch(query);
    res.status(200).json(images || []);
  } catch (err) {
    console.error('API /api/banners error:', err);
    res.status(500).json({ error: 'Failed to fetch banners' });
  }
};
