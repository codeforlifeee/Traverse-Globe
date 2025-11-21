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
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required()
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
        subtitle: `${'⭐'.repeat(rating)} - ${text.substring(0, 60)}...`
      }
    }
  }
}
