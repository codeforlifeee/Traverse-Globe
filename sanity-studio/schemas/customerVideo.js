export default {
  name: 'customerVideo',
  title: 'Customer Video',
  type: 'document',
  fields: [
    {
      name: 'videoFile',
      title: 'Video File (MP4)',
      type: 'file',
      options: { accept: 'video/mp4,video/*' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Required — shown before the video plays and on mobile. Use a still frame from the trip.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Short heading shown on the video card (e.g. "Nidhi\'s Dubai Trip")',
      validation: Rule => Rule.required(),
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    },
    {
      name: 'destination',
      title: 'Destination',
      type: 'string',
      description: 'e.g. UAE, Bali, Kerala',
    },
    {
      name: 'quote',
      title: 'Customer Quote',
      type: 'text',
      rows: 2,
      description: '1–2 sentences from the customer (e.g. "Everything was seamless — from visa to hotel!")',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Background (full-screen loop)', value: 'hero' },
          { title: 'Testimonial Card', value: 'testimonial' },
        ],
        layout: 'radio',
      },
      description: 'Only ONE video should be set to Hero. All others should be Testimonial.',
      initialValue: 'testimonial',
      validation: Rule => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown earlier in the testimonial carousel.',
      initialValue: 100,
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide this video without deleting it.',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      media: 'poster',
      title: 'title',
      subtitle: 'role',
    },
    prepare({ media, title, subtitle }) {
      const roleLabel = subtitle === 'hero' ? '🎬 Hero' : '💬 Testimonial';
      return {
        media,
        title: title || 'Untitled video',
        subtitle: roleLabel,
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
