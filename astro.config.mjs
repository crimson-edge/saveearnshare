import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/admin/'),
      customPages: [
        'https://saveearnshare.com/blog',
        'https://saveearnshare.com/calculators',
        'https://saveearnshare.com/coupon-database',
        'https://saveearnshare.com/digital-couponing-guide',
        'https://saveearnshare.com/store-rewards-guide',
      ],
    }),
  ],
  site: 'https://saveearnshare.com',
  output: 'static',
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
