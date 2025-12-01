#!/usr/bin/env node
/*
  Sanity CORS management script
  Usage
    SANITY_API_TOKEN=<token> SANITY_PROJECT_ID=xe1685rk node scripts/sanity-cors.js list
    SANITY_API_TOKEN=<token> SANITY_PROJECT_ID=xe1685rk node scripts/sanity-cors.js add https://your.origin --allow-credentials
*/

import process from 'node:process';
import { fileURLToPath } from 'node:url';

const API_BASE = 'https://api.sanity.io/v1';

const getProjectId = () => process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_API_PROJECT_ID;
const getToken = () => process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN || process.env.VITE_SANITY_TOKEN;

const usage = () => {
  console.log('\nSanity CORS Management Script');
  console.log('Usage:');
  console.log('  SANITY_API_TOKEN=<token> SANITY_PROJECT_ID=<id> node scripts/sanity-cors.js list');
  console.log('  SANITY_API_TOKEN=<token> SANITY_PROJECT_ID=<id> node scripts/sanity-cors.js add https://example.com --allow-credentials');
  console.log('  SANITY_API_TOKEN=<token> SANITY_PROJECT_ID=<id> node scripts/sanity-cors.js remove https://example.com');
  console.log('\nSet SANITY_API_TOKEN (a project token with Manage API permissions) and SANITY_PROJECT_ID before running.');
}

if (process.argv.length < 3) {
  usage();
  process.exit(1);
}

const projectId = getProjectId();
const token = getToken();
if (!projectId || !token) {
  console.error('Error: SANITY_PROJECT_ID and SANITY_API_TOKEN env vars are required.');
  usage();
  process.exit(1);
}

const op = process.argv[2];

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

async function listCors() {
  const url = `${API_BASE}/projects/${projectId}/cors`;
  const res = await fetch(url, { method: 'GET', headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to list CORS origins: ${res.status} ${res.statusText}\n${body}`);
  }
  const json = await res.json();
  console.log('Current CORS entries for project', projectId);
  console.table(json);
}

async function addCors(origin, allowCredentials = false) {
  const url = `${API_BASE}/projects/${projectId}/cors`;
  const payload = { origin };
  if (allowCredentials) payload.allowCredentials = true;
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to add CORS origin: ${res.status} ${res.statusText}\n${body}`);
  }
  const json = await res.json();
  console.log('Added CORS origin:', origin);
  console.log(JSON.stringify(json, null, 2));
}

async function removeCors(origin) {
  // The management API does not have a direct "delete by origin" documented widely, so we list and delete by id.
  const listUrl = `${API_BASE}/projects/${projectId}/cors`;
  const listRes = await fetch(listUrl, { method: 'GET', headers });
  if (!listRes.ok) {
    const body = await listRes.text();
    throw new Error(`Failed to list CORS origins: ${listRes.status} ${listRes.statusText}\n${body}`);
  }
  const corsList = await listRes.json();
  const item = corsList.find((c) => c.origin === origin);
  if (!item || !item.id) {
    console.warn('CORS origin not found:', origin);
    return;
  }
  const deleteUrl = `${API_BASE}/projects/${projectId}/cors/${item.id}`;
  const delRes = await fetch(deleteUrl, { method: 'DELETE', headers });
  if (!delRes.ok) {
    const body = await delRes.text();
    throw new Error(`Failed to delete CORS entry: ${delRes.status} ${delRes.statusText}\n${body}`);
  }
  console.log(`Deleted CORS entry for ${origin} (id: ${item.id})`);
}

(async () => {
  try {
    if (op === 'list') {
      await listCors();
      return;
    }
    if (op === 'add') {
      const origin = process.argv[3];
      if (!origin) {
        console.error('Missing origin for add');
        usage();
        process.exit(1);
      }
      const allowCredentials = process.argv.includes('--allow-credentials') || process.argv.includes('-c');
      await addCors(origin, allowCredentials);
      return;
    }
    if (op === 'remove') {
      const origin = process.argv[3];
      if (!origin) {
        console.error('Missing origin for remove');
        usage();
        process.exit(1);
      }
      await removeCors(origin);
      return;
    }
    console.error('Unknown operation', op);
    usage();
    process.exit(1);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
