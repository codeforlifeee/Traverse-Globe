export default {
  name: 'offer',
  title: 'Live Offer',
  type: 'document',
  fields: [
    { name: 'title', title: 'Offer Title', type: 'string', validation: Rule => Rule.required().max(60) },
    { name: 'code', title: 'Promo Code', type: 'string', validation: Rule => Rule.required().max(20) },
    { name: 'discount', title: 'Discount Line', type: 'string', description: 'e.g. "Up to 15% off"', validation: Rule => Rule.required() },
    { name: 'destination', title: 'Destination Focus', type: 'string', description: 'e.g. "Dubai", "All packages"' },
    { name: 'image', title: 'Background Image URL', type: 'url' },
    { name: 'validUntil', title: 'Valid Until', type: 'date' },
    { name: 'link', title: 'Link URL (optional)', type: 'string' },
    { name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 100 },
    { name: 'active', title: 'Active', type: 'boolean', initialValue: true },
  ],
  preview: {
    select: { title: 'title', code: 'code', discount: 'discount' },
    prepare: ({ title, code, discount }) => ({ title, subtitle: `${code} — ${discount}` }),
  },
}
