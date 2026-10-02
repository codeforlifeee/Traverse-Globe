// Testimonial Schema
export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5)
    },
    {
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required()
    },
    {
      name: 'destination',
      title: 'Destination Visited',
      type: 'string',
      description: 'Groups the review under a filter chip on the home page (e.g. Dubai, Japan).',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Optional - shown nowhere yet, but useful for ordering.'
    },
    {
      name: 'avatar',
      title: 'Avatar Image',
      type: 'url'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on home page',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 100
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide without deleting.',
      initialValue: true
    },
    {
      name: 'packageRef',
      title: 'Package (optional)',
      type: 'reference',
      to: [{ type: 'package' }],
      description: 'Link this review to a specific package to show on its detail page.'
    }
  ],
  preview: {
    select: {
      title: 'name',
      rating: 'rating',
      text: 'text'
    },
    prepare({ title, rating, text }) {
      return {
        title: title,
        subtitle: `${'⭐'.repeat(rating || 0)} ${(text || '').substring(0, 60)}`
      }
    }
  }
}
