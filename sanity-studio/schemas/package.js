// Package Schema for Sanity CMS
export default {
  name: 'package',
  title: 'Travel Package',
  type: 'document',
  fields: [
    {
      name: 'packageId',
      title: 'Package ID',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
      description: 'Unique numeric ID for the package'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .trim()
          .replace(/&/g, ' and ')
          .replace(/[`"''`]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'title',
      title: 'Package Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100)
    },
    {
      name: 'destination',
      title: 'Destination',
      type: 'string',
      options: {
        list: [
          { title: 'UAE', value: 'uae' },
          { title: 'Bali', value: 'bali' },
          { title: 'Thailand', value: 'thailand' },
          { title: 'Singapore', value: 'singapore' },
          { title: 'Sri Lanka', value: 'srilanka' },
          { title: 'Vietnam', value: 'vietnam' },
          { title: 'Laos', value: 'laos' },
          { title: 'Andaman', value: 'andaman' },
          { title: 'Jaipur', value: 'jaipur' },
          { title: 'Kerala', value: 'kerala' },
          { title: 'Kashmir', value: 'kashmir' }
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'price',
      title: 'Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0)
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      placeholder: 'e.g., 5 Days / 4 Nights'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Full location name (e.g., Dubai, UAE)'
    },
    {
      name: 'image',
      title: 'Main Image URL',
      type: 'url',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'url' }],
      description: 'Array of image URLs for the gallery'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(50).max(1000)
    },
    {
      name: 'highlights',
      title: 'Package Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key highlights of the package'
    },
    {
      name: 'included',
      title: 'What\'s Included',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Items included in the package'
    },
    {
      name: 'excluded',
      title: 'What\'s Excluded',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Items not included in the package'
    },
    {
      name: 'itinerary',
      title: 'Daily Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', type: 'number', title: 'Day Number' },
            { name: 'title', type: 'string', title: 'Day Title' },
            { name: 'description', type: 'text', title: 'Activities', rows: 3 }
          ],
          preview: {
            select: {
              title: 'title',
              day: 'day'
            },
            prepare({ title, day }) {
              return {
                title: `Day ${day}: ${title}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      description: 'Package rating (0-5)'
    },
    {
      name: 'reviews',
      title: 'Number of Reviews',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer()
    },
    {
      name: 'featured',
      title: 'Featured Package',
      type: 'boolean',
      description: 'Show this package on the home page',
      initialValue: false
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Package is available for booking',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      destination: 'destination',
      price: 'price',
      media: 'image'
    },
    prepare({ title, destination, price }) {
      return {
        title: title,
        subtitle: `${destination.toUpperCase()} - ₹${price.toLocaleString()}`
      }
    }
  }
}
