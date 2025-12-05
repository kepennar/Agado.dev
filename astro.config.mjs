import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';


// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
          en: 'en-US',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
   build: {
    inlineStylesheets: "always",
  },
  image: {
    domains: ['images.ctfassets.net'], // Allow Contentful CDN
    remotePatterns: [{ protocol: 'https' }],
  },
  site: 'https://agado.dev',
  trailingSlash: 'never',
});
