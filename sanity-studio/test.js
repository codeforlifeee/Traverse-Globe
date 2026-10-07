const {createClient} = require('@sanity/client');
const client = createClient({projectId: 'xe1685rk', dataset: 'production', useCdn: false, apiVersion: '2024-01-01'});
client.fetch('*[_type == "blogPost"][0]{title, content}').then(console.log);
