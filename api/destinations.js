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

    const { type, count } = req.query; // 'international' | 'domestic' | undefined

    if (count === 'true') {
      const total = await client.fetch('count(*[_type == "destination" && active == true])');
      return res.status(200).json(total || 0);
    }

    let query = '*[_type == "destination" && active == true';
    if (type) {
      query += ` && type == "${type}"`;
    }
    query += '] | order(order asc)';

    const data = await client.fetch(query);
    res.status(200).json(data);
  } catch (err) {
    console.error('API /api/destinations error:', err);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
};
