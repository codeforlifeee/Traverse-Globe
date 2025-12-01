// Banner Schema for Sanity CMS
export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Banner Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Internal name for the banner (e.g., "UAE Banners", "Bali Banners")'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
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
      validation: (Rule) => Rule.required(),
      description: 'Category this banner set belongs to'
    },
    {
      name: 'images',
      title: 'Banner Images',
      type: 'array',
      of: [{ type: 'url' }],
      validation: (Rule) => Rule.required().min(3).max(10),
      description: 'Array of banner image URLs (3-10 images)'
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this banner set is active'
    }
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      imageCount: 'images.length'
    },
    prepare({ title, category, imageCount }) {
      return {
        title: title,
        subtitle: `${category.toUpperCase()} - ${imageCount || 0} images`
      }
    }
  }
}
