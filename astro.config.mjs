import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.saveearnshare.com',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  },
  integrations: [
    tailwind(),
    netlify(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        return {
          ...item,
          priority: item.url === '/' ? 1.0 : 0.8,
        };
      }
    })
  ],
  output: 'server',
  adapter: netlify(),
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
