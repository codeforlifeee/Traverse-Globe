export default {
  name: 'customerPhoto',
  title: 'Customer Photo',
  type: 'document',
  fields: [
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Screen reader description (e.g. "Family at Burj Khalifa, Dubai")',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Short text shown on hover in the photo grid (e.g. "Sunrise in Bali")',
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      description: 'First name only is fine (e.g. "Priya & Family")',
    },
    {
      name: 'destination',
      title: 'Destination',
      type: 'string',
      description: 'Matches category slug — uae, bali, thailand, singapore, kerala, kashmir, etc.',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown earlier. Use 10, 20, 30 … to leave room for inserts.',
      initialValue: 100,
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide this photo without deleting it.',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      media: 'photo',
      title: 'caption',
      subtitle: 'customerName',
    },
    prepare({ media, title, subtitle }) {
      return {
        media,
        title: title || 'Untitled photo',
        subtitle: subtitle || '',
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
