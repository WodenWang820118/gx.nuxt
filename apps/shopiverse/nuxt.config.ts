import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  workspaceDir: '../../',
  srcDir: 'src',
  devtools: { enabled: true },
  devServer: {
    host: 'localhost',
    port: 4200
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      extends: '../tsconfig.app.json' // Nuxt copies this string as-is to the `./.nuxt/tsconfig.json`, therefore it needs to be relative to that directory
    }
  },
  imports: {
    autoImport: true
  },

  css: ['~/assets/css/styles.scss'],

  vite: {
    plugins: [nxViteTsPaths()]
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    stripeSK: process.env.NUXT_STRIPE_SK_KEY,
    public: {
      stripePK: process.env.NUXT_STRIPE_PK_KEY
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css'
        }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js'
        },
        {
          src: 'https://js.stripe.com/v3',
          defer: true
        }
      ]
    }
  },
  features: {
    devLogs: false
  },
  nitro: {
    preset: 'vercel',
    output: {
      dir: '../../.vercel/output'
    }
  },
  compatibilityDate: '2024-11-04'
});
