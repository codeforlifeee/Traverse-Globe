export default {
  name: 'hotel',
  title: 'Hotel',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Hotel Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Domestic', value: 'domestic'},
          {title: 'International', value: 'international'},
          {title: 'Budget Hotels', value: 'budget'},
          {title: 'Luxury Hotels', value: 'luxury'},
          {title: 'Business Hotels', value: 'business'},
          {title: 'Resort Hotels', value: 'resort'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5)
    },
    {
      name: 'reviewRating',
      title: 'Review Rating (out of 5)',
      type: 'number',
      validation: Rule => Rule.min(0).max(5)
    },
    {
      name: 'reviewCount',
      title: 'Number of Reviews',
      type: 'number'
    },
    {
      name: 'price',
      title: 'Price Per Night (INR)',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'originalPrice',
      title: 'Original Price (for discount display)',
      type: 'number'
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'url',
      description: 'Image URL or upload',
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'url'}],
      description: 'Array of image URLs'
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{type: 'string'}],
      description: 'e.g., Free WiFi, Swimming Pool, Gym, Spa, Restaurant'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key highlights of the hotel'
    },
    {
      name: 'roomTypes',
      title: 'Room Types',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'type',
            title: 'Room Type',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'price',
            title: 'Price Per Night',
            type: 'number',
            validation: Rule => Rule.required()
          },
          {
            name: 'capacity',
            title: 'Guest Capacity',
            type: 'number',
            validation: Rule => Rule.required()
          },
          {
            name: 'size',
            title: 'Room Size (sq ft)',
            type: 'number'
          },
          {
            name: 'bedType',
            title: 'Bed Type',
            type: 'string'
          },
          {
            name: 'amenities',
            title: 'Room Amenities',
            type: 'array',
            of: [{type: 'string'}]
          },
          {
            name: 'image',
            title: 'Room Image',
            type: 'url',
            description: 'Room image URL'
          }
        ]
      }]
    },
    {
      name: 'checkIn',
      title: 'Check-in Time',
      type: 'string',
      initialValue: '2:00 PM'
    },
    {
      name: 'checkOut',
      title: 'Check-out Time',
      type: 'string',
      initialValue: '12:00 PM'
    },
    {
      name: 'policies',
      title: 'Hotel Policies',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'cancellationPolicy',
      title: 'Cancellation Policy',
      type: 'text'
    },
    {
      name: 'nearbyAttractions',
      title: 'Nearby Attractions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', title: 'Attraction Name', type: 'string'},
          {name: 'distance', title: 'Distance', type: 'string'}
        ]
      }]
    },
    {
      name: 'address',
      title: 'Full Address',
      type: 'text'
    },
    {
      name: 'phone',
      title: 'Contact Number',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url'
    },
    {
      name: 'mapLink',
      title: 'Google Maps Link',
      type: 'url'
    },
    {
      name: 'featured',
      title: 'Featured Hotel',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location'
    }
  }
}
