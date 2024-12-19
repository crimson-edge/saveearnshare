import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  outDir: './dist',
  integrations: [tailwind()],
  image: {
    domains: ['unsplash.com'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
    defaults: {
      quality: 85,
      format: ['webp', 'jpg'],
      formatOptions: {
        webp: { quality: 85 },
        jpg: { quality: 85 }
      }
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ['@astrojs/image']
    },
    ssr: {
      noExternal: ['@astrojs/image']
    }
  }
});