import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/

// in "name", you can rename to any of the faux vexapps. 
// You also can switch out the three pngs in public with the corresponding app.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Calculator',
        short_name: 'MyApp',
        description: 'My React PWA',
        theme_color: '#000000',
        background_color: '#000000',

        // IMPORTANT FOR SAFARI
        display: 'standalone',

        start_url: '/',
        scope: '/',

        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: "/",
  build: {
    rollupOptions: {
        input: {
            main: resolve(__dirname, 'index.html'),
            
          },
      },
  },
})
