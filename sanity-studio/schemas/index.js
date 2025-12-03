// Schema index - Import and export all schemas
import packageSchema from './package'
import blogPost from './blogPost'
import testimonial from './testimonial'
import banner from './banner'
import destination from './destination'
import hotel from './hotel'

// Define inline object types for package schema to avoid GraphQL errors
const itineraryDay = {
  name: 'itineraryDay',
  title: 'Itinerary Day',
  type: 'object',
  fields: [
    {
      name: 'dayKey',
      title: 'Day Key',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Day Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }
  ]
}

const itineraryObject = {
  name: 'itineraryObject',
  title: 'Itinerary',
  type: 'object',
  fields: [
    {
      name: 'days',
      title: 'Days',
      type: 'array',
      of: [{ type: 'itineraryDay' }]
    }
  ]
}

const hotelInfo = {
  name: 'hotelInfo',
  title: 'Hotel Information',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Hotels Title',
      type: 'string'
    },
    {
      name: 'options',
      title: 'Hotel Options',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'note',
      title: 'Hotel Note',
      type: 'text'
    }
  ]
}

export const schemaTypes = [
  // Object types must be defined before documents that use them
  itineraryDay,
  itineraryObject,
  hotelInfo,
  // Document types
  packageSchema,
  blogPost,
  testimonial,
  banner,
  destination,
  hotel
]
