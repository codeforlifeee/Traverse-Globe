import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Traverse Globe CMS',

  projectId: 'YOUR_PROJECT_ID', // Replace with your project ID
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(), // For testing GROQ queries
  ],

  schema: {
    types: schemaTypes,
  },
})
