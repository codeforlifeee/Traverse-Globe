// Blog Post Schema
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
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
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200)
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'url',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Rendered verbatim as a filter chip on /blog.',
      options: {
        list: ['Deals', 'Destinations', 'Family', 'Guides', 'Itineraries', 'Safety', 'Tips']
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(60)
    },
    {
      name: 'url',
      title: 'External Article URL',
      type: 'url',
      description: 'Optional. Where "Read more" points until a post detail page exists.'
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide without deleting.',
      initialValue: true
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author'
    },
    prepare({ title, author }) {
      return {
        title: title,
        subtitle: `by ${author}`
      }
    }
  }
}
