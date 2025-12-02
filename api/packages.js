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

    const { category, limit, featured, id, slug, count, avgRating, categories, minPrice, maxPrice, minRating } = req.query;

    // Stats endpoints
    if (count === 'true') {
      const total = await client.fetch('count(*[_type == "package" && active == true])');
      return res.status(200).json(total || 0);
    }
    if (avgRating === 'true') {
      const avg = await client.fetch('math::avg(*[_type == "package" && active == true].rating)');
      return res.status(200).json(avg || 0);
    }

    let query = '*[_type == "package" && active == true';

    if (category) {
      query += ` && category == "${category}"`;
    }

    if (featured === 'true') {
      query += ' && featured == true';
    }

    if (id) {
      query += ` && id == ${Number(id)}`;
    }
    if (slug) {
      query += ` && slug.current == "${slug}"`;
    }

    // Filtered queries
    if (categories) {
      const list = String(categories).split(',').map(s => s.trim()).filter(Boolean);
      if (list.length) {
        const or = list.map(cat => `category == "${cat}"`).join(' || ');
        query += ` && (${or})`;
      }
    }
    if (minPrice !== undefined) {
      query += ` && price >= ${Number(minPrice)}`;
    }
    if (maxPrice !== undefined) {
      query += ` && price <= ${Number(maxPrice)}`;
    }
    if (minRating !== undefined) {
      query += ` && rating >= ${Number(minRating)}`;
    }

    query += '] | order(publishedAt desc)';

    if (limit) {
      query += `[0...${Number(limit)}]`;
    }

    const data = await client.fetch(query);
    // If requesting single by id/slug, return first item or null
    if (id || slug) {
      return res.status(200).json(Array.isArray(data) ? (data[0] || null) : data || null);
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('API /api/packages error:', err);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
};
