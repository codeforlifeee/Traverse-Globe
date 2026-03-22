// Package Schema for Sanity CMS - Updated to match siteData.js structure
export default {
  name: 'package',
  title: 'Travel Package',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Package ID',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
      description: 'Unique numeric ID for the package (matches siteData.js id)'
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
          .replace(/&/g, '-and-')
          .replace(/[`"''`]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
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
          { title: 'Kashmir', value: 'kashmir' },
          { title: 'Chardham Yatra', value: 'chardhamyatra' }
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required(),
      description: 'Package category/destination'
    },
    {
      name: 'title',
      title: 'Package Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(150),
      description: 'Full package title as shown on the website'
    },
    {
      name: 'price',
      title: 'Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Current package price'
    },
    {
      name: 'strikePrice',
      title: 'Strike Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      description: 'Original/discounted price (optional)'
    },
    {
      name: 'destination',
      title: 'Destination',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Full destination name (e.g., "Dubai, UAE")'
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: 'e.g., 4N/5D or 5 Days / 4 Nights',
      description: 'Package duration'
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      description: 'Package rating (0-5)',
      initialValue: 4.5
    },
    {
      name: 'reviews',
      title: 'Number of Reviews',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer(),
      description: 'Total number of reviews',
      initialValue: 0
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(1000),
      description: 'Detailed package overview/description'
    },
    {
      name: 'highlights',
      title: 'Package Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(3),
      description: 'Key highlights of the package (3-7 points)'
    },
    {
      name: 'itinerary',
      title: 'Daily Itinerary',
      type: 'itineraryObject',
      description: 'Day-by-day itinerary with title and description'
    },
    {
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(3),
      description: 'What is included in the package'
    },
    {
      name: 'exclusions',
      title: 'Exclusions',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(3),
      description: 'What is NOT included in the package'
    },
    {
      name: 'hotels',
      title: 'Hotel Information',
      type: 'hotelInfo',
      description: 'Hotel options and information'
    },
    {
      name: 'bannerImage',
      title: 'Banner Image URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'Main banner/hero image for the package'
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'url' }],
      validation: (Rule) => Rule.required().min(3).max(10),
      description: 'Array of additional gallery image URLs (3-10 images)'
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
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'When this package was published'
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      price: 'price',
      rating: 'rating'
    },
    prepare({ title, category, price, rating }) {
      return {
        title: title,
        subtitle: `${category ? category.toUpperCase() : ''} - ₹${price?.toLocaleString() || 'N/A'} | ⭐${rating || 'N/A'}`
      }
    }
  }
}
