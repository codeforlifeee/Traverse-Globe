import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Traverse Globe CMS',

  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || 'xe1685rk',
  dataset: process.env.SANITY_STUDIO_API_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(), // For testing GROQ queries
  ],

  schema: {
    types: schemaTypes,
  },

  // Disable auto-updates to prevent version conflicts
  autoUpdates: false,
})
