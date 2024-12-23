import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://saveearnshare.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        // Exclude admin, private, api pages and trailing slashes
        if (page.includes('admin') || 
            page.includes('private') || 
            page.includes('api') ||
            page.endsWith('/')) {
          return false;
        }
        return true;
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }),
    netlify()
  ],
  output: 'server',
  adapter: netlify(),
  build: {
    format: 'directory'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    remotePatterns: [{
      protocol: 'https'
    }]
  },
  vite: {
    ssr: {
      noExternal: ['@fontsource/*']
    }
  }
});
