import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import auth from 'auth-astro'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [tailwind({ applyBaseStyles: false }), react(), auth()],
  adapter: vercel(),
})
