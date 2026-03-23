module.exports = async (req, res) => {
  // Keep API behavior explicit and predictable for browser clients.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (!webhookUrl) {
      return res.status(500).json({ error: 'LEAD_WEBHOOK_URL is not configured' });
    }

    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    const fullName = String(payload.fullName || '').trim();
    const mobile = String(payload.mobile || '').trim();
    const email = String(payload.email || '').trim();

    if (!fullName || !mobile || !email) {
      return res.status(400).json({ error: 'fullName, mobile and email are required' });
    }

    const outboundPayload = {
      source: 'Traverse Globe Website Popup',
      submittedAt: new Date().toISOString(),
      fullName,
      mobile,
      email,
      packageName: payload.packageName || 'General Travel Enquiry',
      travelers: {
        adult: Number(payload?.travelers?.adult || 0),
        child: Number(payload?.travelers?.child || 0),
        infant: Number(payload?.travelers?.infant || 0),
        total: Number(payload?.travelers?.total || 0),
      },
      page: {
        path: payload?.page?.path || '',
        url: payload?.page?.url || '',
        title: payload?.page?.title || '',
      },
      userAgent: req.headers['user-agent'] || '',
      ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    if (process.env.LEAD_WEBHOOK_SECRET) {
      headers['x-webhook-secret'] = process.env.LEAD_WEBHOOK_SECRET;
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(outboundPayload),
    });

    if (!webhookResponse.ok) {
      const bodyText = await webhookResponse.text();
      console.error('Lead webhook forward failed:', webhookResponse.status, bodyText);
      return res.status(502).json({ error: 'Failed to forward lead to webhook' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('API /api/lead-webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};