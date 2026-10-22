// Platform Review Schema
// Aggregate rating badges (Google, Tripadvisor, Facebook) shown above the
// testimonial carousel on the home page.
export default {
  name: 'platformReview',
  title: 'Platform Review',
  type: 'document',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'Drives the badge dot colour and the review link, so the spelling matters.',
      options: {
        list: ['Google', 'Tripadvisor', 'Facebook']
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(5)
    },
    {
      name: 'totalReviews',
      title: 'Total Reviews',
      type: 'number',
      validation: (Rule) => Rule.required().min(0)
    },
    {
      name: 'displayOrder',
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
    }
  ],
  preview: {
    select: {
      title: 'platform',
      rating: 'rating',
      total: 'totalReviews'
    },
    prepare({ title, rating, total }) {
      return {
        title: title,
        subtitle: `${rating ?? '-'} / 5 from ${total ?? 0} reviews`
      }
    }
  }
}
