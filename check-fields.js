// Check actual field names in Sanity
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  apiVersion: '2023-08-01',
  useCdn: false,
});

const packageData = await client.fetch('*[_type == "package" && slug.current == "4-star-alluring-andamans-4n-5d"][0]');

console.log('📦 All Fields in Package:\n');
console.log(JSON.stringify(packageData, null, 2));
