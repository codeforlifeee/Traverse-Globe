// Destination Schema for Sanity CMS
export default {
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Destination Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Destination name (e.g., "UAE", "Bali")'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'image',
      title: 'Destination Image',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'Main image for the destination card'
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'URL path for this destination (e.g., "/destinations/international/uae")'
    },
    {
      name: 'type',
      title: 'Destination Type',
      type: 'string',
      options: {
        list: [
          { title: 'International', value: 'international' },
          { title: 'Domestic', value: 'domestic' }
        ],
        layout: 'radio'
      },
      validation: (Rule) => Rule.required(),
      description: 'International or Domestic destination'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Order in which destinations are displayed (lower numbers first)',
      initialValue: 100
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this destination is active and should be displayed'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the destination (optional)'
    }
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      order: 'order'
    },
    prepare({ title, type, order }) {
      return {
        title: title,
        subtitle: `${type ? type.toUpperCase() : 'N/A'} - Order: ${order}`
      }
    }
  }
}
