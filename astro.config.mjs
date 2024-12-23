import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://saveearnshare.com',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  },
  integrations: [
    tailwind(),
    netlify()
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
