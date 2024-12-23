import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
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
      customPages: [
        'https://saveearnshare.com',
        'https://saveearnshare.com/blog',
        'https://saveearnshare.com/calculators',
        'https://saveearnshare.com/get-started',
        'https://saveearnshare.com/coupon-database',
        'https://saveearnshare.com/digital-couponing-guide',
        'https://saveearnshare.com/store-rewards-guide',
      ],
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }),
  ],
  site: 'https://saveearnshare.com',
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
